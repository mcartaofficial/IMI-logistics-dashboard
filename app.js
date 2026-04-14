class MILogisticsApp {
    constructor() {
        this.workbookData = {};
        this.fileNames = [];

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
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array' });

            this.fileNames = wb.SheetNames;

            wb.SheetNames.forEach(name => {
                this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], {
                    header: 1,
                    defval: ""
                });
            });

            this.buildSidebar();
            this.overlay.style.display = 'none';
        };

        reader.readAsArrayBuffer(file);
    }

    buildSidebar() {
        this.nav.innerHTML = '';

        this.fileNames.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerText = name;
            btn.onclick = () => this.switchPage(name);
            this.nav.appendChild(btn);
        });
    }

    switchPage(sheetName) {
        this.titleText.innerText = sheetName;

        if (sheetName === "LP_Enhanced_IMI_WhatIf_1") {
            this.renderInteractive(sheetName);
        } else {
            this.renderStatic(sheetName);
        }
    }

    renderStatic(sheetName) {
        const data = this.workbookData[sheetName];

        let html = "<table><thead><tr>";
        data[0].forEach(h => html += `<th>${h}</th>`);
        html += "</tr></thead><tbody>";

        data.slice(1).forEach(row => {
            html += "<tr>";
            row.forEach(cell => html += `<td>${cell}</td>`);
            html += "</tr>";
        });

        html += "</tbody></table>";
        this.tableOutput.innerHTML = html;
    }

    renderInteractive(sheetName) {
        const data = this.workbookData[sheetName];

        this.tableOutput.innerHTML = "";

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // HEADER
        const trHead = document.createElement("tr");
        data[0].forEach((cell, col) => {
            const th = document.createElement("th");
            th.contentEditable = true;
            th.innerText = cell;
            th.dataset.row = 0;
            th.dataset.col = col;

            this.attachEvents(th, sheetName);

            trHead.appendChild(th);
        });
        thead.appendChild(trHead);

        // BODY
        data.slice(1).forEach((rowData, rowIndex) => {
            const tr = document.createElement("tr");

            rowData.forEach((cell, col) => {
                const td = document.createElement("td");
                td.contentEditable = true;
                td.innerText = cell;

                td.dataset.row = rowIndex + 1;
                td.dataset.col = col;

                this.attachEvents(td, sheetName);

                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        this.tableOutput.appendChild(table);
    }

    attachEvents(cell, sheetName) {
        cell.addEventListener("input", (e) => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.workbookData[sheetName][row][col] = e.target.innerText;
        });

        cell.addEventListener("focus", () => {
            document.querySelectorAll(".active-cell").forEach(c => c.classList.remove("active-cell"));
            cell.classList.add("active-cell");
        });

        cell.addEventListener("keydown", (e) => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

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
    }

    getCell(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }
}

new MILogisticsApp();
