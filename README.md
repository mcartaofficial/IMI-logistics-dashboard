# 🚢 IMI Shipping & Freight - Route Optimization Dashboard

A powerful, AI-driven dashboard for optimizing shipping routes using linear programming and Google Gemini AI explanations.

![IMI Shipping Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Features

- **Linear Programming Optimization**: Minimizes total shipping costs while satisfying all constraints
- **Interactive Dashboard**: Upload Excel files and adjust parameters in real-time
- **AI-Powered Explanations**: Google Gemini provides detailed insights on why solutions are optimal
- **Constraint Management**: 
  - COA (Contract of Affreightment) min/max limits
  - FOB port capacity constraints
  - Bunker fuel price adjustments (BAF)
- **Scenario Comparison**: Compare multiple optimization runs with different parameters
- **Professional Branding**: IMI Shipping & Freight red/white theme with cargo ship imagery

## 📋 Data Requirements

The dashboard requires 4 Excel files:

### 1. COA List (`COA_List.xlsx`)
Contains Contract of Affreightment details:
- `COA ID#`: Contract identifier
- `Min (Firm)`: Minimum guaranteed shipments
- `Max (Firm + Optionals)`: Maximum allowed shipments
- `Start Date` / `End Date`: Contract period
- `BAF Strike`: Bunker adjustment base price
- `BAF Factor ($/pmt per $/mt Bunker)`: BAF calculation factor

### 2. COA Rates (`COA_Rate.xlsx`)
Route-specific pricing:
- `COA ID#`: Contract identifier
- `Load Port`: Origin port
- `Discharge Port`: Destination port
- `Price (pmt)`: Base freight rate (per metric ton)
- `Consumption Bunker`: Fuel consumption for route

### 3. FOB Prices (`FOB_Prices.xlsx`)
Port pricing and capacity:
- `Load Port`: Port name
- `Price`: FOB price per metric ton
- `Min`: Minimum shipments from this port
- `Max`: Maximum shipments from this port

### 4. Shipment Schedule (`Shipment_Schedule.xlsx`)
Required shipments:
- `Shipment Number`: Unique identifier
- `Loading Port`: Origin (supports "Port A or Port B" format)
- `Discharge Port`: Destination
- `Loading Month / Laycan`: Delivery timeframe

## 🚀 Deployment on GitHub Pages

### Step 1: Create GitHub Repository

```bash
# Create a new repository on GitHub (e.g., "imi-shipping-dashboard")
# Then clone it locally:
git clone https://github.com/YOUR_USERNAME/imi-shipping-dashboard.git
cd imi-shipping-dashboard
```

### Step 2: Add Files

Copy all files from this project into your repository:

```bash
# Copy these files:
# - index.html
# - app.js
# - README.md
```

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Initial commit: IMI Shipping Dashboard"
git push origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your dashboard will be live at: `https://YOUR_USERNAME.github.io/imi-shipping-dashboard/`

## 💡 Usage Guide

### Getting Started

1. **Open the Dashboard**: Navigate to your deployed GitHub Pages URL
2. **Upload Data Files**: Click each upload box and select your Excel files
3. **Set Parameters**:
   - Bunker Price ($/mt): Current fuel cost
   - Optimization Goal: Cost minimization strategy
4. **Add Gemini API Key**: 
   - Get your free key at: https://makersuite.google.com/app/apikey
   - Paste it in the API Key field
5. **Click "Optimize Routes"**: The system will solve and display results

### Understanding Results

#### Summary Cards
- **Total Cost**: Complete shipping expense for all routes
- **Total Shipments**: Number of shipments optimized
- **Average Cost/Shipment**: Cost efficiency metric
- **COAs Utilized**: Number of contracts used

#### Selected Routes Table
Shows the optimal route for each shipment with:
- Load/Discharge ports
- COA contract used
- Cost breakdown (base rate + FOB)

#### Constraint Analysis
- **COA Utilization**: Shows how each contract is used vs. min/max limits
- **Port Utilization**: Port capacity usage vs. limits

#### AI Explanation
Google Gemini analyzes the solution and explains:
- Why this minimizes costs
- How contracts are optimally utilized
- Port selection strategy
- Cost-saving recommendations

### Adjusting Scenarios

1. Modify bunker price or other parameters
2. Click "Optimize Routes" again
3. View comparison with previous scenarios in the Scenario Comparison section

## 🔧 Technical Details

### Optimization Model

The system uses **Linear Programming** (LP) to solve:

**Objective Function:**
```
Minimize: Σ (Base Rate + BAF + FOB Price) × Route Selection
```

**Subject to:**
1. Each shipment assigned to exactly one route
2. COA min ≤ shipments using COA ≤ COA max
3. Port min ≤ shipments from port ≤ Port max

**BAF Calculation:**
```
BAF = (Bunker Price - BAF Strike) × BAF Factor (if Bunker Price > BAF Strike)
```

### Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Optimization**: javascript-lp-solver library
- **Excel Parsing**: SheetJS (xlsx.js)
- **AI Integration**: Google Gemini API
- **Hosting**: GitHub Pages (static)

### Browser Compatibility

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+

## 🔐 Security & Privacy

- All optimization runs **client-side** in your browser
- No data is sent to external servers (except Gemini API for explanations)
- API keys are not stored; they remain in-session only
- Excel files are processed locally

## 📊 Example Use Cases

1. **Monthly Route Planning**: Upload current shipment schedule and optimize
2. **Fuel Price Sensitivity**: Adjust bunker prices to see cost impact
3. **Contract Utilization**: Ensure COA minimums are met while minimizing cost
4. **Port Strategy**: Understand which ports provide best value
5. **What-if Analysis**: Compare scenarios with different constraints

## 🛠️ Customization

### Changing Branding Colors

Edit `index.html` CSS variables:

```css
:root {
    --imi-red: #C8102E;        /* Primary brand color */
    --imi-dark-red: #9B0C23;   /* Secondary brand color */
    --imi-white: #FFFFFF;       /* Background */
}
```

### Adding Custom Constraints

Modify `app.js` in the `solveLP()` method:

```javascript
// Add your custom constraint
model.constraints['custom_constraint'] = { max: someValue };
```

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@imishipping.com

## 📄 License

MIT License - Free to use and modify

## 🙏 Acknowledgments

- SheetJS for Excel processing
- javascript-lp-solver for optimization
- Google Gemini for AI explanations

---

**Built with ❤️ for IMI Shipping & Freight**

*Optimizing global logistics, one route at a time* 🌍📦
