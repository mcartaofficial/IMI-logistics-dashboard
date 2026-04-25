class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: "https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN"
        };

        this.analysisPages = {
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={29075b82-afbd-486b-950f-0cd95dc6e491}&action=embedview&AllowTyping=True&ActiveCell='EDF%202018%20Summary'!D2&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_EXPONENTIAL_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={42f718b2-df79-4c52-8c5a-f6e80c97b8c0}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_TRENDED_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={c6670674-ff90-4868-954e-da22a7229612}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Trend.%20Smooth.%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_ARIMA": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={d402df77-54ee-45a3-bf61-08b31aa14687}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20ARIMA%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "BRENT_EXPONENTIAL_SMOOTHING": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f2b5303c-30b9-47f7-90df-aee6e1ac6751}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "BRENT_TRENDED_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={207b54d4-07ce-4348-a273-c21bbe8c5d72}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Trend.%20Exp.%20Smooth.%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "BRENT_ARIMA": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={387040cf-f417-4999-974f-e082d18765e8}&action=embedview&AllowTyping=True&ActiveCell='Brent%20ARIMA%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_STAT": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={fc00bff8-29ee-4a6c-b472-ef0fd72dfd47}&action=embedview&AllowTyping=True",
            "BRENT_CRUDE_OIL": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f5bcbb70-554b-4e08-9f3d-bc8ec9668941}&action=embedview&AllowTyping=True"
        };

        this.aboutContentHtml = `
            <div class="img-about-header">
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/package.svg" alt="V"/></div>
                    <div class="img-about-data"><div class="img-about-val">45M MT</div><div class="img-about-label">Total Volume</div></div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/anchor.svg" alt="S"/></div>
                    <div class="img-about-data"><div class="img-about-val">+1000</div><div class="img-about-label">Shipments</div></div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/trending-up.svg" alt="T"/></div>
                    <div class="img-about-data"><div class="img-about-val">+$4B</div><div class="img-about-label">Turnover</div></div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/users.svg" alt="E"/></div>
                    <div class="img-about-data"><div class="img-about-val">+170</div><div class="img-about-label">Global Staff</div></div>
                </div>
            </div>
            <div class="img-about-content">
                <div class="img-about-highlight"><h2 class="img-about-headline">Providing value-added solutions to the global <strong class="red-text">cement, steel, wallboard</strong> and <strong class="red-text">energy</strong> industries for over 38 years.</h2></div>
                <div class="img-about-text">
                    <p>Since 1987, IMI has delivered unparalleled expertise to meet raw material needs. Our commitment has allowed us to build a large portfolio of reliable suppliers and customers.</p>
                    <p>Today, IMI sources to over 80 countries. We deliver over 38 million tons of bulk materials annually, providing creative real-time solutions.</p>
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
        
        this.viewFiles = { excel: [], generic: [] };
        // Store GridJS instances for export
        this.gridInstances = {};

        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => this.sidebar.classList.toggle('collapsed'));
        this.buildSidebar();
        this.sidebar.classList.add('collapsed');
        this.renderRelocatedSections();
        this.showHomePage();
    }

    renderRelocatedSections() {
        // Shared logic for "Our Services", "Environmental", and "HQ"
        document.getElementById('services-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Our Services</h2>
            <div class="services-grid">
                <div class="service-box"><h4>Global Trading</h4><p>38 years of history in bulk raw materials trading.</p><button class="read-me-btn">Read Me</button></div>
                <div class="service-box"><h4>Sourcing</h4><p>Multi-year contracts with global suppliers.</p><button class="read-me-btn">Read Me</button></div>
                <div class="service-box"><h4>Chartering</h4><p>Expertise in ocean vessel logistics.</p><button class="read-me-btn">Read Me</button></div>
                <div class="service-box"><h4>Logistics</h4><p>+50 global stock-and-sell centers.</p><button class="read-me-btn">Read Me</button></div>
                <div class="service-box"><h4>Marketing</h4><p>Exclusive rights in Spain and Mexico.</p><button class="read-me-btn">Read Me</button></div>
                <div class="service-box"><h4>Support</h4><p>High-touch technical and trade support.</p><button class="read-me-btn">Read Me</button></div>
            </div>
        `;

        document.getElementById('environmental-section').innerHTML = `
            <div class="env-container">
                <div class="env-header-line"></div>
                <h1 class="env-title">Our Environmental Commitment</h1>
                <ul class="commitment-list">
                    <li class="commitment-item"><div class="red-bullet"></div><div class="commitment-text">Responsible mining sourcing.</div></li>
                    <li class="commitment-item"><div class="red-bullet"></div><div class="commitment-text">Sustainability focused resource management.</div></li>
                </ul>
            </div>
        `;

        document.getElementById('hq-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Global Headquarters</h2>
            <div class="hq-container">
                <div class="hq-grid">
                    <div class="hq-box"><h4>Delray Beach | USA</h4><p>54 SE 5th Ave, FL 33483</p><a href="#" class="hq-link">Map & Directions</a></div>
                    <div class="hq-box"><h4>Dubai | UAE</h4><p>One Za’abeel, Dubai</p><a href="#" class="hq-link">Map & Directions</a></div>
                </div>
            </div>
        `;
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        Object.keys(this.analysisPages).forEach(key => {
            const label = key.replace(/_/g, ' ');
            this.createNavItem(label, key, () => this.switchExcelPage(key, label));
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
            document.getElementById('home-content').innerHTML = `
                <div style="padding: 20px;">
                    <div style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center;">
                        <h1 style="color: var(--deep-space); margin: 0; font-size: 2.2rem; font-weight: 800;">Welcome to IMI Logistics</h1>
                    </div>
                    ${this.aboutContentHtml}
                </div>`;
            
            document.getElementById('map-container').innerHTML = `
                <div class="hard-clip-wrapper" style="height: 800px;">
                    <iframe frameborder="0" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>`;
            this.renderEmbeddableWidget();
        }
    }

    renderEmbeddableWidget() {
        const container = document.getElementById('widget-mount-point');
        if (!container || container.children.length > 0) return;
        const widgetDiv = document.createElement('div');
        widgetDiv.className = "embeddable-eicHZF6jsR";
        const script = document.createElement('script');
        script.src = "https://widgets.embeddable.co/sdk/latest/embeddable.js";
        script.async = true;
        container.appendChild(widgetDiv);
        container.appendChild(script);
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
            this.loader.style.display = 'block';
            const newFrame = document.createElement('iframe');
            newFrame.style.width = "100%";
            newFrame.style.height = "850px";
            newFrame.style.border = "none";
            newFrame.src = this.analysisPages[pageId];
            newFrame.onload = () => { this.loader.style.display = 'none'; };
            this.iframeContainer.appendChild(newFrame);
            this.iframeCache[pageId] = newFrame;
        }
        this.renderMultiUploader('excel-upload-container', 'excel');
    }

    renderMultiUploader(containerId, viewKey) {
        const container = document.getElementById(containerId);
        if (container.innerHTML !== "") return;
        container.innerHTML = `
            <div class="upload-section">
                <div id="dropzone-${viewKey}" class="dropzone">
                    <span class="dropzone-icon">📁</span>
                    <p><strong>Drag & Drop</strong> or browse files</p>
                    <input type="file" id="fileInput-${viewKey}" style="display: none;" accept=".pdf,.docx,.xlsx,.csv" multiple>
                </div>
                <div id="viewer-list-${viewKey}" class="viewer-list"></div>
            </div>`;
        this.initDropzone(viewKey);
    }

    initDropzone(viewKey) {
        const zone = document.getElementById(`dropzone-${viewKey}`);
        const input = document.getElementById(`fileInput-${viewKey}`);
        zone.onclick = () => input.click();
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
        zone.ondragleave = () => zone.classList.remove('dragover');
        zone.ondrop = (e) => { e.preventDefault(); zone.classList.remove('dragover'); this.handleFiles(e.dataTransfer.files, viewKey); };
        input.onchange = (e) => this.handleFiles(e.target.files, viewKey);
    }

    async handleFiles(files, viewKey) {
        const fileList = Array.from(files);
        const remaining = 10 - this.viewFiles[viewKey].length;
        const process = fileList.slice(0, remaining);
        for (const file of process) {
            const fileId = 'f' + Date.now() + Math.floor(Math.random()*1000);
            this.viewFiles[viewKey].push({ id: fileId, file });
            await this.renderFileItem(file, fileId, viewKey);
        }
    }

    async renderFileItem(file, fileId, viewKey) {
        const list = document.getElementById(`viewer-list-${viewKey}`);
        const item = document.createElement('div');
        item.className = 'viewer-item';
        item.id = `item-${fileId}`;
        
        item.innerHTML = `
            <div class="viewer-header">
                <span>${file.name}</span>
                <div class="btn-group">
                    <button class="download-btn" onclick="app.downloadFile('${fileId}')">Download Updated</button>
                    <button class="remove-file" onclick="app.removeSpecificFile('${fileId}', '${viewKey}')">Remove</button>
                </div>
            </div>
            <div id="content-${fileId}" class="viewer-content">Processing...</div>
        `;
        list.appendChild(item);

        const contentArea = document.getElementById(`content-${fileId}`);
        const ext = file.name.split('.').pop().toLowerCase();

        try {
            if (ext === 'pdf') {
                contentArea.innerHTML = `<iframe src="${URL.createObjectURL(file)}" class="pdf-viewer"></iframe>`;
            } else if (ext === 'docx') {
                const buffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
                contentArea.innerHTML = `<div id="edit-${fileId}" class="docx-viewer" contenteditable="true">${result.value}</div>`;
            } else if (ext === 'xlsx' || ext === 'csv') {
                const buffer = await file.arrayBuffer();
                const wb = XLSX.read(buffer);
                const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });
                
                contentArea.innerHTML = `<div id="grid-${fileId}"></div>`;
                const grid = new gridjs.Grid({
                    columns: data[0].map(col => ({ name: col || ' ', resizable: true })),
                    data: data.slice(1),
                    pagination: false, // Ensure full visibility
                    sort: true,
                    resizable: true,
                    search: true,
                    fixedHeader: true,
                    height: '600px', // Allow vertical scroll within container
                    width: '100%'
                }).render(document.getElementById(`grid-${fileId}`));
                
                this.gridInstances[fileId] = { grid: grid, originalName: file.name, type: ext };
            }
        } catch (err) {
            contentArea.innerHTML = `<p style="color: var(--mi-red)">Error: ${err.message}</p>`;
        }
    }

    downloadFile(fileId) {
        const instance = this.gridInstances[fileId];
        
        // Handle Spreadsheet Download
        if (instance) {
            const gridData = instance.grid.config.data;
            const headers = instance.grid.config.columns.map(c => c.name);
            const fullSet = [headers, ...gridData];
            
            const ws = XLSX.utils.aoa_to_sheet(fullSet);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "UpdatedSheet");
            
            XLSX.writeFile(wb, `updated_${instance.originalName}`);
            return;
        }

        // Handle Word Download (Simple Text Export)
        const docContainer = document.getElementById(`edit-${fileId}`);
        if (docContainer) {
            const content = docContainer.innerText;
            const blob = new Blob([content], { type: "application/msword" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `updated_content.doc`;
            a.click();
        }
    }

    removeSpecificFile(fileId, viewKey) {
        document.getElementById(`item-${fileId}`)?.remove();
        delete this.gridInstances[fileId];
        this.viewFiles[viewKey] = this.viewFiles[viewKey].filter(f => f.id !== fileId);
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
