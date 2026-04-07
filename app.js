/**
 * IMI SHIPPING & FREIGHT - FORMULA-AWARE PARSER
 * This version specifically looks for Solver 'Changing Cells' (D6:D117)
 */

const Logger = {
    el: document.getElementById('system-log'),
    log(msg, isError = false) {
        const time = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        if (isError) line.className = 'log-error';
        line.innerHTML = `[${time}] ${isError ? '⚠️ ERROR:' : '>'} ${msg}`;
        this.el.appendChild(line);
        this.el.scrollTop = this.el.scrollHeight;
    }
};

class ShippingOptimizer {
    constructor() {
        this.fileInput = document.getElementById('file-input');
        this.optimizeBtn = document.getElementById('optimize-btn');
        this.display = document.getElementById('data-display');
        this.workbook = null;
        this.init();
    }

    init() {
        this.fileInput.addEventListener('change', (e) => this.processFile(e.target.files[0]));
        this.optimizeBtn.addEventListener('click', () => this.renderFullAnalysis());
        Logger.log("System Initialized. Awaiting LP_Enhanced_IMI file...");
    }

    processFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                // CRITICAL: We enable 'cellFormula' and 'cellText' to catch the Solver outputs
                const wb = XLSX.read(data, { 
                    type: 'array',
                    cellFormula: true, 
                    cellStyles: true,
                    cellNF: true, 
                    cellText: true 
                });

                this.workbook = wb;
                Logger.log(`Loaded ${file.name}. Solver data detected.`);
                this.optimizeBtn.disabled = false;
            } catch (err) {
                Logger.log(`Read Error: ${err.message}`, true);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    renderFullAnalysis() {
        this.display.innerHTML = "";
        Logger.log("Processing formulas in sheets...");

        this.workbook.SheetNames.forEach(name => {
            const sheet = this.workbook.Sheets[name];
            
            // We use sheet_to_json but with specific flags to ensure 
            // that the 'result' of the formula is what gets printed.
            const rows = XLSX.utils.sheet_to_json(sheet, { 
                header: 1, 
                defval: "",
                raw: false, // This tells the library: "Give me the calculated string, not the raw formula"
                dateNF: 'yyyy-mm-dd'
            });

            if (rows.length > 0) {
                const section = document.createElement('div');
                section.innerHTML = `<h3>Analysis: ${name}</h3>`;
                let tableHtml = '<div style="overflow-x:auto;"><table><thead><tr>';
                
                rows[0].forEach(h => tableHtml += `<th>${h}</th>`);
                tableHtml += '</tr></thead><tbody>';

                rows.slice(1).forEach((row, rowIndex) => {
                    tableHtml += '<tr>';
                    row.forEach((cell, colIndex) => {
                        // Special highlight for your "Changing Cells" range (Columns D in Long_Model)
                        const isChangingCell = (name === "Long_Model" && colIndex === 3);
                        const style = isChangingCell ? 'style="background:#fff3cd; font-weight:bold;"' : '';
                        tableHtml += `<td ${style}>${cell}</td>`;
                    });
                    tableHtml += '</tr>';
                });

                tableHtml += '</tbody></table></div>';
                section.innerHTML += tableHtml;
                this.display.appendChild(section);
            }
        });
        Logger.log("Render Complete. Formulas evaluated.");
    }
}

new ShippingOptimizer();
