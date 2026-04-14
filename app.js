class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: { width: "100%", height: "800px" },
            elfsight: { width: "100%", height: "850px" }
        };

        // Define the sheet names available in your Excel file
        this.availableSheets = [
            "Port Routes",
            "Fleet Status",
            "Inventory",
            "Schedules"
        ];

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
        
        // Initial load on the first sheet
        this.switchTab(this.availableSheets[0]);
        this.renderWidgets();
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        
        this.availableSheets.forEach(sheetName => {
            const btn = document.createElement('button');
            btn.className = 'nav-item';
            btn.innerHTML = `<span>📑</span> ${sheetName.toUpperCase()}`;
            btn.onclick = () => {
                this.switchTab(sheetName);
                this.sidebar.classList.add('collapsed');
            };
            btn.setAttribute('data-id', sheetName);
            this.nav.appendChild(btn);
        });
    }

    switchTab(sheetName) {
        this.updateActiveNav(sheetName);
        this.titleText.innerText = sheetName;
        
        // Construct URI-encoded sheet name for the SharePoint iframe
        const encodedSheet = encodeURIComponent(sheetName);
        
        this.tableOutput.innerHTML = `
            <div style="margin-bottom: 20px;">
                <iframe 
                    width="100%" 
                    height="800px" 
                    frameborder="0" 
                    scrolling="no" 
                    src="https://fau-my.sharepoint.com/personal/hardyj2025_fau_edu/_layouts/15/Doc.aspx?sourcedoc={546c8dd2-3f61-4d74-86f7-3da881b4eece}&action=embedview&AllowTyping=True&ActiveCell='${encodedSheet}'!A1&wdDownloadButton=True&wdInConfigurator=True">
                </iframe>
            </div>
        `;
    }

    renderWidgets() {
        this.mapContainer.innerHTML = `
            <div style="margin-bottom: 35px; border-bottom: 2px solid var(--off-white); padding-bottom: 30px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">🚢 REAL-TIME VESSEL TRACKER</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.shipXplorer.width}; height: ${this.widgetConfig.shipXplorer.height};">
                    <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
                        style="width: 100%; height: 100%; border: none; overflow: hidden;"
                        src="https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN">
                    </iframe>
                </div>
            </div>

            <div style="margin-top: 20px;">
                <div style="margin-bottom: 15px; font-weight: 700; color: var(--deep-space); text-transform: uppercase;">🗺️ FLEET & STORE LOCATOR</div>
                <div class="hard-clip-wrapper" style="width: ${this.widgetConfig.elfsight.width}; height: ${this.widgetConfig.elfsight.height};">
                    <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
                </div>
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
