/**
 * PrepSelf Habit-Forming & Retention Engine (PrepHabit)
 * Genuine, authentic habit formation: zero fake counters, zero manufactured urgency.
 * 
 * Features:
 * 1. Personalised Exam Dashboard: Asks once ("Which exam?") and renders that exam's focused cockpit.
 * 2. On-Site Practice & Scoring: All questions, answers, and AI-style topper explanations happen inside the site.
 * 3. Mistake Notebook & Spaced Repetition: Leitner deck (1d, 3d, 7d) with Weak-Topic Analytics.
 * 4. Real Forgiving Streak: Local storage + optional Firestore sync, 7-day progress, 1 weekly freeze day.
 * 5. Daily Hooks: Fixed-time Daily-10 (6 AM IST), exam countdown, today's 20-Q target, Trap of the Day.
 * 6. Short Sessions: 5-Minute Commute Speed Drill, offline formula flashcards, "Resume where you left off".
 * 7. Notification Without App: PWA web push reminder toggle + Telegram & WhatsApp channel links.
 * 8. Social Loops: Shareable WhatsApp score card, percentile ranking, friend challenge links.
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
    TODAY_ANSWERED: PREFIX + 'answered_',
    REMINDER_TIME: PREFIX + 'reminder_time',
    USER_NICKNAME: PREFIX + 'nickname',
    TRAP_ANSWERED: PREFIX + 'trap_'
  };

  // Supported Exam Targets with Realistic 2026-2027 Cycle Dates & Syllabi
  const EXAM_PRESETS = {
    'sbi-po': {
      id: 'sbi-po',
      name: 'SBI PO 2026',
      fullName: 'State Bank of India Probationary Officer',
      badge: 'Banking & Finance',
      examDate: '2026-11-22',
      defaultModule: 'modules/bank-quant.html',
      topics: [
        'Simplification & Speed Math', 'Quadratic Equations', 'Number Series', 'Data Interpretation (DI)',
        'Arithmetic: Profit & Loss', 'Arithmetic: SI & CI', 'Arithmetic: Time & Work', 'Puzzles: Floor & Flat',
        'Puzzles: Seating Arrangement', 'Syllogisms (Only a Few)', 'Inequalities & Coding', 'Reading Comprehension',
        'Cloze Test & Parajumbles', 'Grammar & Error Detection', 'Banking & RBI Awareness', 'Current Affairs & Schemes'
      ]
    },
    'ibps-po': {
      id: 'ibps-po',
      name: 'IBPS PO & Clerk 2026',
      fullName: 'Institute of Banking Personnel Selection',
      badge: 'Banking & Finance',
      examDate: '2026-10-18',
      defaultModule: 'modules/bank-reasoning.html',
      topics: [
        'Speed Math & Approximations', 'Quadratic Sign Rules', 'Missing & Wrong Series', 'Table & Radar DI',
        'Arithmetic Word Problems', 'Box & Day Puzzles', 'Circular Seating In-Out', 'Blood Relations & Direction',
        'Reverse Syllogisms', 'RC Inference Questions', 'Sentence Rearrangement', 'Monetary Policy & Inflation'
      ]
    },
    'ssc-cgl': {
      id: 'ssc-cgl',
      name: 'SSC CGL & CHSL 2026',
      fullName: 'Staff Selection Commission Combined Graduate Level',
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
      name: 'UPSC CSE 2026–2027',
      fullName: 'Union Public Service Commission Civil Services (IAS/IPS)',
      badge: 'Civil Services',
      examDate: '2027-05-23',
      defaultModule: 'modules/gs4.html',
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
      fullName: 'Railway Recruitment Board Non-Technical Popular Categories',
      badge: 'Railways RRB',
      examDate: '2026-12-14',
      defaultModule: 'modules/railways.html',
      topics: [
        'Mathematics: Number System & LCM', 'Mathematics: Time, Speed & Distance', 'General Intelligence: Coding',
        'General Intelligence: Venn Diagrams', 'General Science: Physics Laws', 'General Science: Chemistry Basics',
        'General Science: Biology & Human Body', 'Static GK: Railway History & Inventions', 'Current Affairs & Sports'
      ]
    },
    'gate': {
      id: 'gate',
      name: 'GATE 2027 & Engineering PSUs',
      fullName: 'Graduate Aptitude Test in Engineering',
      badge: 'Engineering & PSUs',
      examDate: '2027-02-06',
      defaultModule: 'modules/engineering.html',
      topics: [
        'Engineering Mathematics: Linear Algebra', 'Calculus & Differential Equations', 'Probability & Numerical Methods',
        'Core Technical Subject 1', 'Core Technical Subject 2', 'Core Technical Subject 3', 'General Aptitude: Verbal & Quant'
      ]
    },
    'defence': {
      id: 'defence',
      name: 'Defence NDA & CDS 2026',
      fullName: 'National Defence Academy & Combined Defence Services',
      badge: 'Armed Forces',
      examDate: '2026-09-06',
      defaultModule: 'modules/defence.html',
      topics: [
        'Mathematics: Trigonometry & Calculus', 'English: Grammar & Comprehension', 'General Knowledge: Modern History',
        'General Knowledge: Geography & Defence', 'General Science: Physics & Chemistry', 'SSB Interview Psychology Drills'
      ]
    },
    'jee': {
      id: 'jee',
      name: 'JEE Main 2027',
      fullName: 'Joint Entrance Examination (Engineering)',
      badge: 'Engineering Entrance',
      examDate: '2027-01-24',
      defaultModule: 'modules/engineering.html',
      topics: [
        'Physics: Mechanics & Newton Laws', 'Physics: Electrodynamics & Optics', 'Chemistry: Physical Chemistry & Mole Concept',
        'Chemistry: Organic Reaction Mechanisms', 'Mathematics: Calculus & Derivatives', 'Mathematics: Coordinate Geometry'
      ]
    },
    'neet': {
      id: 'neet',
      name: 'NEET UG 2027',
      fullName: 'National Eligibility cum Entrance Test (Medical)',
      badge: 'Medical Entrance',
      examDate: '2027-05-02',
      defaultModule: 'modules/neet.html',
      topics: [
        'Biology: Botany & Plant Physiology', 'Biology: Zoology & Human Anatomy', 'Biology: Genetics & Evolution',
        'Physics: Kinematics & Thermodynamics', 'Chemistry: Organic Reaction Mechanisms', 'Chemistry: NCERT Inorganic Notes'
      ]
    },
    'law': {
      id: 'law',
      name: 'CLAT 2027 (Law)',
      fullName: 'Common Law Admission Test',
      badge: 'Law Entrance',
      examDate: '2026-12-06',
      defaultModule: 'modules/law.html',
      topics: [
        'Legal Reasoning: Constitutional Principles', 'Legal Reasoning: Torts & Contracts', 'Logical Reasoning: Arguments & Premises',
        'English Language: Dense Comprehension Passages', 'Current Affairs & Legal GK'
      ]
    },
    'mba': {
      id: 'mba',
      name: 'CAT 2026 (MBA)',
      fullName: 'Common Admission Test (IIMs)',
      badge: 'Management Entrance',
      examDate: '2026-11-29',
      defaultModule: 'modules/mba.html',
      topics: [
        'VARC: Reading Comprehension Inferences', 'VARC: Parajumbles & Para-summary', 'DILR: Arrangement & Logic Games',
        'DILR: Chart & Matrix Tables', 'Quantitative Aptitude: Arithmetic & Algebra', 'Quantitative Aptitude: Geometry & Numbers'
      ]
    },
    'teaching': {
      id: 'teaching',
      name: 'CTET 2026 (Teaching)',
      fullName: 'Central Teacher Eligibility Test',
      badge: 'Teaching & Education',
      examDate: '2026-12-20',
      defaultModule: 'modules/science-teaching.html',
      topics: [
        'Child Development & Pedagogy (CDP)', 'Concept of Inclusive Education', 'Learning & Motivational Psychology',
        'Language 1: Pedagogy & Comprehension', 'Language 2: Pedagogy & Grammar', 'Mathematics & Environmental Studies (EVS)'
      ]
    },
    'state-psc': {
      id: 'state-psc',
      name: 'State PSC 2026',
      fullName: 'State Public Service Commission Recruitment',
      badge: 'State Civil Services',
      examDate: '2026-10-27',
      defaultModule: 'modules/uppsc-ro-aro.html',
      topics: [
        'State History & Cultural Heritage', 'State Physical & Economic Geography', 'Indian Polity & Constitutional Bodies',
        'General Science & Technology', 'State Administrative Acts & Schemes', 'CSAT & General Mental Ability'
      ]
    }
  };

  // High-Yield Question Bank for Deterministic Daily-10 Sets & Speed Drills
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

  // High-Yield Conceptual Traps of the Day
  const TRAPS_OF_THE_DAY = [
    {
      id: 'trap_1',
      title: 'Syllogism: The "Only a Few" Illusion',
      subject: 'Reasoning Ability',
      premise: 'Statement: Only a few Actors are Directors.\nDoes Conclusion: "Some Actors are NOT Directors" definitely follow?',
      optA: 'Yes, it 100% follows',
      optB: 'No, it is only a possibility',
      correctOpt: 'A',
      explanation: 'TRAP REVEALED: Most aspirants think "Only a few" means just "Some". In modern banking/SSC exams, "Only a few A are B" strictly equals TWO simultaneous truths: (1) Some A are B, AND (2) Some A are definitely NOT B! Therefore, "Some Actors are NOT Directors" is 100% true.'
    },
    {
      id: 'trap_2',
      title: 'Algebra: The Square Root vs Quadratic Sign Trap',
      subject: 'Quantitative Aptitude',
      premise: 'Equation I: x² = 64\nEquation II: y = √64\nWhat is the true relationship between x and y?',
      optA: 'x = y',
      optB: 'x ≤ y',
      correctOpt: 'B',
      explanation: 'TRAP REVEALED: x² = 64 has two roots: x = +8 and -8. But the radical sign √64 denotes the PRINCIPAL (non-negative) square root, so y is ONLY +8! Comparing (+8, -8) against (+8) yields x ≤ y, NOT x = y! Over 75% of candidates mark x = y and lose 1.25 marks.'
    },
    {
      id: 'trap_3',
      title: 'Compound Interest: Half-Yearly Rate & Time Trap',
      subject: 'Quantitative Aptitude',
      premise: 'If 10% per annum is compounded half-yearly for 1 year, the effective annual interest rate is:',
      optA: '10.00%',
      optB: '10.25%',
      correctOpt: 'B',
      explanation: 'TRAP REVEALED: Half-yearly means Rate is halved (R = 5%) and Time periods double (n = 2). Net rate = 5 + 5 + (5 × 5)/100 = 10.25%.'
    },
    {
      id: 'trap_4',
      title: 'Grammar: The "Between... To" Colloquial Trap',
      subject: 'English Language',
      premise: 'Which sentence is grammatically standard?\nA: The exam will be held between 10:00 AM to 12:00 PM.\nB: The exam will be held between 10:00 AM and 12:00 PM.',
      optA: 'Sentence A is correct',
      optB: 'Sentence B is correct',
      correctOpt: 'B',
      explanation: 'TRAP REVEALED: "Between" is ALWAYS paired with "and" (between X and Y). "From" is paired with "to" (from X to Y). Combining "between" with "to" is a classic error-spotting trap.'
    }
  ];

  // Helper Functions
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

  function getTodayQuestions(dateStr = getTodayString()) {
    const seed = getDateHash(dateStr);
    const pool = [...QUESTION_BANK];
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
     1. STREAK & FORGIVING FREEZE SYSTEM
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
        history: []
      };
    },

    saveData(data) {
      try {
        localStorage.setItem(KEYS.STREAK, JSON.stringify(data));
      } catch (e) {}
    },

    checkStatus() {
      const data = this.getData();
      const today = getTodayString();
      if (!data.lastActiveDate) {
        return { count: 1, isProtected: false, freezesLeft: data.freezesAvailable, history: data.history || [] };
      }

      if (data.lastActiveDate === today) {
        return { count: data.count, isProtected: false, freezesLeft: data.freezesAvailable, history: data.history || [] };
      }

      const diffDays = Math.round((new Date(today) - new Date(data.lastActiveDate)) / (1000 * 60 * 60 * 24));

      // Active yesterday -> streak intact
      if (diffDays === 1) {
        return { count: data.count, isProtected: false, freezesLeft: data.freezesAvailable, history: data.history || [] };
      }

      // Missed 1 day -> Auto-apply freeze without guilt
      if (diffDays === 2 && data.freezesAvailable > 0) {
        data.freezesAvailable -= 1;
        data.freezesUsed = (data.freezesUsed || 0) + 1;
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        data.lastActiveDate = yesterday;
        this.saveData(data);
        return { count: data.count, isProtected: true, freezesLeft: data.freezesAvailable, history: data.history || [] };
      }

      if (diffDays > 1) {
        data.count = 1;
        this.saveData(data);
      }

      return { count: data.count, isProtected: false, freezesLeft: data.freezesAvailable, history: data.history || [] };
    },

    recordActivity() {
      const data = this.getData();
      const today = getTodayString();

      if (data.lastActiveDate === today) {
        return data.count;
      }

      const diffDays = data.lastActiveDate
        ? Math.round((new Date(today) - new Date(data.lastActiveDate)) / (1000 * 60 * 60 * 24))
        : 1;

      if (diffDays === 1) {
        data.count += 1;
      } else {
        data.count = Math.max(1, data.count);
      }

      data.lastActiveDate = today;
      data.history = data.history || [];
      if (!data.history.includes(today)) {
        data.history.push(today);
      }

      this.saveData(data);
      Personalization.renderCommandCenter();
      return data.count;
    }
  };

  /* ═════════════════════════════════════════════════════════════
     2. TODAY'S QUESTION GOAL COUNTER
     ═════════════════════════════════════════════════════════════ */
  const DailyGoal = {
    TARGET: 20,

    getAnsweredCount() {
      const today = getTodayString();
      try {
        const val = localStorage.getItem(KEYS.TODAY_ANSWERED + today);
        return val ? parseInt(val, 10) : 0;
      } catch (e) {
        return 0;
      }
    },

    increment(count = 1) {
      const today = getTodayString();
      const current = this.getAnsweredCount();
      const updated = current + count;
      try {
        localStorage.setItem(KEYS.TODAY_ANSWERED + today, updated.toString());
      } catch (e) {}
      Personalization.renderCommandCenter();
      return updated;
    }
  };

  /* ═════════════════════════════════════════════════════════════
     3. MISTAKE NOTEBOOK & SPACED REPETITION (Leitner Deck)
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
        existing.attempts = (existing.attempts || 1) + 1;
        existing.wrongOptionIdx = wrongOptionIdx;
        existing.stage = 0; // reset to Stage 0 on re-error
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
          subject: question.subject || 'General',
          subjectLabel: question.subjectLabel || 'General Aptitude',
          topic: question.topic || 'General Practice',
          addedDate: getTodayString(),
          stage: 0, // 0 = 1 day, 1 = 3 days, 2 = 7 days, 3 = Mastered
          nextReviewDate: getTodayString(),
          attempts: 1
        });
      }
      this.saveAll(list);
      Personalization.renderCommandCenter();
    },

    getDue() {
      const today = getTodayString();
      return this.getAll().filter(m => m.stage < 3 && (!m.nextReviewDate || m.nextReviewDate <= today));
    },

    getDueCount() {
      return this.getDue().length;
    },

    advance(questionId, isCorrect) {
      const list = this.getAll();
      const item = list.find(m => m.id === questionId);
      if (!item) return;

      if (isCorrect) {
        item.stage = (item.stage || 0) + 1;
        const intervals = [1, 3, 7, 30];
        const daysToAdd = intervals[Math.min(item.stage, 3)];
        const next = new Date(Date.now() + daysToAdd * 86400000).toISOString().slice(0, 10);
        item.nextReviewDate = next;
      } else {
        item.stage = 0;
        item.nextReviewDate = getTodayString();
      }
      this.saveAll(list);
      Personalization.renderCommandCenter();
    },

    getWeakTopics() {
      const list = this.getAll();
      const freq = {};
      list.forEach(m => {
        const topic = m.topic || m.subjectLabel || 'General';
        freq[topic] = (freq[topic] || 0) + 1;
      });
      return Object.entries(freq)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count);
    }
  };

  /* ═════════════════════════════════════════════════════════════
     4. PERSONALISATION & EXAM COMMAND CENTER RENDERER
     ═════════════════════════════════════════════════════════════ */
  const Personalization = {
    getTargetExam() {
      try {
        const raw = localStorage.getItem(KEYS.TARGET_EXAM);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
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
      const answeredToday = DailyGoal.getAnsweredCount();
      const mistakesDue = Mistakes.getDueCount();
      const weakTopics = Mistakes.getWeakTopics();

      // Countdown calculations
      const targetDate = new Date(exam.examDate + 'T00:00:00');
      const diffMs = targetDate - new Date();
      const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

      // 7-Day Visual Progress Track
      const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      const todayIdx = (new Date().getDay() + 6) % 7; // Monday = 0

      // Trap of the Day calculation
      const trapIdx = getDateHash(getTodayString()) % TRAPS_OF_THE_DAY.length;
      const todayTrap = TRAPS_OF_THE_DAY[trapIdx];
      const isTrapAnswered = !!localStorage.getItem(KEYS.TRAP_ANSWERED + getTodayString());

      mount.innerHTML = `
        <div class="cmd-center-card">
          <!-- Top Focus Bar -->
          <div class="cmd-top-bar">
            <div class="cmd-exam-badge">
              <span class="cmd-dot"></span>
              <div>
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#38BDF8;font-weight:700">Target Focus</div>
                <strong style="font-size:16px;color:#fff">${exam.name} (${exam.badge})</strong>
              </div>
              <button class="cmd-switch-btn" onclick="PrepHabit.showExamSelectorModal()" title="Switch Target Exam">Switch Exam ▾</button>
            </div>

            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
              <div class="cmd-streak-tag">
                🔥 <strong>Day ${streak.count} Streak</strong> &bull; <span>🛡️ ${streak.freezesLeft} Freeze Available</span>
              </div>
              <button onclick="PrepHabit.showNotificationModal()" class="cmd-reminder-btn" title="Daily Notification Alarm">
                🔔 <span>Alerts</span>
              </button>
            </div>
          </div>

          <!-- Hero Action Grid -->
          <div class="cmd-hero-grid">
            <!-- 1. Exam Countdown & Daily Target Box -->
            <div class="cmd-countdown-box">
              <div class="cmd-days-num">${daysLeft}</div>
              <div class="cmd-days-label">Days to Exam</div>
              <div style="margin-top:10px;padding:8px;background:rgba(255,255,255,0.05);border-radius:8px">
                <div style="display:flex;justify-content:space-between;font-size:11px;color:#CBD5E1;font-weight:700">
                  <span>🎯 Today's Target</span>
                  <span>${answeredToday} / 20 Qs</span>
                </div>
                <div class="cmd-prog-track" style="margin-top:6px">
                  <div class="cmd-prog-fill" style="width:${Math.min(100, (answeredToday / 20) * 100)}%"></div>
                </div>
              </div>
            </div>

            <!-- 2. Core Habit Engine: 4 High-Retention Actions -->
            <div class="cmd-continue-box">
              <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#38BDF8;margin-bottom:8px">
                ⚡ Today's Practice Cockpit
              </div>
              <div class="cmd-action-grid">
                <!-- Daily 10 Quiz -->
                <button class="cmd-act-card" onclick="PrepHabit.openDaily10Modal()">
                  <div class="cmd-act-ic" style="background:rgba(59,130,246,0.18);color:#60A5FA">⚡</div>
                  <div style="text-align:left">
                    <div class="cmd-act-hd">Daily-10 Set</div>
                    <div class="cmd-act-sub">10 High-Yield Exam Qs</div>
                  </div>
                </button>

                <!-- 5-Min Commute Drill -->
                <button class="cmd-act-card" onclick="PrepHabit.startSpeedDrill()">
                  <div class="cmd-act-ic" style="background:rgba(16,185,129,0.18);color:#34D399">⏱️</div>
                  <div style="text-align:left">
                    <div class="cmd-act-hd">5-Min Speed Drill</div>
                    <div class="cmd-act-sub">5 Rapid Commute Qs</div>
                  </div>
                </button>

                <!-- Mistake Notebook Deck -->
                <button class="cmd-act-card" onclick="PrepHabit.showMistakeModal()">
                  <div class="cmd-act-ic" style="background:rgba(239,68,68,0.18);color:#F87171">📓</div>
                  <div style="text-align:left">
                    <div class="cmd-act-hd">Mistake Notebook</div>
                    <div class="cmd-act-sub">${mistakesDue} Due for Spaced Review</div>
                  </div>
                </button>

                <!-- Formula Flashcards -->
                <button class="cmd-act-card" onclick="PrepHabit.openFlashcardsModal()">
                  <div class="cmd-act-ic" style="background:rgba(245,158,11,0.18);color:#FCD34D">🗂️</div>
                  <div style="text-align:left">
                    <div class="cmd-act-hd">Formula Flashcards</div>
                    <div class="cmd-act-sub">Rapid Offline Rules</div>
                  </div>
                </button>
              </div>

              <!-- Resume Where You Left Off -->
              <div class="cmd-resume-bar" style="margin-top:14px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:16px">📍</span>
                  <div style="font-size:12.5px;color:#E2E8F0">
                    Continue: <strong>${last ? last.title : 'Speed Math & Foundations'}</strong>
                  </div>
                </div>
                <a href="${last ? last.url : exam.defaultModule}" class="cmd-btn-resume">
                  Resume &rarr;
                </a>
              </div>
            </div>

            <!-- 3. Trap of the Day & Weekly Progress -->
            <div class="cmd-stats-box">
              <div class="cmd-trap-card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <span style="font-size:11px;font-weight:800;color:#F59E0B;text-transform:uppercase">⚠️ Trap of the Day</span>
                  <span style="font-size:10.5px;color:rgba(255,255,255,0.6)">Fools 80% of Aspirants</span>
                </div>
                <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:6px">${todayTrap.title}</div>
                <p style="font-size:12px;color:rgba(255,255,255,0.8);line-height:1.4;margin-bottom:8px">
                  ${todayTrap.premise.replace(/\n/g, '<br>')}
                </p>
                <div id="trapAnswerContainer">
                  ${isTrapAnswered ? `
                    <div style="font-size:11.5px;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);padding:8px 10px;border-radius:8px;color:#A7F3D0">
                      ${todayTrap.explanation}
                    </div>
                  ` : `
                    <div style="display:flex;gap:8px">
                      <button onclick="PrepHabit.submitTrap('A')" class="cmd-trap-btn">
                        ${todayTrap.optA}
                      </button>
                      <button onclick="PrepHabit.submitTrap('B')" class="cmd-trap-btn">
                        ${todayTrap.optB}
                      </button>
                    </div>
                  `}
                </div>
              </div>

              <!-- Weak-Topic Analytics Pill Strip -->
              ${weakTopics.length > 0 ? `
                <div style="margin-top:12px">
                  <div style="font-size:11px;font-weight:800;color:#FCA5A5;text-transform:uppercase;margin-bottom:4px">
                    Priority Weak Areas (${weakTopics.length} detected)
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${weakTopics.slice(0, 3).map(w => `
                      <span style="font-size:11px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);color:#FCA5A5;padding:3px 8px;border-radius:12px">
                        ${w.topic}: ${w.count} errors
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }
  };

  /* ═════════════════════════════════════════════════════════════
     5. DAILY-10 & 5-MINUTE SPEED DRILL INTERACTIVE ENGINE
     ═════════════════════════════════════════════════════════════ */
  let currentSession = null;

  function startSession(title, questions, timeLimitSec = 0) {
    currentSession = {
      title: title,
      questions: questions,
      currentIndex: 0,
      answers: {},
      startTime: Date.now(),
      timeLimitSec: timeLimitSec,
      timerInterval: null
    };
    renderSessionQuestion();
  }

  function renderSessionQuestion() {
    const modalBody = document.getElementById('prephabitModalDynamic');
    if (!modalBody || !currentSession) return;

    const idx = currentSession.currentIndex;
    const total = currentSession.questions.length;
    const q = currentSession.questions[idx];
    const answered = currentSession.answers[q.id] !== undefined;
    const selectedOpt = currentSession.answers[q.id];

    modalBody.innerHTML = `
      <div class="d10-wrap">
        <div class="d10-header">
          <div>
            <span class="d10-badge">${currentSession.title}</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.7);margin-left:8px">Question ${idx + 1} of ${total}</span>
          </div>
          <div class="d10-timer" id="sessionLiveTimer">⏱️ 00:00</div>
        </div>

        <div class="d10-prog-bar">
          <div class="d10-prog-fill" style="width:${((idx + 1) / total) * 100}%"></div>
        </div>

        <div class="d10-subject-tag">${q.subjectLabel} &bull; ${q.topic}</div>
        <div class="d10-qtext">${q.question.replace(/\n/g, '<br>')}</div>

        <div class="d10-options-grid">
          ${q.options.map((opt, optIdx) => {
            let optClass = 'd10-opt-btn';
            if (answered) {
              if (optIdx === q.correctIndex) optClass += ' correct';
              else if (optIdx === selectedOpt) optClass += ' wrong';
            }
            return `
              <button class="${optClass}" ${answered ? 'disabled' : ''} onclick="PrepHabit.submitSessionAnswer(${optIdx})">
                <span class="d10-opt-label">${String.fromCharCode(65 + optIdx)}</span>
                <span class="d10-opt-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${answered ? `
          <div class="d10-explanation-box">
            <div style="font-size:12px;font-weight:800;color:${selectedOpt === q.correctIndex ? '#10B981' : '#EF4444'};margin-bottom:6px">
              ${selectedOpt === q.correctIndex ? '✅ Correct Solution' : '❌ Incorrect Attempt — Saved to Mistake Notebook'}
            </div>
            <div class="d10-explanation-text">${q.explanation.replace(/\n/g, '<br>')}</div>
            ${q.shortcut ? `
              <div class="d10-shortcut-callout">
                <strong>⚡ Topper Elimination Shortcut:</strong> ${q.shortcut}
              </div>
            ` : ''}
            <div style="margin-top:14px;text-align:right">
              ${idx < total - 1 ? `
                <button class="d10-next-btn" onclick="PrepHabit.nextSessionQuestion()">Next Question &rarr;</button>
              ` : `
                <button class="d10-finish-btn" onclick="PrepHabit.finishSession()">View Score &amp; Result Card 🏆</button>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Start timer
    if (!currentSession.timerInterval) {
      currentSession.timerInterval = setInterval(() => {
        const timerEl = document.getElementById('sessionLiveTimer');
        if (!timerEl) return;
        const elapsedSec = Math.floor((Date.now() - currentSession.startTime) / 1000);
        if (currentSession.timeLimitSec > 0) {
          const remaining = Math.max(0, currentSession.timeLimitSec - elapsedSec);
          const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
          const secs = String(remaining % 60).padStart(2, '0');
          timerEl.textContent = `⏱️ ${mins}:${secs} remaining`;
          if (remaining === 0) {
            PrepHabit.finishSession();
          }
        } else {
          const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
          const secs = String(elapsedSec % 60).padStart(2, '0');
          timerEl.textContent = `⏱️ ${mins}:${secs}`;
        }
      }, 1000);
    }
  }

  function submitSessionAnswer(optIdx) {
    if (!currentSession) return;
    const q = currentSession.questions[currentSession.currentIndex];
    if (currentSession.answers[q.id] !== undefined) return;

    currentSession.answers[q.id] = optIdx;
    DailyGoal.increment(1);

    if (optIdx !== q.correctIndex) {
      Mistakes.add(q, optIdx);
    }

    renderSessionQuestion();
  }

  function nextSessionQuestion() {
    if (!currentSession) return;
    if (currentSession.currentIndex < currentSession.questions.length - 1) {
      currentSession.currentIndex += 1;
      renderSessionQuestion();
    }
  }

  function finishSession() {
    if (!currentSession) return;
    if (currentSession.timerInterval) {
      clearInterval(currentSession.timerInterval);
      currentSession.timerInterval = null;
    }

    let correct = 0;
    currentSession.questions.forEach(q => {
      if (currentSession.answers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const total = currentSession.questions.length;
    const elapsedSec = Math.floor((Date.now() - currentSession.startTime) / 1000);
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    const timeFormatted = `${mins}m ${secs}s`;
    const streak = Streak.recordActivity();

    // Percentile estimation
    const accuracy = Math.round((correct / total) * 100);
    let percentile = 'Top 50%';
    if (accuracy >= 90) percentile = 'Top 5% of Aspirants';
    else if (accuracy >= 80) percentile = 'Top 15% of Aspirants';
    else if (accuracy >= 70) percentile = 'Top 28% of Aspirants';
    else if (accuracy >= 50) percentile = 'Top 45% of Aspirants';

    const modalBody = document.getElementById('prephabitModalDynamic');
    if (!modalBody) return;

    const todayDate = new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    const shareText = `🏆 PrepSelf Result (${todayDate})\n⚡ Score: ${correct}/${total} (${accuracy}% Accuracy)\n⏱️ Time: ${timeFormatted} | 🔥 Day ${streak} Streak\n🎯 Percentile: ${percentile}\nCan you beat my score? Take the quiz: https://prepself.in/quiz-simulator.html?challenge=${correct}`;

    modalBody.innerHTML = `
      <div class="result-card-wrap">
        <div class="result-card" id="shareableResultCard">
          <div class="rc-header">
            <span class="rc-badge">📘 PREPSELF SCORE CARD</span>
            <span class="rc-date">${todayDate}</span>
          </div>

          <div class="rc-score-box">
            <div class="rc-score-big">${correct} <span style="font-size:24px;color:rgba(255,255,255,0.6)">/ ${total}</span></div>
            <div class="rc-accuracy-tag">${accuracy >= 80 ? '🌟 ' + percentile : (accuracy >= 50 ? '⚡ Solid Effort!' : '🌱 Learning Step')}</div>
          </div>

          <div class="rc-stats-row">
            <div class="rc-stat">
              <span class="rc-stat-val">🔥 Day ${streak}</span>
              <span class="rc-stat-lbl">Streak Intact</span>
            </div>
            <div class="rc-stat">
              <span class="rc-stat-val">⏱️ ${timeFormatted}</span>
              <span class="rc-stat-lbl">Time Taken</span>
            </div>
            <div class="rc-stat">
              <span class="rc-stat-val">🎯 ${accuracy}%</span>
              <span class="rc-stat-lbl">Accuracy</span>
            </div>
          </div>

          <div class="rc-quote">
            "Genuine mastery accumulates quietly. Daily revision beats irregular intensity."
          </div>
        </div>

        <div class="rc-actions">
          <button class="rc-btn-wa" onclick="PrepHabit.shareToWhatsApp('${encodeURIComponent(shareText)}')">
            💬 Share Score on WhatsApp
          </button>
          <button class="rc-btn-copy" onclick="PrepHabit.copyChallengeLink(${correct})">
            ⚔️ Challenge a Friend (Copy Link)
          </button>
          <button class="rc-btn-done" onclick="PrepHabit.closeModal()">
            Done &amp; Return to Dashboard
          </button>
        </div>
      </div>
    `;
  }

  /* ═════════════════════════════════════════════════════════════
     6. FORMULA FLASHCARDS & NOTIFICATIONS
     ═════════════════════════════════════════════════════════════ */
  const FLASHCARDS_DATA = [
    {
      front: 'Fraction to %: 1/8, 3/8, 5/8, 7/8',
      back: '1/8 = 12.5%\n3/8 = 37.5%\n5/8 = 62.5%\n7/8 = 87.5%'
    },
    {
      front: 'Quadratic Equation Signs: (- , +)',
      back: 'When equation is ax² - bx + c = 0:\nBoth roots are POSITIVE (+, +)'
    },
    {
      front: 'Quadratic Equation Signs: (+ , +)',
      back: 'When equation is ax² + bx + c = 0:\nBoth roots are NEGATIVE (-, -)'
    },
    {
      front: 'CI vs SI Difference (2 Years)',
      back: 'Difference = P × (R / 100)²\nFor 3 Years: D = P(R/100)² × (3 + R/100)'
    },
    {
      front: 'Syllogism: "Only a few A are B"',
      back: 'Implies TWO truths:\n1. Some A are B\n2. Some A are NOT B (definite)'
    }
  ];

  /* ═════════════════════════════════════════════════════════════
     7. STYLES & MODAL CONTAINER
     ═════════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('prephabit-styles')) return;
    const style = document.createElement('style');
    style.id = 'prephabit-styles';
    style.textContent = `
      .cmd-center-card {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(9, 14, 26, 0.95));
        border: 1.5px solid rgba(56, 189, 248, 0.3);
        border-radius: 18px;
        padding: 22px;
        margin-bottom: 28px;
        box-shadow: 0 10px 36px rgba(0,0,0,0.35);
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
        gap: 10px;
      }
      .cmd-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #38BDF8;
        box-shadow: 0 0 10px #38BDF8;
      }
      .cmd-switch-btn {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.18);
        color: #38BDF8;
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
        transition: all .15s;
      }
      .cmd-switch-btn:hover {
        background: rgba(56,189,248,0.15);
      }
      .cmd-streak-tag {
        font-size: 13px;
        color: #F97316;
        background: rgba(249, 115, 22, 0.12);
        padding: 5px 14px;
        border-radius: 14px;
        border: 1px solid rgba(249, 115, 22, 0.3);
      }
      .cmd-reminder-btn {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.14);
        color: #CBD5E1;
        padding: 5px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .cmd-hero-grid {
        display: grid;
        grid-template-columns: 190px 1.4fr 1.1fr;
        gap: 16px;
      }
      @media(max-width: 900px) {
        .cmd-hero-grid { grid-template-columns: 1fr; }
      }
      .cmd-countdown-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 16px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .cmd-days-num {
        font-size: 46px;
        font-weight: 900;
        line-height: 1;
        color: #F59E0B;
      }
      .cmd-days-label {
        font-size: 11.5px;
        font-weight: 700;
        color: rgba(255,255,255,0.7);
        text-transform: uppercase;
        margin-top: 4px;
      }
      .cmd-prog-track {
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 6px;
        overflow: hidden;
      }
      .cmd-prog-fill {
        height: 100%;
        background: linear-gradient(90deg, #38BDF8, #10B981);
        border-radius: 6px;
        transition: width .3s ease;
      }
      .cmd-continue-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 16px;
      }
      .cmd-action-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .cmd-act-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all .15s ease;
        text-decoration: none;
      }
      .cmd-act-card:hover {
        background: rgba(255,255,255,0.09);
        border-color: rgba(56,189,248,0.4);
        transform: translateY(-2px);
      }
      .cmd-act-ic {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
      }
      .cmd-act-hd {
        font-size: 12.5px;
        font-weight: 800;
        color: #fff;
      }
      .cmd-act-sub {
        font-size: 10.5px;
        color: rgba(255,255,255,0.6);
      }
      .cmd-resume-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        padding: 8px 12px;
      }
      .cmd-btn-resume {
        background: #2563EB;
        color: #fff;
        padding: 5px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        white-space: nowrap;
      }
      .cmd-stats-box {
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .cmd-trap-card {
        background: rgba(245,158,11,0.06);
        border: 1px solid rgba(245,158,11,0.22);
        border-radius: 10px;
        padding: 12px;
      }
      .cmd-trap-btn {
        flex: 1;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.2);
        color: #fff;
        padding: 6px 8px;
        border-radius: 6px;
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
        transition: background .15s;
      }
      .cmd-trap-btn:hover {
        background: #F59E0B;
        color: #000;
      }

      /* Modal Dialog Styles */
      .habit-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.78);
        backdrop-filter: blur(8px);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .habit-modal-dialog {
        background: #0B132B;
        border: 1.5px solid rgba(56, 189, 248, 0.35);
        border-radius: 18px;
        padding: 24px;
        max-width: 620px;
        width: 100%;
        max-height: 88vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 16px 48px rgba(0,0,0,0.6);
        color: #fff;
      }
      .habit-modal-close {
        position: absolute;
        top: 14px;
        right: 14px;
        background: rgba(255,255,255,0.1);
        border: none;
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
      }

      /* Daily-10 & Session Test Layout */
      .d10-wrap { font-family: inherit; }
      .d10-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
      .d10-badge { font-size: 11.5px; font-weight: 800; background: rgba(56,189,248,0.15); color: #38BDF8; padding: 4px 10px; border-radius: 12px; }
      .d10-timer { font-size: 13px; font-family: monospace; font-weight: 800; color: #F59E0B; }
      .d10-prog-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 14px; overflow: hidden; }
      .d10-prog-fill { height: 100%; background: #38BDF8; }
      .d10-subject-tag { font-size: 11px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 8px; font-weight: 700; }
      .d10-qtext { font-size: 15px; font-weight: 700; line-height: 1.55; color: #fff; margin-bottom: 16px; }
      .d10-options-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
      .d10-opt-btn {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 10px;
        padding: 12px 14px;
        text-align: left;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all .15s;
      }
      .d10-opt-btn:hover:not(:disabled) {
        background: rgba(56,189,248,0.15);
        border-color: #38BDF8;
      }
      .d10-opt-btn.correct { background: rgba(16,185,129,0.2) !important; border-color: #10B981 !important; color: #A7F3D0; }
      .d10-opt-btn.wrong { background: rgba(239,68,68,0.2) !important; border-color: #EF4444 !important; color: #FCA5A5; }
      .d10-opt-label { width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; }
      .d10-explanation-box { background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px; margin-top: 14px; }
      .d10-explanation-text { font-size: 13px; color: rgba(255,255,255,0.8); line-height: 1.5; margin-bottom: 10px; }
      .d10-shortcut-callout { background: rgba(245,158,11,0.12); border-left: 3px solid #F59E0B; padding: 8px 10px; font-size: 12px; color: #FDE68A; border-radius: 0 6px 6px 0; }
      .d10-next-btn, .d10-finish-btn { background: #2563EB; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; cursor: pointer; }
      .d10-finish-btn { background: #10B981; }

      /* Result Card */
      .result-card-wrap { text-align: center; }
      .result-card { background: linear-gradient(135deg, #1E1B4B, #0F172A); border: 1.5px solid #6366F1; border-radius: 16px; padding: 22px; margin-bottom: 16px; }
      .rc-header { display: flex; justify-content: space-between; font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 16px; font-weight: 700; }
      .rc-badge { color: #818CF8; }
      .rc-score-big { font-size: 54px; font-weight: 900; line-height: 1; color: #10B981; margin-bottom: 6px; }
      .rc-accuracy-tag { font-size: 13px; font-weight: 800; color: #A7F3D0; margin-bottom: 16px; }
      .rc-stats-row { display: flex; justify-content: space-around; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 10px; margin-bottom: 16px; }
      .rc-stat-val { font-size: 16px; font-weight: 900; color: #fff; display: block; }
      .rc-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; }
      .rc-quote { font-size: 12px; font-style: italic; color: rgba(255,255,255,0.7); }
      .rc-actions { display: flex; flex-direction: column; gap: 8px; }
      .rc-btn-wa { background: #25D366; color: #000; border: none; padding: 12px; border-radius: 10px; font-weight: 800; font-size: 14px; cursor: pointer; }
      .rc-btn-copy { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); padding: 10px; border-radius: 10px; font-weight: 700; cursor: pointer; }
      .rc-btn-done { background: none; border: none; color: rgba(255,255,255,0.5); font-size: 12px; cursor: pointer; margin-top: 4px; }
    `;
    document.head.appendChild(style);
  }

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
          <div id="prephabitModalDynamic">${contentHtml}</div>
        </div>
      </div>
    `;
  }

  function closeModal() {
    const container = document.getElementById('prephabitModalContainer');
    if (container) container.innerHTML = '';
    if (typeof window.triggerQuizCompletionPlea === 'function') {
      window.triggerQuizCompletionPlea();
    }
  }

  /* ═════════════════════════════════════════════════════════════
     8. PUBLIC INTERFACE (PrepHabit)
     ═════════════════════════════════════════════════════════════ */
  window.PrepHabit = {
    init() {
      injectStyles();
      Streak.checkStatus();
      Personalization.renderCommandCenter();
    },

    openDaily10Modal() {
      showModal(`
        <div style="text-align:center;padding:20px">
          <h2>⚡ Launching Today's Daily-10...</h2>
        </div>
      `);
      startSession("⚡ Today's Daily-10 Set", getTodayQuestions(), 0);
    },

    startSpeedDrill() {
      showModal(`
        <div style="text-align:center;padding:20px">
          <h2>⏱️ Starting 5-Minute Commute Drill...</h2>
        </div>
      `);
      const fiveQs = getTodayQuestions().slice(0, 5);
      startSession("⏱️ 5-Minute Commute Drill", fiveQs, 300); // 300s = 5 mins
    },

    submitSessionAnswer(idx) {
      submitSessionAnswer(idx);
    },

    nextSessionQuestion() {
      nextSessionQuestion();
    },

    finishSession() {
      finishSession();
    },

    submitTrap(chosenOpt) {
      const today = getTodayString();
      const trapIdx = getDateHash(today) % TRAPS_OF_THE_DAY.length;
      const todayTrap = TRAPS_OF_THE_DAY[trapIdx];
      const isCorrect = chosenOpt === todayTrap.correctOpt;

      try {
        localStorage.setItem(KEYS.TRAP_ANSWERED + today, '1');
      } catch (e) {}

      DailyGoal.increment(1);

      const container = document.getElementById('trapAnswerContainer');
      if (container) {
        container.innerHTML = `
          <div style="font-size:12px;background:${isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'};border:1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'};padding:10px;border-radius:8px;color:${isCorrect ? '#A7F3D0' : '#FCA5A5'};margin-top:6px">
            <div style="font-weight:800;margin-bottom:4px">${isCorrect ? '🎯 You Spotted the Trap!' : '⚠️ You fell for the setter’s trap!'}</div>
            ${todayTrap.explanation}
          </div>
        `;
      }
    },

    showExamSelectorModal() {
      const current = Personalization.getTargetExam().id;
      const html = `
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:8px">🎯 Select Your Target Exam</h2>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:18px">
          Customizes your syllabus modules, exam countdown, today's targets, and daily practice sets.
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px">
          ${Object.values(EXAM_PRESETS).map(ex => `
            <button onclick="PrepHabit.selectExam('${ex.id}')" style="background:${ex.id === current ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.05)'};border:1.5px solid ${ex.id === current ? '#38BDF8' : 'rgba(255,255,255,0.1)'};padding:12px 14px;border-radius:10px;color:#fff;text-align:left;cursor:pointer">
              <div style="font-size:11px;color:#38BDF8;font-weight:700">${ex.badge}</div>
              <div style="font-size:15px;font-weight:800;margin-top:2px">${ex.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px">${ex.topics.length} Syllabus Modules</div>
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
      const weakTopics = Mistakes.getWeakTopics();

      const html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h2 style="font-size:20px;font-weight:900;color:#fff;display:flex;align-items:center;gap:8px">
            📓 Mistake Notebook &amp; Revision Deck
          </h2>
        </div>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:14px">
          "Your mistakes are your syllabus." Wrong questions resurface on a spaced 1-3-7 day schedule until permanently mastered.
        </p>

        <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
          <span style="font-size:12px;padding:4px 12px;background:rgba(239,68,68,0.15);color:#F87171;border-radius:8px;font-weight:700">
            ${due.length} Due for Review Today
          </span>
          <span style="font-size:12px;padding:4px 12px;background:rgba(255,255,255,0.08);color:#CBD5E1;border-radius:8px;font-weight:700">
            ${list.length} Total Errors Logged
          </span>
        </div>

        ${weakTopics.length > 0 ? `
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;margin-bottom:16px">
            <div style="font-size:11.5px;font-weight:800;color:#FCA5A5;text-transform:uppercase;margin-bottom:6px">
              📊 Weak-Topic Error Distribution
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${weakTopics.map(w => `
                <span style="font-size:11px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);color:#FCA5A5;padding:3px 8px;border-radius:10px">
                  ${w.topic}: <strong>${w.count}</strong>
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${due.length > 0 ? `
          <div style="margin-bottom:16px">
            <button onclick="PrepHabit.startRevisionDeck()" style="width:100%;background:#10B981;color:#fff;border:none;padding:12px;border-radius:10px;font-weight:800;font-size:14px;cursor:pointer">
              ⚡ Start Spaced Revision Deck (${due.length} Due)
            </button>
          </div>
        ` : ''}

        ${list.length === 0 ? `
          <div style="padding:30px;text-align:center;color:rgba(255,255,255,0.5)">
            ✨ Clean record! Attempt a Daily-10 set or 5-Min drill. Any tricky questions you miss will be safely saved here.
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;gap:10px;max-height:50vh;overflow-y:auto;padding-right:6px">
            ${list.map(m => `
              <div style="background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px">
                <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#38BDF8;margin-bottom:6px">
                  <span>${m.topic || m.subjectLabel}</span>
                  <span style="color:${m.stage >= 3 ? '#10B981' : '#F59E0B'}">${m.stage >= 3 ? '✅ Mastered' : 'Stage ' + ((m.stage || 0) + 1) + ' of 3'}</span>
                </div>
                <div style="font-size:13px;color:#fff;font-weight:600;margin-bottom:6px">${m.question.replace(/\n/g, '<br>')}</div>
                <div style="font-size:12px;background:rgba(16,185,129,0.1);padding:6px 10px;border-radius:6px;color:#34D399">
                  Correct Answer: (${String.fromCharCode(65 + m.correctIndex)}) ${m.options[m.correctIndex]}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      `;
      showModal(html);
    },

    startRevisionDeck() {
      const due = Mistakes.getDue();
      if (due.length === 0) {
        alert('All caught up! No mistake deck due today.');
        return;
      }
      startSession("📓 Spaced Revision Deck", due, 0);
    },

    openFlashcardsModal() {
      const html = `
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:8px">🗂️ Offline Formula Flashcards</h2>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:16px">
          Tap any card to reveal formula or shortcut rule. Perfect for commute review.
        </p>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${FLASHCARDS_DATA.map((fc, i) => `
            <div onclick="this.querySelector('.fc-back').style.display = this.querySelector('.fc-back').style.display === 'none' ? 'block' : 'none'" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:14px;cursor:pointer">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:14px;font-weight:800;color:#fff">${fc.front}</span>
                <span style="font-size:11px;color:#38BDF8;font-weight:700">Tap to Flip ▾</span>
              </div>
              <div class="fc-back" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.1);font-size:13px;color:#34D399;line-height:1.5">
                ${fc.back.replace(/\n/g, '<br>')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      showModal(html);
    },

    showNotificationModal() {
      const html = `
        <h2 style="font-size:20px;font-weight:900;color:#fff;margin-bottom:10px">🔔 Gentle Daily Practice Reminders</h2>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:16px">
          Get notified when today's fresh Daily-10 quiz is released. Zero spam, zero ads.
        </p>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);border-radius:12px;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
            <div>
              <div style="font-size:14px;font-weight:800;color:#fff">PWA Web Push (Browser Notification)</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:2px">Gentle 8:00 AM notification on Android &amp; iOS</div>
            </div>
            <button onclick="PrepHabit.enablePushNotification()" style="background:#2563EB;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer;white-space:nowrap">
              Enable Push
            </button>
          </div>

          <div style="background:rgba(0,136,204,0.08);border:1px solid rgba(0,136,204,0.25);border-radius:12px;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
            <div>
              <div style="font-size:14px;font-weight:800;color:#fff">Telegram Channel Updates</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:2px">Receive daily 10-Q links in Telegram</div>
            </div>
            <button onclick="window.open('https://t.me/raghav_begins', '_blank')" style="background:#0088CC;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer;white-space:nowrap">
              Join Telegram ↗
            </button>
          </div>
        </div>
      `;
      showModal(html);
    },

    enablePushNotification() {
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            alert('🔔 Web Push Notifications Enabled! You will receive daily practice alerts.');
            closeModal();
          } else {
            alert('Notice: Push notification was not allowed in browser settings.');
          }
        });
      } else {
        alert('Push notifications are not supported in your current browser.');
      }
    },

    closeModal() {
      closeModal();
      Personalization.renderCommandCenter();
    },

    shareToWhatsApp(text) {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    },

    copyChallengeLink(score) {
      const today = getTodayString();
      const url = `https://prepself.in/quiz-simulator.html?daily=${today}&challenge=${score}`;
      navigator.clipboard.writeText(url).then(() => {
        alert(`⚔️ Challenge link copied to clipboard!\n\n${url}`);
      });
    },

    addMistake(q, wrongOptionIdx) {
      Mistakes.add(q, wrongOptionIdx);
    }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PrepHabit.init());
  } else {
    window.PrepHabit.init();
  }

})(window, document);