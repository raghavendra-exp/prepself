/* Global Navigation, Spotlight Search, Mobile Drawer/Ribbon,
   Animated Calculator & Theme System for PrepSelf Prompt Generator */

(function(){
  window.BE_STATS = {
    promptEngines: 18,
    studyModules: 27,
    companionTools: 9,
    examsCovered: "80+"
  };

  const EXAM_DATABASE = [
  {
    "title": "Creator Profile & Portfolio (Raghavendra)",
    "sub": "Official developer portfolio, projects, tech background & contact",
    "href": "https://raghavfolio-8op53xas.manus.space/",
    "cat": "creator",
    "tags": "creator profile portfolio raghavendra raghavbegins about developer founder contact author"
  },
  {
    "title": "हिंदी परीक्षा केंद्र (Hindi Exam Hub)",
    "sub": "यूपी पुलिस, UPSSSC PET, सुपर TET एवं RO/ARO संपूर्ण हिंदी पाठ्यक्रम",
    "href": "hi/index.html",
    "cat": "hindi",
    "tags": "hindi up police upprpb pet upsssc super tet ro aro samiksha adhikari syllabus notes pyq"
  },
  {
    "title": "यूपी पुलिस कांस्टेबल एवं SI (UPPRPB Hindi Guide)",
    "sub": "300 अंक पैटर्न, 37 Q सामान्य हिंदी, मूलविधि एवं सॉल्व्ड प्रश्न",
    "href": "hi/upprpb.html",
    "cat": "hindi",
    "tags": "up police upprpb constable sub inspector si daroga hindi syllabus pyq"
  },
  {
    "title": "UPSSSC PET संपूर्ण पाठ्यक्रम (Hindi Guide)",
    "sub": "15 विषय, 20 अंक ग्राफ एवं तालिका व्याख्या, करंट अफेयर्स",
    "href": "hi/upsssc-pet.html",
    "cat": "hindi",
    "tags": "upsssc pet group c lekhpal vdo graph table math hindi syllabus"
  },
  {
    "title": "UP सुपर टीईटी प्राथमिक शिक्षक भर्ती (Hindi Guide)",
    "sub": "150 अंक विस्तृत पाठ्यक्रम, बाल मनोविज्ञान एवं शिक्षण कौशल",
    "href": "hi/up-teacher.html",
    "cat": "hindi",
    "tags": "super tet up prt uptet ctet shikshak bharti child psychology pedagogy hindi"
  },
  {
    "title": "UPPSC RO/ARO समीक्षा अधिकारी (Hindi Guide)",
    "sub": "प्रीलिम्स 140 GS + 60 हिंदी, मेन्स 400 अंक प्रारूपण एवं निबंध",
    "href": "hi/uppsc-ro-aro.html",
    "cat": "hindi",
    "tags": "uppsc ro aro samiksha adhikari sachivalaya samanya hindi patra lekhan nibandh"
  },
  {
    "title": "User Guide & Platform Features Directory",
    "sub": "Step-by-step tutorial, 18 AI generators, 27 modules, mock quiz & shortcuts",
    "href": "user-guide.html",
    "cat": "guide",
    "tags": "user guide how to use tutorial features manual help instructions shortcuts workflow mock quiz modules prompt generators"
  },
  {
    "title": "Ready-Made Study Modules Hub",
    "sub": "27 Interactive Digital Textbooks & Labs (Banking, UPSC, SSC, Defence, Science)",
    "href": "study-modules.html",
    "cat": "module",
    "tags": "study modules textbooks quant reasoning ethics geography history editorial defence certifications science"
  },
  {
    "title": "Bank Quant Master (Ready-Made Module)",
    "sub": "32 Topics, Speed Math Visualizers, Arithmetic & DI",
    "href": "modules/bank-quant.html",
    "cat": "bank",
    "tags": "bank quant quantitative aptitude arithmetic speed math di sbi ibps"
  },
  {
    "title": "Bank Reasoning Master (Ready-Made Module)",
    "sub": "Floor & Box Puzzles, Seating Arrangement & Syllogism",
    "href": "modules/bank-reasoning.html",
    "cat": "bank",
    "tags": "reasoning puzzles seating arrangement syllogism bank sbi ibps"
  },
  {
    "title": "Banking English Language Master (Ready-Made Module)",
    "sub": "24 Grammar Chapters, Error Scanner & RC Speed Reader",
    "href": "modules/bank-english.html",
    "cat": "bank",
    "tags": "english grammar error detection cloze reading comprehension vocab"
  },
  {
    "title": "Banking & Financial Awareness Master (Ready-Made Module)",
    "sub": "18 Interactive Modules, RBI Policy & Banking Systems",
    "href": "modules/banking-awareness.html",
    "cat": "bank",
    "tags": "banking awareness financial awareness rbi monetary policy npa upi"
  },
  {
    "title": "General Awareness & Current Affairs (Ready-Made Module)",
    "sub": "Monthly Current Affairs, Static GK & Schemes",
    "href": "modules/general-awareness.html",
    "cat": "bank",
    "tags": "general awareness current affairs static gk polity history economy schemes"
  },
  {
    "title": "Daily Editorial Hub & Vocab Builder (Ready-Made Module)",
    "sub": "The Hindu & Indian Express Editorials with Audio Reader",
    "href": "modules/editorial-hub.html",
    "cat": "bank",
    "tags": "daily editorial the hindu indian express vocabulary newspaper reader"
  },
  {
    "title": "Computer Awareness Master (Ready-Made Module)",
    "sub": "Architecture Visualizer, Cyber Security & 600+ MCQs",
    "href": "modules/computer-awareness.html",
    "cat": "bank",
    "tags": "computer awareness keyboard shortcuts networking cyber security rrb rbi"
  },
  {
    "title": "UPSC GS-IV Ethics Master (Ready-Made Module)",
    "sub": "Ethical Reasoning Lab, 50+ Dilemma Case Studies & Probity",
    "href": "modules/gs4.html",
    "cat": "upsc",
    "tags": "upsc ethics gs4 integrity aptitude case studies probity governance"
  },
  {
    "title": "UPSC GS-III Master (Ready-Made Module)",
    "sub": "Technology, Economy, Agriculture, Environment & Security",
    "href": "modules/gs3.html",
    "cat": "upsc",
    "tags": "upsc gs3 economy agriculture science tech disaster internal security"
  },
  {
    "title": "UPSC GS-II Master (Ready-Made Module)",
    "sub": "Governance, Constitution, Polity & Social Justice",
    "href": "modules/gs2.html",
    "cat": "upsc",
    "tags": "upsc gs2 polity constitution governance social justice international relations"
  },
  {
    "title": "Complete History of India Atlas (Ready-Made Module)",
    "sub": "Prehistory to Modern India, Art & Culture, Knowledge Graph",
    "href": "modules/history.html",
    "cat": "upsc",
    "tags": "history of india ancient medieval modern art culture atlas upsc uppsc"
  },
  {
    "title": "Geography of India & Bharat Atlas (Ready-Made Module)",
    "sub": "River Basins, Monsoon Simulator, Soils & Map Drills",
    "href": "modules/geography.html",
    "cat": "upsc",
    "tags": "geography of india bharat atlas rivers climate monsoon minerals map drills"
  },
  {
    "title": "India & World: IR & Schemes (Ready-Made Module)",
    "sub": "Bilateral Relations, Global Groupings & Govt Schemes",
    "href": "modules/india-world.html",
    "cat": "upsc",
    "tags": "international relations bilateral schemes foreign policy upsc gs2"
  },
  {
    "title": "Defence Exams India Master (Ready-Made Module)",
    "sub": "NDA, CDS, AFCAT, Agniveer, SSB Interview & Medical Guide",
    "href": "modules/defence.html",
    "cat": "defence",
    "tags": "defence nda cds afcat agniveer ssb interview military armed forces"
  },
  {
    "title": "Professional Certifications India (Ready-Made Module)",
    "sub": "CA, CS, CMA, CFA, FRM, Banking & Statutory Compliance",
    "href": "modules/certifications.html",
    "cat": "prof",
    "tags": "professional certifications ca cs cma cfa frm accounting finance audit"
  },
  {
    "title": "General Science & Teaching Master (Ready-Made Module)",
    "sub": "CSIR NET, IIT JAM, CTET, NCERT Class 6-10 Lab Experiments",
    "href": "modules/science-teaching.html",
    "cat": "science",
    "tags": "general science teaching csir net iit jam ctet ncert physics chemistry biology"
  },
  {
    "title": "UP Teacher Master (Super TET & UP TGT)",
    "sub": "1,160+ Questions, Child Pedagogy & UP Special GK",
    "href": "modules/up-teacher.html",
    "cat": "state",
    "tags": "up teacher super tet prt tgt uptet pedagogy cdp shikshak bharti"
  },
  {
    "title": "UPPSC RO/ARO Master (समीक्षा अधिकारी)",
    "sub": "1,000+ Questions, Official Drafting & Hindi Essay Lab",
    "href": "modules/uppsc-ro-aro.html",
    "cat": "state",
    "tags": "uppsc ro aro samiksha adhikari hindi drafting essay prelims mains"
  },
  {
    "title": "Railways RRB Master India (Ready-Made Module)",
    "sub": "RRB NTPC, Group D, ALP, Technician & JE Science & Math",
    "href": "modules/rrb.html",
    "cat": "rrb",
    "tags": "rrb railways ntpc group d alp technician je science math reasoning"
  },
  {
    "title": "SSC Master India (Ready-Made Module)",
    "sub": "CGL, CHSL, MTS, CPO & GD Constable Drills",
    "href": "modules/ssc.html",
    "cat": "ssc",
    "tags": "ssc cgl chsl mts cpo gd constable reasoning general awareness quant"
  },
  {
    "title": "CUET Master India (Ready-Made Module)",
    "sub": "Languages, 27 Domain Subjects & General Aptitude Test",
    "href": "modules/cuet.html",
    "cat": "entrance",
    "tags": "cuet ug pg central universities nta general test domain subjects"
  },
  {
    "title": "Law Entrance Master (Ready-Made Module)",
    "sub": "CLAT & AILET Passage Legal Reasoning & Constitutional Law",
    "href": "modules/law.html",
    "cat": "law",
    "tags": "clat ailet law legal reasoning constitution torts maxims nlu"
  },
  {
    "title": "Engineering Entrance Master (Ready-Made Module)",
    "sub": "JEE Main & Advanced Physics, Chemistry & Higher Math",
    "href": "modules/engineering.html",
    "cat": "entrance",
    "tags": "jee iit main advanced engineering physics chemistry calculus math"
  },
  {
    "title": "MBA Entrance Master (Ready-Made Module)",
    "sub": "CAT, XAT, SNAP & NMAT VARC, DILR & QA",
    "href": "modules/mba.html",
    "cat": "entrance",
    "tags": "cat mba iim xat snap nmat varc dilr quantitative aptitude"
  },
  {
    "title": "NEET Medical Master (Ready-Made Module)",
    "sub": "NCERT Biology 360/360, Chemistry & Physics Numerical Drills",
    "href": "modules/neet.html",
    "cat": "entrance",
    "tags": "neet medical biology botany zoology physics chemistry mbbs bds"
  },
  {
    "title": "UPSSSC PET Master (Ready-Made Module)",
    "sub": "UP State Preliminary Eligibility Test Complete Syllabus",
    "href": "modules/upsssc-pet.html",
    "cat": "state",
    "tags": "upsssc pet up state preliminary eligibility test gk math hindi"
  },
  {
    "title": "UPPRPB Police Constable & SI (Ready-Made Module)",
    "sub": "UP Police Law, Hindi, General Knowledge & Mental Ability",
    "href": "modules/upprpb.html",
    "cat": "state",
    "tags": "upprpb up police constable sub inspector si mool vidhi law hindi gk"
  },
  {
    "title": "Bank Exam Master Prompt Generator",
    "sub": "SBI, IBPS, RRB Clerk & PO, RBI Grade B",
    "href": "bank_exam_prompt_generator.html",
    "cat": "bank",
    "tags": "banking sbi ibps rrb clerk po rbi quant reasoning english"
  },
  {
    "title": "Interactive Mock Test & Practice Simulator",
    "sub": "5-Option Practice Drills with Timer & Scorecard",
    "href": "quiz-simulator.html",
    "cat": "quiz",
    "tags": "mock test quiz practice speed math aptitude prelims mains"
  },
  {
    "title": "UPSC / IAS Exam Prompt Generator",
    "sub": "Civil Services Prelims, Mains, CSAT, Essay",
    "href": "upsc_prompt_generator.html",
    "cat": "upsc",
    "tags": "upsc ias ips prelims mains csat polity history geography ethics"
  },
  {
    "title": "SSC CGL / CHSL / MTS Prompt Generator",
    "sub": "Staff Selection Commission Tier 1 & 2",
    "href": "ssc_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "ssc cgl chsl mts cpo stenographer general awareness"
  },
  {
    "title": "Railway RRB NTPC & Group D Generator",
    "sub": "Railway Recruitment Board CBT 1 & 2",
    "href": "railway_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "rrb ntpc group d alp je rpf railway science reasoning"
  },
  {
    "title": "Defence Exam Prompt Generator",
    "sub": "NDA, CDS, AFCAT, CAPF, Agniveer",
    "href": "defence_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "defence nda cds afcat capf army navy air force ssb"
  },
  {
    "title": "GATE & PSU Exam Prompt Generator",
    "sub": "CS, ME, CE, EE, EC, ISRO, BARC",
    "href": "gate_psu_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "gate engineering psu isro barc computer mechanical electrical"
  },
  {
    "title": "NEET Medical Exam Prompt Generator",
    "sub": "Biology, Physics, Chemistry NCERT Drill",
    "href": "neet_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "neet medical biology botany zoology physics chemistry mbbs"
  },
  {
    "title": "JEE Main & Advanced Prompt Generator",
    "sub": "Maths, Physics, Chemistry Problem Solver",
    "href": "jee_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "jee iit main advanced maths physics chemistry engineering"
  },
  {
    "title": "CLAT & Law Entrance Prompt Generator",
    "sub": "CLAT, AILET, SLAT Legal Reasoning",
    "href": "law_entrance_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "clat law ailet legal reasoning constitution jurisprudence"
  },
  {
    "title": "Judiciary & PCS-J Prompt Generator",
    "sub": "State Judicial Services, Civil Law, CrPC",
    "href": "judiciary_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "judiciary pcs j judge cpc crpc evidence act law state"
  },
  {
    "title": "MBA / CAT Exam Prompt Generator",
    "sub": "CAT, XAT, SNAP, NMAT (VARC, DILR, QA)",
    "href": "mba_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "cat mba iim xat snap nmat varc dilr quant aptitude"
  },
  {
    "title": "CA / CS / CMA Professional Exam Generator",
    "sub": "Foundation, Inter, Final, Accounting & Law",
    "href": "cacs_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "ca cs cma icai accounts taxation audit cost law finance"
  },
  {
    "title": "CUET UG & PG Prompt Generator",
    "sub": "Common University Entrance Test",
    "href": "cuet_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "cuet university nta ug pg general test domain"
  },
  {
    "title": "UGC NET & JRF Exam Generator",
    "sub": "Teaching & Research Aptitude (Paper 1 & 2)",
    "href": "net_jrf_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "ugc net jrf csir assistant professor research teaching aptitude"
  },
  {
    "title": "State PSC Exam Prompt Generator",
    "sub": "BPSC, UPPSC, MPPSC, MPSC, RPSC, WBCS",
    "href": "psc_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "state psc uppsc bpsc mppsc rpsc wbcs civil services"
  },
  {
    "title": "Teaching Exams (CTET & State TET) Generator",
    "sub": "CTET Paper 1 & 2, KVS, NVS, PRT/TGT/PGT",
    "href": "teaching_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "teaching ctet tet kvs nvs pedagogy child development"
  },
  {
    "title": "Agriculture Exams Prompt Generator",
    "sub": "ICAR AIEEA, IBPS AFO, NABARD Grade A",
    "href": "agriculture_exam_prompt_generator.html",
    "cat": "tool",
    "tags": "agriculture icar afo nabard horticulture agronomy soil science"
  },
  {
    "title": "Insurance Exam Prompt Generator",
    "sub": "LIC AAO, ADO, NIACL, UIIC",
    "href": "insurance_exam_prompt_generator.html",
    "cat": "bank",
    "tags": "insurance lic aao ado niacl general insurance financial market"
  },
  {
    "title": "IBPS & SBI Clerk Complete Roadmap",
    "sub": "12-Week Zero-to-Selection Preparation Blueprint",
    "href": "IBPS_SBI_Clerk_Roadmap.html",
    "cat": "bank",
    "tags": "roadmap banking schedule strategy syllabus time table"
  },
  {
    "title": "IBPS & SBI Free Library & PDF Hub",
    "sub": "Standard Free Study Notes, Formulae & Books",
    "href": "IBPS_SBI_Free_Library.html",
    "cat": "bank",
    "tags": "library books pdf notes download free quant reasoning"
  },
  {
    "title": "27 Ready-Made Interactive Study Modules",
    "sub": "Topic Labs, Visualizers & NCERT Books for 27 Exams",
    "href": "study-modules.html",
    "cat": "tool",
    "tags": "modules textbook labs rrb ssc cuet jee neet upsc banking defence certifications science study"
  },
  {
    "title": "Exam Trend & Pattern Analysis Tool",
    "sub": "Previous Year Cutoff & Weightage Trends",
    "href": "trend-analysis-generator.html",
    "cat": "tool",
    "tags": "trend analysis cut off weightage analysis pyq shifts"
  },
  {
    "title": "All-Exam Roadmaps, Strategy & Best Books Guide",
    "sub": "4-Phase Roadmaps & Topper Strategies for All Exams",
    "href": "all-exam-roadmaps.html",
    "cat": "tool",
    "tags": "roadmap roadmaps strategy books best book list schedule timetable guide upsc ssc bank gate railway defence neet jee"
  },
  {
    "title": "About PrepSelf & Mission",
    "sub": "100% Free AI Exam Prep, Pedagogical Pillars, Author Info & FAQs",
    "href": "about.html",
    "cat": "creator",
    "tags": "about us mission vision faq free education raghavbegins platform story syllabus"
  },
  {
    "title": "More Exams AI Prompt Generator",
    "sub": "NET/JRF, Judiciary (PCS-J), Insurance, CA/CS/CMA & Agriculture",
    "href": "more_exams_prompt_generator.html",
    "cat": "tool",
    "tags": "more exams net jrf cuet judiciary pcsj insurance ca cs cma agriculture icar afo prompt"
  }
];

  /* ---------- THEME SYSTEM ---------- */
  function initTheme(){
    const saved = localStorage.getItem('be-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButtons();
  }

  function toggleTheme(){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('be-theme', nextTheme);
    updateThemeButtons();
  }

  function updateThemeButtons(){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const sunIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const icon = isDark ? sunIcon : moonIcon;
    const labelText = isDark ? 'Light' : 'Dark';
    const tooltip = isDark ? 'Switch to light theme' : 'Switch to dark theme';

    document.querySelectorAll('.theme-icon-btn, #themeToggleBtn, .be-theme-btn').forEach(btn => {
      const textEl = btn.querySelector('.be-tool-text, span');
      const iconEl = btn.querySelector('.be-tool-icon');
      if (iconEl && textEl) {
        iconEl.innerHTML = icon;
        textEl.textContent = labelText;
      } else if (btn.classList.contains('be-btn-with-label') || btn.classList.contains('be-btn-theme')) {
        btn.innerHTML = `${icon} <span class="be-tool-text">${labelText}</span>`;
      } else {
        btn.innerHTML = icon;
      }
      btn.title = tooltip;
      btn.setAttribute('aria-label', tooltip);
    });

    const dTheme = document.getElementById('drawerThemeToggle');
    if (dTheme) {
      dTheme.innerHTML = `${icon} <span>${isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>`;
      dTheme.title = tooltip;
      dTheme.setAttribute('aria-label', tooltip);
    }
  }

  /* ---------- SPOTLIGHT SEARCH (Ctrl+K) ---------- */
  function initSpotlight(){
    if (document.getElementById('spotlightModal')) return;

    const modal = document.createElement('div');
    modal.id = 'spotlightModal';
    modal.className = 'spotlight-modal';
    modal.innerHTML = `
      <div class="spotlight-backdrop" onclick="window.closeSpotlight()"></div>
      <div class="spotlight-box">
        <div class="spotlight-input-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="text" id="spotlightInput" placeholder="Search 20+ exam prompt generators, roadmaps, mock tests... (Esc to close)" autocomplete="off">
          <kbd class="spotlight-esc" onclick="window.closeSpotlight()">ESC</kbd>
        </div>
        <div class="spotlight-results" id="spotlightResults">
          <div class="spotlight-hint">
            <span>Type to search across Banking, UPSC, SSC, Mock Drills, Roadmaps, and AI Mentors.</span>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);

    const input = document.getElementById('spotlightInput');
    const results = document.getElementById('spotlightResults');
    let timer;

    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const q = input.value.trim().toLowerCase();
        if (!q) {
          results.innerHTML = '<div class="spotlight-hint"><span>Type to search across Banking, UPSC, SSC, Mock Drills, Roadmaps, and AI Mentors.</span></div>';
          return;
        }

        const terms = q.split(/\s+/).filter(Boolean);
        const hits = EXAM_DATABASE.filter(item => {
          const fullText = (item.title + ' ' + item.sub + ' ' + item.tags).toLowerCase();
          return terms.every(t => fullText.includes(t));
        });

        if (!hits.length) {
          results.innerHTML = `<div class="spotlight-empty">No tools found matching "${q}". Try searching "SBI", "Quant", "Reasoning", "Mock", or "UPSC".</div>`;
          return;
        }

        results.innerHTML = hits.map((h, i) => `
          <a class="spotlight-item ${i===0?'selected':''}" href="${h.href}" ${h.href.startsWith('http')?'target="_blank" rel="noopener"':''} onclick="window.closeSpotlight()">
            <span class="sp-badge sp-${h.cat}">${h.cat.toUpperCase()}</span>
            <div class="sp-text">
              <span class="sp-title">${h.title}</span>
              <span class="sp-sub">${h.sub}</span>
            </div>
            <span class="sp-arrow">&rarr;</span>
          </a>
        `).join('');
      }, 100);
    });

    // Global shortcut listener
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.openSpotlight();
      } else if (e.key === 'Escape') {
        window.closeSpotlight();
        window.closeCalculator();
      }
    });
  }

  window.openSpotlight = function(){
    const modal = document.getElementById('spotlightModal');
    if (!modal) return;
    modal.classList.add('open');
    const input = document.getElementById('spotlightInput');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
    }
  };

  window.closeSpotlight = function(){
    const modal = document.getElementById('spotlightModal');
    if (modal) modal.classList.remove('open');
  };

  /* ---------- ANIMATED MODERN CALCULATOR ---------- */
  let calcState = { expr: '', curr: '0', justEvaluated: false };

  function initCalculator(){
    if (document.getElementById('calcModal')) return;

    const modal = document.createElement('div');
    modal.id = 'calcModal';
    modal.className = 'calc-modal';
    modal.innerHTML = `
      <div class="calc-backdrop" onclick="window.closeCalculator()"></div>
      <div class="calc-card">
        <div class="calc-hd">
          <div class="calc-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>
            <b>Speed Math &amp; Score Calculator</b>
          </div>
          <button class="calc-cls" onclick="window.closeCalculator()" aria-label="Close calculator">&times;</button>
        </div>

        <div class="calc-display">
          <div class="calc-expr" id="calcExpr"></div>
          <div class="calc-val" id="calcVal">0</div>
        </div>

        <div class="calc-grid">
          <button class="ck-btn ck-fn" onclick="window.calcAction('clear')">C</button>
          <button class="ck-btn ck-fn" onclick="window.calcAction('backspace')">&larr;</button>
          <button class="ck-btn ck-fn" onclick="window.calcAction('percent')">%</button>
          <button class="ck-btn ck-op" onclick="window.calcAction('/')">&divide;</button>

          <button class="ck-btn ck-num" onclick="window.calcAction('7')">7</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('8')">8</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('9')">9</button>
          <button class="ck-btn ck-op" onclick="window.calcAction('*')">&times;</button>

          <button class="ck-btn ck-num" onclick="window.calcAction('4')">4</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('5')">5</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('6')">6</button>
          <button class="ck-btn ck-op" onclick="window.calcAction('-')">&minus;</button>

          <button class="ck-btn ck-num" onclick="window.calcAction('1')">1</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('2')">2</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('3')">3</button>
          <button class="ck-btn ck-op" onclick="window.calcAction('+')">+</button>

          <button class="ck-btn ck-fn" onclick="window.calcAction('plusminus')">&plusmn;</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('0')">0</button>
          <button class="ck-btn ck-num" onclick="window.calcAction('.')">.</button>
          <button class="ck-btn ck-eq" onclick="window.calcAction('eval')">=</button>
        </div>

        <div style="margin-top:12px; font-size:11px; color:var(--txt3); text-align:center;">
          Quick scratchpad for cutoffs, CI/SI ratios, and sectional marks.
        </div>
      </div>`;
    document.body.appendChild(modal);

    document.addEventListener('keydown', (e) => {
      const m = document.getElementById('calcModal');
      if (!m || !m.classList.contains('open')) return;

      if (e.key >= '0' && e.key <= '9') window.calcAction(e.key);
      else if (['+', '-', '*', '/'].includes(e.key)) window.calcAction(e.key);
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); window.calcAction('eval'); }
      else if (e.key === 'Backspace') window.calcAction('backspace');
      else if (e.key === 'Escape') window.closeCalculator();
      else if (e.key === '.') window.calcAction('.');
    });
  }

  window.calcAction = function(act){
    const exprEl = document.getElementById('calcExpr');
    const valEl = document.getElementById('calcVal');

    if (act === 'clear') {
      calcState.expr = '';
      calcState.curr = '0';
      calcState.justEvaluated = false;
    } else if (act === 'backspace') {
      if (calcState.justEvaluated) calcState.curr = '0';
      else calcState.curr = calcState.curr.length > 1 ? calcState.curr.slice(0, -1) : '0';
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
      if (calcState.curr === '0' || calcState.justEvaluated) {
        calcState.curr = act;
        calcState.justEvaluated = false;
      } else {
        calcState.curr += act;
      }
    }

    if (exprEl) exprEl.textContent = calcState.expr;
    if (valEl) valEl.textContent = calcState.curr;
  };

  window.openCalculator = function(){
    const modal = document.getElementById('calcModal');
    if (modal) modal.classList.add('open');
  };

  window.closeCalculator = function(){
    const modal = document.getElementById('calcModal');
    if (modal) modal.classList.remove('open');
  };

  /* ---------- LEFT SIDE BREADCRUMB SLIDER & DRAWER ---------- */
  function initMobileNav(){
    let drawer = document.getElementById('mobileDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobileDrawer';
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'PrepSelf Navigation Drawer & Directory');
      drawer.innerHTML = `
        <div class="drawer-backdrop" onclick="window.closeMobileDrawer()"></div>
        <aside class="drawer-panel" id="navDrawerPanel">
          <div class="drawer-hd">
            <div class="drawer-bc-track">
              <a href="./" class="drawer-bc-home" onclick="window.closeMobileDrawer()">🏠 PrepSelf</a>
              <span class="drawer-bc-sep">/</span>
              <span class="drawer-bc-current">Menu Explorer</span>
            </div>
            <button class="drawer-close" onclick="window.closeMobileDrawer()" title="Close menu (Esc)" aria-label="Close menu">&times;</button>
          </div>
          <div class="drawer-search-box">
            <span class="drawer-search-icon" aria-hidden="true">&#x1F50D;</span>
            <input type="text" id="drawerSearchInput" class="drawer-search-input" placeholder="Quick filter suites &amp; tools..." autocomplete="off" oninput="window.filterDrawerLinks(this.value)" aria-label="Filter navigation suites and tools">
          </div>
          <div class="drawer-links" id="drawerLinksContainer">
            <button class="drawer-link app-install-ui drawer-app-install" id="drawerChromeInstall" onclick="window.triggerChromeInstall(); window.closeMobileDrawer();" style="background:rgba(6,182,212,0.12);color:#0284C7;font-weight:800;border:1px solid rgba(6,182,212,0.3);width:100%;text-align:left;display:flex;align-items:center;cursor:pointer">
              <span class="drawer-icon">⚡</span> <span>Install Web App (PWA)</span>
            </button>
            <div class="drawer-group">
              <div class="drawer-group-title">⚡ 1. Daily Habit &amp; Practice</div>
              <a href="./" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🏠</span> <span>Home Dashboard &amp; Cockpit</span>
              </a>
              <a href="daily-quiz.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚡</span> <span>Daily 5-Q Speed Drill</span>
              </a>
              <a href="current-affairs-capsule.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📰</span> <span>Current Affairs &amp; Banking Capsule</span>
              </a>
              <button class="drawer-link" onclick="window.closeMobileDrawer(); window.openFormulaVault();" style="background:transparent;border:none;width:100%;text-align:left;cursor:pointer;font-family:inherit">
                <span class="drawer-icon">📐</span> <span>Speed Math Formula Vault</span>
              </button>
            </div>
            <div class="drawer-group">
              <div class="drawer-group-title">🎯 2. Timed CBT Mock Lab</div>
              <a href="quiz-simulator.html" class="drawer-link" onclick="window.closeMobileDrawer()" style="font-weight:800;color:var(--gr2)">
                <span class="drawer-icon">🎯</span> <span>Mock Quiz Simulator (5-Option Drills)</span>
              </a>
            </div>
            <div class="drawer-group">
              <div class="drawer-group-title">📚 3. 27 Subject Master Suites</div>
              <a href="study-modules.html" class="drawer-link" onclick="window.closeMobileDrawer()" style="font-weight:800;color:var(--pr)">
                <span class="drawer-icon">📚</span> <span>Browse All 27 Study Suites &rarr;</span>
              </a>
              <a href="modules/bank-quant.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📐</span> <span>Bank Quantitative Aptitude</span>
              </a>
              <a href="modules/bank-reasoning.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🧩</span> <span>Bank Reasoning Master</span>
              </a>
              <a href="modules/bank-english.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📖</span> <span>Banking English Language</span>
              </a>
              <a href="modules/banking-awareness.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">💰</span> <span>Banking &amp; Financial Awareness</span>
              </a>
              <a href="modules/general-awareness.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🌍</span> <span>General Awareness &amp; Current Affairs</span>
              </a>
              <a href="modules/editorial-hub.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📰</span> <span>Daily Editorial Hub &amp; Vocab</span>
              </a>
              <a href="modules/gs4.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚖️</span> <span>UPSC GS-IV Ethics &amp; Integrity</span>
              </a>
              <a href="modules/ssc.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📋</span> <span>SSC Master India (CGL, CHSL, MTS)</span>
              </a>
              <a href="modules/rrb.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🚆</span> <span>Railways RRB Master (NTPC, Group D)</span>
              </a>
              <a href="modules/history.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📜</span> <span>History of India &amp; Atlas</span>
              </a>
              <a href="modules/geography.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🗺️</span> <span>Geography of India Atlas</span>
              </a>
              <a href="modules/cuet.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🎓</span> <span>CUET Master India</span>
              </a>
              <a href="modules/engineering.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🧪</span> <span>Engineering (JEE Main &amp; Adv)</span>
              </a>
              <a href="modules/neet.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🩺</span> <span>NEET Master India</span>
              </a>
              <a href="modules/law.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚖️</span> <span>Law Entrance (CLAT &amp; AILET)</span>
              </a>
              <a href="modules/mba.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">💼</span> <span>MBA Entrance (CAT &amp; XAT)</span>
              </a>
              <a href="modules/defence.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🎖️</span> <span>Defence Exams (NDA, CDS, AFCAT)</span>
              </a>
              <a href="modules/certifications.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📊</span> <span>Professional Certifications (CA/CS)</span>
              </a>
              <a href="modules/science-teaching.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🔬</span> <span>General Science &amp; CSIR NET</span>
              </a>
              <a href="hi/index.html" class="drawer-link" onclick="window.closeMobileDrawer()" style="background:rgba(244,114,182,0.12);color:#DB2777;font-weight:800;border:1px solid rgba(244,114,182,0.3)">
                <span class="drawer-icon">🇮🇳</span> <span>हिंदी परीक्षा केंद्र (UP Police, PET, TET)</span>
              </a>
            </div>
            <div class="drawer-group">
              <div class="drawer-group-title">🧮 4. Exam Calculators &amp; Predictors</div>
              <a href="negative-marking-calculator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚖️</span> <span>Negative Marking Calculator</span>
              </a>
              <a href="percentile-cutoff-predictor.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📊</span> <span>Percentile &amp; Cutoff Predictor</span>
              </a>
              <a href="eligibility-age-checker.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🎂</span> <span>Exam Eligibility &amp; Age Checker</span>
              </a>
            </div>
            <div class="drawer-group">
              <div class="drawer-group-title">🗺️ 5. Roadmaps &amp; Free Library</div>
              <a href="all-exam-roadmaps.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🗺️</span> <span>All-Exam 4-Phase Roadmaps</span>
              </a>
              <a href="IBPS_SBI_Clerk_Roadmap.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🧭</span> <span>12-Week Banking Prep Roadmap</span>
              </a>
              <a href="IBPS_SBI_Free_Library.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📖</span> <span>Free Digital Library &amp; PDF Books</span>
              </a>
              <a href="trend-analysis-generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📈</span> <span>Exam Trend &amp; Pattern Analysis</span>
              </a>
            </div>
            <div class="drawer-group">
              <div class="drawer-group-title">✨ 6. 18 Dedicated AI Prompt Engines</div>
              <a href="bank_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🏦</span> <span>Banking Prompt Generator (SBI/IBPS)</span>
              </a>
              <a href="upsc_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🏛️</span> <span>UPSC / IAS Prompt Generator</span>
              </a>
              <a href="ssc_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📋</span> <span>SSC CGL / CHSL Prompt Generator</span>
              </a>
              <a href="railway_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🚆</span> <span>Railway RRB NTPC Generator</span>
              </a>
              <a href="defence_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🎖️</span> <span>Defence Exams Prompt Generator</span>
              </a>
              <a href="gate_psu_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚙️</span> <span>GATE &amp; PSU Prompt Generator</span>
              </a>
              <a href="neet_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🩺</span> <span>NEET Medical Prompt Generator</span>
              </a>
              <a href="jee_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🧪</span> <span>JEE Main &amp; Adv Prompt Generator</span>
              </a>
              <a href="law_entrance_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚖️</span> <span>Law (CLAT / AILET) Generator</span>
              </a>
              <a href="mba_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">💼</span> <span>MBA / CAT Prompt Generator</span>
              </a>
              <a href="teaching_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📚</span> <span>Teaching (CTET &amp; State) Generator</span>
              </a>
              <a href="psc_exam_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🗺️</span> <span>State PSC Prompt Generator</span>
              </a>
              <a href="more_exams_prompt_generator.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">⚡</span> <span>More Exams AI (NET/Judiciary)</span>
              </a>
            </div>
            <div class="drawer-group">
              <div class="drawer-group-title">ℹ️ 7. Guides, About &amp; Support</div>
              <a href="user-guide.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📘</span> <span>User Guide &amp; Features Directory</span>
              </a>
              <a href="about.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📖</span> <span>About PrepSelf &amp; Mission</span>
              </a>
              <a href="sitemap.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🗺️</span> <span>Site Directory &amp; Sitemap</span>
              </a>
              <a href="contact.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">📞</span> <span>Contact Us &amp; Corrections</span>
              </a>
              <a href="privacy-policy.html" class="drawer-link" onclick="window.closeMobileDrawer()">
                <span class="drawer-icon">🛡️</span> <span>Privacy Policy</span>
              </a>
              <a href="https://raghavfolio-8op53xas.manus.space/" target="_blank" rel="noopener" class="drawer-link" onclick="window.closeMobileDrawer()" style="background:rgba(99,102,241,0.12);color:#818CF8;font-weight:700">
                <span class="drawer-icon">👨‍💻</span> <span>Creator Profile (Raghavendra) ↗</span>
              </a>
            </div>
          </div>
          <div class="drawer-footer">
            <button class="drawer-tool-btn" id="drawerThemeToggle" onclick="window.toggleTheme()">
              <span>Toggle Theme</span>
            </button>
            <button class="drawer-tool-btn" onclick="window.closeMobileDrawer(); window.openFormulaVault();">
              <span>⚡ Formulas</span>
            </button>
            <button class="drawer-tool-btn" onclick="window.closeMobileDrawer(); window.openCalculator();">
              <span>🧮 Calculator</span>
            </button>
          </div>
        </aside>`;
      document.body.appendChild(drawer);
    }

    // 2. Mobile Bottom Ribbon
    let bnav = document.getElementById('mobileBottomNav');
    if (!bnav) {
      bnav = document.createElement('nav');
      bnav.id = 'mobileBottomNav';
      bnav.className = 'mobile-bottom-nav';
      const p = location.pathname.split('/').pop() || '';
      const isHome = (!p || p === 'index.html');

      bnav.innerHTML = `
        <a href="./" class="bnav-item ${isHome ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </a>
        <button class="bnav-item" onclick="window.toggleMobileDrawer()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <span>Menu</span>
        </button>
        <a href="quiz-simulator.html" class="bnav-item ${p==='quiz-simulator.html'?'active':''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Mock Lab</span>
        </a>
        <a href="study-modules.html" class="bnav-item ${p==='study-modules.html'?'active':''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>Suites</span>
        </a>
        <button class="bnav-item" onclick="window.openSpotlight()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <span>Search</span>
        </button>`;
      document.body.appendChild(bnav);
    }
  }

  window.toggleMobileDrawer = function(){
    const drawer = document.getElementById('mobileDrawer');
    if (!drawer) return;
    const isOpen = drawer.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const toggleBtn = document.getElementById('drawerToggleBtn');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      const search = document.getElementById('drawerSearchInput');
      if (search) {
        search.value = '';
        setTimeout(() => search.focus(), 150);
      }
    }
  };

  window.closeMobileDrawer = function(){
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
    const toggleBtn = document.getElementById('drawerToggleBtn');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  };

  window.filterDrawerLinks = function(q){
    const filter = (q || '').trim().toLowerCase();
    const links = document.querySelectorAll('#drawerLinksContainer .drawer-link');
    const groups = document.querySelectorAll('#drawerLinksContainer .drawer-group');

    links.forEach(lnk => {
      const text = lnk.textContent.toLowerCase();
      const match = !filter || text.includes(filter);
      lnk.style.display = match ? 'flex' : 'none';
    });

    groups.forEach(grp => {
      const visibleLinks = grp.querySelectorAll('.drawer-link:not([style*="display: none"])');
      grp.style.display = (!filter || visibleLinks.length > 0) ? 'block' : 'none';
    });
  };

  window.toggleTheme = toggleTheme;
  window.openCalc = window.openCalculator;
  window.closeCalc = window.closeCalculator;
  window.toggleDrawer = window.toggleMobileDrawer;
  window.closeDrawer = window.closeMobileDrawer;

  window.BE_NAV = {
    openSpotlight: () => window.openSpotlight && window.openSpotlight(),
    closeSpotlight: () => window.closeSpotlight && window.closeSpotlight(),
    openCalc: () => window.openCalculator && window.openCalculator(),
    openCalculator: () => window.openCalculator && window.openCalculator(),
    closeCalc: () => window.closeCalculator && window.closeCalculator(),
    closeCalculator: () => window.closeCalculator && window.closeCalculator(),
    toggleTheme: () => window.toggleTheme && window.toggleTheme(),
    toggleDrawer: () => window.toggleMobileDrawer && window.toggleMobileDrawer(),
    toggleMobileDrawer: () => window.toggleMobileDrawer && window.toggleMobileDrawer(),
    closeDrawer: () => window.closeMobileDrawer && window.closeMobileDrawer(),
    closeMobileDrawer: () => window.closeMobileDrawer && window.closeMobileDrawer()
  };

  /* Toast message alert */
  window.showToast = function(msg){
    let t = document.getElementById('toastMsg');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toastMsg';
      t.className = 'toast-msg';
      document.body.appendChild(t);
    }
    t.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  };

  /* ---------- PWA SERVICE WORKER & CHROME INSTALL ---------- */
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const chromeBtn = document.getElementById('chromeInstallBtn');
    if (chromeBtn) chromeBtn.style.display = 'inline-flex';
    const drawerBtn = document.getElementById('drawerChromeInstall');
    if (drawerBtn) drawerBtn.style.display = 'flex';
  });

  window.triggerChromeInstall = function(){
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          if (window.showToast) window.showToast('PrepSelf App installed successfully!');
        }
        deferredPrompt = null;
      });
    } else {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        if (window.showToast) window.showToast('PrepSelf is already installed!');
      } else {
        if (window.showToast) window.showToast('In Chrome: Tap ⋮ Menu > "Install app" or "Add to Home screen"');
      }
    }
  };

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch((err) => {
        console.warn('[PWA] Service Worker non-critical error:', err);
      });
    });
  }

  // Initialize on DOMContentLoaded
  function initAll(){
    initTheme();
    initSpotlight();
    initCalculator();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
