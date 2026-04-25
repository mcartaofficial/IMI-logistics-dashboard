// Define a master blueprint for how the IMI Logistics application should behave
class MILogisticsApp {
    constructor() {
        // A list of web addresses for external tools, like the ship tracking map
        this.widgetConfig = {
            shipXplorer: "https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN"
        };

        // A library of links to specific Excel reports stored on SharePoint
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

        // This block contains the text and icons for the "About" section on the home page
        this.aboutContentHtml = `
            <div class="img-about-header">
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/package.svg" alt="Volume"/></div>
                    <div class="img-about-data">
                        <div class="img-about-val">45M MT</div>
                        <div class="img-about-label">Total Volume</div>
                    </div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/anchor.svg" alt="Shipments"/></div>
                    <div class="img-about-data">
                        <div class="img-about-val">+1000</div>
                        <div class="img-about-label">Shipments</div>
                    </div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/trending-up.svg" alt="Turnover"/></div>
                    <div class="img-about-data">
                        <div class="img-about-val">+$4 Billion</div>
                        <div class="img-about-label">Turnover</div>
                    </div>
                </div>
                <div class="img-about-card">
                    <div class="img-about-icon"><img src="https://unpkg.com/feather-icons/dist/icons/users.svg" alt="Employees"/></div>
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
                    <p>Today, IMI sources or ships to over 80 countries worldwide. Along with our partners and affiliates, we deliver over 38 million tons of bulk materials annually, providing creative and economical real-time solutions to any logistical challenge our customers may face. Our products include natural gypsum, bauxite, iron ore and iron fines, cement, clinker, coal, petcoke, slag, and copper concentrates.</p>
                </div>
            </div>
        `;

        // A storage container to keep reports open in the background so they don't have to reload
        this.iframeCache = {};
        // Connecting the code to specific parts of the HTML screen (sidebar, buttons, etc.)
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
        
        // A list to track files that the user uploads themselves
        this.viewFiles = { excel: [], generic: [] };

        // Start the application process
        this.init();
    }

    // This runs as soon as the app starts
    init() {
        // Listen for clicks on the menu button to hide or show the sidebar
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });

        // Create the sidebar menu items
        this.buildSidebar();
        // Start with the sidebar hidden
        this.sidebar.classList.add('collapsed');
        // Fill the page with the Services and Office Location information
        this.renderRelocatedSections();
        // Load the main home screen
        this.showHomePage();
    }

    // Injects detailed text about the company's services and global offices into the page
    renderRelocatedSections() {
        // Fill the 'Our Services' section with text descriptions
        document.getElementById('services-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Our Services</h2>
            <div class="services-grid">
                <div class="service-box">
                    <h4>Global Bulk Raw Materials Trading</h4>
                    <p>IMI is one of the leading privately-owned, independent, bulk raw materials trading firms in the world today. With more than 38 years of history, IMI has established a reputation for exceptional service and high quality product offerings.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Sourcing</h4>
                    <p>IMI holds multi-year contracts and marketing rights with suppliers for many products including natural gypsum from Oman, Spain and Mexico; bauxite from Australia and Turkey; cement and clinker from Europe, Latin America and Asia; iron ore-related products from Trinidad, USA, Egypt, Persian Gulf and South America; and solid fuels from South America, USA, South Africa and Asia.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Chartering</h4>
                    <p>Through our in-house Chartering and Traffic operations departments, IMI has a first class reputation as a reliable expert in ocean vessel chartering, import/export operations, ship loading and discharge operations, and logistics planning and management.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Logistics</h4>
                    <p>IMI manages +50 global stock-and-sell centers for coal, gypsum, bauxite, slag, iron ore products and clinker. IMI negotiates and manages port leases and offsite stockpiles to support door-to-door deliveries.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Marketing</h4>
                    <p>In addition to its normal trading activities, IMI has secured exclusive marketing rights for Gypsum in South Spain from Saint-Gobain and Gypsum in Mexico from COMSA.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
                <div class="service-box">
                    <h4>Service and Support</h4>
                    <p>IMI’s technical and trade support capabilities are unmatched in the industry and the “high-touch” approach ensures accurate, on-time delivery of product.</p>
                    <button class="read-me-btn">Read Me</button>
                </div>
            </div>
        `;

        // Fill the 'Environmental Commitment' section
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
                        <div class="commitment-text">Our environmental stewardship is not just a present concern but a commitment to future generations.</div>
                    </li>
                </ul>
            </div>
        `;

        // Fill the 'Headquarters' section with contact details for all global offices
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
                        <span class="hq-label">Fax</span><a href="fax:+6563035681">+65-6303-5681</a></p>
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
    
    // Creates the clickable buttons in the sidebar
    buildSidebar() {
        // Clear anything already there
        this.nav.innerHTML = '';
        // Add each button one by one, telling the computer what to do when they are clicked
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        this.createNavItem('DATA VISUALIZATION', 'DATA_VISUALIZATION', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        this.createNavItem('ROTTERDAM EXPONENTIAL SMOOTHING', 'ROTTERDAM_EXPONENTIAL_SMOOTH', () => this.switchExcelPage('ROTTERDAM_EXPONENTIAL_SMOOTH', 'Rotterdam Exponential Smoothing'));
        this.createNavItem('ROTTERDAM TRENDED EXPONENTIAL SMOOTHING', 'ROTTERDAM_TRENDED_SMOOTH', () => this.switchExcelPage('ROTTERDAM_TRENDED_SMOOTH', 'Rotterdam Trended Exponential Smoothing'));
        this.createNavItem('ROTTERDAM ARIMA', 'ROTTERDAM_ARIMA', () => this.switchExcelPage('ROTTERDAM_ARIMA', 'Rotterdam ARIMA'));
        this.createNavItem('BRENT EXPONENTIAL SMOOTHING', 'BRENT_EXPONENTIAL_SMOOTHING', () => this.switchExcelPage('BRENT_EXPONENTIAL_SMOOTHING', 'Brent Exponential Smoothing'));
        this.createNavItem('BRENT TRENDED SMOOTH', 'BRENT_TRENDED_SMOOTH', () => this.switchExcelPage('BRENT_TRENDED_SMOOTH', 'Brent Trended Exponential Smoothing'));
        this.createNavItem('BRENT ARIMA', 'BRENT_ARIMA', () => this.switchExcelPage('BRENT_ARIMA', 'Brent ARIMA'));
        this.createNavItem('ROTTERDAM STAT', 'ROTTERDAM_STAT', () => this.switchExcelPage('ROTTERDAM_STAT', 'Rotterdam Stat Sign'));
        this.createNavItem('BRENT CRUDE OIL', 'BRENT_CRUDE_OIL', () => this.switchExcelPage('BRENT_CRUDE_OIL', 'Brent Crude Oil Stat Sign'));
    }

    // Helper function to create a single button for the sidebar
    createNavItem(text, id, callback) {
        const btn = document.createElement('button'); // Create the button
        btn.className = 'nav-item'; // Style it
        btn.textContent = text; // Give it a label
        btn.onclick = () => {
            callback(); // Run the assigned action when clicked
            this.sidebar.classList.add('collapsed'); // Hide the menu after selection
        };
        btn.setAttribute('data-id', id); // Give it a hidden ID for tracking
        this.nav.appendChild(btn); // Add it to the sidebar
    }

    // Connects to an external forecasting service to show data widgets
    renderEmbeddableWidget() {
        const container = document.getElementById('widget-mount-point');
        // Stop if the container doesn't exist or already has content
        if (!container || container.children.length > 0) return;

        // Create the specialized code required by the widget provider
        const widgetDiv = document.createElement('div');
        widgetDiv.className = "embeddable-eicHZF6jsR";
        widgetDiv.setAttribute('data-version', 'dev');
        widgetDiv.setAttribute('data-ignore-cache', 'true');
        widgetDiv.setAttribute('data-loader', 'false');
        widgetDiv.setAttribute('data-lazy-load', 'false');

        // Load the external script that actually runs the widget
        const script = document.createElement('script');
        script.src = "https://widgets.embeddable.co/sdk/latest/embeddable.js";
        script.async = true;

        // Attach them to the page
        container.appendChild(widgetDiv);
        container.appendChild(script);
    }

    // Logic to show the main "Home" dashboard
    showHomePage() {
        this.updateActiveNav('HOME_PAGE'); // Highlight "Home" in the menu
        this.titleText.innerText = "Dashboard Overview"; // Change the page title
        this.hideAllViews(); // Hide all other pages
        this.homeView.classList.add('active'); // Show the home page
        
        // If the home page content hasn't been built yet, build it now
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
            
            // Insert the ship tracking map
            document.getElementById('map-container').innerHTML = `
                <div class="hard-clip-wrapper" style="height: 800px;">
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>`;

            // Load the forecasting widget
            this.renderEmbeddableWidget();

            // Load the store/office locator tool
            document.getElementById('store-locator-container').innerHTML = `
                <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
            `;
        }
    }

    // Logic to switch between different Excel data sheets
    switchExcelPage(pageId, displayTitle) {
        this.updateActiveNav(pageId); // Highlight the selected item in the menu
        this.titleText.innerText = displayTitle; // Set the header text
        this.hideAllViews(); // Hide other screens
        this.excelViewport.classList.add('active'); // Show the Excel viewer screen
        
        // Hide any previously loaded reports that might be sitting in the background
        Object.values(this.iframeCache).forEach(frame => frame.style.display = 'none');
        
        // If this specific report was opened before, just show it again
        if (this.iframeCache[pageId]) {
            this.iframeCache[pageId].style.display = 'block';
        } else {
            // Otherwise, create a new frame to load the report from SharePoint
            this.loader.style.display = 'block'; // Show a loading message
            const newFrame = document.createElement('iframe');
            newFrame.style.width = "100%";
            newFrame.style.height = "850px";
            newFrame.style.border = "none";
            newFrame.src = this.analysisPages[pageId]; // Link to the specific report
            newFrame.onload = () => { this.loader.style.display = 'none'; }; // Hide loading message when finished
            this.iframeContainer.appendChild(newFrame); // Add the report to the page
            this.iframeCache[pageId] = newFrame; // Save it so we don't have to load it again later
        }
        // Show the upload box at the bottom so users can upload their own files too
        this.renderMultiUploader('excel-upload-container', 'excel');
    }

    // Shows a standard page with a title and a block of text
    showGenericPage(title, description) {
        this.updateActiveNav(this.getNavIdByTitle(title));
        this.titleText.innerText = title;
        this.hideAllViews();
        this.genericView.classList.add('active');

        // Check if it's the "About" page specifically to use the special formatting
        if(title === 'About IMI Logistics') {
            this.genericContent.innerHTML = this.aboutContentHtml;
        } else {
            // Otherwise, just show the title and description text
            this.genericContent.innerHTML = `<h2 style="color: var(--mi-red); border-bottom: 2px solid var(--off-white); padding-bottom: 10px;">${title}</h2><p style="color: var(--deep-space); line-height: 1.6;">${description}</p>`;
        }
        // Show the upload box on this page as well
        this.renderMultiUploader('generic-upload-container', 'generic');
    }

    // Creates the visual box where users can drag and drop their own documents
    renderMultiUploader(containerId, viewKey) {
        const container = document.getElementById(containerId);
        // If the box is already there, don't create it again
        if (container.innerHTML !== "") return;

        container.innerHTML = `
            <div class="upload-section">
                <div id="dropzone-${viewKey}" class="dropzone">
                    <span class="dropzone-icon">📁</span>
                    <p><strong>Drag & Drop</strong> up to 10 files or click to browse</p>
                    <p style="font-size: 0.75rem; opacity: 0.7;">PDF, DOCX, XLSX, CSV</p>
                    <input type="file" id="fileInput-${viewKey}" style="display: none;" accept=".pdf,.docx,.xlsx,.csv" multiple>
                </div>
                <div id="viewer-list-${viewKey}" class="viewer-list"></div>
            </div>
        `;
        // Setup the logic that makes the "Drag & Drop" actually work
        this.initDropzone(viewKey);
    }

    // Sets up the "ears" for the upload box (listening for files being dropped)
    initDropzone(viewKey) {
        const zone = document.getElementById(`dropzone-${viewKey}`);
        const input = document.getElementById(`fileInput-${viewKey}`);
        
        // If they click the box, open the file browser
        zone.onclick = () => input.click();
        // Highlight the box when a file is hovering over it
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
        // Un-highlight when the file is moved away
        zone.ondragleave = () => zone.classList.remove('dragover');
        // When the user lets go of the file over the box
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files, viewKey); // Process the files
        };
        // When the user selects files via the file browser button
        input.onchange = (e) => this.handleFiles(e.target.files, viewKey);
    }

    // Takes the files the user provided and prepares them for viewing
    async handleFiles(files, viewKey) {
        const fileList = Array.from(files);
        // Only allow up to 10 files to be open at once
        const remainingSlots = 10 - this.viewFiles[viewKey].length;
        const filesToProcess = fileList.slice(0, remainingSlots);

        if (fileList.length > remainingSlots) {
            alert(`Limit reached. Only up to 10 files can be displayed at once.`);
        }

        // Give each file a unique ID and show it on the screen
        for (const file of filesToProcess) {
            const fileId = Date.now() + Math.random().toString(36).substr(2, 9);
            this.viewFiles[viewKey].push({ id: fileId, file });
            await this.renderFileItem(file, fileId, viewKey);
        }
    }

    // Determines what type of file was uploaded (PDF, Word, Excel) and displays it
    async renderFileItem(file, fileId, viewKey) {
        const list = document.getElementById(`viewer-list-${viewKey}`);
        const item = document.createElement('div');
        item.className = 'viewer-item';
        item.id = `item-${fileId}`;
        // Create the "card" for this specific file with a "Remove" button
        item.innerHTML = `
            <div class="viewer-header">
                <span>${file.name}</span>
                <button class="remove-file" onclick="app.removeSpecificFile('${fileId}', '${viewKey}')">Remove</button>
            </div>
            <div id="content-${fileId}" class="viewer-content">Processing...</div>
        `;
        list.appendChild(item);

        const contentArea = document.getElementById(`content-${fileId}`);
        const extension = file.name.split('.').pop().toLowerCase(); // Check file type (e.g., .pdf)

        try {
            // If it's a PDF, show it in a PDF reader frame
            if (extension === 'pdf') {
                const url = URL.createObjectURL(file);
                contentArea.innerHTML = `<iframe src="${url}" class="pdf-viewer"></iframe>`;
            } 
            // If it's a Word Doc, use a converter to turn it into readable text
            else if (extension === 'docx') {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                contentArea.innerHTML = `<div class="docx-viewer">${result.value}</div>`;
            } 
            // If it's an Excel or CSV file, turn it into a searchable table
            else if (extension === 'xlsx' || extension === 'csv') {
                const arrayBuffer = await file.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer);
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                contentArea.innerHTML = `<div id="grid-${fileId}"></div>`;
                // Build a modern, interactive table
                new gridjs.Grid({
                    columns: data[0],
                    data: data.slice(1),
                    pagination: { limit: 10 },
                    sort: true,
                    resizable: true,
                    search: true
                }).render(document.getElementById(`grid-${fileId}`));
            }
        } catch (err) {
            // If something goes wrong, show an error message
            contentArea.innerHTML = `<p style="color: var(--mi-red)">Error: ${err.message}</p>`;
        }
    }

    // Deletes an uploaded file from the screen when the user clicks "Remove"
    removeSpecificFile(fileId, viewKey) {
        const item = document.getElementById(`item-${fileId}`);
        if (item) item.remove();
        // Remove it from our internal list so we don't hit the 10-file limit accidentally
        this.viewFiles[viewKey] = this.viewFiles[viewKey].filter(f => f.id !== fileId);
    }

    // A housekeeping function to hide every page before showing a new one
    hideAllViews() {
        this.homeView.classList.remove('active');
        this.excelViewport.classList.remove('active');
        this.genericView.classList.remove('active');
    }

    // Simple tool to find the right ID based on a page title
    getNavIdByTitle(title) {
        const mapping = {};
        return mapping[title] || '';
    }

    // Visually highlights which button in the sidebar is currently active
    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}
// Actually create the application based on the blueprint above
const app = new MILogisticsApp();
