# Technical Quick Start Guide: IMI Shipping & Freight Dashboard
This guide provides an accelerated technical overview for deploying and utilizing the IMI Shipping & Freight Dashboard. This version is optimized for professional software environments and follows the architectural standards of the International Materials (IMI) logistics suite.

# 1. Repository Architecture
The following file structure is required for a complete deployment. Ensure all assets are present in the root directory to maintain internal referencing:

index.html: The core entry point containing the dashboard’s Document Object Model (DOM) and CSS variable definitions.

app.js: The primary application logic, including the MILogisticsApp class, widget configurations, and iframe caching.

optimizer.py: Python-based linear programming engine for route optimization.

server.py: Flask-based backend for handling server-side requests and data persistence.

requirements.txt: List of Python dependencies for local and cloud environments.

Deployment Assets: IMI_logo.jpg and Cargo_Ship.jpg for professional branding and UI consistency.

# 2. Primary Deployment Workflows
Option A: Static Frontend (Immediate Access)
This method utilizes client-side execution and is the fastest way to initialize the dashboard.

Consolidate index.html, app.js, and branding assets into a single local directory.

Launch index.html in a modern web browser (Chrome, Edge, or Safari).

Upload the four required Excel data sources via the drag-and-drop interface.

Option B: GitHub Pages (Team Distribution)
Recommended for persistent, professional access across the organization.

Initialize a GitHub repository titled imi-shipping-dashboard.

Commit all core files and branding assets to the main branch.

Navigate to Settings > Pages and set the deployment source to the main branch.

The dashboard will be live at https://[username].github.io/imi-shipping-dashboard/ within minutes.

Option C: Local Python Environment
For developers requiring a full backend for offline testing or extended processing.

Install dependencies: pip install -r requirements.txt.

Execute the server: python server.py.

Access the dashboard at http://localhost:5000.

# 3. Integrated Features and Logic
UI Architecture: High-contrast, WCAG-compliant design featuring a responsive sidebar, sticky top-bar navigation, and unified card-based views.

Real-Time Visualization: Integrated ShipXplorer tracking map and embeddable chart widgets for route analysis.

Forecasting Integration: Direct access to external analysis sheets including Rotterdam and Brent Oil ARIMA and Exponential Smoothing models.

Multi-Format File Viewer: Integrated support for PDF, DOCX, and XLSX/CSV files with on-page editing and state preservation.

Gemini AI Insights: Integration for automated, intelligent route explanations and optimization logic.

# 4. Technical Data Requirements
The optimization engine requires four specific Excel data sources with exact column naming conventions:

COA_List.xlsx: Shipping contract definitions.

COA_Rate.xlsx: Pricing and route rate data.

FOB_Prices.xlsx: Port capacity and cost metrics.

Shipment_Schedule.xlsx: Active shipments for optimization.

# 5. Troubleshooting and Verification
Data Ingestion: If optimization fails, verify that total shipments do not exceed the minimum contract requirements (COA).

API Functionality: Ensure a valid Gemini API key is provided for AI-driven insights.

Browser Rendering: If updates are not visible, clear the browser cache or force a hard reload.

Accessibility: Full keyboard navigation and screen reader support are built into the semantic HTML structure.

For extended technical documentation, refer to the README.md or DEPLOYMENT.md files included in the repository.
