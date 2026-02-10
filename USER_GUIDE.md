# 📖 IMI Shipping & Freight Dashboard - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Understanding Your Data](#understanding-your-data)
3. [Running Optimizations](#running-optimizations)
4. [Interpreting Results](#interpreting-results)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Getting Started

### What is This Dashboard?

The IMI Shipping & Freight Dashboard is an optimization tool that helps you:
- **Minimize shipping costs** across your entire network
- **Maximize contract utilization** (COAs)
- **Balance port capacities** efficiently
- **Plan routes** that satisfy all business constraints

### Who Should Use This?

- Logistics Managers
- Shipping Coordinators
- Operations Planners
- Supply Chain Analysts
- Contract Managers

---

## Understanding Your Data

### Required Files

You need 4 Excel files to run an optimization:

#### 1️⃣ COA List (Contract of Affreightment List)

**What it contains:** Your shipping contracts with carriers

**Key columns:**
- `COA ID#`: Unique contract identifier (e.g., "PB-2016")
- `Min (Firm)`: Minimum shipments you MUST send via this contract
- `Max (Firm + Optionals)`: Maximum shipments allowed on this contract
- `BAF Strike`: Base bunker price (fuel adjustment starts above this)
- `BAF Factor`: How much cost increases per $1 bunker price increase

**Example:**
```
COA ID#  | Min | Max | BAF Strike | BAF Factor
PB-2016  | 7   | 9   | 250        | 0.01
```

**What this means:** You must send at least 7 shipments, can send up to 9, and if bunker prices exceed $250/mt, you pay an extra $0.01 per mt for every $1 bunker price increase.

#### 2️⃣ COA Rates

**What it contains:** Specific routes available under each contract

**Key columns:**
- `COA ID#`: Which contract this route belongs to
- `Load Port`: Where cargo originates
- `Discharge Port`: Where cargo is delivered
- `Price (pmt)`: Base freight rate ($ per metric ton)
- `Consumption Bunker`: Fuel consumption for this route (mt)

**Example:**
```
COA ID#  | Load Port | Discharge Port | Price | Consumption
PB-2016  | Garrucha  | Camden        | 9.29  | 450
```

#### 3️⃣ FOB Prices

**What it contains:** Port-specific costs and capacity limits

**Key columns:**
- `Load Port`: Port name
- `Price`: FOB cost per metric ton
- `Min`: Minimum shipments from this port
- `Max`: Maximum shipments from this port

**Example:**
```
Load Port | Price | Min | Max
Garrucha  | 10    | 5   | 99
```

**What this means:** You must send at least 5 shipments from Garrucha, can send up to 99, and each adds $10/mt to total cost.

#### 4️⃣ Shipment Schedule

**What it contains:** The shipments you need to make

**Key columns:**
- `Shipment Number`: Unique ID
- `Loading Port`: Origin (can be "Port A or Port B")
- `Discharge Port`: Destination
- `Loading Month / Laycan`: When it ships

**Example:**
```
Shipment # | Loading Port        | Discharge Port
1          | Garrucha           | Buchanan
3          | Garrucha or Almeria| Coeymans
```

**Note:** Shipment #3 can load from EITHER port - the optimizer will choose the cheapest option!

---

## Running Optimizations

### Step-by-Step Process

#### Step 1: Upload Your Files

1. Click each upload box
2. Select the corresponding Excel file
3. Wait for "✓ filename.xlsx" confirmation
4. All 4 boxes must show green checkmarks

**Tip:** Files must be `.xlsx` or `.xls` format

#### Step 2: Set Parameters

**Bunker Price ($/mt):**
- Current market price for marine fuel
- Check sites like Bunkerworld.com for live prices
- Example: If Singapore bunker fuel is $425/mt, enter 425

**Optimization Goal:**
- **Minimize Total Cost**: Pure cost optimization (recommended)
- **Balance Cost & Efficiency**: Considers route efficiency alongside cost

#### Step 3: Configure Gemini AI (Optional)

1. Check "Use Google Gemini AI for Explanation"
2. Get your free API key:
   - Visit https://makersuite.google.com/app/apikey
   - Sign in with Google account
   - Click "Create API Key"
   - Copy and paste into dashboard

**Why use Gemini?**
- Explains WHY the solution is optimal
- Identifies cost-saving opportunities
- Provides strategic insights

#### Step 4: Optimize!

Click the big red **"🚀 Optimize Routes"** button

**What happens:**
1. Dashboard validates all data ✓
2. Builds mathematical optimization model ✓
3. Solves for minimum cost ✓
4. Generates detailed results ✓
5. (If enabled) Gets AI explanation ✓

**Time:** Usually 2-5 seconds for 20-30 shipments

---

## Interpreting Results

### Summary Cards

#### Total Cost
The complete expense for all shipments including:
- Base freight rates
- Bunker fuel adjustments (BAF)
- FOB charges

**Example:** $15,234.50 means your entire shipping plan costs $15,234.50

#### Total Shipments
Number of shipments in your schedule

**Important:** Should match your Shipment Schedule file

#### Average Cost/Shipment
Total Cost ÷ Total Shipments

**Use this to:** Compare different scenarios (e.g., different bunker prices)

#### COAs Utilized
How many different contracts are being used

**Lower is better?** Not always! Sometimes using more contracts gets better rates.

### Selected Routes Table

Shows the optimal route chosen for each shipment.

**Reading a row:**
```
Shipment # | Load Port | Discharge Port | COA ID  | Base Rate | FOB  | Total Cost
1          | Garrucha  | Buchanan      | PB-2016 | $9.29    | $10  | $19.29
```

**This means:** Shipment #1 should load at Garrucha, discharge at Buchanan, using contract PB-2016, for a total of $19.29/mt.

**Why these routes?** They satisfy all constraints at minimum total cost!

### Constraint Analysis

#### COA Utilization Table

Shows how each contract is being used:

```
COA ID  | Used | Min Req | Max Allowed | Utilization %
PB-2016 | 7    | 7       | 9          | 77.8%
```

**What to look for:**
- ✅ Used ≥ Min Required (contract minimums are met)
- ✅ Used ≤ Max Allowed (not exceeding limits)
- 🎯 High utilization often means good contract value

#### Port Utilization Table

Shows how each port is being used:

```
Port     | Used | Min Req | Max Allowed | Utilization %
Garrucha | 25   | 5       | 99         | 25.3%
```

**What to look for:**
- ✅ All minimums are satisfied
- ⚠️ Very high utilization (>90%) = capacity constraint
- 💡 Low utilization = room to grow

### AI Explanation (if enabled)

Gemini AI provides:

1. **Cost Optimization Analysis**
   - Why this solution minimizes cost
   - Key cost drivers

2. **Contract Strategy**
   - Which COAs provide best value
   - Utilization insights

3. **Port Selection Strategy**
   - Why certain ports were favored
   - Geographic efficiency

4. **Recommendations**
   - Potential cost savings
   - Contract negotiation opportunities

---

## Advanced Features

### Scenario Comparison

After running one optimization, you can:
1. Adjust bunker price
2. Click "Optimize Routes" again
3. See cost difference vs. previous run

**Use this to:**
- Model fuel price changes
- Plan for market volatility
- Justify hedging strategies

**Example Insight:**
"If bunker prices rise from $400 to $450, our total costs increase by $2,341 (15.4%)"

### Sensitivity Analysis

**Try these scenarios:**

**Scenario 1: Fuel Spike**
- Run at current bunker price ($400)
- Run at +25% ($500)
- Compare total cost impact

**Scenario 2: Port Strategy**
- Manually adjust which ports in Shipment Schedule
- Compare total costs

**Scenario 3: Contract Changes**
- Upload modified COA List (new min/max)
- See how it affects routing

### Exporting Results

**To save results:**
1. Take screenshot of summary cards
2. Copy-paste tables into Excel
3. Save AI explanation as text

**Coming soon:** Direct Excel export!

---

## Troubleshooting

### "No feasible solution found"

**Causes:**
1. **COA minimums too high**
   - You have 20 shipments but COA minimums total 25
   - Solution: Reduce minimums or add shipments

2. **Port minimums too high**
   - Similar issue with port constraints
   - Solution: Lower minimums in FOB Prices file

3. **No routes available**
   - A shipment has no matching routes in COA Rates
   - Solution: Add routes or remove shipment

**How to diagnose:**
- Check that sum of COA minimums ≤ total shipments
- Ensure every shipment has at least one route option

### "Optimization taking too long"

**Normal:** 2-5 seconds for 20-30 shipments

**If longer than 30 seconds:**
1. Refresh page
2. Re-upload files
3. Try with fewer shipments first

### "Gemini API error"

**Common issues:**
1. **Invalid API key**
   - Get new key from https://makersuite.google.com
   - Copy entire key carefully

2. **Quota exceeded**
   - Free tier has daily limits
   - Wait 24 hours or upgrade quota

3. **Network error**
   - Check internet connection
   - Try again in a few seconds

### File Upload Errors

**"Invalid file type"**
- File must be .xlsx or .xls
- Save as Excel file if using Google Sheets

**"Error reading file"**
- File may be corrupted
- Open in Excel and save again

**"Missing columns"**
- Check that column names match exactly
- See "Understanding Your Data" section

---

## Best Practices

### Data Quality

✅ **Do:**
- Keep Excel files clean (no extra rows/columns)
- Use consistent naming (e.g., "Garrucha" not "garrucha")
- Verify numbers are formatted as numbers, not text
- Test with small dataset first

❌ **Don't:**
- Mix text and numbers in same column
- Leave required columns empty
- Use special characters in port names
- Modify column headers

### Optimization Strategy

**For Regular Planning:**
1. Run weekly with current bunker prices
2. Save results for comparison
3. Use AI insights to negotiate better rates

**For Contract Negotiations:**
1. Model different COA min/max scenarios
2. Identify which contracts provide most value
3. Use data to support negotiations

**For Budgeting:**
1. Run scenarios at different fuel prices
2. Calculate best/worst case costs
3. Build contingency plans

### Performance Tips

**For faster optimization:**
- Start with current month's shipments only
- Once verified, add full schedule
- Group similar shipments when possible

**For better insights:**
- Always enable Gemini explanations
- Compare multiple bunker price scenarios
- Track trends over time

---

## Glossary

**BAF (Bunker Adjustment Factor):** Additional charge when fuel prices exceed a threshold

**COA (Contract of Affreightment):** Long-term shipping contract with min/max commitments

**FOB (Free On Board):** Cost to load cargo at origin port

**pmt:** Per metric ton (pricing unit)

**Laycan:** Loading date window for a shipment

**Bunker:** Marine fuel (heavy fuel oil or marine diesel)

**Discharge Port:** Destination port where cargo is unloaded

**Load Port:** Origin port where cargo is loaded

**Utilization:** Percentage of contract or capacity being used

**Feasible Solution:** A routing plan that satisfies all constraints

**Optimal Solution:** The feasible solution with lowest total cost

---

## Getting Help

**Common Questions:**
1. Check this guide first
2. See README.md for technical details
3. Review DEPLOYMENT.md for hosting issues

**Still stuck?**
- Email: support@imishipping.com
- Create GitHub issue
- Contact your system administrator

---

**Happy Optimizing! 🚢**

*Remember: Small improvements in routing can save thousands of dollars per year!*
