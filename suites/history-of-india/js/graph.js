/* ==========================================================================
   KNOWLEDGE GRAPH ENGINE
   Builds an in-memory graph of every person, event, women's-history entry
   and period from data/history.json, then computes real cross-links:
     - same-name entities that recur across different periods
     - entities that share a theme (polity, war, religion, economy, etc.)
     - chronological neighbours (previous/next) within a period and globally
     - the external resource for a name, via external-links.json
   This graph is what powers the "Related Topics" panels, the cross-period
   "also appears in" links on people/women cards, and the Knowledge Graph
   Explorer (graph.html). Nothing here is hand-authored per-entity — it is
   computed automatically from the structured fields every period already
   carries (period, category, themes, people, women, events), which is what
   keeps it accurate as new periods are added to history.json.
   ========================================================================== */

const KGraph = (() => {
  let _nodes = null;      // key -> node
  let _byPeriod = null;   // periodId -> {events:[], people:[], women:[]}
  let _globalEvents = null; // flattened, chronologically-ordered (by period.order) event list

  function norm(s) { return (s || '').trim().toLowerCase().replace(/\s+/g, ' '); }

  async function build() {
    if (_nodes) return _nodes;
    const d = await HistoryData.load();
    _nodes = {};       // key: "person:<norm name>" / "event:<periodId>:<norm title>" / "period:<id>"
    _byPeriod = {};
    _globalEvents = [];

    d.periods.forEach(p => {
      _byPeriod[p.id] = { events: p.events || [], people: p.people || [], women: p.women || [] };

      _nodes[`period:${p.id}`] = {
        type: 'period', key: `period:${p.id}`, label: p.title, periodId: p.id,
        periodTitle: p.title, category: p.category, dateRange: p.dateRange,
        themes: p.themes || [], href: `period.html?id=${p.id}`
      };

      (p.events || []).forEach(e => {
        const key = `event:${p.id}:${norm(e.title)}`;
        _nodes[key] = {
          type: 'event', key, label: e.title, year: e.year, theme: e.theme,
          desc: e.desc, periodId: p.id, periodTitle: p.title, periodOrder: p.order,
          href: `period.html?id=${p.id}#event-${slug(e.title)}`
        };
        _globalEvents.push(_nodes[key]);
      });

      (p.people || []).forEach(pe => {
        const key = `person:${norm(pe.name)}`;
        if (!_nodes[key]) _nodes[key] = { type: 'person', key, label: pe.name, occurrences: [] };
        _nodes[key].occurrences.push({
          periodId: p.id, periodTitle: p.title, periodOrder: p.order,
          role: pe.role, note: pe.note, href: `period.html?id=${p.id}#people`
        });
      });

      (p.women || []).forEach(w => {
        const key = `person:${norm(w.name)}`;
        if (!_nodes[key]) _nodes[key] = { type: 'person', key, label: w.name, occurrences: [], isWomen: true };
        _nodes[key].isWomen = true;
        _nodes[key].occurrences.push({
          periodId: p.id, periodTitle: p.title, periodOrder: p.order,
          role: w.role || "Women's History", note: w.note, href: `period.html?id=${p.id}#women`, isWomen: true
        });
      });
    });

    // global chronological order already follows period.order + in-period array order
    _globalEvents.sort((a, b) => a.periodOrder - b.periodOrder);

    return _nodes;
  }

  function slug(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

  /** All periods (besides the given one) that mention this exact person/woman name. */
  function personCrossLinks(name, excludePeriodId) {
    const node = _nodes[`person:${norm(name)}`];
    if (!node) return [];
    return node.occurrences.filter(o => o.periodId !== excludePeriodId);
  }

  /** Other events (any period) sharing the same theme tag, excluding the event itself. */
  function eventsByTheme(theme, excludeKey, limit = 6) {
    return Object.values(_nodes)
      .filter(n => n.type === 'event' && n.theme === theme && n.key !== excludeKey)
      .slice(0, limit);
  }

  /** Chronological neighbours of an event within the full site timeline. */
  function globalNeighbors(periodId, title) {
    const idx = _globalEvents.findIndex(e => e.periodId === periodId && norm(e.label) === norm(title));
    if (idx === -1) return { prev: null, next: null };
    return { prev: _globalEvents[idx - 1] || null, next: _globalEvents[idx + 1] || null };
  }

  /** Full relation bundle for an entity name (person or event title within a period) — used by the Explorer. */
  async function explain(name) {
    await build();
    const pKey = `person:${norm(name)}`;
    if (_nodes[pKey]) {
      const node = _nodes[pKey];
      const periods = [...new Set(node.occurrences.map(o => o.periodId))]
        .map(id => _nodes[`period:${id}`]);
      const themeSet = new Set();
      periods.forEach(p => (p.themes || []).forEach(t => themeSet.add(t)));
      const relatedEvents = [];
      periods.forEach(p => (_byPeriod[p.periodId]?.events || []).slice(0, 3).forEach(e => relatedEvents.push({
        title: e.title, year: e.year, periodId: p.periodId, href: `period.html?id=${p.periodId}#event-${slug(e.title)}`
      })));
      return {
        type: 'person', name: node.label, isWomen: !!node.isWomen,
        periods, themes: [...themeSet], occurrences: node.occurrences, relatedEvents
      };
    }
    // else search events by title match across all periods
    const evMatches = Object.values(_nodes).filter(n => n.type === 'event' && norm(n.label).includes(norm(name)));
    if (evMatches.length) {
      const e = evMatches[0];
      const nb = globalNeighbors(e.periodId, e.label);
      const themeSiblings = eventsByTheme(e.theme, e.key, 6);
      const period = _nodes[`period:${e.periodId}`];
      return { type: 'event', event: e, period, prev: nb.prev, next: nb.next, themeSiblings, allMatches: evMatches };
    }
    return null;
  }

  return { build, personCrossLinks, eventsByTheme, globalNeighbors, explain, slug, norm };
})();
