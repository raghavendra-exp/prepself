#!/usr/bin/env python3
"""
PrepSelf XML Sitemap Generator
Crawls all public HTML pages in the repository and outputs a valid sitemap.xml.
Includes hreflang alternate tags for bilingual/Hindi pages.
"""

import pathlib
import xml.etree.ElementTree as ET

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
BASE_ORIGIN = "https://prepself.in/"
TODAY = "2026-10-08"

EXCLUDE_DIRS = {".git", "scratch", ".system_generated"}
IGNORE_FILES = {"admin.html", "404.html"}

def get_canonical(file_path: pathlib.Path) -> str:
    rel = file_path.relative_to(ROOT_DIR).as_posix()
    if rel == "index.html":
        return BASE_ORIGIN
    if rel == "hi/index.html":
        return BASE_ORIGIN + "hi/"
    return BASE_ORIGIN + rel

def get_priority_and_freq(rel: str) -> tuple[str, str]:
    if rel == "index.html":
        return "1.0", "daily"
    if rel in {"study-modules.html", "quiz-simulator.html", "daily-quiz.html", "current-affairs-capsule.html"}:
        return "0.95", "daily"
    if rel.startswith("hubs/"):
        return "0.90", "weekly"
    if rel in {"negative-marking-calculator.html", "percentile-cutoff-predictor.html", "eligibility-age-checker.html", "all-exam-roadmaps.html", "sitemap.html"}:
        return "0.90", "weekly"
    if rel.startswith("practice/"):
        return "0.85", "weekly"
    if rel.startswith("hi/"):
        return "0.85", "weekly"
    if rel.startswith("prompts-"):
        return "0.85", "weekly"
    if "prompt_generator" in rel:
        return "0.80", "weekly"
    if rel.startswith("modules/"):
        return "0.80", "weekly"
    if rel.startswith("suites/"):
        return "0.75", "monthly"
    return "0.60", "monthly"

def generate_sitemap():
    print("=== Generating PrepSelf sitemap.xml ===")
    html_files = []
    for f in sorted(ROOT_DIR.rglob("*.html")):
        parts = set(f.relative_to(ROOT_DIR).parts)
        if parts & EXCLUDE_DIRS or f.name in IGNORE_FILES:
            continue
        html_files.append(f)

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    ]

    for f in html_files:
        rel = f.relative_to(ROOT_DIR).as_posix()
        loc = get_canonical(f)
        priority, freq = get_priority_and_freq(rel)

        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{loc}</loc>')
        xml_lines.append(f'    <lastmod>{TODAY}</lastmod>')
        xml_lines.append(f'    <changefreq>{freq}</changefreq>')
        xml_lines.append(f'    <priority>{priority}</priority>')

        # Bimodal hreflang links
        if rel == "index.html":
            xml_lines.append('    <xhtml:link rel="alternate" hreflang="en" href="https://prepself.in/"/>')
            xml_lines.append('    <xhtml:link rel="alternate" hreflang="hi" href="https://prepself.in/hi/"/>')
            xml_lines.append('    <xhtml:link rel="alternate" hreflang="x-default" href="https://prepself.in/"/>')
            xml_lines.append('    <image:image>')
            xml_lines.append('      <image:loc>https://prepself.in/images/PrepSelf-og.png</image:loc>')
            xml_lines.append('      <image:title>PrepSelf - 80+ Indian Competitive Exams AI Preparation Hub</image:title>')
            xml_lines.append('    </image:image>')
        elif rel.startswith("hi/"):
            xml_lines.append(f'    <xhtml:link rel="alternate" hreflang="hi" href="{loc}"/>')
            xml_lines.append('    <xhtml:link rel="alternate" hreflang="en" href="https://prepself.in/"/>')
            xml_lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{loc}"/>')

        xml_lines.append('  </url>')

    xml_lines.append('</urlset>')
    content = "\n".join(xml_lines) + "\n"

    sitemap_path = ROOT_DIR / "sitemap.xml"
    sitemap_path.write_text(content, encoding="utf-8")
    print(f"[DONE] Wrote {len(html_files)} URLs to sitemap.xml ({len(content)} bytes).")

if __name__ == "__main__":
    generate_sitemap()
