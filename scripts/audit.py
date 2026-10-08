import re, pathlib, collections

g = lambda p, s: (re.search(p, s, re.I | re.S) or [0, ""])[1].strip()
titles = collections.defaultdict(list)

for f in sorted(pathlib.Path(".").rglob("*.html")):
    if "suites" in f.parts or ".git" in f.parts:
        continue
    s = f.read_text(encoding="utf-8", errors="ignore")
    t = g(r"<title>(.*?)</title>", s)
    d = g(r'name=["\']description["\'][^>]*content=["\'](.*?)["\']', s)
    c = g(r'rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', s)
    og = g(r'property=["\']og:url["\'][^>]*content=["\'](.*?)["\']', s)
    titles[t].append(str(f))
    bad = []
    if not t or len(t) > 65:
        bad.append(f"title {len(t)}ch")
    if not d or len(d) > 165:
        bad.append(f"desc {len(d)}ch")
    if not c:
        bad.append("no canonical")
    elif f.name != "index.html" and not c.endswith(f.name):
        bad.append(f"canonical!=file {c}")
    if og and og != c:
        bad.append("og:url!=canonical")
    if re.search(r'src=["\']["\']', s):
        bad.append("empty src")
    if re.search(r"G-X{6,}", s):
        bad.append("GA placeholder")
    if re.search(r"2025\s?[–-]\s?(20)?26", s):
        bad.append("stale 2025-26")
    if "og:image" not in s:
        bad.append("no og:image")
    if bad:
        print(f, "|", "; ".join(bad))

for t, fs in titles.items():
    if len(fs) > 1:
        print("DUP TITLE:", t[:60], fs)
