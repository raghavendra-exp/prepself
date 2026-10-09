#!/usr/bin/env python3
"""
PrepSelf IndexNow Submission Tool
Submits all canonical URLs from sitemap.xml to Bing and IndexNow endpoints.
"""

import sys
import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import pathlib

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent
SITEMAP_FILE = ROOT_DIR / "sitemap.xml"
KEY = "4a8f9c1e7b2d4e6a8c0f2e4d6a8b0c2e"
HOST = "prepself.in"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"

def load_urls():
    if not SITEMAP_FILE.exists():
        print(f"Error: {SITEMAP_FILE} not found.")
        return []
    tree = ET.parse(SITEMAP_FILE)
    root = tree.getroot()
    # Handle namespace
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = []
    for loc in root.findall(".//sm:loc", ns):
        if loc.text:
            urls.append(loc.text.strip())
    # Fallback without namespace if needed
    if not urls:
        for loc in root.findall(".//loc"):
            if loc.text:
                urls.append(loc.text.strip())
    return urls

def submit_indexnow(urls):
    if not urls:
        print("No URLs to submit.")
        return False

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls
    }

    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow"
    ]

    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "PrepSelf-IndexNow-Submitter/1.0"
    }

    data = json.dumps(payload).encode("utf-8")
    success = True

    print(f"Submitting {len(urls)} URLs to IndexNow API endpoints...")
    for ep in endpoints:
        req = urllib.request.Request(ep, data=data, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                status = resp.status
                print(f"  [OK {status}] Submitted to {ep}")
        except urllib.error.HTTPError as e:
            # 200 or 202 are standard success codes; some return 202 Accepted
            if e.code in (200, 202):
                print(f"  [OK {e.code}] Submitted to {ep}")
            else:
                print(f"  [HTTP {e.code}] Error on {ep}: {e.reason}")
                success = False
        except Exception as e:
            print(f"  [FAILED] Connection error on {ep}: {e}")
            success = False

    return success

if __name__ == "__main__":
    urls = load_urls()
    print(f"Found {len(urls)} URLs in sitemap.xml.")
    submit_indexnow(urls)
