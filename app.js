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
        this.genericView = document.getElementById('generic-view');
        this.genericContent = document.getElementById('generic-content');
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
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.createNavItem('DATA VISUALIZATION', 'DATA_VISUALIZATION', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        this.createNavItem('FORECASTING TIME SERIES MODELS', 'ROTTERDAM_EXP_SMOOTH', () => this.switchExcelPage('ROTTERDAM_EXP_SMOOTH', 'Forecasting Time Series Models'));
        this.createNavItem('BRENT CRUDE OIL', 'BRENT_CRUDE_OIL', () => this.switchExcelPage('BRENT_CRUDE_OIL', 'Brent Crude Oil Stat Sign'));
        this.createNavItem('ROTTERDAM STAT', 'ROTTERDAM_STAT', () => this.switchExcelPage('ROTTERDAM_STAT', 'Rotterdam Stat Sign'));

        this.createNavItem('ABOUT PAGE', 'ABOUT', () => this.showGenericPage('About IMI Logistics', 'International Maritime Industries (IMI) is a leader in global freight and logistics.'));
        this.createNavItem('OUR TEAM', 'TEAM', () => this.showGenericPage('Our Team', 'Meet the experts driving IMI Logistics forward.'));
        this.createNavItem('OUR PRODUCTS', 'PRODUCTS', () => this.showGenericPage('Our Products', 'Advanced tracking and forecasting tools.'));
        this.createNavItem('OUR PARTNERS & AFFILIATES', 'PARTNERS', () => this.showGenericPage('Partners & Affiliates', 'Collaborating with global shipping lanes.'));
        this.createNavItem('OUR ENVIRONMENTAL COMMITMENT', 'ENV_COMMIT', () => this.showEnvironmentalPage());
        this.createNavItem('OUR SERVICES', 'SERVICES', () => this.showServicesPage());
        this.createNavItem('HEADQUARTERS', 'HQ', () => this.showHQPage());
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

    showHQPage() {
        this.updateActiveNav('HQ');
        this.titleText.innerText = "Global Headquarters";
        this.hideAllViews();
        this.genericView.classList.add('active');
        
        this.genericContent.innerHTML = `
            <div class="hq-container">
                <div class="hq-sidebar-logo">
                    <div style="font-weight: 900; font-size: 1.5rem; color: var(--mi-red); text-align: center;">III</div>
                    <div style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.7rem; margin-top: 10px;">International Materials</div>
                </div>
                <div class="hq-grid">
                    <div class="office-card">
                        <h4>Florida | USA</h4>
                        <p>54 SE 5th Avenue, Suite 300</p>
                        <p>Delray Beach, FL 33483</p>
                        <p><span class="label-red">TOLL FREE</span> +1-877-423-0226</p>
                        <p><span class="label-red">PHONE</span> +1-561-705-0350</p>
                        <p><span class="label-red">FAX</span> +1-561-391-0546</p>
                        <p>operations.amer@imigroup.com</p>
                        <a href="#" class="contact-link">Map & Directions</a>
                    </div>
                    <div class="office-card">
                        <h4>Belo Horizonte | Brazil</h4>
                        <p>IMI Brasil Trading Ltda</p>
                        <p>Rua Antônio de Albuquerque, 194/sl. 902</p>
                        <p>Savassi – Belo Horizonte, MG</p>
                        <p><span class="label-red">PHONE</span> +55 (31) 99182-8338</p>
                        <p>operations.latam@imigroup.com</p>
                    </div>
                    <div class="office-card">
                        <h4>Dubai | UAE</h4>
                        <p>IMI Middle East Trading L.L.C.</p>
                        <p>Offices 801 & 802, Tower A, One Za’abeel</p>
                        <p><span class="label-red">PHONE</span> +971-4-776-0100</p>
                        <p>operations.asia@imigroup.com</p>
                        <a href="#" class="contact-link">Map & Directions</a>
                    </div>
                    <div class="office-card">
                        <h4>Madrid | Spain</h4>
                        <p>IMI Europe, SLU</p>
                        <p>Calle Velázquez 123. 2º PL</p>
                        <p><span class="label-red">PHONE</span> +34-915-64-1045</p>
                        <p>operations.eur@imigroup.com</p>
                        <a href="#" class="contact-link">Map & Directions</a>
                    </div>
                    <div class="office-card">
                        <h4>Singapore</h4>
                        <p>IMI Trading Singapore Pte Ltd</p>
                        <p>1 George Street #23-04</p>
                        <p><span class="label-red">PHONE</span> +65-6303-5680</p>
                        <p>operations.asia@imigroup.com</p>
                        <a href="#" class="contact-link">Map & Directions</a>
                    </div>
                    <div class="office-card">
                        <h4>London | UK</h4>
                        <p>International Materials UK Ltd</p>
                        <p>81 Fulham Road, Office 102</p>
                        <p><span class="label-red">PHONE</span> +44 20 3826 0003</p>
                        <p>operations.eur@imigroup.com</p>
                        <a href="#" class="contact-link">Map & Directions</a>
                    </div>
                </div>
            </div>
        `;
    }

    showEnvironmentalPage() {
        this.updateActiveNav('ENV_COMMIT');
        this.titleText.innerText = "Environmental Commitment";
        this.hideAllViews();
        this.genericView.classList.add('active');
        this.genericContent.innerHTML = `
            <div class="env-container">
                <div class="env-header-line"></div>
                <h1 style="text-transform: uppercase;">Our Environmental Commitment</h1>
                <div class="commitment-item"><div class="red-bullet"></div><p>We work toward sourcing raw materials from producers with responsible mining processes.</p></div>
                <div class="commitment-item"><div class="red-bullet"></div><p>We aim to support efforts that contribute to more sustainable resource management.</p></div>
            </div>`;
    }

    showServicesPage() {
        this.updateActiveNav('SERVICES');
        this.titleText.innerText = "Our Services";
        this.hideAllViews();
        this.genericView.classList.add('active');
        this.genericContent.innerHTML = `
            <div class="services-grid">
                <div class="service-box"><h4>Global Trading</h4><p>Independent, bulk raw materials trading firm.</p><button class="read-me-btn">Read Me</button></div>
                <div class="service-box"><h4>Sourcing</h4><p>Multi-year contracts with global suppliers.</p><button class="read-me-btn">Read Me</button></div>
            </div>`;
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        this.hideAllViews();
        this.homeView.classList.add('active');
        if (!document.getElementById('home-content').innerHTML) {
            document.getElementById('home-content').innerHTML = `<h1 style="text-align: center;">Welcome to IMI Logistics</h1>`;
            document.getElementById('map-container').innerHTML = `<iframe style="width:100%; height:800px; border:none;" src="${this.widgetConfig.shipXplorer}"></iframe>`;
        }
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
            newFrame.style.width = "100%"; newFrame.style.height = "850px"; newFrame.style.border = "none";
            newFrame.src = this.analysisPages[pageId];
            newFrame.onload = () => { this.loader.style.display = 'none'; };
            this.iframeContainer.appendChild(newFrame);
            this.iframeCache[pageId] = newFrame;
        }
    }

    showGenericPage(title, description) {
        this.updateActiveNav(this.getNavIdByTitle(title));
        this.titleText.innerText = title;
        this.hideAllViews();
        this.genericView.classList.add('active');
        this.genericContent.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
    }

    hideAllViews() {
        this.homeView.classList.remove('active');
        this.excelViewport.classList.remove('active');
        this.genericView.classList.remove('active');
    }

    getNavIdByTitle(title) {
        const mapping = { 'About IMI Logistics': 'ABOUT', 'Our Team': 'TEAM', 'Our Products': 'PRODUCTS', 'Partners & Affiliates': 'PARTNERS' };
        return mapping[title] || '';
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
