# 🚀 Deployment Guide

This guide covers multiple deployment options for the IMI Shipping & Freight Dashboard.

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Advantages
- ✅ Completely free hosting
- ✅ No server maintenance required
- ✅ Automatic HTTPS
- ✅ Fast CDN delivery
- ✅ Perfect for static client-side app

### Setup Steps

1. **Create GitHub Repository**
   ```bash
   # On GitHub.com, create a new repository named "imi-shipping-dashboard"
   ```

2. **Upload Files**
   - Upload these files to your repository:
     - `index.html`
     - `app.js`
     - `README.md`

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from main branch
   - Click Save

4. **Access Your Dashboard**
   - URL: `https://YOUR_USERNAME.github.io/imi-shipping-dashboard/`
   - Usually live within 2-3 minutes

### Updating the Site
```bash
# Make changes locally, then:
git add .
git commit -m "Update dashboard"
git push origin main
# Changes appear automatically
```

---

## Option 2: Local Python Server (For Development/Testing)

### Advantages
- ✅ Run completely offline
- ✅ Full Python optimization engine
- ✅ No external dependencies
- ✅ Great for testing

### Setup Steps

1. **Install Python 3.8+**
   - Download from https://python.org

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Server**
   ```bash
   python server.py
   ```

4. **Access Dashboard**
   - Open browser: `http://localhost:5000`

---

## Option 3: Railway.app (Cloud Hosting with Backend)

### Advantages
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Supports Python backend
- ✅ Custom domains

### Setup Steps

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your imi-shipping-dashboard repository

3. **Configure Build**
   - Railway auto-detects Python
   - No configuration needed!

4. **Add Environment Variables** (if needed)
   ```
   PORT=5000
   FLASK_ENV=production
   ```

5. **Deploy**
   - Railway automatically deploys
   - Get your URL: `https://your-app.railway.app`

### Auto-Deploy
- Push to GitHub → Railway automatically redeploys

---

## Option 4: Render.com (Alternative Cloud Host)

### Advantages
- ✅ Free tier with generous limits
- ✅ Easy Python deployment
- ✅ Free SSL certificates
- ✅ Good performance

### Setup Steps

1. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

2. **New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**
   ```
   Name: imi-shipping-dashboard
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python server.py
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Your app will be live at: `https://imi-shipping-dashboard.onrender.com`

---

## Option 5: Heroku (Enterprise Option)

### Advantages
- ✅ Robust platform
- ✅ Easy scaling
- ✅ Add-ons ecosystem
- ⚠️ No longer has free tier

### Setup Steps

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create imi-shipping-dashboard
   ```

4. **Add Procfile**
   Create `Procfile` in your repository:
   ```
   web: python server.py
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

---

## Option 6: Custom Domain Setup

Once deployed on any platform, you can add a custom domain:

### GitHub Pages
1. Go to Settings → Pages
2. Add custom domain: `dashboard.imishipping.com`
3. Add DNS records:
   ```
   Type: CNAME
   Name: dashboard
   Value: YOUR_USERNAME.github.io
   ```

### Railway/Render
1. Go to Settings → Domains
2. Add custom domain
3. Follow DNS configuration instructions

### SSL Certificate
- All platforms provide free SSL automatically
- Just add your domain and wait for DNS propagation

---

## 🔧 Configuration Files

### For GitHub Pages
No configuration needed - just HTML/JS files!

### For Server Deployments
Create `.env` file:
```env
FLASK_ENV=production
PORT=5000
SECRET_KEY=your-secret-key-here
```

---

## 📊 Performance Optimization

### GitHub Pages
- Already optimized via GitHub's CDN
- Consider minifying JS files for production

### Server Deployments
Add to `server.py`:
```python
# Enable caching
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Enable compression
from flask_compress import Compress
Compress(app)
```

---

## 🔐 Security Best Practices

1. **Never commit API keys**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **HTTPS Only**
   - All platforms provide free SSL
   - Force HTTPS in production

3. **Input Validation**
   - Already implemented in the app
   - Validates Excel file formats

4. **CORS Configuration**
   - Restrict origins in production:
   ```python
   CORS(app, origins=['https://yourdomain.com'])
   ```

---

## 🐛 Troubleshooting

### GitHub Pages not updating?
```bash
# Clear cache and force push
git commit --amend --no-edit
git push --force origin main
```

### Server won't start?
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Optimization not working?
- Check browser console for errors
- Ensure all 4 Excel files are uploaded
- Verify Excel file formats match expected structure

### Gemini API errors?
- Verify API key is correct
- Check quota at https://makersuite.google.com
- Ensure internet connectivity

---

## 📱 Mobile Responsiveness

The dashboard is fully responsive and works on:
- 📱 Mobile phones (iOS/Android)
- 💻 Tablets
- 🖥️ Desktops

Test on multiple devices before deploying to production.

---

## 🔄 Update Strategy

### Recommended Workflow
1. **Development**: Test locally with `python server.py`
2. **Staging**: Deploy to Railway/Render free tier
3. **Production**: Deploy to GitHub Pages or paid hosting

### Version Control
```bash
# Tag releases
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

---

## 📞 Support Channels

- **GitHub Issues**: Bug reports and feature requests
- **Email**: support@imishipping.com
- **Documentation**: See README.md

---

## ✅ Deployment Checklist

Before going live:
- [ ] Test all 4 file uploads
- [ ] Run optimization with sample data
- [ ] Verify Gemini API integration
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Add monitoring/analytics (optional)
- [ ] Share URL with team
- [ ] Create user documentation

---

**Congratulations! Your IMI Shipping Dashboard is now deployed! 🎉**
