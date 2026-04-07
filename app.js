class MILogisticsApp {
    constructor() {
        this.workbookData = {};
        this.fileInput = document.getElementById('file-input');
        this.nav = document.getElementById('sidebar-nav');
        this.tableOutput = document.getElementById('table-output');
        this.titleText = document.getElementById('current-sheet-title');
        this.overlay = document.getElementById('upload-overlay');
        
        console.log("App Started - Ready for File");
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => {
            console.log("File detected!");
            this.handleFile(e.target.files[0]);
        });
    }

    handleFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                // raw: false ensures the dashboard reads the "Value" not the "Formula"
                const wb = XLSX.read(data, { type: 'array', raw: false });
                
                wb.SheetNames.forEach(name => {
                    this.workbookData[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "" });
                });

                this.buildSidebar(wb.SheetNames);
                this.overlay.style.display = 'none';
                document.getElementById('file-name-display').innerText = file.name;
                this.switchPage(wb.SheetNames[0]);
            } catch (err) {
                console.error("Error parsing Excel:", err);
                alert("Could not read file. Check the console for details.");
            }
        };
        reader.readAsArrayBuffer(file);
    }

    buildSidebar(names) {
        this.nav.innerHTML = '';
        names.forEach(name => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<span>•</span> ${name.replace(/_/g, ' ')}`;
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
            const isTotalRow = row.some(cell => String(cell || "").toLowerCase().includes('total'));
            html += `<tr class="${isTotalRow ? 'text-total' : ''}">`;

            row.forEach((cell, index) => {
                let className = "";
                const cleanVal = String(cell).replace(/[$,]/g, ''); 
                const num = parseFloat(cleanVal);

                if (!isNaN(num) && cell !== "") {
                    className = "cell-currency";
                    if (sheetName.toLowerCase().includes('cost')) {
                        if (num > 15) className += " cost-high";
                        else if (num > 0 && num < 12) className += " cost-low";
                    }
                }

                if (sheetName.includes('Long_Model') && index === 3 && num > 0) {
                    className += " changing-cell";
                }

                html += `<td class="${className}">${cell || ""}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table></div>';
        this.tableOutput.innerHTML = html;
    }
}

// Start the app
window.onload = () => { new MILogisticsApp(); };
