class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: "https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN"
        };

        this.analysisPages = {
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={29075b82-afbd-486b-950f-0cd95dc6e491}&action=embedview&AllowTyping=True&ActiveCell='EDF%202018%20Summary'!D2&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_EXPONENTIAL_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={42f718b2-df79-4c52-8c5a-f6e80c97b8c0}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_TRENDED_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={c6670674-ff90-4868-954e-da22a7229612}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Trend.%20Smooth.%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_ARIMA": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={d402df77-54ee-45a3-bf61-08b31aa14687}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20ARIMA%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "BRENT_EXPONENTIAL_SMOOTHING": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f2b5303c-30b9-47f7-90df-aee6e1ac6751}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "BRENT_TRENDED_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={207b54d4-07ce-4348-a273-c21bbe8c5d72}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Trend.%20Exp.%20Smooth.%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "BRENT_ARIMA": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={387040cf-f417-4999-974f-e082d18765e8}&action=embedview&AllowTyping=True&ActiveCell='Brent%20ARIMA%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_STAT": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={fc00bff8-29ee-4a6c-b472-ef0fd72dfd47}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True",
            "BRENT_CRUDE_OIL": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f5bcbb70-554b-4e08-9f3d-bc8ec9668941}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Crude%20Oil%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True"
        };

        this.aboutContentHtml = `
            <div class="img-about-header">
                <div style="display: flex; gap: 20px; align-items: center; border-right: 1px solid rgba(255,255,255,0.2); padding: 0 30px;">
                    <div style="width: 45px; height: 45px;"><img src="https://unpkg.com/feather-icons/dist/icons/package.svg" style="filter: brightness(0) invert(1); width:100%;"></div>
                    <div><div style="font-size: 2.2rem; font-weight: 800;">45M MT</div><div style="font-size: 0.7rem; text-transform: uppercase;">Total Volume</div></div>
                </div>
                <div style="display: flex; gap: 20px; align-items: center; border-right: 1px solid rgba(255,255,255,0.2); padding: 0 30px;">
                    <div style="width: 45px; height: 45px;"><img src="https://unpkg.com/feather-icons/dist/icons/anchor.svg" style="filter: brightness(0) invert(1); width:100%;"></div>
                    <div><div style="font-size: 2.2rem; font-weight: 800;">+1000</div><div style="font-size: 0.7rem; text-transform: uppercase;">Shipments</div></div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; margin-top: 40px;">
                <div style="border-left: 2px solid var(--mi-red); padding-left: 30px;">
                    <h2 style="font-size: 1.8rem; font-weight: 400; line-height: 1.3;">Providing value-added solutions to global industry.</h2>
                </div>
                <div style="font-size: 1rem; color: #4A5568; line-height: 1.8;">
                    <p>Since 1987, IMI has delivered unparalleled expertise in raw material logistics across 80 countries.</p>
                </div>
            </div>
        `;

        this.iframeCache = {};
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.homeView = document.getElementById('home-view');
        this.excelViewport = document.getElementById('excel-viewport');
        this.genericView = document.getElementById('generic-view');
        this.genericContent = document.getElementById('generic-content');
        this.iframeContainer = document.getElementById('iframe-cache-container');
        this.titleText = document.getElementById('current-sheet-title');
        this.loader = document.getElementById('loading-indicator');

        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => this.sidebar.classList.toggle('collapsed'));
        this.buildSidebar();
        this.sidebar.classList.add('collapsed');
        this.renderStaticSections();
        this.showHomePage();
    }

    renderStaticSections() {
        document.getElementById('services-section').innerHTML = `<h2 style="color: var(--mi-red); text-transform: uppercase;">Our Services</h2><div class="services-grid"><div class="service-box"><h4>Global Bulk Trading</h4><p>Independent bulk raw materials trading firm with 38 years of history.</p></div></div>`;
        document.getElementById('environmental-section').innerHTML = `<div class="env-container"><h1>Environmental Commitment</h1><p>We source responsibly from producers engaged in sustainable mining.</p></div>`;
        document.getElementById('hq-section').innerHTML = `<h2 style="color: var(--mi-red);">Global Headquarters</h2><div class="hq-container"><p>Florida | USA - 54 SE 5th Avenue, Suite 300</p></div>`;
    }
    
    buildSidebar() {
        this.nav.innerHTML = '';
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        Object.keys(this.analysisPages).forEach(key => {
            this.createNavItem(key.replace(/_/g, ' '), key, () => this.switchExcelPage(key, key.replace(/_/g, ' ')));
        });
    }

    createNavItem(text, id, callback) {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.textContent = text;
        btn.onclick = () => { callback(); this.sidebar.classList.add('collapsed'); };
        btn.setAttribute('data-id', id);
        this.nav.appendChild(btn);
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        this.hideAllViews();
        this.homeView.classList.add('active');
        if (!document.getElementById('home-content').innerHTML) {
            document.getElementById('home-content').innerHTML = `<div style="padding: 20px;"><h1>Welcome to IMI</h1>${this.aboutContentHtml}</div>`;
            document.getElementById('map-container').innerHTML = `<div class="hard-clip-wrapper" style="height: 600px;"><iframe src="${this.widgetConfig.shipXplorer}" style="width:100%; height:100%; border:none;"></iframe></div>`;
        }
    }

    switchExcelPage(pageId, displayTitle) {
        this.updateActiveNav(pageId);
        this.titleText.innerText = displayTitle;
        this.hideAllViews();
        this.excelViewport.classList.add('active');
        Object.values(this.iframeCache).forEach(f => f.style.display = 'none');
        if (this.iframeCache[pageId]) {
            this.iframeCache[pageId].style.display = 'block';
        } else {
            const f = document.createElement('iframe');
            f.style.width = "100%"; f.style.height = "600px"; f.style.border = "none";
            f.src = this.analysisPages[pageId];
            this.iframeContainer.appendChild(f);
            this.iframeCache[pageId] = f;
        }
        this.renderUploader('excel-upload-container', 'excel');
    }

    showGenericPage(title, description) {
        this.titleText.innerText = title;
        this.hideAllViews();
        this.genericView.classList.add('active');
        this.genericContent.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
        this.renderUploader('generic-upload-container', 'generic');
    }

    // --- High-Density Multi-File Uploader ---

    renderUploader(containerId, viewKey) {
        const container = document.getElementById(containerId);
        if (container.innerHTML !== "") return;

        container.innerHTML = `
            <div class="upload-section">
                <div id="dropzone-${viewKey}" class="dropzone">
                    <span style="font-size: 2rem;">📁</span>
                    <p><strong>Drag & Drop</strong> files to add to your workspace</p>
                    <input type="file" id="fileInput-${viewKey}" style="display: none;" multiple accept=".pdf,.docx,.xlsx,.csv">
                </div>
                <div id="file-grid-${viewKey}" class="file-display-grid">
                    </div>
            </div>
        `;

        const zone = document.getElementById(`dropzone-${viewKey}`);
        const input = document.getElementById(`fileInput-${viewKey}`);
        zone.onclick = () => input.click();
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
        zone.ondragleave = () => zone.classList.remove('dragover');
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            Array.from(e.dataTransfer.files).forEach(f => this.handleFile(f, viewKey));
        };
        input.onchange = (e) => {
            Array.from(e.target.files).forEach(f => this.handleFile(f, viewKey));
            input.value = ""; // Reset for next selection
        };
    }

    async handleFile(file, viewKey) {
        const grid = document.getElementById(`file-grid-${viewKey}`);
        const fileId = 'file-' + Math.random().toString(36).substr(2, 9);
        
        // Create the individual card for this file
        const card = document.createElement('div');
        card.className = 'file-card';
        card.id = fileId;
        card.innerHTML = `
            <div class="file-card-header">
                <span>${file.name}</span>
                <button class="remove-file-btn" onclick="document.getElementById('${fileId}').remove()">Remove</button>
            </div>
            <div class="file-card-content" id="content-${fileId}">Processing...</div>
        `;
        grid.prepend(card); // Add new files to the top/start of the grid

        const contentArea = document.getElementById(`content-${fileId}`);
        const ext = file.name.split('.').pop().toLowerCase();

        try {
            if (ext === 'pdf') {
                const url = URL.createObjectURL(file);
                contentArea.innerHTML = `<iframe src="${url}" class="pdf-viewer"></iframe>`;
            } else if (ext === 'docx') {
                const buffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
                contentArea.innerHTML = `<div style="padding:10px;">${result.value}</div>`;
            } else if (ext === 'xlsx' || ext === 'csv') {
                const buffer = await file.arrayBuffer();
                const wb = XLSX.read(buffer);
                const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
                contentArea.innerHTML = `<div id="grid-table-${fileId}"></div>`;
                new gridjs.Grid({
                    columns: data[0] || [],
                    data: data.slice(1),
                    pagination: { limit: 10 },
                    sort: true,
                    search: true,
                    width: '100%'
                }).render(document.getElementById(`grid-table-${fileId}`));
            } else {
                contentArea.innerHTML = "Unsupported format.";
            }
        } catch (err) {
            contentArea.innerHTML = "Error loading file.";
        }
    }

    hideAllViews() {
        [this.homeView, this.excelViewport, this.genericView].forEach(v => v.classList.remove('active'));
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

const app = new MILogisticsApp();
