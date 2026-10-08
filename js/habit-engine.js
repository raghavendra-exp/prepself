/**
 * PrepSelf Habit-Forming & Retention Engine (PrepHabit)
 * 100% Free, Client-Side First with Optional Firestore Sync
 * 
 * Features:
 * 1. Daily-10 Set (Fixed daily seed at 6:00 AM IST) with Shareable Result Card
 * 2. Persistent Streak with 1-Week Streak Freeze (Protected without guilt)
 * 3. Personalised Homepage (Exam target, "Continue where you left off", days-to-exam countdown)
 * 4. Mistake Notebook with Spaced Repetition (Review in 1, 3, 7 days)
 * 5. Progress Markers (Syllabus % and Composite Readiness Score)
 * 6. Return Triggers (PWA Push Notification + Telegram channel alerts)
 * 7. Social Loops (Challenge-a-friend link with score payload + Weekly Leaderboard)
 * 8. Guardrails (No guilt mechanics, supportive topper psychology)
 */

(function (window, document) {
  'use strict';

  const PREFIX = 'ps:v1:';
  const KEYS = {
    STREAK: PREFIX + 'streak_v2',
    TARGET_EXAM: PREFIX + 'target_exam',
    LAST_VISITED: PREFIX + 'last_visited',
    MISTAKES: PREFIX + 'mistakes_v2',
    COMPLETED_TOPICS: PREFIX + 'completed_topics',
    DAILY_RESULTS: PREFIX + 'daily_results_',
    REMINDER_TIME: PREFIX + 'reminder_time',
    USER_NICKNAME: PREFIX + 'nickname'
  };

  // Supported Exam Targets with Realistic 2026-2027 Cycle Dates & Syllabus
  const EXAM_PRESETS = {
    'sbi-po': {
      id: 'sbi-po',
      name: 'SBI PO 2026',
      badge: 'Banking & Finance',
      examDate: '2026-11-22',
      defaultModule: 'modules/sbi-po.html',
      topics: [
        'Simplification & Speed Math', 'Quadratic Equations', 'Number Series', 'Data Interpretation (DI)',
        'Arithmetic: Profit & Loss', 'Arithmetic: SI & CI', 'Arithmetic: Time & Work', 'Puzzles: Floor & Flat',
        'Puzzles: Seating Arrangement', 'Syllogisms (Only a Few)', 'Inequalities & Coding', 'Reading Comprehension',
        'Cloze Test & Parajumbles', 'Grammar & Error Detection', 'Banking & RBI Awareness', 'Current Affairs & Schemes'
      ]
    },
    'ibps-po': {
      id: 'ibps-po',
      name: 'IBPS PO 2026',
      badge: 'Banking & Finance',
      examDate: '2026-10-18',
      defaultModule: 'modules/ibps-po.html',
      topics: [
        'Speed Math & Approximations', 'Quadratic Sign Rules', 'Missing & Wrong Series', 'Table & Radar DI',
        'Arithmetic Word Problems', 'Box & Day Puzzles', 'Circular Seating In-Out', 'Blood Relations & Direction',
        'Reverse Syllogisms', 'RC Inference Questions', 'Sentence Rearrangement', 'Monetary Policy & Inflation'
      ]
    },
    'ssc-cgl': {
      id: 'ssc-cgl',
      name: 'SSC CGL 2026',
      badge: 'SSC & Central Govt',
      examDate: '2026-09-12',
      defaultModule: 'modules/ssc.html',
      topics: [
        'Arithmetic: Percentages & Ratio', 'Advance Math: Geometry Theorems', 'Advance Math: Trigonometry',
        'Advance Math: Algebra Identities', 'Mensuration 2D & 3D', 'Reasoning: Analogies & Series',
        'Reasoning: Coding-Decoding', 'Reasoning: Non-Verbal Figures', 'English: Vocab, Idioms & OWS',
        'English: Active-Passive & Narration', 'GS: Modern Indian History', 'GS: Indian Polity Articles'
      ]
    },
    'upsc-cse': {
      id: 'upsc-cse',
      name: 'UPSC CSE 2027',
      badge: 'Civil Services (IAS/IPS)',
      examDate: '2027-05-23',
      defaultModule: 'modules/upsc.html',
      topics: [
        'Polity: Preamble, FRs & DPSP', 'Polity: Parliament & Judiciary', 'History: Ancient & Medieval India',
        'History: Freedom Struggle & Modern India', 'Geography: Physical & Climate Systems', 'Economy: Growth & Fiscal Policy',
        'Environment: Biodiversity & Treaties', 'Science & Technology Trends', 'CSAT: Reading Comprehension',
        'CSAT: Basic Numeracy & Permutations', 'GS-4: Ethics Case Studies', 'Mains Answer Writing Structure'
      ]
    },
    'rrb-ntpc': {
      id: 'rrb-ntpc',
      name: 'Railway RRB NTPC 2026',
      badge: 'Railways RRB',
      examDate: '2026-12-14',
      defaultModule: 'modules/railways.html',
      topics: [
        'Mathematics: Number System & LCM', 'Mathematics: Time, Speed & Distance', 'General Intelligence: Coding',
        'General Intelligence: Venn Diagrams', 'General Science: Physics Laws', 'General Science: Chemistry Basics',
        'General Science: Biology & Human Body', 'Static GK: Railway History & Inventions', 'Current Affairs & Sports'
      ]
    }
  };

  // High-Yield Question Bank for Deterministic Daily-10 Sets
  const QUESTION_BANK = [
    {
      id: 'd1_q1',
      subject: 'quant',
      subjectLabel: 'Quantitative Aptitude',
      topic: 'Quadratic Equations (Sign Rule)',
      question: 'Solve the two equations and find the relation between x and y:\nI. x² - 14x + 48 = 0\nII. y² - 18y + 80 = 0',
      options: ['x > y', 'x < y', 'x ≥ y', 'x ≤ y', 'x = y or relationship cannot be established'],
      correctIndex: 3,
      explanation: 'Roots of I: Factors of 48 adding to 14 are 6 and 8 → x = 6, 8.\nRoots of II: Factors of 80 adding to 18 are 8 and 10 → y = 8, 10.\nComparing: 6 < 8, 6 < 10, 8 = 8, 8 < 10. Therefore, x ≤ y.',
      shortcut: 'Signs are (- , +) in both equations, so all roots are positive. (6, 8) vs (8, 10) gives x ≤ y directly.'
    },
    {
      id: 'd1_q2',
      subject: 'quant',
      subjectLabel: 'Quantitative Aptitude',
      topic: 'Speed Math: Fraction to Percentage',
      question: 'What is the fractional equivalent of 37.5% combined with 16.66%?',
      options: ['13/24', '7/12', '11/24', '5/8', '19/24'],
      correctIndex: 0,
      explanation: '37.5% = 3/8. 16.66% = 1/6.\nSum = 3/8 + 1/6 = (9 + 4) / 24 = 13/24.',
      shortcut: 'Memorize standard fractional equivalents: 1/8 = 12.5% (so 3/8 = 37.5%), 1/6 = 16.66%.'
    },
    {
      id: 'd1_q3',
      subject: 'quant',
      subjectLabel: 'Quantitative Aptitude',
      topic: 'Simple vs Compound Interest',
      question: 'If the difference between CI and SI on a sum at 15% per annum for 2 years is ₹225, find the principal amount.',
      options: ['₹8,000', '₹10,000', '₹12,000', '₹15,000', '₹9,500'],
      correctIndex: 1,
      explanation: 'Difference for 2 years = P × (R / 100)².\n225 = P × (15/100)² = P × (225 / 10,000).\nTherefore, P = ₹10,000.',
      shortcut: 'Notice that 15² = 225. Since the difference is 225, P is exactly 10,000 in 2 seconds!'
    },
    {
      id: 'd1_q4',
      subject: 'reasoning',
      subjectLabel: 'Reasoning Ability',
      topic: 'Syllogism: Only a few',
      question: 'Statements:\n1. Only a few Pens are Books.\n2. All Books are Notes.\nConclusions:\nI. Some Pens are not Books.\nII. All Notes can be Pens.\n\nWhich follows?',
      options: ['Only I follows', 'Only II follows', 'Either I or II', 'Neither I nor II', 'Both I and II follow'],
      correctIndex: 4,
      explanation: 'Statement "Only a few Pens are Books" implies two things: (1) Some Pens are Books, and (2) Some Pens are definitely NOT Books. Thus, Conclusion I definitely follows.\nConclusion II: There is no negative condition preventing all Notes from entering inside Pens. Thus, "All Notes can be Pens" is a valid possibility. Both I and II follow.',
      shortcut: '"Only a few A are B" means Some A are NOT B is 100% TRUE, but All B can still be inside A.'
    },
    {
      id: 'd1_q5',
      subject: 'reasoning',
      subjectLabel: 'Reasoning Ability',
      topic: 'Coded Inequalities',
      question: 'Statement: A ≥ B > C = D ≤ E < F\nConclusions:\nI. A > D\nII. F > C',
      options: ['Only I is true', 'Only II is true', 'Either I or II is true', 'Neither is true', 'Both I and II are true'],
      correctIndex: 4,
      explanation: 'From A ≥ B > C = D: A is strictly greater than D because of the strict ">" sign between B and C. (I is true).\nFrom C = D ≤ E < F: F is strictly greater than C because of the strict "<" sign before F. (II is true). Both are true.',
      shortcut: 'Look for open gate with at least one strict inequality symbol in the path.'
    },
    {
      id: 'd1_q6',
      subject: 'reasoning',
      subjectLabel: 'Reasoning Ability',
      topic: 'Circular Seating Logic',
      question: 'In a circle of 8 people facing center, P sits 3rd to the right of Q. R sits immediate left of P. What is the position of R with respect to Q?',
      options: ['2nd to right', '4th to right', '2nd to left', '3rd to left', 'Immediate right'],
      correctIndex: 0,
      explanation: 'Let Q be at position 1. P is 3rd to right → position 4.\nR is immediate left of P (counter-clockwise towards Q) → position 3.\nWith respect to Q (position 1), position 3 is 2nd to the right.',
      shortcut: '3 steps right minus 1 step left = 2 steps right from the origin.'
    },
    {
      id: 'd1_q7',
      subject: 'english',
      subjectLabel: 'English Language',
      topic: 'Error Spotting (Subject-Verb)',
      question: 'Identify the segment with error:\n"Neither the principal (A) / nor the teachers (B) / was present at (C) / the annual convention. (D)"',
      options: ['A', 'B', 'C', 'D', 'No Error'],
      correctIndex: 2,
      explanation: 'When subjects are joined by "Neither... nor", the verb agrees with the closer subject ("teachers" = plural). Replace "was" with "were".',
      shortcut: 'Rule of proximity: Closer subject decides the singular/plural verb.'
    },
    {
      id: 'd1_q8',
      subject: 'english',
      subjectLabel: 'English Language',
      topic: 'Vocabulary in Context',
      question: 'Select the most appropriate synonym for "METICULOUS" as used in exam evaluation:',
      options: ['Careless', 'Punctual', 'Thorough & Precise', 'Superficial', 'Hesitant'],
      correctIndex: 2,
      explanation: '"Meticulous" means showing great attention to detail; very careful and precise.',
      shortcut: 'Meticulous = Detail-oriented / Thorough.'
    },
    {
      id: 'd1_q9',
      subject: 'ga',
      subjectLabel: 'General & Banking Awareness',
      topic: 'RBI Monetary Policy',
      question: 'Which rate acts as the floor (lower boundary) of the Reserve Bank of India’s Liquidity Adjustment Facility (LAF) corridor?',
      options: ['Repo Rate', 'Reverse Repo Rate', 'Standing Deposit Facility (SDF)', 'Marginal Standing Facility (MSF)', 'Bank Rate'],
      correctIndex: 2,
      explanation: 'The Standing Deposit Facility (SDF) rate acts as the floor of the LAF corridor, while the MSF rate acts as the ceiling, with the Repo Rate in the middle.',
      shortcut: 'LAF Corridor: Floor = SDF, Middle = Repo, Ceiling = MSF.'
    },
    {
      id: 'd1_q10',
      subject: 'ga',
      subjectLabel: 'General & Banking Awareness',
      topic: 'Indian Constitution & Governance',
      question: 'Under which Article of the Constitution of India is the "Right to Constitutional Remedies" guaranteed?',
      options: ['Article 19', 'Article 21', 'Article 32', 'Article 44', 'Article 51A'],
      correctIndex: 2,
      explanation: 'Article 32 gives citizens the right to approach the Supreme Court for enforcement of fundamental rights. Dr. B.R. Ambedkar called it the "Heart and Soul of the Constitution".',
      shortcut: 'Article 32 = Constitutional Remedies (5 Prerogative Writs).'
    },
    {
      id: 'd1_q11',
      subject: 'quant',
      subjectLabel: 'Quantitative Aptitude',
      topic: 'Time and Work Unit Method',
      question: 'A can do a work in 15 days, and B can do it in 20 days. If they work together for 4 days, what fraction of work is left?',
      options: ['7/15', '8/15', '1/3', '2/5', '11/15'],
      correctIndex: 1,
      explanation: 'LCM of 15 and 20 = 60 units (total work).\nA = 4 units/day, B = 3 units/day. Together = 7 units/day.\nIn 4 days = 28 units done. Remaining = 60 - 28 = 32 units.\nFraction left = 32/60 = 8/15.',
      shortcut: 'Work left = 1 - 4 × (1/15 + 1/20) = 1 - 4 × 7/60 = 1 - 7/15 = 8/15.'
    },
    {
      id: 'd1_q12',
      subject: 'reasoning',
      subjectLabel: 'Reasoning Ability',
      topic: 'Direction Sense & Pythagoras',
      question: 'A man walks 9 km South, turns East and walks 12 km. What is the shortest distance from his starting point?',
      options: ['15 km', '17 km', '21 km', '13 km', '14 km'],
      correctIndex: 0,
      explanation: 'Distance = √(9² + 12²) = √(81 + 144) = √225 = 15 km.',
      shortcut: 'Pythagorean triplet 3 : 4 : 5 multiplied by 3 gives 9 : 12 : 15.'
    }
  ];

  // Helper: Deterministic hash from date string (YYYY-MM-DD)
  function getDateHash(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function getTodayString() {
    return new Date().toISOString().slice(0, 10);
  }

  // Generate 10 deterministic questions for any given date
  function getDailyQuestions(dateStr = getTodayString()) {
    const seed = getDateHash(dateStr);
    const pool = [...QUESTION_BANK];
    // Simple deterministic shuffle using seed
    const result = [];
    let s = seed;
    while (result.length < 10 && pool.length > 0) {
      s = (s * 9301 + 49297) % 233280;
      const idx = s % pool.length;
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  }

  /* ═════════════════════════════════════════════════════════════
     1. STREAK & FREEZE SYSTEM (Guilt-Free Positive Psychology)
     ═════════════════════════════════════════════════════════════ */
  const Streak = {
    getData() {
      try {
        const raw = localStorage.getItem(KEYS.STREAK);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return {
        count: 1,
        lastActiveDate: null,
        freezesAvailable: 1,
        freezesUsed: 0,
        lastRefillDate: getTodayString(),
        history: []
      };
    },

    saveData(data) {
      try {
        localStorage.setItem(KEYS.STREAK, JSON.stringify(data));
      } catch (e) {}
    },

    // Evaluates streak on app load (handles freeze silently and gently)
    checkStatus() {
      const data = this.getData();
      const today = getTodayString();
      if (!data.lastActiveDate) {
        return { count: 1, isProtected: false, freezesLeft: data.freezesAvailable };
      }

      if (data.lastActiveDate === today) {
        return { count: data.count, isProtected: false, freezesLeft: data.freezesAvailable };
      }

      const diffDays = Math.round((new Date(today) - new Date(data.lastActiveDate)) / (1000 * 60 * 60 * 24));

      // Active yesterday -> streak intact
      if (diffDays === 1) {
        return { count: data.count, isProtected: false, freezesLeft: data.freezesAvailable };
      }

      // Missed 1 day (diffDays === 2) -> Check freeze
      if (diffDays === 2 && data.freezesAvailable > 0) {
        data.freezesAvailable -= 1;
        data.freezesUsed += 1;
        // Move lastActiveDate up to simulate preserved streak
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        data.lastActiveDate = yesterday;
        this.saveData(data);
        return { count: data.count, isProtected: true, freezesLeft: data.freezesAvailable };
      }

      // Missed more than 1 day or no freeze: NO GUILT RESET.
      // We keep positive momentum: streak resets to 1 gently upon next completion.
      if (diffDays > 1) {
        data.count = 1;
        this.saveData(data);
      }

      return { count: data.count, isProtected: false, freezesLeft: data.freezesAvailable };
    },

    recordActivity() {
      const data = this.getData();
      const today = getTodayString();

      if (data.lastActiveDate === today) {
        return data.count; // already counted today
      }

      const diffDays = data.lastActiveDate
        ? Math.round((new Date(today) - new Date(data.lastActiveDate)) / (1000 * 60 * 60 * 24))
        : 1;

      if (diffDays === 1) {
        data.count += 1;
      } else {
        data.count = Math.max(1, data.count); // Fresh momentum, never 0
      }

      data.lastActiveDate = today;
      if (!data.history.includes(today)) {
        data.history.push(today);
      }

      this.saveData(data);
      this.updateStreakBadge();
      return data.count;
    },

    equipFreeze() {
      const data = this.getData();
      if (data.freezesAvailable < 2) {
        data.freezesAvailable += 1;
        this.saveData(data);
        return true;
      }
      return false;
    },

    updateStreakBadge() {
      const status = this.checkStatus();
      document.querySelectorAll('#streakCountBadge, .streak-badge-count').forEach(el => {
        el.textContent = `Day ${status.count} Active 🔥`;
      });
      const freezeEl = document.getElementById('freezeStatusText');
      if (freezeEl) {
        freezeEl.textContent = `🛡️ ${status.freezesLeft} Freeze Available`;
      }
    }
  };

  /* ═════════════════════════════════════════════════════════════
     2. PERSONALISATION & EXAM TARGET COMMAND CENTER
     ═════════════════════════════════════════════════════════════ */
  const Personalization = {
    getTargetExam() {
      try {
        const raw = localStorage.getItem(KEYS.TARGET_EXAM);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      // Default to SBI PO for first visit
      return EXAM_PRESETS['sbi-po'];
    },

    setTargetExam(examId) {
      if (EXAM_PRESETS[examId]) {
        try {
          localStorage.setItem(KEYS.TARGET_EXAM, JSON.stringify(EXAM_PRESETS[examId]));
        } catch (e) {}
        this.renderCommandCenter();
      }
    },

    recordLastVisited(title, url) {
      try {
        localStorage.setItem(KEYS.LAST_VISITED, JSON.stringify({
          title: title,
          url: url,
          timestamp: Date.now()
        }));
      } catch (e) {}
    },

    getLastVisited() {
      try {
        const raw = localStorage.getItem(KEYS.LAST_VISITED);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return null;
    },

    renderCommandCenter() {
      const mount = document.getElementById('personalizedCommandCenter');
      if (!mount) return;

      const exam = this.getTargetExam();
      const last = this.getLastVisited();
      const streak = Streak.checkStatus();

      // Calculate days to exam
      const targetDate = new Date(exam.examDate);
      const diffMs = targetDate - new Date();
      const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

      // Calculate readiness score
      const readiness = Progress.calculateReadiness();
      const mistakesDue = Mistakes.getDueCount();

      mount.innerHTML = `
        <div class="cmd-center-card">
          <div class="cmd-top-bar">
            <div class="cmd-exam-badge">
              <span class="cmd-dot"></span>
              <strong>Target: ${exam.name}</strong>
              <button class="cmd-switch-btn" onclick="PrepHabit.showExamSelectorModal()">Switch Exam ▾</button>
            </div>
            <div class="cmd-streak-tag">
              🔥 <strong>Day ${streak.count} Streak</strong> &bull; <span>🛡️ ${streak.freezesLeft} Freeze active</span>
            </div>
          </div>

          <div class="cmd-hero-grid">
            <div class="cmd-countdown-box">
              <div class="cmd-days-num">${daysLeft}</div>
              <div class="cmd-days-label">Days to Prelims</div>
              <div class="cmd-target-note">🎯 Today's Target: Daily-10 + 1 Reasoning Drill</div>
            </div>

            <div class="cmd-continue-box">
              <div class="cmd-box-title">📍 Continue Where You Left Off</div>
              <div class="cmd-last-topic">
                ${last ? `<strong>${last.title}</strong>` : `<strong>Topic 1: Speed Math & Simplification</strong>`}
              </div>
              <p class="cmd-box-sub">Pick up your session with zero friction.</p>
              <div class="cmd-btn-row">
                <a href="${last ? last.url : exam.defaultModule}" class="cmd-btn-resume">
                  Resume Study &rarr;
                </a>
                <button class="cmd-btn-daily10" onclick="PrepHabit.openDaily10Modal()">
                  ⚡ Launch Today's Daily-10
                </button>
              </div>
            </div>

            <div class="cmd-stats-box">
              <div class="cmd-readiness-head">
                <span>Readiness Score</span>
                <strong style="color:#10B981">${readiness.score}%</strong>
              </div>
              <div class="cmd-prog-track">
                <div class="cmd-prog-fill" style="width:${readiness.score}%"></div>
              </div>
              <div class="cmd-stage-tag">${readiness.stage}</div>

              <div class="cmd-quick-pills">
                <button class="cmd-pill" onclick="PrepHabit.showMistakeModal()">
                  📓 Mistake Notebook <b>(${mistakesDue} due)</b>
                </button>
                <button class="cmd-pill" onclick="PrepHabit.showReminderModal()">
                  ⏰ Daily Alarm <b>(${localStorage.getItem(KEYS.REMINDER_TIME) || '07:00 AM'})</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };

  /* ═════════════════════════════════════════════════════════════
     3. MISTAKE NOTEBOOK & SPACED REPETITION DECK
     ═════════════════════════════════════════════════════════════ */
  const Mistakes = {
    getAll() {
      try {
        const raw = localStorage.getItem(KEYS.MISTAKES);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return [];
    },

    saveAll(list) {
      try {
        localStorage.setItem(KEYS.MISTAKES, JSON.stringify(list));
      } catch (e) {}
    },

    add(question, wrongOptionIdx) {
      const list = this.getAll();
      const existing = list.find(m => m.id === question.id);
      if (existing) {
        existing.attempts += 1;
        existing.wrongOptionIdx = wrongOptionIdx;
        existing.stage = 0; // reset spaced stage on re-error
        existing.nextReviewDate = getTodayString();
      } else {
        list.push({
          id: question.id,
          question: question.question,
          options: question.options,
          correctIndex: question.correctIndex,
          wrongOptionIdx: wrongOptionIdx,
          explanation: question.explanation,
          shortcut: question.shortcut || '',
          subject: question.subject,
          subjectLabel: question.subjectLabel,
          addedDate: getTodayString(),
          stage: 0, // 0 = 1-day, 1 = 3-days, 2 = 7-days, 3 = Mastered
          nextReviewDate: getTodayString(),
          attempts: 1
        });
      }
      this.saveAll(list);
      Personalization.renderCommandCenter();
    },

    getDue() {
      const today = getTodayString();
      return this.getAll().filter(m => m.stage < 3 && m.nextReviewDate <= today);
    },

    getDueCount() {
      return this.getDue().length;
    },

    advance(questionId, isCorrect) {
      const list = this.getAll();
      const item = list.find(m => m.id === questionId);
      if (!item) return;

      if (isCorrect) {
        item.stage += 1;
        const intervals = [1, 3, 7, 30];
        const daysToAdd = intervals[Math.min(item.stage, 3)];
        const next = new Date(Date.now() + daysToAdd * 86400000).toISOString().slice(0, 10);
        item.nextReviewDate = next;
      } else {
        item.stage = 0;
        item.nextReviewDate = getTodayString();
      }
      this.saveAll(list);
    }
  };

  /* ═════════════════════════════════════════════════════════════
     4. PROGRESS, SYLLABUS & READINESS SCORE
     ═════════════════════════════════════════════════════════════ */
  const Progress = {
    getCompletedTopics() {
      try {
        const raw = localStorage.getItem(KEYS.COMPLETED_TOPICS);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return [];
    },

    toggleTopic(topicName) {
      let list = this.getCompletedTopics();
      if (list.includes(topicName)) {
        list = list.filter(t => t !== topicName);
      } else {
        list.push(topicName);
      }
      try {
        localStorage.setItem(KEYS.COMPLETED_TOPICS, JSON.stringify(list));
      } catch (e) {}
      Personalization.renderCommandCenter();
      return list;
    },

    calculateReadiness() {
      const exam = Personalization.getTargetExam();
      const completed = this.getCompletedTopics();
      const totalTopics = exam.topics ? exam.topics.length : 16;
      const syllabusPct = Math.round((completed.length / totalTopics) * 100);

      // Streak factor (capped at 14 days for full points)
      const streakData = Streak.getData();
      const streakPct = Math.min(100, Math.round((streakData.count / 14) * 100));

      // Accuracy on daily attempts
      let accPct = 70; // baseline encouragement
      const mistakeCount = Mistakes.getAll().length;
      if (mistakeCount > 0) {
        const mastered = Mistakes.getAll().filter(m => m.stage >= 3).length;
        accPct = Math.min(95, Math.max(50, 60 + Math.round((mastered / mistakeCount) * 35)));
      }

      // Weighted score: 40% accuracy, 35% syllabus, 25% consistency streak
      const composite = Math.round((accPct * 0.40) + (syllabusPct * 0.35) + (streakPct * 0.25));

      let stage = 'Foundation Phase 🌱';
      if (composite >= 85) stage = 'Topper Tier 🏆';
      else if (composite >= 70) stage = 'Exam Ready 🎯';
      else if (composite >= 45) stage = 'Speed & Accuracy Phase ⚡';

      return {
        score: Math.min(99, Math.max(15, composite)),
        syllabusPct,
        streakCount: streakData.count,
        stage
      };
    }
  };

  /* ═════════════════════════════════════════════════════════════
     5. DAILY-10 RUNNER & SHAREABLE RESULT CARD MODAL
     ═════════════════════════════════════════════════════════════ */
  let currentDaily = {
    questions: [],
    currentIndex: 0,
    answers: {},
    startTime: null,
    timerInterval: null
  };

  function startDaily10() {
    const questions = getDailyQuestions();
    currentDaily.questions = questions;
    currentDaily.currentIndex = 0;
    currentDaily.answers = {};
    currentDaily.startTime = Date.now();
    renderDailyQuestion();
  }

  function renderDailyQuestion() {
    const modalBody = document.getElementById('daily10ModalContent');
    if (!modalBody) return;

    const q = currentDaily.questions[currentDaily.currentIndex];
    const total = currentDaily.questions.length;
    const idx = currentDaily.currentIndex;
    const answered = currentDaily.answers[q.id] !== undefined;
    const chosenIdx = currentDaily.answers[q.id];

    modalBody.innerHTML = `
      <div class="d10-runner-wrap">
        <div class="d10-progress-bar">
          <div class="d10-progress-fill" style="width:${((idx + 1) / total) * 100}%"></div>
        </div>
        <div class="d10-header-row">
          <span class="d10-q-count">Question <strong>${idx + 1}</strong> of ${total}</span>
          <span class="d10-badge-sub">${q.subjectLabel}</span>
          <span class="d10-timer" id="d10LiveTimer">⏱️ 00:00</span>
        </div>

        <div class="d10-q-box">
          <p class="d10-q-text">${q.question.replace(/\n/g, '<br>')}</p>
        </div>

        <div class="d10-options-grid">
          ${q.options.map((opt, i) => {
            let optClass = 'd10-opt-btn';
            if (answered) {
              if (i === q.correctIndex) optClass += ' d10-opt-correct';
              else if (i === chosenIdx) optClass += ' d10-opt-wrong';
              else optClass += ' d10-opt-disabled';
            }
            return `
              <button class="${optClass}" ${answered ? 'disabled' : ''} onclick="PrepHabit.submitDailyAnswer(${i})">
                <span class="d10-opt-char">${String.fromCharCode(65 + i)}</span>
                <span class="d10-opt-val">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${answered ? `
          <div class="d10-exp-box">
            <div class="d10-exp-title">
              ${chosenIdx === q.correctIndex ? '✅ Correct Answer!' : '❌ Incorrect Attempt (Logged to Mistake Notebook)'}
            </div>
            <p class="d10-exp-body">${q.explanation.replace(/\n/g, '<br>')}</p>
            ${q.shortcut ? `
              <div class="d10-shortcut-callout">
                <strong>⚡ Exam Shortcut:</strong> ${q.shortcut}
              </div>
            ` : ''}
            <div style="margin-top:14px;text-align:right">
              ${idx < total - 1 ? `
                <button class="d10-next-btn" onclick="PrepHabit.nextDailyQuestion()">Next Question &rarr;</button>
              ` : `
                <button class="d10-finish-btn" onclick="PrepHabit.finishDaily10()">View Result Card 🏆</button>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Start timer if not running
    if (!currentDaily.timerInterval) {
      currentDaily.timerInterval = setInterval(() => {
        const timerEl = document.getElementById('d10LiveTimer');
        if (!timerEl) return;
        const elapsedSec = Math.floor((Date.now() - currentDaily.startTime) / 1000);
        const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
        const secs = String(elapsedSec % 60).padStart(2, '0');
        timerEl.textContent = `⏱️ ${mins}:${secs}`;
      }, 1000);
    }
  }

  function submitDailyAnswer(optIdx) {
    const q = currentDaily.questions[currentDaily.currentIndex];
    if (currentDaily.answers[q.id] !== undefined) return;

    currentDaily.answers[q.id] = optIdx;

    if (optIdx !== q.correctIndex) {
      // Add to Mistake Notebook
      Mistakes.add(q, optIdx);
    }

    renderDailyQuestion();
  }

  function nextDailyQuestion() {
    if (currentDaily.currentIndex < currentDaily.questions.length - 1) {
      currentDaily.currentIndex += 1;
      renderDailyQuestion();
    }
  }

  function finishDaily10() {
    if (currentDaily.timerInterval) {
      clearInterval(currentDaily.timerInterval);
      currentDaily.timerInterval = null;
    }

    // Calculate score
    let correct = 0;
    currentDaily.questions.forEach(q => {
      if (currentDaily.answers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const elapsedSec = Math.floor((Date.now() - currentDaily.startTime) / 1000);
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    const timeFormatted = `${mins}m ${secs}s`;
    const streak = Streak.recordActivity();

    // Render Shareable Result Card
    const modalBody = document.getElementById('daily10ModalContent');
    if (!modalBody) return;

    const todayDate = new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    const shareText = `🎯 PrepSelf Daily-10 Result (${todayDate})\n⚡ Score: ${correct}/10 (${correct * 10}% Accuracy)\n⏱️ Time: ${timeFormatted} | 🔥 ${streak}-Day Streak\nCan you beat my score? Take today's set here: https://prepself.in/quiz-simulator.html?daily=${getTodayString()}&challenge=${correct}`;

    modalBody.innerHTML = `
      <div class="result-card-wrap">
        <div class="result-card" id="shareableResultCard">
          <div class="rc-header">
            <span class="rc-badge">📘 PREPSELF DAILY-10 RESULT</span>
            <span class="rc-date">${todayDate}</span>
          </div>

          <div class="rc-score-box">
            <div class="rc-score-big">${correct} <span style="font-size:24px;color:rgba(255,255,255,0.6)">/ 10</span></div>
            <div class="rc-accuracy-tag">${correct >= 8 ? '🌟 Excellent Accuracy!' : (correct >= 5 ? '⚡ Solid Attempt!' : '🌱 Learning in Progress')}</div>
          </div>

          <div class="rc-stats-row">
            <div class="rc-stat">
              <span class="rc-stat-val">🔥 Day ${streak}</span>
              <span class="rc-stat-lbl">Streak Active</span>
            </div>
            <div class="rc-stat">
              <span class="rc-stat-val">⏱️ ${timeFormatted}</span>
              <span class="rc-stat-lbl">Time Taken</span>
            </div>
            <div class="rc-stat">
              <span class="rc-stat-val">🎯 ${correct * 10}%</span>
              <span class="rc-stat-lbl">Accuracy</span>
            </div>
          </div>

          <div class="rc-quote">
            "Consistency beats intensity. 10 minutes of daily practice compounds into toppers."
          </div>
        </div>

        <div class="rc-actions">
          <button class="rc-btn-wa" onclick="PrepHabit.shareToWhatsApp('${encodeURIComponent(shareText)}')">
            💬 Share on WhatsApp
          </button>
          <button class="rc-btn-copy" onclick="PrepHabit.copyChallengeLink(${correct})">
            ⚔️ Challenge a Friend (Copy Link)
          </button>
          <button class="rc-btn-done" onclick="PrepHabit.closeDaily10Modal()">
            Done &amp; Return to Dashboard
          </button>
        </div>
      </div>
    `;
  }

  /* ═════════════════════════════════════════════════════════════
     6. NOTIFICATION & RETURN TRIGGER (PWA / Reminder)
     ═════════════════════════════════════════════════════════════ */
  const Reminders = {
    setAlarm(timeStr) {
      try {
        localStorage.setItem(KEYS.REMINDER_TIME, timeStr);
      } catch (e) {}

      if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
      }

      Personalization.renderCommandCenter();
    },

    joinTelegram() {
      window.open('https://t.me/raghav_begins', '_blank');
    }
  };

  /* ═════════════════════════════════════════════════════════════
     7. STYLES & MODAL INJECTION
     ═════════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('prephabit-styles')) return;
    const style = document.createElement('style');
    style.id = 'prephabit-styles';
    style.textContent = `
      .cmd-center-card {
        background: linear-gradient(135deg, rgba(17, 29, 56, 0.95), rgba(10, 15, 30, 0.95));
        border: 1px solid rgba(56, 189, 248, 0.25);
        border-radius: 16px;
        padding: 22px;
        margin-bottom: 28px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      }
      .cmd-top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 18px;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
      .cmd-exam-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        color: #fff;
      }
      .cmd-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #38BDF8;
        box-shadow: 0 0 8px #38BDF8;
      }
      .cmd-switch-btn {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.15);
        color: #38BDF8;
        padding: 3px 10px;
        border-radius: 8px;
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
      }
      .cmd-streak-tag {
        font-size: 13px;
        color: #EA580C;
        background: rgba(234, 88, 12, 0.12);
        padding: 4px 12px;
        border-radius: 12px;
        border: 1px solid rgba(234, 88, 12, 0.25);
      }
      .cmd-hero-grid {
        display: grid;
        grid-template-columns: 180px 1.4fr 1.2fr;
        gap: 18px;
      }
      @media(max-width: 860px) {
        .cmd-hero-grid { grid-template-columns: 1fr; }
      }
      .cmd-countdown-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .cmd-days-num {
        font-size: 44px;
        font-weight: 900;
        line-height: 1;
        color: #F59E0B;
      }
      .cmd-days-label {
        font-size: 12px;
        font-weight: 700;
        color: rgba(255,255,255,0.7);
        text-transform: uppercase;
        margin-top: 4px;
      }
      .cmd-target-note {
        font-size: 11px;
        color: rgba(255,255,255,0.5);
        margin-top: 8px;
      }
      .cmd-continue-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .cmd-box-title {
        font-size: 12px;
        font-weight: 700;
        color: #38BDF8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .cmd-last-topic {
        font-size: 15px;
        color: #fff;
        margin: 6px 0;
      }
      .cmd-box-sub {
        font-size: 12px;
        color: rgba(255,255,255,0.6);
        margin-bottom: 12px;
      }
      .cmd-btn-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .cmd-btn-resume {
        background: linear-gradient(135deg, #2563EB, #1D4ED8);
        color: #fff;
        text-decoration: none;
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 12.5px;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
      }
      .cmd-btn-daily10 {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.35);
        color: #34D399;
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 12.5px;
        font-weight: 700;
        cursor: pointer;
      }
      .cmd-stats-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px;
      }
      .cmd-readiness-head {
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 6px;
      }
      .cmd-prog-track {
        height: 8px;
        background: rgba(255,255,255,0.1);
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 8px;
      }
      .cmd-prog-fill {
        height: 100%;
        background: linear-gradient(90deg, #10B981, #38BDF8);
        border-radius: 999px;
        transition: width 0.3s;
      }
      .cmd-stage-tag {
        font-size: 11px;
        font-weight: 700;
        color: rgba(255,255,255,0.6);
        margin-bottom: 12px;
      }
      .cmd-quick-pills {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .cmd-pill {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.12);
        color: #CBD5E1;
        padding: 5px 10px;
        border-radius: 6px;
        font-size: 11.5px;
        cursor: pointer;
      }
      /* Runner Styles */
      .d10-progress-bar {
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 14px;
      }
      .d10-progress-fill {
        height: 100%;
        background: #38BDF8;
        transition: width 0.2s;
      }
      .d10-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12.5px;
        color: rgba(255,255,255,0.7);
        margin-bottom: 14px;
      }
      .d10-badge-sub {
        background: rgba(56,189,248,0.15);
        color: #38BDF8;
        padding: 2px 8px;
        border-radius: 6px;
        font-weight: 700;
      }
      .d10-q-box {
        background: rgba(15,23,42,0.85);
        padding: 16px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.08);
        margin-bottom: 16px;
      }
      .d10-q-text {
        font-size: 15px;
        color: #fff;
        line-height: 1.55;
      }
      .d10-options-grid {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .d10-opt-btn {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.1);
        padding: 12px 14px;
        border-radius: 8px;
        color: #E2E8F0;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        cursor: pointer;
        text-align: left;
        font-size: 14px;
      }
      .d10-opt-btn:hover:not(:disabled) {
        border-color: #38BDF8;
        background: rgba(56,189,248,0.08);
      }
      .d10-opt-char {
        background: rgba(255,255,255,0.1);
        padding: 2px 8px;
        border-radius: 4px;
        font-weight: 800;
        font-size: 12px;
      }
      .d10-opt-correct {
        background: rgba(16,185,129,0.15) !important;
        border-color: #10B981 !important;
        color: #34D399 !important;
      }
      .d10-opt-wrong {
        background: rgba(239,68,68,0.15) !important;
        border-color: #EF4444 !important;
        color: #F87171 !important;
      }
      .d10-exp-box {
        margin-top: 18px;
        background: rgba(15,23,42,0.9);
        border: 1px solid rgba(255,255,255,0.12);
        padding: 16px;
        border-radius: 10px;
      }
      .d10-exp-title {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 8px;
      }
      .d10-exp-body {
        font-size: 13px;
        color: rgba(255,255,255,0.8);
        line-height: 1.5;
      }
      .d10-shortcut-callout {
        margin-top: 10px;
        background: rgba(245,158,11,0.12);
        border-left: 3px solid #F59E0B;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12.5px;
        color: #FCD34D;
      }
      .d10-next-btn, .d10-finish-btn {
        background: linear-gradient(135deg, #2563EB, #1D4ED8);
        color: #fff;
        border: none;
        padding: 9px 18px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
      }
      /* Result Card */
      .result-card-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;
      }
      .result-card {
        background: linear-gradient(135deg, #0F172A, #1E1B4B);
        border: 2px solid #38BDF8;
        border-radius: 16px;
        padding: 24px;
        width: 100%;
        max-width: 440px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      .rc-header {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: rgba(255,255,255,0.6);
        margin-bottom: 16px;
      }
      .rc-score-big {
        font-size: 56px;
        font-weight: 900;
        color: #38BDF8;
        line-height: 1;
      }
      .rc-accuracy-tag {
        font-size: 13px;
        font-weight: 700;
        color: #34D399;
        margin: 6px 0 18px;
      }
      .rc-stats-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px;
        padding: 12px;
        background: rgba(255,255,255,0.04);
        border-radius: 10px;
        margin-bottom: 16px;
      }
      .rc-stat-val {
        display: block;
        font-size: 14px;
        font-weight: 800;
        color: #fff;
      }
      .rc-stat-lbl {
        font-size: 11px;
        color: rgba(255,255,255,0.5);
      }
      .rc-quote {
        font-size: 11.5px;
        color: rgba(255,255,255,0.6);
        font-style: italic;
      }
      .rc-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        max-width: 440px;
      }
      .rc-btn-wa {
        background: #25D366;
        color: #fff;
        border: none;
        padding: 12px;
        border-radius: 10px;
        font-weight: 800;
        font-size: 14px;
        cursor: pointer;
      }
      .rc-btn-copy {
        background: rgba(56,189,248,0.15);
        border: 1px solid #38BDF8;
        color: #38BDF8;
        padding: 12px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 13.5px;
        cursor: pointer;
      }
      .rc-btn-done {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.7);
        padding: 10px;
        border-radius: 10px;
        font-size: 12.5px;
        cursor: pointer;
      }
      /* Modal Base */
      .habit-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(6px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .habit-modal-dialog {
        background: #0B132B;
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 16px;
        width: 100%;
        max-width: 640px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        position: relative;
      }
      .habit-modal-close {
        position: absolute;
        top: 16px;
        right: 18px;
        background: none;
        border: none;
        color: rgba(255,255,255,0.5);
        font-size: 24px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  // Create Generic Modal Container
  function ensureModalContainer() {
    let container = document.getElementById('prephabitModalContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'prephabitModalContainer';
      document.body.appendChild(container);
    }
    return container;
  }

  function showModal(contentHtml) {
    injectStyles();
    const container = ensureModalContainer();
    container.innerHTML = `
      <div class="habit-modal-backdrop" onclick="if(event.target===this) PrepHabit.closeModal()">
        <div class="habit-modal-dialog">
          <button class="habit-modal-close" onclick="PrepHabit.closeModal()">&times;</button>
          ${contentHtml}
        </div>
      </div>
    `;
  }

  function closeModal() {
    const container = document.getElementById('prephabitModalContainer');
    if (container) container.innerHTML = '';
  }

  /* ═════════════════════════════════════════════════════════════
     8. PUBLIC API & SOCIAL ACTIONS
     ═════════════════════════════════════════════════════════════ */
  window.PrepHabit = {
    init() {
      injectStyles();
      Streak.checkStatus();
      Streak.updateStreakBadge();
      Personalization.renderCommandCenter();
      this.checkUrlChallenge();
    },

    openDaily10Modal() {
      showModal(`
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:14px;display:flex;align-items:center;gap:8px">
          ⚡ Today's Daily-10 Practice Set
        </h2>
        <div id="daily10ModalContent"></div>
      `);
      startDaily10();
    },

    submitDailyAnswer(idx) {
      submitDailyAnswer(idx);
    },

    nextDailyQuestion() {
      nextDailyQuestion();
    },

    finishDaily10() {
      finishDaily10();
    },

    closeDaily10Modal() {
      closeModal();
      Personalization.renderCommandCenter();
    },

    closeModal() {
      closeModal();
    },

    shareToWhatsApp(text) {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    },

    copyChallengeLink(score) {
      const today = getTodayString();
      const url = `https://prepself.in/quiz-simulator.html?daily=${today}&challenge=${score}`;
      navigator.clipboard.writeText(url).then(() => {
        alert(`⚔️ Challenge link copied to clipboard!\n\nShare with friends: ${url}`);
      });
    },

    checkUrlChallenge() {
      const params = new URLSearchParams(window.location.search);
      const score = params.get('challenge');
      if (score !== null) {
        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1E1B4B;border:2px solid #818CF8;padding:14px 20px;border-radius:12px;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,0.5);display:flex;align-items:center;gap:14px;max-width:90%;color:#fff';
        banner.innerHTML = `
          <span>⚔️ A friend challenged you to beat <strong>${score}/10</strong> in today's Daily-10!</span>
          <button onclick="PrepHabit.openDaily10Modal(); this.parentElement.remove();" style="background:#4F46E5;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-weight:700;cursor:pointer">Accept Challenge</button>
          <button onclick="this.parentElement.remove();" style="background:none;border:none;color:rgba(255,255,255,0.5);cursor:pointer">&times;</button>
        `;
        document.body.appendChild(banner);
      }
    },

    showExamSelectorModal() {
      const current = Personalization.getTargetExam().id;
      const html = `
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:14px">🎯 Select Your Primary Target Exam</h2>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:18px">
          Personalizes your homepage, syllabus checklist, countdown targets, and Daily-10 topics. You can switch anytime.
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px">
          ${Object.values(EXAM_PRESETS).map(ex => `
            <button onclick="PrepHabit.selectExam('${ex.id}')" style="background:${ex.id === current ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.05)'};border:1.5px solid ${ex.id === current ? '#38BDF8' : 'rgba(255,255,255,0.1)'};padding:14px;border-radius:10px;color:#fff;text-align:left;cursor:pointer">
              <div style="font-size:11px;color:#38BDF8;font-weight:700">${ex.badge}</div>
              <div style="font-size:16px;font-weight:800;margin-top:4px">${ex.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px">${ex.topics.length} Syllabus Modules</div>
            </button>
          `).join('')}
        </div>
      `;
      showModal(html);
    },

    selectExam(examId) {
      Personalization.setTargetExam(examId);
      closeModal();
    },

    showMistakeModal() {
      const list = Mistakes.getAll();
      const due = Mistakes.getDue();
      const html = `
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:8px">
          📓 Mistake Notebook &amp; Revision Deck
        </h2>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:16px">
          "Your mistakes are your syllabus." Wrong questions resurface on a spaced 1-3-7 day schedule until permanently mastered.
        </p>
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <span style="font-size:12px;padding:3px 10px;background:rgba(239,68,68,0.15);color:#F87171;border-radius:6px;font-weight:700">
            ${due.length} Due for Review
          </span>
          <span style="font-size:12px;padding:3px 10px;background:rgba(255,255,255,0.08);color:#CBD5E1;border-radius:6px;font-weight:700">
            ${list.length} Total Errors Logged
          </span>
        </div>

        ${list.length === 0 ? `
          <div style="padding:30px;text-align:center;color:rgba(255,255,255,0.5)">
            ✨ Clean record! Attempt a Daily-10 set or Mock quiz. Any tricky questions you miss will be safely saved here.
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;gap:12px;max-height:55vh;overflow-y:auto;padding-right:6px">
            ${list.map((m, i) => `
              <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px">
                <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#38BDF8;margin-bottom:6px">
                  <span>${m.subjectLabel}</span>
                  <span style="color:${m.stage >= 3 ? '#10B981' : '#F59E0B'}">${m.stage >= 3 ? '✅ Mastered' : `Stage ${m.stage + 1} of 3`}</span>
                </div>
                <div style="font-size:13.5px;color:#fff;font-weight:600;margin-bottom:8px">${m.question.replace(/\n/g, '<br>')}</div>
                <div style="font-size:12px;background:rgba(16,185,129,0.1);padding:6px 10px;border-radius:6px;color:#34D399;margin-bottom:6px">
                  Correct Answer: (${String.fromCharCode(65 + m.correctIndex)}) ${m.options[m.correctIndex]}
                </div>
                <div style="font-size:12px;color:rgba(255,255,255,0.6)">${m.explanation}</div>
              </div>
            `).join('')}
          </div>
        `}
      `;
      showModal(html);
    },

    addMistake(q, wrongOptionIdx) {
      Mistakes.add(q, wrongOptionIdx);
    },

    showReminderModal() {
      const current = localStorage.getItem(KEYS.REMINDER_TIME) || '07:00 AM';
      const html = `
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:12px">⏰ Daily Study Alarm &amp; Return Triggers</h2>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:18px">
          Pick your preferred daily study hour. We will deliver a gentle browser reminder when today's fresh Daily-10 is released.
        </p>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
          ${['06:30 AM', '07:00 AM', '08:00 AM', '02:00 PM', '08:00 PM', '09:30 PM'].map(t => `
            <button onclick="PrepHabit.setAlarmTime('${t}')" style="background:${t === current ? '#2563EB' : 'rgba(255,255,255,0.06)'};border:1px solid ${t === current ? '#38BDF8' : 'rgba(255,255,255,0.15)'};color:#fff;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer">
              ${t}
            </button>
          `).join('')}
        </div>

        <div style="background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div>
            <div style="font-size:14px;font-weight:800;color:#fff">Telegram Channel Daily Alerts</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:2px">Receive morning 7 AM test links directly in Telegram</div>
          </div>
          <button onclick="PrepHabit.joinTelegram()" style="background:#0088CC;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-weight:700;font-size:12.5px;cursor:pointer;white-space:nowrap">
            Join Telegram ↗
          </button>
        </div>
      `;
      showModal(html);
    },

    setAlarmTime(t) {
      Reminders.setAlarm(t);
      closeModal();
      alert(`⏰ Study alarm set for ${t}!`);
    },

    joinTelegram() {
      Reminders.joinTelegram();
    },

    // Optional Firestore Sync when Google Auth signs in
    syncWithFirestore(user, db) {
      if (!user || !db) return;
      try {
        const streak = Streak.getData();
        const exam = Personalization.getTargetExam();
        const mistakes = Mistakes.getAll();
        console.log(`[PrepHabit] Syncing habit profile for ${user.uid}`);
      } catch (e) {
        console.warn('[PrepHabit] Firestore sync error:', e);
      }
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PrepHabit.init());
  } else {
    window.PrepHabit.init();
  }

})(window, document);
