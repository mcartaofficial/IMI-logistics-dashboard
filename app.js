class MILogisticsApp {
    constructor() {
        // --- DIMENSION ADJUSTMENTS ---
        this.widgetConfig = {
            shipXplorer: {
                width: "100%",
                height: "800px" 
            },
            elfsight: {
                width: "100%",
                height: "850px" 
            }
        };

        // Define the multiple Excel pages
        this.excelPages = {
            "PORT_ROUTES": {
                title: "Port Routes",
                src: "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={2ad6d295-9173-46a3-8886-54f0efa6cc42}&action=embedview&AllowTyping=True&ActiveCell='Port%20Routes'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True"
            },
            "WHAT_IF_INPUTS": {
                title: "What If Inputs",
                src: "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={674aec4a-2ec5-4068-95af-af55c4818fd4}&action=embedview&AllowTyping=True&ActiveCell='What_If_Inputs'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True"
            },
            "BRENT_CRUDE_OIL": {
                title: "Brent Crude Oil Stat. Sign.",
                src: "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f5bcbb70-554b-4e08-9f3d-bc8ec9668941}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Crude%20Oil%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True"
            },
            "ROTTERDAM_STAT": {
                title: "Rotterdam Stat. Sign.",
                src: "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={fc00bff8-29ee-4a6c-b472-ef0fd72dfd47}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True"
            }
        };

        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.tableOutput = document.getElementById('table-output');
        this.mapContainer = document.getElementById('map-container');
        this.titleText = document.getElementById('current-sheet-title');
        
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
        
        // Dashboard Home Button
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-item';
        homeBtn.textContent = `DASHBOARD HOME`; 
        homeBtn.onclick = () => {
            this.showHomePage();
            this.sidebar.classList.add('collapsed');
        };
        homeBtn.setAttribute('data-id', 'HOME_PAGE');
        this.nav.appendChild(homeBtn);

        // Add dynamically generated Excel page buttons
        Object.keys(this.excelPages).forEach(key => {
            const page = this.excelPages[key];
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.textContent = page.title.toUpperCase();
            btn.onclick = () => {
                this.switchExcelPage(key);
                this.sidebar.classList.add('collapsed');
            };
            btn.setAttribute('data-id', key);
            this.nav.appendChild(btn);
        });
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                <p style="color: var(--text-gray);">Select a module from the sidebar to view detailed analytics.</p>
                <div class="welcome-grid">
                    <div class="stat-box"><small>SYSTEM STATUS</small><h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2></div>
                    <div class="stat-box"><small>DATA SOURCE</small><h2 style="margin: 5px 0; color: var(--mi-red);">LIVE CONNECT</h2></div>
                </div>
            </div>
        `;

        this.mapContainer.innerHTML = `
            <div style="margin-bottom: 35px; border-bottom: 2px solid var(--off-white); padding-bottom: 30px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">🚢 REAL-TIME VESSEL TRACKER</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.shipXplorer.width}; height: ${this.widgetConfig.shipXplorer.height};">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;"
                        src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN">
                    </iframe>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">📍 FLEET & STORE LOCATOR</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.elfsight.width}; height: ${this.widgetConfig.elfsight.height};">
                    <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
                </div>
            </div>
        `;
    }

    switchExcelPage(pageKey) {
        const page = this.excelPages[pageKey];
        if (!page) return;

        this.updateActiveNav(pageKey);
        this.titleText.innerText = page.title;
        this.mapContainer.innerHTML = '';
        this.tableOutput.innerHTML = `
            <div style="margin-bottom: 20px;">
                <iframe 
                    width="100%" 
                    height="800px" 
                    frameborder="0" 
                    scrolling="no" 
                    src="${page.src}">
                </iframe>
            </div>
        `;
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
