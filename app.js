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

        this.createNavItem('ABOUT PAGE', 'ABOUT', () => this.showGenericPage('About IMI Logistics', 'International Maritime Industries (IMI) is a leader in global freight and logistics management.'));
        this.createNavItem('OUR TEAM', 'TEAM', () => this.showGenericPage('Our Team', 'Meet the experts driving IMI Logistics forward.'));
        this.createNavItem('OUR PRODUCTS', 'PRODUCTS', () => this.showGenericPage('Our Products', 'Advanced tracking and forecasting tools.'));
        this.createNavItem('OUR PARTNERS & AFFILIATES', 'PARTNERS', () => this.showGenericPage('Partners & Affiliates', 'Collaborating with global shipping lanes.'));
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
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                    <p style="color: var(--text-gray);">Live monitoring and analysis dashboard.</p>
                    <div class="welcome-grid">
                        <div class="stat-box"><small>SYSTEM STATUS</small><h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2></div>
                        <div class="stat-box"><small>MODULARS</small><h2 style="margin: 5px 0; color: var(--mi-red);">4 LOADED</h2></div>
                    </div>
                </div>

                <div class="hard-clip-wrapper" style="height: 600px;">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>
                <div class="hard-clip-wrapper" style="height: 600px;">
                    <div class="elfsight-app-${this.widgetConfig.elfsightId}" data-elfsight-app-lazy></div>
                </div>

                <div class="home-section">
                    <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px;">Our Services</h2>
                    <div class="services-grid">
                        <div class="service-box">
                            <h4>Global Bulk Raw Materials Trading</h4>
                            <p>IMI is one of the leading privately-owned, independent firms with more than 38 years of history.</p>
                            <button class="read-me-btn">Details</button>
                        </div>
                        <div class="service-box">
                            <h4>Sourcing</h4>
                            <p>Multi-year contracts for natural gypsum, bauxite, cement, iron ore, and solid fuels.</p>
                            <button class="read-me-btn">Details</button>
                        </div>
                        <div class="service-box">
                            <h4>Chartering & Logistics</h4>
                            <p>Expertise in ocean vessel chartering and management of 50+ global stock-and-sell centers.</p>
                            <button class="read-me-btn">Details</button>
                        </div>
                    </div>
                </div>

                <div class="home-section">
                    <div class="env-container">
                        <div class="env-header-line"></div>
                        <h1 class="env-title">Environmental Stewardship</h1>
                        <ul class="commitment-list">
                            <li class="commitment-item">
                                <div class="red-bullet"></div>
                                <div class="commitment-text">Responsible sourcing from producers who engage in sustainable mining processes.</div>
                            </li>
                            <li class="commitment-item">
                                <div class="red-bullet"></div>
                                <div class="commitment-text">Commitment to future generations by preserving resources and reducing ecological disruption.</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="home-section" style="margin-bottom: 40px;">
                    <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Global Headquarters</h2>
                    <div class="hq-container">
                        <div class="hq-grid">
                            <div class="hq-box">
                                <h4>Florida | USA</h4>
                                <p>54 SE 5th Avenue, Suite 300<br>Delray Beach, FL 33483</p>
                                <p><span class="hq-label">Phone</span><a href="tel:+15617050350">+1-561-705-0350</a></p>
                            </div>
                            <div class="hq-box">
                                <h4>Dubai | UAE</h4>
                                <p>One Za’abeel, Za’abeel Palace St, Dubai, U.A.E</p>
                                <p><span class="hq-label">Phone</span><a href="tel:+97147760100">+971-4-776-0100</a></p>
                            </div>
                            <div class="hq-box">
                                <h4>London | UK</h4>
                                <p>Office 102, 81 Fulham Road, London SW3 6RD</p>
                                <p><span class="hq-label">Phone</span><a href="tel:+442038260003">+44 20 3826 0003</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
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
            newFrame.style.width = "100%";
            newFrame.style.height = "850px";
            newFrame.style.border = "none";
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
        this.genericContent.innerHTML = `<h2 style="color: var(--mi-red); border-bottom: 2px solid var(--off-white); padding-bottom: 10px;">${title}</h2><p style="color: var(--deep-space); line-height: 1.6;">${description}</p>`;
    }

    hideAllViews() {
        this.homeView.classList.remove('active');
        this.excelViewport.classList.remove('active');
        this.genericView.classList.remove('active');
    }

    getNavIdByTitle(title) {
        const mapping = {
            'About IMI Logistics': 'ABOUT',
            'Our Team': 'TEAM',
            'Our Products': 'PRODUCTS',
            'Partners & Affiliates': 'PARTNERS'
        };
        return mapping[title] || '';
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
