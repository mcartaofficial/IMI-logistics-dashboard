/**
 * IMI Shipping & Freight - Route Optimization Logic
 * Updated for Single-File Drag & Drop
 */

class ShippingOptimizer {
    constructor() {
        this.workbookData = null;
        this.dropZone = document.getElementById('drop-zone');
        this.fileInput = document.getElementById('file-input');
        this.optimizeBtn = document.getElementById('optimize-btn');
        this.statusMsg = document.getElementById('file-status');
        this.dashboardOutput = document.getElementById('dashboard-output');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Trigger file input when clicking the drop zone
        this.dropZone.addEventListener('click', () => this.fileInput.click());

        // Handle file selection via dialog
        this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));

        // Drag & Drop visual effects
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        });

        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('dragover');
        });

        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            this.handleFile(e.dataTransfer.files[0]);
        });

        // Optimization button logic
        this.optimizeBtn.addEventListener('click', () => this.renderDashboard());
    }

    handleFile(file) {
        if (!file) return;

        // Check file extension
        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
            this.updateStatus('Error: Please upload an Excel file (.xlsx)', 'red');
            return;
        }

        this.updateStatus(`File detected: ${file.name}. Reading data...`, 'var(--imi-navy)');

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { 
                    type: 'array',
                    cellFormula: true, // Evaluates Excel formulas
                    cellNF: true, 
                    cellText: true 
                });

                this.workbookData = this.parseWorkbook(workbook);
                
                // Update UI Success
                this.updateStatus(`Successfully loaded: ${file.name}`, 'var(--accent-green)');
                this.optimizeBtn.disabled = false;
                this.dropZone.style.borderColor = 'var(--accent-green)';
            } catch (err) {
                console.error(err);
                this.updateStatus('Error: Could not parse Excel content.', 'red');
            }
        };
        reader.readAsArrayBuffer(file);
    }

    parseWorkbook(workbook) {
        const sheets = {};
        workbook.SheetNames.forEach(name => {
            // Convert each sheet to a 2D array (header: 1)
            // raw: false ensures we get the calculated value of formulas
            sheets[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false });
        });
        return sheets;
    }

    renderDashboard() {
        if (!this.workbookData) return;

        this.dashboardOutput.innerHTML = ''; // Clear previous results

        Object.entries(this.workbookData).forEach(([sheetName, rows]) => {
            if (rows.length === 0) return;

            const section = document.createElement('div');
            section.className = 'sheet-section card';
            
            let tableHTML = `
                <div class="sheet-header">${sheetName}</div>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>${rows[0].map(h => `<th>${h || ''}</th>`).join('')}</tr>
                        </thead>
                        <tbody>
            `;

            // Add data rows (skipping the header)
            rows.slice(1).forEach(row => {
                tableHTML += `<tr>${row.map(cell => `<td>${cell || ''}</td>`).join('')}</tr>`;
            });

            tableHTML += `</tbody></table></div>`;
            section.innerHTML = tableHTML;
            this.dashboardOutput.appendChild(section);
        });

        // Smooth scroll to results
        this.dashboardOutput.scrollIntoView({ behavior: 'smooth' });
    }

    updateStatus(text, color) {
        this.statusMsg.style.display = 'block';
        this.statusMsg.textContent = text;
        this.statusMsg.style.color = color;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ShippingOptimizer();
});
