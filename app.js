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
        // -----------------------------

        this.workbookData = {};
        this.fileNames = [];
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.tableOutput = document.getElementById('table-output');
        this.mapContainer = document.getElementById('map-container');
        this.titleText = document.getElementById('current-sheet-title');
        
        this.init();
    }

    init() {
        // Sidebar Toggle
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });

        // Initialize production dashboard
        this.buildSidebar();
        
        // Ensure sidebar starts collapsed for mobile/clean view
        this.sidebar.classList.add('collapsed');
        
        // LANDING PAGE LOGIC: Set to Home Page on refresh
        this.showHomePage();
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        
        // Dashboard Home Button
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-item';
        homeBtn.innerHTML = `<span>🏠</span> DASHBOARD HOME`;
        homeBtn.onclick = () => {
            this.showHomePage();
            this.sidebar.classList.add('collapsed');
        };
        homeBtn.setAttribute('data-id', 'HOME_PAGE');
        this.nav.appendChild(homeBtn);

        // "What-If" Analysis Page Button
        const excelBtn = document.createElement('button');
        excelBtn.className = 'nav-item';
        excelBtn.innerHTML = `<span>📊</span> IMI WHAT-IF ANALYSIS`;
        excelBtn.onclick = () => {
            this.switchPage("LP_Enhanced_IMI_WhatIf");
            this.sidebar.classList.add('collapsed');
        };
        excelBtn.setAttribute('data-id', 'LP_Enhanced_IMI_WhatIf');
        this.nav.appendChild(excelBtn);
    }

    showHomePage() {
        this.updateActiveNav('HOME_PAGE');
        this.titleText.innerText = "Dashboard Overview";
        this.tableOutput.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: var(--deep-space); margin-bottom: 10px;">Welcome to IMI Logistics</h1>
                <p style="color: var(--text-gray);">Navigate via the sidebar to access live tracking and What-If modeling.</p>
                <div class="welcome-grid">
                    <div class="stat-box"><small>SYSTEM STATUS</small><h2 style="margin: 5px 0; color: #10B981;">ACTIVE</h2></div>
                    <div class="stat-box"><small>LIVE DATA</small><h2 style="margin: 5px 0; color: var(--mi-red);">CONNECTED</h2></div>
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

    switchPage(pageId) {
        this.updateActiveNav(pageId);
        this.mapContainer.innerHTML = '';
        
        if (pageId === "LP_Enhanced_IMI_WhatIf") {
            this.titleText.innerText = "LP Enhanced IMI What-If Analysis";
            this.tableOutput.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <iframe 
                        width="100%" 
                        height="800px" 
                        frameborder="0" 
                        scrolling="no" 
                        src="https://fau-my.sharepoint.com/personal/hardyj2025_fau_edu/_layouts/15/Doc.aspx?sourcedoc={546c8dd2-3f61-4d74-86f7-3da881b4eece}&action=embedview&AllowTyping=True&ActiveCell='Port%20Routes'!A1&wdDownloadButton=True&wdInConfigurator=True">
                    </iframe>
                </div>
            `;
        }
    }

    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

new MILogisticsApp();
