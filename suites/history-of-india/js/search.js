/* Client-side search across periods, events, people, themes, sites, and practice questions — no backend. */

const Search = (() => {
  let index = null;

  async function build(){
    if (index) return index;
    const d = await HistoryData.load();
    index = [];

    // 1. Periods
    d.periods.forEach(p => {
      index.push({
        kind: 'Period',
        title: p.title,
        sub: p.dateRange,
        href: `period.html?id=${p.id}`,
        text: (p.title + ' ' + p.tagline + ' ' + (p.overview || '')).toLowerCase()
      });

      // 2. Events
      (p.events || []).forEach(e => {
        index.push({
          kind: 'Event',
          title: e.title,
          sub: `${e.year} · ${p.title}`,
          href: `period.html?id=${p.id}#event-${slug(e.title)}`,
          text: (e.title + ' ' + (e.desc || '') + ' ' + e.year + ' ' + p.title).toLowerCase()
        });
      });

      // 3. People
      (p.people || []).forEach(pe => {
        index.push({
          kind: 'Person',
          title: pe.name,
          sub: `${pe.role || ''} · ${p.title}`,
          href: `period.html?id=${p.id}#people`,
          text: (pe.name + ' ' + (pe.role||'') + ' ' + (pe.note||'') + ' ' + p.title).toLowerCase()
        });
      });

      // 4. Women
      (p.women || []).forEach(w => {
        index.push({
          kind: 'Woman in History',
          title: w.name,
          sub: `${w.role || ''} · ${p.title}`,
          href: `period.html?id=${p.id}#women`,
          text: (w.name + ' ' + (w.note||'') + ' ' + p.title).toLowerCase()
        });
      });

      // 5. Themes
      (p.themes || []).forEach(t => {
        const label = HistoryData.THEME_LABELS[t] || t;
        index.push({
          kind: 'Theme',
          title: label,
          sub: p.title,
          href: `themes.html#${t}`,
          text: (label + ' ' + p.title).toLowerCase()
        });
      });

      // 6. Sites inside period
      (p.sites || []).forEach(s => {
        const sName = typeof s === 'string' ? s : (s.name || s.title || '');
        if (sName) {
          index.push({
            kind: 'Historical Site',
            title: sName,
            sub: `${p.title} (${p.dateRange})`,
            href: `map.html?site=${slug(sName)}`,
            text: (sName + ' archaeological site ' + p.title).toLowerCase()
          });
        }
      });
    });

    // 7. Core Archaeological Map Sites
    const coreSites = [
      { name: 'Dholavira', layer: 'IVC (Harappan)', state: 'Gujarat' },
      { name: 'Harappa', layer: 'IVC (Harappan)', state: 'Punjab' },
      { name: 'Mohenjo-daro', layer: 'IVC (Harappan)', state: 'Sindh' },
      { name: 'Lothal', layer: 'IVC (Harappan)', state: 'Gujarat' },
      { name: 'Kalibangan', layer: 'IVC (Harappan)', state: 'Rajasthan' },
      { name: 'Rakhigarhi', layer: 'IVC (Harappan)', state: 'Haryana' },
      { name: 'Rajgriha', layer: '16 Mahajanapadas', state: 'Bihar' },
      { name: 'Pataliputra', layer: '16 Mahajanapadas', state: 'Bihar' },
      { name: 'Shravasti', layer: '16 Mahajanapadas', state: 'Uttar Pradesh' },
      { name: 'Kaushambi', layer: '16 Mahajanapadas', state: 'Uttar Pradesh' },
      { name: 'Ujjain', layer: '16 Mahajanapadas', state: 'Madhya Pradesh' },
      { name: 'Taxila', layer: '16 Mahajanapadas', state: 'Gandhara' },
      { name: 'Sarnath', layer: 'Ashokan Edict & Pillar', state: 'Uttar Pradesh' },
      { name: 'Sanchi', layer: 'Ashokan Stupa & Edict', state: 'Madhya Pradesh' },
      { name: 'Dhauli', layer: 'Ashokan Kalinga Edict', state: 'Odisha' },
      { name: 'Girnar', layer: 'Ashokan & Rudradaman Edict', state: 'Gujarat' },
      { name: 'Maski', layer: 'Ashokan Edict', state: 'Karnataka' },
      { name: 'Ajanta Caves', layer: 'Classical Art & UNESCO', state: 'Maharashtra' },
      { name: 'Ellora Caves', layer: 'Kailasha Temple & UNESCO', state: 'Maharashtra' },
      { name: 'Khajuraho', layer: 'Nagara Temples & UNESCO', state: 'Madhya Pradesh' },
      { name: 'Konark Sun Temple', layer: 'Kalinga Art & UNESCO', state: 'Odisha' },
      { name: 'Brihadisvara Temple', layer: 'Chola Dravida & UNESCO', state: 'Tamil Nadu' },
      { name: 'Mamallapuram', layer: 'Pallava Rathas & UNESCO', state: 'Tamil Nadu' },
      { name: 'Panipat', layer: 'Historic Battleground', state: 'Haryana' },
      { name: 'Tarain', layer: 'Historic Battleground', state: 'Haryana' },
      { name: 'Talikota', layer: 'Deccan Battleground', state: 'Karnataka' },
      { name: 'Haldighati', layer: 'Mewar Battleground', state: 'Rajasthan' },
      { name: 'Plassey', layer: 'Freedom Struggle Landmark', state: 'West Bengal' },
      { name: 'Buxar', layer: 'Freedom Struggle Landmark', state: 'Bihar' },
      { name: 'Champaran', layer: 'First Satyagraha (1917)', state: 'Bihar' },
      { name: 'Jallianwala Bagh', layer: 'Amritsar Massacre (1919)', state: 'Punjab' },
      { name: 'Dandi', layer: 'Salt Satyagraha (1930)', state: 'Gujarat' }
    ];

    coreSites.forEach(cs => {
      index.push({
        kind: 'Map Site',
        title: cs.name,
        sub: `${cs.layer} · ${cs.state}`,
        href: `map.html?site=${slug(cs.name)}`,
        text: `${cs.name} ${cs.layer} ${cs.state} map site archaeological`.toLowerCase()
      });
    });

    // 8. Practice Topics
    const practiceTopics = [
      { title: 'UPSC Prelims Practice Questions', sub: '50+ Statement-based drills', href: 'practice.html' },
      { title: 'UPSC Mains GS-1 Frameworks', sub: 'Analytical model answer structures', href: 'practice.html' },
      { title: 'Harappan Town Planning Drill', sub: 'UPSC Question & Model Framework', href: 'practice.html' },
      { title: 'Bhakti Movement Integration Analysis', sub: 'UPSC Mains GS-1 Topic', href: 'practice.html' },
      { title: 'Drain of Wealth Economic Critique', sub: 'UPSC Mains Analysis', href: 'practice.html' },
      // 9. Art & Culture Hub
      { title: 'Indian Heritage & Culture Hub', sub: 'Art Forms, Literature & Architecture', href: 'art-culture.html', text: 'art forms literature architecture paintings dances classical music puppetry theatre martial arts temple nagara dravida vesara caves ajanta ellora stupa harappan nitin singhania fine arts ccrt percy brown' },
      { title: 'Temple Architecture: Nagara, Dravida & Vesara', sub: 'Comparative Architectural Study', href: 'art-culture.html#cultureComparisonsSection', text: 'temple architecture nagara dravida vesara shikhara vimana gopuram mandapa chola khajuraho hoysala kailash ellora' },
      { title: 'Classical Dance Forms of India', sub: '8 Sangeet Natak Akademi Dances', href: 'art-culture.html#classical-dances', text: 'classical dance bharatanatyam kathak kathakali kuchipudi odissi manipuri mohiniyattam sattriya natyashastra' },
      { title: 'Indian Mural & Miniature Paintings', sub: 'Ajanta to Mughal & Rajput Schools', href: 'art-culture.html#paintings-mural', text: 'paintings mural miniature ajanta mughal rajput pahari kangra kishangarh bani thani' },
      // 10. Indian Society Hub
      { title: 'Indian Society & Social Issues Hub', sub: 'Diversity, Women, Demography, Poverty, Urbanization', href: 'society.html', text: 'indian society diversity salient features varna jati linguistic religious pluralism ram ahuja ncert sociology' },
      { title: 'Role of Women and Women\'s Organizations', sub: 'Reforms, Freedom Struggle, SHGs & 106th CAA', href: 'society.html#society-women-organizations', text: 'women organizations shg self help groups kudumbashree sewa aidwa nari shakti vandan 106th amendment' },
      { title: 'Population & Demographic Dividend in India', sub: 'NFHS-5, TFR, Ageing & Delimitation', href: 'society.html#society-population-demographics', text: 'population demography total fertility rate tfr replacement level 2.0 demographic dividend aging geriatric care nfhs-5' },
      { title: 'Poverty & Developmental Issues', sub: 'Measurement, Lines, MPI & Pro-Poor Shifts', href: 'society.html#society-poverty-development', text: 'poverty lines alagh lakdawala tendulkar rangarajan niti aayog mpi multidimensional poverty inclusive growth dbt' },
      { title: 'Urbanization & Problems of Slums', sub: '74th CAA, Civic Deficits & Smart Cities', href: 'society.html#society-urbanization-slums', text: 'urbanization slums dharavi 74th caa urban local bodies ulbs smart cities amrut push pull census towns' },
      { title: 'Effects of Globalization on Indian Society', sub: 'Glocalization, Agrarian Sector & Women', href: 'society.html#society-globalization-impact', text: 'globalization glocalization homogenization mcdonaldization bpo mnc agrarian distress hybridity' },
      { title: 'Social Empowerment of Disadvantaged Groups', sub: 'Constitutional Rights & Affirmative Action', href: 'society.html#society-social-empowerment', text: 'social empowerment scheduled castes tribes sc st obc divyangjan transgender articles 14 15 16 17 21 poa act' },
      { title: 'Communalism, Regionalism & Secularism', sub: 'Sons of Soil, Bommai Ruling & UCC Debate', href: 'society.html#society-communalism-antidote', text: 'communalism regionalism sons of soil secularism principled distance sarva dharma sambhava uniform civil code ucc article 44 bommai' },
      // 11. Canonical Textbooks Hub
      { title: 'The 15 Canonical Textbooks Study Hub', sub: 'Complete Exam Books Synthesis', href: 'books.html', text: '15 canonical textbooks books ncert rs sharma upinder singh satish chandra spectrum bipan chandra nitin singhania norman lowe ram ahuja guha bandyopadhyay' }
    ];
    practiceTopics.forEach(pt => {
      index.push({
        kind: 'UPSC Drill',
        title: pt.title,
        sub: pt.sub,
        href: pt.href,
        text: `${pt.title} ${pt.sub} upsc test prelims mains mcq question`.toLowerCase()
      });
    });

    return index;
  }

  function slug(s){
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  async function query(q){
    const idx = await build();
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return idx.filter(item => terms.every(t => item.text.includes(t))).slice(0, 45);
  }

  return { build, query, slug };
})();

/* Wires up an <input> + results container for live search */
function wireQuickSearch(inputId, resultsId){
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;
  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(async () => {
      const q = input.value.trim();
      if (!q){ results.classList.remove('open'); results.innerHTML=''; return; }
      const hits = await Search.query(q);
      results.innerHTML = hits.length
        ? hits.map(h => `<a class="search-result" href="${h.href}"><span class="r-kind">${h.kind}</span><span class="r-title">${h.title}</span><span class="r-sub">${h.sub}</span></a>`).join('')
        : `<div class="search-empty">No matches for “${q}”. Try a year, event, person or theme.</div>`;
      results.classList.add('open');
    }, 160);
  });
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) results.classList.remove('open');
  });
}
