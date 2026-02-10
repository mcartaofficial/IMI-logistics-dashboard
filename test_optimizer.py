"""
Test Script - IMI Shipping Optimization
Demonstrates the optimization engine with sample data
"""

import pandas as pd
import json
from optimizer import ShippingOptimizer

def test_optimization():
    """Test the optimization with provided sample data"""
    
    print("=" * 80)
    print("IMI SHIPPING & FREIGHT - OPTIMIZATION TEST")
    print("=" * 80)
    print()
    
    # Load the sample data files
    print("📂 Loading data files...")
    try:
        coa_list = pd.read_excel('/mnt/user-data/uploads/COA_List.xlsx')
        coa_rates = pd.read_excel('/mnt/user-data/uploads/COA_Rate.xlsx')
        fob_prices = pd.read_excel('/mnt/user-data/uploads/FOB_Prices.xlsx')
        shipment_schedule = pd.read_excel('/mnt/user-data/uploads/Shipment_Schedule.xlsx')
        print("✓ All files loaded successfully!")
        print()
    except Exception as e:
        print(f"✗ Error loading files: {e}")
        return
    
    # Display data summary
    print("📊 Data Summary:")
    print(f"  - COA Contracts: {len(coa_list)}")
    print(f"  - Available Routes: {len(coa_rates)}")
    print(f"  - FOB Ports: {len(fob_prices)}")
    print(f"  - Shipments to Plan: {len(shipment_schedule)}")
    print()
    
    # Initialize optimizer
    print("🔧 Initializing optimizer...")
    optimizer = ShippingOptimizer()
    optimizer.load_data(coa_list, coa_rates, fob_prices, shipment_schedule)
    print("✓ Optimizer ready!")
    print()
    
    # Run optimization with different bunker prices
    bunker_prices = [350, 400, 450, 500]
    
    for bunker_price in bunker_prices:
        print("-" * 80)
        print(f"🚢 SCENARIO: Bunker Price = ${bunker_price}/mt")
        print("-" * 80)
        
        results = optimizer.build_optimization_model(bunker_price=bunker_price)
        
        if results['status'] == 'Optimal':
            print(f"✓ Optimization Status: {results['status']}")
            print()
            print(f"💰 Financial Summary:")
            print(f"  - Total Cost: ${results['total_cost']:,.2f}")
            print(f"  - Number of Shipments: {results['num_shipments']}")
            print(f"  - Average Cost per Shipment: ${results['total_cost']/results['num_shipments']:,.2f}")
            print()
            
            print(f"📋 COA Utilization:")
            for coa_id, count in results['coa_usage'].items():
                coa_details = coa_list[coa_list['COA ID#'] == coa_id].iloc[0]
                min_req = coa_details['Min (Firm)']
                max_allowed = coa_details['Max (Firm + Optionals)']
                print(f"  - {coa_id}: {count} shipments (Min: {min_req}, Max: {max_allowed})")
            print()
            
            print(f"🏭 Port Utilization:")
            for port, count in results['port_usage'].items():
                fob_details = fob_prices[fob_prices['Load Port'] == port].iloc[0]
                min_req = fob_details['Min']
                max_allowed = fob_details['Max']
                print(f"  - {port}: {count} shipments (Min: {min_req}, Max: {max_allowed})")
            print()
            
            print(f"📦 Sample Routes (first 5):")
            for i, route in enumerate(results['selected_routes'][:5], 1):
                print(f"  {i}. Shipment #{route['shipment_id']}: {route['load_port']} → {route['discharge_port']}")
                print(f"     COA: {route['coa_id']}, Cost: ${route['total_cost']:.2f}")
            print()
            
            # Get detailed explanation
            explanation = optimizer.get_detailed_explanation()
            
            print(f"📈 Constraint Status:")
            if explanation['constraints_status']['all_satisfied']:
                print("  ✓ All constraints satisfied!")
            else:
                print("  ✗ Constraint violations:")
                for violation in explanation['constraints_status']['violations']:
                    print(f"    - {violation}")
            print()
            
        else:
            print(f"✗ Optimization Status: {results['status']}")
            if 'error' in results:
                print(f"  Error: {results['error']}")
            print()
    
    print("=" * 80)
    print("TEST COMPLETED SUCCESSFULLY!")
    print("=" * 80)
    print()
    print("💡 Next Steps:")
    print("  1. Review the results above")
    print("  2. Adjust bunker prices to see cost impact")
    print("  3. Deploy the dashboard to GitHub Pages")
    print("  4. Use Google Gemini for AI-powered explanations")
    print()

if __name__ == "__main__":
    test_optimization()
