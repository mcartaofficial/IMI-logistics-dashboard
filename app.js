class DashboardApp {
    constructor() {
        this.workbookData = {};
        this.currentSheet = null;

        // Elements
        this.fileInput = document.getElementById('file-input');
        this.dropZone = document.getElementById('drop-zone');
        this.navBar = document.getElementById('nav-bar');
        this.contentArea = document.getElementById('sheet-content');
        this.pageTitle = document.getElementById('page-title');
        this.uploadScreen = document.getElementById('upload-screen');

        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
        
        // Drag and Drop
        this.dropZone.addEventListener('dragover', (e) => { e.preventDefault(); this.dropZone.style.borderColor = 'var(--imi-red)'; });
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.handleFile(e.dataTransfer.files[0]);
        });
    }

    handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', raw: false });
            
            // Store all sheets in memory
            wb.SheetNames.forEach(name => {
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
            });

            this.createNavigation(wb.SheetNames);
            this.uploadScreen.style.display = 'none'; // Hide upload, show dashboard
            this.showSheet(wb.SheetNames[0]); // Show first sheet by default
        };
        reader.readAsArrayBuffer(file);
    }

    createNavigation(sheetNames) {
        this.navBar.innerHTML = '';
        sheetNames.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-btn';
            btn.innerText = name.replace(/_/g, ' '); // Make names look cleaner
            btn.onclick = () => this.showSheet(name);
            btn.setAttribute('data-sheet', name);
            this.navBar.appendChild(btn);
        });
    }

    showSheet(name) {
        // Update active button UI
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-sheet="${name}"]`).classList.add('active');

        this.pageTitle.innerText = name;
        const rows = this.workbookData[name];

        if (!rows || rows.length === 0) {
            this.contentArea.innerHTML = "No data found in this sheet.";
            return;
        }

        // Build Table
        let html = '<table><thead><tr>';
        rows[0].forEach(h => html += `<th>${h}</th>`);
        html += '</tr></thead><tbody>';

        rows.slice(1).forEach(row => {
            html += '<tr>';
            row.forEach(cell => html += `<td>${cell}</td>`);
            html += '</tr>';
        });

        html += '</tbody></table>';
        this.contentArea.innerHTML = html;
    }
}

new DashboardApp();
