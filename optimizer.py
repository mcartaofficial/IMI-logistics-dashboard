"""
IMI Shipping & Freight - Route Optimization Engine
Linear Programming Model for Cost-Optimal Shipping Route Selection
"""

# Import the pandas library to handle data tables (DataFrames)
import pandas as pd
# Import the numpy library for advanced mathematical operations and handling empty values
import numpy as np
# From the PuLP library, import tools to solve optimization problems (minimization, variables, etc.)
from pulp import LpMinimize, LpProblem, LpVariable, lpSum, LpStatus, value
# Import tools to define specific types of data (like lists or dictionaries) for better organization
from typing import Dict, List, Tuple, Optional
# Import the json library to format data as text for easy reading or sharing
import json


class ShippingOptimizer:
    """
    Optimizes shipping routes using linear programming to minimize total costs
    while satisfying COA constraints and shipment requirements.
    """
    
    def __init__(self):
        """Initialize the optimizer with empty containers for data and settings"""
        # A list to hold Contract of Affreightment (shipping contract) details
        self.coa_list = None
        # A table to hold the specific pricing rates for various shipping routes
        self.coa_rates = None
        # A table to hold the "Free On Board" (initial product) prices at different ports
        self.fob_prices = None
        # A table to hold the schedule of when and where shipments must go
        self.shipment_schedule = None
        # Set a default price for ship fuel (bunker) at $400 per metric ton
        self.bunker_price = 400  # Default bunker price ($/mt)
        # A placeholder for the mathematical problem we are trying to solve
        self.problem = None
        # A dictionary to store the "decision variables" (the choices the computer can make)
        self.variables = {}
        # A dictionary to store the final results after the math is solved
        self.results = {}
        
    def load_data(self, coa_list_df: pd.DataFrame, coa_rates_df: pd.DataFrame,
                  fob_prices_df: pd.DataFrame, shipment_schedule_df: pd.DataFrame):
        """Load data from Excel DataFrames"""
        # Store the provided contract list into the optimizer
        self.coa_list = coa_list_df
        # Store the provided shipping rates into the optimizer
        self.coa_rates = coa_rates_df
        # Store the provided product prices into the optimizer
        self.fob_prices = fob_prices_df
        # Store the provided shipment schedule into the optimizer
        self.shipment_schedule = shipment_schedule_df
        
    def calculate_total_cost(self, route: pd.Series, fob_price: float, bunker_price: float) -> float:
        """
        Calculate total cost for a route including:
        - Base freight rate (pmt)
        - Bunker adjustment (BAF)
        - FOB price
        """
        # Extract the basic shipping cost per metric ton from the route data
        base_rate = route['Price (pmt)']
        # Extract how much fuel (bunker) the ship consumes for this route
        consumption = route['Consumption Bunker']
        
        # Identify which shipping contract (COA) this specific route belongs to
        coa_id = route['COA ID#']
        # Find the specific row in the contract list that matches this ID
        coa = self.coa_list[self.coa_list['COA ID#'] == coa_id].iloc[0]
        
        # Start with an initial fuel adjustment cost of zero
        baf_cost = 0
        # Check if the contract includes a "Bunker Adjustment Factor" (a fuel surcharge)
        if pd.notna(coa.get('BAF Factor ($/pmt per $/mt Bunker)', np.nan)):
            # Get the "strike price"—the fuel price above which a surcharge starts
            baf_strike = coa.get('BAF Strike', 0)
            # Get the multiplier that determines how much the cost increases per dollar of fuel
            baf_factor = coa['BAF Factor ($/pmt per $/mt Bunker)']
            # If the current fuel price is higher than the strike price, calculate the surcharge
            if bunker_price > baf_strike:
                # Surcharge = (Difference in fuel price) multiplied by the adjustment factor
                baf_cost = (bunker_price - baf_strike) * baf_factor
        
        # Total cost is the base shipping rate + fuel surcharge + the product price at the port
        total_cost = base_rate + baf_cost + fob_price
        # Return the final calculated cost
        return total_cost
    
    def build_optimization_model(self, bunker_price: float = 400, 
                                 adjustments: Optional[Dict] = None) -> Dict:
        """
        Build and solve the linear programming optimization model
        """
        
        # If no custom adjustments were provided, start with an empty list of adjustments
        if adjustments is None:
            adjustments = {}
            
        # Update the fuel price using custom adjustments if provided, otherwise use the default
        self.bunker_price = adjustments.get('bunker_price', bunker_price)
        
        # Initialize a new minimization problem titled "IMI_Shipping_Route_Optimization"
        self.problem = LpProblem("IMI_Shipping_Route_Optimization", LpMinimize)
        
        # Create an empty list to store prepared shipment information
        shipments = []
        # Loop through every row in the shipment schedule table
        for idx, shipment in self.shipment_schedule.iterrows():
            # Create a list to hold potential loading ports
            load_ports = []
            # If the loading port column says "Port A or Port B", handle both options
            if 'or' in str(shipment['Loading Port']).lower():
                # Split the text by "or" and clean up any extra spaces
                load_ports = [p.strip() for p in str(shipment['Loading Port']).split('or')]
            else:
                # If there is only one port, put it in the list by itself
                load_ports = [shipment['Loading Port']]
            
            # For every possible loading port identified for this shipment
            for load_port in load_ports:
                # Add the details to our master list of required shipments
                shipments.append({
                    'id': int(shipment['Shipment Number']),
                    'load_port': load_port,
                    'discharge_port': shipment['Discharge Port'],
                    'month': shipment['Loading Month / Laycan']
                })
        
        # Initialize empty dictionaries for the decision variables and their associated costs
        self.variables = {}
        costs = {}
        
        # Loop through every shipment we just prepared
        for shipment in shipments:
            # Get the unique ID for this shipment
            ship_id = shipment['id']
            # Get the starting port for this shipment
            load_port = shipment['load_port']
            # Get the destination port for this shipment
            discharge_port = shipment['discharge_port']
            
            # Filter the rates table to find all contracts that cover this specific route
            available_routes = self.coa_rates[
                (self.coa_rates['Load Port'] == load_port) &
                (self.coa_rates['Discharge Port'] == discharge_port)
            ]
            
            # For every available contract/route option found
            for idx, route in available_routes.iterrows():
                # Get the contract ID for this route
                coa_id = route['COA ID#']
                
                # Look up the product price at the loading port
                fob_row = self.fob_prices[self.fob_prices['Load Port'] == load_port]
                # If the port isn't in our price list, skip this option
                if len(fob_row) == 0:
                    continue
                # Get the actual price value from the row
                fob_price = fob_row.iloc[0]['Price']
                
                # If the user provided a custom price for this port, use that instead
                if 'fob_adjustments' in adjustments and load_port in adjustments['fob_adjustments']:
                    fob_price = adjustments['fob_adjustments'][load_port]
                
                # Create a unique technical name for this choice (e.g., "Shipment 1 from Port A via Contract B")
                var_name = f"x_{ship_id}_{load_port}_{discharge_port}_{coa_id}".replace(' ', '_').replace('-', '_')
                
                # Create a "Binary" variable: the computer must choose 0 (don't use this route) or 1 (use it)
                self.variables[var_name] = LpVariable(var_name, 0, 1, cat='Binary')
                
                # Calculate the specific cost for this specific choice
                total_cost = self.calculate_total_cost(route, fob_price, self.bunker_price)
                # Store the cost in our cost dictionary using the unique variable name
                costs[var_name] = total_cost
        
        # The objective of the math problem: sum up (cost * choice) for all options and make it as small as possible
        self.problem += lpSum([costs[var] * self.variables[var] for var in self.variables])
        
        # Constraint 1: Ensure every single required shipment is assigned to exactly one available route
        for shipment in shipments:
            ship_id = shipment['id']
            # Find all the variables (options) that belong to this specific shipment ID
            relevant_vars = [v for v in self.variables.keys() if v.startswith(f"x_{ship_id}_")]
            # If options exist, the sum of these choices must equal 1 (meaning exactly one is chosen)
            if relevant_vars:
                self.problem += lpSum([self.variables[v] for v in relevant_vars]) == 1, f"Shipment_{ship_id}_Assignment"
        
        # Constraint 2: Ensure we respect the minimum and maximum shipment limits of each contract
        for idx, coa in self.coa_list.iterrows():
            # Identify the contract
            coa_id = coa['COA ID#']
            # Get the minimum number of shipments we are legally required to give this contractor
            min_shipments = coa['Min (Firm)']
            # Get the maximum number of shipments allowed under this contract
            max_shipments = coa['Max (Firm + Optionals)']
            
            # Find all shipping options that use this specific contract
            coa_vars = [v for v in self.variables.keys() if coa_id in v]
            
            # If this contract is an option for any of the routes
            if coa_vars:
                # The total number of shipments chosen for this contract must be at least the minimum
                self.problem += lpSum([self.variables[v] for v in coa_vars]) >= min_shipments, f"COA_{coa_id}_Min"
                
                # If there is a maximum limit defined, the total shipments must not exceed it
                if pd.notna(max_shipments):
                    self.problem += lpSum([self.variables[v] for v in coa_vars]) <= max_shipments, f"COA_{coa_id}_Max"
        
        # Constraint 3: Ensure we don't exceed or fall short of the supply capacity at each loading port
        for idx, fob in self.fob_prices.iterrows():
            # Identify the loading port
            port = fob['Load Port']
            # Get the minimum number of shipments the port must provide
            min_capacity = fob['Min']
            # Get the maximum number of shipments the port can handle
            max_capacity = fob['Max']
            
            # Find all shipping options that originate from this port
            port_vars = [v for v in self.variables.keys() if f"_{port}_" in v]
            
            # If we are actually using this port in our options
            if port_vars:
                # Ensure the total number of chosen shipments from this port is within the min/max limits
                self.problem += lpSum([self.variables[v] for v in port_vars]) >= min_capacity, f"FOB_{port}_Min"
                self.problem += lpSum([self.variables[v] for v in port_vars]) <= max_capacity, f"FOB_{port}_Max"
        
        # Tell the computer to run the math and solve the problem
        self.problem.solve()
        
        # Get the status of the solution (e.g., "Optimal", "Infeasible")
        status = LpStatus[self.problem.status]
        
        # If the computer found the best possible valid solution
        if status == 'Optimal':
            # Create a list to store the details of the routes the computer selected
            selected_routes = []
            # Get the lowest possible total cost from the solved problem
            total_cost = value(self.problem.objective)
            
            # Look through all the possible choices we gave the computer
            for var_name, var in self.variables.items():
                # If the computer "checked the box" (set the value to 1) for this option
                if value(var) > 0.5:  
                    # Split the variable name into pieces to understand which shipment it was
                    parts = var_name.split('_')
                    # Convert the shipment ID part back into a number
                    ship_id = int(parts[1])
                    
                    # Logic to extract the load port and discharge port names from the technical variable name
                    load_port_start = 2
                    discharge_port_idx = None
                    
                    # Search through the name parts to find where the discharge port name begins
                    for i in range(load_port_start, len(parts)):
                        potential_discharge = '_'.join(parts[i:])
                        if any(potential_discharge.startswith(dp.replace(' ', '_')) 
                               for dp in self.shipment_schedule['Discharge Port'].unique()):
                            discharge_port_idx = i
                            break
                    
                    # If we found the discharge port in the name
                    if discharge_port_idx:
                        # Reconstruct the loading port name by joining the name parts and replacing underscores with spaces
                        load_port = '_'.join(parts[load_port_start:discharge_port_idx]).replace('_', ' ')
                        # Identify the remaining part of the name which contains the contract ID
                        remaining = parts[discharge_port_idx:]
                        
                        # Search through the remaining parts to find the exact contract ID (COA) used
                        coa_id = None
                        for i in range(len(remaining)):
                            potential_coa = '_'.join(remaining[i:]).replace('_', '-')
                            if potential_coa in self.coa_list['COA ID#'].values:
                                coa_id = potential_coa
                                # The part before the COA ID is the discharge port name
                                discharge_port = ' '.join(remaining[:i]).replace('_', ' ')
                                break
                        
                        # Go back to the original rates table to get the full details for this chosen route
                        route = self.coa_rates[
                            (self.coa_rates['Load Port'] == load_port) &
                            (self.coa_rates['Discharge Port'] == discharge_port) &
                            (self.coa_rates['COA ID#'] == coa_id)
                        ]
                        
                        # If the route details are found, save them to our selected routes list
                        if len(route) > 0:
                            route = route.iloc[0]
                            # Get the product price at the loading port again for the final report
                            fob = self.fob_prices[self.fob_prices['Load Port'] == load_port].iloc[0]['Price']
                            
                            # Build a dictionary with all the human-readable details of this chosen shipment
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
            
            # Create a tally of how many times each contract (COA) was used
            coa_usage = {}
            for route in selected_routes:
                coa_id = route['coa_id']
                coa_usage[coa_id] = coa_usage.get(coa_id, 0) + 1
            
            # Create a tally of how many shipments were sent from each loading port
            port_usage = {}
            for route in selected_routes:
                port = route['load_port']
                port_usage[port] = port_usage.get(port, 0) + 1
            
            # Package all results into a final results dictionary
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
            # If no solution was found, record the error and the status
            self.results = {
                'status': status,
                'error': 'No optimal solution found. Please check constraints.',
                'total_cost': None
            }
        
        # Return the final results dictionary to the user
        return self.results
    
    def get_detailed_explanation(self) -> Dict:
        """Generate detailed explanation of the optimization results"""
        # If there are no results or the solution failed, return an error message
        if not self.results or self.results.get('status') != 'Optimal':
            return {'error': 'No optimal solution available'}
        
        # Start building a human-readable summary of the results
        explanation = {
            'summary': {
                'total_shipments': self.results['num_shipments'],
                'total_cost': self.results['total_cost'],
                'average_cost_per_shipment': self.results['total_cost'] / self.results['num_shipments']
            },
            'coa_utilization': [],
            'port_utilization': [],
            'route_details': self.results['selected_routes'],
            # Check if all our rules (constraints) were successfully followed
            'constraints_status': self._check_constraints()
        }
        
        # Analyze how much of each contract's capacity we actually used
        for idx, coa in self.coa_list.iterrows():
            coa_id = coa['COA ID#']
            used = self.results['coa_usage'].get(coa_id, 0)
            min_req = coa['Min (Firm)']
            max_allowed = coa['Max (Firm + Optionals)']
            
            # Add a summary for this specific contract
            explanation['coa_utilization'].append({
                'coa_id': coa_id,
                'used': used,
                'min_required': min_req,
                'max_allowed': max_allowed,
                # Calculate what percentage of the contract's capacity was utilized
                'utilization_pct': (used / max_allowed * 100) if pd.notna(max_allowed) and max_allowed > 0 else 0
            })
        
        # Analyze how much of each port's capacity we used
        for idx, fob in self.fob_prices.iterrows():
            port = fob['Load Port']
            used = self.results['port_usage'].get(port, 0)
            min_req = fob['Min']
            max_allowed = fob['Max']
            
            # Add a summary for this specific port
            explanation['port_utilization'].append({
                'port': port,
                'used': used,
                'min_required': min_req,
                'max_allowed': max_allowed,
                # Calculate what percentage of the port's capacity was utilized
                'utilization_pct': (used / max_allowed * 100) if max_allowed > 0 else 0
            })
        
        # Return the final detailed explanation
        return explanation
    
    def _check_constraints(self) -> Dict:
        """Check if all constraints are satisfied"""
        # Create a status report starting with the assumption everything is fine
        status = {
            'all_satisfied': True,
            'violations': []
        }
        
        # Verify if we actually obeyed the contract minimums and maximums
        for idx, coa in self.coa_list.iterrows():
            coa_id = coa['COA ID#']
            used = self.results['coa_usage'].get(coa_id, 0)
            min_req = coa['Min (Firm)']
            max_allowed = coa['Max (Firm + Optionals)']
            
            # If we used fewer shipments than required by the contract
            if used < min_req:
                status['all_satisfied'] = False
                status['violations'].append(f"COA {coa_id}: Used {used}, minimum required {min_req}")
            
            # If we used more shipments than allowed by the contract
            if pd.notna(max_allowed) and used > max_allowed:
                status['all_satisfied'] = False
                status['violations'].append(f"COA {coa_id}: Used {used}, maximum allowed {max_allowed}")
        
        # Return the compliance report
        return status
    
    def export_results_json(self) -> str:
        """Export results as JSON string"""
        # Convert the results dictionary into a text string in JSON format for external use
        return json.dumps(self.results, indent=2, default=str)


def optimize_from_files(coa_list_path, coa_rate_path, fob_path, schedule_path, 
                       bunker_price=400, adjustments=None):
    """
    Convenience function to run optimization from file paths
    """
    # Create a new instance of the shipping optimizer
    optimizer = ShippingOptimizer()
    
    # Read the data from the provided Excel file paths using pandas
    coa_list = pd.read_excel(coa_list_path)
    coa_rates = pd.read_excel(coa_rate_path)
    fob_prices = pd.read_excel(fob_path)
    shipment_schedule = pd.read_excel(schedule_path)
    
    # Load these tables into the optimizer
    optimizer.load_data(coa_list, coa_rates, fob_prices, shipment_schedule)
    
    # Run the math model to find the best routes
    results = optimizer.build_optimization_model(bunker_price, adjustments)
    
    # Return both the optimizer object and the results found
    return optimizer, results


if __name__ == "__main__":
    # If this script is run directly, perform a test optimization with these sample files
    optimizer, results = optimize_from_files(
        '/mnt/user-data/uploads/COA_List.xlsx',
        '/mnt/user-data/uploads/COA_Rate.xlsx',
        '/mnt/user-data/uploads/FOB_Prices.xlsx',
        '/mnt/user-data/uploads/Shipment_Schedule.xlsx',
        bunker_price=400
    )
    
    # Print the outcome of the optimization to the screen
    print("Optimization Results:")
    # Print whether it was successful (Optimal) or failed
    print(f"Status: {results['status']}")
    # If it was successful, print the key financial and operational figures
    if results['status'] == 'Optimal':
        print(f"Total Cost: ${results['total_cost']:,.2f}")
        print(f"Number of Shipments: {results['num_shipments']}")
        print("\nDetailed Explanation:")
        # Generate and print the deep-dive explanation of the result
        explanation = optimizer.get_detailed_explanation()
        print(json.dumps(explanation, indent=2, default=str))
