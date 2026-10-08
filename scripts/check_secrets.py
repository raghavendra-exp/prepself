import os
import re

patterns = {
    'openai_sk': re.compile(r'sk-[a-zA-Z0-9]{20,}'),
    'generic_secret': re.compile(r'(?:api[_-]?key|secret|token)\s*[:=]\s*[\'"][a-zA-Z0-9_\-]{16,}[\'"]', re.I),
    'bearer_token': re.compile(r'bearer\s+[a-zA-Z0-9_\-\.]{16,}', re.I),
    'aiza_key': re.compile(r'AIza[0-9A-Za-z-_]{35}')
}

results = {k: [] for k in patterns}

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root:
        continue
    for f in files:
        path = os.path.join(root, f)
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                for idx, line in enumerate(fp, 1):
                    for name, pat in patterns.items():
                        m = pat.search(line)
                        if m:
                            results[name].append((path, idx, m.group(0), line.strip()[:100]))
        except Exception as e:
            pass

for k, matches in results.items():
    print(f'=== Pattern: {k} (Count: {len(matches)}) ===')
    for p, line_no, match, sample in matches[:15]:
        print(f'  {p}:{line_no} -> {match}')
    if len(matches) > 15:
        print(f'  ... and {len(matches) - 15} more')
