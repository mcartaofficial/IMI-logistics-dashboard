// IMI Shipping & Freight - Route Optimization Dashboard
// Main Application Logic - FIXED VERSION

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
                
                // FIX: Use defval option to handle empty cells properly
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                    defval: null,
                    raw: false  // This ensures dates and numbers are parsed correctly
                });

                // FIX: Clean and validate the data
                const cleanedData = this.cleanExcelData(jsonData, dataKey);
                
                this.data[dataKey] = cleanedData;
                document.getElementById(statusId).textContent = `✓ ${file.name} (${cleanedData.length} rows)`;
                document.getElementById(statusId).style.color = '#2e7d32';
                document.getElementById(uploadDivId).classList.add('uploaded');

                // Display data preview
                console.log(`${dataKey} loaded:`, cleanedData);

                this.checkAllFilesUploaded();
            } catch (error) {
                document.getElementById(statusId).textContent = `✗ Error reading file: ${error.message}`;
                document.getElementById(statusId).style.color = '#c62828';
                console.error('Error reading file:', error);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    // FIX: Add data cleaning function
    cleanExcelData(data, dataType) {
        return data.map(row => {
            const cleanedRow = {};
            for (const [key, value] of Object.entries(row)) {
                // Remove extra spaces from keys
                const cleanKey = key.trim();
                
                // Handle null/undefined values
                if (value === null || value === undefined || value === '') {
                    cleanedRow[cleanKey] = null;
                } else if (typeof value === 'string') {
                    // Trim string values
                    cleanedRow[cleanKey] = value.trim();
                } else if (typeof value === 'number') {
                    // Keep numbers as-is
                    cleanedRow[cleanKey] = value;
                } else {
                    cleanedRow[cleanKey] = value;
                }
            }
            return cleanedRow;
        });
    }

    checkAllFilesUploaded() {
        const allUploaded = Object.values(this.data).every(data => data !== null);
        document.getElementById('optimize-btn').disabled = !allUploaded;
        
        if (allUploaded) {
            // FIX: Validate data integrity
            this.validateUploadedData();
        }
    }

    // FIX: Add data validation
    validateUploadedData() {
        const issues = [];
        
        // Check COA List
        if (!this.data.coaList.some(row => row['COA ID#'])) {
            issues.push('COA List: Missing "COA ID#" column');
        }
        if (!this.data.coaList.some(row => row['Min (Firm)'] !== null)) {
            issues.push('COA List: Missing "Min (Firm)" column');
        }
        
        // Check COA Rates
        if (!this.data.coaRates.some(row => row['Load Port'])) {
            issues.push('COA Rates: Missing "Load Port" column');
        }
        if (!this.data.coaRates.some(row => row['Discharge Port'])) {
            issues.push('COA Rates: Missing "Discharge Port" column');
        }
        
        // Check Shipment Schedule
        if (!this.data.shipmentSchedule.some(row => row['Shipment Number'])) {
            issues.push('Shipment Schedule: Missing "Shipment Number" column');
        }
        
        if (issues.length > 0) {
            alert('Data validation issues found:\n\n' + issues.join('\n'));
            console.error('Validation issues:', issues);
        }
    }

    async runOptimization() {
        try {
            // Show loading
            document.getElementById('loading').style.display = 'block';
            document.getElementById('results-section').classList.remove('active');

            // Get parameters
            const bunkerPrice = parseFloat(document.getElementById('bunker-price').value);
            const optimizationGoal = document.getElementById('optimization-goal').value;

            // FIX: Validate inputs before optimization
            if (isNaN(bunkerPrice) || bunkerPrice < 0) {
                throw new Error('Invalid bunker price. Please enter a positive number.');
            }

            // Run optimization
            const results = await this.optimizeRoutes(bunkerPrice, optimizationGoal);
            this.results = results;

            // Display results
            this.displayResults(results);

            // Get AI explanation if enabled and solution is feasible
            if (document.getElementById('use-gemini').checked && results.feasible) {
                await this.getGeminiExplanation(results);
            }

            // Hide loading, show results
            document.getElementById('loading').style.display = 'none';
            document.getElementById('results-section').classList.add('active');

            // Store scenario only if feasible
            if (results.feasible) {
                this.scenarios.push({
                    timestamp: new Date().toLocaleString(),
                    bunkerPrice: bunkerPrice,
                    goal: optimizationGoal,
                    totalCost: results.totalCost,
                    numShipments: results.routes.length
                });
                this.updateScenarioComparison();
            }

        } catch (error) {
            document.getElementById('loading').style.display = 'none';
            alert('Error during optimization: ' + error.message);
            console.error('Optimization error:', error);
        }
    }

    async optimizeRoutes(bunkerPrice, goal) {
        // Build optimization model using linear programming
        const { coaList, coaRates, fobPrices, shipmentSchedule } = this.data;

        // Parse shipments
        const shipments = this.parseShipments(shipmentSchedule);
        
        // FIX: Check if we have any shipments
        if (shipments.length === 0) {
            throw new Error('No shipments found in Shipment Schedule');
        }

        // Build cost matrix
        const { routes, costMatrix } = this.buildRouteOptions(shipments, coaRates, fobPrices, coaList, bunkerPrice);
        
        // FIX: Check if we have any routes
        if (routes.length === 0) {
            throw new Error('No valid routes found. Check that your COA Rates match your shipment requirements.');
        }

        // Solve using linear programming
        const solution = this.solveLP(routes, costMatrix, coaList, fobPrices);

        return solution;
    }

    parseShipments(schedule) {
        const shipments = [];
        schedule.forEach(row => {
            // FIX: Handle different possible column names
            const loadingPort = row['Loading Port'] || row['Load Port'] || row['loading port'];
            const dischargePort = row['Discharge Port'] || row['discharge port'];
            const shipmentNumber = row['Shipment Number'] || row['shipment number'] || row['Shipment #'];
            
            if (!loadingPort || !dischargePort || !shipmentNumber) {
                console.warn('Skipping row with missing data:', row);
                return;
            }
            
            let ports = [loadingPort];

            // Handle "Port A or Port B" format
            if (loadingPort && loadingPort.toLowerCase().includes(' or ')) {
                ports = loadingPort.split(/\s+or\s+/i).map(p => p.trim());
            }

            ports.forEach(port => {
                shipments.push({
                    id: shipmentNumber,
                    loadPort: port,
                    dischargePort: dischargePort,
                    month: row['Loading Month / Laycan'] || row['Month']
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
            const availableRoutes = coaRates.filter(rate => {
                const rateLoadPort = (rate['Load Port'] || '').trim();
                const rateDischargePort = (rate['Discharge Port'] || '').trim();
                const shipLoadPort = (shipment.loadPort || '').trim();
                const shipDischargePort = (shipment.dischargePort || '').trim();
                
                return rateLoadPort === shipLoadPort && rateDischargePort === shipDischargePort;
            });

            if (availableRoutes.length === 0) {
                console.warn(`No routes found for shipment ${shipment.id}: ${shipment.loadPort} -> ${shipment.dischargePort}`);
            }

            availableRoutes.forEach((route, idx) => {
                const routeId = `S${shipment.id}_${shipment.loadPort}_${shipment.dischargePort}_${route['COA ID#']}_${idx}`.replace(/[^a-zA-Z0-9_]/g, '_');
                
                // Get FOB price
                const fobData = fobPrices.find(f => {
                    const fobPort = (f['Load Port'] || '').trim();
                    const shipPort = (shipment.loadPort || '').trim();
                    return fobPort === shipPort;
                });
                const fobPrice = fobData ? (parseFloat(fobData['Price']) || 0) : 0;

                // Calculate cost
                const cost = this.calculateRouteCost(route, fobPrice, bunkerPrice, coaList);

                routes.push({
                    id: routeId,
                    shipmentId: shipment.id,
                    loadPort: shipment.loadPort,
                    dischargePort: shipment.dischargePort,
                    coaId: route['COA ID#'],
                    baseRate: parseFloat(route['Price (pmt)']) || 0,
                    bunkerConsumption: parseFloat(route['Consumption Bunker']) || 0,
                    fobPrice: fobPrice,
                    totalCost: cost
                });

                costMatrix[routeId] = cost;
            });
        });

        return { routes, costMatrix };
    }

    calculateRouteCost(route, fobPrice, bunkerPrice, coaList) {
        const baseRate = parseFloat(route['Price (pmt)']) || 0;
        const consumption = parseFloat(route['Consumption Bunker']) || 0;
        
        // Find COA for BAF calculation
        const coa = coaList.find(c => c['COA ID#'] === route['COA ID#']);
        let bafCost = 0;

        if (coa && coa['BAF Factor ($/pmt per $/mt Bunker)']) {
            const bafStrike = parseFloat(coa['BAF Strike']) || 0;
            const bafFactor = parseFloat(coa['BAF Factor ($/pmt per $/mt Bunker)']);
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
            const constraintName = `shipment_${shipId}`.replace(/[^a-zA-Z0-9_]/g, '_');
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
            const minShipments = parseFloat(coa['Min (Firm)']) || 0;
            const maxShipments = parseFloat(coa['Max (Firm + Optionals)']);

            const coaIdSafe = String(coaId).replace(/[^a-zA-Z0-9_]/g, '_');

            // Minimum constraint
            if (minShipments > 0) {
                const minConstraintName = `coa_${coaIdSafe}_min`;
                model.constraints[minConstraintName] = { min: minShipments };
                
                routes.filter(r => r.coaId === coaId).forEach(route => {
                    if (!model.variables[route.id][minConstraintName]) {
                        model.variables[route.id][minConstraintName] = 0;
                    }
                    model.variables[route.id][minConstraintName] = 1;
                });
            }

            // Maximum constraint
            if (maxShipments !== null && maxShipments !== undefined && !isNaN(maxShipments)) {
                const maxConstraintName = `coa_${coaIdSafe}_max`;
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
            const minCapacity = parseFloat(fob['Min']) || 0;
            const maxCapacity = parseFloat(fob['Max']);

            const portSafe = String(port).replace(/[^a-zA-Z0-9_]/g, '_');

            // Minimum constraint
            if (minCapacity > 0) {
                const minConstraintName = `fob_${portSafe}_min`;
                model.constraints[minConstraintName] = { min: minCapacity };
                
                routes.filter(r => r.loadPort === port).forEach(route => {
                    if (!model.variables[route.id][minConstraintName]) {
                        model.variables[route.id][minConstraintName] = 0;
                    }
                    model.variables[route.id][minConstraintName] = 1;
                });
            }

            // Maximum constraint
            if (maxCapacity !== null && maxCapacity !== undefined && !isNaN(maxCapacity)) {
                const maxConstraintName = `fob_${portSafe}_max`;
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
        try {
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
        } catch (error) {
            console.error('Solver error:', error);
            return {
                feasible: false,
                totalCost: 0,
                routes: [],
                coaUsage: {},
                portUsage: {},
                numShipments: 0,
                error: error.message
            };
        }
    }

    displayResults(results) {
        if (!results.feasible) {
            document.getElementById('summary-grid').innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1;">
                    <h3>⚠️ No Feasible Solution Found</h3>
                    <p><strong>This means your constraints are mathematically incompatible.</strong></p>
                    <p>Common issues:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>COA minimum requirements exceed total shipments available</li>
                        <li>No routes defined between required origin-destination pairs</li>
                        <li>Port capacity constraints cannot be satisfied</li>
                    </ul>
                    <p><strong>Suggested fixes:</strong></p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Check that total COA minimums ≤ total shipments</li>
                        <li>Verify COA Rates file has routes for all shipment O-D pairs</li>
                        <li>Review port min/max capacities</li>
                        <li>Consider reducing COA minimum requirements</li>
                    </ul>
                    ${results.error ? `<p style="color: #c62828; margin-top: 1rem;"><strong>Error:</strong> ${results.error}</p>` : ''}
                </div>
            `;
            
            // Still show constraint analysis to help debug
            this.displayConstraintAnalysis(results);
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
        let analysisHTML = '<h3 style="color: var(--imi-red);">COA Utilization</h3><table><thead><tr><th>COA ID</th><th>Used</th><th>Min Required</th><th>Max Allowed</th><th>Utilization %</th><th>Status</th></tr></thead><tbody>';

        this.data.coaList.forEach(coa => {
            const coaId = coa['COA ID#'];
            const used = results.coaUsage[coaId] || 0;
            const min = parseFloat(coa['Min (Firm)']) || 0;
            const max = parseFloat(coa['Max (Firm + Optionals)']);
            const utilization = max > 0 ? ((used / max) * 100).toFixed(1) : 0;
            
            let status = '✓ OK';
            let statusColor = '#2e7d32';
            if (used < min) {
                status = '⚠️ Below Min';
                statusColor = '#c62828';
            } else if (max && used > max) {
                status = '⚠️ Above Max';
                statusColor = '#c62828';
            }

            analysisHTML += `
                <tr>
                    <td>${coaId}</td>
                    <td>${used}</td>
                    <td>${min}</td>
                    <td>${max || 'N/A'}</td>
                    <td>${utilization}%</td>
                    <td style="color: ${statusColor}; font-weight: bold;">${status}</td>
                </tr>
            `;
        });

        analysisHTML += '</tbody></table>';

        analysisHTML += '<h3 style="margin-top: 2rem; color: var(--imi-red);">Port Utilization</h3><table><thead><tr><th>Port</th><th>Used</th><th>Min Required</th><th>Max Allowed</th><th>Utilization %</th><th>Status</th></tr></thead><tbody>';

        this.data.fobPrices.forEach(fob => {
            const port = fob['Load Port'];
            const used = results.portUsage[port] || 0;
            const min = parseFloat(fob['Min']) || 0;
            const max = parseFloat(fob['Max']);
            const utilization = max > 0 ? ((used / max) * 100).toFixed(1) : 0;
            
            let status = '✓ OK';
            let statusColor = '#2e7d32';
            if (used < min) {
                status = '⚠️ Below Min';
                statusColor = '#c62828';
            } else if (max && used > max) {
                status = '⚠️ Above Max';
                statusColor = '#c62828';
            }

            analysisHTML += `
                <tr>
                    <td>${port}</td>
                    <td>${used}</td>
                    <td>${min}</td>
                    <td>${max}</td>
                    <td>${utilization}%</td>
                    <td style="color: ${statusColor}; font-weight: bold;">${status}</td>
                </tr>
            `;
        });

        analysisHTML += '</tbody></table>';

        document.getElementById('constraint-analysis').innerHTML = analysisHTML;
    }

    /**
     * UPDATED: FIXED VERSION OF AI EXPLANATION
     * Uses stable API version v1 and corrected model identifier.
     */
    async getGeminiExplanation(results) {
        const apiKey = document.getElementById('gemini-api-key').value.trim();
        
        if (!apiKey) {
            document.getElementById('ai-explanation').style.display = 'none';
            return;
        }

        try {
            document.getElementById('ai-explanation-content').innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="spinner"></div><p>Generating AI explanation...</p></div>';
            document.getElementById('ai-explanation').style.display = 'block';

            // Prepare comprehensive context for Gemini
            const context = {
                totalCost: results.totalCost,
                numShipments: results.numShipments,
                avgCost: results.totalCost / results.numShipments,
                coaUsage: results.coaUsage,
                portUsage: results.portUsage,
                coaDetails: this.data.coaList.map(coa => ({
                    id: coa['COA ID#'],
                    used: results.coaUsage[coa['COA ID#']] || 0,
                    min: coa['Min (Firm)'],
                    max: coa['Max (Firm + Optionals)']
                })),
                portDetails: this.data.fobPrices.map(fob => ({
                    port: fob['Load Port'],
                    used: results.portUsage[fob['Load Port']] || 0,
                    price: fob['Price']
                })),
                sampleRoutes: results.routes.slice(0, 5).map(r => ({
                    shipment: r.shipmentId,
                    from: r.loadPort,
                    to: r.dischargePort,
                    coa: r.coaId,
                    cost: r.totalCost.toFixed(2)
                }))
            };

            const prompt = `You are an expert shipping logistics analyst. Analyze this route optimization result and provide a clear, professional explanation.

**Optimization Results:**
- Total Cost: $${context.totalCost.toFixed(2)}
- Number of Shipments: ${context.numShipments}
- Average Cost per Shipment: $${context.avgCost.toFixed(2)}

**COA Contract Utilization:**
${context.coaDetails.map(c => `- ${c.id}: Used ${c.used} shipments (Min: ${c.min}, Max: ${c.max || 'N/A'})`).join('\n')}

**Port Distribution:**
${context.portDetails.map(p => `- ${p.port}: ${p.used} shipments (FOB Price: $${p.price})`).join('\n')}

Please provide a concise explanation covering cost efficiency, COA strategy, and port selection. Be data-driven.`;

            // THE FIX: Updated to v1 stable endpoint and corrected model string format
            const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            // Safety check for candidates array
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                const explanation = data.candidates[0].content.parts[0].text;
                
                const formattedExplanation = explanation
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br>');
                
                document.getElementById('ai-explanation-content').innerHTML = `<p>${formattedExplanation}</p>`;
            } else {
                throw new Error('Invalid response structure from Gemini API');
            }

        } catch (error) {
            console.error('Gemini API error:', error);
            document.getElementById('ai-explanation-content').innerHTML = `
                <div class="error-message">
                    Error getting AI explanation: ${error.message}
                </div>
            `;
        }
    }

    updateScenarioComparison() {
        if (this.scenarios.length === 0) {
            document.getElementById('scenario-comparison').innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <p>Run optimization scenarios to compare results here.</p>
                </div>
            `;
            return;
        }

        let comparisonHTML = '<div class="scenario-selector">';
        
        this.scenarios.forEach((scenario, index) => {
            comparisonHTML += `
                <div class="scenario-card ${index === this.scenarios.length - 1 ? 'selected' : ''}">
                    <div class="scenario-title">Scenario ${index + 1}</div>
                    <p><strong>Time:</strong> ${scenario.timestamp}</p>
                    <p><strong>Total Cost:</strong> $${scenario.totalCost.toFixed(2)}</p>
                </div>
            `;
        });

        comparisonHTML += '</div>';
        document.getElementById('scenario-comparison').innerHTML = comparisonHTML;
    }
}

// Initialize the application
const optimizer = new ShippingOptimizer();
