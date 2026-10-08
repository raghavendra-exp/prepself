#!/usr/bin/env python3
"""
PrepSelf Site Stamping & Synchronization Generator
Single Source of Truth: site.json

Usage:
  python scripts/stamp_site.py          # Stamps/syncs all HTML files in place
  python scripts/stamp_site.py --check  # Check-only (returns exit code 1 if drift detected, 0 if clean)
"""

import sys
import re
import json
import pathlib

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
SITE_JSON_PATH = ROOT_DIR / "site.json"

if not SITE_JSON_PATH.exists():
    print("Error: site.json not found at", SITE_JSON_PATH)
    sys.exit(1)

SITE_CONFIG = json.loads(SITE_JSON_PATH.read_text(encoding="utf-8"))
BASE_ORIGIN = SITE_CONFIG.get("canonical_origin", "https://prepself.in/").rstrip("/") + "/"
GA_ID = SITE_CONFIG.get("ga_id", "G-B0Z2G21W4F")
OG_IMAGE = SITE_CONFIG.get("og_image", "https://prepself.in/images/PrepSelf-og.png")
YEAR = str(SITE_CONFIG.get("year", 2026))

EXCLUDE_DIRS = {".git", "suites", "scratch", ".system_generated"}
IGNORE_FILES = {"admin.html"}

def get_canonical_for_file(file_path: pathlib.Path) -> str:
    rel = file_path.relative_to(ROOT_DIR).as_posix()
    if rel == "index.html":
        return BASE_ORIGIN
    if rel == "hi/index.html":
        return BASE_ORIGIN + "hi/"
    return BASE_ORIGIN + rel

def sync_html_content(file_path: pathlib.Path, content: str) -> tuple[str, list[str]]:
    changes = []
    canonical_url = get_canonical_for_file(file_path)

    # 1. Stale year check: 2025-26 or 2025-2026 -> 2026-2027
    stale_year_sub = re.sub(r'2025\s?[–-]\s?(20)?26', '2026–2027', content)
    if stale_year_sub != content:
        content = stale_year_sub
        changes.append("Updated stale 2025-26 references to 2026–2027")

    # 1b. Stale copyright year range check: 2025-2027 or 2026-2027 -> YEAR
    stale_cr_sub = re.sub(r'(&copy;|©)\s*(?:2025|2026)\s*(?:&ndash;|[–-])\s*2027', rf'\1 {YEAR}', content)
    if stale_cr_sub != content:
        content = stale_cr_sub
        changes.append(f"Updated copyright year range to {YEAR}")

    # 1c. Remove any remaining visitor-counter.js script tags
    if "visitor-counter.js" in content:
        content = re.sub(r'\s*<script[^>]*src=["\'][^"\']*visitor-counter\.js["\'][^>]*>\s*</script>', '', content)
        changes.append("Removed visitor-counter.js script tag")

    # 2. GA Tag Placeholder check
    if "G-XXXXXXXXXX" in content:
        content = content.replace("G-XXXXXXXXXX", GA_ID)
        changes.append(f"Replaced placeholder GA ID with {GA_ID}")

    # 3. Canonical tag check / update
    canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', content, re.I)
    if canon_match:
        current_canon = canon_match.group(1)
        if current_canon != canonical_url:
            content = content.replace(canon_match.group(0), f'<link rel="canonical" href="{canonical_url}"')
            changes.append(f"Updated canonical: {current_canon} -> {canonical_url}")
    else:
        # Insert canonical right before </head> if missing
        if "</head>" in content:
            content = content.replace("</head>", f'  <link rel="canonical" href="{canonical_url}">\n</head>', 1)
            changes.append(f"Inserted missing canonical: {canonical_url}")

    # 4. og:url check / update
    og_url_match = re.search(r'<meta\s+property=["\']og:url["\']\s+content=["\']([^"\']+)["\']', content, re.I)
    if og_url_match:
        current_og_url = og_url_match.group(1)
        if current_og_url != canonical_url:
            content = content.replace(og_url_match.group(0), f'<meta property="og:url" content="{canonical_url}"')
            changes.append(f"Updated og:url to match canonical: {canonical_url}")

    # 5. Empty src="" attribute prevention
    if re.search(r'src=["\']["\']', content):
        content = re.sub(r'\s+src=["\']["\']', '', content)
        changes.append("Removed empty src attribute")

    return content, changes

def main():
    check_mode = "--check" in sys.argv
    html_files = []

    for f in sorted(ROOT_DIR.rglob("*.html")):
        parts = set(f.relative_to(ROOT_DIR).parts)
        if parts & EXCLUDE_DIRS or f.name in IGNORE_FILES:
            continue
        html_files.append(f)

    total_files = len(html_files)
    modified_count = 0
    drift_detected = False

    print("=== PrepSelf Site Stamping Tool ===")
    print(f"Single Source of Truth: site.json (Origin: {BASE_ORIGIN}, GA: {GA_ID}, Year: {YEAR})")
    print(f"Scanning {total_files} HTML files across repository...")

    for f in html_files:
        original = f.read_text(encoding="utf-8", errors="ignore")
        updated, changes = sync_html_content(f, original)

        if changes:
            drift_detected = True
            rel_name = f.relative_to(ROOT_DIR).as_posix()
            if check_mode:
                print(f"[DRIFT DETECTED] {rel_name}: {'; '.join(changes)}")
            else:
                f.write_text(updated, encoding="utf-8")
                modified_count += 1
                print(f"[STAMPED] {rel_name}: {'; '.join(changes)}")

    if check_mode:
        if drift_detected:
            print("\n[FAIL] CI Check: HTML files have drifted from site.json single source of truth.")
            print("Run 'python scripts/stamp_site.py' locally to sync them.")
            sys.exit(1)
        else:
            print(f"\n[PASS] All {total_files} HTML files are 100% synchronized with site.json.")
            sys.exit(0)
    else:
        print(f"\n[DONE] Stamping Complete: {modified_count} files updated, {total_files - modified_count} already synchronized.")
        sys.exit(0)

if __name__ == "__main__":
    main()
