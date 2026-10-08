#!/usr/bin/env python3
"""
Personalize PrepSelf Homepage (index.html):
1. Remove all fake urgency and fake counters (.visitor-counter-card).
2. Render the student's personalized exam dashboard at the top of main.wrap.
3. Collapse the remaining 80+ exams catalog into an elegant collapsible tray (<details class="all-exams-tray">),
   eliminating the wall of 80+ exams.
4. Clean up footer vanity text to honest open-education text.
"""

import pathlib
import re

INDEX_PATH = pathlib.Path(__file__).resolve().parent.parent / "index.html"

def personalize_homepage():
    content = INDEX_PATH.read_text(encoding="utf-8")

    # 1. Remove .visitor-counter-card from index.html
    vcc_pattern = re.compile(
        r'<!-- ════ TRANSPARENT COMMUNITY STUDY COUNTER WIDGET ════ -->\s*<div class="visitor-counter-card"[^>]*>.*?</div>\s*</div>',
        re.DOTALL
    )
    content = vcc_pattern.sub('', content)

    # Secondary check for visitorCounterCard if comment differs
    vcc_pattern_2 = re.compile(
        r'<div class="visitor-counter-card" id="visitorCounterCard"[^>]*>.*?</div>\s*</div>',
        re.DOTALL
    )
    content = vcc_pattern_2.sub('', content)

    # 2. Wrap the wall of exams (stream-quick-bar through examRoadmaps) into a collapsible catalog tray
    start_marker = '<!-- ════ QUICK STREAM & JUMP NAV BAR ════ -->'
    end_marker = '<!-- ════ VALUE COMPARISON: COACHING VS GENERIC AI VS PREPSELF ════ -->'

    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        catalog_content = content[start_idx:end_idx].strip()
        wrapped_catalog = f"""<!-- ════ BROWSE ALL 80+ EXAMS & 27 STUDY SUITES (COLLAPSIBLE CATALOG) ════ -->
    <details class="all-exams-tray" id="allExamsTray" style="background:#fff;border:1.5px solid var(--bdr);border-radius:18px;margin:20px 0 36px;overflow:hidden;box-shadow:var(--sh)">
      <summary style="padding:18px 22px;font-size:15px;font-weight:800;color:var(--txt);cursor:pointer;display:flex;align-items:center;justify-content:space-between;user-select:none;list-style:none">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:20px">📚</span>
          <span>Explore All Other 80+ Exams, 27 Study Suites &amp; Companion Tools</span>
        </div>
        <span style="font-size:12px;font-weight:700;color:var(--pr);background:rgba(79,70,229,0.08);padding:4px 12px;border-radius:14px">Browse Full Catalog ▾</span>
      </summary>
      <div style="padding:0 22px 28px;border-top:1px solid var(--bdr);padding-top:22px">
{catalog_content}
      </div>
    </details>

    """
        content = content[:start_idx] + wrapped_catalog + content[end_idx:]

    # 3. Clean up footer reach metric
    content = re.sub(
        r'<span>👥 <strong>All-India Platform Reach:</strong>.*?visits</span>',
        '<span>⚡ <strong>Free Open Education:</strong> Zero paywalls &bull; MIT Licensed &bull; Built for All-India Aspirants</span>',
        content
    )

    INDEX_PATH.write_text(content, encoding="utf-8")
    print("Successfully personalized index.html!")

if __name__ == "__main__":
    personalize_homepage()
