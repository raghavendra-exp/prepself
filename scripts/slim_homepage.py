#!/usr/bin/env python3
"""
Slim the PrepSelf Homepage (index.html):
1. Above the Fold:
   - H1: Free Mock Tests & AI Prompts for 80+ Exams
   - Exam Picker dropdown with direct integration to PrepHabit
   - ONE Single Primary CTA button (Start Free Practice / Daily-10 Set)
   - Trust proof line (Zero Sign-Up, Instant CBT, Hindi Portal link)
2. De-duplicate 27 Study Modules:
   - Remove redundant slider (#homeChipSlider) and 8 hidden grids (#gridModBank, etc.)
   - Keep 1 clean section of 6 featured suites with direct links to static pages (modules/*.html)
   - Link out to study-modules.html with a prominent CTA button
   - Remove the redundant #coverage section (lines 2909-3307)
3. Performance & Below-the-fold Lazy-Rendering:
   - Add .below-fold-sec { content-visibility: auto; contain-intrinsic-size: 1px 700px; }
   - Add .below-fold-sec class to offscreen sections
   - Defer non-critical scripts (studio.js, nav.js, visitor-counter.js, habit-engine.js)
"""

import pathlib
import re

INDEX_PATH = pathlib.Path(__file__).resolve().parent.parent / "index.html"

def slim_homepage():
    content = INDEX_PATH.read_text(encoding="utf-8")

    # 1. Add below-fold-sec CSS rule
    if ".below-fold-sec" not in content:
        css_addition = """
    /* ── PERFORMANCE: LAZY-RENDER BELOW THE FOLD (4G / MOBILE) ── */
    .below-fold-sec {
      content-visibility: auto;
      contain-intrinsic-size: 1px 700px;
    }
    .hero-exam-picker-wrap select:focus {
      border-color: #38BDF8;
      box-shadow: 0 0 0 3px rgba(56,189,248,0.3);
    }
"""
        content = content.replace("  </style>", css_addition + "  </style>", 1)

    # 2. Replace Hero Section (lines ~1298 to 1406)
    hero_pattern = re.compile(
        r'<section class="hero">.*?</section>',
        re.DOTALL
    )

    new_hero = """<section class="hero">
    <div class="hero-bg">
      <div class="hero-bg-blob hb1"></div>
      <div class="hero-bg-blob hb2"></div>
      <div class="hero-bg-blob hb3"></div>
      <div class="hero-grid"></div>
    </div>

    <div class="hero-inner">
      <div class="hero-eyebrow">
        <span>⚡</span> 100% Free &amp; Open Access &nbsp;&middot;&nbsp; 2026&ndash;2027 Pattern Calibrated &nbsp;&middot;&nbsp; Zero Paywalls
      </div>

      <h1 class="hero-hd" style="font-size:clamp(30px, 4.4vw, 48px);font-weight:900;letter-spacing:-.8px;line-height:1.2;margin-bottom:14px;color:#fff">
        Free Mock Tests &amp; AI Prompts for 80+ Exams
      </h1>

      <p class="hero-sub" style="max-width:620px;margin:0 auto 24px;font-size:16px;color:rgba(255,255,255,0.85);line-height:1.55">
        Self-study engine for SBI PO, IBPS, SSC CGL, UPSC, Railways &amp; State exams. Practice timed CBT mock tests, speed math drills, and exam-calibrated AI prompts with zero paywalls.
      </p>

      <!-- ── TARGET EXAM PICKER (ABOVE THE FOLD) ── -->
      <div class="hero-exam-picker-wrap" style="max-width:440px;margin:0 auto 20px;text-align:left">
        <label for="heroExamSelect" style="display:block;font-size:12px;font-weight:800;color:var(--cy2);letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px">
          🎯 Choose Your Target Exam
        </label>
        <div style="position:relative">
          <select id="heroExamSelect" class="hero-exam-select" onchange="window.handleHeroExamSelect(this.value)" aria-label="Choose Your Target Exam" style="width:100%;padding:13px 40px 13px 16px;border-radius:14px;background:rgba(15,23,42,0.85);border:1.5px solid rgba(56,189,248,0.4);color:#fff;font-size:15px;font-weight:700;cursor:pointer;-webkit-appearance:none;appearance:none;box-shadow:0 4px 18px rgba(0,0,0,0.3);outline:none">
            <option value="sbi-po">🏦 SBI PO 2026 (Banking &amp; Insurance)</option>
            <option value="ibps-po">🏛️ IBPS PO &amp; Clerk 2026</option>
            <option value="ssc-cgl">📋 SSC CGL &amp; CHSL 2026</option>
            <option value="upsc-cse">🇮🇳 UPSC Civil Services (IAS) 2026–2027</option>
            <option value="rrb-ntpc">🚆 Railway RRB NTPC &amp; Group D</option>
            <option value="gate">⚙️ GATE 2027 &amp; Engineering PSUs</option>
            <option value="defence">🎖️ Defence (NDA, CDS, AFCAT)</option>
            <option value="jee">🧪 JEE Main &amp; Advanced</option>
            <option value="neet">🩺 NEET UG Medical</option>
            <option value="law">⚖️ CLAT &amp; Law Entrance</option>
            <option value="mba">💼 CAT &amp; MBA Entrance</option>
            <option value="teaching">📚 CTET &amp; State Teaching</option>
            <option value="state-psc">🗺️ State PSC &amp; Recruitment</option>
          </select>
          <span style="position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;color:#38BDF8;font-size:14px;font-weight:800">▼</span>
        </div>
      </div>

      <!-- ── SINGLE PRIMARY CTA (ABOVE THE FOLD) ── -->
      <div class="hero-single-cta" style="margin-bottom:14px">
        <a href="quiz-simulator.html" id="heroPrimaryCta" class="btn-hero-primary" style="display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:15px 36px;border-radius:14px;font-size:16px;font-weight:900;text-decoration:none;color:#fff;background:linear-gradient(135deg,#3B82F6 0%,#1D4ED8 100%);box-shadow:0 8px 24px rgba(37,99,235,0.45);transition:all .18s ease;cursor:pointer">
          <span>⚡ Start Free Practice (Daily-10 Set)</span>
          <span style="font-size:18px">&rarr;</span>
        </a>
      </div>

      <div style="font-size:12px;color:rgba(255,255,255,0.65);display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap">
        <span>✓ Zero Sign-Up Required</span>
        <span>✓ Instant CBT Simulation</span>
        <a href="hi/" style="color:#FDBA74;text-decoration:none;font-weight:700">🇮🇳 हिंदी माध्यम पोर्टल &rarr;</a>
      </div>
    </div>
  </section>"""

    content = hero_pattern.sub(new_hero, content, count=1)

    # 3. Add visitor counter widget into main.wrap if not already inside main
    # Place it directly before personalizedCommandCenter
    visitor_widget_markup = """    <!-- ════ TRANSPARENT COMMUNITY STUDY COUNTER WIDGET ════ -->
    <div class="visitor-counter-card" id="visitorCounterCard" title="Study Sessions Tracked" style="margin-top:-20px;margin-bottom:28px">
      <div class="vcc-col">
        <div class="vcc-icon-wrap" style="background:rgba(59,130,246,0.18);color:#60A5FA">
          <span class="vcc-icon">👥</span>
        </div>
        <div>
          <div class="vcc-num"><span id="visitorCount">--</span></div>
          <div class="vcc-label">Study Visits Tracked</div>
        </div>
      </div>

      <div class="vcc-divider"></div>

      <div class="vcc-col">
        <div class="vcc-icon-wrap" style="background:rgba(16,185,129,0.18);color:#34D399">
          <span class="vcc-pulse-dot"></span>
          <span class="vcc-icon">🟢</span>
        </div>
        <div>
          <div class="vcc-num"><span id="activeLearnersCount" style="font-size:16px;color:#34D399">Live</span></div>
          <div class="vcc-label">CBT &amp; Study Engine</div>
        </div>
      </div>

      <div class="vcc-divider"></div>

      <div class="vcc-col">
        <div class="vcc-icon-wrap" style="background:rgba(245,158,11,0.18);color:#FCD34D">
          <span class="vcc-icon">⚡</span>
        </div>
        <div>
          <div class="vcc-num"><span id="todayVisitsCount">--</span></div>
          <div class="vcc-label">Today's Visits</div>
        </div>
      </div>

      <div class="vcc-divider"></div>

      <div class="vcc-col">
        <div class="vcc-icon-wrap" style="background:rgba(168,85,247,0.18);color:#C084FC">
          <span class="vcc-icon">🇮🇳</span>
        </div>
        <div>
          <div class="vcc-num" style="font-size:16px">Free &amp; Open</div>
          <div class="vcc-label">Zero Paywalls &bull; MIT</div>
        </div>
      </div>
    </div>\n\n"""

    if 'id="visitorCounterCard"' not in content:
        content = content.replace(
            '<div id="personalizedCommandCenter"></div>',
            visitor_widget_markup + '    <div id="personalizedCommandCenter"></div>',
            1
        )

    # 4. Replace #studyModules section with 6 featured items + CTA
    modules_pattern = re.compile(
        r'<section id="studyModules"[^>]*>.*?</section>',
        re.DOTALL
    )

    new_study_modules = """<section id="studyModules" style="margin-bottom:56px;scroll-margin-top:120px">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:24px">
        <div>
          <div class="sec-eyebrow">⚡ High-Yield Interactive Laboratories &middot; 100% Free</div>
          <h2 class="sec-hd">Featured Interactive Study Suites</h2>
          <p class="sec-sub" style="margin-bottom:0">Deep-dive digital textbooks, speed math visualizers, dilemma reasoning labs, and CBT mock engines calibrated for the 2026–2027 syllabus.</p>
        </div>
        <div>
          <a href="study-modules.html" class="hub-pill-btn" style="background:linear-gradient(135deg,var(--pr),#1D4ED8);color:#fff;border:none">
            📚 Browse All 27 Suites &rarr;
          </a>
        </div>
      </div>

      <!-- 6 Featured Items Grid -->
      <div class="cov-grid" style="grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px">

        <!-- 1. Bank Quant -->
        <div class="cov-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:28px">📐</span>
              <span style="font-size:11px;font-weight:800;color:var(--cy2);background:rgba(13,148,136,.12);padding:3px 9px;border-radius:6px;border:1px solid rgba(13,148,136,.25)">QUANT MASTER</span>
            </div>
            <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;color:var(--txt)">Bank Quantitative Aptitude Master</h3>
            <p style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">32 high-yield topics, speed math visualizers, topper dual solutions, and full CBT mock engines for SBI Clerk, IBPS Clerk/PO &amp; RRB OA.</p>
            <div style="font-size:11.5px;color:var(--txt3);margin-bottom:14px;display:flex;flex-wrap:wrap;gap:5px">
              <span class="badge b-ess">Speed Math Lab</span>
              <span class="badge b-ess">Radar &amp; Caselet DI</span>
              <span class="badge b-ess">Quadratic Equations</span>
              <span class="badge b-ess">Arithmetic Word Problems</span>
            </div>
          </div>
          <div>
            <a href="modules/bank-quant.html" class="act-btn act-btn-p" style="text-align:center;padding:11px;display:block;background:linear-gradient(135deg,var(--pr),#2563EB);color:#fff;border-radius:10px;font-weight:800;text-decoration:none">⚡ Open Quant Suite &rarr;</a>
          </div>
        </div>

        <!-- 2. Bank Reasoning -->
        <div class="cov-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:28px">🧩</span>
              <span style="font-size:11px;font-weight:800;color:#8B5CF6;background:rgba(139,92,246,.12);padding:3px 9px;border-radius:6px;border:1px solid rgba(139,92,246,.25)">REASONING MASTER</span>
            </div>
            <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;color:var(--txt)">Bank Reasoning Master</h3>
            <p style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">Floor &amp; flat puzzles, circular seating in-out logic, reverse syllogisms, machine input-output, and critical reasoning drills.</p>
            <div style="font-size:11.5px;color:var(--txt3);margin-bottom:14px;display:flex;flex-wrap:wrap;gap:5px">
              <span class="badge b-ess" style="background:#F5F3FF;color:#6D28D9;border:1px solid #DDD6FE">Floor &amp; Flat Puzzles</span>
              <span class="badge b-ess" style="background:#F5F3FF;color:#6D28D9;border:1px solid #DDD6FE">Syllogisms (Only A Few)</span>
              <span class="badge b-ess" style="background:#F5F3FF;color:#6D28D9;border:1px solid #DDD6FE">Input-Output</span>
            </div>
          </div>
          <div>
            <a href="modules/bank-reasoning.html" class="act-btn act-btn-p" style="text-align:center;padding:11px;display:block;background:linear-gradient(135deg,#7C3AED,#6D28D9);color:#fff;border-radius:10px;font-weight:800;text-decoration:none">⚡ Open Reasoning Suite &rarr;</a>
          </div>
        </div>

        <!-- 3. UPSC GS-4 Ethics -->
        <div class="cov-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:28px">⚖️</span>
              <span style="font-size:11px;font-weight:800;color:#D97706;background:rgba(217,119,6,.12);padding:3px 9px;border-radius:6px;border:1px solid rgba(217,119,6,.25)">UPSC GS-IV</span>
            </div>
            <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;color:var(--txt)">UPSC GS-IV Ethics, Integrity &amp; Aptitude</h3>
            <p style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">8-dilemma ethical framework, 40+ case studies, philosopher quotes, and 360° answer structuring for UPSC Civil Services Mains.</p>
            <div style="font-size:11.5px;color:var(--txt3);margin-bottom:14px;display:flex;flex-wrap:wrap;gap:5px">
              <span class="badge b-ess" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A">Case Studies Lab</span>
              <span class="badge b-ess" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A">Philosophers &amp; Thinkers</span>
              <span class="badge b-ess" style="background:#FFFBEB;color:#B45309;border:1px solid #FDE68A">Mains Structuring</span>
            </div>
          </div>
          <div>
            <a href="modules/gs4.html" class="act-btn act-btn-p" style="text-align:center;padding:11px;display:block;background:linear-gradient(135deg,#D97706,#B45309);color:#fff;border-radius:10px;font-weight:800;text-decoration:none">⚡ Open Ethics Suite &rarr;</a>
          </div>
        </div>

        <!-- 4. SSC Master -->
        <div class="cov-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:28px">🏛️</span>
              <span style="font-size:11px;font-weight:800;color:#DC2626;background:rgba(220,38,38,.12);padding:3px 9px;border-radius:6px;border:1px solid rgba(220,38,38,.25)">SSC CGL / CHSL</span>
            </div>
            <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;color:var(--txt)">SSC Master India (CGL, CHSL, MTS)</h3>
            <p style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">Tier-1 &amp; Tier-2 advance math (geometry, trigonometry, algebra), reasoning speed tests, English idioms, and 10-year PYQ trap analyzer.</p>
            <div style="font-size:11.5px;color:var(--txt3);margin-bottom:14px;display:flex;flex-wrap:wrap;gap:5px">
              <span class="badge b-ess" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA">Advance Mathematics</span>
              <span class="badge b-ess" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA">Tier 1 &amp; Tier 2 CBT</span>
              <span class="badge b-ess" style="background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA">General Studies PYQs</span>
            </div>
          </div>
          <div>
            <a href="modules/ssc.html" class="act-btn act-btn-p" style="text-align:center;padding:11px;display:block;background:linear-gradient(135deg,#DC2626,#991B1B);color:#fff;border-radius:10px;font-weight:800;text-decoration:none">⚡ Open SSC Suite &rarr;</a>
          </div>
        </div>

        <!-- 5. General Awareness & Current Affairs -->
        <div class="cov-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:28px">🌍</span>
              <span style="font-size:11px;font-weight:800;color:#0284C7;background:rgba(2,132,199,.12);padding:3px 9px;border-radius:6px;border:1px solid rgba(2,132,199,.25)">GENERAL AWARENESS</span>
            </div>
            <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;color:var(--txt)">General Awareness &amp; Current Affairs</h3>
            <p style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">Monthly news capsules, Union Budget &amp; Economic Survey analysis, government welfare schemes, and national honors for all competitive exams.</p>
            <div style="font-size:11.5px;color:var(--txt3);margin-bottom:14px;display:flex;flex-wrap:wrap;gap:5px">
              <span class="badge b-ess" style="background:#F0F9FF;color:#0369A1;border:1px solid #BAE6FD">Monthly CA Capsules</span>
              <span class="badge b-ess" style="background:#F0F9FF;color:#0369A1;border:1px solid #BAE6FD">Union Budget &amp; Survey</span>
              <span class="badge b-ess" style="background:#F0F9FF;color:#0369A1;border:1px solid #BAE6FD">Govt Welfare Schemes</span>
            </div>
          </div>
          <div>
            <a href="modules/general-awareness.html" class="act-btn act-btn-p" style="text-align:center;padding:11px;display:block;background:linear-gradient(135deg,#0284C7,#0369A1);color:#fff;border-radius:10px;font-weight:800;text-decoration:none">⚡ Open GA Suite &rarr;</a>
          </div>
        </div>

        <!-- 6. Railways RRB Master -->
        <div class="cov-card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:28px">🚆</span>
              <span style="font-size:11px;font-weight:800;color:#059669;background:rgba(5,150,105,.12);padding:3px 9px;border-radius:6px;border:1px solid rgba(5,150,105,.25)">RAILWAYS RRB</span>
            </div>
            <h3 style="font-size:17px;font-weight:800;margin-bottom:6px;color:var(--txt)">Railways RRB Master India (NTPC, Group D, ALP)</h3>
            <p style="font-size:13px;color:var(--txt2);line-height:1.55;margin-bottom:12px">General science physics, chemistry &amp; biology NCERT summaries, basic arithmetic speed tricks, and CBT Stage 1 &amp; 2 exam simulation.</p>
            <div style="font-size:11.5px;color:var(--txt3);margin-bottom:14px;display:flex;flex-wrap:wrap;gap:5px">
              <span class="badge b-ess" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0">RRB NTPC CBT 1 &amp; 2</span>
              <span class="badge b-ess" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0">General Science Drills</span>
              <span class="badge b-ess" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0">RRB Group D &amp; ALP</span>
            </div>
          </div>
          <div>
            <a href="modules/railways.html" class="act-btn act-btn-p" style="text-align:center;padding:11px;display:block;background:linear-gradient(135deg,#059669,#047857);color:#fff;border-radius:10px;font-weight:800;text-decoration:none">⚡ Open Railways Suite &rarr;</a>
          </div>
        </div>

      </div>

      <!-- Large Call to Action linking to all 27 suites -->
      <div style="text-align:center;margin-top:32px;background:rgba(255,255,255,0.7);backdrop-filter:blur(10px);border:1.5px solid var(--bdr);border-radius:18px;padding:24px 20px">
        <h4 style="font-size:17px;font-weight:800;color:var(--txt);margin-bottom:6px">Looking for UPSC Mains GS 1–3, History Atlas, Law (CLAT), or NEET?</h4>
        <p style="font-size:13.5px;color:var(--txt2);max-width:620px;margin:0 auto 16px">Explore our complete catalog of 27 dedicated digital textbooks and interactive labs across all major streams.</p>
        <a href="study-modules.html" class="btn-hero" style="background:linear-gradient(135deg,var(--pr),#1D4ED8);color:#fff;padding:13px 28px;font-size:14.5px;display:inline-flex;align-items:center;gap:8px">
          <span>📚</span> Browse All 27 Interactive Master Study Suites &rarr;
        </a>
      </div>
    </section>"""

    content = modules_pattern.sub(new_study_modules, content, count=1)

    # 5. Remove redundant <section id="coverage">...</section>
    coverage_pattern = re.compile(
        r'<section id="coverage"[^>]*>.*?</section>',
        re.DOTALL
    )
    content = coverage_pattern.sub('', content, count=1)

    # 6. Apply below-fold-sec class to offscreen sections
    sections_to_lazy = [
        ('id="studentHub"', 'id="studentHub" class="below-fold-sec"'),
        ('id="promptStudio"', 'id="promptStudio" class="below-fold-sec"'),
        ('id="tools"', 'id="tools" class="below-fold-sec"'),
        ('id="liveExamUpdates"', 'id="liveExamUpdates" class="below-fold-sec"'),
        ('id="examRoadmaps"', 'id="examRoadmaps" class="below-fold-sec"'),
        ('id="faqSection"', 'id="faqSection" class="below-fold-sec"'),
        ('id="communityHub"', 'id="communityHub" class="below-fold-sec"')
    ]
    for old_tag, new_tag in sections_to_lazy:
        if old_tag in content and 'class="below-fold-sec"' not in content[content.find(old_tag):content.find(old_tag)+50]:
            content = content.replace(old_tag, new_tag, 1)

    # 7. Add defer to non-critical script tags
    content = content.replace('<script src="js/studio.js"></script>', '<script defer src="js/studio.js"></script>')
    content = content.replace('<script src="js/nav.js"></script>', '<script defer src="js/nav.js"></script>')
    content = content.replace('<script src="js/visitor-counter.js"></script>', '<script defer src="js/visitor-counter.js"></script>')
    content = content.replace('<script src="js/habit-engine.js"></script>', '<script defer src="js/habit-engine.js"></script>')

    # 8. Add handler for heroExamSelect
    hero_handler_script = """
  <!-- ════ HERO EXAM SELECTOR SCRIPT ════ -->
  <script>
  window.handleHeroExamSelect = function(examId) {
    if (window.PrepHabit && typeof window.PrepHabit.selectExam === 'function') {
      window.PrepHabit.selectExam(examId);
    }
    const cta = document.getElementById('heroPrimaryCta');
    if (cta) {
      const labels = {
        'sbi-po': '⚡ Practice SBI PO Daily Set',
        'ibps-po': '⚡ Practice IBPS PO Daily Set',
        'ssc-cgl': '⚡ Practice SSC CGL Daily Set',
        'upsc-cse': '⚡ Practice UPSC GS Daily Set',
        'rrb-ntpc': '⚡ Practice Railway RRB Daily Set',
        'gate': '⚡ Practice GATE Daily Set',
        'defence': '⚡ Practice Defence Daily Set',
        'jee': '⚡ Practice JEE PCM Daily Set',
        'neet': '⚡ Practice NEET Biology Set',
        'law': '⚡ Practice CLAT Legal Set',
        'mba': '⚡ Practice CAT DILR/Quant Set',
        'teaching': '⚡ Practice CTET Pedagogy Set',
        'state-psc': '⚡ Practice State PSC Set'
      };
      const textSpan = cta.querySelector('span:first-child');
      if (textSpan) textSpan.textContent = labels[examId] || '⚡ Start Free Practice (Daily-10 Set)';
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    try {
      const saved = localStorage.getItem('ps:v1:target_exam');
      const sel = document.getElementById('heroExamSelect');
      if (saved && sel) {
        sel.value = saved;
        window.handleHeroExamSelect(saved);
      }
    } catch(e) {}
  });
  </script>
"""
    if "window.handleHeroExamSelect" not in content:
        content = content.replace("</body>", hero_handler_script + "\n</body>", 1)

    INDEX_PATH.write_text(content, encoding="utf-8")
    print("Successfully slimmed index.html!")

if __name__ == "__main__":
    slim_homepage()
