#!/usr/bin/env python3
"""
PrepSelf Pillar Hubs Generator
Generates pillar guides (Hub pages) in hubs/ linking down to practice spokes.
Complies strictly with audit.py rules:
- Title <= 65 chars
- Description <= 165 chars
- Canonical: https://prepself.in/hubs/<slug>.html
- BreadcrumbList + Article JSON-LD
"""

import pathlib

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
HUBS_DIR = ROOT_DIR / "hubs"
HUBS_DIR.mkdir(exist_ok=True)

HUBS = [
    {
        "slug": "sbi-bank-exams",
        "title": "SBI Bank Exams Hub: PO & Clerk Complete Guide (2026) | PrepSelf",
        "description": "Complete SBI PO & SBI Clerk 2026 exam guide: Prelims & Mains exam pattern, sectional cutoffs, 4-phase preparation roadmap & high-yield practice modules.",
        "headline": "SBI PO & Clerk Comprehensive Exam Architecture (2026–2027)",
        "badge": "Banking & Financial Services",
        "exam_scope": "State Bank of India (SBI PO & Clerk) and IBPS PO/Clerk",
        "overview": "The State Bank of India conducts annual recruitment for Probationary Officers (SBI PO) and Junior Associates (SBI Clerk). Unlike IBPS examinations, SBI PO does not have sectional cutoffs in Prelims and Mains, but enforces strict category-wise overall cutoffs and a highly competitive psychometric and interview phase.",
        "pattern_prelims": "100 Marks (English: 30 Qs / 20 mins, Quant: 35 Qs / 20 mins, Reasoning: 35 Qs / 20 mins). Negative marking: 0.25 marks per wrong answer.",
        "pattern_mains": "SBI PO Mains: 200 Marks Objective (Reasoning & Computer: 40 Qs, Data Analysis & Interpretation: 30 Qs, General/Banking Awareness: 50 Qs, English: 35 Qs) + 50 Marks Descriptive Test (Letter & Essay). SBI Clerk Mains: 200 Marks Objective in 160 minutes.",
        "phases": [
            {"phase": "Phase 1: Speed Arithmetic & Baselines (Days 1–25)", "desc": "Master fraction-percentage equivalents (1/2 to 1/20), Vedic math square roots, multiplication ladders, and quadratic sign techniques."},
            {"phase": "Phase 2: Complex Puzzles & Advanced DI (Days 26–55)", "desc": "Tackle 8-floor, flat-based, and variable-attribute seating puzzles. Practice Caselet, Missing Data, and Radar DI sets."},
            {"phase": "Phase 3: Sectional Time-Cracking & Speed Drills (Days 56–70)", "desc": "Enforce strict 20-minute section drills. Learn to skip lengthy arithmetic on first pass and lock in 28+ marks in 18 minutes."},
            {"phase": "Phase 4: Full-Length Mocks & Mistake Notebook (Days 71–84)", "desc": "Simulate real exam pressure every 48 hours. Review errors in your Mistake Notebook using spaced repetition before exam day."}
        ],
        "spokes": [
            {"title": "SBI Clerk Percentage Questions & Tricks", "url": "../practice/sbi-clerk-percentage-questions.html", "badge": "Quant"},
            {"title": "IBPS PO Floor & Flat Puzzles Practice", "url": "../practice/ibps-po-floor-puzzles.html", "badge": "Reasoning"},
            {"title": "SBI PO Quadratic Equation Roots Tricks", "url": "../practice/sbi-po-quadratic-equations.html", "badge": "Quant"},
            {"title": "IBPS PO Syllogism Only A Few Practice", "url": "../practice/ibps-po-syllogism-practice.html", "badge": "Reasoning"},
            {"title": "SBI Clerk Number Series Questions & Patterns", "url": "../practice/sbi-clerk-number-series.html", "badge": "Quant"},
            {"title": "RBI Monetary Policy Banking Awareness", "url": "../practice/banking-awareness-rbi-monetary-policy.html", "badge": "GA & Banking"}
        ]
    },
    {
        "slug": "ssc-cgl-exams",
        "title": "SSC CGL & CHSL Hub: Complete Exam Blueprint (2026) | PrepSelf",
        "description": "Comprehensive SSC CGL & CHSL 2026 blueprint: Tier 1 qualifying pattern, Tier 2 merit marking, computer & typing tests, syllabus analysis & practice.",
        "headline": "SSC CGL & CHSL Tier 1 & Tier 2 Master Blueprint (2026–2027)",
        "badge": "Staff Selection Commission",
        "exam_scope": "Combined Graduate Level (CGL) & Combined Higher Secondary Level (CHSL)",
        "overview": "The Staff Selection Commission conducts CGL and CHSL for recruitment into Group 'B' and 'C' non-gazetted ministerial posts. The revised exam scheme establishes Tier 1 as purely qualifying, while Tier 2 determines 100% of final merit ranking. Computer Proficiency and Data Entry Speed Test (DEST) are mandatory qualifying hurdles.",
        "pattern_prelims": "Tier 1: 100 Questions / 200 Marks in 60 minutes (25 Qs each in Reasoning, GA, Quantitative Aptitude, and English). Negative marking: 0.50 marks per wrong answer.",
        "pattern_mains": "Tier 2: Session 1 (2 hours 15 mins) - Section I: Math (30 Qs) + Reasoning (30 Qs) = 180 Marks. Section II: English (45 Qs) + GA (25 Qs) = 210 Marks. Section III: Computer Knowledge (20 Qs / 60 Marks, qualifying). Session 2: DEST Typing Test (15 minutes).",
        "phases": [
            {"phase": "Phase 1: Advanced Math & Grammar Foundations (Days 1–30)", "desc": "Complete NCERT Class 9-10 geometry, algebra, trigonometry theorems. Memorize 100 Golden Grammar Rules for error detection."},
            {"phase": "Phase 2: Speed Drills & Coding-Decoding (Days 31–60)", "desc": "Daily 25-minute sectional speed drills for Reasoning and Math. Learn reverse alphabet pairs and number analogies."},
            {"phase": "Phase 3: General Awareness & Computer Lab (Days 61–75)", "desc": "Focus on high-yield science PYQs, ancient/modern history, polity articles, and basic computer memory/networking concepts."},
            {"phase": "Phase 4: Tier 2 Full Length Simulations (Days 76–90)", "desc": "Practice back-to-back 130-question Section I + II mock papers to build cognitive endurance and prevent negative marking."}
        ],
        "spokes": [
            {"title": "SSC CGL Geometry & Mensuration Questions", "url": "../practice/ssc-cgl-geometry-questions.html", "badge": "Quant"},
            {"title": "SSC CGL Coding Decoding Questions & Tricks", "url": "../practice/ssc-cgl-coding-decoding.html", "badge": "Reasoning"},
            {"title": "SSC CHSL Active & Passive Voice Practice", "url": "../practice/ssc-chsl-active-passive-voice.html", "badge": "English"},
            {"title": "30 Best ChatGPT Prompts for SSC CGL Quant", "url": "../prompts-ssc-cgl-quant.html", "badge": "AI Guide"}
        ]
    },
    {
        "slug": "upsc-ias-exams",
        "title": "UPSC CSE Hub: Prelims & Mains Complete Strategy (2026) | PrepSelf",
        "description": "Complete UPSC Civil Services 2026 strategy: Prelims GS-1 & CSAT cutoff blueprint, Mains 1750-mark papers, NCERT booklist & critical reasoning tests.",
        "headline": "UPSC Civil Services Prelims & Mains Strategy (2026–2027)",
        "badge": "Union Public Service Commission",
        "exam_scope": "Civil Services Examination (IAS, IPS, IFS, IRS)",
        "overview": "The UPSC Civil Services Examination is India's premier public recruitment exam. Structured across three successive filters—Preliminary Examination (Objective), Main Examination (Written Descriptive), and Personality Test (Interview)—it tests conceptual depth, ethical clarity, and analytical synthesis across diverse disciplines.",
        "pattern_prelims": "General Studies Paper-I: 100 Qs / 200 Marks (determines Prelims cutoff). General Studies Paper-II (CSAT): 80 Qs / 200 Marks (strictly qualifying at 33% = 66 marks). Negative marking: 1/3rd (0.66 marks for GS-1, 0.83 marks for CSAT).",
        "pattern_mains": "Written Stage (1750 Marks): 1 Essay Paper (250 M), 4 General Studies Papers (GS 1 to 4, 250 M each = 1000 M), and 2 Optional Papers (250 M each = 500 M). Plus 2 Qualifying Language Papers (300 M each).",
        "phases": [
            {"phase": "Phase 1: NCERT Foundation & Core Reading (Months 1–4)", "desc": "Read NCERTs (Classes 6 to 12) in History, Geography, Polity, and Economics. Establish strong fundamental concepts."},
            {"phase": "Phase 2: Standard References & Optional Mastery (Months 5–8)", "desc": "Complete Laxmikanth (Polity), Spectrum (Modern History), Nitin Singhania (Art & Culture), and finish Paper 1 & 2 of your chosen Optional subject."},
            {"phase": "Phase 3: Mains Answer Writing & Ethics Lab (Months 9–10)", "desc": "Practice 2 GS answers daily. Solve 50+ ethics case studies from GS-4 with stakeholder analysis and moral philosophy frameworks."},
            {"phase": "Phase 4: Prelims Intensive & CSAT Lockdown (Months 11–12)", "desc": "Solve 40 full-length GS-1 test papers and practice 500+ CSAT reading comprehension passages to guarantee qualifying well above 66 marks."}
        ],
        "spokes": [
            {"title": "UPSC CSAT Reading Comprehension Practice", "url": "../practice/upsc-csat-reading-comprehension.html", "badge": "CSAT"},
            {"title": "UPSC Prelims Polity Fundamental Rights MCQs", "url": "../practice/upsc-prelims-polity-fundamental-rights.html", "badge": "GS-1 Polity"},
            {"title": "30 Best ChatGPT Prompts for UPSC Mains", "url": "../prompts-upsc-mains.html", "badge": "AI Guide"},
            {"title": "GS-4 Ethics Case Studies with Model Answers", "url": "../modules/gs4.html", "badge": "Mains GS-4"}
        ]
    },
    {
        "slug": "railway-rrb-exams",
        "title": "RRB NTPC & Group D Hub: CBT 1 & 2 Syllabus (2026) | PrepSelf",
        "description": "Official RRB NTPC & Railway Group D preparation guide: CBT 1 & 2 exam scheme, 1/3rd negative marking, General Science NCERT syllabus & practice MCQs.",
        "headline": "Railway RRB NTPC & Group D Exam Scheme (2026–2027)",
        "badge": "Railway Recruitment Boards",
        "exam_scope": "RRB NTPC (Non-Technical Popular Categories) & Railway Group D (Level-1)",
        "overview": "Indian Railways recruits over 100,000 personnel across non-technical and technical roles through nationwide Computer-Based Tests (CBT). Because millions of candidates compete for every opening, success hinges on minimizing unforced errors under 1/3rd negative marking and dominating the General Science and Math sections.",
        "pattern_prelims": "NTPC CBT-1: 100 Questions / 100 Marks in 90 minutes (General Awareness: 40 Qs, Mathematics: 30 Qs, General Intelligence & Reasoning: 30 Qs). Group D: 100 Qs in 90 mins (Science: 25 Qs, Math: 25 Qs, Reasoning: 30 Qs, GA/Current Affairs: 20 Qs).",
        "pattern_mains": "NTPC CBT-2: 120 Questions / 120 Marks in 90 minutes (General Awareness: 50 Qs, Mathematics: 35 Qs, Reasoning: 35 Qs). Negative marking: 1/3rd mark deducted per incorrect response across all stages.",
        "phases": [
            {"phase": "Phase 1: NCERT Science Mastery (Days 1–30)", "desc": "Cover Class 9 & 10 NCERT Physics (motion, electricity, optics), Chemistry (periodic table, acids/bases), and Life Sciences."},
            {"phase": "Phase 2: Railway Speed Math & Formulas (Days 31–55)", "desc": "Practice percentages, profit-loss, time-speed-distance (train relative speed), and compound interest shortcuts without pen."},
            {"phase": "Phase 3: General Intelligence & Reasoning (Days 56–70)", "desc": "Coding-decoding, statement-conclusion, blood relations, and Venn diagrams under 40-second time limits per question."},
            {"phase": "Phase 4: Previous Year Papers & CBT Simulation (Days 71–85)", "desc": "Solve 30 full-length previous year CBT papers to master the 90-minute clock and eliminate 1/3rd negative penalty traps."}
        ],
        "spokes": [
            {"title": "RRB NTPC General Science PYQ Practice", "url": "../practice/rrb-ntpc-general-science-questions.html", "badge": "Science"},
            {"title": "Railway Group D & RRB Recruitment Master", "url": "../modules/rrb.html", "badge": "Suite"},
            {"title": "Railway Exam AI Prompt Generator", "url": "../railway_exam_prompt_generator.html", "badge": "Tool"},
            {"title": "Negative Marking Risk Calculator", "url": "../negative-marking-calculator.html", "badge": "Calculator"}
        ]
    }
]

HUB_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="author" content="Raghavbegins">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://prepself.in/hubs/{slug}.html">
  <link rel="alternate" hreflang="en" href="https://prepself.in/hubs/{slug}.html">
  <link rel="alternate" hreflang="hi" href="https://prepself.in/hi/">
  <link rel="alternate" hreflang="x-default" href="https://prepself.in/hubs/{slug}.html">

  <!-- Open Graph -->
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://prepself.in/hubs/{slug}.html">
  <meta property="og:image" content="https://prepself.in/images/PrepSelf-og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{description}">
  <meta name="twitter:image" content="https://prepself.in/images/PrepSelf-og.png">

  <!-- JSON-LD: BreadcrumbList + Article -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": "Article",
        "headline": "{title}",
        "description": "{description}",
        "author": {{ "@type": "Person", "name": "Raghavendra", "alternateName": "Raghavbegins" }},
        "publisher": {{ "@type": "Organization", "name": "PrepSelf", "url": "https://prepself.in/" }},
        "datePublished": "2026-10-08",
        "dateModified": "2026-10-08",
        "mainEntityOfPage": "https://prepself.in/hubs/{slug}.html"
      }},
      {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://prepself.in/" }},
          {{ "@type": "ListItem", "position": 2, "name": "Exam Hubs", "item": "https://prepself.in/sitemap.html" }},
          {{ "@type": "ListItem", "position": 3, "name": "{badge}", "item": "https://prepself.in/hubs/{slug}.html" }}
        ]
      }}
    ]
  }}
  </script>

  <!-- Google Analytics Tracking -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-B0Z2G21W4F"></script>
  <script>
    window.dataLayer=window.dataLayer||[];
    function gtag(){{dataLayer.push(arguments);}}
    gtag("js",new Date());
    gtag("config","G-B0Z2G21W4F");
  </script>

  <link rel="stylesheet" href="../css/modern.css">
  <style>
    :root {{
      --bg: #070B19;
      --card-bg: #0E1630;
      --card-border: rgba(255,255,255,0.08);
      --txt-dim: #94A3B8;
      --accent-blue: #38BDF8;
      --accent-green: #34D399;
      --accent-orange: #FB923C;
      --accent-purple: #A78BFA;
    }}
    body {{
      background: var(--bg);
      color: #F8FAFC;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.7;
    }}
    .hub-wrap {{
      max-width: 960px;
      margin: 0 auto;
      padding: 30px 20px 80px;
    }}
    .breadcrumb-nav {{
      font-size: 13px;
      color: var(--txt-dim);
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }}
    .breadcrumb-nav a {{ color: var(--accent-blue); text-decoration: none; }}
    .badge-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      background: rgba(167,139,250,0.12);
      color: var(--accent-purple);
      border: 1px solid rgba(167,139,250,0.25);
      margin-bottom: 14px;
    }}
    h1 {{
      font-size: 32px;
      font-weight: 900;
      line-height: 1.25;
      margin-bottom: 14px;
      color: #FFFFFF;
    }}
    .meta-bar {{
      font-size: 13px;
      color: var(--txt-dim);
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 30px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--card-border);
    }}
    .hub-section {{
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 26px 28px;
      margin-bottom: 28px;
    }}
    .hub-section h2 {{
      font-size: 20px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 14px;
    }}
    .pattern-card {{
      background: rgba(15,23,42,0.7);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 14px;
    }}
    .pattern-card h3 {{
      font-size: 15px;
      font-weight: 800;
      color: var(--accent-blue);
      margin-bottom: 6px;
    }}
    .timeline-step {{
      border-left: 2px solid var(--accent-blue);
      padding-left: 18px;
      margin-bottom: 20px;
      position: relative;
    }}
    .timeline-step::before {{
      content: "";
      position: absolute;
      left: -6px;
      top: 6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-blue);
    }}
    .timeline-title {{
      font-size: 15px;
      font-weight: 800;
      color: #F8FAFC;
      margin-bottom: 4px;
    }}
    .spoke-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }}
    .spoke-card {{
      background: rgba(15,23,42,0.85);
      border: 1.5px solid var(--card-border);
      border-radius: 12px;
      padding: 18px 20px;
      text-decoration: none;
      transition: transform 0.15s, border-color 0.15s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .spoke-card:hover {{
      transform: translateY(-2px);
      border-color: var(--accent-blue);
    }}
    .spoke-badge {{
      font-size: 11px;
      font-weight: 800;
      color: var(--accent-green);
      text-transform: uppercase;
      margin-bottom: 6px;
    }}
    .spoke-title {{
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.4;
      margin-bottom: 12px;
    }}
    .spoke-link {{
      font-size: 13px;
      font-weight: 700;
      color: var(--accent-blue);
    }}
    footer {{
      margin-top: 60px;
      padding-top: 24px;
      border-top: 1px solid var(--card-border);
      text-align: center;
      font-size: 13px;
      color: var(--txt-dim);
    }}
    footer a {{ color: var(--accent-blue); text-decoration: none; }}
  </style>
</head>
<body>

<header class="hdr" style="background:#070B19;border-bottom:1px solid rgba(255,255,255,0.08);padding:14px 20px">
  <div style="max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between">
    <a href="../" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff">
      <span style="font-size:22px">&#x1F4DA;</span>
      <strong style="font-size:16px">PrepSelf</strong>
    </a>
    <div style="display:flex;gap:12px;align-items:center">
      <a href="../study-modules.html" style="font-size:13px;color:#38BDF8;text-decoration:none;font-weight:700">&#x26A1; 27 Master Suites</a>
      <a href="../hi/" style="font-size:12px;color:#FB923C;background:rgba(251,146,60,0.1);padding:4px 10px;border-radius:6px;text-decoration:none;font-weight:700">&#x1F1EE;&#x1F1F3; हिंदी</a>
    </div>
  </div>
</header>

<main class="hub-wrap">
  <nav class="breadcrumb-nav">
    <a href="../">Home</a> &gt;
    <a href="../sitemap.html">Exam Directory</a> &gt;
    <span>{badge}</span>
  </nav>

  <div class="badge-pill">&#x1F3DB;&#xFE0F; Pillar Hub &bull; {exam_scope}</div>
  <h1>{title_clean}</h1>

  <div class="meta-bar">
    <span>&#x1F4C5; Updated: October 2026 for 2026&ndash;2027 Pattern</span>
    <span>&#x1F4DA; Comprehensive Syllabus Hub</span>
    <span>&#x1F468;&#x200D;&#x1F393; Raghavbegins</span>
    <span>&#x2705; 100% Free Open Education</span>
  </div>

  <section class="hub-section">
    <h2>&#x1F4CB; Strategic Overview &amp; Recruitment Mandate</h2>
    <p style="color:#CBD5E1;font-size:15.5px">{overview}</p>
  </section>

  <section class="hub-section">
    <h2>&#x2696;&#xFE0F; Official Examination Pattern &amp; Marking Scheme</h2>
    <div class="pattern-card">
      <h3>&#x1F539; Stage 1: Preliminary Examination (CBT / Screening)</h3>
      <p style="color:#CBD5E1;font-size:14.5px">{pattern_prelims}</p>
    </div>
    <div class="pattern-card">
      <h3>&#x1F539; Stage 2: Main Examination (Merit Determination)</h3>
      <p style="color:#CBD5E1;font-size:14.5px">{pattern_mains}</p>
    </div>
  </section>

  <section class="hub-section">
    <h2>&#x1F5FA;&#xFE0F; 4-Phase Battle-Tested Preparation Roadmap</h2>
{timeline_html}
  </section>

  <section class="hub-section">
    <h2>&#x1F3AF; High-Yield Topic Practice Drills &amp; Spokes</h2>
    <p style="color:#94A3B8;font-size:14px">Each spoke page includes comprehensive formulas, shortcut tricks, and an interactive 5-question test with instant explanations.</p>
    <div class="spoke-grid">
{spokes_html}
    </div>
  </section>

  <section class="hub-section">
    <h2>&#x1F9EE; Recommended Link-Earning Utilities &amp; Simulators</h2>
    <div class="spoke-grid">
      <a href="../negative-marking-calculator.html" class="spoke-card">
        <div class="spoke-badge">Calculator</div>
        <div class="spoke-title">Negative Marking Net Score Calculator</div>
        <div class="spoke-link">Calculate Risk &rarr;</div>
      </a>
      <a href="../percentile-cutoff-predictor.html" class="spoke-card">
        <div class="spoke-badge">Predictor</div>
        <div class="spoke-title">Percentile &amp; Cutoff Score Predictor</div>
        <div class="spoke-link">Estimate Rank &rarr;</div>
      </a>
      <a href="../quiz-simulator.html" class="spoke-card">
        <div class="spoke-badge">Mock Lab</div>
        <div class="spoke-title">Real-Time Full Mock Quiz Simulator</div>
        <div class="spoke-link">Take Mock Test &rarr;</div>
      </a>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 PrepSelf &bull; Open Educational Resource &bull; Maintained by <a href="https://raghavfolio-8op53xas.manus.space/" target="_blank" rel="noopener">Raghavbegins (Raghavendra)</a>.</p>
    <p style="margin-top:6px;font-size:12px">PrepSelf is an independent, non-commercial self-study platform for Indian competitive examinations.</p>
  </footer>
</main>

</body>
</html>
"""

def generate_hubs():
    print("=== Generating Hub-and-Spoke Pillar Pages ===")
    count = 0
    for hub in HUBS:
        slug = hub["slug"]
        title = hub["title"]
        title_clean = title.split(" | ")[0]
        desc = hub["description"]
        badge = hub["badge"]
        exam_scope = hub["exam_scope"]
        overview = hub["overview"]
        pattern_prelims = hub["pattern_prelims"]
        pattern_mains = hub["pattern_mains"]

        timeline_items = []
        for p in hub["phases"]:
            timeline_items.append(f"""    <div class="timeline-step">
      <div class="timeline-title">{p["phase"]}</div>
      <p style="color:#CBD5E1;font-size:14px">{p["desc"]}</p>
    </div>""")
        timeline_html = "\n".join(timeline_items)

        spoke_items = []
        for s in hub["spokes"]:
            spoke_items.append(f"""      <a href="{s["url"]}" class="spoke-card">
        <div class="spoke-badge">{s["badge"]}</div>
        <div class="spoke-title">{s["title"]}</div>
        <div class="spoke-link">Practice Now &rarr;</div>
      </a>""")
        spokes_html = "\n".join(spoke_items)

        rendered = HUB_TEMPLATE.format(
            slug=slug,
            title=title,
            title_clean=title_clean,
            description=desc,
            badge=badge,
            exam_scope=exam_scope,
            overview=overview,
            pattern_prelims=pattern_prelims,
            pattern_mains=pattern_mains,
            timeline_html=timeline_html,
            spokes_html=spokes_html
        )

        out_path = HUBS_DIR / f"{slug}.html"
        out_path.write_text(rendered, encoding="utf-8")
        count += 1
        print(f"Generated: hubs/{slug}.html ({len(rendered)} bytes)")

    print(f"\n[DONE] Successfully created {count} pillar hub pages.")

if __name__ == "__main__":
    generate_hubs()
