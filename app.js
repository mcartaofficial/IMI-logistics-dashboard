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
    }

    handleFile(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', raw: false });

            this.fileNames = wb.SheetNames;

            wb.SheetNames.forEach(name => {
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], {
                    header: 1,
                    defval: ""
                });
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

        this.fileNames.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<span>📄</span> ${name.replace(/_/g, ' ')}`;
            btn.onclick = () => this.switchPage(name);
            btn.setAttribute('data-id', name);
            this.nav.appendChild(btn);
        });
    }

    switchPage(sheetName) {
        this.titleText.innerText = sheetName.replace(/_/g, ' ');
        this.mapContainer.innerHTML = '';

        const rows = this.workbookData[sheetName];
        if (!rows || rows.length === 0) return;

        if (sheetName === "LP_Enhanced_IMI_WhatIf_1") {
            this.renderInteractiveTable(sheetName);
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

    /* 🔥 INTERACTIVE TABLE (ADDED ONLY) */
    renderInteractiveTable(sheetName) {
        const data = this.workbookData[sheetName];
        this.tableOutput.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'table-container';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');

        data[0].forEach((cell, col) => {
            const th = this.createCell(cell, 0, col, sheetName, true);
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);

        data.slice(1).forEach((row, rIndex) => {
            const tr = document.createElement('tr');

            row.forEach((cell, cIndex) => {
                const td = this.createCell(cell, rIndex + 1, cIndex, sheetName);
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        this.tableOutput.appendChild(container);
    }

    createCell(value, row, col, sheetName, isHeader = false) {
        const cell = document.createElement(isHeader ? 'th' : 'td');

        cell.contentEditable = true;
        cell.innerText = value;
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.addEventListener('input', () => {
            this.workbookData[sheetName][row][col] = cell.innerText;
        });

        cell.addEventListener('focus', () => {
            document.querySelectorAll('.active-cell').forEach(c => c.classList.remove('active-cell'));
            cell.classList.add('active-cell');
        });

        cell.addEventListener('keydown', (e) => {
            let next;

            if (e.key === "ArrowRight") next = this.getCell(row, col + 1);
            if (e.key === "ArrowLeft") next = this.getCell(row, col - 1);
            if (e.key === "ArrowDown") next = this.getCell(row + 1, col);
            if (e.key === "ArrowUp") next = this.getCell(row - 1, col);

            if (next) {
                e.preventDefault();
                next.focus();
            }
        });

        return cell;
    }

    getCell(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    showHomePage() {
        this.titleText.innerText = "Dashboard Overview";
        this.tableOutput.innerHTML = `<h2>Welcome</h2>`;

        this.mapContainer.innerHTML = `
            <div>
                <iframe style="width:100%; height:800px;" src="https://www.shipxplorer.com/?widget=1"></iframe>
            </div>
            <div>
                <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35"></div>
            </div>
        `;
    }
}

new MILogisticsApp();
