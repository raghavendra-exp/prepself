import re, pathlib, json

site_config = json.loads(pathlib.Path("site.json").read_text(encoding="utf-8"))
COUNTS = site_config["counts"]

# ── 1. Fix index.html ──
idx_path = pathlib.Path("index.html")
idx = idx_path.read_text(encoding="utf-8")

# Fix 1: Avatar image inside #userChip
# Remove static <img> inside userChip
idx = re.sub(
    r'<div id="userChip" class="user-chip" style="display:none">\s*<img id="userAvatar"[^>]*>',
    r'<div id="userChip" class="user-chip" style="display:none">',
    idx
)

# Update avatar JS insertion
old_avatar_js = 'userAvatar.src = user.photoURL || defaultAvatar;'
new_avatar_js = """let avatarEl = document.getElementById("userAvatar");
            if (!avatarEl && userChip) {
              avatarEl = document.createElement("img");
              avatarEl.id = "userAvatar";
              avatarEl.className = "user-avatar";
              avatarEl.alt = "User Profile Avatar";
              avatarEl.width = 28;
              avatarEl.height = 28;
              userChip.insertBefore(avatarEl, userChip.firstChild);
            }
            if (avatarEl) {
              avatarEl.src = user.photoURL || defaultAvatar;
              avatarEl.onerror = function() { this.src = defaultAvatar; };
            }"""
if old_avatar_js in idx:
    idx = idx.replace(old_avatar_js, new_avatar_js)

# Fix 2: Reconcile all counts to 21 AI Tools & 27 Suites
idx = idx.replace("Explore 18 AI Engines", "Explore 21 AI Study Tools")
idx = idx.replace("18 engines, 80+ exams", "21 AI tools, 80+ exams")
idx = idx.replace("All (22)", "All (21)")
idx = idx.replace("22 AI exam engines", "21 AI exam tools")
idx = idx.replace("All 22 exam tools", "All 21 exam tools")
idx = idx.replace("CAT GRID (22 CARDS", "CAT GRID (21 CARDS")

# Fix 3: Remove "zero ads" claims -> replace with "zero paywalls, zero subscription tiers"
idx = idx.replace("zero sign-up, zero paywalls, and zero ads", "zero sign-up, zero paywalls, and zero subscription tiers")
idx = idx.replace("zero paywalls, zero ads", "zero paywalls, zero subscriptions")

# Fix 4: Remove hardcoded 1,48,290 on line 3468
idx = re.sub(
    r'id="ftVisitorCount"[^>]*>1,48,290<',
    r'id="ftVisitorCount">--<',
    idx
)

# Fix 5: Remove "official mock tests" on UPSSSC PET card
idx = idx.replace(
    "Graph &amp; Table interpretation, and official mock tests.",
    "Graph &amp; Table interpretation, and exam-pattern CBT mock tests."
)
idx = idx.replace(
    "Graph & Table interpretation, and official mock tests.",
    "Graph & Table interpretation, and exam-pattern CBT mock tests."
)

# Fix 6: Support popup - show once only
old_popup_check = "if (localStorage.getItem('be_yt_subscribed') === 'true' || localStorage.getItem('be_yt_plea_seen') === 'true')"
new_popup_check = "if (localStorage.getItem('ps:v1:support_popup_dismissed') === 'true' || localStorage.getItem('be_yt_subscribed') === 'true' || localStorage.getItem('be_yt_plea_seen') === 'true')"
idx = idx.replace(old_popup_check, new_popup_check)

old_dismiss = "localStorage.setItem('be_yt_plea_seen', 'true');"
new_dismiss = "localStorage.setItem('be_yt_plea_seen', 'true'); localStorage.setItem('ps:v1:support_popup_dismissed', 'true');"
idx = idx.replace(old_dismiss, new_dismiss)

# Fix 7: Streak tracking - Firebase & GA4 habit loop integration
old_streak_save = "localStorage.setItem('be_study_streak', streak);"
new_streak_save = """localStorage.setItem('be_study_streak', streak);
      localStorage.setItem('ps:v1:study_streak', streak);
      if (typeof gtag === 'function') {
        gtag('event', 'streak_day', { streak_count: streak });
      }
      if (typeof auth !== 'undefined' && auth && auth.currentUser && typeof db !== 'undefined' && db) {
        try {
          setDoc(doc(db, "users", auth.currentUser.uid), {
            study_streak: streak,
            last_study_date: todayStr
          }, { merge: true }).catch(() => {});
        } catch(e) {}
      }"""
idx = idx.replace(old_streak_save, new_streak_save)

# Fix 8: Section header in Exam Calendar
idx = idx.replace(
    '<div class="signal-eyebrow"><span class="dot"></span> Live Signal &middot; RSS2Feed &amp; Firebase Live Sync</div>',
    '<div class="signal-eyebrow"><span class="dot"></span> Official Cycle Schedules &middot; 2026&ndash;2027 Academic Year</div>'
)

idx_path.write_text(idx, encoding="utf-8")
print("index.html updated successfully!")

# ── 2. Fix user-guide.html ──
ug_path = pathlib.Path("user-guide.html")
if ug_path.exists():
    ug = ug_path.read_text(encoding="utf-8")
    ug = ug.replace("zero ads, and zero required logins", "zero subscription tiers, and zero mandatory logins")
    ug = re.sub(r'&copy;\s*2025&ndash;2027.*?All rights reserved.*?</div', r'&copy; 2026 PrepSelf &bull; Released under the MIT License &bull; Created by <a href="https://raghavfolio-8op53xas.manus.space/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Raghavendra (Raghavbegins)</a>.</div', ug)
    ug_path.write_text(ug, encoding="utf-8")
    print("user-guide.html updated!")

# ── 3. Fix about.html ──
ab_path = pathlib.Path("about.html")
if ab_path.exists():
    ab = ab_path.read_text(encoding="utf-8")
    ab = re.sub(r'&copy;\s*2025&ndash;2027.*?All rights reserved.*?</div', r'&copy; 2026 PrepSelf &bull; Released under the MIT License &bull; Created by <a href="https://raghavfolio-8op53xas.manus.space/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Raghavendra (Raghavbegins)</a>.</div', ab)
    ab_path.write_text(ab, encoding="utf-8")
    print("about.html updated!")

# ── 4. Fix sitemap.html ──
sm_path = pathlib.Path("sitemap.html")
if sm_path.exists():
    sm = sm_path.read_text(encoding="utf-8")
    sm = re.sub(r'&copy;\s*2025&ndash;2027.*?All rights reserved\.', r'&copy; 2026 PrepSelf &bull; Released under the MIT License.', sm)
    sm_path.write_text(sm, encoding="utf-8")
    print("sitemap.html updated!")

# ── 5. Add Rights & Material Provenance Disclosure in Free Library & Study Modules ──
lib_path = pathlib.Path("IBPS_SBI_Free_Library.html")
if lib_path.exists():
    lib = lib_path.read_text(encoding="utf-8")
    disclosure = """<div style="margin-top:20px;padding:16px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;font-size:12px;color:rgba(255,255,255,0.65);line-height:1.6">
    <strong style="color:var(--gold)">🏛️ Statutory Educational Material Disclosure & Rights Attribution:</strong><br>
    All NCERT textbooks, ePathshala links, Reserve Bank of India (RBI) notifications, and NIOS study guides referenced on this platform link directly to their respective public statutory repositories (ncert.nic.in, epathshala.nic.in, rbi.org.in). PrepSelf does not claim ownership or copyright over third-party materials. All trademarks and registered names belong to their respective statutory authorities. Curated strictly for non-commercial student reference under fair dealing.
  </div>"""
    if "Statutory Educational Material Disclosure" not in lib:
        lib = lib.replace('</div><!-- /wrap -->', disclosure + '\n</div><!-- /wrap -->')
        lib_path.write_text(lib, encoding="utf-8")
        print("IBPS_SBI_Free_Library.html updated with rights disclosure!")
