class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: { width: "100%", height: "800px" },
            elfsight: { width: "100%", height: "850px" }
        };

        this.workbookData = {};
        this.fileNames = [];
        this.currentFileName = "";
        
        this.fileInput = document.getElementById('file-input');
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.tableOutput = document.getElementById('table-output');
        this.mapContainer = document.getElementById('map-container');
        this.titleText = document.getElementById('current-sheet-title');
        this.overlay = document.getElementById('upload-overlay');
        this.downloadBtn = document.getElementById('download-btn');
        
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
        this.menuToggle.addEventListener('click', () => this.sidebar.classList.toggle('collapsed'));
        this.downloadBtn.addEventListener('click', () => this.exportToExcel());
    }

    handleFile(file) {
        if (!file) return;
        this.currentFileName = file.name;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', raw: false });
            
            this.fileNames = wb.SheetNames;
            wb.SheetNames.forEach(name => {
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
            });

            this.buildSidebar();
            this.overlay.style.display = 'none';
            this.downloadBtn.style.display = 'block';
            document.getElementById('file-name-display').innerText = file.name.toUpperCase();
            
            this.sidebar.classList.add('collapsed');
            this.showHomePage(); 
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        
        const createBtn = (id, label, icon, action) => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<span>${icon}</span> ${label}`;
            btn.onclick = () => { action(); this.sidebar.classList.add('collapsed'); };
            btn.setAttribute('data-id', id);
            this.nav.appendChild(btn);
        };

        createBtn('HOME_PAGE', 'DASHBOARD HOME', '🏠', () => this.showHomePage());

        this.fileNames.forEach(name => {
            createBtn(name, name.replace(/_/g, ' '), '🚢', () => this.switchPage(name));
        });
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        
        let totalRows = 0;
        this.fileNames.forEach(name => totalRows += (this.workbookData[name].length - 1));

        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                <p style="color: var(--text-gray);">Select a route or data sheet from the sidebar to begin optimization.</p>
                <div class="welcome-grid">
                    <div class="stat-box"><small>TOTAL SHEETS</small><h2 style="margin: 5px 0; color: var(--mi-red);">${this.fileNames.length}</h2></div>
                    <div class="stat-box"><small>TOTAL DATA ROWS</small><h2 style="margin: 5px 0; color: var(--mi-red);">${totalRows}</h2></div>
                    <div class="stat-box"><small>SYSTEM STATUS</small><h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2></div>
                </div>
            </div>`;

        this.mapContainer.innerHTML = `
            <div style="margin-bottom: 35px; border-bottom: 2px solid var(--off-white); padding-bottom: 30px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">🌐 REAL-TIME VESSEL TRACKER</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.shipXplorer.width}; height: ${this.widgetConfig.shipXplorer.height};">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;"
                        src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true">
                    </iframe>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">📍 FLEET & STORE LOCATOR</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.elfsight.width}; height: ${this.widgetConfig.elfsight.height};">
                    <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
                </div>
            </div>`;
    }

    switchPage(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';

        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        // Check if this is the target interactive sheet
        const isInteractive = (sheetName === "LP_Enhanced_IMI_WhatIf_1");

        let html = '<div class="table-container"><table><thead><tr>';
        rows[0].forEach(cell => html += `<th>${cell}</th>`);
        html += '</tr></thead><tbody>';

        rows.slice(1).forEach((row, rowIndex) => {
            html += '<tr>';
            row.forEach((cell, colIndex) => {
                if (isInteractive) {
                    // Render as input field for the What-If analysis sheet
                    html += `<td>
                        <input type="text" 
                               class="editable-cell" 
                               value="${cell}" 
                               oninput="app.updateData('${sheetName}', ${rowIndex + 1}, ${colIndex}, this.value)">
                    </td>`;
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

    // New method to handle live data updates
    updateData(sheetName, row, col, val) {
        this.workbookData[sheetName][row][col] = val;
        console.log(`Updated [${sheetName}] at R${row}C${col}: ${val}`);
    }

    exportToExcel() {
        const wb = XLSX.utils.book_new();
        this.fileNames.forEach(name => {
            const ws = XLSX.utils.aoa_to_sheet(this.workbookData[name]);
            XLSX.utils.book_append_sheet(wb, ws, name);
        });
        XLSX.writeFile(wb, `Updated_${this.currentFileName}`);
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// Attach to window so oninput can find it
window.app = new MILogisticsApp();
