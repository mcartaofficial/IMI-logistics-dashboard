class MILogisticsApp {
    constructor() {
        // Full Dataset Integration [cite: 82, 105, 106]
        this.datasets = {
            rotterdam: [536.41, 534.63, 556.89, 584.66, 497.92, 426.3, 451.65, 488.47, 496.92, 515.23, 507.9, 480.37, 489.87, 455.56, 466.38, 468.61, 475.2, 514.59, 506.18, 421.17, 258.1, 219.19, 224.75, 278.07, 303.18, 307.13, 287.34, 292.26, 318.22, 363.89, 395.3, 456.16, 473.48, 458.26, 469.4, 504.8, 516.53, 480.91, 509.55, 565.47, 540.59, 519.19, 597.94, 658.24, 791.43, 740.39, 779.33, 828.05, 720.66, 653.77, 596.76, 611.71, 551.73, 502.95, 538.9, 534.68, 513.55, 533.38, 488.14, 502.49, 529.45, 571.26, 590.73, 571.16, 540.55, 520.05, 534.32, 548.25, 573.57, 592.48, 542.73, 542.56, 547.67, 521.61, 486.39, 513.47, 490.34, 505.13, 524.98, 502.67, 468.58, 437.2, 438.87, 481.87, 468.5, 457.09],
            brent: [71.778, 77.44, 82.9825, 92.18, 91.9125, 91.9975, 94.624, 103.52, 110.9775, 124.86, 136.7775, 136.32, 115.606, 101.205, 72.262, 53.5675, 42.13, 46.43, 44.815, 48.245, 53.1375, 58.654, 69.3425, 66.914, 73.245, 67.735, 73.836, 76.45, 74.65, 76.16, 74.5675, 79.6125, 85.904, 76.02, 75.695, 75.614, 76.545, 77.9775, 83.268, 86.0925, 92.514, 97.1025, 103.885, 114.8325, 123.736, 112.595, 113.2375, 116.554, 109.345, 108.81, 110.0075, 110.0225, 107.45, 111.205, 119.235, 124.69, 120.9625, 109.8525, 96.858, 103.4725, 112.752, 113.68, 111.5825, 109.328, 108.94, 111.78, 116.855, 109.75, 102.51, 103.154, 103.39, 107.9425, 110.524, 111.6875, 109.4025, 108.054, 111.0975, 106.98, 109.3925, 108.14, 108.29, 109.236, 112.5325, 108.3225, 103.774, 98.33, 88.134, 78.3275, 62.9375, 51.696, 60.53, 56.5325, 60.3875, 65.918, 63.365, 56.946, 48.2875, 48.455, 49.758, 45.1375, 38.925, 33.338, 33.8825, 40.1875, 43.39, 47.81, 49.44, 46.574, 48.01, 47.112, 51.3425, 46.1075, 55.196, 55.89, 56.3275, 52.532, 53.705, 51.425, 47.786, 49.05, 52.4125, 55.284, 57.745, 63.0425, 64.496, 69.155, 65.88, 67.358, 72.0975, 76.735, 76.336, 74.95, 74.218, 79.11, 80.4975, 65.456, 56.9925, 60.47, 64.555, 66.678, 71.5025, 69.372, 64.2625, 64.22, 59.766, 61.9875, 60.08, 62.672, 65.9775, 63.456, 55.2025, 32.7575, 28.7775, 32.074, 41.06, 43.232, 44.65, 41.89, 40.856, 43.8425, 50.6925, 54.836, 62.7025, 66.92, 65.588, 68.265, 73.5675, 75.148, 69.7925, 74.74, 83.288, 79.13, 74.636, 86.4325, 94.795, 114.84, 106.972, 113.98, 116.9925, 106.604, 97.695, 90.264, 94.705, 91.4525, 82.108, 84.535, 83.1225, 79.268, 83.1575, 75.5, 75.256, 81.1, 85.5825, 92.342, 89.5275, 81.8775, 77.476, 79.79, 81.1525, 84.776, 89.6025, 82.694, 83.4725, 83.8325, 78.794, 72.285, 76.55, 73.224, 73.18, 78.464, 74.2525, 71.6825, 66.2925, 63.858, 71.37, 69.22, 67.592]
        };

        this.analysisPages = {
            "DATA_VISUALIZATION": "https://fau-my.sharepoint.com/personal/hardyj2025_fau_edu/_layouts/15/Doc.aspx?sourcedoc={546c8dd2-3f61-4d74-86f7-3da881b4eece}&action=embedview",
            "FORECASTING_MODELS": "https://fau-my.sharepoint.com/personal/nmadrazo2024_fau_edu/_layouts/15/Doc.aspx?sourcedoc={20d1f016-82b3-467b-94ed-1bd03c0b7c1f}&action=embedview"
        };

        this.initUI();
    }

    initUI() {
        this.nav = document.getElementById('sidebar-nav');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
        this.titleText = document.getElementById('current-sheet-title');
        this.loader = document.getElementById('loading-indicator');
        this.homeView = document.getElementById('home-view');
        this.excelViewport = document.getElementById('excel-viewport');
        this.iframeContainer = document.getElementById('iframe-cache-container');

        this.menuToggle.addEventListener('click', () => this.sidebar.classList.toggle('collapsed'));
        
        document.getElementById('model-select').addEventListener('change', (e) => {
            document.getElementById('beta-container').style.display = (e.target.value === 'holt') ? 'flex' : 'none';
        });

        this.buildSidebar();
        this.showHomePage();
    }

    buildSidebar() {
        this.nav.innerHTML = '';
        this.createNavItem('DASHBOARD HOME', 'HOME', () => this.showHomePage());
        this.createNavItem('DATA VISUALIZATION', 'VIZ', () => this.switchExcelPage('DATA_VISUALIZATION', 'Data Visualization'));
        this.createNavItem('FORECASTING MODELS', 'MODELS', () => this.switchExcelPage('FORECASTING_MODELS', 'Forecasting Models'));
        this.createNavItem('ABOUT IMI', 'ABOUT', () => this.showGenericPage('About IMI', 'Global leader in maritime analytics.'));
    }

    createNavItem(text, id, callback) {
        const btn = document.createElement('button');
        btn.className = 'nav-item';
        btn.textContent = text;
        btn.onclick = () => { callback(); this.sidebar.classList.add('collapsed'); };
        this.nav.appendChild(btn);
    }

    showHomePage() {
        this.titleText.innerText = "Logistics Dashboard Home";
        this.homeView.style.display = 'block';
        this.excelViewport.style.display = 'none';
    }

    switchExcelPage(pageKey, title) {
        this.titleText.innerText = title;
        this.homeView.style.display = 'none';
        this.excelViewport.style.display = 'block';
        this.loader.style.display = 'block';
        this.iframeContainer.innerHTML = `<iframe src="${this.analysisPages[pageKey]}" width="100%" height="100%" frameborder="0"></iframe>`;
        this.iframeContainer.querySelector('iframe').onload = () => this.loader.style.display = 'none';
    }

    // Forecasting Implementation [cite: 53, 62, 70]
    runForecasting() {
        const series = document.getElementById('series-select').value;
        const model = document.getElementById('model-select').value;
        const alpha = parseFloat(document.getElementById('alpha-val').value);
        const beta = parseFloat(document.getElementById('beta-val').value);
        const data = this.datasets[series];
        
        let results = [];

        if (model === 'exponential') {
            let f_prev = data[0]; // Initial forecast [cite: 83]
            data.forEach((d, i) => {
                const f = (alpha * d) + ((1 - alpha) * f_prev);
                results.push({ t: i + 1, d: d.toFixed(2), f: f_prev.toFixed(2), ae: Math.abs(d - f_prev).toFixed(2) });
                f_prev = f;
            });
        } else if (model === 'holt') {
            let L = data[0], T = 0; // Initial values [cite: 91]
            data.forEach((d, i) => {
                const f = L + T;
                const nextL = (alpha * d) + ((1 - alpha) * (L + T));
                const nextT = (beta * (nextL - L)) + ((1 - beta) * T);
                results.push({ t: i + 1, d: d.toFixed(2), f: f.toFixed(2), ae: Math.abs(d - f).toFixed(2) });
                L = nextL; T = nextT;
            });
        } else if (model === 'arima') {
            data.forEach((d, i) => {
                const diff = i === 0 ? 0 : d - data[i-1];
                results.push({ t: i + 1, d: d.toFixed(2), f: "N/A", ae: diff.toFixed(2) }); // Differencing mode [cite: 71]
            });
        }

        this.renderTable(results, model === 'arima' ? 'First Difference' : 'Forecast');
    }

    renderTable(results, metricLabel) {
        const container = document.getElementById('results-container');
        const header = document.getElementById('table-header');
        const body = document.getElementById('table-body');
        
        container.style.display = 'block';
        header.innerHTML = `<th>Period</th><th>Demand</th><th>${metricLabel}</th><th>Error</th>`;
        body.innerHTML = results.slice(0, 15).map(r => `
            <tr><td>${r.t}</td><td>${r.d}</td><td>${r.f}</td><td>${r.ae}</td></tr>
        `).join('') + `<tr><td colspan="4" style="text-align:center; color:var(--text-gray);">Showing first 15 records...</td></tr>`;
        
        window.scrollTo({ top: container.offsetTop, behavior: 'smooth' });
    }
}

const app = new MILogisticsApp();
