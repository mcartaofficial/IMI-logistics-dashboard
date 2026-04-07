/**
 * IMI Dashboard Logic
 * Handles file parsing and dynamic table rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const statusMsg = document.getElementById('status-msg');
    const processBtn = document.getElementById('process-btn');
    const output = document.getElementById('output');

    let cachedWorkbook = null;

    // --- Safety Check ---
    if (typeof XLSX === 'undefined') {
        alert("Error: SheetJS library failed to load. Check your internet connection.");
        return;
    }

    // 1. Trigger File Selection
    dropZone.addEventListener('click', () => fileInput.click());

    // 2. Handle File Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFileSelection(file);
    });

    // 3. Handle File Input (Click)
    fileInput.addEventListener('change', (e) => {
        handleFileSelection(e.target.files[0]);
    });

    function handleFileSelection(file) {
        if (!file) return;
        
        console.log("File Selected:", file.name);

        // Extension Check (Case Insensitive)
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'xlsx' && ext !== 'xls') {
            updateStatus("Error: Please select an Excel (.xlsx) file", "red");
            return;
        }

        updateStatus(`Loading ${file.name}...`, "orange");

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { 
                    type: 'array',
                    cellFormula: true, // Crucial for evaluating What-If results
                    cellNF: true,
                    cellText: true 
                });

                cachedWorkbook = workbook;
                updateStatus(`File Ready: ${file.name}`, "green");
                processBtn.disabled = false;
                console.log("Workbook parsed successfully.");
            } catch (err) {
                console.error(err);
                updateStatus("Error parsing file. Is it password protected?", "red");
            }
        };

        reader.onerror = () => updateStatus("Error reading file.", "red");
        reader.readAsArrayBuffer(file);
    }

    // 4. Render the Dashboard
    processBtn.addEventListener('click', () => {
        if (!cachedWorkbook) return;
        
        output.innerHTML = ""; // Clear old results
        
        cachedWorkbook.SheetNames.forEach(sheetName => {
            const data = XLSX.utils.sheet_to_json(cachedWorkbook.Sheets[sheetName], { 
                header: 1, 
                raw: false // Shows formula results as text ($10.50) instead of raw numbers
            });

            if (data.length > 0) {
                renderSheet(sheetName, data);
            }
        });

        updateStatus("Dashboard updated successfully!", "var(--imi-navy)");
    });

    function renderSheet(name, rows) {
        const card = document.createElement('div');
        card.className = 'sheet-card';
        
        let html = `<div class="sheet-title">${name}</div><div class="table-wrap"><table>`;
        
        // Build Header
        html += `<thead><tr>${rows[0].map(h => `<th>${h || ''}</th>`).join('')}</tr></thead>`;
        
        // Build Body
        html += `<tbody>`;
        rows.slice(1).forEach(row => {
            html += `<tr>${row.map(cell => `<td>${cell || ''}</td>`).join('')}</tr>`;
        });
        html += `</tbody></table></div>`;
        
        card.innerHTML = html;
        output.appendChild(card);
    }

    function updateStatus(text, color) {
        statusMsg.style.display = 'block';
        statusMsg.style.color = color;
        statusMsg.textContent = text;
    }
});
