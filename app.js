class MILogisticsApp {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.init();
    }

    init() {
        // Sidebar Toggle Logic
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('collapsed');
        });

        // Optional: Close sidebar on mobile after clicking
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    this.sidebar.classList.add('collapsed');
                }
            });
        });
    }
}

// Start the app immediately
new MILogisticsApp();
