/**
 * IMI Freight Optimization Dashboard - Core Logic
 * Author: Senior JS Developer
 */

class DashboardManager {
    constructor() {
        this.dropZone = document.getElementById('drop-zone');
        this.fileInput = document.getElementById('file-input');
        this.container = document.getElementById('dashboard-container');
        this.statusMsg = document.getElementById('status-message');
        this.workbookData = {};

        this.init();
    }

    init() {
        // Drag and Drop Events
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('border-blue-500', 'bg-blue-50');
        });

        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('border-blue-500', 'bg-blue-50');
        });

        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('border-blue-500', 'bg-blue-50');
            const file = e.dataTransfer.files[0];
            this.processFile(file);
        });

        // Click to upload
        this.dropZone.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.processFile(e.target.files[0]));
    }

    /**
     * Main processing pipeline
     */
    async processFile(file) {
        if (!file) return;

        // Validation
        if (!file.name.endsWith('.xlsx')) {
            this.notify('Invalid file type. Please upload an .xlsx file.', 'error');
            return;
        }

        this.notify(`Processing ${file.name}...`, 'info');

        try {
            const data = await this.readFileAsArrayBuffer(file);
            // Parse workbook with cellFormula: true to ensure we can access results
            const workbook = XLSX.read(data, { type: 'array', cellFormula: true, cellNF: true, cellText: true });
            
            this.workbookData = this.parseAllSheets(workbook);
            this.renderDashboard();
            this.notify('Dashboard updated successfully!', 'success');
        } catch (error) {
            console.error('Parsing Error:', error);
            this.notify('Error parsing Excel file. Ensure it is not corrupt.', 'error');
        }
    }

    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Extracts data from all sheets and converts to JSON
     */
    parseAllSheets(workbook) {
        const result = {};
        workbook.SheetNames.forEach(name => {
            const sheet = workbook.Sheets[name];
            // header: 1 produces a 2D array, which is most flexible for inconsistent structures
            // raw: false ensures formulas are evaluated to their display values
            result[name] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });
        });
        return result;
    }

    /**
     * UI Rendering Logic
     */
    renderDashboard() {
        this.container.innerHTML = ''; // Clear previous data

        Object.entries(this.workbookData).forEach(([sheetName, rows]) => {
            if (rows.length === 0) return;

            const section = document.createElement('section');
            section.className = 'bg-white shadow rounded-lg overflow-hidden mb-8';
            
            // Header
            section.innerHTML = `
                <div class="bg-gray-800 px-6 py-4">
                    <h2 class="text-xl font-semibold text-white">${sheetName}</h2>
                </div>
                <div class="p-6 overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50" id="head-${sheetName}"></thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="body-${sheetName}"></tbody>
                    </table>
                </div>
            `;

            this.container.appendChild(section);
            this.populateTable(sheetName, rows);
        });
    }

    populateTable(sheetName, rows) {
        const head = document.getElementById(`head-${sheetName}`);
        const body = document.getElementById(`body-${sheetName}`);

        // Assume first row with data is header
        const headers = rows[0] || [];
        
        const headerRow = document.createElement('tr');
        headers.forEach(h => {
            const th = document.createElement('th');
            th.className = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
            th.textContent = h || '';
            headerRow.appendChild(th);
        });
        head.appendChild(headerRow);

        // Data Rows (skip the first row)
        rows.slice(1).forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors';
            
            // Match row length to header length for consistency
            headers.forEach((_, index) => {
                const td = document.createElement('td');
                td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-gray-100';
                td.textContent = row[index] !== undefined ? row[index] : '';
                tr.appendChild(td);
            });
            body.appendChild(tr);
        });
    }

    notify(msg, type) {
        this.statusMsg.classList.remove('hidden', 'bg-blue-100', 'text-blue-700', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
        
        const styles = {
            info: 'bg-blue-100 text-blue-700',
            error: 'bg-red-100 text-red-700',
            success: 'bg-green-100 text-green-700'
        };

        this.statusMsg.className = `p-4 rounded-lg mb-6 ${styles[type]}`;
        this.statusMsg.textContent = msg;
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});
