#!/usr/bin/env python3
"""
PrepSelf IndexNow Ping & Search Engine Notification Script
Pings Bing, Copilot, DuckDuckGo, and IndexNow participating search engines.

Usage:
  python scripts/ping_indexnow.py           # Pings all canonical URLs found in sitemap.xml
  python scripts/ping_indexnow.py --dry-run # Shows payload without sending HTTP request
"""

import sys
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import pathlib

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
SITEMAP_PATH = ROOT_DIR / "sitemap.xml"
KEY_FILE = ROOT_DIR / "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d.txt"
KEY = KEY_FILE.read_text(encoding="utf-8").strip() if KEY_FILE.exists() else "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d"
HOST = "prepself.in"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

def parse_sitemap_urls():
    if not SITEMAP_PATH.exists():
        print(f"Error: {SITEMAP_PATH} does not exist.")
        return []
    
    tree = ET.parse(SITEMAP_PATH)
    root = tree.getroot()
    urls = []
    # Namespaces
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for loc in root.findall(".//sm:loc", ns):
        if loc.text:
            urls.append(loc.text.strip())
    return urls

def ping_indexnow(urls, dry_run=False):
    if not urls:
        print("No URLs found to submit.")
        return False
    
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    print(f"=== IndexNow Submission ===")
    print(f"Host: {HOST}")
    print(f"Key: {KEY}")
    print(f"Key Location: {KEY_LOCATION}")
    print(f"Total URLs to ping: {len(urls)}")

    if dry_run:
        print("\n[DRY RUN] Payload that would be sent:")
        print(json.dumps(payload, indent=2))
        return True

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            status = resp.status
            print(f"\n[SUCCESS] IndexNow ping successful. HTTP Status: {status}")
            return True
    except urllib.error.HTTPError as e:
        print(f"\n[HTTP ERROR] IndexNow responded with status {e.code}: {e.reason}")
        try:
            print(e.read().decode("utf-8"))
        except Exception:
            pass
        return False
    except Exception as e:
        print(f"\n[ERROR] Failed to send IndexNow request: {e}")
        return False

def main():
    dry_run = "--dry-run" in sys.argv
    urls = parse_sitemap_urls()
    ping_indexnow(urls, dry_run=dry_run)

if __name__ == "__main__":
    main()
