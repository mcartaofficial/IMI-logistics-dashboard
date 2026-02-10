// IMI Shipping & Freight - Route Optimization Dashboard
// Main Application Logic

class ShippingOptimizer {
    constructor() {
        this.data = {
            coaList: null,
            coaRates: null,
            fobPrices: null,
            shipmentSchedule: null
        };
        this.results = null;
        this.scenarios = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // File upload handlers
        document.getElementById('coa-list-file').addEventListener('change', (e) => this.handleFileUpload(e, 'coaList', 'coa-list-status', 'coa-list-upload'));
        document.getElementById('coa-rate-file').addEventListener('change', (e) => this.handleFileUpload(e, 'coaRates', 'coa-rate-status', 'coa-rate-upload'));
        document.getElementById('fob-file').addEventListener('change', (e) => this.handleFileUpload(e, 'fobPrices', 'fob-status', 'fob-upload'));
        document.getElementById('schedule-file').addEventListener('change', (e) => this.handleFileUpload(e, 'shipmentSchedule', 'schedule-status', 'schedule-upload'));

        // Optimization button
        document.getElementById('optimize-btn').addEventListener('click', () => this.runOptimization());

        // Gemini checkbox
        document.getElementById('use-gemini').addEventListener('change', (e) => {
            document.getElementById('gemini-api-section').style.display = e.target.checked ? 'flex' : 'none';
        });
    }

    handleFileUpload(event, dataKey, statusId, uploadDivId) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                this.data[dataKey] = jsonData;
                document.getElementById(statusId).textContent = `✓ ${file.name}`;
                document.getElementById(statusId).style.color = '#2e7d32';
                document.getElementById(uploadDivId).classList.add('uploaded');

                this.checkAllFilesUploaded();
            } catch (error) {
                document.getElementById(statusId).textContent = `✗ Error reading file`;
                document.getElementById(statusId).style.color = '#c62828';
                console.error('Error reading file:', error);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    checkAllFilesUploaded() {
        const allUploaded = Object.values(this.data).every(data => data !== null);
        document.getElementById('optimize-btn').disabled = !allUploaded;
    }

    async runOptimization() {
        try {
            // Show loading
            document.getElementById('loading').style.display = 'block';
            document.getElementById('results-section').classList.remove('active');

            // Get parameters
            const bunkerPrice = parseFloat(document.getElementById('bunker-price').value);
            const optimizationGoal = document.getElementById('optimization-goal').value;

            // Run optimization
            const results = await this.optimizeRoutes(bunkerPrice, optimizationGoal);
            this.results = results;

            // Display results
            this.displayResults(results);

            // Get AI explanation if enabled
            if (document.getElementById('use-gemini').checked) {
                await this.getGeminiExplanation(results);
            }

            // Hide loading, show results
            document.getElementById('loading').style.display = 'none';
            document.getElementById('results-section').classList.add('active');

            // Store scenario
            this.scenarios.push({
                timestamp: new Date().toLocaleString(),
                bunkerPrice: bunkerPrice,
                goal: optimizationGoal,
                totalCost: results.totalCost,
                numShipments: results.routes.length
            });
            this.updateScenarioComparison();

        } catch (error) {
            document.getElementById('loading').style.display = 'none';
            alert('Error during optimization: ' + error.message);
            console.error(error);
        }
    }

    async optimizeRoutes(bunkerPrice, goal) {
        // Build optimization model using linear programming
        const { coaList, coaRates, fobPrices, shipmentSchedule } = this.data;

        // Parse shipments
        const shipments = this.parseShipments(shipmentSchedule);

        // Build cost matrix
        const { routes, costMatrix } = this.buildRouteOptions(shipments, coaRates, fobPrices, coaList, bunkerPrice);

        // Solve using linear programming
        const solution = this.solveLP(routes, costMatrix, coaList, fobPrices);

        return solution;
    }

    parseShipments(schedule) {
        const shipments = [];
        schedule.forEach(row => {
            const loadingPort = row['Loading Port'] || row['Loading Port'];
            let ports = [loadingPort];

            // Handle "Port A or Port B" format
            if (loadingPort && loadingPort.toLowerCase().includes(' or ')) {
                ports = loadingPort.split(/\s+or\s+/i).map(p => p.trim());
            }

            ports.forEach(port => {
                shipments.push({
                    id: row['Shipment Number'],
                    loadPort: port,
                    dischargePort: row['Discharge Port'],
                    month: row['Loading Month / Laycan']
                });
            });
        });
        return shipments;
    }

    buildRouteOptions(shipments, coaRates, fobPrices, coaList, bunkerPrice) {
        const routes = [];
        const costMatrix = {};

        shipments.forEach(shipment => {
            // Find available routes for this shipment
            const availableRoutes = coaRates.filter(rate => 
                rate['Load Port'] === shipment.loadPort &&
                rate['Discharge Port'] === shipment.dischargePort
            );

            availableRoutes.forEach((route, idx) => {
                const routeId = `S${shipment.id}_${shipment.loadPort}_${shipment.dischargePort}_${route['COA ID#']}_${idx}`;
                
                // Get FOB price
                const fobData = fobPrices.find(f => f['Load Port'] === shipment.loadPort);
                const fobPrice = fobData ? (fobData['Price'] || 0) : 0;

                // Calculate cost
                const cost = this.calculateRouteCost(route, fobPrice, bunkerPrice, coaList);

                routes.push({
                    id: routeId,
                    shipmentId: shipment.id,
                    loadPort: shipment.loadPort,
                    dischargePort: shipment.dischargePort,
                    coaId: route['COA ID#'],
                    baseRate: route['Price (pmt)'] || 0,
                    bunkerConsumption: route['Consumption Bunker'] || 0,
                    fobPrice: fobPrice,
                    totalCost: cost
                });

                costMatrix[routeId] = cost;
            });
        });

        return { routes, costMatrix };
    }

    calculateRouteCost(route, fobPrice, bunkerPrice, coaList) {
        const baseRate = route['Price (pmt)'] || 0;
        const consumption = route['Consumption Bunker'] || 0;
        
        // Find COA for BAF calculation
        const coa = coaList.find(c => c['COA ID#'] === route['COA ID#']);
        let bafCost = 0;

        if (coa && coa['BAF Factor ($/pmt per $/mt Bunker)']) {
            const bafStrike = coa['BAF Strike'] || 0;
            const bafFactor = coa['BAF Factor ($/pmt per $/mt Bunker)'];
            if (bunkerPrice > bafStrike) {
                bafCost = (bunkerPrice - bafStrike) * bafFactor;
            }
        }

        return baseRate + bafCost + fobPrice;
    }

    solveLP(routes, costMatrix, coaList, fobPrices) {
        // Build linear programming model
        const model = {
            optimize: 'totalCost',
            opType: 'min',
            constraints: {},
            variables: {},
            ints: {}
        };

        // Add variables and their costs
        routes.forEach(route => {
            model.variables[route.id] = { totalCost: costMatrix[route.id] };
            model.ints[route.id] = 1; // Binary variable
        });

        // Constraint 1: Each shipment must be assigned exactly once
        const shipmentIds = [...new Set(routes.map(r => r.shipmentId))];
        shipmentIds.forEach(shipId => {
            const constraintName = `shipment_${shipId}`;
            model.constraints[constraintName] = { equal: 1 };
            
            routes.filter(r => r.shipmentId === shipId).forEach(route => {
                if (!model.variables[route.id][constraintName]) {
                    model.variables[route.id][constraintName] = 0;
                }
                model.variables[route.id][constraintName] = 1;
            });
        });

        // Constraint 2: COA min/max limits
        coaList.forEach(coa => {
            const coaId = coa['COA ID#'];
            const minShipments = coa['Min (Firm)'] || 0;
            const maxShipments = coa['Max (Firm + Optionals)'];

            // Minimum constraint
            const minConstraintName = `coa_${coaId}_min`;
            model.constraints[minConstraintName] = { min: minShipments };
            
            routes.filter(r => r.coaId === coaId).forEach(route => {
                if (!model.variables[route.id][minConstraintName]) {
                    model.variables[route.id][minConstraintName] = 0;
                }
                model.variables[route.id][minConstraintName] = 1;
            });

            // Maximum constraint
            if (maxShipments !== null && maxShipments !== undefined && !isNaN(maxShipments)) {
                const maxConstraintName = `coa_${coaId}_max`;
                model.constraints[maxConstraintName] = { max: maxShipments };
                
                routes.filter(r => r.coaId === coaId).forEach(route => {
                    if (!model.variables[route.id][maxConstraintName]) {
                        model.variables[route.id][maxConstraintName] = 0;
                    }
                    model.variables[route.id][maxConstraintName] = 1;
                });
            }
        });

        // Constraint 3: FOB port capacity limits
        fobPrices.forEach(fob => {
            const port = fob['Load Port'];
            const minCapacity = fob['Min'] || 0;
            const maxCapacity = fob['Max'];

            // Minimum constraint
            const minConstraintName = `fob_${port}_min`;
            model.constraints[minConstraintName] = { min: minCapacity };
            
            routes.filter(r => r.loadPort === port).forEach(route => {
                if (!model.variables[route.id][minConstraintName]) {
                    model.variables[route.id][minConstraintName] = 0;
                }
                model.variables[route.id][minConstraintName] = 1;
            });

            // Maximum constraint
            if (maxCapacity !== null && maxCapacity !== undefined && !isNaN(maxCapacity)) {
                const maxConstraintName = `fob_${port}_max`;
                model.constraints[maxConstraintName] = { max: maxCapacity };
                
                routes.filter(r => r.loadPort === port).forEach(route => {
                    if (!model.variables[route.id][maxConstraintName]) {
                        model.variables[route.id][maxConstraintName] = 0;
                    }
                    model.variables[route.id][maxConstraintName] = 1;
                });
            }
        });

        // Solve the model
        const solution = solver.Solve(model);

        // Extract selected routes
        const selectedRoutes = [];
        let totalCost = solution.result || 0;

        for (const [varName, value] of Object.entries(solution)) {
            if (varName !== 'feasible' && varName !== 'result' && value > 0.5) {
                const route = routes.find(r => r.id === varName);
                if (route) {
                    selectedRoutes.push(route);
                }
            }
        }

        // Calculate statistics
        const coaUsage = {};
        const portUsage = {};

        selectedRoutes.forEach(route => {
            coaUsage[route.coaId] = (coaUsage[route.coaId] || 0) + 1;
            portUsage[route.loadPort] = (portUsage[route.loadPort] || 0) + 1;
        });

        return {
            feasible: solution.feasible,
            totalCost: totalCost,
            routes: selectedRoutes,
            coaUsage: coaUsage,
            portUsage: portUsage,
            numShipments: selectedRoutes.length
        };
    }

    displayResults(results) {
        if (!results.feasible) {
            document.getElementById('summary-grid').innerHTML = `
                <div class="error-message">
                    <strong>No feasible solution found.</strong><br>
                    Please check your constraints and try adjusting parameters.
                </div>
            `;
            return;
        }

        // Summary cards
        const avgCost = results.totalCost / results.numShipments;
        document.getElementById('summary-grid').innerHTML = `
            <div class="summary-card">
                <div class="label">Total Cost</div>
                <div class="value">$${results.totalCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            <div class="summary-card">
                <div class="label">Total Shipments</div>
                <div class="value">${results.numShipments}</div>
            </div>
            <div class="summary-card">
                <div class="label">Average Cost/Shipment</div>
                <div class="value">$${avgCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            <div class="summary-card">
                <div class="label">COAs Utilized</div>
                <div class="value">${Object.keys(results.coaUsage).length}</div>
            </div>
        `;

        // Routes table
        let tableHTML = `
            <h3 style="margin-top: 2rem; color: var(--imi-red);">Selected Routes</h3>
            <table>
                <thead>
                    <tr>
                        <th>Shipment #</th>
                        <th>Load Port</th>
                        <th>Discharge Port</th>
                        <th>COA ID</th>
                        <th>Base Rate</th>
                        <th>FOB Price</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
        `;

        results.routes.sort((a, b) => a.shipmentId - b.shipmentId).forEach(route => {
            tableHTML += `
                <tr>
                    <td>${route.shipmentId}</td>
                    <td>${route.loadPort}</td>
                    <td>${route.dischargePort}</td>
                    <td>${route.coaId}</td>
                    <td>$${route.baseRate.toFixed(2)}</td>
                    <td>$${route.fobPrice.toFixed(2)}</td>
                    <td><strong>$${route.totalCost.toFixed(2)}</strong></td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        document.getElementById('routes-table-container').innerHTML = tableHTML;

        // Constraint analysis
        this.displayConstraintAnalysis(results);
    }

    displayConstraintAnalysis(results) {
        let analysisHTML = '<h3 style="color: var(--imi-red);">COA Utilization</h3><table><thead><tr><th>COA ID</th><th>Used</th><th>Min Required</th><th>Max Allowed</th><th>Utilization %</th></tr></thead><tbody>';

        this.data.coaList.forEach(coa => {
            const coaId = coa['COA ID#'];
            const used = results.coaUsage[coaId] || 0;
            const min = coa['Min (Firm)'] || 0;
            const max = coa['Max (Firm + Optionals)'];
            const utilization = max > 0 ? ((used / max) * 100).toFixed(1) : 0;

            analysisHTML += `
                <tr>
                    <td>${coaId}</td>
                    <td>${used}</td>
                    <td>${min}</td>
                    <td>${max || 'N/A'}</td>
                    <td>${utilization}%</td>
                </tr>
            `;
        });

        analysisHTML += '</tbody></table>';

        analysisHTML += '<h3 style="margin-top: 2rem; color: var(--imi-red);">Port Utilization</h3><table><thead><tr><th>Port</th><th>Used</th><th>Min Required</th><th>Max Allowed</th><th>Utilization %</th></tr></thead><tbody>';

        this.data.fobPrices.forEach(fob => {
            const port = fob['Load Port'];
            const used = results.portUsage[port] || 0;
            const min = fob['Min'] || 0;
            const max = fob['Max'];
            const utilization = max > 0 ? ((used / max) * 100).toFixed(1) : 0;

            analysisHTML += `
                <tr>
                    <td>${port}</td>
                    <td>${used}</td>
                    <td>${min}</td>
                    <td>${max}</td>
                    <td>${utilization}%</td>
                </tr>
            `;
        });

        analysisHTML += '</tbody></table>';

        document.getElementById('constraint-analysis').innerHTML = analysisHTML;
    }

    async getGeminiExplanation(results) {
        const apiKey = document.getElementById('gemini-api-key').value;
        
        if (!apiKey) {
            document.getElementById('ai-explanation').style.display = 'none';
            return;
        }

        try {
            // Prepare context for Gemini
            const context = {
                totalCost: results.totalCost,
                numShipments: results.numShipments,
                avgCost: results.totalCost / results.numShipments,
                coaUsage: results.coaUsage,
                portUsage: results.portUsage,
                routes: results.routes.slice(0, 5) // First 5 routes as examples
            };

            const prompt = `You are an expert shipping logistics analyst. Analyze this route optimization result and explain why this is the optimal solution. Be concise and professional.

Context:
- Total Cost: $${context.totalCost.toFixed(2)}
- Number of Shipments: ${context.numShipments}
- Average Cost per Shipment: $${context.avgCost.toFixed(2)}
- COA Usage: ${JSON.stringify(context.coaUsage)}
- Port Usage: ${JSON.stringify(context.portUsage)}

Explain in 3-4 paragraphs:
1. Why this solution minimizes costs
2. How the COA contracts are optimally utilized
3. Key insights about the port selection strategy
4. Any recommendations for cost savings`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            
            if (data.candidates && data.candidates[0].content) {
                const explanation = data.candidates[0].content.parts[0].text;
                document.getElementById('ai-explanation-content').innerHTML = explanation.replace(/\n/g, '<br>');
                document.getElementById('ai-explanation').style.display = 'block';
            } else {
                throw new Error('Invalid response from Gemini API');
            }

        } catch (error) {
            console.error('Error getting Gemini explanation:', error);
            document.getElementById('ai-explanation-content').innerHTML = `
                <div class="error-message">
                    Error getting AI explanation: ${error.message}<br>
                    Please check your API key and try again.
                </div>
            `;
            document.getElementById('ai-explanation').style.display = 'block';
        }
    }

    updateScenarioComparison() {
        if (this.scenarios.length === 0) return;

        let comparisonHTML = '<div class="scenario-selector">';
        
        this.scenarios.forEach((scenario, index) => {
            comparisonHTML += `
                <div class="scenario-card ${index === this.scenarios.length - 1 ? 'selected' : ''}">
                    <div class="scenario-title">Scenario ${index + 1}</div>
                    <p><strong>Time:</strong> ${scenario.timestamp}</p>
                    <p><strong>Bunker Price:</strong> $${scenario.bunkerPrice}</p>
                    <p><strong>Total Cost:</strong> $${scenario.totalCost.toFixed(2)}</p>
                    <p><strong>Shipments:</strong> ${scenario.numShipments}</p>
                </div>
            `;
        });

        comparisonHTML += '</div>';

        if (this.scenarios.length > 1) {
            const costDiff = this.scenarios[this.scenarios.length - 1].totalCost - this.scenarios[this.scenarios.length - 2].totalCost;
            const diffPercent = (costDiff / this.scenarios[this.scenarios.length - 2].totalCost * 100).toFixed(2);
            
            comparisonHTML += `
                <div class="success-message" style="margin-top: 1rem;">
                    <strong>Comparison with Previous Scenario:</strong><br>
                    Cost difference: $${Math.abs(costDiff).toFixed(2)} (${diffPercent > 0 ? '+' : ''}${diffPercent}%)
                </div>
            `;
        }

        document.getElementById('scenario-comparison').innerHTML = comparisonHTML;
    }
}

// Initialize the application
const optimizer = new ShippingOptimizer();
