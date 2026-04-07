switchPage(sheetName) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-id="${sheetName}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    this.titleText.innerText = sheetName.replace(/_/g, ' ');

    const rows = this.workbookData[sheetName];
    if (!rows || rows.length === 0) return;

    let html = '<div class="table-container"><table><thead><tr>';
    // Header Row
    rows[0].forEach(cell => html += `<th>${cell}</th>`);
    html += '</tr></thead><tbody>';

    // Data Rows
    rows.slice(1).forEach((row) => {
        const isTotalRow = row.some(cell => String(cell).toLowerCase().includes('total'));
        html += `<tr class="${isTotalRow ? 'text-total' : ''}">`;

        row.forEach((cell, index) => {
            let className = "";
            const val = parseFloat(cell);

            // 1. Format Currency/Numbers
            if (!isNaN(val) && typeof cell !== 'string') {
                className = "cell-currency";
                
                // 2. High/Low Cost Logic (Example: Costs over $15 are Red)
                if (this.titleText.innerText.includes('Cost')) {
                    if (val > 15) className += " cost-high";
                    else if (val > 0 && val < 10) className += " cost-low";
                }
            }

            // 3. Highlight Solver "Changing Cells" (Shipments column)
            if (this.titleText.innerText.includes('Long Model') && index === 3 && val > 0) {
                className += " changing-cell";
            }

            html += `<td class="${className}">${cell}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    this.tableOutput.innerHTML = html;
    document.querySelector('.content').scrollTop = 0;
}
