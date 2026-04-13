class MILogisticsApp {
    constructor() {
        // --- CONFIGURATION ---
        this.widgetConfig = {
            shipXplorer: { width: "100%", height: "800px" },
            elfsight: { width: "100%", height: "850px" }
        };

        // --- DATA STATE ---
        this.workbookData = {}; // Central Source of Truth
        this.fileNames = [];
        
        // --- DOM ELEMENTS ---
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
        this.menuToggle.addEventListener('click', () => this.sidebar.classList.toggle('collapsed'));
    }

    handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', raw: false });
            
            this.fileNames = wb.SheetNames;
            wb.SheetNames.forEach(name => {
                // Initialize internal data structure
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

    // Central method to update the data structure from the UI
    syncDataState(sheetName, rowIndex, colIndex, newValue) {
        if (this.workbookData[sheetName] && this.workbookData[sheetName][rowIndex]) {
            this.workbookData[sheetName][rowIndex][colIndex] = newValue;
            // console.log(`Data Synced: ${sheetName} [${rowIndex},${colIndex}] = ${newValue}`);
        }
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        const homeBtn = this.createNavItem('🏠 DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.nav.appendChild(homeBtn);

        this.fileNames.forEach(name => {
            const cleanName = name.replace(/_/g, ' ');
            const btn = this.createNavItem(`📊 ${cleanName}`, name, () => this.switchPage(name));
            this.nav.appendChild(btn);
        });
    }

    createNavItem(label, id, callback) {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.innerHTML = label;
        btn.setAttribute('data-id', id);
        btn.onclick = () => {
            callback();
            this.sidebar.classList.add('collapsed');
        };
        return btn;
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        
        const totalSheets = this.fileNames.length;
        let totalRows = 0;
        this.fileNames.forEach(name => totalRows += (this.workbookData[name].length - 1));

        this.tableOutput.innerHTML = `
            <div class="welcome-container">
                <h1>Welcome to IMI Logistics</h1>
                <p>Global Optimization & Tracking System</p>
                <div class="welcome-grid">
                    <div class="stat-box"><small>SHEETS</small><h2>${totalSheets}</h2></div>
                    <div class="stat-box"><small>ENTRIES</small><h2>${totalRows}</h2></div>
                    <div class="stat-box"><small>STATUS</small><h2 style="color: #10B981;">LIVE</h2></div>
                </div>
            </div>
        `;

        this.mapContainer.innerHTML = `
            <div class="widget-section">
                <div class="widget-label">🚢 REAL-TIME VESSEL TRACKER</div>
                <div class="hard-clip-wrapper" style="height: ${this.widgetConfig.shipXplorer.height};">
                    <iframe src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN"></iframe>
                </div>
            </div>
            <div class="widget-section">
                <div class="widget-label">📍 FLEET & STORE LOCATOR</div>
                <div class="hard-clip-wrapper" style="height: ${this.widgetConfig.elfsight.height};">
                    <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
                </div>
            </div>
        `;
    }

    switchPage(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';

        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        // Determine if this is the target interactive sheet
        const isWhatIf = sheetName === "LP_Enhanced_IMI_WhatIf_1";

        let html = `<div class="table-container"><table><thead><tr>`;
        rows[0].forEach(header => html += `<th>${header}</th>`);
        html += '</tr></thead><tbody>';

        rows.slice(1).forEach((row, rowIndex) => {
            const actualRowIndex = rowIndex + 1; // Account for header row
            html += '<tr>';
            row.forEach((cell, colIndex) => {
                if (isWhatIf) {
                    html += `
                        <td>
                            <input type="text" 
                                   class="cell-edit" 
                                   value="${cell}" 
                                   oninput="window.app.syncDataState('${sheetName}', ${actualRowIndex}, ${colIndex}, this.value)">
                        </td>`;
                } else {
                    html += `<td>${cell}</td>`;
                }
            });
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        this.tableOutput.innerHTML = html;
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// Global instance
window.app = new MILogisticsApp();
