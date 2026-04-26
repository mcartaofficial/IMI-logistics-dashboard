# IMI Shipping & Freight Dashboard - User Guide
This guide provides a comprehensive overview of the IMI Shipping & Freight Dashboard, a centralized platform designed for maritime logistics optimization, financial forecasting, and operational oversight.

# 1. Getting Started
The dashboard serves as a strategic command center for Logistics Managers and Operations Planners to minimize shipping costs and maximize contract efficiency.

## Purpose and Scope
Cost Minimization: Uses linear programming to find the most economical routing across your global network.

Contract Management: Monitors Contract of Affreightment (COA) utilization to ensure minimum commitments are met and maximum limits are respected.

Resource Balancing: Optimizes port capacity and shipment schedules to prevent logistical bottlenecks.

## Technical Requirements
Browser Compatibility: Optimized for modern browsers including Chrome, Edge, and Safari.

Data Sources: Functionality is dependent on four core Excel files that define your logistical environment.

# 2. Managing Your Data
The accuracy of the optimization results depends on the integrity of the following mandatory data sources:

COA List (COA_List.xlsx): Defines your shipping contracts, including minimum/maximum shipment thresholds and Bunker Adjustment Factor (BAF) strike prices.

COA Rates (COA_Rate.xlsx): Provides pricing details for specific routes (Load Port to Discharge Port) associated with each contract.

FOB Prices (FOB_Prices.xlsx): Details the costs and capacity constraints at various loading ports.

Shipment Schedule (Shipment_Schedule.xlsx): Lists the current shipments that require optimized routing.

# 3. Executing Optimizations
The dashboard provides an interactive interface for running "what-if" scenarios and generating final shipping plans.

## Step-by-Step Optimization Workflow
File Ingestion: Drag and drop the four required Excel files into the designated upload slots.

Parameter Adjustment: Enter the current Bunker Price (fuel cost) to trigger BAF-adjusted rate calculations.

AI Integration: Provide a Gemini API key if you require automated, natural-language explanations of the results.

Execution: Select "Optimize Routes" to trigger the linear programming engine.

# 4. Analyzing Results
Once the optimization is complete, the dashboard presents the data through several interactive lenses:

## Financial and Operational Metrics
Total Network Cost: Displays the aggregate cost of all shipments under the optimized plan.

Utilization Tracking: Visualizes how much of each COA's capacity is being used.

Cost Per Shipment: Provides a breakdown of individual route expenses, including base rates and fuel adjustments.

## Intelligent Insights
Gemini AI Explanations: If enabled, the system provides a narrative summary explaining why certain routes were chosen and identifying potential savings.

Vessel Tracking: Use the integrated ShipXplorer map to view live vessel positions and correlate them with your planned shipments.

# 5. Advanced Analytical Modules
The dashboard includes specialized tools for high-level market analysis:

Forecasting Time Series Models: Access ARIMA and Exponential Smoothing models specifically tuned for Rotterdam Fuel Oil and Brent Crude benchmarks.

Scenario Comparison: Run multiple optimizations at varying bunker prices to build contingency budgets for fuel volatility.

Interactive Spreadsheets: Use the on-page editor to modify data within your Excel files for immediate re-optimization.

# 6. Best Practices and Troubleshooting
## Operational Efficiency
Frequency: Run optimizations weekly to account for fluctuating bunker prices.

Data Verification: Ensure column headers in your Excel files match the required structure exactly to prevent ingestion errors.

Privacy: Note that all data processing occurs client-side in your browser; no sensitive shipping data is sent to external servers except for AI analysis.

## Common Troubleshooting
Infeasible Solution: If the system cannot find an optimal route, check if your total shipments exceed the combined maximum capacity of your COAs.

Gemini Errors: Verify your API key and internet connectivity if AI insights fail to load.

Display Issues: Clear your browser cache if the dashboard layout or navigation fails to update correctly.

# Glossary of Terms
BAF (Bunker Adjustment Factor): A surcharge added to shipping rates when fuel prices exceed a predefined strike point.

COA (Contract of Affreightment): A long-term agreement specifying the volume of cargo to be moved between ports over a set time.

Laycan: The specific window of dates during which a vessel must arrive at the loading port.

Optimal Solution: The routing plan that satisfies all operational constraints at the lowest possible total cost.
