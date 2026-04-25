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
                <div class="img-about-card">
                    <div class="img-about-icon"><i data-lucide="package"></i></div>
                    <div class="img-about-data">
                        <div class="img-about-val">45M MT</div>
                        <div class="img-about-label">Total Volume</div>
                    </div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><i data-lucide="anchor"></i></div>
                    <div class="img-about-data">
                        <div class="img-about-val">+1000</div>
                        <div class="img-about-label">Shipments</div>
                    </div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><i data-lucide="trending-up"></i></div>
                    <div class="img-about-data">
                        <div class="img-about-val">+$4 Billion</div>
                        <div class="img-about-label">Turnover</div>
                    </div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><i data-lucide="users"></i></div>
                    <div class="img-about-data">
                        <div class="img-about-val">+170</div>
                        <div class="img-about-label">Global Employees</div>
                    </div>
                </div>
            </div>
            <div class="img-about-content">
                <div class="img-about-highlight">
                    <h2 class="img-about-headline">Providing value-added solutions to the global <strong class="red-text">cement, steel, wallboard</strong> and <strong class="red-text">energy</strong> industries for over 38 years.</h2>
                </div>
                <div class="img-about-text">
                    <p>Since 1987, the worldwide cement, wallboard, and steel industries have come to depend on IMI to deliver unparalleled expertise to meet their raw material needs. Our commitment to service excellence has allowed us to build a large portfolio of reliable, first-class suppliers, ship operators, and customers.</p>
                    <p>Today, IMI sources or ships to over 80 countries worldwide. Along with our partners and affiliates, we deliver over 38 million tons of bulk materials annually, providing creative and economical real-time solutions to any logistical challenge our customers may face.</p>
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
        this.editorOverlay = document.getElementById('editor-overlay');
        this.editorBody = document.getElementById('editor-body');
        this.editorFilename = document.getElementById('editor-filename');
        
        this.viewFiles = { excel: [], generic: [] };
        this.hotInstance = null; // Handsontable instance

        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });
        this.buildSidebar();
        this.sidebar.classList.add('collapsed');
        this.renderRelocatedSections();
        this.showHomePage();
        lucide.createIcons();
    }

    renderRelocatedSections() {
        document.getElementById('services-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Our Services</h2>
            <div class="services-grid">
                <div class="service-box">
                    <h4>Global Bulk Raw Materials Trading</h4>
                    <p>IMI is one of the leading privately-owned, independent, bulk raw materials trading firms in the world today.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Sourcing</h4>
                    <p>IMI holds multi-year contracts and marketing rights with suppliers for many products including natural gypsum.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Chartering</h4>
                    <p>IMI has a first class reputation as a reliable expert in ocean vessel chartering and logistics planning.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
            </div>
        `;

        document.getElementById('environmental-section').innerHTML = `
            <div class="env-container">
                <div class="env-header-line"></div>
                <h1 class="env-title">Our Environmental<br>Commitment</h1>
                <ul class="commitment-list">
                    <li class="commitment-item">
                        <div class="red-bullet"></div>
                        <div class="commitment-text">We work toward sourcing our raw materials from producers who engage in responsible mining processes.</div>
                    </li>
                </ul>
            </div>
        `;

        document.getElementById('hq-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Global Headquarters</h2>
            <div class="hq-container">
                <div class="hq-grid">
                    <div class="hq-box">
                        <h4>Florida | USA</h4>
                        <p>54 SE 5th Avenue, Suite 300<br>Delray Beach, FL 33483</p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                </div>
            </div>
        `;
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.createNavItem('DATA VISUALIZATION', 'DATA_VISUALIZATION', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        this.createNavItem('ROTTERDAM ARIMA', 'ROTTERDAM_ARIMA', () => this.switchExcelPage('ROTTERDAM_ARIMA', 'Rotterdam ARIMA'));
        this.createNavItem('BRENT ARIMA', 'BRENT_ARIMA', () => this.switchExcelPage('BRENT_ARIMA', 'Brent ARIMA'));
    }

    createNavItem(text, id, callback) {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.textContent = text;
        btn.onclick = () => {
            callback();
            this.sidebar.classList.add('collapsed');
        };
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
                    <div style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--off-white); padding-bottom: 20px;">
                        <h1 style="color: var(--deep-space); margin: 0; font-size: 2.2rem; font-weight: 800;">Welcome to IMI Logistics</h1>
                        <div class="stat-box" style="margin: 0; min-width: 180px;">
                            <small style="letter-spacing: 1px;">SYSTEM STATUS</small>
                            <h2 style="margin: 5px 0; color: #10B981; font-weight: 900;">ACTIVE</h2>
                        </div>
                    </div>
                    ${this.aboutContentHtml}
                </div>`;
            
            document.getElementById('map-container').innerHTML = `
                <div class="hard-clip-wrapper" style="height: 800px;">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>`;
        }
        lucide.createIcons();
    }

    switchExcelPage(pageId, displayTitle) {
        this.updateActiveNav(pageId);
        this.titleText.innerText = displayTitle;
        this.hideAllViews();
        this.excelViewport.classList.add('active');
        Object.values(this.iframeCache).forEach(frame => frame.style.display = 'none');
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
        if (container.dataset.initialized) return;

        container.innerHTML = `
            <div class="upload-section">
                <div id="dropzone-${viewKey}" class="dropzone">
                    <i data-lucide="upload-cloud" style="width: 40px; height: 40px; margin-bottom: 10px;"></i>
                    <p><strong>Drag & Drop</strong> up to 10 files or click to browse</p>
                    <p style="font-size: 0.75rem; opacity: 0.7;">PDF, DOCX, XLSX, CSV</p>
                    <input type="file" id="fileInput-${viewKey}" style="display: none;" accept=".pdf,.docx,.xlsx,.csv" multiple>
                </div>
                <div id="file-list-${viewKey}" class="file-list-container"></div>
            </div>
        `;
        container.dataset.initialized = "true";
        this.initDropzone(viewKey);
        lucide.createIcons();
    }

    initDropzone(viewKey) {
        const zone = document.getElementById(`dropzone-${viewKey}`);
        const input = document.getElementById(`fileInput-${viewKey}`);
        zone.onclick = () => input.click();
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
        zone.ondragleave = () => zone.classList.remove('dragover');
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files, viewKey);
        };
        input.onchange = (e) => this.handleFiles(e.target.files, viewKey);
    }

    async handleFiles(files, viewKey) {
        const fileList = Array.from(files);
        const remainingSlots = 10 - this.viewFiles[viewKey].length;
        const filesToProcess = fileList.slice(0, remainingSlots);

        if (fileList.length > remainingSlots) alert(`Limit reached. 10 files max.`);

        for (const file of filesToProcess) {
            const fileId = Date.now() + Math.random().toString(36).substr(2, 9);
            this.viewFiles[viewKey].push({ id: fileId, file, status: 'complete' });
            this.renderFileRow(file, fileId, viewKey);
        }
    }

    renderFileRow(file, fileId, viewKey) {
        const list = document.getElementById(`file-list-${viewKey}`);
        const row = document.createElement('div');
        row.className = 'file-row';
        row.id = `row-${fileId}`;
        
        const size = (file.size / 1024).toFixed(1) + ' KB';
        const ext = file.name.split('.').pop().toUpperCase();

        row.innerHTML = `
            <div class="file-info" onclick="app.openEditor('${fileId}', '${viewKey}')">
                <i data-lucide="file-text" class="file-icon"></i>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <span class="file-meta">${ext} • ${size}</span>
                </div>
            </div>
            <span class="status-pill status-complete">Complete</span>
            <button class="remove-file" style="margin-left: 20px;" onclick="app.removeSpecificFile('${fileId}', '${viewKey}')">Remove</button>
        `;
        list.appendChild(row);
        lucide.createIcons();
    }

    async openEditor(fileId, viewKey) {
        const fileObj = this.viewFiles[viewKey].find(f => f.id === fileId);
        if (!fileObj) return;

        this.editorFilename.innerText = fileObj.file.name;
        this.editorBody.innerHTML = '<div id="editor-loading">Processing Content...</div>';
        this.editorOverlay.classList.add('open');

        const extension = fileObj.file.name.split('.').pop().toLowerCase();

        try {
            if (extension === 'xlsx' || extension === 'csv') {
                const arrayBuffer = await fileObj.file.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer);
                const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
                
                this.editorBody.innerHTML = '<div id="hot-container" style="width:100%; height:100%;"></div>';
                
                if (this.hotInstance) this.hotInstance.destroy();
                
                this.hotInstance = new Handsontable(document.getElementById('hot-container'), {
                    data: data,
                    rowHeaders: true,
                    colHeaders: true,
                    height: '100%',
                    width: '100%',
                    licenseKey: 'non-commercial-and-evaluation',
                    stretchH: 'all',
                    contextMenu: true,
                    manualColumnResize: true,
                    manualRowResize: true,
                    dropdownMenu: true,
                    filters: true
                });
            } else if (extension === 'docx') {
                const arrayBuffer = await fileObj.file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                this.editorBody.innerHTML = `<div contenteditable="true" class="text-editor-container">${result.value}</div>`;
            } else if (extension === 'pdf') {
                const url = URL.createObjectURL(fileObj.file);
                this.editorBody.innerHTML = `<iframe src="${url}" style="width:100%; height:100%; border:none;"></iframe>`;
            }
        } catch (err) {
            this.editorBody.innerHTML = `<p style="color:red">Error loading file: ${err.message}</p>`;
        }
    }

    closeEditor() {
        this.editorOverlay.classList.remove('open');
        if (this.hotInstance) {
            this.hotInstance.destroy();
            this.hotInstance = null;
        }
    }

    removeSpecificFile(fileId, viewKey) {
        document.getElementById(`row-${fileId}`)?.remove();
        this.viewFiles[viewKey] = this.viewFiles[viewKey].filter(f => f.id !== fileId);
        event.stopPropagation();
    }

    hideAllViews() {
        this.homeView.classList.remove('active');
        this.excelViewport.classList.remove('active');
        this.genericView.classList.remove('active');
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

const app = new MILogisticsApp();
