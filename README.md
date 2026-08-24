# 🌌 3D Interactive Cyber-Modern Portfolio | SATHYADEVAN G

A high-performance, colorful, and 3D interactive job portfolio website designed for **SATHYADEVAN G** — *Technology Aspirant, IT Support & Network Engineer*.

---

## ✨ Key Features

1. **3D Interactive Background**: Powered by **Three.js** with interactive particle constellations, floating geometric wireframes, and cursor physics.
2. **3D Holographic Photo Showcase**: 
   - Interactive 3D mouse parallax tilt.
   - Dynamic holographic glare and scanline shaders.
   - Layered floating 3D depth chips (`CCNA Trained`, `Server & LAN`, `Systech Academy Certified`).
   - Built-in photo customizer (upload your own portrait photo or reset anytime with persistent `localStorage` saving).
3. **Organized & Labeled Sections**:
   - **Hero & Typewriter Headline**: Dynamic role cycling, fast stats, and quick CTA buttons.
   - **About & Career Objective**: Professional summary, personal strengths, and interactive Education timeline (*B.Tech IT 2024* & *Diploma EEE 2018*).
   - **Work Experience & Internships**: Daphne Infotech IT Support Internship with A+, N+, and CCNA modules.
   - **Categorized Key Skills Matrix**: Filterable proficiency cards with animated progress meters for OS, Hardware, Networking, Remote Support, Security, and Soft Skills.
   - **Certifications & Badges**: 3D interactive cards for Systech Network Academy credentials.
   - **Project Showcase & Modal**: 4 deep-dive enterprise infrastructure projects with interactive architecture popups.
   - **Interactive ATS Resume Modal**: Instant printable / PDF exportable formatted resume + one-click text copy.
   - **Contact & Socials**: Direct Email, LinkedIn, GitHub links, and instant message form.

---

## 🚀 How to Open in Web Browser

- **Double-click [`index.html`](file:///c:/Users/Jayden%20PC/Desktop/port/index.html)** in your file explorer to open it immediately in Google Chrome, Microsoft Edge, Firefox, or Brave!

---

## 🌐 How to Add Live to GitHub Pages (2 Methods)

### Method 1: Upload Directly on GitHub (Easiest & No Git Required)
1. Go to [https://github.com/new](https://github.com/new) and log in as `devop2000`.
2. Enter Repository name: **`port`** (or `portfolio`) and keep it **Public**. Click **Create repository**.
3. On the new repository page, click the link: **"uploading an existing file"**.
4. Drag and drop all the files from this folder (`index.html`, `style.css`, `app.js`, `resume.md`, `README.md`, and the `assets` folder) into the browser window.
5. Click **Commit changes**.
6. Go to **Settings** > **Pages** (on the left menu).
7. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
8. In 1 minute, your portfolio will be live at:
   👉 **`https://devop2000.github.io/port/`**

---

### Method 2: Using Git CLI / GitHub Desktop
```bash
git init
git add .
git commit -m "Initial commit: 3D portfolio"
git branch -M main
git remote add origin https://github.com/devop2000/port.git
git push -u origin main
```
Then enable GitHub Pages under repository **Settings** > **Pages**.

---

## 📁 File Structure

```
port/
├── index.html                  # Main responsive single-page web app
├── style.css                   # 3D effects, neon glassmorphism & print stylesheet
├── app.js                      # Three.js engine, 3D tilt, filters & modal handlers
├── resume.md                   # Plain text & Markdown resume for ATS / job portals
├── README.md                   # Project documentation & GitHub Pages deployment guide
└── assets/
    └── images/
        └── profile-avatar.svg  # High-tech vector portrait & fallback avatar
```
