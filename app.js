/**
 * IMI SHIPPING & FREIGHT - ULTRA-STABLE PARSER
 * Designed to handle large Excel files and formula-heavy sheets
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
        console.log(`[IMI LOG] ${msg}`);
    }
};

class HeavyDutyOptimizer {
    constructor() {
        this.fileInput = document.getElementById('file-input');
        this.dropZone = document.getElementById('drop-zone');
        this.optimizeBtn = document.getElementById('optimize-btn');
        this.display = document.getElementById('data-display');
        this.workbook = null;

        this.init();
    }

    init() {
        // Check for Library
        if (window.XLSX) {
            Logger.log("Excel Engine (SheetJS) Loaded Successfully.");
        } else {
            Logger.log("Excel Engine NOT FOUND. Please check internet connection.", true);
        }

        // Drag & Drop Events
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('active');
        });

        this.dropZone.addEventListener('dragleave', () => this.dropZone.classList.remove('active'));

        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('active');
            this.processFile(e.dataTransfer.files[0]);
        });

        // Click Event
        this.fileInput.addEventListener('change', (e) => this.processFile(e.target.files[0]));

        // Optimization Click
        this.optimizeBtn.addEventListener('click', () => this.renderFullAnalysis());
    }

    processFile(file) {
        if (!file) return;
        Logger.log(`File detected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                Logger.log("Attempting to parse binary data...");
                const data = new Uint8Array(e.target.result);
                
                // FORCE PARSE: 
                // We use 'cellFormula: false' if true fails to get raw values faster
                const wb = XLSX.read(data, { 
                    type: 'array',
                    cellDates: true,
                    cellNF: true,
                    cellText: true
                });

                this.workbook = wb;
                Logger.log(`Success! Found ${wb.SheetNames.length} sheets: ${wb.SheetNames.join(', ')}`);
                
                document.getElementById('prompt-text').innerText = "File Loaded!";
                document.getElementById('prompt-text').style.color = "#2ecc71";
                this.optimizeBtn.disabled = false;

            } catch (err) {
                Logger.log(`CRITICAL PARSE ERROR: ${err.message}`, true);
            }
        };

        reader.onerror = () => Logger.log("FileReader encountered an error reading the disk.", true);
        reader.readAsArrayBuffer(file);
    }

    renderFullAnalysis() {
        Logger.log("Generating Dashboard Tables...");
        this.display.innerHTML = "";

        this.workbook.SheetNames.forEach(name => {
            const sheet = this.workbook.Sheets[name];
            // Convert to JSON with 'defval' to prevent skipping empty cells
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

            if (rows.length > 0) {
                const section = document.createElement('div');
                section.innerHTML = `<h3>Sheet: ${name}</h3>`;
                
                let tableHtml = '<table><thead><tr>';
                // Header
                rows[0].forEach(h => tableHtml += `<th>${h}</th>`);
                tableHtml += '</tr></thead><tbody>';

                // Data (limit to 50 rows for performance)
                rows.slice(1, 51).forEach(row => {
                    tableHtml += '<tr>';
                    row.forEach(cell => tableHtml += `<td>${cell}</td>`);
                    tableHtml += '</tr>';
                });

                tableHtml += '</tbody></table>';
                section.innerHTML += tableHtml;
                this.display.appendChild(section);
            }
        });
        Logger.log("Dashboard Render Complete.");
    }
}

// Start the engine
const app = new HeavyDutyOptimizer();
