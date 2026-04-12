// Inside the MILogisticsApp constructor
this.menuBtn = document.getElementById('menu-btn');
this.sidebar = document.getElementById('main-sidebar');

// Inside the init() method
init() {
    this.fileInput.addEventListener('change', (e) => this.handleFile(e.target.files[0]));
    
    // Toggle menu
    this.menuBtn.addEventListener('click', () => {
        this.menuBtn.classList.toggle('open');
        this.sidebar.classList.toggle('active');
    });

    // Close menu if clicking outside
    document.addEventListener('click', (e) => {
        if (!this.sidebar.contains(e.target) && !this.menuBtn.contains(e.target)) {
            this.sidebar.classList.remove('active');
            this.menuBtn.classList.remove('open');
        }
    });
}

// Update switchPage to auto-close the menu after clicking an item
switchPage(sheetName) {
    this.sidebar.classList.remove('active');
    this.menuBtn.classList.remove('open');
    
    // ... rest of your switchPage code ...
}

// Update showHomePage to auto-close the menu
showHomePage() {
    this.sidebar.classList.remove('active');
    this.menuBtn.classList.remove('open');
    
    // ... rest of your showHomePage code ...
}
