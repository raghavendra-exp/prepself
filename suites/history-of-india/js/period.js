async function renderPeriodPage(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const d = await HistoryData.load();
  const period = id ? await HistoryData.getPeriod(id) : d.periods[0];
  const root = document.getElementById('periodRoot');
  if (!period){
    root.innerHTML = `<div class="section wrap"><p>Period not found. <a href="timeline.html">Return to the timeline →</a></p></div>`;
    return;
  }
  document.title = `${period.title} (${period.dateRange}) — Complete History of India`;
  const { prev, next } = await HistoryData.getAdjacent(period.id);
  renderNav('period.html');
  renderBreadcrumb([
    { label: 'Home', href: 'index.html' },
    { label: 'Timeline', href: 'timeline.html' },
    { label: period.title }
  ]);

  const catClass = `cat-${period.category}`;

  root.innerHTML = `
    <header class="p-hero">
      <div class="wrap">
        <div class="p-eyebrow">
          <span class="t-cat ${catClass}">${period.category}</span>
          <span class="t-range" style="font-family:var(--font-mono); color:var(--ink-faint); font-size:.82rem;">${period.dateRange}</span>
        </div>
        <h1>${period.title}</h1>
        <p class="p-tag">${period.tagline}</p>
      </div>
    </header>

    <section class="section">
      <div class="wrap two-col">
        <div>
          <h2 class="mt0">Period Overview</h2>
          <p style="font-size:1.05rem; color:var(--ink-soft);">${period.overview}</p>

          <div class="source-cta" id="sourceCta">
            <img src="assets/images/${period.heroImg}" alt="">
            <div class="sc-text"><b>View Original Revision Sheet${period.sourceImages.length>1?'s':''}</b><span>Source infographic${period.sourceImages.length>1?'s':''} this page was built from</span></div>
            <button class="btn btn-outline btn-sm" id="viewOriginalBtn">Open Viewer</button>
          </div>

          <h2>Interactive Timeline of This Period</h2>
          <div id="phaseTrack"></div>

          <h2>Key Events</h2>
          <div class="card-grid" id="periodEvents"></div>

          ${period.aspects ? `<h2>Aspect-Wise Study</h2><div id="aspectBlocks"></div>` : ''}

          ${period.women && period.women.length ? `<h2 id="women">Women's Contribution</h2><div class="card-grid" id="womenCards"></div>` : ''}

          ${period.people && period.people.length ? `<h2 id="people">Important Personalities</h2><div class="card-grid" id="peopleCards"></div>` : ''}

          ${period.sites ? `<h2>Major Sites</h2><div id="sitesBlock"></div>` : ''}
          ${period.importantSites ? `<h2>Important Sites</h2><div id="impSitesBlock"></div>` : ''}
          ${period.decline ? `<h2>Theories of Decline</h2><ul id="declineList" style="padding-left:1.3em; color:var(--ink-soft);"></ul>` : ''}
          ${period.sixteenMahajanapadas ? `<h2>The 16 Mahajanapadas</h2><div id="mjList"></div>` : ''}
        </div>

        <aside>
          <div class="upsc-panel upsc-only" style="margin-bottom:24px;">
            <h4>UPSC Prelims Facts</h4>
            <ul id="upscPrelims"></ul>
          </div>
          <div class="upsc-panel upsc-only" style="margin-bottom:24px; border-color:var(--accent); background:var(--accent-tint);">
            <h4 style="color:var(--accent-strong);">UPSC Mains Themes</h4>
            <ul id="upscMains"></ul>
          </div>

          <h3>Quick Facts</h3>
          <table class="facts-table" id="quickFacts"></table>

          <hr class="rule">
          <h3>Related Themes</h3>
          <div id="relatedThemes" style="display:flex; flex-wrap:wrap; gap:8px;"></div>

          <hr class="rule">
          <h3>Related Topics <span style="font-family:var(--font-mono); font-size:.62rem; color:var(--ink-faint); font-weight:400;">(from the knowledge graph)</span></h3>
          <div id="relatedTopics" style="display:flex; flex-direction:column; gap:10px;"></div>

          <hr class="rule">
          <h3>Further Reading</h3>
          <div id="furtherReading" style="font-size:.88rem; display:flex; flex-direction:column; gap:8px;"></div>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="wrap">
        <div class="p-nav-prevnext">
          ${prev ? `<a class="pn-link" href="period.html?id=${prev.id}"><span class="pn-lab">← Previous Period</span><span class="pn-title">${prev.title}</span></a>` : `<a class="pn-link" href="timeline.html"><span class="pn-lab">← Back to</span><span class="pn-title">Master Timeline</span></a>`}
          ${next ? `<a class="pn-link next" href="period.html?id=${next.id}"><span class="pn-lab">Next Period →</span><span class="pn-title">${next.title}</span></a>` : `<a class="pn-link next" href="timeline.html"><span class="pn-lab">Back to →</span><span class="pn-title">Master Timeline</span></a>`}
        </div>
      </div>
    </section>
  `;

  // Phase track
  document.getElementById('phaseTrack').innerHTML = (period.phases || []).map(ph => `
    <div class="phase-row">
      <h4>${ph.name}</h4>
      <span class="ph-range">${ph.range}</span>
      <ul>${ph.points.map(pt => `<li>${pt}</li>`).join('')}</ul>
    </div>`).join('') || '<p class="section-desc">No phase breakdown available for this period.</p>';

  // Events
  document.getElementById('periodEvents').innerHTML = (period.events || []).map(e => `
    <div class="event-card" id="event-${Search.slug(e.title)}">
      <span class="event-year">${e.year}</span>
      <h4>${e.title}</h4>
      <p>${e.desc}</p>
      <span class="theme-chip">${HistoryData.THEME_LABELS[e.theme] || e.theme}</span>
    </div>`).join('');

  // Aspects (accordion) — supports plain arrays (national track) and
  // {intro, points} objects (UP track, adding a short explanatory lead-in
  // before the bullet list without disturbing the bullets themselves)
  if (period.aspects){
    document.getElementById('aspectBlocks').innerHTML = Object.entries(period.aspects).map(([k,v],i) => {
      const isElaborated = v && typeof v === 'object' && !Array.isArray(v) && v.points;
      const intro = isElaborated ? v.intro : null;
      const points = isElaborated ? v.points : v;
      return `
      <details class="aspect-block" ${i===0?'open':''}>
        <summary>${k}</summary>
        <div class="a-body">
          ${intro ? `<p style="color:var(--ink-soft); margin-bottom:12px; font-size:.92rem;">${intro}</p>` : ''}
          <ul>${(Array.isArray(points)?points:[points]).map(pt => `<li>${pt}</li>`).join('')}</ul>
        </div>
      </details>`;
    }).join('');
  }

  // Women — with automatic cross-period links from the knowledge graph
  await KGraph.build();
  if (period.women && period.women.length){
    document.getElementById('womenCards').innerHTML = period.women.map(w => {
      const cross = KGraph.personCrossLinks(w.name, period.id);
      return `
      <div class="person-card women-card">
        <span class="badge badge-women" style="margin-bottom:8px;">Women in History</span>
        <div class="p-name">${w.name}</div>
        ${w.role ? `<div class="p-role">${w.role}</div>` : ''}
        <div class="p-note">${w.note}</div>
        ${cross.length ? `<div style="margin-top:8px; font-size:.76rem;">↗ also appears in: ${cross.map(c => `<a href="${c.href}" style="color:var(--seal); text-decoration:none; font-weight:600;">${c.periodTitle}</a>`).join(', ')}</div>` : ''}
      </div>`;
    }).join('');
  }

  // People — with automatic cross-period links from the knowledge graph
  if (period.people && period.people.length){
    document.getElementById('peopleCards').innerHTML = period.people.map(p => {
      const cross = KGraph.personCrossLinks(p.name, period.id);
      return `
      <div class="person-card">
        <div class="p-name">${p.name}</div>
        <div class="p-role">${p.role || ''}</div>
        <div class="p-note">${p.note || ''}</div>
        ${cross.length ? `<div style="margin-top:8px; font-size:.76rem; color:var(--ink-faint);">↗ also appears in: ${cross.map(c => `<a href="${c.href}" style="color:var(--accent); text-decoration:none; font-weight:600;">${c.periodTitle}</a>`).join(', ')}</div>` : ''}
      </div>`;
    }).join('');
  }

  // Related Topics panel — theme-sibling events pulled from OTHER periods via the graph
  const relTopicsEl = document.getElementById('relatedTopics');
  if (relTopicsEl){
    const themes = period.themes || [];
    const seen = new Set();
    let picks = [];
    themes.forEach(t => {
      KGraph.eventsByTheme(t, null, 20).forEach(ev => {
        if (ev.periodId === period.id || seen.has(ev.key)) return;
        seen.add(ev.key);
        picks.push(ev);
      });
    });
    picks = picks.slice(0, 6);
    relTopicsEl.innerHTML = picks.length ? picks.map(ev => `
      <a href="${ev.href}" style="text-decoration:none; display:block; padding:10px 12px; border:1px solid var(--line-soft); border-radius:var(--radius); background:var(--bg-raised);">
        <span style="font-family:var(--font-mono); font-size:.68rem; color:var(--seal); font-weight:700;">${ev.year}</span>
        <div style="font-weight:600; font-size:.86rem; color:var(--ink);">${ev.label}</div>
        <span style="font-size:.74rem; color:var(--ink-faint);">${ev.periodTitle} · ${HistoryData.THEME_LABELS[ev.theme]||ev.theme}</span>
      </a>`).join('') : `<span style="color:var(--ink-faint); font-size:.85rem;">No cross-period matches yet for this period's themes.</span>`;
  }

  // Sites (Indus-style)
  if (period.sites){
    document.getElementById('sitesBlock').innerHTML = `
      <table class="facts-table"><tbody>
      ${period.sites.map(s => `<tr><td>${s.site}</td><td>${s.features}</td></tr>`).join('')}
      </tbody></table>`;
  }
  if (period.importantSites){
    document.getElementById('impSitesBlock').innerHTML = Object.entries(period.importantSites).map(([k,v]) => `
      <div style="margin-bottom:14px;"><b>${k}:</b> <span style="color:var(--ink-soft);">${v.join('; ')}</span></div>`).join('');
  }
  if (period.decline){
    document.getElementById('declineList').innerHTML = period.decline.map(x => `<li style="margin-bottom:6px;">${x}</li>`).join('');
  }
  if (period.sixteenMahajanapadas){
    document.getElementById('mjList').innerHTML = `
      <div class="two-col" style="grid-template-columns:1fr 1fr; gap:20px;">
        <div><b>Monarchies</b><ul style="padding-left:1.2em; color:var(--ink-soft);">${period.sixteenMahajanapadas.Monarchies.map(m=>`<li>${m}</li>`).join('')}</ul></div>
        <div><b>Republics (Gana-Sanghas)</b><ul style="padding-left:1.2em; color:var(--ink-soft);">${period.sixteenMahajanapadas.Republics.map(m=>`<li>${m}</li>`).join('')}</ul></div>
      </div>`;
  }

  // UPSC panels
  document.getElementById('upscPrelims').innerHTML = (period.upsc?.prelims || []).map(x => `<li>${x}</li>`).join('');
  document.getElementById('upscMains').innerHTML = (period.upsc?.mains || []).map(x => `<li>${x}</li>`).join('');

  // Quick facts
  document.getElementById('quickFacts').innerHTML = (period.quickFacts || []).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  // Related themes
  document.getElementById('relatedThemes').innerHTML = (period.themes || []).map(t => `<a class="filter-chip" href="themes.html#${t}">${HistoryData.THEME_LABELS[t] || t}</a>`).join('');

  // Further reading (external links relevant to this period's people)
  const links = await HistoryData.loadLinks();
  const names = [...(period.people||[]).map(p=>p.name), period.title];
  const found = names.filter(n => links[n]);
  document.getElementById('furtherReading').innerHTML = found.length
    ? (await Promise.all(found.map(async n => await extLink(n)))).join('<br>')
    : `<span style="color:var(--ink-faint);">No external references tagged for this period yet.</span>`;

  // Lightbox wiring
  document.getElementById('viewOriginalBtn').onclick = () => openLightbox(`assets/images/${period.heroImg}`, period.title);
  document.getElementById('sourceCta').querySelector('img').onclick = () => openLightbox(`assets/images/${period.heroImg}`, period.title);

  renderFooter();
  initReveal();
}

document.addEventListener('DOMContentLoaded', renderPeriodPage);
