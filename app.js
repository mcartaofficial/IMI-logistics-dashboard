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
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={29075b82-afbd-486b-950f-0cd95dc6e491}&action=embedview&AllowTyping=True&ActiveCell='EDF%202018%20Summary'!D2&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0",
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

        // ADDED: Root state for files (Source of Truth)
        this.processedData = {};

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
        this.createNavItem('ROTTERDAM TRENDED EXPONENTIAL SMOOTHING', 'ROTTERDAM_TRENDED_SMOOTH', () => this.switchExcelPage('ROTTERDAM_TRENDED_SMOOTH', 'Rotterdam Trended Exponential Smoothing'));
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
        // Find where the widget should go in the HTML
        const container = document.getElementById('widget-mount-point');
        // If the container doesn't exist or already has stuff in it, stop here
        if (!container || container.children.length > 0) return;

        // Create a new div element to hold the widget
        const widgetDiv = document.createElement('div');
        // Set the unique class name required by the widget provider
        widgetDiv.className = "embeddable-eicHZF6jsR";
        // Tell the widget to use the development version
        widgetDiv.setAttribute('data-version', 'dev');
        // Tell the widget not to use cached data
        widgetDiv.setAttribute('data-ignore-cache', 'true');
        // Tell the widget not to show its own loading screen
        widgetDiv.setAttribute('data-loader', 'false');
        // Tell the widget to load immediately rather than waiting
        widgetDiv.setAttribute('data-lazy-load', 'false');

        // Create a script element to load the widget's brain (software library)
        const script = document.createElement('script');
        // Set the source address for the widget library
        script.src = "https://widgets.embeddable.co/sdk/latest/embeddable.js";
        // Tell the browser to load this script in the background
        script.async = true;

        // Add the widget div to the page
        container.appendChild(widgetDiv);
        // Add the widget script to the page
        container.appendChild(script);
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
                    <iframe frameborder="0" scrolling="no" style="width: 100%; height: 100%; border: none;" src="${this.widgetConfig.shipXplorer}"></iframe>
                </div>`;

            // Run the function to load the interactive charts
            this.renderEmbeddableWidget();

            // Inject the store locator (HQ maps) widget
            document.getElementById('store-locator-container').innerHTML = `
                <div class="elfsight-app-d9332a95-3af1-4708-a385-24cef7defd35" data-elfsight-app-lazy></div>
            `;
        } // End of if-statement
    } // End of showHomePage function

    // Function to switch between different embedded Excel spreadsheet views
    switchExcelPage(pageId, displayTitle) {
        // Highlight the clicked item in the sidebar
        this.updateActiveNav(pageId);
        // Set the page title to the name of the spreadsheet
        this.titleText.innerText = displayTitle;
        // Hide all main screen sections
        this.hideAllViews();
        // Show the spreadsheet container section
        this.excelViewport.classList.add('active');
        // Hide all previously loaded spreadsheets so they don't overlap
        Object.values(this.iframeCache).forEach(frame => frame.style.display = 'none');
        // Check if we have already loaded this specific spreadsheet before
        if (this.iframeCache[pageId]) {
            // If it exists, just make it visible again
            this.iframeCache[pageId].style.display = 'block';
        } else {
            // If it's new, show the loading spinner
            this.loader.style.display = 'block';
            // Create a new iframe (window inside a window) element
            const newFrame = document.createElement('iframe');
            // Make the frame take up the full width
            newFrame.style.width = "100%";
            // Set the frame height to 850 pixels
            newFrame.style.height = "850px";
            // Remove the default border around the frame
            newFrame.style.border = "none";
            // Set the web address for the frame to the Excel link
            newFrame.src = this.analysisPages[pageId];
            // Tell the computer to hide the loading spinner once the spreadsheet is ready
            newFrame.onload = () => { this.loader.style.display = 'none'; };
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
        } // End of about check
        // Add the file upload tool to the bottom of the text view
        this.renderMultiUploader('generic-upload-container', 'generic');
    } // End of showGenericPage function

    // Function to build the file uploader interface
    renderMultiUploader(containerId, viewKey) {
        // Find the container where the uploader should appear
        const container = document.getElementById(containerId);
        // If the uploader is already there, don't build it again
        if (container.innerHTML !== "") return;

        // Insert the HTML structure for the "Drag & Drop" box
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
        `; // End of uploader HTML
        // Set up the technical logic for the drag-and-drop box
        this.initDropzone(viewKey);
    } // End of renderMultiUploader function

    // Function to handle the technical events for the drag-and-drop area
    initDropzone(viewKey) {
        // Find the visual dropzone box
        const zone = document.getElementById(`dropzone-${viewKey}`);
        // Find the hidden file selector input
        const input = document.getElementById(`fileInput-${viewKey}`);
        // When the box is clicked, trigger the hidden file selector
        zone.onclick = () => input.click();
        // When a file is dragged over the box, stop the browser from opening it and highlight the box
        zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('dragover'); };
        // When a file is dragged away from the box, remove the highlight
        zone.ondragleave = () => zone.classList.remove('dragover');
        // When a file is dropped into the box
        zone.ondrop = (e) => {
            // Stop the browser from just opening the file
            e.preventDefault();
            // Remove the highlight from the box
            zone.classList.remove('dragover');
            // Process the files that were dropped
            this.handleFiles(e.dataTransfer.files, viewKey);
        }; // End of drop logic
        // When files are selected via the traditional click-and-browse menu
        input.onchange = (e) => this.handleFiles(e.target.files, viewKey);
    } // End of initDropzone function

    // Function to manage the list of files being uploaded
    async handleFiles(files, viewKey) {
        // Convert the list of files into a standard JavaScript list (array)
        const fileList = Array.from(files);
        // Calculate how many more files are allowed (up to 10 total)
        const remainingSlots = 10 - this.viewFiles[viewKey].length;
        // Take only the number of files that fit in the remaining slots
        const filesToProcess = fileList.slice(0, remainingSlots);

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

    // ADDED: EXCEL DATE FORMATTING HELPER
    formatExcelValue(val) {
        if (typeof val === 'number' && val > 40000 && val < 50000) {
            // Likely an Excel serial date
            const date = XLSX.SSF.parse_date_code(val);
            return `${date.m}/${date.d}/${date.y}`;
        }
        return val === null || val === undefined ? '' : val;
    }

    // Function to display the content of an uploaded file on the page
    async renderFileItem(file, fileId, viewKey) {
        // Find the list where file previews are shown
        const list = document.getElementById(`viewer-list-${viewKey}`);
        // Create a new div element for this specific file preview
        const item = document.createElement('div');
        // Set the style class for the file item
        item.className = 'viewer-item';
        // Set the ID so we can find this item later to remove it
        item.id = `item-${fileId}`;
        // Set the HTML structure for the file header and content area
        item.innerHTML = `
            <div class="viewer-header">
                <span>${file.name}</span>
                <div style="display: flex; gap: 10px;">
                    <button class="download-btn" onclick="app.downloadFile('${fileId}')">Download</button>
                    <button class="remove-file" onclick="app.removeSpecificFile('${fileId}', '${viewKey}')">Remove</button>
                </div>
            </div>
            <div id="content-${fileId}" class="viewer-content">Processing...</div>
        `; // End of item HTML
        // Add the new file item to the list on the screen
        list.appendChild(item);

        // Find the specific area where the file content will be written
        const contentArea = document.getElementById(`content-${fileId}`);
        // Figure out the file type (like 'pdf' or 'xlsx') from the filename
        const extension = file.name.split('.').pop().toLowerCase();

        try {
            // Logic for PDF files
            if (extension === 'pdf') {
                const url = URL.createObjectURL(file);
                this.processedData[fileId] = { type: 'pdf', data: url, name: file.name };
                contentArea.innerHTML = `<iframe src="${url}" class="pdf-viewer"></iframe>`;
            // Logic for Microsoft Word files
            } else if (extension === 'docx') {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                this.processedData[fileId] = { type: 'docx', data: result.value, name: file.name };
                contentArea.innerHTML = `<div class="docx-viewer" contenteditable="true" oninput="app.updateTextState('${fileId}', this.innerHTML)">${result.value}</div>`;
            // Logic for Excel or CSV spreadsheets
            } else if (extension === 'xlsx' || extension === 'csv') {
                const arrayBuffer = await file.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer);
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                // FIXED: Do NOT use .slice() or limits. Read entire sheet.
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                // BINDING: Save full data to state
                this.processedData[fileId] = { 
                    type: 'excel', 
                    data: data, 
                    name: file.name,
                    headers: data[0]
                };

                // Create a scrollable container
                contentArea.innerHTML = `<div id="grid-${fileId}" class="excel-grid-container"></div>`;
                
                // ADDITIVE: Define the editable column structure with Date Formatting
                const editableColumns = this.processedData[fileId].headers.map((colName, colIndex) => {
                    return {
                        name: colName,
                        formatter: (cell, row) => {
                            // Apply Date Formatting to the visual display
                            const formattedVal = this.formatExcelValue(cell);
                            const rowIdx = row.cells[row.cells.length - 1].data; 
                            return gridjs.html(`<input class="cell-input" value="${formattedVal}" oninput="app.updateCellState('${fileId}', ${rowIdx}, ${colIndex}, this.value)">`);
                        }
                    };
                });

                // Map data rows and include the original row index for state tracking
                const gridData = data.slice(1).map((row, idx) => [...row, idx]);

                // Render with Grid.js but NO pagination + Forced expansion
                new gridjs.Grid({
                    columns: [...editableColumns, { name: 'ID', hidden: true }],
                    data: gridData,
                    pagination: false, 
                    fixedHeader: true,
                    resizable: true,
                    sort: false, 
                    style: {
                        container: {
                            'min-width': 'max-content' 
                        }
                    }
                }).render(document.getElementById(`grid-${fileId}`)); 
            } // End of file type checks
        } catch (err) {
            contentArea.innerHTML = `<p style="color: var(--mi-red)">Error: ${err.message}</p>`;
        } // End of try-catch block
    } // End of renderFileItem function

    // ADDED: State Binding Logic for Excel Cells
    updateCellState(fileId, rowIdx, colIdx, newValue) {
        if (this.processedData[fileId]) {
            // Data is [headerRow, row1, row2...] so rowIdx 0 is actually index 1
            this.processedData[fileId].data[rowIdx + 1][colIdx] = newValue;
        }
    }

    // ADDED: State Binding Logic for Word Content
    updateTextState(fileId, newHtml) {
        if (this.processedData[fileId]) {
            this.processedData[fileId].data = newHtml;
        }
    }

    // ADDED: Download Logic (Generates files from the MODIFIED state)
    downloadFile(fileId) {
        const item = this.processedData[fileId];
        if (!item) return;

        let blob;
        let filename = item.name;

        if (item.type === 'excel') {
            // Create workbook from the current state (this.processedData[fileId].data)
            const ws = XLSX.utils.aoa_to_sheet(item.data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "ModifiedSheet");
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            if (!filename.endsWith('.xlsx')) filename = filename.split('.')[0] + '.xlsx';
        } else if (item.type === 'docx') {
            blob = new Blob([item.data], { type: 'text/html;charset=utf-8;' });
            filename = filename.replace('.docx', '.html');
        } else if (item.type === 'pdf') {
            const link = document.createElement('a');
            link.href = item.data;
            link.download = item.name;
            link.click();
            return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        link.click();
    }

    // Function to delete a file preview from the screen
    removeSpecificFile(fileId, viewKey) {
        const item = document.getElementById(`item-${fileId}`);
        if (item) item.remove();
        this.viewFiles[viewKey] = this.viewFiles[viewKey].filter(f => f.id !== fileId);
        delete this.processedData[fileId];
    } // End of removeSpecificFile function

    // Function to hide all main view sections of the dashboard
    hideAllViews() {
        this.homeView.classList.remove('active');
        this.excelViewport.classList.remove('active');
        this.genericView.classList.remove('active');
    } // End of hideAllViews function

    // Helper function to find a navigation ID based on a page title
    getNavIdByTitle(title) {
        const mapping = {};
        return mapping[title] || '';
    } // End of getNavIdByTitle function

    // Function to highlight the currently selected button in the sidebar
    updateActiveNav(id) {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-id="${id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    } // End of updateActiveNav function
} // End of MILogisticsApp class definition

// Create the actual working instance of the app to start the program
const app = new MILogisticsApp();
