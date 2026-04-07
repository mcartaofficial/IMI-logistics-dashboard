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
        // High-reliability file detection
        this.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFile(e.target.files[0]);
            }
        });
    }

    handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const wb = XLSX.read(data, { type: 'array', raw: false });
                
                wb.SheetNames.forEach(name => {
                    this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
                });

                this.buildSidebar(wb.SheetNames);
                this.overlay.style.display = 'none';
                document.getElementById('file-name-display').innerText = file.name.toUpperCase();
                this.switchPage(wb.SheetNames[0]);
            } catch (err) {
                alert("Error reading file. Make sure it is a valid Excel document.");
                console.error(err);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar(names) {
        this.nav.innerHTML = '';
        names.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            const cleanName = name.replace(/_/g, ' ');
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

        let html = '<div class="table-container"><table><thead><tr>';
        rows[0].forEach(cell => html += `<th>${cell || ""}</th>`);
        html += '</tr></thead><tbody>';

        rows.slice(1).forEach((row) => {
            // accountant total row detection
            const isTotalRow = row.some(cell => String(cell || "").toLowerCase().includes('total'));
            html += `<tr class="${isTotalRow ? 'text-total' : ''}">`;

            row.forEach((cell, index) => {
                let className = "";
                // Convert to number for accounting check
                const cleanVal = String(cell).replace(/[$,]/g, ''); 
                const num = parseFloat(cleanVal);

                if (!isNaN(num) && cell !== "") {
                    className = "cell-currency";
                    // Color code costs: Red for high, Green for low
                    if (sheetName.toLowerCase().includes('cost')) {
                        if (num > 15) className += " cost-high";
                        else if (num > 0 && num < 10) className += " cost-low";
                    }
                }

                // Highlight solver variables in yellow (Changing Cells)
                if (sheetName.includes('Long_Model') && index === 3 && num > 0) {
                    className += " changing-cell";
                }

                html += `<td class="${className}">${cell || ""}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        this.tableOutput.innerHTML = html;
        document.querySelector('.content').scrollTop = 0;
    }
}

// Startup the Dashboard
new MILogisticsApp();
