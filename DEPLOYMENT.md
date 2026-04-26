Technical Deployment Documentation: IMI Shipping & Freight Dashboard
This document outlines the professional deployment architecture and configuration requirements for the IMI Shipping & Freight Dashboard. It is intended for software developers and system administrators responsible for the production lifecycle of the application.

1. Deployment Environments
A. Static Frontend Hosting (GitHub Pages)
For deployments where the dashboard operates as a Single Page Application (SPA) utilizing client-side logic for data visualization and basic forecasting.

Infrastructure: Distributed via GitHub’s Global CDN with automated SSL termination.

Pipeline:

Initialize a repository named imi-shipping-dashboard.

Deploy artifacts: index.html, app.js, and associated CSS/asset directories.

Configure the deployment source via Settings > Pages to the production branch.

Endpoint: https://[username].github.io/imi-shipping-dashboard/.

B. Containerized Python Backend (Railway / Render)
Required for workloads involving heavy statistical computation, such as ARIMA or Exponential Smoothing models that exceed client-side performance limits.

Runtime: Python 3.8 or higher.

Build Specification:

Build Command: pip install -r requirements.txt.

Start Command: gunicorn app:app or python server.py.

Automation: Continuous Deployment (CD) is triggered automatically upon merging to the main branch.

2. Configuration and Environment Management
Environment Variables
Sensitive credentials must be injected at runtime and never committed to version control. Maintain a local .env file and include it in .gitignore.

FLASK_ENV: Set to production to disable debugger tools.

PORT: Default is 5000 or as assigned by the cloud provider.

GEMINI_API_KEY: Required for integrated AI analysis features.

SECRET_KEY: Used for session encryption and CSRF protection.

Performance Optimization
Server-Side Caching: Implement flask-caching with a simple or Redis backend to store frequent query results.

Payload Compression: Utilize flask-compress (Gzip/Brotli) to reduce the transfer size of large shipping datasets.

Asset Minification: Minify JavaScript and CSS files for production to reduce Time to Interactive (TTI).

3. Network and Security Protocols
Domain and SSL
Custom Hostnames: Map custom domains (e.g., dashboard.imishipping.com) using CNAME or A records as specified by the provider's DNS instructions.

Forced HTTPS: All deployment targets must enforce TLS 1.2+ for data in transit.

CORS Policy
In the production environment, the Cross-Origin Resource Sharing (CORS) policy must be restricted to prevent unauthorized API access.

Python
# Production CORS Example
from flask_cors import CORS
CORS(app, origins=['https://dashboard.imishipping.com'])
4. Verification and QA Checklist
Prior to final production release, the following functional and integration tests must be completed:

Data Ingestion: Verify the upload and parsing of the four primary Excel data sources.

Statistical Accuracy: Validate that the Forecasting Time Series Models (including ARIMA and Exponential Smoothing) output matches expected metrics for Rotterdam and Brent Crude benchmarks.

API Connectivity: Confirm the Gemini API is correctly handling requests and respecting rate limits.

Responsive Design: Test UI rendering across mobile, tablet, and desktop breakpoints to ensure layout integrity.

State Management: Ensure that adding new widgets or code snippets does not remove existing dashboard components.
