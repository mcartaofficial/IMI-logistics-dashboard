class MILogisticsApp {
    constructor() {
        this.widgetConfig = {
            shipXplorer: "https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN"
        };

        this.analysisPages = {
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={29075b82-afbd-486b-950f-0cd95dc6e491}&action=embedview&AllowTyping=True&ActiveCell='EDF%202018%20Summary'!D2&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            "ROTTERDAM_EXP_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={20d1f016-82b3-467b-94ed-1bd03c0b7c1f}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
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
        this.renderRelocatedSections();
        this.showHomePage();
    }

    renderRelocatedSections() {
        document.getElementById('services-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Our Services</h2>
            <div class="services-grid">
                <div class="service-box">
                    <h4>Global Bulk Raw Materials Trading</h4>
                    <p>IMI is one of the leading privately-owned, independent, bulk raw materials trading firms in the world today. With more than 38 years of history, IMI has established a reputation for exceptional service and high quality product offerings. Our experienced and diversified trading department is dedicated to professional, personal service and is committed to delivering products on time to suit the technical / material requirements of our customers.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Sourcing</h4>
                    <p>IMI holds multi-year contracts and marketing rights with suppliers for many products including natural gypsum from Oman, Spain and Mexico; bauxite from Australia and Turkey; cement and clinker from Europe, Latin America and Asia; iron ore-related products from Trinidad, USA, Egypt, Persian Gulf and South America; and solid fuels (coal, petcoke, anthracite) from South America, USA, South Africa and Asia.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Chartering</h4>
                    <p>Through our in-house Chartering and Traffic operations departments, IMI has a first class reputation as a reliable expert in ocean vessel chartering, import/export operations, ship loading and discharge operations, and logistics planning and management for the cement, wallboard and steel making industries.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Logistics</h4>
                    <p>IMI manages +50 global stock-and-sell centers for coal, gypsum, bauxite, slag, iron ore products and clinker. IMI negotiates and manages port leases and offsite stockpiles to support door-to-door deliveries. IMI manages numerous stevedoring operations to ensure safe and fast cargo handling.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Marketing</h4>
                    <p>In addition to its normal trading activities, IMI has secured exclusive marketing rights for Gypsum in South Spain from Saint-Gobain and Gypsum in Mexico from COMSA.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Service and Support</h4>
                    <p>IMI’s technical and trade support capabilities are unmatched in the industry and the “high-touch” approach ensures accurate, on-time delivery of product. IMI has the ability to provide custom financing solutions to suppliers and customers.</p>
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
                        <div class="commitment-text">We work toward sourcing our raw materials from producers who engage in responsible mining processes. This includes implementing measures to reduce ecological disruption and enhancing resource efficiency.</div>
                    </li>
                    <li class="commitment-item">
                        <div class="red-bullet"></div>
                        <div class="commitment-text">By selecting suppliers dedicated to these principles, we aim to support efforts that contribute to more sustainable resource management within the industry.</div>
                    </li>
                    <li class="commitment-item">
                        <div class="red-bullet"></div>
                        <div class="commitment-text">Our environmental stewardship is not just a present concern but a commitment to future generations. We are attentive to preserving and enhancing the resources and environments we rely on today for those who will come after us.</div>
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
                        <p><span class="hq-label">Toll Free</span><a href="tel:+18774230226">+1-877-423-0226</a></p>
                        <p><span class="hq-label">Phone</span><a href="tel:+15617050350">+1-561-705-0350</a></p>
                        <p><span class="hq-label">Fax</span><a href="fax:+15613910546">+1-561-391-0546</a></p>
                        <p><a href="mailto:operations.amer@imigroup.com">operations.amer@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Belo Horizonte | Brazil</h4>
                        <p>IMI Brasil Trading Ltda<br>Rua Antônio de Albuquerque, 194/sl. 902<br>Savassi – Belo Horizonte, MG, BRAZIL</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+5531991828338">+55 (31) 99182-8338</a></p>
                        <p><a href="mailto:operations.latam@imigroup.com">operations.latam@imigroup.com</a></p>
                    </div>
                    <div class="hq-box">
                        <h4>Dubai | UAE</h4>
                        <p>IMI Middle East Trading L.L.C.<br>Offices 801 & 802, Tower A, The Offices, One Za’abeel, Za’abeel Palace St, Dubai, U.A.E</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+97147760100">+971-4-776-0100</a></p>
                        <p><a href="mailto:operations.asia@imigroup.com">operations.asia@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Madrid | Spain</h4>
                        <p>IMI Europe, SLU<br>Calle Velázquez 123. 2º PL, 28006 Madrid, Spain</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+34915641045">+34-915-64-1045</a></p>
                        <p><a href="mailto:operations.eur@imigroup.com">operations.eur@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Shanghai | China</h4>
                        <p>Shanghai Representative Office, Suite 306B, Skybridge Plaza, Jinzhong Road 968#, Changning, Shanghai, China</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+8618217739459">+86-182-1773-9459</a></p>
                        <p><a href="mailto:operations.asia@imigroup.com">operations.asia@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Singapore</h4>
                        <p>IMI Trading Singapore Pte Ltd<br>1 George Street, #23-04, Singapore 049145</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+6563035680">+65-6303-5680</a></p>
                        <p><span class="hq-label">Fax</span><a href="fax:+6563035681">+65-6303-5681</a></p>
                        <p><a href="mailto:operations.asia@imigroup.com">operations.asia@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Mexico City | Mexico</h4>
                        <p>Avenida Paseo de la Reforma Número 404, Piso 13, Interior 102. Colonia Juárez, Mexico City, 06600</p>
                        <p><a href="mailto:operations.latam@imigroup.com">operations.latam@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Bogotá | Colombia</h4>
                        <p>Calle 97A, #8-10, Oficina 503, Bogotá 110221</p>
                        <p><a href="mailto:imicol@imigroup.com">imicol@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>Johannesburg | South Africa</h4>
                        <p>Workshop 17 The Bank, Corner Tyrwhitt Road and 24 Cradock Ave, Johannesburg, 2196</p>
                        <p><a href="mailto:operations.asia@imigroup.com">operations.asia@imigroup.com</a></p>
                    </div>
                    <div class="hq-box">
                        <h4>Istanbul | Turkey</h4>
                        <p>Kampanaki Mansion, Köybaşı Cad. No:63, Yeniköy 34464 Sarıyer, Istanbul, Turkey</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+902122625151">+90 212 262 51 51</a></p>
                        <p><a href="mailto:operations.eur@imigroup.com">operations.eur@imigroup.com</a></p>
                        <a href="#" class="hq-link">Map & Directions</a>
                    </div>
                    <div class="hq-box">
                        <h4>London | UK</h4>
                        <p>International Materials UK Ltd, Office 102, 81 Fulham Road, London SW3 6RD, UK</p>
                        <p><span class="hq-label">Phone</span><a href="tel:+442038260003">+44 20 3826 0003</a></p>
                        <p><a href="mailto:operations.eur@imigroup.com">operations.eur@imigroup.com</a></p>
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
        this.createNavItem('FORECASTING TIME SERIES MODELS', 'ROTTERDAM_EXP_SMOOTH', () => this.switchExcelPage('ROTTERDAM_EXP_SMOOTH', 'Forecasting Time Series Models'));
        this.createNavItem('BRENT CRUDE OIL', 'BRENT_CRUDE_OIL', () => this.switchExcelPage('BRENT_CRUDE_OIL', 'Brent Crude Oil Stat Sign'));
        this.createNavItem('ROTTERDAM STAT', 'ROTTERDAM_STAT', () => this.switchExcelPage('ROTTERDAM_STAT', 'Rotterdam Stat Sign'));

        this.createNavItem('ABOUT PAGE', 'ABOUT', () => this.showGenericPage('About IMI Logistics', ''));
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
        
        if (title === 'About IMI Logistics') {
            this.genericContent.innerHTML = `
                <div class="metrics-row">
                    <div class="metric-item"><span class="metric-value">45M MT</span><span class="metric-label">Total Volume</span></div>
                    <div class="metric-item"><span class="metric-value">+1000</span><span class="metric-label">Shipments</span></div>
                    <div class="metric-item"><span class="metric-value">+$4 Billion</span><span class="metric-label">Turnover</span></div>
                    <div class="metric-item"><span class="metric-value">+170</span><span class="metric-label">Global Employees</span></div>
                </div>
                <div class="about-content-grid">
                    <div class="about-tagline">
                        Providing value-added solutions to the global <span>cement, steel, wallboard</span> and <span>energy</span> industries for over 38 years.
                    </div>
                    <div class="about-description">
                        <p>Since 1987, the worldwide cement, wallboard, and steel industries have come to depend on IMI to deliver unparalleled expertise to meet their raw material needs. Our commitment to service excellence has allowed us to build a large portfolio of reliable, first-class suppliers, ship operators, and customers.</p>
                        <p>Today, IMI sources or ships to over 80 countries worldwide. Along with our partners and affiliates, we deliver over 38 million tons of bulk materials annually, providing creative and economical real-time solutions to any logistical challenge our customers may face. Our products include natural gypsum, bauxite, iron ore and iron fines, cement, clinker, coal, petcoke, slag, and copper concentrates.</p>
                    </div>
                </div>`;
        } else {
            this.genericContent.innerHTML = `<h2 style="color: var(--mi-red); border-bottom: 2px solid var(--off-white); padding-bottom: 10px;">${title}</h2><p style="color: var(--deep-space); line-height: 1.6;">${description}</p>`;
        }
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
