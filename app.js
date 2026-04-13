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
        this.targetSheet = "LP_Enhanced_IMI_WhatIf_1";
        
        // Element cache
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
        
        // Sidebar Toggle
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });

        // Event Delegation for Interactive Table
        this.tableOutput.addEventListener('input', (e) => {
            if (e.target.hasAttribute('data-row')) {
                this.handleCellEdit(e);
            }
        });

        this.tableOutput.addEventListener('keydown', (e) => {
            if (e.target.hasAttribute('data-row')) {
                this.handleKeyboardNavigation(e);
            }
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
        this.fileNames.forEach(name => totalRows += (this.workbookData[name].length - 1));

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

        if (sheetName === this.targetSheet) {
            this.renderInteractiveTable(sheetName);
        } else {
            this.renderStaticTable(sheetName);
        }
        
        document.querySelector('.content').scrollTop = 0;
    }

    renderStaticTable(sheetName) {
        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) {
            this.tableOutput.innerHTML = '<p>No data available in this sheet.</p>';
            return;
        }

        let html = '<div class="table-container"><table><thead><tr>';
        rows[0].forEach(cell => html += `<th>${cell}</th>`);
        html += '</tr></thead><tbody>';

        rows.slice(1).forEach(row => {
            html += '<tr>';
            row.forEach(cell => html += `<td>${cell}</td>`);
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        this.tableOutput.innerHTML = html;
    }

    renderInteractiveTable(sheetName) {
        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        let html = `
            <div class="edit-badge">Interactive Mode Enabled</div>
            <div class="table-container">
                <table class="interactive-table" data-sheet="${sheetName}">
                    <thead>
                        <tr>`;
        
        // Headers are editable too
        rows[0].forEach((cell, colIdx) => {
            html += `<th contenteditable="true" data-row="0" data-col="${colIdx}">${cell}</th>`;
        });
        
        html += `       </tr>
                    </thead>
                    <tbody>`;

        rows.slice(1).forEach((row, rowIdx) => {
            const actualRowIdx = rowIdx + 1;
            html += '<tr>';
            row.forEach((cell, colIdx) => {
                html += `<td contenteditable="true" data-row="${actualRowIdx}" data-col="${colIdx}">${cell}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        this.tableOutput.innerHTML = html;
    }

    handleCellEdit(e) {
        const cell = e.target;
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const sheetName = cell.closest('table').getAttribute('data-sheet');
        const newValue = cell.innerText;

        // Ensure the array structure exists (robust handling)
        if (!this.workbookData[sheetName][row]) {
            this.workbookData[sheetName][row] = [];
        }
        
        // Update data model in memory
        this.workbookData[sheetName][row][col] = newValue;
        
        // Log for developer audit
        console.log(`Updated ${sheetName} [${row},${col}]: ${newValue}`);
    }

    handleKeyboardNavigation(e) {
        const cell = e.target;
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const table = cell.closest('table');
        
        let targetRow = row;
        let targetCol = col;

        switch(e.key) {
            case 'ArrowUp':
                targetRow = Math.max(0, row - 1);
                e.preventDefault();
                break;
            case 'ArrowDown':
                targetRow = row + 1;
                e.preventDefault();
                break;
            case 'ArrowLeft':
                targetCol = Math.max(0, col - 1);
                e.preventDefault();
                break;
            case 'ArrowRight':
                targetCol = col + 1;
                e.preventDefault();
                break;
            case 'Enter':
                targetRow = row + 1;
                e.preventDefault();
                break;
            case 'Tab':
                // Native tab works, but we can override for wrapping if desired
                return; 
            default:
                return;
        }

        const nextCell = table.querySelector(`[data-row="${targetRow}"][data-col="${targetCol}"]`);
        if (nextCell) {
            nextCell.focus();
        }
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// Initialize the enterprise dashboard
new MILogisticsApp();
