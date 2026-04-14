class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: {
                width: "100%",
                height: "800px" 
            },
            elfsight: {
                width: "100%",
                height: "850px" 
            }
        };

        this.workbookData = {};
        this.fileNames = [];
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
        
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-item';
        homeBtn.innerHTML = `<span>🏠</span> DASHBOARD HOME`;
        homeBtn.onclick = () => {
            this.showHomePage();
            this.sidebar.classList.add('collapsed');
        };
        homeBtn.setAttribute('data-id', 'HOME_PAGE');
        this.nav.appendChild(homeBtn);

        this.fileNames.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            const cleanName = name.replace(/_/g, ' ');
            btn.innerHTML = `<span>📊</span> ${cleanName}`;
            btn.onclick = () => {
                this.switchPage(name);
                this.sidebar.classList.add('collapsed');
            };
            btn.setAttribute('data-id', name);
            this.nav.appendChild(btn);
        });
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        
        const totalSheets = this.fileNames.length;
        let totalRows = 0;
        this.fileNames.forEach(name => {
            if (this.workbookData[name]) {
                totalRows += Math.max(0, this.workbookData[name].length - 1);
            }
        });

        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                <p style="color: var(--text-gray);">Select a route or data sheet from the sidebar to begin optimization.</p>
                
                <div class="welcome-grid">
                    <div class="stat-box">
                        <small>TOTAL SHEETS</small>
                        <h2 style="margin: 5px 0; color: var(--mi-red);">${totalSheets}</h2>
                    </div>
                    <div class="stat-box">
                        <small>TOTAL DATA ROWS</small>
                        <h2 style="margin: 5px 0; color: var(--mi-red);">${totalRows}</h2>
                    </div>
                    <div class="stat-box">
                        <small>SYSTEM STATUS</small>
                        <h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2>
                    </div>
                </div>
            </div>
        `;

        this.mapContainer.innerHTML = `
            <div style="margin-bottom: 35px; border-bottom: 2px solid var(--off-white); padding-bottom: 30px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">🚢 REAL-TIME VESSEL TRACKER</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.shipXplorer.width}; height: ${this.widgetConfig.shipXplorer.height};">
                    <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                        style="width: 100%; height: 100%; border: none; overflow: hidden;"
                        src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN">
                    </iframe>
                </div>
            </div>

            <div style="margin-top: 20px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">📍 FLEET & STORE LOCATOR</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.elfsight.width}; height: ${this.widgetConfig.elfsight.height};">
                    <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
                </div>
            </div>
        `;
    }

    switchPage(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';

        if (sheetName === "LP_Enhanced_IMI_WhatIf_1") {
            this.renderInteractiveTable(sheetName);
        } else {
            this.renderStaticTable(sheetName);
        }
    }

    renderStaticTable(sheetName) {
        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        this.tableOutput.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'table-container';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Header
        const headerRow = document.createElement('tr');
        rows[0].forEach(cellText => {
            const th = document.createElement('th');
            th.textContent = cellText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Body
        rows.slice(1).forEach(rowData => {
            const tr = document.createElement('tr');
            rowData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        this.tableOutput.appendChild(container);
        document.querySelector('.content').scrollTop = 0;
    }

    renderInteractiveTable(sheetName) {
        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        this.tableOutput.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'table-container';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Build Header Manually
        const headerRow = document.createElement('tr');
        rows[0].forEach((cellText, colIndex) => {
            const th = document.createElement('th');
            th.contentEditable = true;
            th.textContent = cellText;
            th.dataset.row = 0;
            th.dataset.col = colIndex;

            // Live binding for header
            th.addEventListener('input', (e) => {
                this.workbookData[sheetName][0][colIndex] = e.target.innerText;
            });

            th.addEventListener('focus', () => {
                this.clearActiveCells();
                th.classList.add('active-cell');
            });

            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Build Body Manually
        rows.slice(1).forEach((rowData, rowIndexRelative) => {
            const rowIndex = rowIndexRelative + 1;
            const tr = document.createElement('tr');

            rowData.forEach((cellData, colIndex) => {
                const td = document.createElement('td');
                td.contentEditable = true;
                td.textContent = cellData;
                td.dataset.row = rowIndex;
                td.dataset.col = colIndex;

                // Sync data on input
                td.addEventListener('input', (e) => {
                    this.workbookData[sheetName][rowIndex][colIndex] = e.target.innerText;
                });

                // Focus/Visual feedback
                td.addEventListener('focus', () => {
                    this.clearActiveCells();
                    td.classList.add('active-cell');
                });

                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        this.tableOutput.appendChild(container);
        document.querySelector('.content').scrollTop = 0;
    }

    clearActiveCells() {
        document.querySelectorAll(".active-cell").forEach(c => c.classList.remove("active-cell"));
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
