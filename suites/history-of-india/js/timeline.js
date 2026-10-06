let TL_STATE = { 
  themeFilter: 'all', 
  eraFilter: 'all',
  searchTerm: '',
  allPeriods: [],
  nationalPeriods: []
};

const ERA_FILTERS = [
  { id: 'all', label: 'All Eras' },
  { id: 'ancient', label: 'Ancient' },
  { id: 'medieval', label: 'Medieval' },
  { id: 'sultanate', label: 'Delhi Sultanate' },
  { id: 'mughal', label: 'Mughal Empire' },
  { id: 'colonial', label: 'Modern & Freedom' },
  { id: 'independent', label: 'Post-Independence' },
  { id: 'world', label: 'World History' },
  { id: 'up', label: 'UP History (UPPSC)' }
];

async function renderTimelinePage(){
  renderNav('timeline.html');
  const d = await HistoryData.load();
  TL_STATE.allPeriods = d.periods;
  TL_STATE.nationalPeriods = d.periods.filter(p => !p.region);

  const params = new URLSearchParams(window.location.search);
  const eraParam = params.get('era') || params.get('category');
  if (eraParam) {
    if (eraParam === 'modern') TL_STATE.eraFilter = 'colonial';
    else if (eraParam === 'post' || eraParam === 'post-independence') TL_STATE.eraFilter = 'independent';
    else if (eraParam === 'world') TL_STATE.eraFilter = 'world';
    else if (ERA_FILTERS.some(e => e.id === eraParam)) TL_STATE.eraFilter = eraParam;
  }

  updateTimelineBreadcrumb();
  renderFilterBar();
  renderTimelineControls();
  draw();
  wireSubjectTabs();
  renderFooter();

  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
}

function updateTimelineBreadcrumb(){
  const eraObj = ERA_FILTERS.find(e => e.id === TL_STATE.eraFilter);
  const label = (eraObj && eraObj.id !== 'all') ? eraObj.label : 'All Eras';
  renderBreadcrumb([
    { label: 'Home', href: 'index.html' },
    { label: label, href: TL_STATE.eraFilter !== 'all' ? `timeline.html?era=${TL_STATE.eraFilter}` : 'timeline.html' },
    { label: 'Master Timeline' }
  ]);
}

function wireSubjectTabs(){
  document.querySelectorAll('.bc-subject-tab').forEach(tab => {
    const href = tab.getAttribute('href') || '';
    if (href.startsWith('timeline.html?era=')) {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const era = href.split('era=')[1];
        setEraFilter(era);
      });
    }
  });
}

function renderFilterBar(){
  const wrap = document.getElementById('filterBar');
  if (!wrap) return;

  wrap.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px; width:100%;">
      <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between;">
        <div class="quick-search" style="flex:1; max-width:380px; margin:0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="text" id="tlSearchInput" placeholder="Filter events by year, title, battle, act...">
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="expandAllPeriods(true)">Expand All</button>
          <button class="btn btn-outline btn-sm" onclick="expandAllPeriods(false)">Collapse All</button>
        </div>
      </div>
      <div class="filter-bar" style="margin:0;">
        ${ERA_FILTERS.map(c => `
          <button class="filter-chip ${TL_STATE.eraFilter === c.id ? 'active' : ''}" onclick="setEraFilter('${c.id}')">
            ${c.label}
          </button>
        `).join('')}
      </div>
    </div>`;

  const searchInput = document.getElementById('tlSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      TL_STATE.searchTerm = e.target.value.toLowerCase().trim();
      draw();
    });
  }
}

function setEraFilter(catId){
  TL_STATE.eraFilter = catId;
  try {
    const newUrl = catId === 'all' ? 'timeline.html' : `timeline.html?era=${catId}`;
    history.replaceState(null, '', newUrl);
  } catch(e) {}
  renderFilterBar();
  draw();
  updateTimelineBreadcrumb();
}

function expandAllPeriods(open){
  document.querySelectorAll('.tl-period').forEach(row => {
    if (open) row.classList.add('open');
    else row.classList.remove('open');
    const head = row.querySelector('.tl-period-head');
    if (head) head.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

function draw(){
  const wrap = document.getElementById('mtimeline');
  const era = TL_STATE.eraFilter;
  const search = TL_STATE.searchTerm;

  let basePeriods = era === 'up' 
    ? TL_STATE.allPeriods.filter(p => p.region === 'up')
    : TL_STATE.allPeriods.filter(p => !p.region);

  if (era !== 'all' && era !== 'up') {
    if (era === 'medieval') {
      basePeriods = basePeriods.filter(p => p.category === 'medieval' || p.category === 'sultanate' || p.category === 'mughal');
    } else {
      basePeriods = basePeriods.filter(p => p.category === era);
    }
  }

  const matchingPeriods = basePeriods.filter(p => {
    if (!search) return true;
    const matchPeriodText = p.title.toLowerCase().includes(search) || p.dateRange.toLowerCase().includes(search);
    const matchEvent = (p.events || []).some(e => 
      e.title.toLowerCase().includes(search) || 
      (e.desc && e.desc.toLowerCase().includes(search)) ||
      String(e.year).toLowerCase().includes(search)
    );
    return matchPeriodText || matchEvent;
  });

  if (!matchingPeriods.length) {
    wrap.innerHTML = `<p class="loading-note">No timeline events found matching "${search}".</p>`;
    return;
  }

  wrap.innerHTML = matchingPeriods.map((p, i) => {
    let events = p.events || [];
    if (search) {
      events = events.filter(e => 
        e.title.toLowerCase().includes(search) || 
        (e.desc && e.desc.toLowerCase().includes(search)) ||
        String(e.year).toLowerCase().includes(search)
      );
    }
    const isOpen = Boolean(search) || i === 0;

    return `
    <div class="tl-period ${isOpen ? 'open' : ''}" data-id="${p.id}">
      <div class="tl-period-head" role="button" tabindex="0" aria-expanded="${isOpen}">
        <div class="tlh-left">
          <span class="t-cat cat-${p.category}" style="margin-right:8px; font-size:0.68rem;">${p.category}</span>
          <h3 style="display:inline-block; vertical-align:middle; margin:0 8px 0 0;">${p.title}</h3>
          <span class="t-range">${p.dateRange}</span>
        </div>
        <div style="display:flex; align-items:center; gap:14px;">
          <a href="period.html?id=${p.id}" class="btn btn-ghost btn-sm" onclick="event.stopPropagation()">Open Period →</a>
          <span class="tl-caret">▸</span>
        </div>
      </div>
      <div class="tl-events">
        ${events.map(e => `
          <button class="tl-event" data-title="${encodeURIComponent(e.title)}" data-period="${p.id}">
            <span class="ev-year">${e.year}</span>
            <div class="ev-title">${e.title}</div>
            <span class="theme-chip">${HistoryData.THEME_LABELS[e.theme] || e.theme || 'General'}</span>
          </button>`).join('') || '<p style="color:var(--ink-faint); font-size:.85rem; padding:10px 0;">No specific events listed for this search filter.</p>'}
      </div>
    </div>`;
  }).join('');

  wrap.querySelectorAll('.tl-period-head').forEach(head => {
    head.addEventListener('click', () => {
      const row = head.parentElement;
      const willOpen = !row.classList.contains('open');
      row.classList.toggle('open');
      head.setAttribute('aria-expanded', willOpen);
    });
  });

  wrap.querySelectorAll('.tl-event').forEach(btn => {
    btn.addEventListener('click', async () => {
      const p = TL_STATE.allPeriods.find(x => x.id === btn.dataset.period);
      const e = (p.events || []).find(x => x.title === decodeURIComponent(btn.dataset.title));
      if (e && p) await openEventModal(e, p);
    });
  });
}

function renderTimelineControls(){}

async function openEventModal(e, p){
  const modal = document.getElementById('modalBackdrop');
  document.getElementById('modalBody').innerHTML = `
    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
    <span class="m-year">${e.year}</span>
    <h3>${e.title}</h3>
    <span class="theme-chip" style="margin-bottom:12px;">${HistoryData.THEME_LABELS[e.theme] || e.theme || 'General'}</span>
    <p style="margin-top:14px; color:var(--ink-soft); font-size:1rem; line-height:1.6;">${e.desc}</p>
    <div class="m-related" style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">
      <a class="btn btn-primary btn-sm" href="period.html?id=${p.id}">Open Full Period: ${p.title} →</a>
      <a class="btn btn-outline btn-sm" href="graph.html?q=${encodeURIComponent(e.title)}">View in Knowledge Graph →</a>
    </div>
  `;
  modal.classList.add('open');
}
function closeModal(){ 
  const modal = document.getElementById('modalBackdrop');
  if (modal) modal.classList.remove('open'); 
}

document.addEventListener('DOMContentLoaded', renderTimelinePage);
