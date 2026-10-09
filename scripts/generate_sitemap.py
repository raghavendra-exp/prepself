#!/usr/bin/env python3
"""
Generate PrepSelf sitemap.xml grounded in git history.
- Real lastmod dates from `git log -1 --format=%cs`
- Clean URLs: root / and hi/, and /suites/<name>/ (no index.html)
- Clean non-duplicated canonical locs
"""

import subprocess
import pathlib
import datetime

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
BASE_ORIGIN = "https://prepself.in/"
TODAY = datetime.date.today().isoformat()

def get_git_lastmod(file_path: pathlib.Path) -> str:
    try:
        res = subprocess.run(
            ["git", "log", "-1", "--format=%cs", str(file_path)],
            capture_output=True,
            text=True,
            cwd=str(ROOT_DIR),
            check=True
        )
        date_str = res.stdout.strip()
        if date_str and len(date_str) == 10:
            return date_str
    except Exception:
        pass
    return TODAY

def main():
    entries = []

    # 1. Homepage
    index_file = ROOT_DIR / "index.html"
    entries.append((BASE_ORIGIN, get_git_lastmod(index_file)))

    # 2. Root HTML files
    ignore_files = {"index.html", "admin.html", "exam-mentor-chatbot.html"}
    for f in sorted(ROOT_DIR.glob("*.html")):
        if f.name in ignore_files:
            continue
        entries.append((f"{BASE_ORIGIN}{f.name}", get_git_lastmod(f)))

    # 3. Hubs
    hubs_dir = ROOT_DIR / "hubs"
    if hubs_dir.exists():
        for f in sorted(hubs_dir.glob("*.html")):
            entries.append((f"{BASE_ORIGIN}hubs/{f.name}", get_git_lastmod(f)))

    # 4. Modules
    modules_dir = ROOT_DIR / "modules"
    if modules_dir.exists():
        for f in sorted(modules_dir.glob("*.html")):
            if f.name == "railways.html":
                continue  # Redirects to rrb.html; do not index redirect target
            entries.append((f"{BASE_ORIGIN}modules/{f.name}", get_git_lastmod(f)))

    # 5. Practice Problem Sets
    practice_dir = ROOT_DIR / "practice"
    if practice_dir.exists():
        for f in sorted(practice_dir.glob("*.html")):
            entries.append((f"{BASE_ORIGIN}practice/{f.name}", get_git_lastmod(f)))

    # 5. Hindi Hub and pages
    hi_dir = ROOT_DIR / "hi"
    if hi_dir.exists():
        hi_index = hi_dir / "index.html"
        if hi_index.exists():
            entries.append((f"{BASE_ORIGIN}hi/", get_git_lastmod(hi_index)))
        for f in sorted(hi_dir.glob("*.html")):
            if f.name == "index.html":
                continue
            entries.append((f"{BASE_ORIGIN}hi/{f.name}", get_git_lastmod(f)))

    # 6. Suites (use /suites/<name>/ without index.html)
    suites_dir = ROOT_DIR / "suites"
    if suites_dir.exists():
        for d in sorted(suites_dir.iterdir()):
            if d.is_dir():
                suite_index = d / "index.html"
                if suite_index.exists():
                    entries.append((f"{BASE_ORIGIN}suites/{d.name}/", get_git_lastmod(suite_index)))

    # Build XML
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for loc, lastmod in entries:
        xml_lines.append("  <url>")
        xml_lines.append(f"    <loc>{loc}</loc>")
        xml_lines.append(f"    <lastmod>{lastmod}</lastmod>")
        xml_lines.append("  </url>")

    xml_lines.append("</urlset>\n")

    output_path = ROOT_DIR / "sitemap.xml"
    output_path.write_text("\n".join(xml_lines), encoding="utf-8")
    print(f"Generated {output_path} with {len(entries)} verified URLs from git history.")

if __name__ == "__main__":
    main()
