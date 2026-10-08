#!/usr/bin/env python3
"""
PrepSelf Strict SEO, Canonicals & Quality Audit Script
Checks:
- Title length <= 65 chars
- Description length <= 165 chars
- Canonical present and matches https://prepself.in/<file>
- og:url matches canonical
- og:image present
- No empty src="" attributes
- No placeholder G-XXXXXXXXXX GA IDs
- No stale 2025-26 text
- No duplicate titles across public pages

Exits with code 1 if errors are found (for CI), 0 if clean.
"""

import sys
import re
import pathlib
import collections

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
g = lambda p, s: (re.search(p, s, re.I | re.S) or [0, ""])[1].strip()
titles = collections.defaultdict(list)

EXCLUDE_DIRS = {".git", "suites", "scratch", ".system_generated"}
IGNORE_FILES = {"admin.html"}

total_bad = 0
total_checked = 0

print("=== Running PrepSelf Quality & SEO Audit ===")

for f in sorted(ROOT_DIR.rglob("*.html")):
    parts = set(f.relative_to(ROOT_DIR).parts)
    if parts & EXCLUDE_DIRS or f.name in IGNORE_FILES:
        continue

    total_checked += 1
    s = f.read_text(encoding="utf-8", errors="ignore")
    t = g(r"<title>(.*?)</title>", s)
    d = g(r'name=["\']description["\'][^>]*content=["\'](.*?)["\']', s)
    c = g(r'rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', s)
    og = g(r'property=["\']og:url["\'][^>]*content=["\'](.*?)["\']', s)
    
    titles[t].append(f.relative_to(ROOT_DIR).as_posix())
    bad = []

    if not t or len(t) > 65:
        bad.append(f"title {len(t)}ch")
    if not d or len(d) > 165:
        bad.append(f"desc {len(d)}ch")
    if not c:
        bad.append("no canonical")
    elif f.name == "index.html" and c != "https://prepself.in/" and c != "https://prepself.in/hi/":
        bad.append(f"homepage canonical!=root: {c}")
    elif f.name != "index.html" and not c.endswith(f.name):
        bad.append(f"canonical!=file {c}")
    if og and og != c:
        bad.append(f"og:url!=canonical ({og} vs {c})")
    if re.search(r'src=["\']["\']', s):
        bad.append("empty src")
    if re.search(r"G-X{6,}", s):
        bad.append("GA placeholder")
    if re.search(r"2025\s?[–-]\s?(20)?26", s):
        bad.append("stale 2025-26")
    if re.search(r"(?:&copy;|©)\s*(?:2025|2026)\s*(?:&ndash;|[–-])\s*2027", s):
        bad.append("stale copyright range (2025-2027)")
    if "visitor-counter.js" in s or 'id="ftActiveCount"' in s or 'id="ftVisitorCount"' in s:
        bad.append("simulated visitor counter remnant")
    if "og:image" not in s:
        bad.append("no og:image")

    if bad:
        total_bad += 1
        print(f"[FAIL] {f.relative_to(ROOT_DIR).as_posix()} | {'; '.join(bad)}")

dup_count = 0
for t, fs in titles.items():
    if len(fs) > 1:
        dup_count += 1
        print(f"[DUP TITLE] '{t[:50]}...': {fs}")

if total_bad > 0 or dup_count > 0:
    print(f"\n❌ Audit Failed: {total_bad} page(s) with errors, {dup_count} duplicate title(s).")
    sys.exit(1)
else:
    print(f"\n✅ Audit Passed: All {total_checked} HTML pages are 100% compliant with SEO & quality standards.")
    sys.exit(0)
