# Complete History of India — Interactive Atlas & UPSC GS-1 Study Hub

A comprehensive, static, data-driven, interactive historical atlas and UPSC GS-1 study ecosystem covering **Ancient, Medieval, Modern, Post-Independence, Art & Culture, Indian Society, and World History**, alongside a dedicated Uttar Pradesh (UPPSC) track. Pure HTML/CSS/vanilla JS — no build step, no backend, works natively on GitHub Pages.

## What's inside

```
/
├── index.html          Home page (hero, journey rail, period grid, featured events/women, module showcases)
├── timeline.html        Master interactive timeline (filterable, expandable, click-to-detail)
├── map.html             Interactive Historical Atlas & Archaeological Map Lab (Calibrated Google Maps Engine)
├── practice.html        All-India Practice Hub (5,060+ Prelims MCQs & 245+ Mains Frameworks for UPSC, UPPSC, RO/ARO, Bank, RRB)
├── art-culture.html     Indian Heritage & Culture Hub (Art Forms, Literature, Architecture & Comparisons)
├── society.html         Indian Society Hub (Diversity, Women, Demography, Poverty, Urbanization, Globalization)
├── books.html           The 27 Canonical Textbooks & Compendiums Study Hub (NCERT, RS Sharma, Satish Chandra, Spectrum, Ahuja, BL Grover, James Tod, Harari, Gandhi, Pratik Nayak, Basham, SC Dube, Ishani Pandya, Ghatna Chakra, Banking Awareness, RRB Archive, UP Special)
├── up-history.html      Dedicated Uttar Pradesh Track (UPPSC GS-5 & 6)
├── period.html          Single dynamic template — renders any of 85 periods via ?id=<period-id>
├── themes.html          Thematic index (Polity, War, Religion, Economy, Society, Women, Art, Science, Foreign)
├── people.html          All personalities, filterable by period
├── women.html           Dedicated "Women in History" section
├── graph.html           Interactive computed Knowledge Graph
├── search.html          Full-page client-side spotlight search
├── about.html           Sources & method
├── css/style.css        Design system ("Stone & Ink" theme, light + dark mode)
├── js/
│   ├── data.js          Loads & caches data/history.json + external-links.json
│   ├── app.js           Nav, mobile drawer, footer, dark mode, UPSC mode, era calculator, spotlight search
│   ├── search.js           Client-side search index + live search wiring
│   ├── timeline.js         Master timeline rendering & filtering
│   └── period.js           Renders period.html from JSON data
├── data/
│   ├── history.json        THE single source of truth — all periods, phases, events, people, women, UPSC facts
│   └── external-links.json Curated keyword → official/encyclopedic URL map
└── assets/images/        All 17 supplied infographic PNGs (used as "original revision sheet" viewables)
```

## Running locally

No build tools needed. From the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. (Opening `index.html` directly via `file://` will not work because the pages `fetch()` the JSON data files, which browsers block over `file://`.)

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `history-of-india`).
2. Copy every file in this folder into the repository root, preserving the folder structure above.
3. Commit and push to the `main` branch.
4. In the repository, go to **Settings → Pages**, set **Source** to `main` branch, root folder, and save.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

All paths in this project are relative, so it works whether the repo is served from the root of a custom domain or from a `/repo-name/` sub-path.

## How the data model works

Everything on the site is driven by **one file: `data/history.json`**. It contains a `periods` array; each period object looks like this (trimmed):

```json
{
  "id": "mauryan-empire",
  "order": 5,
  "title": "The Mauryan Empire",
  "dateRange": "c. 322 – 185 BCE",
  "category": "ancient",
  "tagline": "One of the greatest empires of Ancient India",
  "heroImg": "mauryan_empire_2.png",
  "sourceImages": ["mauryan_empire.png", "mauryan_empire_2.png"],
  "overview": "...",
  "phases": [ { "name": "...", "range": "...", "points": ["..."] } ],
  "aspects": { "Political Administration": ["..."], "Economy": ["..."] },
  "events": [ { "year": "322 BCE", "title": "...", "theme": "polity", "desc": "..." } ],
  "people": [ { "name": "...", "role": "...", "note": "..." } ],
  "women": [ { "name": "...", "role": "...", "note": "..." } ],
  "themes": ["polity", "war", "religion"],
  "upsc": { "prelims": ["..."], "mains": ["..."] },
  "quickFacts": [ ["Founder", "Chandragupta Maurya"] ]
}
```

`period.html?id=mauryan-empire` reads this object and renders the entire page — hero, phase timeline, event cards, aspect accordions, women/people cards, UPSC panels, quick facts, and previous/next navigation (computed automatically from each period's `order`). The home page, master timeline, themes page, people page and women page are all also generated from this same file, so **everything is connected automatically** — add an event once and it appears in search, the timeline, the home page's featured strip, and the period page.

## Adding a new historical period (e.g. the Mughal Empire)

You do **not** need to touch any HTML or redesign anything:

1. Drop the new infographic image(s) into `assets/images/`.
2. Open `data/history.json` and add a new object to the `periods` array, following the shape above. Give it the next `order` number (e.g. `15`) and a unique `id` (e.g. `"mughal-empire"`).
3. Save. The new period will automatically appear in:
   - the home page's journey rail and period grid
   - the master timeline
   - the themes page (for any `themes` you tag it with)
   - people.html / women.html (for anyone in its `people`/`women` arrays)
   - search results
   - previous/next navigation on the periods immediately before and after it

## Adding or updating external reference links

Edit `data/external-links.json`. It's a flat map of `"Keyword": { "url": "...", "source": "..." }`. Any name that appears in a period's `people` array and matches a key here will automatically render as a styled, tooltipped external link (`Name ↗`) in that period's "Further Reading" panel. Prefer, in order: official Government of India / institutional sites → UN/UNESCO/international bodies → Encyclopaedia Britannica → Wikipedia.

## Design notes

- **Theme:** "Stone & Ink" — a carved-tablet/epigraph aesthetic (sandstone surfaces, ink-indigo type, verdigris + sindoor-red + ochre accent colors), with a full dark mode ("Night Epigraph"). Typography: Fraunces (display), Inter (body), IBM Plex Mono (dates/labels/utility).
- **UPSC Mode:** a toggle in the nav bar (state saved to `localStorage`) that reveals dedicated Prelims/Mains panels on every period page.
- **Dark mode:** toggle in the nav bar, saved to `localStorage`, respects `prefers-color-scheme` on first visit.
- **Accessibility:** semantic headings, visible focus states, `prefers-reduced-motion` respected, alt text on images, keyboard-operable accordions/timeline.
- **Original sheets:** every period page includes a "View Original Revision Sheet" control that opens the source infographic in a zoom/pan lightbox.

## Uttar Pradesh History track (UPPSC)

A parallel, self-contained regional track — **`up-history.html`** — covers Uttar Pradesh's history specifically for UPPSC (GS Paper I & II), from prehistoric settlements through the Vedic Age, Mahajanapadas, Maurya, Post-Maurya, Gupta, Harsha, Gurjara-Pratihara, Kalachuri-Chandella, Gahadavala, Delhi Sultanate, Jaunpur Sultanate, Mughal and Later Mughal periods, to the Revolt of 1857, British administration, and the 19th-century socio-religious reform movements — 20 pages in total.

**How it's kept separate from, yet connected to, the national chronology:**
- Every UP period carries `"region": "up"` in `data/history.json`. The home page (`index.html`) and master timeline (`timeline.html`) filter these out, so the national "one continuous journey" stays exactly as it was.
- `HistoryData.getAdjacent()` computes previous/next navigation *within the same region* — national periods chain among themselves, and the 20 UP periods chain among themselves in their own chronological sequence — so neither prev/next chain gets scrambled by the other.
- `up-history.html` is a dedicated hub (journey rail + grid) scoped to `region: "up"`, in the same visual language as the rest of the site, with its own `up` category colour.
- Nothing else was filtered: `themes.html`, `people.html`, `women.html`, `search.html` and the knowledge graph (`graph.html`) still include UP content alongside national content, because that's where the cross-region connections actually pay off — Akbar, Ashoka, Chandragupta Maurya, Samudragupta, Kanishka, Menander, Pushyamitra Shunga and dozens of other names recur in both tracks and are automatically cross-linked (84 shared names as of this build). Searching "Akbar" or opening his card on either page surfaces the other page too.

## Site audit & technical hygiene

A structural audit of the working directory turned up a stray, empty leftover directory (`{css,js,data,assets`) from an early build step's shell-quoting mistake — removed. Two more genuinely valuable additions came out of a deeper pass through the Spectrum "Brief History of Modern India" PDF:

- **New page: Governors-General and Viceroys of India** (`governors-general-and-viceroys`, national track, positioned right after British Administration) — a complete, ruler-by-ruler reference from Warren Hastings (1773) through Mountbatten (1947–48), naming the specific administrator in office for every landmark act, war, or reform mentioned elsewhere on the site. This is one of the single most classic UPSC "quick reference" tables and was previously scattered across several pages rather than available as one lookup.
- **New page: Tribal Revolts and Movements in Colonial India** (`tribal-movements-colonial-india`) — covers the Pahariyas, Chuar, Kol, Ho, Munda, Santhal (Sido and Kanhu), Bhil, Naikada, Koya, Bastar, and Tana Bhagat movements, plus a dedicated section on North-East Frontier resistance (Ahom, Khasi, Naga, Zeliangrong/Heraka). This is a genuinely underrepresented topic in most freedom-struggle narratives, including the one this site had before this pass.
- **British Administration enriched** with a "Constitutional Acts at a Glance" table (Regulating Act through the Government of India Act, 1935), including how contemporaries themselves judged each Act (Burke's and Lord North's remarks on the Regulating Act, Ilbert's and Morley's later assessments) — sourced from Spectrum's own ready-reference section, paraphrased rather than quoted at length.
- **`robots.txt` and `sitemap.xml` added** — the sitemap is generated directly from `data/history.json` (currently 89 URLs: 9 static pages + all periods) rather than hand-maintained, so it stays accurate as periods are added. **Note:** both files use a placeholder domain (`your-username.github.io/history-of-india`) — update this to your actual GitHub Pages URL after deployment.
- **Open Graph meta tags added to the home page** for better link-preview behaviour when the site is shared.

## Primary-source research pass

Six additional history textbooks were supplied directly (three editions of Rajiv Ahir's *A Brief History of Modern India* / Spectrum, Bipin Chandra et al.'s *India's Struggle for Independence*, Norman Lowe's *Mastering Modern World History*, and a general World History textbook). Given their combined length runs to several thousand pages, this pass extracted and paraphrased content from the highest-value, most exam-relevant sections first — a full page-by-page pass across all six is not something a single session can responsibly complete, and is a natural candidate for further follow-up rather than something to claim as finished:

- **New page: Foundation of the Indian National Congress** (`foundation-of-indian-national-congress`, national track, positioned between Socio-Religious Reforms and Indian Freedom Struggle) — covers the "Safety Valve" theory of the Congress's 1885 founding and the historiographical case against it, drawn from Bipin Chandra et al.'s chapters on the myth and reality of the Congress's origins.
- **Socio-Religious Reforms enriched** — added Jyotirao Phule, Narayana Guru, Lokahitwadi, and Ranade (previously missing from the reformer list), plus a new aspect category on the shared rationalist/universalist intellectual framework underlying the various reform movements.
- **World War I enriched** — added a historiographical debate section (the Fischer Thesis vs. the "tragedy of miscalculation" view vs. more recent shared-responsibility scholarship) drawn from Norman Lowe's chapter on the war's causes.
- **Independence of India enriched** — added a more specific, book-grounded account of why the Quit India Movement happened when it did (the Burma/Malaya retreat, Gandhi's Louis Fischer interview, wartime bank runs, the Wardha resolution and Gowalia Tank launch), drawn from Bipin Chandra et al.'s chapter on Quit India and the INA.

All of the above was paraphrased into original prose rather than quoted from the source books, consistent with this project's general approach to copyrighted material throughout.

## Elaborated content

Both the national and Uttar Pradesh tracks have been through an elaboration pass beyond the initial infographic extraction:

- **Every period's `overview` field** (all 77) was rewritten into a longer, standalone narrative — national overviews average ~250 words, UP overviews ~200 — adding causation, significance, and connective context between periods. The 28 UP overviews additionally cross-reference their national counterpart by name wherever one exists (e.g. the UP Mughal Period page explicitly says what it adds beyond the national Akbar/Jahangir/Shah Jahan pages).
- **Every UP-track aspect-table category** (127 of them, across all 28 pages) now carries an optional `intro` string alongside its `points` array — a short explanatory lead-in rendered above the bullet list on the period page, flagging what's exam-relevant, what connects to another page, or what's easy to misread. `js/period.js`'s aspect-rendering code checks for this `{intro, points}` shape and falls back to the older plain-array format automatically, so the national track's aspect tables (still plain arrays) render exactly as before with no migration needed.

## Knowledge graph

Beyond the static "Related Themes" panel, every period page now includes a **Related Topics** panel and automatic **"↗ also appears in"** links on every person/woman card. These are computed live at page-load time by `js/graph.js` from the same structured fields every period already carries (`themes`, `people`, `women`, `events`) — nothing here is a hand-authored link list:

- **Cross-period people**: any name that recurs across two or more periods' `people`/`women` arrays (e.g. Mahatma Gandhi appearing in *Indian Freedom Struggle*, *Mahatma Gandhi*, *Independence of India* and *India 1947–1964*) is automatically cross-linked, both ways.
- **Theme-sibling events**: each period's "Related Topics" panel surfaces a handful of events from *other* periods that share at least one theme tag (`polity`, `war`, `religion`, `economy`, `society`, `women`, `art`, `science`, `foreign`).
- **Chronological neighbours**: a flattened, site-wide event list (ordered by each period's `order` field) gives every event a computed previous/next neighbour, independent of which period it belongs to.
- **External resources**: resolved through the existing `data/external-links.json` keyword map.

Open **`graph.html`** (linked from every page's nav as "Knowledge Graph") to search any entity directly and see all of the above laid out — the historical period(s) it belongs to, its category, related events, related people/occurrences, related themes, chronological neighbours, and its external resource link.

Because the graph is computed rather than authored, it automatically extends to any new period added to `data/history.json` — a newly-added person or event just needs the same field names the rest of the file already uses.

## Current coverage

**77 periods** in total: **49 in the national chronology** (Palaeolithic Age through India 2020–Present, plus five World History pages) and **28 in the dedicated Uttar Pradesh / UPPSC track**.

National track: Prehistoric Age → Indus Valley Civilization → Vedic Age → Age of Mahajanapadas → Mauryan Empire → Ashoka the Great (deep-dive) → Post-Mauryan Period → Gupta Age → Post-Gupta Age → Early Medieval Period → Kingdoms of the North → Kingdoms of the South → Delhi Sultanate (overview) → Mamluk Dynasty → Khalji Dynasty → Tughlaq Dynasty → Sayyid Dynasty → Lodi Dynasty → Vijayanagara Empire → Mughal Empire (overview) → Babur → Humayun → The Sur Interregnum → Akbar the Great → Jahangir → Shah Jahan → Aurangzeb Alamgir → Later Mughal Empire → Establishment of British Power → The Sikh Empire → British Colonial Rule (overview) → British Administration in India → Socio-Religious Reforms → Indian Freedom Struggle → Mahatma Gandhi → Independence of India (1939–47) → Independent India — Major Phases (overview) → India 1947–1964 → India 1965–1980 → India 1981–1991 → India 1992–2000 → India 2001–2010 → India 2011–2020 → India 2020–Present → World History Chronological Chart (overview, 1750–1945) → The French Revolution → World War I → The Russian Revolution → World War II.

Uttar Pradesh track (28 pages, in corrected chronological order): UP History Overview → Prehistoric & Early Settlements → Vedic Age → Mahajanapadas → Maurya Period → Post-Maurya Period → Gupta Period → Harsha Period → Gurjara-Pratiharas → Kalachuris & Chandellas → Gahadavalas → Foundation of Cities in the Medieval Period → Delhi Sultanate Period → Jaunpur Sultanate → Sayyid & Lodi Dynasties → Mughal Period → Later Mughals → British Rule & Administration → Revolt of 1857 → Freedom Struggle in U.P. → Socio-Religious Movements → United Provinces During Modern India → Formation of Uttar Pradesh → Political Developments in Uttar Pradesh → Reorganisation of Uttar Pradesh → Economic & Social Progress → Uttar Pradesh in the 21st Century → Important Cities & Personalities of Uttar Pradesh.

*(Note: the Jaunpur Sultanate, 1394–1479, now correctly precedes the Sayyid & Lodi Dynasty page, from 1414, fixing an ordering bug from an earlier build.)*

This matches every supplied infographic image across all upload batches; alternate/expanded versions of the same period were merged into one richer entry where the source sheets overlapped (e.g. the two Babur, Akbar and Jahangir sheets; the two Independent-India "Major Phases" overview sheets; the Indian Freedom Struggle page, which draws on both `freedom_struggle.png` and the closely overlapping `movements_national.png`; the second `up_socio_religious_movement.png` upload was recognised as a duplicate and skipped rather than re-added). The five World History pages carry their own `world` category and are flagged as global background rather than part of India's national chronology; the twenty-eight Uttar Pradesh pages carry `region: "up"` and their own `up` category, and are flagged throughout as a UPPSC-focused regional companion rather than a duplicate of the national story.

A small number of dates that were not fully unambiguous in the source sheets (chiefly the exact day Uttar Pradesh was renamed from the United Provinces in January 1950) were checked against independent reference sources; the period page notes this rather than silently picking one date.

## Deep Synthesis: Exam Notes & Master Lecture Compendiums Integration

The platform integrates deep, exhaustive knowledge extracted from the canonical exam repositories (`D:\My notes for exams\History` and `D:\My notes for exams\culture`), synthesizing:

1. **Pratik Nayak's Modern Indian History & Freedom Struggle Compendiums (21 PPTX presentations)**:
   - Full cause-and-effect pipelines covering European Entry, British Doctrines (Subsidiary Alliance, Ring Fence, Subordinate Isolation, Doctrine of Lapse), Constitutional Acts (1773 to 1935), Educational Policies (Macaulay, Wood's, Hunter, Sadler, Wardha, Sargent), Press Policies (1799 Censorship to 1910 Press Act), Civil Services Evolution (Cornwallis Code to Lee Commission 1924), Land Revenue Tenures (Zamindari ~19%, Ryotwari ~51%, Mahalwari ~30%), Drain of Wealth & Deindustrialisation (R. Palme Dutt's 3 stages of colonialism, Dadabhai Naoroji, R.C. Dutt), 1857 Revolt, Pre-Congress Political Associations, Swadeshi & Bengal Partition, Surat Split 1907, Revolutionary Phases I & II, Home Rule Leagues, Gandhian Mass Movements, Swarajists vs. No-Changers, Simon Commission & Nehru Report, Civil Disobedience Movement, 1931 Karachi Resolution, Poona Pact, GoI Act 1935, Quit India parallel governments (Ballia, Tamluk, Satara), INA Trials, RIN Mutiny 1946, and Partition & Integration of States.
2. **Pratik Nayak's World History Compendiums (10 PPTX presentations)**:
   - French Revolution (Three Estates, fiscal crisis, Enlightenment thinkers, Bastille, Rights of Man, Reign of Terror, Directory, Napoleon).
   - American Revolution & American Civil War (mercantilism, taxation without representation, Declaration of Independence, Lincoln, Emancipation Proclamation, 13th-15th Amendments) alongside a comparative constitutional matrix contrasting US and Indian federalism, executive, and judicial review.
   - Unifications of Italy (Mazzini, Cavour, Garibaldi) and Germany (Bismarck, Realpolitik, 3 Wars of Unification).
   - Russian Revolution (1905, February 1917, Lenin's April Theses, October Revolution, Civil War, War Communism, NEP).
3. **B.L. Grover & Alka Mehta (*A New Look at Modern Indian History*)**:
   - Diplomatic treaties, administrative statecraft, famine commissions (Campbell 1866, Strachey 1880, Lyall 1897, MacDonnell 1901), and historiographical debates.
4. **Lieut.-Col. James Tod (*Annals and Antiquities of Rajasthan*)**:
   - Classical account of Rajput clans, Agnikula origin myth of Mount Abu, Mewar's unbroken resistance under Bappa Rawal, Rana Kumbha (Vijay Stambha, 32 forts), Rana Sanga, Maharana Pratap at Haldighati and Chavand, feudal Patta tenures, and Jauhar/Saka rituals of Chittorgarh.
5. **Prof. Yuval Noah Harari (*Sapiens: A Brief History of Humankind*)**:
   - The Cognitive Revolution (70,000 BCE, fiction-based language, stranger cooperation beyond Dunbar's number 150), Paleolithic foragers at Bhimbetka, Agricultural Revolution (10,000 BCE) as 'history's biggest fraud', Mehrgarh Neolithic transition, and the three universal imagined orders (money, empires, religions).
6. **Mahatma Gandhi (*The Story of My Experiments with Truth*)**:
   - Primary account of Satyagraha vs. Passive Resistance, spiritual mentors (Tolstoy, Ruskin, Thoreau), South African campaigns (Phoenix, Tolstoy Farm), Indian experiments (Champaran, Ahmedabad, Kheda), and the Constructive Programme.
7. **Ishani Pandya's Visual Art & Culture Compendiums (3 Master PPTX Presentations — 320 Slides)**:
   - *Lecture 1: Visual Arts & Sculptural Traditions* — Lost-wax bronze casting (cire perdue) at Mohenjo-daro, Priest-King steatite glyphics, Mauryan court art vs. popular art (monolithic Ashokan Chunar pillars with glassy finish vs. Achaemenian segmented columns, Kumrahar 80-pillar wooden hall, Didarganj Yakshini, Barabar Lomas Rishi chaitya arch), and comparative trinity of Sculptural Schools: Gandhara (Greco-Roman Apollo realism in grey schist & stucco), Mathura (purely indigenous red sandstone, masculine Buddha with abhaya mudra & simultaneous Hindu/Jain iconography), and Amaravati (white limestone narrative dynamic Jataka panels in crystalline marble).
   - *Lecture 2: Architectural Evolution* — Rock-cut caves (Barabar Ajivika to Hinayana/Mahayana chaityas/viharas at Ajanta, Ellora Caves 1–34 multi-religious harmony, top-down monolithic Kailash Temple Cave 16 under Rashtrakuta Krishna I), Gupta temple stages (flat-roofed Sanchi 17 to covered ambulatory Nachna Kuthara, Panchayatana layout at Deogarh Dashavatara temple with Sheshashayi Vishnu, and Bhitargaon terracotta brick tower), Classical temple styles (Nagara curvilinear shikhara + amalaka, Dravida stepped pyramidal Vimana + gopurams + sacred tanks, Vesara hybrid style), and Indo-Islamic synthesis (arcuate keystone arch, double dome, Charbagh quadripartite layout, pietra dura inlay, jali fretwork).
   - *Lecture 3: Performing Arts, Paintings & Puppetry* — Murals (Ajanta tempera, Ellora, Bagh, Sittanavasal Jain cave, Lepakshi Vijayanagara murals), Miniature evolution (Pala, Western Jain Apabhramsha, Mughal Tasvir Khana under Akbar, Jahangir's naturalism with Ustad Mansur, Shah Jahan's formal gold durbar, Rajasthani Kishangarh Bani Thani, Bundi, Pahari Kangra & Basohli), Folk paintings (Madhubani, Warli, Pattachitra, Kalamkari), 8 Classical Dances under Sangeet Natak Akademi (Bharatanatyam, Kathak Lucknow/Jaipur gharanas, Kathakali, Odissi, Kuchipudi tarangam, Manipuri, Mohiniyattam, Sattriya), 4 Puppetry Typologies (String: Kathputli, Kundhei, Gombeyatta, Bommalattam; Shadow: Tholu Bommalata, Togalu Gombeyaatta, Ravanachhaya; Rod: Putul Nach, Yampuri; Glove: Pavakoothu), and Classical Music (Hindustani Gharanas & Dhrupad vs. Carnatic 72 Melakarta & Trinity).
8. **Arthur Llewellyn Basham (*A Cultural History of India* & *The Wonder That Was India*)**:
   - Civilizational resilience through peaceful cultural assimilation and philosophical synthesis; Ashokan Dhamma as universal civic ethics; Shramanic heterodox traditions (Ajivikas, Buddhism, Jainism); and the peaceful maritime diffusion of Indian culture, Sanskrit epigraphy (Pallava Grantha), and cosmic architecture (Borobudur, Angkor Wat) to Southeast Asia (Suvarnabhumi) without colonial annexation.
9. **Prof. Shyama Charan Dube (*Indian Society* & *The Indian Village*)**:
   - Sociological critique of the colonial 'little republic' myth of self-sufficient village isolation; analysis of dual axes of village life (caste hierarchy and village-wide solidarity); the traditional Jajmani hereditary reciprocity system and its modern decline; changing rural stratification under land reforms, Green Revolution, and Panchayati Raj; and tribal dynamics in Indian society (isolation vs. assimilation vs. integration debate, Nehru-Elwin's Tribal Panchsheel, matrilineal kinship among Khasi and Garo, and constitutional protection under Fifth and Sixth Schedules).
10. **State Public Service & Competitive Examination Archives**:
   - **UPPSC PCS & UP RO/ARO (Samiksha Adhikari)**: 2,000 targeted questions covering Uttar Pradesh archaeology (Belan Valley, Koldihwa, Chopani Mando, Damdama, Sinauli, Alamgirpur), Mahajanapadas, Ashokan pillars in UP, Harsha at Kannauj, Jaunpur Sharqi architecture, Awadh Nawabs, 1857 revolt centers across UP districts, Kakori Train Action, Chauri Chaura, Ballia parallel government, Congress sessions in UP, fairs (Kumbh, Bateshwar, Nauchandi, Shakumbhari, Dev Sharif), folk dances (Charkula, Karma, Dhuria, Rai), and folk songs (Kajari, Birha, Alha, Rasia).
   - **Banking Examinations (IBPS PO/Clerk, SBI PO, RBI Grade B)**: 700 questions grounded in financial history, Pre-Independence banking (Bank of Hindostan 1770, Presidency Banks, Imperial Bank 1921, PNB 1894), Reserve Bank of India history (Hilton Young Commission 1926, RBI Act 1934, nationalization 1949), SBI Act 1955 (Gorwala Committee), Bank Nationalization waves (1969 & 1980), Regional Rural Banks (Prathama Bank 1975), NABARD (1982), and reform committees (Narasimham I & II, Urjit Patel, Nachiket Mor, Bimal Jalan).
   - **Railway Recruitment Board (RRB NTPC, Group D, ALP, JE)**: 720 questions covering Indian Railway heritage (16 April 1853 first train, 1925 first electric train, Acworth Committee 1924 Rail Budget separation, Kolkata Metro 1984, Fairy Queen, UNESCO Mountain Railways), ancient/medieval dynasties, founders and capitals, decisive historical battles (Tarain, Panipat, Plassey, Buxar, Talikota, Haldighati), historic slogans, and classical authors/travelers.

This massive synthesis expands the practice repository to **5,060+ statement-based & factual Prelims MCQs** and **245 analytical Mains model answer frameworks** (**5,305 total questions**), alongside **27 Canonical Master Textbooks and Examination Archives** in `books.html`.
