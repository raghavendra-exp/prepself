/* UPSC Prelims & Mains Practice Hub
   Complete History of India — 540+ Prelims MCQs & 215+ Mains Questions
   Synthesized from 10 Canonical Textbooks (NCERT, R.S. Sharma, Upinder Singh,
   Satish Chandra, Spectrum, Bipan Chandra, Nitin Singhania, Norman Lowe) */

const HistoryPractice = (() => {
  let prelimsData = [];
  let mainsData = [];
  let userAnswers = {}; // { qId: selectedIndex }
  let scoreAttempted = 0;
  let scoreCorrect = 0;

  // Filter & View States
  let activeSection = 'prelims'; // 'prelims' or 'mains'
  let activeCategory = 'all';
  let activeBook = 'all';
  let pyqOnly = false;
  let searchQuery = '';
  let currentPage = 1;
  const PAGE_SIZE = 20;

  // Exam Simulator States
  let isExamMode = false;
  let examQuestions = [];
  let examTimerInterval = null;
  let examSecondsLeft = 0;
  let examAnswers = {};

  const CATEGORIES = [
    { id: 'all', label: 'All Subjects' },
    { id: 'ancient', label: 'Ancient India' },
    { id: 'medieval', label: 'Medieval India' },
    { id: 'modern', label: 'Modern India' },
    { id: 'art-culture', label: 'Art & Culture' },
    { id: 'world-history', label: 'World History' },
    { id: 'up-history', label: 'UP Special' }
  ];

  // Load saved state
  function loadSavedScores() {
    try {
      const saved = localStorage.getItem('chi-practice-scores');
      if (saved) {
        const parsed = JSON.parse(saved);
        scoreAttempted = parsed.attempted || 0;
        scoreCorrect = parsed.correct || 0;
      }
      const savedAns = localStorage.getItem('chi-practice-answers');
      if (savedAns) {
        userAnswers = JSON.parse(savedAns);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function saveScores() {
    try {
      localStorage.setItem('chi-practice-scores', JSON.stringify({
        attempted: scoreAttempted,
        correct: scoreCorrect
      }));
      localStorage.setItem('chi-practice-answers', JSON.stringify(userAnswers));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  async function fetchQuestionBanks() {
    try {
      const [pRes, mRes] = await Promise.all([
        fetch('data/prelims-questions.json'),
        fetch('data/mains-questions.json')
      ]);
      if (pRes.ok) prelimsData = await pRes.json();
      if (mRes.ok) mainsData = await mRes.json();
    } catch (err) {
      console.warn('Could not fetch JSON data files; checking embedded fallback:', err);
    }

    // Fallback if data files could not be loaded
    if (!prelimsData || !prelimsData.length) {
      prelimsData = getFallbackPrelims();
    }
    if (!mainsData || !mainsData.length) {
      mainsData = getFallbackMains();
    }

    updateHeaderBadges();
  }

  function updateHeaderBadges() {
    const pBadge = document.getElementById('countPrelimsBadge');
    const mBadge = document.getElementById('countMainsBadge');
    const bSize = document.getElementById('statBankSize');
    if (pBadge) pBadge.textContent = prelimsData.length;
    if (mBadge) mBadge.textContent = mainsData.length;
    if (bSize) bSize.textContent = prelimsData.length + mainsData.length;
  }

  /* ---------------- Filtering Logic ---------------- */
  function matchesBook(itemBookRef, selectedBook) {
    if (selectedBook === 'all') return true;
    if (!itemBookRef) return false;
    const ref = itemBookRef.toLowerCase();
    switch (selectedBook) {
      case 'ncert': return ref.includes('ncert');
      case 'rs-sharma': return ref.includes('sharma');
      case 'upinder-singh': return ref.includes('upinder');
      case 'satish-chandra': return ref.includes('satish');
      case 'spectrum': return ref.includes('spectrum');
      case 'bipan-chandra': return ref.includes('bipan');
      case 'nitin-singhania': return ref.includes('singhania');
      case 'norman-lowe': return ref.includes('norman') || ref.includes('lowe');
      default: return true;
    }
  }

  function getFilteredPrelims() {
    return prelimsData.filter(q => {
      if (activeCategory !== 'all' && q.category !== activeCategory) return false;
      if (pyqOnly && !q.isPyq) return false;
      if (!matchesBook(q.bookRef, activeBook)) return false;
      if (searchQuery) {
        const qText = (q.question + ' ' + (q.options ? q.options.join(' ') : '') + ' ' + (q.explanation || '') + ' ' + (q.trap || '') + ' ' + (q.topperTip || '') + ' ' + (q.bookRef || '')).toLowerCase();
        if (!qText.includes(searchQuery)) return false;
      }
      return true;
    });
  }

  function getFilteredMains() {
    return mainsData.filter(m => {
      if (activeCategory !== 'all' && m.category !== activeCategory) return false;
      if (pyqOnly && !m.isPyq) return false;
      if (!matchesBook(m.bookRef, activeBook)) return false;
      if (searchQuery) {
        const mText = (m.question + ' ' + (m.bookRef || '') + ' ' + (m.framework ? (m.framework.intro + ' ' + m.framework.conclusion) : '')).toLowerCase();
        if (!mText.includes(searchQuery)) return false;
      }
      return true;
    });
  }

  /* ---------------- UI Renderers ---------------- */
  function renderScoreboard() {
    const elAtt = document.getElementById('statAttempted');
    const elCor = document.getElementById('statCorrect');
    const elAcc = document.getElementById('statAccuracy');
    if (!elAtt || !elCor || !elAcc) return;

    elAtt.textContent = scoreAttempted;
    elCor.textContent = scoreCorrect;
    const acc = scoreAttempted > 0 ? Math.round((scoreCorrect / scoreAttempted) * 100) : 0;
    elAcc.textContent = `${acc}%`;
  }

  function renderCategoryChips() {
    const bar = document.getElementById('practiceCategoryBar');
    if (!bar) return;

    const counts = {};
    const dataset = (activeSection === 'prelims') ? prelimsData : mainsData;
    dataset.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    counts['all'] = dataset.length;

    bar.innerHTML = CATEGORIES.map(cat => {
      const count = counts[cat.id] || 0;
      const isActive = cat.id === activeCategory;
      return `<button class="filter-chip ${isActive ? 'active' : ''}" onclick="HistoryPractice.setCategory('${cat.id}')">
        ${cat.label} <span class="chip-count">(${count})</span>
      </button>`;
    }).join('');
  }

  function renderPagination(totalItems) {
    const container = document.getElementById('practicePagination');
    if (!container) return;

    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = `
      <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="HistoryPractice.goToPage(1)" title="First Page">&laquo; First</button>
      <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="HistoryPractice.goToPage(${currentPage - 1})" title="Previous Page">&lsaquo; Prev</button>
      <span style="font-family:var(--font-mono); font-size:0.86rem; color:var(--ink-soft); margin:0 8px;">
        Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong> (${totalItems} items)
      </span>
      <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="HistoryPractice.goToPage(${currentPage + 1})" title="Next Page">Next &rsaquo;</button>
      <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="HistoryPractice.goToPage(${totalPages})" title="Last Page">Last &raquo;</button>
    `;
    container.innerHTML = html;
  }

  /* ---------------- Prelims Question Card ---------------- */
  function renderPrelimsCard(q, isExam) {
    const userSelected = isExam ? examAnswers[q.id] : userAnswers[q.id];
    const isAnswered = typeof userSelected === 'number';
    const isCorrect = isAnswered && userSelected === q.correctIndex;

    let cardClass = 'practice-q-card';
    if (!isExam && isAnswered) {
      cardClass += isCorrect ? ' q-correct' : ' q-incorrect';
    }

    const optionsHtml = q.options.map((opt, idx) => {
      const optLetter = String.fromCharCode(65 + idx);
      let btnClass = 'opt-btn';

      if (!isExam && isAnswered) {
        btnClass += ' opt-disabled';
        if (idx === q.correctIndex) {
          btnClass += ' opt-correct';
        } else if (idx === userSelected) {
          btnClass += ' opt-wrong';
        }
      } else if (isExam && isAnswered && idx === userSelected) {
        btnClass += ' opt-selected';
      }

      const clickHandler = isExam
        ? `onclick="HistoryPractice.onExamSelect('${q.id}', ${idx})"`
        : `onclick="HistoryPractice.submitAnswer('${q.id}', ${idx})"` ;

      return `
        <button class="${btnClass}" ${clickHandler} ${(!isExam && isAnswered) ? 'disabled' : ''}>
          <span class="opt-label">${optLetter}.</span>
          <span>${opt}</span>
        </button>`;
    }).join('');

    let explanationHtml = '';
    if (!isExam && isAnswered) {
      explanationHtml = `
        <div class="q-explanation">
          <div class="exp-header">
            <span class="exp-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}">
              ${isCorrect ? '✓ CORRECT ANSWER' : '✗ INCORRECT ATTEMPT'}
            </span>
            <span class="exp-correct-tag">Correct Option: <strong>${String.fromCharCode(65 + q.correctIndex)}</strong></span>
          </div>
          <div class="exp-text">${q.explanation.replace(/\n/g, '<br>')}</div>
          ${q.trap ? `<div class="trap-box"><strong>⚠️ UPSC Elimination Trap:</strong> ${q.trap}</div>` : ''}
          ${q.topperTip ? `<div class="topper-box"><strong>⭐ Topper's Insight:</strong> ${q.topperTip}</div>` : ''}
          ${q.periodId ? `<div style="margin-top:10px; font-size:0.84rem;"><a href="timeline.html#${q.periodId}" class="link" target="_blank">📖 Explore Period in Master Timeline &rarr;</a></div>` : ''}
        </div>`;
    }

    return `
      <div class="${cardClass}" id="qcard-${q.id}">
        <div class="q-head">
          <div class="q-meta">
            <span class="badge badge-site badge-${q.category}">${q.categoryLabel || q.category}</span>
            ${q.isPyq ? `<span class="badge" style="background:#854d0e; color:#fef08a; font-weight:700;">🏆 Authentic PYQ</span>` : ''}
            <span class="q-year">${q.yearRef || 'UPSC CSE Pattern'}</span>
            ${q.bookRef ? `<span class="q-book">📚 ${q.bookRef}</span>` : ''}
          </div>
          <span class="q-id">#${q.id.toUpperCase()}</span>
        </div>
        <div class="q-body">
          <p class="q-prompt">${q.question.replace(/\n/g, '<br>')}</p>
          <div class="q-options">${optionsHtml}</div>
          ${explanationHtml}
        </div>
      </div>`;
  }

  /* ---------------- Mains Question Card ---------------- */
  function renderMainsCard(m) {
    const fw = m.framework || {};
    return `
      <div class="mains-card">
        <div class="q-head">
          <div class="q-meta">
            <span class="badge badge-site badge-${m.category}">${m.categoryLabel || m.category}</span>
            ${m.isPyq ? `<span class="badge" style="background:#854d0e; color:#fef08a; font-weight:700;">🏆 Authentic PYQ</span>` : ''}
            <span class="badge" style="background:var(--bg-sunken); border:1px solid var(--line);">${m.marks || 10} Marks</span>
            <span class="badge" style="background:var(--bg-sunken); border:1px solid var(--line);">${m.wordLimit || 150} Words</span>
            ${m.bookRef ? `<span class="q-book">📚 ${m.bookRef}</span>` : ''}
          </div>
          <span class="q-id">#${m.id.toUpperCase()}</span>
        </div>

        <div class="mains-prompt-box">
          ${m.question}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <button class="mains-toggle-btn" onclick="HistoryPractice.toggleFramework('${m.id}')">
            <span>📐</span> <span id="fw-btn-txt-${m.id}">Reveal Model Answer Framework</span>
          </button>
          ${m.yearSource ? `<span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--ink-faint);">${m.yearSource}</span>` : ''}
        </div>

        <div class="mains-framework-wrap" id="fw-${m.id}" style="display:none;">
          <div style="margin-bottom:16px;">
            <div class="framework-heading" style="color:var(--seal);">1. Contextual Introduction &amp; Historical Thesis</div>
            <p style="font-size:0.95rem; line-height:1.55; color:var(--ink-soft); margin:4px 0;">${fw.intro || ''}</p>
          </div>

          <div style="margin-bottom:16px;">
            <div class="framework-heading" style="color:var(--accent);">2. Multi-Dimensional Analytical Body</div>
            ${(fw.body || []).map(b => `
              <div style="margin-bottom:12px; padding-left:8px; border-left:2px solid var(--line);">
                <strong style="font-size:0.92rem; color:var(--ink);">${b.heading}</strong>
                <ul style="padding-left:1.4em; margin:6px 0; font-size:0.92rem; color:var(--ink-soft); line-height:1.5;">
                  ${(b.points || []).map(pt => `<li style="margin-bottom:4px;">${pt}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          ${fw.diagramMapIdea ? `
            <div class="sketch-recommendation">
              <strong>🗺️ Recommended Value-Addition Sketch / Flowchart:</strong>
              <div style="margin-top:4px;">${fw.diagramMapIdea}</div>
            </div>
          ` : ''}

          <div style="margin-top:16px;">
            <div class="framework-heading" style="color:var(--gold);">3. Forward-Looking Conclusion &amp; Civilizational Legacy</div>
            <p style="font-size:0.95rem; line-height:1.55; color:var(--ink-soft); margin:4px 0;">${fw.conclusion || ''}</p>
          </div>
        </div>
      </div>`;
  }

  /* ---------------- Main Content Renderer ---------------- */
  function renderContent() {
    const container = document.getElementById('practiceContainer');
    if (!container) return;

    if (isExamMode) {
      renderExamView(container);
      return;
    }

    if (activeSection === 'prelims') {
      const filtered = getFilteredPrelims();
      if (!filtered.length) {
        container.innerHTML = `
          <div class="tablet" style="text-align:center; padding:48px 24px;">
            <p style="font-size:1.15rem; color:var(--ink-soft); margin-bottom:12px;">No Prelims MCQs found matching your active filters.</p>
            <button class="btn btn-outline btn-sm" onclick="HistoryPractice.clearFilters()">Clear All Filters</button>
          </div>`;
        renderPagination(0);
        return;
      }

      // Pagination slice
      const start = (currentPage - 1) * PAGE_SIZE;
      const pageItems = filtered.slice(start, start + PAGE_SIZE);

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <span style="font-family:var(--font-mono); font-size:0.86rem; color:var(--ink-faint);">
            Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} Prelims Questions
          </span>
        </div>
        <div class="q-list">
          ${pageItems.map(q => renderPrelimsCard(q, false)).join('')}
        </div>`;

      renderPagination(filtered.length);
    } else {
      const filtered = getFilteredMains();
      if (!filtered.length) {
        container.innerHTML = `
          <div class="tablet" style="text-align:center; padding:48px 24px;">
            <p style="font-size:1.15rem; color:var(--ink-soft); margin-bottom:12px;">No Mains questions found matching your active filters.</p>
            <button class="btn btn-outline btn-sm" onclick="HistoryPractice.clearFilters()">Clear All Filters</button>
          </div>`;
        renderPagination(0);
        return;
      }

      const start = (currentPage - 1) * PAGE_SIZE;
      const pageItems = filtered.slice(start, start + PAGE_SIZE);

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
          <span style="font-family:var(--font-mono); font-size:0.86rem; color:var(--ink-faint);">
            Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} Mains Questions
          </span>
        </div>
        <div class="mains-list">
          ${pageItems.map(m => renderMainsCard(m)).join('')}
        </div>`;

      renderPagination(filtered.length);
    }
  }

  /* ---------------- Exam Simulator ---------------- */
  function setExamMode(on) {
    isExamMode = on;
    const btnStudy = document.getElementById('btnStudyMode');
    const btnExam = document.getElementById('btnExamMode');
    const statusBar = document.getElementById('examStatusBar');

    if (btnStudy) btnStudy.classList.toggle('active', !on);
    if (btnExam) btnExam.classList.toggle('active', on);
    if (statusBar) statusBar.style.display = on ? 'flex' : 'none';

    if (on && (!examQuestions || !examQuestions.length)) {
      startExam(25);
    } else {
      renderContent();
    }
  }

  function startExam(questionCount) {
    if (examTimerInterval) clearInterval(examTimerInterval);
    const pool = [...prelimsData];
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    examQuestions = pool.slice(0, questionCount);
    examAnswers = {};
    examSecondsLeft = questionCount * 80; // 80 seconds per question
    updateExamTimer();

    examTimerInterval = setInterval(() => {
      examSecondsLeft--;
      updateExamTimer();
      if (examSecondsLeft <= 0) {
        clearInterval(examTimerInterval);
        submitExam();
      }
    }, 1000);

    renderContent();
  }

  function updateExamTimer() {
    const elTimer = document.getElementById('examTimer');
    const elProg = document.getElementById('examProgress');
    if (elTimer) {
      const mins = Math.floor(examSecondsLeft / 60);
      const secs = examSecondsLeft % 60;
      elTimer.textContent = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    if (elProg) {
      const answeredCount = Object.keys(examAnswers).length;
      elProg.textContent = `Answered ${answeredCount} of ${examQuestions.length}`;
    }
  }

  function onExamSelect(qId, optionIdx) {
    examAnswers[qId] = optionIdx;
    updateExamTimer();
    const card = document.getElementById(`qcard-${qId}`);
    if (card) {
      const buttons = card.querySelectorAll('.opt-btn');
      buttons.forEach((btn, idx) => {
        btn.classList.toggle('opt-selected', idx === optionIdx);
      });
    }
  }

  function submitExam() {
    if (examTimerInterval) clearInterval(examTimerInterval);
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    examQuestions.forEach(q => {
      const ans = examAnswers[q.id];
      if (typeof ans === 'number') {
        if (ans === q.correctIndex) correct++;
        else incorrect++;
      } else {
        unattempted++;
      }
    });

    const marks = (correct * 2) - (incorrect * 0.66);
    const maxMarks = examQuestions.length * 2;
    const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop active';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width:560px; padding:32px; text-align:center;">
        <span style="font-size:3rem;">🎯</span>
        <h2 style="font-size:1.8rem; margin:8px 0;">Mock Exam Scorecard</h2>
        <p style="color:var(--ink-soft); font-size:0.95rem; margin-bottom:20px;">UPSC CSE Marking Scheme (+2.00 / -0.66)</p>
        
        <div style="background:var(--bg-sunken); border:1px solid var(--line); border-radius:var(--radius-lg); padding:20px; margin-bottom:24px;">
          <div style="font-size:2.6rem; font-weight:700; color:var(--seal);">${marks.toFixed(2)} <span style="font-size:1.1rem; color:var(--ink-faint);">/ ${maxMarks}</span></div>
          <div style="font-family:var(--font-mono); font-size:0.84rem; color:var(--ink-soft); margin-top:4px;">Accuracy: <strong>${accuracy}%</strong> &bull; Cutoff Qualifier: ${marks >= (maxMarks * 0.45) ? '✅ CLEARED' : '❌ NEEDS REVISION'}</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:24px; text-align:center;">
          <div style="background:var(--bg); border:1px solid var(--line); border-radius:var(--radius); padding:12px;">
            <div style="font-size:1.4rem; font-weight:700; color:#2b7a4b;">${correct}</div>
            <div style="font-size:0.75rem; color:var(--ink-faint); text-transform:uppercase;">Correct</div>
          </div>
          <div style="background:var(--bg); border:1px solid var(--line); border-radius:var(--radius); padding:12px;">
            <div style="font-size:1.4rem; font-weight:700; color:#c93b3b;">${incorrect}</div>
            <div style="font-size:0.75rem; color:var(--ink-faint); text-transform:uppercase;">Incorrect</div>
          </div>
          <div style="background:var(--bg); border:1px solid var(--line); border-radius:var(--radius); padding:12px;">
            <div style="font-size:1.4rem; font-weight:700; color:var(--ink-faint);">${unattempted}</div>
            <div style="font-size:0.75rem; color:var(--ink-faint); text-transform:uppercase;">Unattempted</div>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:center;">
          <button class="btn btn-outline" onclick="this.closest('.modal-backdrop').remove(); HistoryPractice.reviewExam()">Review Answers</button>
          <button class="btn btn-primary" onclick="this.closest('.modal-backdrop').remove(); HistoryPractice.setExamMode(false)">Exit to Study Mode</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function reviewExam() {
    isExamMode = false;
    // Copy exam answers to userAnswers so explanations show
    Object.assign(userAnswers, examAnswers);
    saveScores();
    const container = document.getElementById('practiceContainer');
    if (!container) return;
    container.innerHTML = `
      <div style="margin-bottom:20px; padding:16px 20px; background:var(--bg-sunken); border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
        <strong>📋 Reviewing Mock Test Questions</strong>
        <button class="btn btn-outline btn-sm" onclick="HistoryPractice.setExamMode(false)">Back to All Questions</button>
      </div>
      <div class="q-list">
        ${examQuestions.map(q => renderPrelimsCard(q, false)).join('')}
      </div>`;
  }

  function renderExamView(container) {
    container.innerHTML = `
      <div class="q-list">
        ${examQuestions.map(q => renderPrelimsCard(q, true)).join('')}
      </div>`;
    renderPagination(0);
  }

  /* ---------------- Handlers & API ---------------- */
  function submitAnswer(qId, selectedIdx) {
    if (typeof userAnswers[qId] === 'number') return;
    const q = prelimsData.find(item => item.id === qId);
    if (!q) return;

    userAnswers[qId] = selectedIdx;
    scoreAttempted++;
    if (selectedIdx === q.correctIndex) {
      scoreCorrect++;
    }

    saveScores();
    renderScoreboard();

    // Re-render only that card
    const card = document.getElementById(`qcard-${qId}`);
    if (card) {
      card.outerHTML = renderPrelimsCard(q, false);
    }
  }

  function toggleFramework(mId) {
    const wrap = document.getElementById(`fw-${mId}`);
    const btnTxt = document.getElementById(`fw-btn-txt-${mId}`);
    if (!wrap) return;
    const isHidden = wrap.style.display === 'none';
    wrap.style.display = isHidden ? 'block' : 'none';
    if (btnTxt) {
      btnTxt.textContent = isHidden ? 'Hide Model Framework' : 'Reveal Model Answer Framework';
    }
  }

  function setSection(sec) {
    activeSection = sec;
    currentPage = 1;
    const tabP = document.getElementById('tabPrelims');
    const tabM = document.getElementById('tabMains');
    const examToggle = document.getElementById('examModeToggleWrap');

    if (tabP) tabP.classList.toggle('active', sec === 'prelims');
    if (tabM) tabM.classList.toggle('active', sec === 'mains');
    if (examToggle) examToggle.style.display = (sec === 'prelims') ? 'flex' : 'none';

    renderCategoryChips();
    renderContent();
  }

  function setCategory(catId) {
    activeCategory = catId;
    currentPage = 1;
    renderCategoryChips();
    renderContent();
  }

  function onSearchChange(val) {
    searchQuery = val.trim().toLowerCase();
    currentPage = 1;
    renderContent();
  }

  function onBookChange(val) {
    activeBook = val;
    currentPage = 1;
    renderContent();
  }

  function togglePyqFilter() {
    pyqOnly = !pyqOnly;
    currentPage = 1;
    const btn = document.getElementById('pyqFilterBtn');
    if (btn) btn.classList.toggle('active', pyqOnly);
    renderContent();
  }

  function clearFilters() {
    activeCategory = 'all';
    activeBook = 'all';
    pyqOnly = false;
    searchQuery = '';
    currentPage = 1;

    const sInput = document.getElementById('practiceSearch');
    const bSelect = document.getElementById('bookFilter');
    const pBtn = document.getElementById('pyqFilterBtn');

    if (sInput) sInput.value = '';
    if (bSelect) bSelect.value = 'all';
    if (pBtn) pBtn.classList.remove('active');

    renderCategoryChips();
    renderContent();
  }

  function goToPage(page) {
    currentPage = page;
    renderContent();
    window.scrollTo({ top: 280, behavior: 'smooth' });
  }

  function resetQuiz() {
    if (!confirm('Are you sure you want to reset your practice scores and answered questions?')) return;
    scoreAttempted = 0;
    scoreCorrect = 0;
    userAnswers = {};
    saveScores();
    renderScoreboard();
    renderContent();
  }

  /* ---------------- Fallbacks for offline file:// mode ---------------- */
  function getFallbackPrelims() {
    return [
      {
        id: "q_demo_1",
        category: "ancient",
        categoryLabel: "Ancient India",
        isPyq: true,
        yearRef: "UPSC CSE 2021",
        bookRef: "Upinder Singh, Ch. 4; NCERT Class 12",
        question: "Which one of the following ancient towns is well-known for its elaborate system of water harvesting and management by building a series of dams and channelizing water into connected reservoirs?",
        options: ["Dholavira", "Kalibangan", "Rakhigarhi", "Ropar"],
        correctIndex: 0,
        explanation: "Dholavira (Khadir Bet, Kutch, Gujarat) is world-renowned for its sophisticated rainwater harvesting and hydraulic engineering. It features 16 monumental stone reservoirs connected by stone conduits and check-dams across seasonal streams Manhar and Mansar.",
        trap: "Do not confuse Dholavira's water reservoirs with Lothal's brick tidal dockyard!",
        topperTip: "Dholavira was declared India's 40th UNESCO World Heritage Site in 2021."
      }
    ];
  }

  function getFallbackMains() {
    return [
      {
        id: "m_demo_1",
        category: "ancient",
        categoryLabel: "Ancient India",
        marks: 15,
        wordLimit: 250,
        isPyq: true,
        bookRef: "Upinder Singh, Ch. 4",
        question: "To what extent has the urban planning and cultural traditions of the Indus Valley Civilisation provided inputs to modern Indian urbanization? Discuss.",
        framework: {
          intro: "The Indus Valley Civilisation (c. 2600–1900 BCE) represents South Asia's first urban revolution, offering timeless civic paradigms.",
          body: [
            { heading: "Urban Town Planning Inputs", points: ["Grid-iron street networks with standardized building materials.", "Elaborate underground covered drainage with inspection manholes.", "Decentralized rainwater harvesting as seen in Dholavira."] },
            { heading: "Living Cultural Continuities", points: ["Iconographic reverence for Mother Goddess, Pashupati Shiva, and sacred peepal tree.", "Lost-wax bronze metallurgy (Dokra craft) and terra-cotta toy craftsmanship."] }
          ],
          diagramMapIdea: "Comparative grid layout: Harappan Citadel & Lower Town vs Modern Chandigarh Sector Model.",
          conclusion: "IVC proves that ancient Indian civil engineering prioritized hygiene and community welfare, serving as a beacon for Smart Cities."
        }
      }
    ];
  }

  /* ---------------- Initialization ---------------- */
  async function init() {
    renderNav('practice.html');
    renderBreadcrumb([
      { label: 'Home', href: 'index.html' },
      { label: 'UPSC Practice Hub' }
    ]);
    renderFooter();
    loadSavedScores();
    renderScoreboard();

    // Check URL search params
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'mains') activeSection = 'mains';
    if (params.get('category')) activeCategory = params.get('category');
    if (params.get('book')) activeBook = params.get('book');
    if (params.get('pyq') === '1') pyqOnly = true;

    // Set UI tab states
    const tabP = document.getElementById('tabPrelims');
    const tabM = document.getElementById('tabMains');
    if (tabP && tabM) {
      tabP.classList.toggle('active', activeSection === 'prelims');
      tabM.classList.toggle('active', activeSection === 'mains');
    }
    const bSelect = document.getElementById('bookFilter');
    if (bSelect && activeBook !== 'all') bSelect.value = activeBook;
    const pBtn = document.getElementById('pyqFilterBtn');
    if (pBtn && pyqOnly) pBtn.classList.add('active');

    await fetchQuestionBanks();
    renderCategoryChips();
    renderContent();
  }

  return {
    init,
    setSection,
    setCategory,
    onSearchChange,
    onBookChange,
    togglePyqFilter,
    clearFilters,
    goToPage,
    submitAnswer,
    toggleFramework,
    setExamMode,
    startExam,
    onExamSelect,
    submitExam,
    reviewExam,
    resetQuiz
  };
})();
