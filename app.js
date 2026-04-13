class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: { width: "100%", height: "800px" },
            elfsight: { width: "100%", height: "850px" }
        };

        this.workbookData = {};
        this.fileNames = [];
        this.interactiveSheetName = "LP_Enhanced_IMI_WhatIf_1";
        
        this.fileInput = document.getElementById('file-input');
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.tableOutput = document.getElementById('table-output');
        this.mapContainer = document.getElementById('map-container');
        this.titleText = document.getElementById('current-sheet-title');
        this.overlay = document.getElementById('upload-overlay');
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });
    }

    handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', raw: false });
            
            this.fileNames = wb.SheetNames;
            wb.SheetNames.forEach(name => {
                // We keep the data as a 2D array for easy coordinate-based editing
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
            });

            this.buildSidebar();
            this.overlay.style.display = 'none';
            document.getElementById('file-name-display').innerText = file.name.toUpperCase();
            this.sidebar.classList.add('collapsed');
            this.showHomePage(); 
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        const homeBtn = this.createNavItem('🏠 DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.nav.appendChild(homeBtn);

        this.fileNames.forEach(name => {
            const cleanName = name.replace(/_/g, ' ');
            const btn = this.createNavItem(`🚢 ${cleanName}`, name, () => this.switchPage(name));
            this.nav.appendChild(btn);
        });
    }

    createNavItem(label, id, callback) {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.innerHTML = label;
        btn.onclick = () => {
            callback();
            this.sidebar.classList.add('collapsed');
        };
        btn.setAttribute('data-id', id);
        return btn;
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        
        let totalRows = 0;
        this.fileNames.forEach(name => totalRows += Math.max(0, this.workbookData[name].length - 1));

        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome, Michael</h1>
                <p style="color: var(--text-gray);">Live Logistics Command & Control Center</p>
                <div class="welcome-grid">
                    <div class="stat-box"><small>DATA SOURCES</small><h2>${this.fileNames.length}</h2></div>
                    <div class="stat-box"><small>LOGISTICS ENTRIES</small><h2>${totalRows}</h2></div>
                    <div class="stat-box"><small>WHAT-IF ENGINE</small><h2>READY</h2></div>
                </div>
            </div>
        `;

        this.mapContainer.innerHTML = `
            <div style="margin-bottom: 35px; border-bottom: 2px solid var(--off-white); padding-bottom: 30px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">🌐 REAL-TIME VESSEL TRACKER</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.shipXplorer.width}; height: ${this.widgetConfig.shipXplorer.height};">
                    <iframe src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822" style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            </div>
        `;
    }

    switchPage(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';

        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) {
            this.tableOutput.innerHTML = "No data found in this sheet.";
            return;
        }

        const isInteractive = sheetName === this.interactiveSheetName;
        let html = `
            ${isInteractive ? '<div style="background:#fff4f4; padding:10px; border-radius:8px; margin-bottom:15px; font-size:0.8rem; color:var(--mi-red);"><b>EXCEL MODE:</b> You can edit any cell below. Changes update the model in real-time.</div>' : ''}
            <div class="table-container">
                <table>
                    <thead><tr>${rows[0].map(cell => `<th>${cell}</th>`).join('')}</tr></thead>
                    <tbody>
        `;

        rows.slice(1).forEach((row, rowIndex) => {
            html += `<tr class="${isInteractive ? 'editable-row' : ''}">`;
            row.forEach((cell, colIndex) => {
                if (isInteractive) {
                    html += `<td><input type="text" class="cell-input" 
                             value="${cell}" 
                             oninput="app.updateData('${sheetName}', ${rowIndex + 1}, ${colIndex}, this.value)"></td>`;
                } else {
                    html += `<td>${cell}</td>`;
                }
            });
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        this.tableOutput.innerHTML = html;
        document.querySelector('.content').scrollTop = 0;
    }

    // This function handles the real-time "What-If" logic
    updateData(sheetName, row, col, val) {
        // Update memory
        this.workbookData[sheetName][row][col] = val;

        // Custom Logic: If this is the "What-If" sheet, we can trigger specific calculations
        if (sheetName === this.interactiveSheetName) {
            console.log(`Updated [${row},${col}] to ${val}. Recalculating...`);
            this.runOptimizationLogic(sheetName);
        }
    }

    runOptimizationLogic(sheetName) {
        // Example: If Column 3 is "Quantity" and Column 4 is "Unit Cost", 
        // you could auto-calculate Column 5 "Total" here.
        const data = this.workbookData[sheetName];
        
        // Example logic for a hypothetical "Total" column (assuming col 4 = col 2 * col 3)
        /*
        data.slice(1).forEach((row, idx) => {
            const qty = parseFloat(row[2]) || 0;
            const cost = parseFloat(row[3]) || 0;
            row[4] = (qty * cost).toFixed(2); 
        });
        */
        
        // Note: To see calculated values immediately without re-rendering the whole table
        // (which would lose cursor focus), you would typically target specific DOM IDs.
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// Global instance for the inline oninput events
window.app = new MILogisticsApp();
