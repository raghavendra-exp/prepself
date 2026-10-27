#!/usr/bin/env python3
"""
PrepSelf Suite Synchronization Tool
Synchronizes compiled bundles and updated static material from standalone scratch repositories
into prepself/suites/ with uniform canonicals, robots tags, GA4 tracking, and noscript backlinks.
"""

import sys
import shutil
import re
import pathlib

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PREPSELF_ROOT = pathlib.Path(__file__).resolve().parent.parent
SCRATCH_ROOT = PREPSELF_ROOT.parent
SUITES_ROOT = PREPSELF_ROOT / "suites"

GA_SNIPPET = """  <!-- Google Analytics Tracking (G-B0Z2G21W4F) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-B0Z2G21W4F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-B0Z2G21W4F');
  </script>"""

NOSCRIPT_SNIPPET = """<noscript><div style="padding:14px;background:#1E293B;color:#F8FAFC;text-align:center;font-size:13px;font-family:sans-serif">JavaScript is required to run this interactive exam suite. Return to <a href="../../study-modules.html" style="color:#60A5FA;text-decoration:underline">PrepSelf 27 Master Suites</a> or <a href="../../index.html" style="color:#60A5FA;text-decoration:underline">Homepage</a>.</div></noscript>"""

ROBOTS_TAG = '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'

def clean_and_stamp_html(html_path: pathlib.Path, canonical_url: str):
    """Ensures canonical, robots, GA4 snippet, noscript tag, and removes dummy AdSense."""
    content = html_path.read_text(encoding="utf-8", errors="ignore")

    # 1. Remove placeholder AdSense
    content = re.sub(r'\s*<!-- Google AdSense -->\s*<script[^>]*adsbygoogle[^>]*></script>', '', content)
    content = re.sub(r'\s*<script[^>]*ca-pub-X+[^>]*></script>', '', content)

    # 2. Canonical tag
    canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', content, re.I)
    if canon_match:
        content = content.replace(canon_match.group(0), f'<link rel="canonical" href="{canonical_url}"')
    else:
        if "</head>" in content:
            content = content.replace("</head>", f'    <link rel="canonical" href="{canonical_url}">\n</head>', 1)

    # 3. Robots meta tag
    if 'name="robots"' not in content and "name='robots'" not in content:
        if "</head>" in content:
            content = content.replace("</head>", f'    {ROBOTS_TAG}\n</head>', 1)

    # 4. GA4 tracking
    if "G-B0Z2G21W4F" not in content:
        if "</head>" in content:
            content = content.replace("</head>", f"{GA_SNIPPET}\n</head>", 1)

    # 5. Noscript tag inside body
    if "<noscript>" not in content:
        body_idx = content.find("<body")
        if body_idx != -1:
            body_close = content.find(">", body_idx)
            if body_close != -1:
                content = content[:body_close+1] + "\n    " + NOSCRIPT_SNIPPET + content[body_close+1:]

    html_path.write_text(content, encoding="utf-8")

def sync_dist_suite(src_repo_name: str, suite_name: str):
    """Sync a Vite/React repo whose build output is in dist/."""
    src_dist = SCRATCH_ROOT / src_repo_name / "dist"
    dst_suite = SUITES_ROOT / suite_name

    if not src_dist.exists():
        print(f"[SKIP] Source dist not found: {src_dist}")
        return

    print(f"[*] Syncing dist suite: {src_repo_name} -> suites/{suite_name}")
    dst_suite.mkdir(parents=True, exist_ok=True)

    # 1. Assets sync - clean obsolete hashed assets
    src_assets = src_dist / "assets"
    dst_assets = dst_suite / "assets"
    if src_assets.exists():
        dst_assets.mkdir(parents=True, exist_ok=True)
        src_asset_names = {p.name for p in src_assets.iterdir() if p.is_file()}
        # Delete obsolete hashed assets
        for old_file in list(dst_assets.iterdir()):
            if old_file.is_file() and old_file.name not in src_asset_names:
                # If it's a hashed js/css bundle, remove it
                if re.search(r'-[a-zA-Z0-9_-]{8}\.(js|css)', old_file.name):
                    print(f"  - Removing obsolete asset: {old_file.name}")
                    old_file.unlink()

        # Copy all current assets
        for asset in src_assets.iterdir():
            if asset.is_file():
                shutil.copy2(asset, dst_assets / asset.name)

    # 2. Copy root files in dist (index.html, manifest, icons, etc.)
    for f in src_dist.iterdir():
        if f.is_file():
            shutil.copy2(f, dst_suite / f.name)

    # 3. Clean and stamp index.html
    canon = f"https://prepself.in/suites/{suite_name}/"
    clean_and_stamp_html(dst_suite / "index.html", canon)
    print(f"  [OK] Synchronized and stamped suites/{suite_name}/index.html")

def sync_editorial_hub():
    """Sync daily-editorial-hub static files."""
    src = SCRATCH_ROOT / "daily-editorial-hub"
    dst = SUITES_ROOT / "daily-editorial-hub"
    print(f"[*] Syncing daily-editorial-hub -> suites/daily-editorial-hub")
    dst.mkdir(parents=True, exist_ok=True)

    # Files to sync
    for fname in ["index.html", "sw.js"]:
        if (src / fname).exists():
            shutil.copy2(src / fname, dst / fname)

    for dirname in ["css", "js", "data"]:
        src_dir = src / dirname
        dst_dir = dst / dirname
        if src_dir.exists():
            dst_dir.mkdir(parents=True, exist_ok=True)
            for f in src_dir.rglob("*"):
                if f.is_file() and not any(p.startswith(".") for p in f.relative_to(src_dir).parts):
                    rel = f.relative_to(src_dir)
                    target = dst_dir / rel
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(f, target)

    canon = "https://prepself.in/suites/daily-editorial-hub/"
    clean_and_stamp_html(dst / "index.html", canon)
    print("  [OK] Synchronized and stamped suites/daily-editorial-hub")

def sync_history_of_india():
    """Sync history-of-india multi-page curriculum."""
    src = SCRATCH_ROOT / "history-of-india"
    dst = SUITES_ROOT / "history-of-india"
    print(f"[*] Syncing history-of-india -> suites/history-of-india")
    dst.mkdir(parents=True, exist_ok=True)

    # Copy all root html files
    for h in src.glob("*.html"):
        shutil.copy2(h, dst / h.name)

    # Copy README.md if present
    if (src / "README.md").exists():
        shutil.copy2(src / "README.md", dst / "README.md")

    # Copy subdirectories
    for dirname in ["assets", "css", "data", "js"]:
        src_dir = src / dirname
        dst_dir = dst / dirname
        if src_dir.exists():
            dst_dir.mkdir(parents=True, exist_ok=True)
            for f in src_dir.rglob("*"):
                if f.is_file() and not any(p.startswith(".") for p in f.relative_to(src_dir).parts):
                    rel = f.relative_to(src_dir)
                    target = dst_dir / rel
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(f, target)

    # Clean and stamp all HTML files in destination
    for h in dst.glob("*.html"):
        if h.name == "index.html":
            canon = "https://prepself.in/suites/history-of-india/"
        else:
            canon = f"https://prepself.in/suites/history-of-india/{h.name}"
        clean_and_stamp_html(h, canon)

    print(f"  [OK] Synchronized and stamped {len(list(dst.glob('*.html')))} HTML pages in suites/history-of-india")

def main():
    print("=== PrepSelf Suites Sync & Integration Tool ===")
    sync_dist_suite("uppsc-ro-aro-master", "uppsc-ro-aro-master")
    sync_dist_suite("rrb-master-india", "rrb-master-india")
    sync_dist_suite("gs3-master", "gs3-master")
    sync_dist_suite("gs4-master", "gs4-master")
    sync_editorial_hub()
    sync_history_of_india()
    print("\n✅ All 6 suite updates successfully synchronized.")

if __name__ == "__main__":
    main()
