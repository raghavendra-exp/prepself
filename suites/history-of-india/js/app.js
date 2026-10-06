/* Shared across every page — Complete History of India. */

/* ---------- Theme (dark mode) ---------- */
(function initTheme(){
  const saved = localStorage.getItem('chi-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
})();

function toggleTheme(){
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark){ document.documentElement.removeAttribute('data-theme'); localStorage.setItem('chi-theme','light'); }
  else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('chi-theme','dark'); }
  updateThemeIcon();
}
function updateThemeIcon(){
  const btn = document.getElementById('themeToggle');
  const dbtn = document.getElementById('drawerThemeToggle');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = isDark
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/></svg>';
  if (btn) {
    btn.innerHTML = icon;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (dbtn) {
    dbtn.innerHTML = `${icon} <span>${isDark ? 'Light Mode' : 'Dark Mode'}</span>`;
  }
}

/* ---------- UPSC Mode ---------- */
(function initUpsc(){
  const on = localStorage.getItem('chi-upsc') === '1';
  if (on) document.body.classList.add('upsc-on');
})();
function toggleUpsc(){
  const on = document.body.classList.toggle('upsc-on');
  localStorage.setItem('chi-upsc', on ? '1' : '0');
  const btn = document.getElementById('upscToggle');
  const dbtn = document.getElementById('drawerUpscToggle');
  if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  if (dbtn) dbtn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

/* ---------- Nav / Footer injection ---------- */
function currentPage(){
  const p = location.pathname.split('/').pop() || 'index.html';
  return p;
}

const SUBJECT_TABS = [
  { id: 'ancient', label: 'Ancient India', icon: '🏛️', href: 'timeline.html?era=ancient' },
  { id: 'medieval', label: 'Medieval India', icon: '⚔️', href: 'timeline.html?era=medieval' },
  { id: 'colonial', altIds: ['modern'], label: 'Modern & Freedom', icon: '🇮🇳', href: 'timeline.html?era=colonial' },
  { id: 'independent', altIds: ['post', 'post-independence'], label: 'Post-Independence', icon: '🕊️', href: 'timeline.html?era=independent' },
  { id: 'world', label: 'World History', icon: '🌍', href: 'timeline.html?era=world' },
  { id: 'art-culture', label: 'Art & Culture', icon: '🎨', href: 'art-culture.html', badge: 'New' },
  { id: 'society', label: 'Indian Society', icon: '👥', href: 'society.html', badge: 'New' },
  { id: 'up', label: 'UP History', icon: '🏛️', href: 'up-history.html' },
  { id: 'map', label: 'Map Lab', icon: '🗺️', href: 'map.html' },
  { id: 'practice', label: 'UPSC Hub', icon: '🎯', href: 'practice.html', badge: '551 Qs' },
  { id: 'books', label: '15 Textbooks', icon: '📚', href: 'books.html', badge: 'Expanded' },
  { id: 'themes', label: 'Themes', icon: '🏷️', href: 'themes.html' },
  { id: 'people', label: 'People', icon: '👤', href: 'people.html' },
  { id: 'women', label: 'Women', icon: '👑', href: 'women.html' },
  { id: 'graph', label: 'Graph', icon: '🕸️', href: 'graph.html' }
];

const PAGE_TITLE_MAP = {
  'index.html': 'Home',
  'timeline.html': 'Timeline',
  'map.html': 'Map Lab',
  'practice.html': 'UPSC Hub',
  'art-culture.html': 'Art & Culture',
  'society.html': 'Indian Society',
  'books.html': '15 Textbooks',
  'up-history.html': 'UP History',
  'themes.html': 'Themes',
  'people.html': 'People',
  'women.html': 'Women in History',
  'graph.html': 'Knowledge Graph',
  'about.html': 'About',
  'search.html': 'Search',
  'period.html': 'Period Detail'
};

function renderNav(active){
  const el = document.getElementById('siteNav');
  if (!el) return;

  const currentLabel = PAGE_TITLE_MAP[active] || 'Overview';

  el.innerHTML = `
    <div class="nav-inner">
      <div class="nav-left-cluster">
        <button class="sidebar-toggle-btn" id="sidebarToggle" onclick="toggleSidebar()" aria-label="Toggle vertical navigation sidebar" title="Toggle Sidebar (Ctrl+B)">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="9" y1="3" x2="9" y2="21"/>
          </svg>
        </button>

        <a href="index.html" class="brand" title="Complete History of India — Home">
          <svg class="mark" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/><path d="M16 6v20M8 12h16M8 20h16" stroke="currentColor" stroke-width="1.4" opacity=".6"/></svg>
          <span class="brand-title">History of India</span>
        </a>

        <!-- Header Breadcrumb Trail -->
        <nav class="header-breadcrumb" id="headerBreadcrumb" aria-label="Breadcrumb">
          <span class="hbc-sep">/</span>
          <a href="index.html" class="hbc-item hbc-home" title="Go to Atlas Home">Home</a>
          <span class="hbc-sep">/</span>
          <span class="hbc-item hbc-current" id="hbcCurrent">${currentLabel}</span>
        </nav>
      </div>

      <div class="nav-tools">
        <button class="spotlight-btn" onclick="openSpotlight()" title="Search anything (Ctrl+K)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <span class="spotlight-label">Search</span>
          <kbd class="spotlight-kbd">⌘K</kbd>
        </button>
        <button class="icon-btn calc-btn" onclick="openCalculator()" title="Quick Era &amp; Number Calculator" aria-label="Open Calculator">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>
        </button>
        <button class="upsc-toggle" id="upscToggle" aria-pressed="${document.body.classList.contains('upsc-on')}" onclick="toggleUpsc()" title="Toggle UPSC revision mode">
          <span class="dot"></span> UPSC Mode
        </button>
        <button class="icon-btn" id="themeToggle" onclick="toggleTheme()" aria-label="Toggle dark mode"></button>
      </div>
    </div>`;

  renderSidebar(active);
  renderBottomNav(active);
  highlightActiveSubjectTab();
  initSpotlight();
  initCalculator();
  updateThemeIcon();
}

function renderSidebar(active){
  let sidebar = document.getElementById('siteSidebar');
  if (!sidebar) {
    sidebar = document.createElement('aside');
    sidebar.id = 'siteSidebar';
    sidebar.className = 'site-sidebar';
    sidebar.setAttribute('aria-label', 'Vertical navigation and syllabus breadcrumbs');
    document.body.appendChild(sidebar);
  }

  let backdrop = document.getElementById('sidebarBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'sidebarBackdrop';
    backdrop.className = 'sidebar-backdrop';
    backdrop.onclick = () => toggleSidebar(false);
    document.body.appendChild(backdrop);
  }

  const currentLabel = PAGE_TITLE_MAP[active] || 'Overview';

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="index.html" class="sidebar-brand" title="Complete History of India">
        <svg class="mark" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/><path d="M16 6v20M8 12h16M8 20h16" stroke="currentColor" stroke-width="1.4" opacity=".6"/></svg>
        <div>
          <b class="sb-title">History of India</b>
          <span class="sb-sub">Atlas &amp; UPSC Companion</span>
        </div>
      </a>
      <button class="sidebar-close-btn" onclick="toggleSidebar(false)" aria-label="Close sidebar">&times;</button>
    </div>

    <div class="sidebar-scrollable">
      <!-- Topic & Subject Instant Search Box -->
      <div class="sidebar-search-box">
        <svg class="sb-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="sidebarTopicSearch" placeholder="Filter topics &amp; subjects..." oninput="filterSidebarTopics(this.value)" autocomplete="off">
        <button id="sbSearchClear" class="sb-search-clear" onclick="clearSidebarTopicFilter()" aria-label="Clear filter" style="display:none;">&times;</button>
      </div>

      <!-- 1. Vertical Breadcrumb Component -->
      <div class="vertical-breadcrumb-card" id="verticalBreadcrumbCard">
        <div class="vbc-head">
          <span class="vbc-head-icon">🧭</span>
          <span class="vbc-head-title">Breadcrumb Path</span>
        </div>
        <div class="vbc-tree" id="verticalBreadcrumb">
          <div class="vbc-node is-root">
            <span class="vbc-rail"></span>
            <span class="vbc-bullet"></span>
            <span class="vbc-content"><a href="index.html" class="vbc-link">🏠 Home</a></span>
          </div>
          <div class="vbc-node is-current">
            <span class="vbc-rail"></span>
            <span class="vbc-bullet"></span>
            <span class="vbc-content"><span class="vbc-label">${currentLabel}</span></span>
          </div>
        </div>
      </div>

      <!-- 2. Core Eras (Chronology) -->
      <div class="sidebar-section">
        <div class="sidebar-sec-title">Core Eras (Chronology)</div>
        <nav class="sidebar-nav-list" role="tablist">
          <a href="timeline.html?era=ancient" class="sb-nav-item" data-id="ancient" role="tab" onclick="onSidebarNavClick(event, 'ancient')">
            <span class="sb-icon">🏛️</span>
            <span class="sb-text">Ancient India</span>
          </a>
          <a href="timeline.html?era=medieval" class="sb-nav-item" data-id="medieval" role="tab" onclick="onSidebarNavClick(event, 'medieval')">
            <span class="sb-icon">⚔️</span>
            <span class="sb-text">Medieval India</span>
          </a>
          <a href="timeline.html?era=colonial" class="sb-nav-item" data-id="colonial" data-alt="modern,freedom" role="tab" onclick="onSidebarNavClick(event, 'colonial')">
            <span class="sb-icon">🇮🇳</span>
            <span class="sb-text">Modern &amp; Freedom</span>
          </a>
          <a href="timeline.html?era=independent" class="sb-nav-item" data-id="independent" data-alt="post,post-independence" role="tab" onclick="onSidebarNavClick(event, 'independent')">
            <span class="sb-icon">🕊️</span>
            <span class="sb-text">Post-Independence</span>
          </a>
          <a href="timeline.html?era=world" class="sb-nav-item" data-id="world" data-alt="world-history" role="tab" onclick="onSidebarNavClick(event, 'world')">
            <span class="sb-icon">🌍</span>
            <span class="sb-text">World History</span>
          </a>
        </nav>
      </div>

      <!-- 3. Flagship Modules -->
      <div class="sidebar-section">
        <div class="sidebar-sec-title">Flagship Modules</div>
        <nav class="sidebar-nav-list" role="tablist">
          <a href="art-culture.html" class="sb-nav-item" data-id="art-culture" role="tab">
            <span class="sb-icon">🎨</span>
            <span class="sb-text">Art &amp; Culture</span>
            <span class="sb-badge badge-new">New</span>
          </a>
          <a href="society.html" class="sb-nav-item" data-id="society" role="tab">
            <span class="sb-icon">👥</span>
            <span class="sb-text">Indian Society</span>
            <span class="sb-badge badge-new">New</span>
          </a>
          <a href="up-history.html" class="sb-nav-item" data-id="up" role="tab">
            <span class="sb-icon">🏛️</span>
            <span class="sb-text">UP History (UPPSC)</span>
          </a>
        </nav>
      </div>

      <!-- 4. UPSC GS-1 Core Syllabus Topics -->
      <div class="sidebar-section">
        <div class="sidebar-sec-title">UPSC GS-1 Syllabus Topics</div>
        <nav class="sidebar-nav-list" role="tablist">
          <a href="art-culture.html#art-forms" class="sb-nav-item sb-subtopic" data-id="art-forms" data-alt="art,paintings,dance,music" role="tab">
            <span class="sb-icon">🎨</span>
            <span class="sb-text">Visual &amp; Performing Arts</span>
          </a>
          <a href="art-culture.html#architecture" class="sb-nav-item sb-subtopic" data-id="architecture" data-alt="temple,caves,stupa" role="tab">
            <span class="sb-icon">🏛️</span>
            <span class="sb-text">Temple &amp; Cave Architecture</span>
          </a>
          <a href="art-culture.html#literature" class="sb-nav-item sb-subtopic" data-id="literature" data-alt="vedic,sangam,literature" role="tab">
            <span class="sb-icon">📜</span>
            <span class="sb-text">Classical Literature</span>
          </a>
          <a href="timeline.html?era=colonial" class="sb-nav-item sb-subtopic" data-id="colonial" data-alt="modern,freedom,british,1857" role="tab" onclick="onSidebarNavClick(event, 'colonial')">
            <span class="sb-icon">⚔️</span>
            <span class="sb-text">Modern History (Mid-18th C.)</span>
          </a>
          <a href="timeline.html?era=colonial" class="sb-nav-item sb-subtopic" data-id="colonial" data-alt="freedom,congress,gandhi,ina" role="tab" onclick="onSidebarNavClick(event, 'colonial')">
            <span class="sb-icon">🇮🇳</span>
            <span class="sb-text">Freedom Struggle &amp; Stages</span>
          </a>
          <a href="women.html" class="sb-nav-item sb-subtopic" data-id="women" data-alt="women,freedom,reformers" role="tab">
            <span class="sb-icon">👑</span>
            <span class="sb-text">Women Freedom Contributors</span>
          </a>
          <a href="timeline.html?era=independent" class="sb-nav-item sb-subtopic" data-id="independent" data-alt="post,integration,states" role="tab" onclick="onSidebarNavClick(event, 'independent')">
            <span class="sb-icon">🕊️</span>
            <span class="sb-text">Post-Independence Consolidation</span>
          </a>
          <a href="timeline.html?era=independent" class="sb-nav-item sb-subtopic" data-id="independent" data-alt="post,reorganization,linguistic" role="tab" onclick="onSidebarNavClick(event, 'independent')">
            <span class="sb-icon">🗺️</span>
            <span class="sb-text">Linguistic Reorganization</span>
          </a>
          <a href="timeline.html?era=world" class="sb-nav-item sb-subtopic" data-id="world" data-alt="world,revolution,wars" role="tab" onclick="onSidebarNavClick(event, 'world')">
            <span class="sb-icon">🌍</span>
            <span class="sb-text">World History (18th C. Onward)</span>
          </a>
          <a href="timeline.html?era=world" class="sb-nav-item sb-subtopic" data-id="world" data-alt="industrial,revolution,world war" role="tab" onclick="onSidebarNavClick(event, 'world')">
            <span class="sb-icon">⚙️</span>
            <span class="sb-text">Industrial Revolution &amp; Wars</span>
          </a>
          <a href="timeline.html?era=world" class="sb-nav-item sb-subtopic" data-id="world" data-alt="communism,capitalism,socialism" role="tab" onclick="onSidebarNavClick(event, 'world')">
            <span class="sb-icon">📖</span>
            <span class="sb-text">Political Philosophies</span>
          </a>
          <a href="society.html#diversity" class="sb-nav-item sb-subtopic" data-id="society" data-alt="diversity,society,culture" role="tab">
            <span class="sb-icon">🇮🇳</span>
            <span class="sb-text">Diversity &amp; Salient Features</span>
          </a>
          <a href="society.html#women" class="sb-nav-item sb-subtopic" data-id="society" data-alt="women,organizations,shg" role="tab">
            <span class="sb-icon">👩</span>
            <span class="sb-text">Women &amp; Women's Orgs</span>
          </a>
          <a href="society.html#demography" class="sb-nav-item sb-subtopic" data-id="society" data-alt="population,demography,census" role="tab">
            <span class="sb-icon">👥</span>
            <span class="sb-text">Population &amp; Demographics</span>
          </a>
          <a href="society.html#poverty" class="sb-nav-item sb-subtopic" data-id="society" data-alt="poverty,development,hunger" role="tab">
            <span class="sb-icon">📉</span>
            <span class="sb-text">Poverty &amp; Development</span>
          </a>
          <a href="society.html#urbanization" class="sb-nav-item sb-subtopic" data-id="society" data-alt="urbanization,slums,smart cities" role="tab">
            <span class="sb-icon">🏙️</span>
            <span class="sb-text">Urbanization &amp; Remedies</span>
          </a>
          <a href="society.html#globalization" class="sb-nav-item sb-subtopic" data-id="society" data-alt="globalization,culture,economy" role="tab">
            <span class="sb-icon">🌐</span>
            <span class="sb-text">Effects of Globalization</span>
          </a>
          <a href="society.html#empowerment" class="sb-nav-item sb-subtopic" data-id="society" data-alt="empowerment,sc,st,obc" role="tab">
            <span class="sb-icon">✊</span>
            <span class="sb-text">Social Empowerment</span>
          </a>
          <a href="society.html#communalism" class="sb-nav-item sb-subtopic" data-id="society" data-alt="communalism,secularism,regionalism" role="tab">
            <span class="sb-icon">🕊️</span>
            <span class="sb-text">Communalism &amp; Secularism</span>
          </a>
        </nav>
      </div>

      <!-- 5. UPSC Study & Companions -->
      <div class="sidebar-section">
        <div class="sidebar-sec-title">UPSC Study &amp; Companions</div>
        <nav class="sidebar-nav-list" role="tablist">
          <a href="practice.html" class="sb-nav-item" data-id="practice" role="tab">
            <span class="sb-icon">🎯</span>
            <span class="sb-text">UPSC Practice Hub</span>
            <span class="sb-badge badge-count">551 Qs</span>
          </a>
          <a href="books.html" class="sb-nav-item" data-id="books" data-alt="textbooks,ncert,books,standard" role="tab">
            <span class="sb-icon">📚</span>
            <span class="sb-text">15 Textbooks Hub</span>
            <span class="sb-badge badge-count">15 Books</span>
          </a>
          <a href="books.html#pdf-vault" class="sb-nav-item sb-subtopic" data-id="pdf-vault" data-alt="pdf,download,ncert,epathshala,books,free" role="tab">
            <span class="sb-icon">📥</span>
            <span class="sb-text">Direct PDF Vault (NCERT)</span>
            <span class="sb-badge badge-new">Free</span>
          </a>
          <a href="map.html" class="sb-nav-item" data-id="map" role="tab">
            <span class="sb-icon">🗺️</span>
            <span class="sb-text">Historical Map Lab</span>
            <span class="sb-badge badge-atlas">Atlas</span>
          </a>
        </nav>
      </div>

      <!-- 6. Perspectives & Tools -->
      <div class="sidebar-section">
        <div class="sidebar-sec-title">Perspectives &amp; Tools</div>
        <nav class="sidebar-nav-list" role="tablist">
          <a href="timeline.html" class="sb-nav-item" data-id="timeline" role="tab">
            <span class="sb-icon">⏱️</span>
            <span class="sb-text">Master Timeline</span>
          </a>
          <a href="themes.html" class="sb-nav-item" data-id="themes" role="tab">
            <span class="sb-icon">🏷️</span>
            <span class="sb-text">Themes Explorer</span>
          </a>
          <a href="people.html" class="sb-nav-item" data-id="people" role="tab">
            <span class="sb-icon">👤</span>
            <span class="sb-text">Key Personalities</span>
          </a>
          <a href="women.html" class="sb-nav-item" data-id="women" role="tab">
            <span class="sb-icon">👑</span>
            <span class="sb-text">Women in History</span>
          </a>
          <a href="graph.html" class="sb-nav-item" data-id="graph" role="tab">
            <span class="sb-icon">🕸️</span>
            <span class="sb-text">Knowledge Graph</span>
          </a>
          <a href="search.html" class="sb-nav-item" data-id="search" role="tab">
            <span class="sb-icon">🔍</span>
            <span class="sb-text">Search Atlas</span>
          </a>
          <a href="about.html" class="sb-nav-item" data-id="about" role="tab">
            <span class="sb-icon">ℹ️</span>
            <span class="sb-text">Sources &amp; Method</span>
          </a>
        </nav>
      </div>
    </div>

    <div class="sidebar-footer">
      <button class="sb-tool-btn" onclick="openSpotlight()" title="Search anything (⌘K)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <span>Search (⌘K)</span>
      </button>
      <button class="sb-tool-btn" onclick="openCalculator()" title="Era &amp; Number Calculator">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>
        <span>Calculator</span>
      </button>
    </div>
  `;

  initSidebar();
}

function filterSidebarTopics(val){
  const q = (val || '').toLowerCase().trim();
  const clearBtn = document.getElementById('sbSearchClear');
  if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

  const sections = document.querySelectorAll('.site-sidebar .sidebar-section');
  let matchedCount = 0;

  sections.forEach(sec => {
    const items = sec.querySelectorAll('.sb-nav-item');
    let secHasMatch = false;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const id = (item.getAttribute('data-id') || '').toLowerCase();
      const alt = (item.getAttribute('data-alt') || '').toLowerCase();
      const match = !q || text.includes(q) || id.includes(q) || alt.includes(q);
      item.style.display = match ? 'flex' : 'none';
      if (match) {
        secHasMatch = true;
        matchedCount++;
      }
    });
    sec.style.display = secHasMatch ? 'block' : 'none';
  });

  const scrollable = document.querySelector('.sidebar-scrollable');
  let emptyMsg = document.getElementById('sbEmptyMsg');
  if (!matchedCount && q) {
    if (!emptyMsg && scrollable) {
      emptyMsg = document.createElement('div');
      emptyMsg.id = 'sbEmptyMsg';
      emptyMsg.className = 'sb-empty-msg';
      scrollable.appendChild(emptyMsg);
    }
    if (emptyMsg) {
      emptyMsg.style.display = 'flex';
      emptyMsg.innerHTML = `<span style="font-size:1.1rem;">🔍</span><span>No topics match "<b>${escapeHtml(q)}</b>"</span>`;
    }
  } else if (emptyMsg) {
    emptyMsg.style.display = 'none';
  }
}

function clearSidebarTopicFilter(){
  const input = document.getElementById('sidebarTopicSearch');
  if (input) {
    input.value = '';
    filterSidebarTopics('');
    input.focus();
  }
}

function escapeHtml(s){
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function onSidebarNavClick(e, era){
  const p = location.pathname.split('/').pop() || 'index.html';
  if (p === 'timeline.html' && typeof setEraFilter === 'function') {
    e.preventDefault();
    setEraFilter(era);
    if (window.innerWidth < 1100) toggleSidebar(false);
  } else if (window.innerWidth < 1100) {
    toggleSidebar(false);
  }
}

function initSidebar(){
  const saved = localStorage.getItem('chi-sidebar');
  const isDesktop = window.innerWidth >= 1100;
  const shouldOpen = saved !== null ? saved === 'open' : isDesktop;
  if (!shouldOpen) {
    document.body.classList.add('sidebar-collapsed');
  } else {
    document.body.classList.remove('sidebar-collapsed');
  }
  updateSidebarAria(shouldOpen);

  const sidebarEl = document.getElementById('siteSidebar');
  if (sidebarEl && !sidebarEl._wheelBound && typeof sidebarEl.addEventListener === 'function') {
    sidebarEl._wheelBound = true;
    sidebarEl.addEventListener('wheel', (e) => {
      const scrollable = sidebarEl.querySelector ? sidebarEl.querySelector('.sidebar-scrollable') : null;
      if (scrollable && e.target !== scrollable && (!scrollable.contains || !scrollable.contains(e.target))) {
        scrollable.scrollTop += e.deltaY;
      }
    }, { passive: true });

    // Auto-close sidebar on mobile when navigating
    sidebarEl.addEventListener('click', (e) => {
      const link = e.target && e.target.closest ? e.target.closest('.sb-nav-item, .vbc-link') : null;
      if (link && window.innerWidth < 1100) {
        toggleSidebar(false);
      }
    });
  }
}

function toggleSidebar(forceState){
  const isCollapsed = document.body.classList.contains('sidebar-collapsed');
  const isMobileOpen = document.body.classList.contains('sidebar-open');
  const isDesktop = window.innerWidth >= 1100;

  if (isDesktop) {
    const willOpen = forceState !== undefined ? forceState : isCollapsed;
    if (willOpen) {
      document.body.classList.remove('sidebar-collapsed');
      localStorage.setItem('chi-sidebar', 'open');
    } else {
      document.body.classList.add('sidebar-collapsed');
      localStorage.setItem('chi-sidebar', 'closed');
    }
    updateSidebarAria(willOpen);
  } else {
    const willOpen = forceState !== undefined ? forceState : !isMobileOpen;
    if (willOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    updateSidebarAria(willOpen);
  }
}

function updateSidebarAria(isOpen){
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('siteSidebar');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (sidebar) sidebar.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

// Global shortcut to toggle sidebar (Ctrl+B / ⌘B)
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    toggleSidebar();
  }
});

/* Mobile Slide-out Drawer */
function renderMobileDrawer(active){
  let drawer = document.getElementById('mobileDrawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'mobileDrawer';
    drawer.className = 'mobile-drawer';
    document.body.appendChild(drawer);
  }

  const navItems = [
    { href: 'index.html', label: 'Home', icon: '🏠' },
    { href: 'timeline.html', label: 'Master Timeline', icon: '⏱️' },
    { href: 'timeline.html?era=ancient', label: 'Ancient India', icon: '🏛️' },
    { href: 'timeline.html?era=medieval', label: 'Medieval India', icon: '⚔️' },
    { href: 'timeline.html?era=colonial', label: 'Modern & Freedom', icon: '🇮🇳' },
    { href: 'timeline.html?era=independent', label: 'Post-Independence', icon: '🕊️' },
    { href: 'timeline.html?era=world', label: 'World History', icon: '🌍' },
    { href: 'art-culture.html', label: 'Indian Heritage & Culture', icon: '🎨', badge: 'New' },
    { href: 'society.html', label: 'Indian Society & Issues', icon: '👥', badge: 'New' },
    { href: 'map.html', label: 'Historical Map Lab', icon: '🗺️', badge: 'Atlas' },
    { href: 'practice.html', label: 'UPSC Practice Hub', icon: '🎯', badge: '551 Qs' },
    { href: 'books.html', label: '15 Canonical Textbooks', icon: '📚', badge: 'Expanded' },
    { href: 'up-history.html', label: 'Uttar Pradesh (UPPSC)', icon: '🏛️' },
    { href: 'themes.html', label: 'Themes Explorer', icon: '🏷️' },
    { href: 'people.html', label: 'Key Personalities', icon: '👤' },
    { href: 'women.html', label: 'Women in History', icon: '👑' },
    { href: 'graph.html', label: 'Knowledge Graph', icon: '🕸️' },
    { href: 'search.html', label: 'Search Atlas', icon: '🔍' },
    { href: 'about.html', label: 'Sources & Method', icon: 'ℹ️' }
  ];

  drawer.innerHTML = `
    <div class="drawer-backdrop" onclick="closeMobileDrawer()"></div>
    <div class="drawer-panel">
      <div class="drawer-header">
        <div class="drawer-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/><path d="M16 6v20M8 12h16M8 20h16" stroke="currentColor" stroke-width="1.4" opacity=".6"/></svg>
          <b>History of India</b>
        </div>
        <button class="drawer-close" onclick="closeMobileDrawer()" aria-label="Close menu">&times;</button>
      </div>

      <div class="drawer-search">
        <button class="spotlight-trigger-btn" onclick="closeMobileDrawer(); openSpotlight();">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <span>Search everything (⌘K)...</span>
        </button>
      </div>

      <div class="drawer-links">
        ${navItems.map(item => `
          <a href="${item.href}" class="drawer-link ${active === item.href ? 'active' : ''}" onclick="closeMobileDrawer()">
            <span class="d-icon">${item.icon}</span>
            <span class="d-label">${item.label}</span>
            ${item.badge ? `<span class="badge badge-site badge-freedom" style="font-size:0.65rem; padding:2px 6px;">${item.badge}</span>` : ''}
          </a>
        `).join('')}
      </div>

      <div class="drawer-footer">
        <button class="drawer-tool-btn" id="drawerThemeToggle" onclick="toggleTheme()">
          <span>Toggle Theme</span>
        </button>
        <button class="drawer-tool-btn" onclick="closeMobileDrawer(); openCalculator();">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>
          <span>Era Calculator</span>
        </button>
        <button class="drawer-tool-btn upsc-toggle" id="drawerUpscToggle" onclick="toggleUpsc()">
          <span class="dot"></span> UPSC Mode
        </button>
      </div>
    </div>`;
}

function toggleMobileDrawer(){
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.toggle('open');
}
function closeMobileDrawer(){
  const drawer = document.getElementById('mobileDrawer');
  if (drawer) drawer.classList.remove('open');
}

/* Sticky Mobile Bottom Navigation Ribbon */
function renderBottomNav(active){
  let bnav = document.getElementById('mobileBottomNav');
  if (!bnav) {
    bnav = document.createElement('nav');
    bnav.id = 'mobileBottomNav';
    bnav.className = 'mobile-bottom-nav';
    document.body.appendChild(bnav);
  }

  bnav.innerHTML = `
    <a href="index.html" class="bnav-item ${active==='index.html'?'active':''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </a>
    <a href="timeline.html" class="bnav-item ${active==='timeline.html'?'active':''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span>Timeline</span>
    </a>
    <a href="map.html" class="bnav-item ${active==='map.html'?'active':''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
      <span>Map Lab</span>
    </a>
    <a href="practice.html" class="bnav-item ${active==='practice.html'?'active':''}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      <span>UPSC Hub</span>
    </a>
    <button class="bnav-item" onclick="openSpotlight()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <span>Search</span>
    </button>`;
}

function renderFooter(){
  const el = document.getElementById('siteFooter');
  if (!el) return;
  el.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <h5>Complete History of India</h5>
          <p style="color:var(--ink-soft); font-size:.88rem; max-width:34ch;">An interactive historical atlas and UPSC study companion, built from a curated set of revision-sheet infographics spanning Prehistory to the Delhi Sultanate and modern India.</p>
        </div>
        <div>
          <h5>Explore &amp; Modules</h5>
          <a href="timeline.html">Master Timeline</a>
          <a href="art-culture.html">Indian Heritage &amp; Culture (New)</a>
          <a href="society.html">Indian Society &amp; Issues (New)</a>
          <a href="map.html">Historical Map Lab</a>
          <a href="up-history.html">Uttar Pradesh History (UPPSC)</a>
          <a href="themes.html">Themes</a>
          <a href="people.html">People</a>
          <a href="women.html">Women in History</a>
        </div>
        <div>
          <h5>Study &amp; Practice</h5>
          <a href="practice.html">UPSC Prelims &amp; Mains Hub</a>
          <a href="books.html">15 Canonical Textbooks Hub</a>
          <a href="search.html">Search Atlas</a>
          <a href="graph.html">Knowledge Graph</a>
          <a href="index.html#periods">All Periods</a>
          <a href="index.html#upsc">UPSC Mode</a>
        </div>
        <div>
          <h5>About</h5>
          <a href="about.html">Sources &amp; Method</a>
          <a href="https://github.com/raghavendra-exp/history-of-india" target="_blank" rel="noopener noreferrer">GitHub Repository ↗</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Complete History of India — an educational project. Not an official Government resource.</span>
        <span>Content sourced from supplied revision sheets; external links point to official / encyclopedic sources.</span>
      </div>
    </div>`;
}

function highlightActiveSubjectTab(trail){
  const p = location.pathname.split('/').pop() || 'index.html';
  const urlParams = new URLSearchParams(location.search);
  const eraParam = urlParams.get('era');
  const catParam = urlParams.get('category');
  let era = eraParam || catParam;

  let activeId = '';

  if (p === 'timeline.html') {
    if (era) {
      if (era === 'modern') activeId = 'colonial';
      else if (era === 'post' || era === 'post-independence') activeId = 'independent';
      else activeId = era;
    } else {
      activeId = 'ancient';
    }
  } else if (p === 'art-culture.html') {
    activeId = 'art-culture';
  } else if (p === 'society.html') {
    activeId = 'society';
  } else if (p === 'up-history.html') {
    activeId = 'up';
  } else if (p === 'map.html') {
    activeId = 'map';
  } else if (p === 'practice.html') {
    activeId = 'practice';
  } else if (p === 'books.html') {
    activeId = 'books';
  } else if (p === 'themes.html') {
    activeId = 'themes';
  } else if (p === 'people.html') {
    activeId = 'people';
  } else if (p === 'women.html') {
    activeId = 'women';
  } else if (p === 'graph.html') {
    activeId = 'graph';
  } else if (p === 'period.html') {
    if (trail && trail.length > 1) {
      const catText = (trail[1].label || '').toLowerCase();
      if (catText.includes('ancient')) activeId = 'ancient';
      else if (catText.includes('medieval') || catText.includes('sultanate') || catText.includes('mughal')) activeId = 'medieval';
      else if (catText.includes('colonial') || catText.includes('modern') || catText.includes('freedom')) activeId = 'colonial';
      else if (catText.includes('independent') || catText.includes('post')) activeId = 'independent';
      else if (catText.includes('world')) activeId = 'world';
      else if (catText.includes('up')) activeId = 'up';
    }
  }

  const navItems = document.querySelectorAll('.sb-nav-item, .bc-subject-tab');
  navItems.forEach(tab => {
    const tid = tab.getAttribute('data-id');
    const alts = (tab.getAttribute('data-alt') || '').split(',').filter(Boolean);
    if (tid === activeId || alts.includes(activeId)) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      try {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch(e){}
    } else {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    }
  });
}

function renderBreadcrumb(trail){
  // 1. Update In-Header Breadcrumb Trail
  const headerBc = document.getElementById('headerBreadcrumb');
  if (headerBc && Array.isArray(trail) && trail.length > 0) {
    headerBc.innerHTML = trail.map((t, i) => {
      const isLast = i === trail.length - 1;
      const isFirst = i === 0;
      let sep = (i > 0) ? '<span class="hbc-sep">/</span>' : '';
      let item = '';
      if (isLast || !t.href) {
        item = `<span class="hbc-item hbc-current" title="${t.label}">${t.label}</span>`;
      } else {
        item = `<a href="${t.href}" class="hbc-item ${isFirst ? 'hbc-home' : 'hbc-link'}" title="${t.label}">${t.label}</a>`;
      }
      return sep + item;
    }).join('');
  }

  // 2. Update Vertical Breadcrumb Tree in the Left Sidebar
  const verticalBc = document.getElementById('verticalBreadcrumb');
  if (verticalBc && Array.isArray(trail) && trail.length > 0) {
    verticalBc.innerHTML = trail.map((t, i) => {
      const isLast = i === trail.length - 1;
      const isFirst = i === 0;
      const nodeClass = isFirst ? 'is-root' : (isLast ? 'is-current' : 'is-subject');
      const content = (isLast || !t.href)
        ? `<span class="vbc-label" title="${t.label}">${t.label}</span>`
        : `<a href="${t.href}" class="vbc-link" title="${t.label}">${t.label}</a>`;
      return `
        <div class="vbc-node ${nodeClass}">
          <span class="vbc-rail"></span>
          <span class="vbc-bullet"></span>
          <span class="vbc-content">${content}</span>
        </div>`;
    }).join('');
  }

  // 3. Highlight matching Subject Tab in Sidebar
  highlightActiveSubjectTab(trail);

  // 4. Keep updating page-level #breadcrumb if present
  const pageBc = document.getElementById('breadcrumb');
  if (pageBc && Array.isArray(trail)) {
    pageBc.innerHTML = trail.map((t,i) => {
      const isLast = i === trail.length - 1;
      return (i>0 ? '<span class="sep">/</span>' : '') + (isLast || !t.href ? `<span>${t.label}</span>` : `<a href="${t.href}">${t.label}</a>`);
    }).join('');
  }
}

/* ---------- External link helper ---------- */
let _extLinks = null;
async function extLink(keyword, displayText){
  if (!_extLinks) _extLinks = await HistoryData.loadLinks();
  const entry = _extLinks[keyword];
  const text = displayText || keyword;
  if (!entry) return text;
  return `<a class="ext-link" href="${entry.url}" target="_blank" rel="noopener noreferrer">${text}<span class="arrow">↗</span><span class="ext-tooltip">${entry.source} — open external resource</span></a>`;
}

async function linkifyPeopleList(names){
  const out = [];
  for (const n of names) out.push(await extLink(n));
  return out;
}

/* ---------- Spotlight Search (Ctrl+K / ⌘K) ---------- */
function initSpotlight(){
  if (document.getElementById('spotlightModal')) return;

  const modal = document.createElement('div');
  modal.id = 'spotlightModal';
  modal.className = 'spotlight-modal';
  modal.innerHTML = `
    <div class="spotlight-backdrop" onclick="closeSpotlight()"></div>
    <div class="spotlight-box">
      <div class="spotlight-input-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="spotlightInput" placeholder="Search periods, events, people, archaeological sites, or questions..." autocomplete="off">
        <kbd class="spotlight-esc" onclick="closeSpotlight()">ESC</kbd>
      </div>
      <div class="spotlight-results" id="spotlightResults">
        <div class="spotlight-hint">
          <span>Type to search across 80 periods, 400+ events, key sites, and UPSC drills.</span>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const input = document.getElementById('spotlightInput');
  const results = document.getElementById('spotlightResults');
  let timer;

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const q = input.value.trim();
      if (!q){
        results.innerHTML = '<div class="spotlight-hint"><span>Type to search across 80 periods, 400+ events, key sites, and UPSC drills.</span></div>';
        return;
      }
      const hits = await Search.query(q);
      if (!hits.length){
        results.innerHTML = `<div class="spotlight-empty">No historical records found for "${q}". Try searching "Harappa", "Ashoka", "1857", "Chola", or "Bhakti".</div>`;
        return;
      }
      results.innerHTML = hits.map((h, i) => `
        <a class="spotlight-item ${i===0?'selected':''}" href="${h.href}" onclick="closeSpotlight()">
          <span class="sp-kind sp-${h.kind.toLowerCase().replace(/[^a-z]/g,'')}">${h.kind}</span>
          <div class="sp-text">
            <span class="sp-title">${h.title}</span>
            <span class="sp-sub">${h.sub}</span>
          </div>
          <span class="sp-arrow">&rarr;</span>
        </a>`).join('');
    }, 120);
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSpotlight();
    } else if (e.key === 'Escape') {
      closeSpotlight();
      closeCalculator();
    }
  });
}

function openSpotlight(){
  const modal = document.getElementById('spotlightModal');
  if (!modal) return;
  modal.classList.add('open');
  const input = document.getElementById('spotlightInput');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 50);
  }
}
function closeSpotlight(){
  const modal = document.getElementById('spotlightModal');
  if (modal) modal.classList.remove('open');
}

/* ---------- Modern Animated Calculator Modal ---------- */
let calcState = { expr: '', curr: '0', justEvaluated: false };

function initCalculator(){
  if (document.getElementById('calcModal')) return;

  const modal = document.createElement('div');
  modal.id = 'calcModal';
  modal.className = 'calc-modal';
  modal.innerHTML = `
    <div class="calc-backdrop" onclick="closeCalculator()"></div>
    <div class="calc-card">
      <div class="calc-header">
        <div class="calc-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>
          <b>Era &amp; Year Calculator</b>
        </div>
        <button class="calc-close" onclick="closeCalculator()" aria-label="Close calculator">&times;</button>
      </div>

      <div class="calc-display">
        <div class="calc-expr" id="calcExpr"></div>
        <div class="calc-val" id="calcVal">0</div>
      </div>

      <div class="calc-keypad">
        <button class="ck-btn ck-fn" onclick="calcAction('clear')">C</button>
        <button class="ck-btn ck-fn" onclick="calcAction('backspace')">⌫</button>
        <button class="ck-btn ck-fn" onclick="calcAction('percent')">%</button>
        <button class="ck-btn ck-op" onclick="calcAction('/')">&divide;</button>

        <button class="ck-btn ck-num" onclick="calcAction('7')">7</button>
        <button class="ck-btn ck-num" onclick="calcAction('8')">8</button>
        <button class="ck-btn ck-num" onclick="calcAction('9')">9</button>
        <button class="ck-btn ck-op" onclick="calcAction('*')">&times;</button>

        <button class="ck-btn ck-num" onclick="calcAction('4')">4</button>
        <button class="ck-btn ck-num" onclick="calcAction('5')">5</button>
        <button class="ck-btn ck-num" onclick="calcAction('6')">6</button>
        <button class="ck-btn ck-op" onclick="calcAction('-')">&minus;</button>

        <button class="ck-btn ck-num" onclick="calcAction('1')">1</button>
        <button class="ck-btn ck-num" onclick="calcAction('2')">2</button>
        <button class="ck-btn ck-num" onclick="calcAction('3')">3</button>
        <button class="ck-btn ck-op" onclick="calcAction('+')">+</button>

        <button class="ck-btn ck-fn" onclick="calcAction('plusminus')">&plusmn;</button>
        <button class="ck-btn ck-num" onclick="calcAction('0')">0</button>
        <button class="ck-btn ck-num" onclick="calcAction('.')">.</button>
        <button class="ck-btn ck-eq" onclick="calcAction('eval')">=</button>
      </div>

      <div class="calc-footer-hint">Quick calculation for years, spans, and dates without navigating away.</div>
    </div>`;
  document.body.appendChild(modal);

  // Physical keyboard support for calculator when open
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('calcModal');
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key >= '0' && e.key <= '9') calcAction(e.key);
    else if (['+', '-', '*', '/'].includes(e.key)) calcAction(e.key);
    else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calcAction('eval'); }
    else if (e.key === 'Backspace') calcAction('backspace');
    else if (e.key === 'Escape') closeCalculator();
    else if (e.key === '.') calcAction('.');
  });
}

function calcAction(act){
  const exprEl = document.getElementById('calcExpr');
  const valEl = document.getElementById('calcVal');

  if (act === 'clear') {
    calcState.expr = '';
    calcState.curr = '0';
    calcState.justEvaluated = false;
  } else if (act === 'backspace') {
    if (calcState.justEvaluated) {
      calcState.curr = '0';
    } else {
      calcState.curr = calcState.curr.length > 1 ? calcState.curr.slice(0, -1) : '0';
    }
  } else if (act === 'plusminus') {
    if (calcState.curr !== '0') {
      calcState.curr = calcState.curr.startsWith('-') ? calcState.curr.slice(1) : '-' + calcState.curr;
    }
  } else if (act === 'percent') {
    const num = parseFloat(calcState.curr);
    calcState.curr = String(num / 100);
  } else if (['+', '-', '*', '/'].includes(act)) {
    calcState.expr += ` ${calcState.curr} ${act}`;
    calcState.curr = '0';
    calcState.justEvaluated = false;
  } else if (act === 'eval') {
    try {
      const fullExpr = (calcState.expr + ' ' + calcState.curr).trim();
      // Safe math evaluator using tokens
      const sanitized = fullExpr.replace(/[^0-9+\-*/. ]/g, '');
      const res = Function(`"use strict"; return (${sanitized})`)();
      calcState.expr = fullExpr + ' =';
      calcState.curr = String(Math.round(res * 100000) / 100000);
      calcState.justEvaluated = true;
    } catch(err) {
      calcState.curr = 'Error';
    }
  } else if (act === '.') {
    if (!calcState.curr.includes('.')) calcState.curr += '.';
  } else {
    // Number typed
    if (calcState.curr === '0' || calcState.justEvaluated) {
      calcState.curr = act;
      calcState.justEvaluated = false;
    } else {
      calcState.curr += act;
    }
  }

  if (exprEl) exprEl.textContent = calcState.expr;
  if (valEl) valEl.textContent = calcState.curr;
}

function openCalculator(){
  const modal = document.getElementById('calcModal');
  if (!modal) return;
  modal.classList.add('open');
}
function closeCalculator(){
  const modal = document.getElementById('calcModal');
  if (modal) modal.classList.remove('open');
}

/* ---------- Lightbox ---------- */
function openLightbox(src, title){
  let lb = document.getElementById('lightbox');
  if (!lb){
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <div class="lightbox-stage"><img id="lbImg" alt=""></div>
      <div class="lightbox-bar">
        <button id="lbZoomOut">− Zoom Out</button>
        <button id="lbZoomIn">+ Zoom In</button>
        <button id="lbReset">Reset</button>
        <a id="lbDownload" download>Download / Open Original ↗</a>
      </div>`;
    document.body.appendChild(lb);
    lb.querySelector('.lightbox-close').onclick = closeLightbox;
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    let scale = 1;
    const img = lb.querySelector('#lbImg');
    lb.querySelector('#lbZoomIn').onclick = () => { scale = Math.min(scale + 0.3, 4); img.style.transform = `scale(${scale})`; };
    lb.querySelector('#lbZoomOut').onclick = () => { scale = Math.max(scale - 0.3, 0.4); img.style.transform = `scale(${scale})`; };
    lb.querySelector('#lbReset').onclick = () => { scale = 1; img.style.transform = 'scale(1)'; };
  }
  document.getElementById('lbImg').src = src;
  document.getElementById('lbImg').alt = title || 'Original revision sheet';
  document.getElementById('lbImg').style.transform = 'scale(1)';
  document.getElementById('lbDownload').href = src;
  lb.classList.add('open');
}
function closeLightbox(){
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

document.addEventListener('DOMContentLoaded', updateThemeIcon);
