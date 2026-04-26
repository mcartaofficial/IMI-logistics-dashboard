# This is a text string describing the purpose of the file: testing the shipping optimization tool.
"""
Test Script - IMI Shipping Optimization
Demonstrates the optimization engine with sample data
"""

# Import the 'pandas' library, which is used for organizing and analyzing data in tables (like Excel).
import pandas as pd
# Import 'json', a standard format used for structuring and exchanging data.
import json
# Import the 'ShippingOptimizer' tool from a separate file named 'optimizer.py'.
from optimizer import ShippingOptimizer

# Define a set of instructions called 'test_optimization' to run the test logic.
def test_optimization():
    """Test the optimization with provided sample data"""
    
    # Print a long line of equals signs to create a visual border in the console.
    print("=" * 80)
    # Print the title of the test so the user knows what is running.
    print("IMI SHIPPING & FREIGHT - OPTIMIZATION TEST")
    # Print a border line to close the header section.
    print("=" * 80)
    # Print an empty line to create space for better readability.
    print()
    
    # Print a message indicating that the script is starting to open the data files.
    print("📂 Loading data files...")
    # Start a 'try' block, which attempts to run code that might fail (like if a file is missing).
    try:
        # Open the 'COA_List' Excel file and save it as a data table.
        coa_list = pd.read_excel('/mnt/user-data/uploads/COA_List.xlsx')
        # Open the 'COA_Rate' Excel file containing shipping prices.
        coa_rates = pd.read_excel('/mnt/user-data/uploads/COA_Rate.xlsx')
        # Open the 'FOB_Prices' Excel file containing product prices at different ports.
        fob_prices = pd.read_excel('/mnt/user-data/uploads/FOB_Prices.xlsx')
        # Open the 'Shipment_Schedule' Excel file which lists the shipments that need to happen.
        shipment_schedule = pd.read_excel('/mnt/user-data/uploads/Shipment_Schedule.xlsx')
        # Print a confirmation message once all files are successfully opened.
        print("✓ All files loaded successfully!")
        # Print a blank line for visual spacing.
        print()
    # If any error occurs during the file loading process, capture the error details in 'e'.
    except Exception as e:
        # Print a message showing exactly what went wrong during the file loading.
        print(f"✗ Error loading files: {e}")
        # Stop the function early because the test cannot continue without the data.
        return
    
    # Print a heading for a summary of the data that was just loaded.
    print("📊 Data Summary:")
    # Print the total number of shipping contracts (COA) found in the list.
    print(f"  - COA Contracts: {len(coa_list)}")
    # Print the total number of possible shipping routes available.
    print(f"  - Available Routes: {len(coa_rates)}")
    # Print the total number of loading ports where goods are priced.
    print(f"  - FOB Ports: {len(fob_prices)}")
    # Print the total number of individual shipments that the computer needs to plan.
    print(f"  - Shipments to Plan: {len(shipment_schedule)}")
    # Print a blank line for spacing.
    print()
    
    # Print a message stating the optimization engine is being prepared.
    print("🔧 Initializing optimizer...")
    # Create an instance of the 'ShippingOptimizer', which is the brain that does the math.
    optimizer = ShippingOptimizer()
    # Give the brain all the data tables (contracts, rates, prices, and schedule) to work with.
    optimizer.load_data(coa_list, coa_rates, fob_prices, shipment_schedule)
    # Print a message confirming the math engine is ready to start calculating.
    print("✓ Optimizer ready!")
    # Print a blank line for spacing.
    print()
    
    # Create a list of four different fuel (bunker) prices to see how they affect costs.
    bunker_prices = [350, 400, 450, 500]
    
    # Loop through each price in the bunker prices list one by one.
    for bunker_price in bunker_prices:
        # Print a decorative line to separate different price scenarios.
        print("-" * 80)
        # Print which specific fuel price is currently being tested.
        print(f"🚢 SCENARIO: Bunker Price = ${bunker_price}/mt")
        # Print a decorative line to finish the scenario header.
        print("-" * 80)
        
        # Tell the optimizer to find the cheapest shipping plan for this specific fuel price.
        results = optimizer.build_optimization_model(bunker_price=bunker_price)
        
        # Check if the optimizer successfully found a valid solution (an 'Optimal' result).
        if results['status'] == 'Optimal':
            # Print that a successful plan was found.
            print(f"✓ Optimization Status: {results['status']}")
            # Print an empty line.
            print()
            # Print a heading for the financial results of this plan.
            print(f"💰 Financial Summary:")
            # Print the total calculated cost, formatted with commas and two decimal places.
            print(f"  - Total Cost: ${results['total_cost']:,.2f}")
            # Print the total number of shipments included in this plan.
            print(f"  - Number of Shipments: {results['num_shipments']}")
            # Calculate and print the average cost per individual shipment.
            print(f"  - Average Cost per Shipment: ${results['total_cost']/results['num_shipments']:,.2f}")
            # Print a blank line for spacing.
            print()
            
            # Print a heading for how much each shipping contract was used.
            print(f"📋 COA Utilization:")
            # Loop through each contract ID and how many times it was used in the plan.
            for coa_id, count in results['coa_usage'].items():
                # Find the row in the original contract list that matches this specific ID.
                coa_details = coa_list[coa_list['COA ID#'] == coa_id].iloc[0]
                # Get the minimum number of shipments required by this contract.
                min_req = coa_details['Min (Firm)']
                # Get the maximum number of shipments allowed by this contract.
                max_allowed = coa_details['Max (Firm + Optionals)']
                # Print the usage count vs. the required and allowed limits for that contract.
                print(f"  - {coa_id}: {count} shipments (Min: {min_req}, Max: {max_allowed})")
            # Print a blank line for spacing.
            print()
            
            # Print a heading for how much each port was used.
            print(f"🏭 Port Utilization:")
            # Loop through each port name and how many times it was used as a loading point.
            for port, count in results['port_usage'].items():
                # Find the row in the price list that matches this specific port.
                fob_details = fob_prices[fob_prices['Load Port'] == port].iloc[0]
                # Get the minimum volume/shipment requirement for that port.
                min_req = fob_details['Min']
                # Get the maximum volume/shipment capacity for that port.
                max_allowed = fob_details['Max']
                # Print how many shipments were assigned to this port vs. its limits.
                print(f"  - {port}: {count} shipments (Min: {min_req}, Max: {max_allowed})")
            # Print a blank line for spacing.
            print()
            
            # Print a heading to show a few examples of the routes chosen by the computer.
            print(f"📦 Sample Routes (first 5):")
            # Loop through the first five routes in the results list to show examples.
            for i, route in enumerate(results['selected_routes'][:5], 1):
                # Print the shipment number and the start (load) and end (discharge) ports.
                print(f"  {i}. Shipment #{route['shipment_id']}: {route['load_port']} → {route['discharge_port']}")
                # Print the contract used and the specific cost for this one shipment.
                print(f"     COA: {route['coa_id']}, Cost: ${route['total_cost']:.2f}")
            # Print a blank line for spacing.
            print()
            
            # Ask the optimizer for a written breakdown of why it made these choices.
            explanation = optimizer.get_detailed_explanation()
            
            # Print a heading for checking if all the shipping rules (constraints) were followed.
            print(f"📈 Constraint Status:")
            # If the optimizer says all rules were followed without any mistakes:
            if explanation['constraints_status']['all_satisfied']:
                # Print a success message.
                print("  ✓ All constraints satisfied!")
            # If some rules were broken (e.g., a port was over-capacity):
            else:
                # Print a warning message.
                print("  ✗ Constraint violations:")
                # Loop through and print every specific rule that was broken.
                for violation in explanation['constraints_status']['violations']:
                    # Print the specific detail of the violation.
                    print(f"    - {violation}")
            # Print a blank line for spacing.
            print()
            
        # If the optimizer could not find a valid plan at all:
        else:
            # Print that the optimization failed.
            print(f"✗ Optimization Status: {results['status']}")
            # Check if there is a specific error message explaining why it failed.
            if 'error' in results:
                # Print the specific error message.
                print(f"  Error: {results['error']}")
            # Print a blank line for spacing.
            print()
    
    # Print a border line to indicate the entire testing process is over.
    print("=" * 80)
    # Print a final success message.
    print("TEST COMPLETED SUCCESSFULLY!")
    # Print a closing border line.
    print("=" * 80)
    # Print an empty line.
    print()
    # Print a header for recommended next actions.
    print("💡 Next Steps:")
    # Suggest reviewing the printed data.
    print("  1. Review the results above")
    # Suggest changing variables to see different financial outcomes.
    print("  2. Adjust bunker prices to see cost impact")
    # Suggest sharing the tool via a web dashboard.
    print("  3. Deploy the dashboard to GitHub Pages")
    # Suggest using AI to help interpret complex results.
    print("  4. Use Google Gemini for AI-powered explanations")
    # Print a final empty line.
    print()

# This checks if the script is being run directly (rather than being imported by another script).
if __name__ == "__main__":
    # If run directly, execute the 'test_optimization' instructions defined above.
    test_optimization()
