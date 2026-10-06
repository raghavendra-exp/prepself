/* Interactive Mock Test & Practice Simulator
   BankExamV2 — 5-Option Format Banking & Aptitude Simulator */

const BankQuiz = (() => {
  const QUESTIONS = [
  {
    "id": "q1",
    "subject": "quant",
    "subjectLabel": "Quantitative Aptitude",
    "topic": "Quadratic Equations",
    "exam": "SBI PO / IBPS PO Prelims",
    "question": "In the following question, two equations numbered I and II are given. You have to solve both the equations and mark the correct relation between x and y:\n\nI. x\u00b2 - 13x + 40 = 0\nII. y\u00b2 - 17y + 72 = 0",
    "options": [
      "x > y",
      "x < y",
      "x \u2265 y",
      "x \u2264 y",
      "x = y or relationship cannot be established"
    ],
    "correctIndex": 3,
    "explanation": "Equation I: x\u00b2 - 13x + 40 = 0 \u2192 Factorize: (x - 5)(x - 8) = 0 \u2192 Roots: x = 5, 8.\nEquation II: y\u00b2 - 17y + 72 = 0 \u2192 Factorize: (y - 8)(y - 9) = 0 \u2192 Roots: y = 8, 9.\nComparing values:\nWhen x = 5, y = 8 (x < y) and y = 9 (x < y)\nWhen x = 8, y = 8 (x = y) and y = 9 (x < y)\nTherefore, x \u2264 y.",
    "shortcut": "Signs are (- , +) in both equations, so both pairs of roots are positive (+, +). Split 40 into (5, 8) and 72 into (8, 9). 5 and 8 are both \u2264 8 and 9, giving x \u2264 y."
  },
  {
    "id": "q2",
    "subject": "quant",
    "subjectLabel": "Quantitative Aptitude",
    "topic": "Missing Number Series",
    "exam": "IBPS Clerk / SBI Clerk",
    "question": "Find the missing number in the following series:\n14, 21, 35, 56, 84, 119, ?",
    "options": [
      "158",
      "161",
      "168",
      "175",
      "182"
    ],
    "correctIndex": 1,
    "explanation": "Look at the differences between successive numbers:\n21 - 14 = 7 (7 \u00d7 1)\n35 - 21 = 14 (7 \u00d7 2)\n56 - 35 = 21 (7 \u00d7 3)\n84 - 56 = 28 (7 \u00d7 4)\n119 - 84 = 35 (7 \u00d7 5)\nNext difference should be 7 \u00d7 6 = 42.\nNext number = 119 + 42 = 161.",
    "shortcut": "Common difference is increasing by multiples of 7: +7, +14, +21, +28, +35, +42."
  },
  {
    "id": "q3",
    "subject": "quant",
    "subjectLabel": "Quantitative Aptitude",
    "topic": "Compound Interest vs Simple Interest",
    "exam": "SBI PO / RRB PO",
    "question": "The difference between the compound interest (compounded annually) and the simple interest on a certain sum of money for 2 years at 12% per annum is \u20b9144. Find the principal sum.",
    "options": [
      "\u20b98,000",
      "\u20b99,500",
      "\u20b910,000",
      "\u20b912,000",
      "\u20b912,500"
    ],
    "correctIndex": 2,
    "explanation": "For 2 years, the standard formula for difference between CI and SI is:\nDifference = P \u00d7 (R / 100)\u00b2\n144 = P \u00d7 (12 / 100)\u00b2\n144 = P \u00d7 (144 / 10000)\nP = (144 \u00d7 10000) / 144 = \u20b910,000.",
    "shortcut": "Notice 12\u00b2 = 144. Since difference is 144, P = 144 \u00d7 10,000 / 144 = 10,000 in under 5 seconds!"
  },
  {
    "id": "q4",
    "subject": "quant",
    "subjectLabel": "Quantitative Aptitude",
    "topic": "Time and Work",
    "exam": "IBPS PO / SBI Clerk Mains",
    "question": "A can complete a piece of work in 24 days. B is 20% more efficient than A, and C is 25% more efficient than B. In how many days will B and C together complete the entire work?",
    "options": [
      "8 days",
      "8(8/9) days",
      "9(3/5) days",
      "10 days",
      "11(1/3) days"
    ],
    "correctIndex": 1,
    "explanation": "Let total work = 120 units (LCM of 24 and other factors).\nA's 1-day efficiency = 120 / 24 = 5 units/day.\nB's efficiency = 120% of 5 = 6 units/day.\nC's efficiency = 125% of 6 = 7.5 units/day.\nCombined efficiency of (B + C) = 6 + 7.5 = 13.5 units/day = 27/2 units/day.\nTime taken by (B + C) = 120 / (27/2) = 240 / 27 = 80 / 9 = 8(8/9) days.",
    "shortcut": "Use unit efficiency assumption: A = 5 units/day, B = 6 units/day, C = 7.5 units/day. Total = 120 / 13.5 = 80/9 days."
  },
  {
    "id": "q5",
    "subject": "quant",
    "subjectLabel": "Quantitative Aptitude",
    "topic": "Simplification & Approximation",
    "exam": "IBPS Clerk Prelims",
    "question": "What will come in place of the question mark (?) in the following expression?\n\u221a(441) \u00d7 15 + 45% of 640 - ? = 320",
    "options": [
      "263",
      "273",
      "283",
      "293",
      "303"
    ],
    "correctIndex": 2,
    "explanation": "Step 1: \u221a(441) = 21.\nStep 2: 21 \u00d7 15 = 315.\nStep 3: 45% of 640 = (50% of 640) - (5% of 640) = 320 - 32 = 288.\nStep 4: 315 + 288 = 603.\nStep 5: 603 - ? = 320 \u2192 ? = 603 - 320 = 283.",
    "shortcut": "Calculate 45% as 50% - 5%: 320 - 32 = 288. Then 315 + 288 - 320 = 315 - 32 = 283."
  },
  {
    "id": "q6",
    "subject": "reasoning",
    "subjectLabel": "Reasoning Ability",
    "topic": "Syllogisms (Only a Few)",
    "exam": "SBI PO / IBPS PO Prelims",
    "question": "Statements:\n1. Only a few Laptops are Mobiles.\n2. All Mobiles are Tablets.\n3. No Tablet is a Desktop.\n\nConclusions:\nI. Some Laptops are not Desktops.\nII. All Laptops can never be Mobiles.\n\nWhich of the conclusion(s) logically follows?",
    "options": [
      "Only conclusion I follows",
      "Only conclusion II follows",
      "Either conclusion I or II follows",
      "Neither conclusion I nor II follows",
      "Both conclusions I and II follow"
    ],
    "correctIndex": 4,
    "explanation": "Conclusion I follows: The part of Laptops that are Mobiles is entirely inside Tablets. Since No Tablet is Desktop, that overlapping part of Laptop can never be Desktop. Hence, Some Laptops are definitely not Desktops.\nConclusion II follows: The statement 'Only a few Laptops are Mobiles' explicitly means both 'Some Laptops are Mobiles' AND 'Some Laptops are NOT Mobiles'. Therefore, All Laptops can never be Mobiles is a 100% definite truth.",
    "shortcut": "'Only a few A are B' directly implies that 'All A can never be B' is always TRUE."
  },
  {
    "id": "q7",
    "subject": "reasoning",
    "subjectLabel": "Reasoning Ability",
    "topic": "Coded Inequalities",
    "exam": "IBPS PO / RRB Assistant",
    "question": "Statements: M \u2265 K > P = Q \u2264 R < T\nConclusions:\nI. M > Q\nII. T > P\n\nWhich of the conclusion(s) is/are true?",
    "options": [
      "Only conclusion I is true",
      "Only conclusion II is true",
      "Either conclusion I or II is true",
      "Neither conclusion I nor II is true",
      "Both conclusions I and II are true"
    ],
    "correctIndex": 4,
    "explanation": "Conclusion I: From M \u2265 K > P = Q, moving from M to Q gives M \u2265 K > Q, which guarantees M > Q. Hence, Conclusion I is true.\nConclusion II: From P = Q \u2264 R < T, moving from P to T gives P \u2264 R < T, which guarantees P < T, or T > P. Hence, Conclusion II is true.",
    "shortcut": "Check open/closed gates: M to Q has open gate with at least one strict '>' symbol (M > Q is True). T to P has open gate from T to P (T > P is True)."
  },
  {
    "id": "q8",
    "subject": "reasoning",
    "subjectLabel": "Reasoning Ability",
    "topic": "Direction Sense",
    "exam": "SBI Clerk / IBPS Clerk",
    "question": "A person starts walking from Point A towards the North. After walking 12 meters, he turns right and walks 8 meters. Then, he turns right again and walks 6 meters to reach Point B. In which direction and at what distance is Point B with respect to Point A?",
    "options": [
      "10 meters, North-East",
      "10 meters, North-West",
      "14 meters, North-East",
      "12 meters, South-East",
      "8 meters, East"
    ],
    "correctIndex": 0,
    "explanation": "North movement: +12m.\nTurn right (East): +8m.\nTurn right (South): -6m.\nNet North-South position = 12 - 6 = +6m (North).\nNet East-West position = +8m (East).\nDistance = \u221a(6\u00b2 + 8\u00b2) = \u221a(36 + 64) = \u221a100 = 10 meters.\nDirection with respect to A = North-East.",
    "shortcut": "Pythagorean triplet (6, 8, 10): Base = 8, Height = 6, Hypotenuse = 10 meters North-East."
  },
  {
    "id": "q9",
    "subject": "reasoning",
    "subjectLabel": "Reasoning Ability",
    "topic": "Blood Relations",
    "exam": "IBPS PO / RRB Scale I",
    "question": "Pointing to a photograph of a woman, Rajesh said, 'Her mother's only son's wife is my sister.' How is the woman related to Rajesh's brother?",
    "options": [
      "Mother",
      "Sister",
      "Paternal Aunt",
      "Sister-in-law",
      "Cannot be determined"
    ],
    "correctIndex": 2,
    "explanation": "Let's decode from backwards:\n'My sister' = Rajesh's sister.\n'Her mother's only son's wife' = Rajesh's sister.\nThis means the woman's brother's wife is Rajesh's sister.\nSo, the woman's brother is Rajesh's brother-in-law.\nSince the woman is the sister of that brother, the woman is the paternal aunt / sister of the husband.",
    "shortcut": "Her mother's only son = her brother. Her brother's wife = my sister. So her brother is Rajesh's sister's husband. The woman is the paternal aunt (Bua) of Rajesh's children, or sister to the brother."
  },
  {
    "id": "q10",
    "subject": "english",
    "subjectLabel": "English Language",
    "topic": "Error Detection",
    "exam": "SBI PO / IBPS PO",
    "question": "Identify the part of the sentence which contains a grammatical error:\n\n'Neither the managing director (A) / nor the branch managers (B) / was aware of the fraudulent transactions (C) / detected during the internal audit. (D) / No Error (E)'",
    "options": [
      "A",
      "B",
      "C",
      "D",
      "E (No Error)"
    ],
    "correctIndex": 2,
    "explanation": "In Part (C), replace 'was aware' with 'were aware'.\nGrammar Rule: When two subjects are joined by 'Neither... nor' or 'Either... or', the verb must agree in number with the closer subject (Subject of Proximity). Here, the closer subject is 'the branch managers' (plural), so the plural verb 'were' must be used.",
    "shortcut": "Rule of proximity: 'Neither [Singular] nor [Plural]' takes a PLURAL verb."
  },
  {
    "id": "q11",
    "subject": "english",
    "subjectLabel": "English Language",
    "topic": "Sentence Improvement",
    "exam": "IBPS Clerk / SBI Clerk",
    "question": "Select the phrase that best improves the underlined portion in the sentence:\n\n'The Monetary Policy Committee has decided to *maintain status quo on* benchmark lending rates.'",
    "options": [
      "maintain a status quo on",
      "maintain status quo of",
      "maintain the status quo on",
      "maintaining status quo in",
      "No correction required"
    ],
    "correctIndex": 2,
    "explanation": "'Status quo' is a Latin phrase meaning the existing state of affairs. In standard idiomatic English, it requires the definite article 'the' preceding it: 'maintain the status quo on/regarding...'.",
    "shortcut": "'Status quo' is always preceded by 'the'."
  },
  {
    "id": "q12",
    "subject": "english",
    "subjectLabel": "English Language",
    "topic": "Banking Vocabulary & Word Usage",
    "exam": "RBI Assistant / SBI PO",
    "question": "Choose the word most SIMILAR in meaning to 'LIQUIDITY' in the context of commercial banking:",
    "options": [
      "Solvency",
      "Cash Availability",
      "Profitability",
      "Depreciation",
      "Leverage"
    ],
    "correctIndex": 1,
    "explanation": "In banking and finance, 'Liquidity' specifically refers to the degree to which an asset can be quickly converted into ready cash without affecting its market value, or the availability of liquid cash to meet short-term financial obligations.",
    "shortcut": "Liquidity in banking = ability to honor immediate cash commitments / ready cash availability."
  },
  {
    "id": "q13",
    "subject": "banking",
    "subjectLabel": "Banking & Financial Awareness",
    "topic": "Monetary Policy & RBI Rates",
    "exam": "SBI PO / IBPS PO / RBI Grade B",
    "question": "Which tool was introduced by the Reserve Bank of India (RBI) in April 2022 to absorb excess liquidity from commercial banks without requiring collateral government securities?",
    "options": [
      "Marginal Standing Facility (MSF)",
      "Standing Deposit Facility (SDF)",
      "Cash Reserve Ratio (CRR)",
      "Open Market Operations (OMO)",
      "Market Stabilization Scheme (MSS)"
    ],
    "correctIndex": 1,
    "explanation": "The Standing Deposit Facility (SDF) was operationalized by the RBI in April 2022 under amended Section 17 of the RBI Act, 1934. Unlike the reverse repo mechanism which requires the RBI to pledge government securities as collateral, the SDF absorbs liquidity without any collateral backing, making it the lower bound (floor) of the Liquidity Adjustment Facility (LAF) corridor.",
    "shortcut": "SDF = Collateral-free liquidity absorption at the bottom of the LAF corridor."
  },
  {
    "id": "q14",
    "subject": "banking",
    "subjectLabel": "Banking & Financial Awareness",
    "topic": "Priority Sector Lending (PSL)",
    "exam": "IBPS PO / RRB Scale I",
    "question": "What is the mandatory Priority Sector Lending (PSL) target for Domestic Scheduled Commercial Banks and Foreign Banks with 20 or more branches in India?",
    "options": [
      "30% of ANBC",
      "35% of ANBC",
      "40% of ANBC",
      "45% of ANBC",
      "75% of ANBC"
    ],
    "correctIndex": 2,
    "explanation": "Domestic Scheduled Commercial Banks (excluding RRBs and Small Finance Banks) are mandated to allocate 40% of their Adjusted Net Bank Credit (ANBC) or Credit Equivalent Amount of Off-Balance Sheet Exposure (CEOBE), whichever is higher, towards Priority Sector Lending. Regional Rural Banks (RRBs) and Small Finance Banks (SFBs) have a higher target of 75%.",
    "shortcut": "Standard Commercial Banks = 40%; RRBs and SFBs = 75%."
  },
  {
    "id": "q15",
    "subject": "banking",
    "subjectLabel": "Banking & Financial Awareness",
    "topic": "Government Social Security Schemes",
    "exam": "SBI Clerk / IBPS Clerk",
    "question": "What is the annual premium and maximum life coverage under the Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)?",
    "options": [
      "Premium \u20b912, Coverage \u20b91,00,000",
      "Premium \u20b920, Coverage \u20b92,00,000",
      "Premium \u20b9330, Coverage \u20b92,00,000",
      "Premium \u20b9436, Coverage \u20b92,00,000",
      "Premium \u20b9500, Coverage \u20b95,00,000"
    ],
    "correctIndex": 3,
    "explanation": "Under PMJJBY (Pradhan Mantri Jeevan Jyoti Bima Yojana), the annual premium was revised to \u20b9436 (from \u20b9330) providing life insurance coverage of \u20b92,00,000 in case of death due to any reason for individuals aged 18 to 50 years. Meanwhile, PMSBY (Suraksha Bima Yojana) has a premium of \u20b920/year for accidental insurance.",
    "shortcut": "PMJJBY = \u20b9436 for \u20b92 lakh life cover; PMSBY = \u20b920 for \u20b92 lakh accidental cover."
  },
  {
    "id": "q16",
    "subject": "banking",
    "subjectLabel": "Banking & Financial Awareness",
    "topic": "Payment Systems & NPCI",
    "exam": "RBI Assistant / IBPS PO",
    "question": "Which of the following statements regarding the Unified Payments Interface (UPI) developed by NPCI is INCORRECT?",
    "options": [
      "It enables round-the-clock (24\u00d77\u00d7365) real-time interbank mobile fund transfers.",
      "It eliminates the need to enter bank account numbers or IFSC codes by utilizing a Virtual Payment Address (VPA).",
      "UPI Lite allows offline low-value transactions up to \u20b9500 without requiring an internet connection or UPI PIN.",
      "The maximum transaction limit for general peer-to-peer UPI transfers is \u20b910,00,000 per transaction.",
      "Credit cards on the RuPay network can be linked directly to UPI accounts."
    ],
    "correctIndex": 3,
    "explanation": "Statement (D) is incorrect: The standard transaction limit for general P2P / P2M UPI transactions is \u20b91,00,000 per transaction (raised to \u20b92,00,000 for capital markets/collections and \u20b95,00,000 for hospital, educational, and tax payments), NOT \u20b910,00,000.",
    "shortcut": "Standard UPI limit is \u20b91,00,000 per day/transaction; never \u20b910 lakh!"
  }
];

  let activeSubject = 'all';
  let userAnswers = {};
  let stats = { attempted: 0, correct: 0 };
  let timerInterval = null;
  let remainingSeconds = 20 * 60; // 20 minutes default
  let timerRunning = false;

  const SUBJECTS = [
    { id: 'all', label: 'All Subjects', icon: '🎯' },
    { id: 'quant', label: 'Quantitative Aptitude', icon: '🔢' },
    { id: 'reasoning', label: 'Reasoning Ability', icon: '🧩' },
    { id: 'english', label: 'English Language', icon: '📖' },
    { id: 'banking', label: 'Banking Awareness', icon: '🏦' }
  ];

  function getQuestions() {
    return QUESTIONS;
  }

  function getFilteredQuestions() {
    if (activeSubject === 'all') return QUESTIONS;
    return QUESTIONS.filter(q => q.subject === activeSubject);
  }

  function setSubject(subjId) {
    activeSubject = subjId;
    render();
  }

  function submitAnswer(questionId, selectedIdx) {
    if (userAnswers[questionId] !== undefined) return;

    userAnswers[questionId] = selectedIdx;
    const q = QUESTIONS.find(item => item.id === questionId);
    if (!q) return;

    stats.attempted++;
    if (selectedIdx === q.correctIndex) {
      stats.correct++;
    }

    renderScoreboard();
    renderQuestionCard(questionId);
  }

  function resetQuiz() {
    userAnswers = {};
    stats = { attempted: 0, correct: 0 };
    resetTimer();
    render();
  }

  /* Timer functions */
  function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    updateTimerBtn();
    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateTimerDisplay();
      } else {
        pauseTimer();
        alert('Time is up! Review your mock test score below.');
      }
    }, 1000);
  }

  function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    updateTimerBtn();
  }

  function resetTimer() {
    pauseTimer();
    remainingSeconds = 20 * 60;
    updateTimerDisplay();
  }

  function toggleTimer() {
    if (timerRunning) pauseTimer();
    else startTimer();
  }

  function updateTimerDisplay() {
    const el = document.getElementById('quizTimerDisplay');
    if (!el) return;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerBtn() {
    const btn = document.getElementById('quizTimerBtn');
    if (btn) btn.textContent = timerRunning ? '⏸ Pause' : '▶ Start Timer';
  }

  function renderScoreboard() {
    const attEl = document.getElementById('statQuizAttempted');
    const corrEl = document.getElementById('statQuizCorrect');
    const accEl = document.getElementById('statQuizAccuracy');
    if (!attEl || !corrEl || !accEl) return;

    attEl.textContent = stats.attempted;
    corrEl.textContent = stats.correct;
    const acc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
    accEl.textContent = `${acc}%`;
  }

  function renderSubjectChips() {
    const bar = document.getElementById('quizSubjectFilter');
    if (!bar) return;
    bar.innerHTML = SUBJECTS.map(s => `
      <button class="filter-chip ${activeSubject === s.id ? 'active' : ''}" onclick="BankQuiz.setSubject('${s.id}')">
        <span>${s.icon}</span> ${s.label}
      </button>
    `).join('');
  }

  function renderQuestionCard(questionId) {
    const cardEl = document.getElementById(`quiz-${questionId}`);
    if (!cardEl) return;

    const q = QUESTIONS.find(item => item.id === questionId);
    if (!q) return;

    const answered = userAnswers[questionId] !== undefined;
    const selectedIdx = userAnswers[questionId];
    const isCorrect = selectedIdx === q.correctIndex;

    cardEl.className = `practice-q-card tablet reveal in ${answered ? (isCorrect ? 'q-correct' : 'q-incorrect') : ''}`;

    const optionsHtml = q.options.map((opt, idx) => {
      let optClass = 'opt-btn';
      if (answered) {
        if (idx === q.correctIndex) optClass += ' opt-correct';
        else if (idx === selectedIdx) optClass += ' opt-wrong';
        else optClass += ' opt-disabled';
      }
      return `
        <button class="${optClass}" ${answered ? 'disabled' : ''} onclick="BankQuiz.submitAnswer('${q.id}', ${idx})">
          <span class="opt-label">${String.fromCharCode(65 + idx)}</span>
          <span class="opt-text">${opt}</span>
        </button>`;
    }).join('');

    const explanationHtml = answered ? `
      <div class="q-explanation reveal in">
        <div class="exp-header">
          <span class="exp-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}">
            ${isCorrect ? '✓ Correct Answer' : '✗ Incorrect Attempt'}
          </span>
          <span class="exp-correct-tag">Correct Option: <b>(${String.fromCharCode(65 + q.correctIndex)})</b></span>
        </div>
        <p class="exp-text" style="white-space:pre-line;">${q.explanation}</p>
        ${q.shortcut ? `
          <div class="shortcut-box" style="margin-top:10px; background:rgba(245,158,11,0.1); border-left:3px solid #F59E0B; padding:10px 14px; border-radius:4px;">
            <b style="color:#D97706; font-size:12px; display:block; margin-bottom:2px;">⚡ Exam Shortcut &amp; Mental Trick:</b>
            <span style="font-size:13px; color:var(--txt2);">${q.shortcut}</span>
          </div>` : ''}
      </div>` : '';

    cardEl.innerHTML = `
      <div class="q-head">
        <div class="q-meta">
          <span class="badge badge-site badge-${q.subject}">${q.subjectLabel}</span>
          <span class="q-year">${q.exam}</span>
        </div>
        <span class="q-id">#${q.id.toUpperCase()} &bull; ${q.topic}</span>
      </div>
      <div class="q-body">
        <p class="q-prompt" style="white-space:pre-line;">${q.question}</p>
        <div class="q-options">${optionsHtml}</div>
        ${explanationHtml}
      </div>`;
  }

  function render() {
    renderSubjectChips();
    renderScoreboard();
    updateTimerDisplay();

    const container = document.getElementById('quizQuestionsContainer');
    if (!container) return;

    const filtered = getFilteredQuestions();
    if (!filtered.length) {
      container.innerHTML = '<p class="loading-note">No questions found in this category.</p>';
      return;
    }

    container.innerHTML = `
      <div class="q-list">
        ${filtered.map(q => `<div id="quiz-${q.id}"></div>`).join('')}
      </div>`;

    filtered.forEach(q => renderQuestionCard(q.id));
  }

  function init() {
    render();
  }

  return { init, setSubject, submitAnswer, resetQuiz, toggleTimer, resetTimer, getQuestions };
})();
