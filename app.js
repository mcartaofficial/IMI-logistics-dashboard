class MILogisticsApp {
    constructor() {
        this.workbookData = {};
        this.fileNames = [];
        this.fileInput = document.getElementById('file-input');
        this.nav = document.getElementById('sidebar-nav');
        this.tableOutput = document.getElementById('table-output');
        this.overlay = document.getElementById('upload-overlay');
        this.backdrop = document.getElementById('menu-backdrop');
        this.menuToggle = document.getElementById('menu-toggle');
        
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
        
        // Open the "dropdown" box
        this.menuToggle.addEventListener('click', () => {
            document.body.classList.add('sidebar-open');
        });

        // Close when clicking the backdrop
        this.backdrop.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });
    }

    handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array' });
            this.fileNames = wb.SheetNames;
            wb.SheetNames.forEach(name => {
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
            });
            this.buildSidebar();
            this.overlay.style.display = 'none';
            document.getElementById('file-name-display').innerText = file.name;
            this.showHomePage();
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        this.fileNames.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<span>📂</span> ${name.replace(/_/g, ' ')}`;
            btn.onclick = () => {
                this.switchPage(name);
                document.body.classList.remove('sidebar-open'); // Auto-close on selection
            };
            this.nav.appendChild(btn);
        });
    }

    switchPage(sheetName) {
        document.getElementById('current-sheet-title').innerText = sheetName;
        const rows = this.workbookData[sheetName];
        let html = '<div class="table-container"><table style="width:100%; border-collapse:collapse;">';
        rows.forEach((row, i) => {
            html += '<tr>';
            row.forEach(cell => {
                html += `<td style="padding:10px; border-bottom:1px solid #eee;">${cell || ''}</td>`;
            });
            html += '</tr>';
        });
        html += '</table></div>';
        this.tableOutput.innerHTML = html;
    }

    showHomePage() {
        this.tableOutput.innerHTML = '<h2>Data Loaded. Open the menu to view sheets.</h2>';
    }
}

new MILogisticsApp();
