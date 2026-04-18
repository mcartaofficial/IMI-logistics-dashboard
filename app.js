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

        this.iframeCache = {};
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.homeView = document.getElementById('home-view');
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
        
        // Navigation Sections
        this.createNavLabel('Core Dashboard');
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.createNavItem('DATA VISUALIZATION', 'DATA_VISUALIZATION', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        this.createNavItem('FORECASTING MODELS', 'ROTTERDAM_EXP_SMOOTH', () => this.switchExcelPage('ROTTERDAM_EXP_SMOOTH', 'Forecasting Time Series Models'));
        this.createNavItem('BRENT CRUDE OIL', 'BRENT_CRUDE_OIL', () => this.switchExcelPage('BRENT_CRUDE_OIL', 'Brent Crude Oil Stat Sign'));
        this.createNavItem('ROTTERDAM STAT', 'ROTTERDAM_STAT', () => this.switchExcelPage('ROTTERDAM_STAT', 'Rotterdam Stat Sign'));

        this.createNavLabel('Company Profile');
        this.createNavItem('ABOUT US', 'ABOUT_PAGE', () => this.showStaticPage('About IMI Logistics', 'Learn about our mission to redefine maritime logistics through data-driven precision.'));
        this.createNavItem('OUR TEAM', 'OUR_TEAM', () => this.showStaticPage('Our Team', 'Meet the specialists driving our logistics and data engineering excellence.'));
        this.createNavItem('OUR PRODUCTS', 'OUR_PRODUCTS', () => this.showStaticPage('Our Products', 'Customized freight solutions and real-time monitoring tools.'));
        this.createNavItem('PARTNERS & AFFILIATES', 'PARTNERS', () => this.showStaticPage('Partners & Affiliates', 'Collaborating with global maritime leaders to expand our reach.'));
        this.createNavItem('ENV. COMMITMENT', 'ENV_COMMITMENT', () => this.showStaticPage('Environmental Commitment', 'Dedicated to reducing maritime carbon footprints through optimized routing.'));
        this.createNavItem('HEADQUARTERS', 'HQ', () => this.showStaticPage('Headquarters', 'Located at the heart of global trade routes.'));
    }

    createNavLabel(text) {
        const label = document.createElement('div');
        label.style = "padding: 20px 28px 10px; font-size: 0.7rem; color: #555e70; text-transform: uppercase; letter-spacing: 2px; font-weight: 800;";
        label.textContent = text;
        this.nav.appendChild(label);
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
        this.excelViewport.classList.remove('active');
        this.homeView.classList.add('active');

        if (!document.getElementById('home-content').innerHTML) {
            document.getElementById('home-content').innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                    <p style="color: var(--text-gray);">Select an analysis module from the sidebar to begin.</p>
                    <div class="welcome-grid">
                        <div class="stat-box"><small>SYSTEM STATUS</small><h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2></div>
                        <div class="stat-box"><small>MODULARS</small><h2 style="margin: 5px 0; color: var(--mi-red);">4 LOADED</h2></div>
                    </div>
                </div>`;

            document.getElementById('map-container').innerHTML = `
                <div class="hard-clip-wrapper" style="height: 800px;">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>`;
        }
    }

    showStaticPage(title, content) {
        this.updateActiveNav(null); // Clear nav active state or map to specific ID
        this.titleText.innerText = title;
        this.excelViewport.classList.remove('active');
        this.homeView.classList.add('active');
        
        document.getElementById('home-content').innerHTML = `
            <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
                <h2 style="color: var(--deep-space);">${title}</h2>
                <hr style="border: none; border-top: 2px solid var(--mi-red); width: 50px; margin: 20px 0;">
                <p style="color: var(--text-gray); line-height: 1.6; font-size: 1.1rem;">${content}</p>
            </div>`;
        document.getElementById('map-container').innerHTML = ''; // Clear map for static pages
    }

    switchExcelPage(pageId, displayTitle) {
        this.updateActiveNav(pageId);
        this.titleText.innerText = displayTitle;
        this.homeView.classList.remove('active');
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

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        if (id) {
            const activeBtn = document.querySelector(`[data-id="${id}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }
    }
}

new MILogisticsApp();
