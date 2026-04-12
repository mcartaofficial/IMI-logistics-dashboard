class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: { width: "100%", height: "800px" },
            elfsight: { width: "100%", height: "550px" }
        };

        this.workbookData = {};
        this.fileNames = [];
        this.fileInput = document.getElementById('file-input');
        this.nav = document.getElementById('sidebar-nav');
        this.tableOutput = document.getElementById('table-output');
        this.mapContainer = document.getElementById('map-container');
        this.titleText = document.getElementById('current-sheet-title');
        this.overlay = document.getElementById('upload-overlay');
        
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
        
        // Listeners for the menu toggle inside the sidebar and the floating button
        document.getElementById('close-sidebar').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('open-sidebar').addEventListener('click', () => this.toggleSidebar());
    }

    toggleSidebar() {
        document.body.classList.toggle('sidebar-collapsed');
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
            this.showHomePage(); 
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-item';
        homeBtn.innerHTML = `<span>🏠</span> DASHBOARD HOME`;
        homeBtn.onclick = () => this.showHomePage();
        homeBtn.setAttribute('data-id', 'HOME_PAGE');
        this.nav.appendChild(homeBtn);

        this.fileNames.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            const cleanName = name.replace(/_/g, ' ');
            btn.innerHTML = `<span>•</span> ${cleanName}`;
            btn.onclick = () => this.switchPage(name);
            btn.setAttribute('data-id', name);
            this.nav.appendChild(btn);
        });
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        
        let totalRows = 0;
        this.fileNames.forEach(name => {
            if(this.workbookData[name]) totalRows += Math.max(0, this.workbookData[name].length - 1);
        });

        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                <div class="welcome-grid">
                    <div class="stat-box">
                        <small>SHEETS</small>
                        <h2 style="margin: 5px 0; color: var(--mi-red);">${this.fileNames.length}</h2>
                    </div>
                    <div class="stat-box">
                        <small>DATA ROWS</small>
                        <h2 style="margin: 5px 0; color: var(--mi-red);">${totalRows}</h2>
                    </div>
                </div>
            </div>
        `;

        this.mapContainer.innerHTML = `
            <div class="hard-clip-wrapper" style="height: ${this.widgetConfig.shipXplorer.height};">
                <iframe src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        `;
    }

    switchPage(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';

        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

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
        
        // Auto-close on small screens
        if(window.innerWidth < 1024) this.toggleSidebar();
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
