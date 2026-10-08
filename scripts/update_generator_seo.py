#!/usr/bin/env python3
"""
Update all 19 PrepSelf Prompt Generator pages with distinct search query targets:
- Unique, high-volume query-targeted <title> (<= 65 chars)
- Rich, click-worthy <meta name="description"> (<= 165 chars)
- Matching og:title, og:description, twitter:title, twitter:description
- Matching exact-intent <h1> (exactly 1 per page)
"""

import pathlib
import re

GENERATOR_DATA = {
    "bank_exam_prompt_generator.html": {
        "title": "SBI PO & IBPS Bank Exam AI Prompts & Practice | PrepSelf",
        "desc": "Generate high-yield AI prompts for SBI PO, IBPS Clerk, and RRB PO quant, puzzles, and DI. One-click copy for ChatGPT, Claude, and Gemini with zero paywalls.",
        "h1": "SBI PO & IBPS Bank Exam AI Study Prompts"
    },
    "upsc_prompt_generator.html": {
        "title": "UPSC IAS Mains Answer Writing & GS Prompts | PrepSelf",
        "desc": "Master UPSC CSE Prelims elimination and Mains GS 1-4 answer writing. Generate exam-calibrated prompts for ethics case studies, essays, and editorial breakdown.",
        "h1": "UPSC CSE IAS Mains & Prelims AI Prompts"
    },
    "ssc_exam_prompt_generator.html": {
        "title": "ChatGPT Prompts for SSC CGL & CHSL Prep | PrepSelf",
        "desc": "Free AI prompts for SSC CGL, CHSL, and MTS quant shortcuts, advance maths, reasoning tricks, and GS pyq analysis. One-click export to ChatGPT and Claude.",
        "h1": "SSC CGL & CHSL AI Study Prompts"
    },
    "railway_exam_prompt_generator.html": {
        "title": "RRB NTPC & Group D Railway Exam AI Prompts | PrepSelf",
        "desc": "Free AI study prompts for Railway RRB NTPC, Group D, and ALP exams. Speed math formulas, general science drills, and current affairs calibrated for 2026-2027.",
        "h1": "Railway RRB NTPC & Group D AI Prompts"
    },
    "gate_psu_exam_prompt_generator.html": {
        "title": "GATE & PSU Engineering Exam AI Study Prompts | PrepSelf",
        "desc": "Calibrated AI study prompts for GATE CS, ECE, EE, ME, and PSU recruitment. Chapter-wise numericals, engineering math, and PYQ breakdown for ChatGPT & Claude.",
        "h1": "GATE & PSU Engineering AI Study Prompts"
    },
    "jee_exam_prompt_generator.html": {
        "title": "JEE Main & Advanced PCM AI Study Prompts | PrepSelf",
        "desc": "Generate targeted AI prompts for JEE Main & Advanced Physics, Chemistry, and Maths. Solve tough PYQs, understand derivations, and master formula sheets for free.",
        "h1": "JEE Main & Advanced PCM AI Study Prompts"
    },
    "neet_exam_prompt_generator.html": {
        "title": "NEET UG Biology & NCERT AI Revision Prompts | PrepSelf",
        "desc": "Free AI prompts for NEET UG 2026-2027. Chapter-wise NCERT line-by-line notes, biology mnemonics, physics numericals, and organic chemistry mechanisms.",
        "h1": "NEET UG Medical AI Revision Prompts"
    },
    "defence_exam_prompt_generator.html": {
        "title": "NDA & CDS Defence Exam AI Study Prompts | PrepSelf",
        "desc": "AI prompts for NDA, CDS, AFCAT, and Agniveer. Master military GK, English comprehension, mathematics, and SSB interview psychological test prep for free.",
        "h1": "NDA, CDS & Defence Exam AI Study Prompts"
    },
    "law_entrance_exam_prompt_generator.html": {
        "title": "CLAT & AILET Legal Reasoning AI Study Prompts | PrepSelf",
        "desc": "AI study prompts for CLAT, AILET, and SLAT. Practice legal reasoning passages, logical arguments, English comprehension, and constitutional law principles.",
        "h1": "CLAT & AILET Legal Reasoning AI Prompts"
    },
    "mba_exam_prompt_generator.html": {
        "title": "CAT DILR & VARC MBA Entrance AI Study Prompts | PrepSelf",
        "desc": "Generate elite AI prompts for CAT, XAT, and SNAP. Deconstruct dense VARC passages, solve multi-condition DILR sets, and master quantitative aptitude shortcuts.",
        "h1": "CAT & MBA Entrance AI Study Prompts"
    },
    "psc_exam_prompt_generator.html": {
        "title": "State PSC GS & Mains Answer Writing AI Prompts | PrepSelf",
        "desc": "Targeted AI prompts for UPPSC, BPSC, MPSC, RPSC, and State PSCs. State history, administrative geography, ethics cases, and GS Mains answer structuring.",
        "h1": "State PSC General Studies AI Study Prompts"
    },
    "teaching_exam_prompt_generator.html": {
        "title": "CTET CDP & Pedagogy Teaching Exam AI Prompts | PrepSelf",
        "desc": "AI study prompts for CTET, UPTET, KVS, and DSSSB. Master Child Development & Pedagogy (CDP), inclusive education, EVS, and subject pedagogy with AI tutors.",
        "h1": "CTET & Teaching Exam Pedagogy AI Prompts"
    },
    "agriculture_exam_prompt_generator.html": {
        "title": "ICAR JRF & IBPS AFO Agriculture AI Prompts | PrepSelf",
        "desc": "AI study prompts for ICAR JRF, ASRB NET, and IBPS AFO agriculture exams. Agronomy, horticulture, plant breeding, and daily agri-news analysis prompts.",
        "h1": "ICAR JRF & IBPS AFO Agriculture AI Prompts"
    },
    "cacs_exam_prompt_generator.html": {
        "title": "CA, CS & CMA Law, Tax & Audit AI Study Prompts | PrepSelf",
        "desc": "AI prompts for CA, CS, and CMA exams across Foundation, Inter, and Final. Corporate law case analysis, taxation computation, and auditing standards.",
        "h1": "CA, CS & CMA Law, Tax & Audit AI Prompts"
    },
    "cuet_exam_prompt_generator.html": {
        "title": "CUET UG & PG Domain Subject AI Study Prompts | PrepSelf",
        "desc": "AI prompts for CUET UG and CUET PG central university entrance. Domain subject revision, General Test numerical ability, and logical reasoning drills.",
        "h1": "CUET UG & PG Domain Subject AI Prompts"
    },
    "insurance_exam_prompt_generator.html": {
        "title": "LIC AAO & NIACL AO Insurance Exam AI Prompts | PrepSelf",
        "desc": "AI study prompts for LIC AAO, NIACL AO, and UIIC insurance exams. Insurance awareness, financial market concepts, reasoning, and descriptive test practice.",
        "h1": "LIC AAO & Insurance Exam AI Study Prompts"
    },
    "judiciary_exam_prompt_generator.html": {
        "title": "State Judiciary PCS-J Legal Case AI Prompts | PrepSelf",
        "desc": "AI prompts for State Judiciary / PCS-J Civil Judge exams. IPC, CrPC, CPC, evidence act case laws, judgment writing, and constitutional legal problem sets.",
        "h1": "State Judiciary PCS-J Legal Case AI Prompts"
    },
    "net_jrf_exam_prompt_generator.html": {
        "title": "UGC NET Paper 1 & CSIR JRF Research AI Prompts | PrepSelf",
        "desc": "AI study prompts for UGC NET, CSIR NET, and JRF. Master Paper 1 Teaching & Research Aptitude, Higher Education System, and Paper 2 domain theory.",
        "h1": "UGC NET Paper 1 & CSIR JRF AI Study Prompts"
    },
    "more_exams_prompt_generator.html": {
        "title": "Specialist Exam AI Prompt Hub & Multi-Domain | PrepSelf",
        "desc": "Explore specialized AI prompt generators for NET/JRF, CUET, Judiciary, Insurance, CA/CS, and Agriculture exams. 100% free with one-click export.",
        "h1": "Specialist Competitive Exam AI Prompt Hub"
    }
}

def update_generators():
    root = pathlib.Path(__file__).resolve().parent.parent
    for fname, data in GENERATOR_DATA.items():
        fpath = root / fname
        if not fpath.exists():
            print(f"Skipping missing {fname}")
            continue
        
        t = data["title"]
        d = data["desc"]
        h1 = data["h1"]

        assert len(t) <= 65, f"Title too long: {len(t)} in {fname}"
        assert len(d) <= 165, f"Desc too long: {len(d)} in {fname}"

        content = fpath.read_text(encoding="utf-8", errors="ignore")

        # Replace <title>
        content = re.sub(r"<title>.*?</title>", f"<title>{t}</title>", content, flags=re.I)

        # Replace <meta name="description" ...>
        content = re.sub(
            r'<meta\s+name=["\']description["\']\s+content=["\'].*?["\']',
            f'<meta name="description" content="{d}"',
            content,
            flags=re.I
        )

        # Replace og:title and twitter:title
        content = re.sub(
            r'<meta\s+property=["\']og:title["\']\s+content=["\'].*?["\']',
            f'<meta property="og:title" content="{t}"',
            content,
            flags=re.I
        )
        content = re.sub(
            r'<meta\s+name=["\']twitter:title["\']\s+content=["\'].*?["\']',
            f'<meta name="twitter:title" content="{t}"',
            content,
            flags=re.I
        )

        # Replace og:description and twitter:description
        content = re.sub(
            r'<meta\s+property=["\']og:description["\']\s+content=["\'].*?["\']',
            f'<meta property="og:description" content="{d}"',
            content,
            flags=re.I
        )
        content = re.sub(
            r'<meta\s+name=["\']twitter:description["\']\s+content=["\'].*?["\']',
            f'<meta name="twitter:description" content="{d}"',
            content,
            flags=re.I
        )

        # Replace <h1 ...>...</h1>
        content = re.sub(
            r'<h1([^>]*)>.*?</h1>',
            f'<h1\\1>{h1}</h1>',
            content,
            count=1,
            flags=re.I | re.S
        )

        # Also replace stale Raghavbegins mentions in subtitle if next to H1
        content = re.sub(r'·\s*Raghavbegins\s*</p>', '· PrepSelf</p>', content)

        fpath.write_text(content, encoding="utf-8")
        print(f"Updated {fname}: title={len(t)}ch, desc={len(d)}ch, h1='{h1}'")

if __name__ == "__main__":
    update_generators()
