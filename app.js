class MILogisticsApp {
    constructor() {
        this.workbookData = {};
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
            // raw: false ensures formulas like D6:D117 are calculated values
            const wb = XLSX.read(data, { type: 'array', raw: false });
            
            wb.SheetNames.forEach(name => {
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
            });

            this.buildSidebar(wb.SheetNames);
            this.overlay.style.display = 'none';
            document.getElementById('file-name-display').innerText = `Active File: ${file.name}`;
            this.switchPage(wb.SheetNames[0]);
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar(names) {
        this.nav.innerHTML = '';
        names.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            // Clean up sheet names for the menu
            const cleanName = name.replace(/_/g, ' ').toUpperCase();
            btn.innerHTML = `<span>•</span> ${cleanName}`;
            btn.onclick = () => this.switchPage(name);
            btn.setAttribute('data-id', name);
            this.nav.appendChild(btn);
        });
    }

    switchPage(sheetName) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${sheetName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
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
        
        // Smooth scroll back to top of card on page switch
        document.querySelector('.content').scrollTop = 0;
    }
}

new MILogisticsApp();
