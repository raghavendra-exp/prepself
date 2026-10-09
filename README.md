# PrepSelf — Premier Indian Competitive Exam Preparation Platform

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-blue?logo=github)](https://raghavendra-exp.github.io/prepself/)
[![Vanilla Web Platform](https://img.shields.io/badge/Architecture-Vanilla_Web_No_Build-success)](https://github.com/raghavendra-exp/prepself)
[![Custom Domain Ready](https://img.shields.io/badge/Domain-prepself.in-purple)](https://prepself.in)
[![Open Access](https://img.shields.io/badge/Cost-100%25_Free_%26_Open-brightgreen)](#)

> **PrepSelf** (`prepself.in`) is an all-in-one, unified self-study ecosystem for 80+ Indian competitive exams. Instant AI study prompts, 27 integrated interactive master suites, CBT mock test simulators, 4-phase preparation roadmaps, and statutory reference texts — unified in a **single repository with zero build steps or bundlers**.

---

## 🌟 Key Highlights & Unified Capabilities

1. **Pure Vanilla Web Architecture in a Single Repository**:
   - All 27 specialized exam suites (previously hosted across 26 separate GitHub Pages repositories) are now embedded directly in `./suites/`.
   - Requires zero node_modules, webpack, or compiler steps: works natively on GitHub Pages, Vercel, Netlify, Cloudflare Pages, Firebase Hosting, Apache/Nginx, or running directly from local disk (`file://`).

2. **27 Integrated Interactive Master Suites (`study-modules.html`)**:
   - In-app interactive viewer with responsive catalog, instant search, quick filters, and direct standalone launchers.
   - Comprehensive coverage across all major exam categories:
     - **Banking & Finance**: Quantitative Aptitude, Reasoning Ability, English Language, Banking & Financial Awareness.
     - **Civil Services (UPSC & State PSCs)**: History of India Atlas, Geography of India Map Lab, GS-2 Polity & Governance, GS-3 Economy & Science, GS-4 Ethics & Case Studies, India & World International Relations.
     - **SSC & Railways**: SSC Master India (CGL, CHSL, GD, MTS, CPO), RRB Master India (NTPC, Group D, ALP, JE).
     - **National Entrance Exams**: Engineering (JEE Main/Adv), Medical (NEET UG), Law (CLAT/AILET), Management (CAT/XAT/SNAP/NMAT), CUET UG/PG.
     - **State Recruitment & Police**: UP Police (UPPRPB Constable/SI), UPSSSC PET, UP Teacher (Super TET/UP TGT), UPPSC RO/ARO.
     - **Defence & Armed Forces**: Defence Exams India Master (NDA, CDS, AFCAT, Agniveer, ICG, SSB Interview).
     - **Professional Certifications**: CA (ICAI), CS (ICSI), CMA (ICMAI), CFA, ACCA, FRM, JAIIB/CAIIB, NISM.
     - **Teaching & General Science**: General Science & Teaching Master (CSIR NET, IIT JAM, CTET, State TETs, KVS, NVS).
     - **Daily Practice**: Daily Editorial Hub & Vocabulary Builder, Computer Awareness Master.

3. **18 AI Study Prompt Generators**:
   - Calibrated, high-yield prompt generators for instant pasting into ChatGPT, Claude, Gemini, or Perplexity.
   - Tailored prompts for concept explanations, PYQ pattern analysis, Vedic shortcuts, and timed mocks.

4. **Authentic CBT Mock Test Simulator (`quiz-simulator.html`)**:
   - 5-option Indian banking & exam pattern ($A, B, C, D, E$).
   - Sectional timers, negative marking calculations, and immediate step-by-step explanations.

5. **80+ Phase-Wise Preparation Roadmaps (`all-exam-roadmaps.html`)**:
   - 4-Phase study blueprints (Foundations, Topic Mastery, Sectional Mocks, Final 30-Day Revision Loop).

6. **Modern, Responsive Design**:
   - Modern dark/light theme with persistent `localStorage`.
   - Universal Spotlight search (`Ctrl+K` / `⌘K`).
   - Integrated floating exam calculator and formula vault.
   - Pure Progressive Web App (PWA) ready to install on Android, iOS, Windows, and macOS without app store bloat.

---

## 📁 Repository Structure

```
prepself/
├── index.html                   # Modernized Portal & Live Prompt Studio
├── study-modules.html           # Unified 27-Module Interactive Viewer & Catalog
├── all-exam-roadmaps.html       # 80+ Exam Roadmaps Explorer
├── quiz-simulator.html          # CBT Exam Mock Simulator
├── user-guide.html              # Aspirant Handbook & Study Techniques
├── about.html                   # Mission & Open Education Philosophy
├── contact.html                 # Aspirant Support
├── privacy-policy.html          # Privacy Policy & Disclaimers
├── admin.html                   # Local Study Admin
├── IBPS_SBI_Clerk_Roadmap.html  # 12-Week Banking Prep Roadmap
├── IBPS_SBI_Free_Library.html   # Curated Government Texts & Free Library
├── exam-mentor-chatbot.html     # AI Mentor Chatbot
├── trend-analysis-generator.html# PYQ Trend & Weightage Analyzer
├── *_exam_prompt_generator.html # 18 Category-Specific Prompt Generators
├── css/
│   └── modern.css               # Design tokens, responsive grids, dark/light styles
├── js/
│   ├── nav.js                   # Universal spotlight (Ctrl+K), calculator, PWA logic
│   ├── quiz.js                  # CBT mock exam test engine
│   └── studio.js                # Live Prompt Studio playground
├── modules/                     # 27 Curated Syllabus, PYQ & Books Reference Guides
│   ├── defence.html
│   ├── bank-quant.html
│   └── ...
├── suites/                      # ALL 27 SELF-CONTAINED INTERACTIVE APPLICATIONS
│   ├── bank-quant/
│   ├── defence-exams-india/
│   ├── professional-certifications-india/
│   ├── general-science-teaching-master/
│   ├── history-of-india/
│   ├── daily-editorial-hub/
│   └── ... [21 more master suites]
├── hi/                          # Hindi Edition Hub & State Exam Modules
├── icons/                       # PWA Icons & SVG Assets
├── images/                      # OpenGraph & Feature Graphics
├── .github/workflows/deploy.yml # GitHub Actions 1-Click Pages Deployment
├── .nojekyll                    # Ensures GitHub Pages serves all assets
├── manifest.webmanifest         # PWA Manifest Configuration
├── sw.js                        # Service Worker for Offline Caching
├── sitemap.xml                  # Search Engine Sitemap
└── robots.txt                   # Search Engine Directive
```

---

## 🚀 How to Deploy

### Option 1: GitHub Pages (Automatic with GitHub Actions)
1. Push this repository to `https://github.com/raghavendra-exp/prepself`.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions** (or **Deploy from a branch** > branch: `main`, folder: `/ (root)`).
4. The site will deploy instantly at: `https://raghavendra-exp.github.io/prepself/`.

### Option 2: Custom Domain (`prepself.in`)
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Custom domain**, type `prepself.in` and click **Save**.
3. In your DNS provider (e.g. Cloudflare, GoDaddy, Namecheap):
   - Add four `A` records pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a `CNAME` record for `www` pointing to `raghavendra-exp.github.io`.
4. Check **Enforce HTTPS**. Your custom domain is live!

### Option 3: Any Static Web Host (Netlify / Vercel / Cloudflare Pages / S3)
Because this project contains **zero server dependencies and pre-built static suites**, you can deploy it to any static host with zero build commands:
- **Build command**: *(leave blank)*
- **Publish directory**: `.` (root directory)

---

## 💻 Local Development

No `npm install`, compiler, or runtime setup is required:

```bash
# Clone the repository
git clone https://github.com/raghavendra-exp/prepself.git
cd prepself

# Run locally using any simple HTTP server
python -m http.server 8080
# or with npx
npx serve .
```

Open `http://localhost:8080` in your web browser.

---

## 🧪 Quality, SEO & Automated CI/CD Pipeline

The repository includes a strict pre-deployment audit pipeline that runs on every `push` and `pull_request` via GitHub Actions (`.github/workflows/deploy.yml`):

```bash
# 1. Run SEO, Canonicals & Quality Audit (titles, descriptions, OpenGraph, tags)
python scripts/audit.py

# 2. Verify Single Source of Truth Synchronization (site.json)
python scripts/stamp_site.py --check

# 3. Generate & Verify git-history-backed sitemap.xml (116 verified URLs)
python scripts/generate_sitemap.py

# 4. Validate JavaScript Syntax across all scripts
node --check js/nav.js js/quiz.js js/studio.js sw.js
```

---

## ♿ Accessibility (A11y) & Performance Standards

- **Semantic HTML5**: Strict single `<h1>` hierarchy per page with logical `<h2>`/`<h3>` nesting, `<section>`, `<nav>`, `<aside>`, and `<footer>`.
- **WCAG AAA/AA Contrast**: High-contrast theme tokens for both light and dark modes with dedicated styling for native form controls (`<select>`, `<option>`).
- **Zero Cumulative Layout Shift (CLS)**: All SVGs and images declare explicit dimensions (`width`, `height`).
- **Keyboard Navigation**: Universal Spotlight (<kbd>Ctrl+K</kbd> / <kbd>⌘K</kbd>), modal dismissal (<kbd>Esc</kbd>), and explicit `aria-label` attributes on icon-only controls.
- **Portability**: 100% relative paths (`./css/...`, `js/...`), ensuring zero broken assets whether deployed on a subpath (`raghavendra-exp.github.io/prepself/`) or custom domain (`prepself.in`).

---

## 🤝 Contributing

We welcome contributions from educators, students, and open-source developers!
1. Fork the repository and create your feature branch (`git checkout -b feature/topic-mastery`).
2. Adhere to the pure vanilla web standard (no `npm` bundlers or build frameworks).
3. Run `python scripts/audit.py` to ensure zero SEO, canonical, or markup regressions.
4. Submit a Pull Request. Detailed guidelines are in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📜 Copyright & Open Access

Designed and maintained for self-studying aspirants across India. 100% free forever, zero sign-up walls, and zero advertising clutter. Released under the [MIT License](LICENSE).
