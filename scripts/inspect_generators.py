import pathlib, re

g = lambda p, s: (re.search(p, s, re.I | re.S) or [0, ''])[1].strip()

for f in sorted(pathlib.Path('.').glob('*prompt_generator.html')):
    s = f.read_text(encoding='utf-8', errors='ignore')
    t = g(r'<title>(.*?)</title>', s)
    d = g(r'name=["\']description["\'][^>]*content=["\'](.*?)["\']', s)
    h1 = g(r'<h1[^>]*>(.*?)</h1>', s)
    h1_clean = re.sub(r'<[^>]+>', ' ', h1).strip()
    h1_clean = re.sub(r'\s+', ' ', h1_clean)
    print(f"FILE: {f.name}")
    print(f"  Title ({len(t)}): {t}")
    print(f"  Desc  ({len(d)}): {d}")
    print(f"  H1: {h1_clean[:70]}")
