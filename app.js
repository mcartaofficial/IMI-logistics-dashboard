class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: "https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN",
            elfsightId: "d9332a95-3af1-4708-a385-24cef7defd35"
        };

        this.analysisPages = {
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/hardyj2025_fau_edu/_layouts/15/Doc.aspx?sourcedoc={546c8dd2-3f61-4d74-86f7-3da881b4eece}&action=embedview&AllowTyping=True&ActiveCell='What_If_Inputs'!A1&wdDownloadButton=True&wdInConfigurator=True",
            "ROTTERDAM_EXP_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={20d1f016-82b3-467b-94ed-1bd03c0b7c1f}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Exp%20Smooth'!A1&wdDownloadButton=True&wdInConfigurator=True",
            "BRENT_CRUDE_OIL": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f5bcbb70-554b-4e08-9f3d-bc8ec9668941}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Crude%20Oil%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True",
            "ROTTERDAM_STAT": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={fc00bff8-29ee-4a6c-b472-ef0fd72dfd47}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True"
        };

        this.staticPages = {
            "ABOUT": {
                title: "About IMI Logistics",
                content: `<h2>Our Mission</h2><p>International Maritime Industries (IMI) is a global leader in maritime logistics, providing cutting-edge solutions for shipping and freight management. We leverage advanced data analytics to optimize global supply chains.</p>`
            },
            "TEAM": {
                title: "Our Team",
                content: `<h2>Leadership</h2><div class="grid-3">
                    <div class="info-card"><h4>Michael Cartagena</h4><p>Project Manager</p></div>
                    <div class="info-card"><h4>Operations Team</h4><p>Logistics & Analysis</p></div>
                    <div class="info-card"><h4>Technical Leads</h4><p>Development & Integration</p></div>
                </div>`
            },
            "PRODUCTS": {
                title: "Our Products",
                content: `<h2>Innovative Solutions</h2><div class="grid-3">
                    <div class="info-card"><h4>Fleet Tracking Pro</h4><p>Real-time vessel monitoring.</p></div>
                    <div class="info-card"><h4>Predictive Analytics</h4><p>Forecasting shipping lane efficiency.</p></div>
                    <div class="info-card"><h4>Logistics API</h4><p>Seamless data integration for partners.</p></div>
                </div>`
            },
            "PARTNERS": {
                title: "Partners & Affiliates",
                content: `<h2>Global Network</h2><p>We collaborate with port authorities, international shipping registries, and technology providers worldwide to ensure seamless maritime operations.</p>`
            },
            "ENVIRONMENT": {
                title: "Environmental Commitment",
                content: `<h2>Sustainability Goals</h2><p>IMI is committed to reducing the carbon footprint of global shipping through route optimization and supporting the transition to sustainable maritime fuels.</p>`
            },
            "SERVICES": {
                title: "Our Services",
                content: `<h2>What We Do</h2><ul><li>Freight Forwarding</li><li>Port Management</li><li>Supply Chain Consulting</li><li>Maritime Risk Analysis</li></ul>`
            },
            "HEADQUARTERS": {
                title: "Headquarters",
                content: `<h2>Visit Us</h2><p><strong>Main Office:</strong><br>Global Maritime Center<br>Port District, Terminal 4<br>International Operations Hub</p>`
            }
        };

        this.iframeCache = {};
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.homeView = document.getElementById('home-view');
        this.infoView = document.getElementById('info-view');
        this.infoContentArea = document.getElementById('info-content-area');
        this.excelViewport = document.getElementById('excel-viewport');
        this.iframeContainer = document.getElementById('iframe-cache-container');
        this.titleText = document.getElementById('current-sheet-title');
        this.loader = document.getElementById('loading-indicator');
        
        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });

        this.buildSidebar();
        this.sidebar.classList.add('collapsed');
        this.showHomePage();
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        
        // Main Navigation
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());

        // Analysis Section
        this.createLabel('Data Analysis');
        this.createNavItem('DATA VISUALIZATION', 'DATA_VISUALIZATION', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        this.createNavItem('FORECASTING MODELS', 'ROTTERDAM_EXP_SMOOTH', () => this.switchExcelPage('ROTTERDAM_EXP_SMOOTH', 'Forecasting Time Series Models'));
        this.createNavItem('BRENT CRUDE OIL', 'BRENT_CRUDE_OIL', () => this.switchExcelPage('BRENT_CRUDE_OIL', 'Brent Crude Oil Stat Sign'));
        this.createNavItem('ROTTERDAM STAT', 'ROTTERDAM_STAT', () => this.switchExcelPage('ROTTERDAM_STAT', 'Rotterdam Stat Sign'));

        // Corporate Section
        this.createLabel('Corporate Information');
        this.createNavItem('About Page', 'ABOUT', () => this.showStaticPage('ABOUT'));
        this.createNavItem('Our Team', 'TEAM', () => this.showStaticPage('TEAM'));
        this.createNavItem('Our Products', 'PRODUCTS', () => this.showStaticPage('PRODUCTS'));
        this.createNavItem('Partners & Affiliates', 'PARTNERS', () => this.showStaticPage('PARTNERS'));
        this.createNavItem('Environmental Commitment', 'ENVIRONMENT', () => this.showStaticPage('ENVIRONMENT'));
        this.createNavItem('Our Services', 'SERVICES', () => this.showStaticPage('SERVICES'));
        this.createNavItem('Headquarters', 'HEADQUARTERS', () => this.showStaticPage('HEADQUARTERS'));
    }

    createLabel(text) {
        const div = document.createElement('div');
        div.className = 'nav-group-label';
        div.textContent = text;
        this.nav.appendChild(div);
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
        this.resetViews();
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        this.homeView.classList.add('active');

        if (!document.getElementById('home-content').innerHTML) {
            document.getElementById('home-content').innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                    <p style="color: var(--text-gray);">Select a module from the sidebar to begin.</p>
                    <div class="welcome-grid">
                        <div class="stat-box"><small>SYSTEM STATUS</small><h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2></div>
                        <div class="stat-box"><small>MODULARS</small><h2 style="margin: 5px 0; color: var(--mi-red);">11 TOTAL</h2></div>
                    </div>
                </div>`;

            document.getElementById('map-container').innerHTML = `
                <div class="hard-clip-wrapper" style="height: 600px;">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>`;
        }
    }

    showStaticPage(pageKey) {
        const page = this.staticPages[pageKey];
        this.resetViews();
        this.updateActiveNav(pageKey);
        this.titleText.innerText = page.title;
        this.infoContentArea.innerHTML = page.content;
        this.infoView.classList.add('active');
    }

    switchExcelPage(pageId, displayTitle) {
        this.resetViews();
        this.updateActiveNav(pageId);
        this.titleText.innerText = displayTitle;
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
    }

    resetViews() {
        this.homeView.classList.remove('active');
        this.excelViewport.classList.remove('active');
        this.infoView.classList.remove('active');
        this.loader.style.display = 'none';
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
