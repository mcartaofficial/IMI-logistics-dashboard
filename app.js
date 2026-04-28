// Define a new template (class) for our application called MILogisticsApp
class MILogisticsApp {
    // This is the starting function that runs automatically when a new app instance is created
    constructor() {
        // Create an object to store links for external widgets like maps
        this.widgetConfig = {
            // A specific web link for the ShipXplorer tracking map with custom settings
            shipXplorer: "https://www.shipxplorer.com/?widget=1&z=12&lat=40.46244&lng=-73.88822&portCardRight=true&showLabels=true&showStateFlag=true&showVn=true&showIMO=true&showLabelPhoto=true&showMMSI=true&class=CARGO,PASSENGER,TANKER,HSC,TUG,FISHING,PLEASURE,SAILING,OTHER,UNKNOWN"
        }; // End of the widget configuration object

        // Create an object to store links for various data analysis spreadsheet pages
        this.analysisPages = {
            // Link to the Data Visualization spreadsheet view
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={1efa517b-4d2d-448a-bbc0-03df00a251b4}&action=embedview&AllowTyping=True&ActiveCell='Original%20Model'!O1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Rotterdam Exponential Smoothing analysis sheet
            "ROTTERDAM_EXPONENTIAL_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={42f718b2-df79-4c52-8c5a-f6e80c97b8c0}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Rotterdam Trended Smoothing analysis sheet
            "ROTTERDAM_TRENDED_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={c6670674-ff90-4868-954e-da22a7229612}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Trend.%20Smooth.%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Rotterdam ARIMA forecasting sheet
            "ROTTERDAM_ARIMA": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={d402df77-54ee-45a3-bf61-08b31aa14687}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20ARIMA%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Brent Oil Exponential Smoothing analysis sheet
            "BRENT_EXPONENTIAL_SMOOTHING": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f2b5303c-30b9-47f7-90df-aee6e1ac6751}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Exp%20Smooth%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Brent Oil Trended Smoothing analysis sheet
            "BRENT_TRENDED_SMOOTH": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={207b54d4-07ce-4348-a273-c21bbe8c5d72}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Trend.%20Exp.%20Smooth.%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Brent Oil ARIMA forecasting sheet
            "BRENT_ARIMA": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={387040cf-f417-4999-974f-e082d18765e8}&action=embedview&AllowTyping=True&ActiveCell='Brent%20ARIMA%20Table'!A1&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
            // Link to the Rotterdam Statistical Significance sheet
            "ROTTERDAM_STAT": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={fc00bff8-29ee-4a6c-b472-ef0fd72dfd47}&action=embedview&AllowTyping=True&ActiveCell='Rotterdam%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True",
            // Link to the Brent Crude Oil Statistical Significance sheet
            "BRENT_CRUDE_OIL": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={f5bcbb70-554b-4e08-9f3d-bc8ec9668941}&action=embedview&AllowTyping=True&ActiveCell='Brent%20Crude%20Oil%20Stat.%20Sign.'!A1&wdDownloadButton=True&wdInConfigurator=True"
        }; // End of the analysis pages object

        // Create a long string of HTML code to display on the "About" page
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
        `; // End of the HTML string for the About page

        // Create an empty object to store loaded website frames so they don't have to reload
        this.iframeCache = {};
        // Find the navigation list in the website's HTML by its ID
        this.nav = document.getElementById('sidebar-nav');
        // Find the sidebar menu in the website's HTML by its ID
        this.sidebar = document.getElementById('sidebar');
        // Find the button that opens/closes the menu by its ID
        this.menuToggle = document.getElementById('menu-toggle');
        // Find the home screen section by its ID
        this.homeView = document.getElementById('home-view');
        // Find the section for viewing spreadsheets by its ID
        this.excelViewport = document.getElementById('excel-viewport');
        // Find the general content section by its ID
        this.genericView = document.getElementById('generic-view');
        // Find the container for general text content by its ID
        this.genericContent = document.getElementById('generic-content');
        // Find the hidden container used to keep loaded frames in memory
        this.iframeContainer = document.getElementById('iframe-cache-container');
        // Find the title text at the top of the page by its ID
        this.titleText = document.getElementById('current-sheet-title');
        // Find the loading spinner element by its ID
        this.loader = document.getElementById('loading-indicator');
        
        // Initialize an object to track how many files are uploaded to each view
        this.viewFiles = { excel: [], generic: [] };

        // --- EXTENDED STATE FOR EDITING & MULTI-SHEET ---
        this.workbookStates = new Map(); // Stores edited data for Excel files

        // Run the initialization function to set up the app
        this.init();
    } // End of the constructor function

    // Function to set up event listeners and initial page state
    init() {
        // Tell the computer to toggle the sidebar "collapsed" look when the menu button is clicked
        this.menuToggle.addEventListener('click', () => {
            // Add or remove the 'collapsed' style from the sidebar
            this.sidebar.classList.toggle('collapsed');
        }); // End of click listener

        // Run the function to create the buttons in the sidebar
        this.buildSidebar();
        // Hide the sidebar by default when the page first loads
        this.sidebar.classList.add('collapsed');
        // Fill in the content for the special sections like Services and HQ
        this.renderRelocatedSections();
        // Show the home screen as the first thing the user sees
        this.showHomePage();
    } // End of init function

    // Function to inject HTML content into specific sections of the page
    renderRelocatedSections() {
        // Insert the "Our Services" content into the designated HTML area
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
        `; // End of services injection

        // Insert the "Environmental Commitment" content into the designated HTML area
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
        `; // End of environmental injection

        // Insert the "Global Headquarters" contact list into the designated HTML area
        document.getElementById('hq-section').innerHTML = `
            <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Global Headquarters</h2>
            <div class="hq-container" style="background-color: #24223F; padding: 30px; border-radius: 8px;">
                <div class="hq-grid">
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Florida | USA</h4>
                        <p style="color: #FFFFFF;">54 SE 5th Avenue, Suite 300<br>Delray Beach, FL 33483</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Toll Free</span><a href="tel:+18774230226" style="color: #FFFFFF;">+1-877-423-0226</a></p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+15617050350" style="color: #FFFFFF;">+1-561-705-0350</a></p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Fax</span><a href="fax:+15613910546" style="color: #FFFFFF;">+1-561-391-0546</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.amer@imigroup.com" style="color: #FFFFFF;">operations.amer@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Belo Horizonte | Brazil</h4>
                        <p style="color: #FFFFFF;">IMI Brasil Trading Ltda<br>Rua Antônio de Albuquerque, 194/sl. 902<br>Savassi – Belo Horizonte, MG, BRAZIL</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+5531991828338" style="color: #FFFFFF;">+55 (31) 99182-8338</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.latam@imigroup.com" style="color: #FFFFFF;">operations.latam@imigroup.com</a></p>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Dubai | UAE</h4>
                        <p style="color: #FFFFFF;">IMI Middle East Trading L.L.C.<br>Offices 801 & 802, Tower A, The Offices, One Za’abeel, Za’abeel Palace St, Dubai, U.A.E</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+97147760100" style="color: #FFFFFF;">+971-4-776-0100</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.asia@imigroup.com" style="color: #FFFFFF;">operations.asia@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Madrid | Spain</h4>
                        <p style="color: #FFFFFF;">IMI Europe, SLU<br>Calle Velázquez 123. 2º PL, 28006 Madrid, Spain</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+34915641045" style="color: #FFFFFF;">+34-915-64-1045</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.eur@imigroup.com" style="color: #FFFFFF;">operations.eur@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Shanghai | China</h4>
                        <p style="color: #FFFFFF;">Shanghai Representative Office, Suite 306B, Skybridge Plaza, Jinzhong Road 968#, Changning, Shanghai, China</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+8618217739459" style="color: #FFFFFF;">+86-182-1773-9459</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.asia@imigroup.com" style="color: #FFFFFF;">operations.asia@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Singapore</h4>
                        <p style="color: #FFFFFF;">IMI Trading Singapore Pte Ltd<br>1 George Street, #23-04, Singapore 049145</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+6563035680" style="color: #FFFFFF;">+65-6303-5680</a></p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Fax</span><a href="fax:+6563035681" style="color: #FFFFFF;">+65-6303-5681</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.asia@imigroup.com" style="color: #FFFFFF;">operations.asia@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Mexico City | Mexico</h4>
                        <p style="color: #FFFFFF;">Avenida Paseo de la Reforma Número 404, Piso 13, Interior 102. Colonia Juárez, Mexico City, 06600</p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.latam@imigroup.com" style="color: #FFFFFF;">operations.latam@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Bogotá | Colombia</h4>
                        <p style="color: #FFFFFF;">Calle 97A, #8-10, Oficina 503, Bogotá 110221</p>
                        <p style="color: #FFFFFF;"><a href="mailto:imicol@imigroup.com" style="color: #FFFFFF;">imicol@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                    <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Johannesburg | South Africa</h4>
                        <p style="color: #FFFFFF;">Workshop 17 The Bank, Corner Tyrwhitt Road and 24 Cradock Ave, Johannesburg, 2196</p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.asia@imigroup.com" style="color: #FFFFFF;">operations.asia@imigroup.com</a></p>
                    </div>
                   <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>Istanbul | Turkey</h4>
                        <p style="color: #FFFFFF;">Kampanaki Mansion, Köybaşı Cad. No:63, Yeniköy 34464 Sarıyer, Istanbul, Turkey</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+902122625151" style="color: #FFFFFF;">+90 212 262 51 51</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.eur@imigroup.com" style="color: #FFFFFF;">operations.eur@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                   <div class="hq-box" style="color: #FFFFFF; margin-bottom: 20px;">
                        <h4>London | UK</h4>
                        <p style="color: #FFFFFF;">International Materials UK Ltd, Office 102, 81 Fulham Road, London SW3 6RD, UK</p>
                        <p style="color: #FFFFFF;"><span class="hq-label">Phone</span><a href="tel:+442038260003" style="color: #FFFFFF;">+44 20 3826 0003</a></p>
                        <p style="color: #FFFFFF;"><a href="mailto:operations.eur@imigroup.com" style="color: #FFFFFF;">operations.eur@imigroup.com</a></p>
                        <a href="#" class="hq-link" style="color: #FFFFFF;">Map & Directions</a>
                    </div>
                </div>
            </div>
        `; // End of HQ injection
    } // End of renderRelocatedSections function
    
    // Function to create all the navigation buttons in the left-hand menu
    buildSidebar() {
        // Clear out any existing buttons in the navigation list
        this.nav.innerHTML = '';
        // Add a button for the Home page
        this.createNavItem('DASHBOARD HOME', 'HOME_PAGE', () => this.showHomePage());
        // Add a button for the Data Visualization spreadsheet
        this.createNavItem('DATA VISUALIZATION', 'DATA_VISUALIZATION', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        // Add a button for Rotterdam Exponential Smoothing
        this.createNavItem('ROTTERDAM EXPONENTIAL SMOOTHING', 'ROTTERDAM_EXPONENTIAL_SMOOTH', () => this.switchExcelPage('ROTTERDAM_EXPONENTIAL_SMOOTH', 'Rotterdam Exponential Smoothing'));
        // Add a button for Rotterdam Trended Smoothing
        this.createNavItem('ROTTERDAM TRENDED SMOOTH', 'ROTTERDAM_TRENDED_SMOOTH', () => this.switchExcelPage('ROTTERDAM_TRENDED_SMOOTH', 'Rotterdam Trended Exponential Smoothing'));
        // Add a button for Rotterdam ARIMA
        this.createNavItem('ROTTERDAM ARIMA', 'ROTTERDAM_ARIMA', () => this.switchExcelPage('ROTTERDAM_ARIMA', 'Rotterdam ARIMA'));
        // Add a button for Brent Exponential Smoothing
        this.createNavItem('BRENT EXPONENTIAL SMOOTHING', 'BRENT_EXPONENTIAL_SMOOTHING', () => this.switchExcelPage('BRENT_EXPONENTIAL_SMOOTHING', 'Brent Exponential Smoothing'));
        // Add a button for Brent Trended Smoothing
        this.createNavItem('BRENT TRENDED SMOOTH', 'BRENT_TRENDED_SMOOTH', () => this.switchExcelPage('BRENT_TRENDED_SMOOTH', 'Brent Trended Exponential Smoothing'));
        // Add a button for Brent ARIMA
        this.createNavItem('BRENT ARIMA', 'BRENT_ARIMA', () => this.switchExcelPage('BRENT_ARIMA', 'Brent ARIMA'));
        // Add a button for Rotterdam Stat Sign
        this.createNavItem('ROTTERDAM STAT', 'ROTTERDAM_STAT', () => this.switchExcelPage('ROTTERDAM_STAT', 'Rotterdam Stat Sign'));
        // Add a button for Brent Crude Oil Stat Sign
        this.createNavItem('BRENT CRUDE OIL', 'BRENT_CRUDE_OIL', () => this.switchExcelPage('BRENT_CRUDE_OIL', 'Brent Crude Oil Stat Sign'));
    } // End of buildSidebar function

    // Function to create a single button element for the sidebar
    createNavItem(text, id, callback) {
        // Create a new HTML button element
        const btn = document.createElement('button');
        // Give the button a CSS class name for styling
        btn.className = 'nav-item';
        // Set the text that appears on the button
        btn.textContent = text;
        // Tell the button what to do when clicked
        btn.onclick = () => {
            // Run the specific function (callback) passed to this item
            callback();
            // Automatically close the sidebar on mobile or small screens after clicking
            this.sidebar.classList.add('collapsed');
        }; // End of click logic
        // Give the button a unique data attribute to identify it later
        btn.setAttribute('data-id', id);
        // Add the button to the navigation list in the HTML
        this.nav.appendChild(btn);
    } // End of createNavItem function

    // Function to load and display the external interactive widget
    renderEmbeddableWidget() {
        // Find the container on the page where the widget should be placed
        const container = document.getElementById('widget-mount-point');
        // If the container doesn't exist, stop and don't do anything
        if (!container) return;

        // Clear out any old content in the container
        container.innerHTML = '';
        // Create a new div element to hold the actual widget
        const widgetDiv = document.createElement('div');
        // Set the required CSS class for the external widget library
        widgetDiv.className = 'elfsight-app-eb3d693f-c3ca-49ba-a342-9f379f8be78b';
        // Tell the widget library not to wait for the page to load (lazy loading)
        widgetDiv.setAttribute('data-elfsight-app-lazy', '');
        // Add the widget div to the page container
        container.appendChild(widgetDiv);
    } // End of renderEmbeddableWidget function

    // Function to show the home dashboard screen
    showHomePage() {
        // Highlight the "Home" button in the sidebar
        this.updateActiveNav('HOME_PAGE');
        // Change the page title text to "Dashboard Overview"
        this.titleText.innerText = "Dashboard Overview";
        // Hide every other screen section
        this.hideAllViews();
        // Make the home view section visible
        this.homeView.classList.add('active');
        // Check if the home content has already been built
        if (!document.getElementById('home-content').innerHTML) {
            // If empty, fill the home screen with the welcome message and layout
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

            // Inject the ShipXplorer map into the map container
            document.getElementById('map-container').innerHTML = `
                <div class="hard-clip-wrapper" style="height: 800px;">
                    <iframe frameborder="0" scrolling="no" src="${this.widgetConfig.shipXplorer}" width="100%" height="800"></iframe>
                </div>
            `;

            // Inject the Elfsight Store Locator widget into its container
            document.getElementById('store-locator-container').innerHTML = `
                <div class="elfsight-app-6ba85109-b815-4820-91b7-5719ae4049e2" data-elfsight-app-lazy></div>
            `;

            // Setup the new side-by-side embed
            const embedContainer = document.getElementById('new-embed-container');
            if (embedContainer) {
                embedContainer.innerHTML = `
                    <h2 style="color: var(--mi-red); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; visibility: hidden;">Spacing Placeholder</h2>
                    <div class="widget-clipper" style="background: transparent;">
                        <div class="embeddable-eIvRFEZeWS" data-version="dev" data-ignore-cache="true" data-loader="false" data-lazy-load="false"></div>
                    </div>
                `;
                const script = document.createElement('script');
                script.src = "https://widgets.embeddable.co/sdk/latest/embeddable.js";
                script.defer = true;
                embedContainer.appendChild(script);
            }

            // Finally, run the function to show the Forecasting widget
            this.renderEmbeddableWidget();
        }
    } // End of showHomePage function

    // Function to handle switching between different spreadsheet views
    switchExcelPage(pageId, title) {
        // Highlight the clicked button in the sidebar
        this.updateActiveNav(pageId);
        // Update the page title at the top
        this.titleText.innerText = title;
        // Hide all main screen sections
        this.hideAllViews();
        // Show the spreadsheet viewer section
        this.excelViewport.classList.add('active');

        // Check if this spreadsheet has already been loaded once
        if (this.iframeCache[pageId]) {
            // If it has, hide every other frame in the cache
            Object.values(this.iframeCache).forEach(f => f.style.display = 'none');
            // Make only the requested frame visible
            this.iframeCache[pageId].style.display = 'block';
        } else {
            // If it hasn't been loaded yet, show the loading spinner
            this.loader.style.display = 'block';
            // Hide every other frame that might be currently shown
            Object.values(this.iframeCache).forEach(f => f.style.display = 'none');
            // Create a new iframe element to load the SharePoint link
            const newFrame = document.createElement('iframe');
            // Make the frame take up the full width
            newFrame.style.width = "100%";
            // Set the frame height to 850 pixels
            newFrame.style.height = "850px";
            // Remove the default border around the frame
            newFrame.style.border = "none";
            // Set the web address for the frame to the Excel link
            newFrame.src = this.analysisPages[pageId];
            // Tell the browser to hide the loading spinner once the spreadsheet is ready
            newFrame.onload = () => {
                this.loader.style.display = 'none';
            };
            // Add the spreadsheet to the hidden cache container
            this.iframeContainer.appendChild(newFrame);
            // Save a reference to this frame so we can find it quickly later
            this.iframeCache[pageId] = newFrame;
        } // End of cache check

        // Add the file upload tool to the bottom of the spreadsheet view
        this.renderMultiUploader('excel-upload-container', 'excel');
    } // End of switchExcelPage function

    // Function to show a simple page with text instead of a spreadsheet
    showGenericPage(title, description) {
        // Find the right ID for the navigation and highlight it
        this.updateActiveNav(this.getNavIdByTitle(title));
        // Update the page title text
        this.titleText.innerText = title;
        // Hide all main screen sections
        this.hideAllViews();
        // Show the general text section
        this.genericView.classList.add('active');
        
        // Check if the page being requested is the "About" page
        if(title === 'About IMI Logistics') {
            // If so, use the pre-formatted About HTML
            this.genericContent.innerHTML = this.aboutContentHtml;
        } else {
            // Otherwise, just display the title and description text provided
            this.genericContent.innerHTML = `<h2 style="color: var(--mi-red); border-bottom: 2px solid var(--off-white); padding-bottom: 10px;">${title}</h2><p style="color: var(--deep-space); line-height: 1.6;">${description}</p>`;
        }
        
        // Add the file upload tool to the bottom of this text view
        this.renderMultiUploader('generic-upload-container', 'generic');
    } // End of showGenericPage function

    // Function to create the file upload area (drag-and-drop box)
    renderMultiUploader(containerId, viewKey) {
        // Find the container where we want to put the uploader
        const container = document.getElementById(containerId);
        // Clear out any old uploader content
        container.innerHTML = `
            <div class="upload-section">
                <h3 style="color: var(--deep-space); font-size: 1.1rem; margin-bottom: 15px; text-transform: uppercase;">Manage Files & Live Views</h3>
                
                <div class="dropzone" id="dropzone-${viewKey}">
                    <span class="dropzone-icon">📁</span>
                    <p><b>Drag & Drop</b> Local Files here<br><span style="font-size: 0.8rem; opacity: 0.7;">Support for Excel (.xlsx, .csv), Word (.docx), and PDF</span></p>
                    <input type="file" id="fileInput-${viewKey}" multiple style="display: none;" accept=".xlsx,.csv,.docx,.pdf">
                </div>

                <div style="margin: 20px 0; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 10px 0; font-size: 0.85rem; font-weight: 700; color: #475569;">🔗 ADD SHAREPOINT EMBED VIEW</p>
                    <input type="text" id="sharepoint-input-${viewKey}" class="sharepoint-link-input" placeholder="Paste SharePoint 'Embed View' link or URL here..." onclick="event.stopPropagation()">
                    <button class="add-sharepoint-btn" onclick="event.stopPropagation(); app.handleSharePointInput('${viewKey}')">Add Live View</button>
                </div>
                
                <div id="viewer-list-${viewKey}" class="viewer-list"></div>
            </div>
        `; // End of uploader HTML

        // Set up the technical logic for the drag-and-drop box
        this.initDropzone(viewKey);
    } // End of renderMultiUploader function

    // New Function to handle SharePoint URL/Iframe input
    handleSharePointInput(viewKey) {
        const input = document.getElementById(`sharepoint-input-${viewKey}`);
        let content = input.value.trim();
        if (!content) return;

        let finalUrl = "";
        // Detection Logic: Check if it's an iframe string or a direct URL
        if (content.includes('<iframe') && content.includes('src="')) {
            // Extract URL from src attribute
            const match = content.match(/src="([^"]+)"/);
            if (match && match[1]) finalUrl = match[1];
        } else if (content.includes('sharepoint.com') && content.includes('Doc.aspx')) {
            finalUrl = content;
        }

        if (finalUrl && finalUrl.includes('action=embedview')) {
            const fileId = "sp-" + Date.now();
            this.renderSharePointItem(finalUrl, fileId, viewKey);
            input.value = ""; // Clear input
        } else {
            alert("Please provide a valid SharePoint 'Embed View' link or iframe code.");
        }
    }

    // Function to handle the technical events for the drag-and-drop area
    initDropzone(viewKey) {
        // Find the visual dropzone box
        const zone = document.getElementById(`dropzone-${viewKey}`);
        // Find the hidden file selector input
        const input = document.getElementById(`fileInput-${viewKey}`);
        // When the box is clicked, trigger the hidden file selector
        zone.onclick = () => input.click();

        // When a file is dragged over the box, stop the browser from opening it
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
        // When the file leaves the box area, remove the highlight
        zone.ondragleave = () => zone.classList.remove('dragover');
        // When the file is dropped onto the box, process it
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files, viewKey);
        };

        // When files are selected using the traditional file window, process them
        input.onchange = (e) => this.handleFiles(e.target.files, viewKey);
    } // End of initDropzone function

    // Function to take the files from the uploader and put them in the tracking list
    async handleFiles(fileList, viewKey) {
        // Limit the user to a maximum of 10 uploaded files
        const maxFiles = 10;
        const currentCount = this.viewFiles[viewKey].length;
        const remainingSlots = maxFiles - currentCount;
        // Take only the number of files that fit in the remaining slots
        const filesToProcess = Array.from(fileList).slice(0, remainingSlots);

        // If the user tried to upload too many files, show an alert
        if (fileList.length > remainingSlots) {
            alert(`Limit reached. Only up to 10 files can be displayed at once.`);
        } // End of limit check

        // Loop through every file that is allowed to be processed
        for (const file of filesToProcess) {
            // Create a unique random ID for this specific file
            const fileId = Date.now() + Math.random().toString(36).substr(2, 9);
            // Save the file info to our app's internal list
            this.viewFiles[viewKey].push({ id: fileId, file });
            // Run the function to show this file on the screen
            await this.renderFileItem(file, fileId, viewKey);
        } // End of loop
    } // End of handleFiles function

    // New Function to render SharePoint Iframe (View Mode Only)
    renderSharePointItem(url, fileId, viewKey) {
        const list = document.getElementById(`viewer-list-${viewKey}`);
        const item = document.createElement('div');
        item.className = 'viewer-item';
        item.id = `item-${fileId}`;

        // Add specific metadata to tracking list
        this.viewFiles[viewKey].push({ id: fileId, type: 'sharepoint', url: url });

        item.innerHTML = `
            <div class="viewer-header">
                <span>SharePoint Excel (View Mode)</span>
                <div class="viewer-actions">
                    <button class="remove-file" onclick="app.removeSpecificFile('${fileId}', '${viewKey}')">Remove</button>
                </div>
            </div>
            <div class="viewer-content" style="padding: 0; min-height: 600px;">
                <iframe src="${url}" width="100%" height="700" frameborder="0" scrolling="no" style="display: block;"></iframe>
            </div>
        `;
        list.appendChild(item);
    }

    // Function to display the content of an uploaded file on the screen
    async renderFileItem(file, fileId, viewKey) {
        // Find the list where we add the file viewers
        const list = document.getElementById(`viewer-list-${viewKey}`);
        // Create a new container for this file's viewer
        const item = document.createElement('div');
        item.className = 'viewer-item';
        item.id = `item-${fileId}`;

        // Create the header for the file box (Title + Remove button)
        item.innerHTML = `
            <div class="viewer-header">
                <span>${file.name}</span>
                <div class="viewer-actions">
                    <button class="remove-file" onclick="app.removeSpecificFile('${fileId}', '${viewKey}')">Remove</button>
                </div>
            </div>
            <div class="viewer-content" id="content-${fileId}">Processing file...</div>
        `;
        // Add the container to the list on the page
        list.appendChild(item);

        // Find the area inside the box where the actual content will go
        const contentArea = document.getElementById(`content-${fileId}`);
        // Figure out what type of file it is (e.g., pdf, xlsx) based on its name
        const extension = file.name.split('.').pop().toLowerCase();

        try {
            // Logic for PDF files
            if (extension === 'pdf') {
                // Create a temporary web link to the file on the user's computer
                const url = URL.createObjectURL(file);
                // Display the PDF inside an iframe - WRAPPED IN FORCED SCROLL CONTAINER
                contentArea.innerHTML = `
                    <div style="background:#eee; padding:10px; font-size:0.8rem; border-bottom:1px solid #ccc;">
                        💡 <b>Annotation Mode:</b> Use system PDF viewer tools to add text or highlights.
                    </div>
                    <div class="pdf-viewer-wrapper">
                        <iframe src="${url}" class="pdf-viewer"></iframe>
                    </div>`;
            // Logic for Microsoft Word files
            } else if (extension === 'docx') {
                // Read the file's raw binary data
                const arrayBuffer = await file.arrayBuffer();
                // Use a special library (mammoth) to turn Word data into HTML
                const result = await mammoth.convertToHtml({ arrayBuffer });
                // Display the converted text on the screen - ENABLED EDITING
                contentArea.innerHTML = `
                    <div style="background:#f8fafc; padding:10px; border-bottom:1px solid #e2e8f0; font-size:0.8rem;">✏️ <b>Rich Text Editing:</b> Click anywhere to edit. Formatting is preserved.</div>
                    <div class="docx-viewer" contenteditable="true" spellcheck="false">
                        ${result.value}
                    </div>`;
            // Logic for Excel or CSV spreadsheets
            } else if (extension === 'xlsx' || extension === 'csv') {
                // Read the file's raw binary data
                const arrayBuffer = await file.arrayBuffer();
                // Use a library (XLSX) to read the spreadsheet data
                const workbook = XLSX.read(arrayBuffer, { cellStyles: true, cellNF: true, cellDates: true });
                // --- SPREADSHEET RENDERER (COORDS + TABS + EDITING) ---
                this.renderExcelWithTabs(workbook, fileId, contentArea);
            } // End of file type checks
        } catch (err) {
            // If anything goes wrong during processing, show an error message in red
            contentArea.innerHTML = `<div style="color: red; padding: 20px;">Error processing file: ${err.message}</div>`;
        }
    } // End of renderFileItem function

    // Function to render an Excel workbook with its sheet tabs
    renderExcelWithTabs(workbook, fileId, container) {
        const sheetNames = workbook.SheetNames;
        let tabsHtml = `<div class="excel-tabs" id="tabs-${fileId}">`;
        sheetNames.forEach((name, idx) => {
            tabsHtml += `<button class="excel-tab-btn ${idx === 0 ? 'active' : ''}" onclick="app.switchExcelSheet('${fileId}', '${name.replace(/'/g, "\\'")}')">${name}</button>`;
        });
        tabsHtml += `</div><div id="sheet-viewport-${fileId}"></div>`;
        container.innerHTML = tabsHtml;

        // Render first sheet by default
        this.renderExcelSheet(workbook, sheetNames[0], fileId);
    }

    switchExcelSheet(fileId, sheetName) {
        // Update Tab active state
        const tabContainer = document.getElementById(`tabs-${fileId}`);
        tabContainer.querySelectorAll('.excel-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.innerText === sheetName);
        });

        // Re-render sheet content
        const fileObj = this.viewFiles.excel.find(f => f.id === fileId) || this.viewFiles.generic.find(f => f.id === fileId);
        if (!fileObj) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { cellStyles: true, cellNF: true, cellDates: true });
            this.renderExcelSheet(workbook, sheetName, fileId);
        };
        reader.readAsArrayBuffer(fileObj.file);
    }

    renderExcelSheet(workbook, sheetName, fileId) {
        const worksheet = workbook.Sheets[sheetName];
        const viewport = document.getElementById(`sheet-viewport-${fileId}`);
        
        const stateKey = `${fileId}-${sheetName}`;
        const existingData = this.workbookStates.get(stateKey);

        const data = existingData || XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
        if (!existingData) this.workbookStates.set(stateKey, data);

        let tableHtml = `<div class="excel-table-container"><table class="excel-table">`;
        
        // Header Row (A, B, C...)
        const maxCols = data[0] ? data[0].length : 0;
        tableHtml += `<thead><tr><th class="row-label"></th>`;
        for (let i = 0; i < maxCols; i++) {
            tableHtml += `<th>${this.getColLabel(i)}</th>`;
        }
        tableHtml += `</tr></thead><tbody>`;

        // Data Rows
        data.forEach((row, rIdx) => {
            tableHtml += `<tr><td class="row-label">${rIdx + 1}</td>`;
            row.forEach((cell, cIdx) => {
                tableHtml += `<td contenteditable="true" onblur="app.updateExcelCell('${fileId}', '${sheetName.replace(/'/g, "\\'")}', ${rIdx}, ${cIdx}, this.innerText)">${cell}</td>`;
            });
            tableHtml += `</tr>`;
        });

        tableHtml += `</tbody></table></div>`;
        viewport.innerHTML = tableHtml;
    }

    getColLabel(index) {
        let label = "";
        while (index >= 0) {
            label = String.fromCharCode((index % 26) + 65) + label;
            index = Math.floor(index / 26) - 1;
        }
        return label;
    }

    updateExcelCell(fileId, sheetName, row, col, newVal) {
        const stateKey = `${fileId}-${sheetName}`;
        const data = this.workbookStates.get(stateKey);
        if (data && data[row]) {
            data[row][col] = newVal;
        }
    }

    // Function to remove a file from the tracking list and from the screen
    removeSpecificFile(fileId, viewKey) {
        // Filter the list to exclude the file with the specified ID
        this.viewFiles[viewKey] = this.viewFiles[viewKey].filter(f => f.id !== fileId);
        // Find the visual element for this file on the page
        const element = document.getElementById(`item-${fileId}`);
        // If the element exists, remove it from the website's HTML
        if (element) element.remove();
        
        // Clean up workbook states
        for (const key of this.workbookStates.keys()) {
            if (key.startsWith(fileId)) this.workbookStates.delete(key);
        }
    } // End of removeSpecificFile function

    // Function to hide all main view sections of the dashboard
    hideAllViews() {
        // Hide the home screen
        this.homeView.classList.remove('active');
        // Hide the spreadsheet viewer
        this.excelViewport.classList.remove('active');
        // Hide the general text viewer
        this.genericView.classList.remove('active');
    } // End of hideAllViews function

    // Helper function to find a navigation ID based on a page title
    getNavIdByTitle(title) {
        // An empty mapping object (could be filled if needed)
        const mapping = {};
        // Return the mapped ID or an empty string if not found
        return mapping[title] || '';
    } // End of getNavIdByTitle function

    // Function to highlight the currently selected button in the sidebar
    updateActiveNav(id) {
        // Remove the "active" look from every single button in the menu
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        // Find the specific button that matches the current page ID
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        // If that button exists, give it the "active" highlighted style
        if (activeBtn) activeBtn.classList.add('active');
    } // End of updateActiveNav function
} // End of MILogisticsApp class definition

// Create the actual working instance of the app to start the program
const app = new MILogisticsApp();
