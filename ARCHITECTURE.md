# PrepSelf Architecture & System Design

## Overview

**PrepSelf** is a **zero-backend, JSON-driven, Progressive Web App (PWA)** ecosystem for Indian competitive exam preparation. All 27 interactive master suites, AI prompt generators, and mock simulators are **self-contained, stateless, and deployable on any static host** (GitHub Pages, Vercel, Netlify, S3, Apache/Nginx, or even `file://` locally).

---

## Core Architecture Principles

### 1. **Zero External Dependencies**
- No API calls to external servers
- No database, no authentication, no backend compute
- All data is **embedded as JSON files** or computed client-side
- Works **100% offline** after first visit (via Service Worker)

### 2. **Data-Driven Module Design**
Each exam suite is powered by a **single JSON file** (`data/*.json`) that drives:
- Content (questions, explanations, roadmaps)
- UI (via client-side templating)
- Search indexing
- Progress tracking (persisted to `localStorage`)

### 3. **Static PWA Architecture**
- Service Worker caches all assets on first visit
- Subsequent visits serve cached content (offline-first)
- User can install as native app via PWA manifest
- Works on desktop (Windows, macOS, Linux), Android, iOS

### 4. **Modular, Embeddable Suites**
Each suite in `/suites/` is **self-contained**:
- Can run as standalone website (`suites/bank-quant/index.html`)
- Can be embedded in main portal via iframe
- Shares common CSS/JS conventions
- No hard dependencies between suites

---

## Directory Structure & Data Flow

```
prepself/
│
├── index.html                          # Main Portal (entry point)
│   ├── Spotlight Search (Ctrl+K)
│   ├── Live Prompt Studio
│   ├── Quick Module Launchers
│   └── Theme Switcher (light/dark/sepia)
│
├── study-modules.html                  # Unified Module Catalog
│   ├── Lists all 27 master suites
│   ├── Instant search & filters
│   ├── Direct iframe launchers
│   └── Responsive grid UI
│
├── all-exam-roadmaps.html              # 80+ Exam Blueprints Explorer
│   ├── 4-phase study structure
│   ├── Phase-wise timeline UI
│   └── Downloadable roadmaps (JSON/PDF)
│
├── quiz-simulator.html                 # CBT Mock Exam Engine
│   ├── 5-option format (A-E)
│   ├── Sectional timers
│   ├── Negative marking logic
│   ├── Step-by-step explanations
│   └── Score analytics
│
├── css/
│   └── modern.css (52 KB)              # Design System
│       ├── CSS Variables (--color-*, --spacing-*)
│       ├── Responsive Grid (@media mobile/tablet/desktop)
│       ├── Theme Tokens (light, dark, sepia)
│       ├── Component Classes (.btn, .card, .modal, etc.)
│       └── Accessibility (focus states, reduced-motion)
│
├── js/
│   ├── nav.js (42 KB)                  # Universal Navigation
│   │   ├── Spotlight search implementation
│   │   ├── Theme switching logic
│   │   ├── Floating calculator
│   │   ├── PWA installation prompt
│   │   ├── Keyboard shortcuts (Ctrl+K, Esc, etc.)
│   │   └── localStorage persistence
│   │
│   ├── quiz.js (23 KB)                 # Mock Exam Engine
│   │   ├── Question rendering
│   │   ├── Timer logic
│   │   ├── Answer validation
│   │   ├── Score calculation (with negative marking)
│   │   ├── Result analytics
│   │   └── localStorage checkpoint saving
│   │
│   ├── studio.js (8 KB)                # Prompt Studio
│   │   ├── Live prompt template editing
│   │   ├── Copy-to-clipboard functionality
│   │   └── Exam context switching
│   │
│   ├── floating-chatbot.js             # Chatbot Integration Stub
│   └── visitor-counter.js              # Analytics Tracking
│
├── modules/                            # 27 Syllabus & Reference Guides
│   ├── defence.html                    # Defence exam reference
│   ├── bank-quant.html                 # Banking quant syllabus
│   ├── ...
│   └── upsc-gs1.html                   # UPSC General Studies reference
│
├── suites/                             # 27 SELF-CONTAINED MASTER SUITES
│   │
│   ├── bank-quant/
│   │   ├── index.html                  # Suite entry point
│   │   ├── css/
│   │   │   └── styles.css              # Suite-specific overrides
│   │   ├── js/
│   │   │   ├── data.js                 # Load & cache JSON data
│   │   │   ├── app.js                  # Main app logic
│   │   │   ├── search.js               # Client-side search index
│   │   │   └── export.js               # Download/share functionality
│   │   └── data/
│   │       ├── chapters.json           # Syllabus + problem sets
│   │       ├── shortcuts.json          # Vedic maths shortcuts
│   │       ├── formulas.json           # Quick reference formulas
│   │       └── practice-sets.json      # Topic-wise MCQs
│   │
│   ├── history-of-india/
│   │   ├── index.html
│   │   ├── timeline.html               # Master timeline explorer
│   │   ├── map.html                    # Interactive historical atlas
│   │   ├── practice.html               # UPSC Prelims/Mains MCQs
│   │   ├── art-culture.html            # Art & heritage deep-dive
│   │   ├── society.html                # Indian society topical
│   │   ├── css/style.css               # "Stone & Ink" theme
│   │   ├── js/
│   │   │   ├── data.js                 # 89-period history dataset
│   │   │   ├── timeline.js             # Timeline rendering engine
│   │   │   ├── period.js               # Dynamic period.html?id=X
│   │   │   ├── search.js               # Full-text search
│   │   │   └── app.js                  # Dark mode, nav, etc.
│   │   ├── data/
│   │   │   ├── history.json            # 77 periods, 5 world history pages
│   │   │   │                           # Each period: id, title, dateRange,
│   │   │   │                           # phases[], events[], people[],
│   │   │   │                           # women[], upsc{}, aspects{}
│   │   │   └── external-links.json     # Keyword → encyclopedic URL map
│   │   └── assets/images/              # 17 infographic PNGs
│   │
│   ├── daily-editorial-hub/
│   │   ├── index.html
│   │   ├── css/styles.css              # Reader mode styles
│   │   ├── js/app.js                   # Editorial UI + TTS
│   │   ├── data/
│   │   │   └── editorials.json         # Daily fetched & enriched
│   │   └── scripts/
│   │       └── fetch_editorials.py     # GitHub Actions cron task
│   │
│   ├── defence-exams-india/
│   ├── engineering-entrance-master/    # JEE prep
│   ├── gs2-master/                     # Polity & Governance
│   ├── gs3-master/                     # Economy & Science
│   ├── gs4-master/                     # Ethics & Case Studies
│   ├── law-entrance-master/            # CLAT/AILET
│   ├── mba-entrance-master/            # CAT/XAT/SNAP
│   ├── neet-master/                    # Medical entrance
│   ├── professional-certifications-india/  # CA/CS/CFA/ACCA
│   ├── rrb-master-india/               # Railway exams
│   ├── ssc-master-india/               # SSC exams
│   ├── up-teacher-master/              # UP teacher recruitment
│   ├── upprpb-master/                  # UP Police exams
│   ├── uppsc-ro-aro-master/            # UPPSC civil services
│   └── ... [8 more suites]
│
├── hi/                                 # Hindi Language Edition
│   ├── index.html                      # Hindi portal
│   ├── study-modules-hi.html
│   └── ... [state-specific modules]
│
├── icons/                              # PWA Icons (192x192, 512x512)
├── images/                             # OpenGraph & social share assets
│
├── .github/workflows/
│   ├── deploy.yml                      # GitHub Pages auto-deploy
│   └── daily-editorial-fetch.yml       # Morning editorial update cron
│
├── .nojekyll                           # Disable Jekyll on GitHub Pages
├── manifest.webmanifest                # PWA app manifest
├── sw.js                               # Service Worker (offline caching)
├── robots.txt                          # SEO directives
├── sitemap.xml                         # SEO sitemap
│
└── README.md, CONTRIBUTING.md,
    LICENSE, SECURITY.md, etc.          # Documentation
```

---

## Data Model Deep Dive

### Example: History of India Suite (`data/history.json`)

```json
{
  "periods": [
    {
      "id": "mauryan-empire",
      "order": 5,
      "title": "The Mauryan Empire",
      "dateRange": "c. 322 – 185 BCE",
      "category": "ancient",
      "tagline": "One of the greatest empires of Ancient India",
      "heroImg": "mauryan_empire_2.png",
      "sourceImages": ["mauryan_empire.png", "mauryan_empire_2.png"],
      
      "overview": "Detailed 250-word narrative about the empire's rise, significance...",
      
      "phases": [
        {
          "name": "Chandragupta's Reign",
          "range": "322–298 BCE",
          "points": ["Defeated Nanda dynasty...", "Established capital at Pataliputra..."]
        }
      ],
      
      "aspects": {
        "Political Administration": [
          "Chakravartin concept (universal monarch)",
          "Mauryan bureaucracy: Mantri, Purohita, etc."
        ],
        "Economy": [
          "Trade routes: Silk Road connections",
          "Taxation system under Chandragupta"
        ]
      },
      
      "events": [
        {
          "year": "322 BCE",
          "title": "Chandragupta defeats Nandas",
          "theme": "polity",
          "desc": "Chandragupta Maurya overthrows the Nanda dynasty..."
        }
      ],
      
      "people": [
        {
          "name": "Chandragupta Maurya",
          "role": "Founder",
          "note": "With Kautilya's strategic guidance..."
        }
      ],
      
      "women": [
        {
          "name": "Acharya Danda-niti",
          "role": "Advisor",
          "note": "Played role in administrative reforms"
        }
      ],
      
      "themes": ["polity", "war", "religion", "economy"],
      
      "upsc": {
        "prelims": ["Mauryan administration structure...", "Key figures..."],
        "mains": ["Analyze the Mauryan Empire's political structure...", "Compare..."]
      },
      
      "quickFacts": [
        ["Founder", "Chandragupta Maurya"],
        ["Capital", "Pataliputra"],
        ["Duration", "137 years"],
        ["Area", "~5 million km²"]
      ]
    }
  ],
  
  "metadata": {
    "totalPeriods": 77,
    "nationalPeriods": 49,
    "statePeriods": 28,
    "lastUpdated": "2026-10-06"
  }
}
```

**Why this JSON structure?**
- **Normalization:** Each period is self-contained; add new period = add 1 object
- **Cross-referencing:** `themes`, `people` arrays enable reverse indexing for knowledge graph
- **Flexibility:** New fields (e.g., `"videoUrl"`, `"audioExplanation"`) auto-extend all periods
- **Offline-ready:** Entire dataset loads once; no follow-up fetches needed

---

## localStorage Schema & State Persistence

The browser's `localStorage` persists the following without any backend:

```javascript
// Theme & UI Preferences
localStorage.setItem('theme', 'dark');              // 'light' | 'dark' | 'sepia'
localStorage.setItem('fontSize', '16');            // User's readable font size
localStorage.setItem('sidebarCollapsed', 'true');  // UI state

// Progress Tracking (per exam suite)
localStorage.setItem('progress_bank-quant', JSON.stringify({
  completedTopics: ['simplification', 'percentages'],
  bookmarkedQuestions: [42, 87, 156],
  lastVisited: '2026-10-06T14:30:00Z',
  averageScore: 68.5,
  totalAttempts: 12
}));

localStorage.setItem('progress_history-of-india', JSON.stringify({
  visitedPeriods: ['mauryan-empire', 'gupta-age'],
  bookmarkedEvents: ['mauryan_322_bce', 'ashoka_conversion'],
  upscModeEnabled: true,
  themePreference: 'dark'
}));

// Quiz Simulator Progress
localStorage.setItem('quiz_session_12345', JSON.stringify({
  examName: 'IBPS Clerk Pre 2026 Mock 1',
  startTime: '2026-10-06T14:00:00Z',
  endTime: '2026-10-06T15:30:00Z',
  totalQuestions: 100,
  answered: 89,
  notAnswered: 11,
  correct: 72,
  incorrect: 17,
  score: 286,
  maxScore: 400,
  sectionWiseScores: { "Reasoning": 98, "Quant": 96, "English": 92 }
}));

// Bookmarks & Favorites
localStorage.setItem('bookmarks', JSON.stringify({
  articles: ['history_maurya_1', 'gs3_economy_2'],
  questions: ['bank_quant_42', 'ssc_reasoning_156'],
  prompts: ['upsc_gs1_4phase_mock']
}));

// Search History
localStorage.setItem('searchHistory', JSON.stringify([
  'Mauryan administration',
  'Bank quant percentage problems',
  'UPSC 4-phase study plan'
]));

// Visitor Analytics (anonymous)
localStorage.setItem('visitor_stats', JSON.stringify({
  firstVisit: '2026-09-01',
  totalSessions: 45,
  totalMinutesSpent: 3420,
  favoriteModules: ['history-of-india', 'bank-quant'],
  lastVisit: '2026-10-06T14:30:00Z'
}));
```

**Export/Import Workflow:**
Users can export all progress as a **JSON file** and re-import it on another device:
```javascript
// Export
const allProgress = {};
for (let key in localStorage) {
  allProgress[key] = localStorage.getItem(key);
}
downloadJSON(allProgress, 'prepself-backup.json');

// Import (on another device)
importJSON('prepself-backup.json');
for (let key in importedData) {
  localStorage.setItem(key, importedData[key]);
}
```

---

## Service Worker & Offline Strategy

**File:** `sw.js` (1.9 KB)

```javascript
const CACHE_VERSION = 'prepself-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/css/modern.css',
  '/js/nav.js',
  '/js/quiz.js',
  '/manifest.webmanifest',
  // ... all critical assets
];

// Install: Pre-cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_VERSION) return caches.delete(name);
        })
      );
    })
  );
});

// Fetch: Serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response; // Cache hit
      
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        
        // Cache new responses for next visit
        const cloneResponse = response.clone();
        caches.open(CACHE_VERSION).then((cache) => {
          cache.put(event.request, cloneResponse);
        });
        
        return response;
      });
    })
    .catch(() => {
      // Offline fallback (optional: serve cached offline.html)
      return caches.match('/offline.html');
    })
  );
});
```

**Offline Experience:**
1. **First visit:** Download ~500 KB of assets to cache
2. **Subsequent visits (online):** Serve from cache instantly; sync new content in background
3. **Offline:** Full app works with cached data; changes saved to `localStorage`
4. **Re-online:** Sync changes back to GitHub via workflow (if needed)

---

## Adding a New Master Suite

### Step 1: Create Directory Structure
```bash
mkdir -p suites/my-new-exam/css suites/my-new-exam/js suites/my-new-exam/data
```

### Step 2: Create `index.html` (Entry Point)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My New Exam Master Suite</title>
  <link rel="stylesheet" href="../../css/modern.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <nav id="nav"></nav>
  <main>
    <h1>My New Exam Suite</h1>
    <div id="app"></div>
  </main>
  
  <script src="../../js/nav.js"></script>
  <script src="js/data.js"></script>
  <script src="js/search.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

### Step 3: Create `data/*.json` Files
```json
{
  "topics": [
    {
      "id": "topic-1",
      "name": "Introduction to Topic",
      "content": "...",
      "subtopics": ["sub1", "sub2"],
      "keyPoints": ["...", "..."],
      "mcqs": [
        {
          "id": "q1",
          "question": "...",
          "options": ["A", "B", "C", "D", "E"],
          "correctAnswer": "A",
          "explanation": "...",
          "difficulty": "easy",
          "tags": ["concept", "pyq-2025"]
        }
      ]
    }
  ]
}
```

### Step 4: Create `js/app.js` (Main Logic)
```javascript
class MyExamSuite {
  constructor() {
    this.data = null;
    this.searchIndex = [];
    this.loadData();
  }
  
  async loadData() {
    const response = await fetch('data/topics.json');
    this.data = await response.json();
    this.buildSearchIndex();
    this.render();
  }
  
  buildSearchIndex() {
    this.data.topics.forEach(topic => {
      this.searchIndex.push({
        id: topic.id,
        title: topic.name,
        content: topic.content,
        type: 'topic'
      });
    });
  }
  
  render() {
    // Render UI based on this.data
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MyExamSuite();
});
```

### Step 5: Register in `study-modules.html`
```html
<div class="suite-card" data-id="my-new-exam">
  <h3>My New Exam Master Suite</h3>
  <p>Comprehensive coverage of...</p>
  <a href="suites/my-new-exam/" class="btn btn-primary">Launch Suite</a>
</div>
```

---

## Client-Side Search & Indexing

Each suite builds a **full-text search index** at load time (no backend):

```javascript
// Build index during data load
const searchIndex = data.topics.flatMap(topic => [
  { id: `topic_${topic.id}`, type: 'topic', title: topic.name, text: topic.content },
  ...topic.mcqs.map(mcq => ({
    id: `q_${mcq.id}`,
    type: 'question',
    title: mcq.question,
    text: mcq.explanation
  }))
]);

// Simple search (substring match)
function search(query) {
  const q = query.toLowerCase();
  return searchIndex.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.text.toLowerCase().includes(q)
  );
}

// Advanced search (regex-based for topics/tags)
function advancedSearch(query, filters = {}) {
  let results = searchIndex;
  
  if (filters.type) {
    results = results.filter(r => r.type === filters.type);
  }
  
  if (filters.difficulty) {
    results = results.filter(r => r.difficulty === filters.difficulty);
  }
  
  return results.filter(item =>
    query.split(' ').every(term =>
      item.text.toLowerCase().includes(term.toLowerCase())
    )
  );
}

// Spotlight search (Ctrl+K, indexed by title)
class SpotlightSearch {
  constructor(index) {
    this.index = index;
    this.selectedIndex = -1;
  }
  
  filterByQuery(query) {
    return this.index.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  render(query) {
    const filtered = this.filterByQuery(query);
    return filtered.slice(0, 8).map((item, idx) => ({
      ...item,
      isSelected: idx === this.selectedIndex
    }));
  }
  
  navigate(direction) {
    const filtered = this.filterByQuery(this.currentQuery);
    this.selectedIndex = Math.max(-1, Math.min(this.selectedIndex + direction, filtered.length - 1));
  }
  
  selectCurrent() {
    const filtered = this.filterByQuery(this.currentQuery);
    return filtered[this.selectedIndex];
  }
}
```

---

## CSS Architecture & Theming

**File:** `css/modern.css` (52 KB)

```css
/* 1. DESIGN TOKENS (CSS Variables) */
:root {
  /* Colors */
  --color-primary: #2563eb;      /* Indigo */
  --color-primary-dark: #1e40af;
  --color-text: #1f2937;         /* Slate */
  --color-bg: #ffffff;
  --color-bg-secondary: #f3f4f6;
  --color-border: #e5e7eb;
  --color-success: #16a34a;
  --color-warning: #ea580c;
  --color-error: #dc2626;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.5rem;
  
  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 20px 25px rgba(0,0,0,0.15);
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}

/* 2. LIGHT THEME (Default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
}

/* 3. DARK THEME */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f3f4f6;
    --text-secondary: #d1d5db;
  }
}

/* 4. SEPIA THEME (Paper-like) */
[data-theme="sepia"] {
  --bg-primary: #f5e6d3;
  --bg-secondary: #ede0d0;
  --text-primary: #3e3e3e;
  --color-primary: #a0522d;  /* Sienna */
}

/* 5. RESPONSIVE TYPOGRAPHY */
@media (max-width: 768px) {
  :root {
    --font-size-lg: 1rem;
    --font-size-xl: 1.25rem;
  }
}

/* 6. COMPONENT STYLES */
.btn {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
  transition: all 200ms ease;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}

/* 7. ACCESSIBILITY */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Performance & Optimization

### Asset Size Limits
| Asset | Target | Current | Status |
|-------|--------|---------|--------|
| CSS (modern.css) | <60 KB | 52 KB | ✅ |
| JS (nav.js) | <50 KB | 42 KB | ✅ |
| Index.html (compressed) | <400 KB | 361 KB | ✅ |
| Total initial load (cached) | <1 MB | ~204 MB* | 🟡 |

*Note: 204 MB includes all 27 suites + assets. First load downloads only critical path; rest lazy-loaded.*

### Lighthouse Targets
- **Performance:** >90
- **Accessibility:** >95
- **Best Practices:** >95
- **SEO:** >95

### Optimization Strategies
1. **Code Splitting:** Each suite loads independently
2. **Lazy Loading:** Images use `loading="lazy"`
3. **CSS Minification:** Remove comments, compress variables
4. **Asset Compression:** Gzip/Brotli on deployment
5. **HTTP Caching:** Long-lived cache headers for static assets

---

## Deployment Pipeline

### GitHub Actions Workflow: `deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

### Daily Editorial Auto-Update: `daily-editorial-fetch.yml`
```yaml
name: Daily Editorial Fetch & Deploy

on:
  schedule:
    - cron: '0 1 * * *'  # 6:30 AM IST
  workflow_dispatch:      # Manual trigger

jobs:
  fetch-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: |
          pip install feedparser requests beautifulsoup4
      
      - name: Fetch editorials
        run: |
          cd suites/daily-editorial-hub
          python scripts/fetch_editorials.py
      
      - name: Commit changes
        run: |
          git config user.name "PrepSelf Bot"
          git config user.email "bot@prepself.in"
          git add suites/daily-editorial-hub/data/editorials.json
          git commit -m "chore: auto-update daily editorials" || echo "No changes"
          git push
```

---

## Security & Privacy

### Data Ownership
- **All data is user-owned:** Stored in browser's `localStorage`, not sent to external servers
- **No tracking:** Visitor counter uses optional local analytics only
- **No ads:** 100% free forever, no ad networks
- **Open source:** All code auditable on GitHub

### API Security (None)
- **Zero API calls:** This is the entire security model
- **No authentication needed:** Works as anonymous user
- **HTTPS enforced:** GitHub Pages & custom domains auto-HTTPS

---

## Future Architecture Enhancements

### 1. **Cloud Sync (Optional)**
Add Firebase Realtime Database for optional cross-device sync:
```javascript
// Opt-in sync to Firebase
if (user.enableCloudSync) {
  firebase.database().ref(`users/${userId}/progress`).set(localStorage.getItem('progress_*'));
}
```

### 2. **Collaborative Features**
Group study features:
- Share quiz results with study group
- Collaborative note-taking (via GitHub Gists)
- Discussion board (via GitHub Discussions)

### 3. **AI Integration**
Enhanced AI features:
- Explain concept via Claude API (optional)
- Personalized study recommendation engine
- Auto-generated practice questions

### 4. **Internationalization (i18n)**
Multi-language support:
- Hindi (`/hi/`)
- Regional languages (Tamil, Telegu, Marathi, etc.)

---

## Summary

**PrepSelf's architecture is optimized for:**
1. ✅ **Zero dependencies:** Works offline, deployable anywhere
2. ✅ **Scalability:** Add new suites without touching core code
3. ✅ **Performance:** All data loaded once; no ongoing API calls
4. ✅ **Privacy:** 100% user-controlled, no data leaving device
5. ✅ **Accessibility:** Semantic HTML, keyboard navigation, theme support
6. ✅ **SEO:** Static, crawler-friendly, sitemaps included

This makes PrepSelf a **sustainable, long-term platform** for Indian exam preparation.

---

**For implementation details, refer to:**
- `MODULE_TEMPLATE.md` — How to add a new exam suite
- `js/nav.js` — Search, calculator, PWA logic
- `suites/*/data/` — Data model examples
- `.github/workflows/` — Deployment & automation
