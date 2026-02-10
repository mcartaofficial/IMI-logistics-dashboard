"""
IMI Shipping & Freight - Route Optimization Engine
Linear Programming Model for Cost-Optimal Shipping Route Selection
"""

import pandas as pd
import numpy as np
from pulp import LpMinimize, LpProblem, LpVariable, lpSum, LpStatus, value
from typing import Dict, List, Tuple, Optional
import json


class ShippingOptimizer:
    """
    Optimizes shipping routes using linear programming to minimize total costs
    while satisfying COA constraints and shipment requirements.
    """
    
    def __init__(self):
        self.coa_list = None
        self.coa_rates = None
        self.fob_prices = None
        self.shipment_schedule = None
        self.bunker_price = 400  # Default bunker price ($/mt)
        self.problem = None
        self.variables = {}
        self.results = {}
        
    def load_data(self, coa_list_df: pd.DataFrame, coa_rates_df: pd.DataFrame,
                  fob_prices_df: pd.DataFrame, shipment_schedule_df: pd.DataFrame):
        """Load data from Excel DataFrames"""
        self.coa_list = coa_list_df
        self.coa_rates = coa_rates_df
        self.fob_prices = fob_prices_df
        self.shipment_schedule = shipment_schedule_df
        
    def calculate_total_cost(self, route: pd.Series, fob_price: float, bunker_price: float) -> float:
        """
        Calculate total cost for a route including:
        - Base freight rate (pmt)
        - Bunker adjustment (BAF)
        - FOB price
        """
        base_rate = route['Price (pmt)']
        consumption = route['Consumption Bunker']
        
        # Get COA details for BAF calculation
        coa_id = route['COA ID#']
        coa = self.coa_list[self.coa_list['COA ID#'] == coa_id].iloc[0]
        
        # Calculate BAF if applicable
        baf_cost = 0
        if pd.notna(coa.get('BAF Factor ($/pmt per $/mt Bunker)', np.nan)):
            baf_strike = coa.get('BAF Strike', 0)
            baf_factor = coa['BAF Factor ($/pmt per $/mt Bunker)']
            if bunker_price > baf_strike:
                baf_cost = (bunker_price - baf_strike) * baf_factor
        
        total_cost = base_rate + baf_cost + fob_price
        return total_cost
    
    def build_optimization_model(self, bunker_price: float = 400, 
                                 adjustments: Optional[Dict] = None) -> Dict:
        """
        Build and solve the linear programming optimization model
        
        Decision Variables:
        - x[i,j,k] = number of shipments from load port i to discharge port j using COA k
        
        Objective:
        - Minimize total cost (freight + BAF + FOB)
        
        Constraints:
        - Meet all shipment requirements
        - Respect COA min/max limits
        - Respect FOB port capacity limits
        """
        
        if adjustments is None:
            adjustments = {}
            
        self.bunker_price = adjustments.get('bunker_price', bunker_price)
        
        # Create the optimization problem
        self.problem = LpProblem("IMI_Shipping_Route_Optimization", LpMinimize)
        
        # Prepare data structures
        shipments = []
        for idx, shipment in self.shipment_schedule.iterrows():
            load_ports = []
            if 'or' in str(shipment['Loading Port']).lower():
                # Handle "Garrucha or Almeria" format
                load_ports = [p.strip() for p in str(shipment['Loading Port']).split('or')]
            else:
                load_ports = [shipment['Loading Port']]
            
            for load_port in load_ports:
                shipments.append({
                    'id': int(shipment['Shipment Number']),
                    'load_port': load_port,
                    'discharge_port': shipment['Discharge Port'],
                    'month': shipment['Loading Month / Laycan']
                })
        
        # Create decision variables and cost dictionary
        self.variables = {}
        costs = {}
        
        for shipment in shipments:
            ship_id = shipment['id']
            load_port = shipment['load_port']
            discharge_port = shipment['discharge_port']
            
            # Find all available routes for this origin-destination pair
            available_routes = self.coa_rates[
                (self.coa_rates['Load Port'] == load_port) &
                (self.coa_rates['Discharge Port'] == discharge_port)
            ]
            
            for idx, route in available_routes.iterrows():
                coa_id = route['COA ID#']
                
                # Get FOB price for load port
                fob_row = self.fob_prices[self.fob_prices['Load Port'] == load_port]
                if len(fob_row) == 0:
                    continue
                fob_price = fob_row.iloc[0]['Price']
                
                # Apply user adjustments if any
                if 'fob_adjustments' in adjustments and load_port in adjustments['fob_adjustments']:
                    fob_price = adjustments['fob_adjustments'][load_port]
                
                # Create variable name
                var_name = f"x_{ship_id}_{load_port}_{discharge_port}_{coa_id}".replace(' ', '_').replace('-', '_')
                
                # Create binary variable (0 or 1) - each shipment uses one route
                self.variables[var_name] = LpVariable(var_name, 0, 1, cat='Binary')
                
                # Calculate total cost for this route
                total_cost = self.calculate_total_cost(route, fob_price, self.bunker_price)
                costs[var_name] = total_cost
        
        # Objective function: Minimize total cost
        self.problem += lpSum([costs[var] * self.variables[var] for var in self.variables])
        
        # Constraint 1: Each shipment must be assigned to exactly one route
        for shipment in shipments:
            ship_id = shipment['id']
            relevant_vars = [v for v in self.variables.keys() if v.startswith(f"x_{ship_id}_")]
            if relevant_vars:
                self.problem += lpSum([self.variables[v] for v in relevant_vars]) == 1, f"Shipment_{ship_id}_Assignment"
        
        # Constraint 2: COA minimum and maximum limits
        for idx, coa in self.coa_list.iterrows():
            coa_id = coa['COA ID#']
            min_shipments = coa['Min (Firm)']
            max_shipments = coa['Max (Firm + Optionals)']
            
            coa_vars = [v for v in self.variables.keys() if coa_id in v]
            
            if coa_vars:
                # Minimum constraint
                self.problem += lpSum([self.variables[v] for v in coa_vars]) >= min_shipments, f"COA_{coa_id}_Min"
                
                # Maximum constraint
                if pd.notna(max_shipments):
                    self.problem += lpSum([self.variables[v] for v in coa_vars]) <= max_shipments, f"COA_{coa_id}_Max"
        
        # Constraint 3: FOB port capacity limits
        for idx, fob in self.fob_prices.iterrows():
            port = fob['Load Port']
            min_capacity = fob['Min']
            max_capacity = fob['Max']
            
            port_vars = [v for v in self.variables.keys() if f"_{port}_" in v]
            
            if port_vars:
                self.problem += lpSum([self.variables[v] for v in port_vars]) >= min_capacity, f"FOB_{port}_Min"
                self.problem += lpSum([self.variables[v] for v in port_vars]) <= max_capacity, f"FOB_{port}_Max"
        
        # Solve the problem
        self.problem.solve()
        
        # Extract results
        status = LpStatus[self.problem.status]
        
        if status == 'Optimal':
            selected_routes = []
            total_cost = value(self.problem.objective)
            
            for var_name, var in self.variables.items():
                if value(var) > 0.5:  # Binary variable is selected
                    # Parse variable name to extract details
                    parts = var_name.split('_')
                    ship_id = int(parts[1])
                    
                    # Find the load port (may contain underscores)
                    load_port_start = 2
                    discharge_port_idx = None
                    
                    # Find where discharge port starts
                    for i in range(load_port_start, len(parts)):
                        potential_discharge = '_'.join(parts[i:])
                        if any(potential_discharge.startswith(dp.replace(' ', '_')) 
                               for dp in self.shipment_schedule['Discharge Port'].unique()):
                            discharge_port_idx = i
                            break
                    
                    if discharge_port_idx:
                        load_port = '_'.join(parts[load_port_start:discharge_port_idx]).replace('_', ' ')
                        # Find COA ID (last part after discharge port)
                        remaining = parts[discharge_port_idx:]
                        
                        # Find the COA ID
                        coa_id = None
                        for i in range(len(remaining)):
                            potential_coa = '_'.join(remaining[i:]).replace('_', '-')
                            if potential_coa in self.coa_list['COA ID#'].values:
                                coa_id = potential_coa
                                discharge_port = ' '.join(remaining[:i]).replace('_', ' ')
                                break
                        
                        # Get route details
                        route = self.coa_rates[
                            (self.coa_rates['Load Port'] == load_port) &
                            (self.coa_rates['Discharge Port'] == discharge_port) &
                            (self.coa_rates['COA ID#'] == coa_id)
                        ]
                        
                        if len(route) > 0:
                            route = route.iloc[0]
                            fob = self.fob_prices[self.fob_prices['Load Port'] == load_port].iloc[0]['Price']
                            
                            selected_routes.append({
                                'shipment_id': ship_id,
                                'load_port': load_port,
                                'discharge_port': discharge_port,
                                'coa_id': coa_id,
                                'base_rate': route['Price (pmt)'],
                                'fob_price': fob,
                                'bunker_consumption': route['Consumption Bunker'],
                                'total_cost': costs[var_name],
                                'variable': var_name
                            })
            
            # Calculate statistics
            coa_usage = {}
            for route in selected_routes:
                coa_id = route['coa_id']
                coa_usage[coa_id] = coa_usage.get(coa_id, 0) + 1
            
            port_usage = {}
            for route in selected_routes:
                port = route['load_port']
                port_usage[port] = port_usage.get(port, 0) + 1
            
            self.results = {
                'status': status,
                'total_cost': total_cost,
                'selected_routes': selected_routes,
                'coa_usage': coa_usage,
                'port_usage': port_usage,
                'num_shipments': len(selected_routes),
                'bunker_price': self.bunker_price
            }
        else:
            self.results = {
                'status': status,
                'error': 'No optimal solution found. Please check constraints.',
                'total_cost': None
            }
        
        return self.results
    
    def get_detailed_explanation(self) -> Dict:
        """Generate detailed explanation of the optimization results"""
        if not self.results or self.results.get('status') != 'Optimal':
            return {'error': 'No optimal solution available'}
        
        explanation = {
            'summary': {
                'total_shipments': self.results['num_shipments'],
                'total_cost': self.results['total_cost'],
                'average_cost_per_shipment': self.results['total_cost'] / self.results['num_shipments']
            },
            'coa_utilization': [],
            'port_utilization': [],
            'route_details': self.results['selected_routes'],
            'constraints_status': self._check_constraints()
        }
        
        # COA utilization analysis
        for idx, coa in self.coa_list.iterrows():
            coa_id = coa['COA ID#']
            used = self.results['coa_usage'].get(coa_id, 0)
            min_req = coa['Min (Firm)']
            max_allowed = coa['Max (Firm + Optionals)']
            
            explanation['coa_utilization'].append({
                'coa_id': coa_id,
                'used': used,
                'min_required': min_req,
                'max_allowed': max_allowed,
                'utilization_pct': (used / max_allowed * 100) if pd.notna(max_allowed) and max_allowed > 0 else 0
            })
        
        # Port utilization analysis
        for idx, fob in self.fob_prices.iterrows():
            port = fob['Load Port']
            used = self.results['port_usage'].get(port, 0)
            min_req = fob['Min']
            max_allowed = fob['Max']
            
            explanation['port_utilization'].append({
                'port': port,
                'used': used,
                'min_required': min_req,
                'max_allowed': max_allowed,
                'utilization_pct': (used / max_allowed * 100) if max_allowed > 0 else 0
            })
        
        return explanation
    
    def _check_constraints(self) -> Dict:
        """Check if all constraints are satisfied"""
        status = {
            'all_satisfied': True,
            'violations': []
        }
        
        # Check COA constraints
        for idx, coa in self.coa_list.iterrows():
            coa_id = coa['COA ID#']
            used = self.results['coa_usage'].get(coa_id, 0)
            min_req = coa['Min (Firm)']
            max_allowed = coa['Max (Firm + Optionals)']
            
            if used < min_req:
                status['all_satisfied'] = False
                status['violations'].append(f"COA {coa_id}: Used {used}, minimum required {min_req}")
            
            if pd.notna(max_allowed) and used > max_allowed:
                status['all_satisfied'] = False
                status['violations'].append(f"COA {coa_id}: Used {used}, maximum allowed {max_allowed}")
        
        return status
    
    def export_results_json(self) -> str:
        """Export results as JSON string"""
        return json.dumps(self.results, indent=2, default=str)


def optimize_from_files(coa_list_path, coa_rate_path, fob_path, schedule_path, 
                       bunker_price=400, adjustments=None):
    """
    Convenience function to run optimization from file paths
    """
    optimizer = ShippingOptimizer()
    
    # Load data
    coa_list = pd.read_excel(coa_list_path)
    coa_rates = pd.read_excel(coa_rate_path)
    fob_prices = pd.read_excel(fob_path)
    shipment_schedule = pd.read_excel(schedule_path)
    
    optimizer.load_data(coa_list, coa_rates, fob_prices, shipment_schedule)
    
    # Run optimization
    results = optimizer.build_optimization_model(bunker_price, adjustments)
    
    return optimizer, results


if __name__ == "__main__":
    # Test the optimizer
    optimizer, results = optimize_from_files(
        '/mnt/user-data/uploads/COA_List.xlsx',
        '/mnt/user-data/uploads/COA_Rate.xlsx',
        '/mnt/user-data/uploads/FOB_Prices.xlsx',
        '/mnt/user-data/uploads/Shipment_Schedule.xlsx',
        bunker_price=400
    )
    
    print("Optimization Results:")
    print(f"Status: {results['status']}")
    if results['status'] == 'Optimal':
        print(f"Total Cost: ${results['total_cost']:,.2f}")
        print(f"Number of Shipments: {results['num_shipments']}")
        print("\nDetailed Explanation:")
        explanation = optimizer.get_detailed_explanation()
        print(json.dumps(explanation, indent=2, default=str))
