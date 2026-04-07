class MILogisticsApp {
    constructor() {
        this.workbookData = {};
        this.sheetNames = [];
        this.fileInput = document.getElementById('file-input');
        this.nav = document.getElementById('sidebar-nav');
        this.tableOutput = document.getElementById('table-output');
        this.titleText = document.getElementById('current-sheet-title');
        this.overlay = document.getElementById('upload-overlay');
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
    }

    handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', raw: false });
            
            this.sheetNames = wb.SheetNames;
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
        
        // Add Home Button
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-item';
        homeBtn.innerHTML = `<span>🏠</span> HOME`;
        homeBtn.onclick = () => this.showHomePage();
        homeBtn.setAttribute('data-id', 'home-view');
        this.nav.appendChild(homeBtn);

        // Add Sheet Buttons
        this.sheetNames.forEach(name => {
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
        this.setActiveNav('home-view');
        this.titleText.innerText = "Logistics Overview";
        
        let totalRows = 0;
        this.sheetNames.forEach(name => totalRows += (this.workbookData[name].length - 1));

        this.tableOutput.innerHTML = `
            <div class="home-welcome">
                <h1>Welcome to IMI Logistics</h1>
                <p>Select a route or data sheet from the sidebar to begin optimization analysis.</p>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <span>${this.sheetNames.length}</span>
                        <label>Active Data Sheets</label>
                    </div>
                    <div class="stat-item">
                        <span>${totalRows}</span>
                        <label>Total Logistics Records</label>
                    </div>
                    <div class="stat-item">
                        <span>Ready</span>
                        <label>Optimization Status</label>
                    </div>
                </div>
                <div style="margin-top: 40px; color: var(--text-gray); font-style: italic;">
                    Use the AI Chatbot in the bottom right for real-time assistance with your logistics data.
                </div>
            </div>
        `;
    }

    setActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    switchPage(sheetName) {
        this.setActiveNav(sheetName);
        this.titleText.innerText = sheetName.replace(/_/g, ' ');

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
        document.querySelector('.content').scrollTop = 0;
    }
}

new MILogisticsApp();
