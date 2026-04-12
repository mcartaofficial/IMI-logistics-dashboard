class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: { width: "100%", height: "800px" },
            elfsight: { width: "100%", height: "850px" }
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
        const homeBtn = this.createNavBtn('<span>🏠</span> DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.nav.appendChild(homeBtn);

        this.fileNames.forEach(name => {
            const cleanName = name.replace(/_/g, ' ');
            const btn = this.createNavBtn(`<span>🚢</span> ${cleanName}`, name, () => this.switchPage(name));
            this.nav.appendChild(btn);
        });
    }

    createNavBtn(html, id, onClick) {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.innerHTML = html;
        btn.onclick = () => { onClick(); this.sidebar.classList.add('collapsed'); };
        btn.setAttribute('data-id', id);
        return btn;
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        let totalRows = 0;
        this.fileNames.forEach(name => totalRows += (this.workbookData[name].length - 1));

        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                <div class="welcome-grid">
                    <div class="stat-box"><small>SHEETS</small><h2>${this.fileNames.length}</h2></div>
                    <div class="stat-box"><small>DATA ROWS</small><h2>${totalRows}</h2></div>
                    <div class="stat-box"><small>STATUS</small><h2 style="color: #10B981;">ACTIVE</h2></div>
                </div>
            </div>
        `;

        this.mapContainer.innerHTML = `
            <div class="hard-clip-wrapper" style="height: ${this.widgetConfig.shipXplorer.height}; margin-bottom: 20px;">
                <iframe src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822" style="width:100%; height:100%; border:none;"></iframe>
            </div>
            <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
        `;
    }

    switchPage(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';
        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        const isInteractive = sheetName === "LP_Enhanced_IMI_WhatIf_1";
        
        let html = '<div class="table-container"><table><thead><tr>';
        rows[0].forEach(cell => html += `<th>${cell}</th>`);
        html += '</tr></thead><tbody>';

        rows.slice(1).forEach((row, rowIndex) => {
            html += '<tr>';
            row.forEach((cell, cellIndex) => {
                if (isInteractive) {
                    html += `<td><input type="text" class="edit-input" value="${cell}" 
                                oninput="window.app.updateData('${sheetName}', ${rowIndex + 1}, ${cellIndex}, this.value)"></td>`;
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

    updateData(sheetName, row, col, value) {
        // Update the underlying data model
        this.workbookData[sheetName][row][col] = value;
        console.log(`Updated [${sheetName}] at Row ${row}, Col ${col}: ${value}`);
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

// Global instance for the input callback
window.app = new MILogisticsApp();
