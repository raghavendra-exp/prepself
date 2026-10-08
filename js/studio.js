/* Live AI Study Prompt Studio Playground
   Interactive real-time prompt customizer with on-site interactive testing
   and optional external AI export */

const PromptStudio = (() => {
  const EXAMS = [
    { id: 'sbi_po', name: 'SBI PO / IBPS PO (Banking)', category: 'Banking' },
    { id: 'sbi_clerk', name: 'SBI Clerk / IBPS Clerk (Banking)', category: 'Banking' },
    { id: 'rbi_b', name: 'RBI Grade B / SEBI / NABARD', category: 'Banking' },
    { id: 'upsc_pre', name: 'UPSC CSE Prelims (Civil Services)', category: 'UPSC' },
    { id: 'upsc_mains', name: 'UPSC CSE Mains GS (Civil Services)', category: 'UPSC' },
    { id: 'ssc_cgl', name: 'SSC CGL / CHSL (Staff Selection)', category: 'SSC' },
    { id: 'rrb_ntpc', name: 'Railway RRB NTPC / Group D', category: 'Railway' },
    { id: 'nda_cds', name: 'Defence (NDA / CDS / AFCAT)', category: 'Defence' },
    { id: 'cat_mba', name: 'CAT / XAT (MBA Entrance)', category: 'Management' },
    { id: 'clat_law', name: 'CLAT / AILET (Law Entrance)', category: 'Law' },
    { id: 'gate_eng', name: 'GATE & PSU (Engineering)', category: 'Engineering' }
  ];

  const TOPICS = [
    { id: 'quant', name: 'Quantitative Aptitude & Data Interpretation' },
    { id: 'reasoning', name: 'Logical Reasoning, Syllogisms & Puzzles' },
    { id: 'english', name: 'English Language, Vocab & Reading Comprehension' },
    { id: 'current_affairs', name: 'Banking Awareness & Current Affairs' },
    { id: 'full_mock', name: 'Full Mock Test & Diagnostic Evaluation' }
  ];

  const GOALS = [
    { id: 'mcqs', name: '10 High-Yield Exam MCQs with Step-by-Step Solutions & Elimination Tricks' },
    { id: 'study_plan', name: '7-Day Intensive Topic Mastery Schedule (Hour-by-Hour)' },
    { id: 'cheat_sheet', name: 'High-Yield Formula & Shortcut Cheat Sheet with Exam Traps' },
    { id: 'concept_metaphor', name: 'Breakdown Difficult Concepts using Everyday Real-Life Metaphors' },
    { id: 'socratic_tutor', name: 'Act as a Strict Senior Examiner and Interrogate my Knowledge' }
  ];

  function buildPrompt(examId, topicId, goalId, difficulty) {
    const examObj = EXAMS.find(e => e.id === examId) || EXAMS[0];
    const topicObj = TOPICS.find(t => t.id === topicId) || TOPICS[0];
    const goalObj = GOALS.find(g => g.id === goalId) || GOALS[0];

    return `Act as an expert competitive exam mentor and senior evaluator specializing in ${examObj.name}.

I am preparing for ${examObj.name} and my focus today is: ${topicObj.name}.
Target Difficulty Level: ${difficulty.toUpperCase()}.

PRIMARY OBJECTIVE:
${goalObj.name}.

STRICT INSTRUCTIONS FOR THE OUTPUT:
1. Ground all questions, explanations, and strategies strictly in the latest exam pattern of ${examObj.name}.
2. If generating practice questions: provide 5 distinct options (A, B, C, D, E), highlight the correct answer, explain the step-by-step logic, and provide the exact "mental shortcut" or elimination technique used by toppers to solve it in under 45 seconds.
3. Call out common traps, misleading wording, and typical calculation mistakes aspirants make on this specific topic.
4. Conclude with a 1-minute speed-revision summary checklist.

Begin now with clear formatting, bold key takeaways, and zero filler text.`;
  }

  function update() {
    const examSelect = document.getElementById('studioExamSelect');
    const topicSelect = document.getElementById('studioTopicSelect');
    const goalSelect = document.getElementById('studioGoalSelect');
    const diffSelect = document.getElementById('studioDiffSelect');
    const textarea = document.getElementById('studioPromptText');

    if (!examSelect || !topicSelect || !goalSelect || !diffSelect || !textarea) return;

    const prompt = buildPrompt(examSelect.value, topicSelect.value, goalSelect.value, diffSelect.value);
    textarea.value = prompt;
  }

  function copyPrompt() {
    const textarea = document.getElementById('studioPromptText');
    if (!textarea) return;

    textarea.select();
    navigator.clipboard.writeText(textarea.value).then(() => {
      if (window.showToast) {
        window.showToast('AI Prompt copied to clipboard!');
      } else {
        alert('Prompt copied to clipboard!');
      }
    });
  }

  function practiceOnSite() {
    if (window.PrepHabit && typeof window.PrepHabit.openDaily10Modal === 'function') {
      window.PrepHabit.openDaily10Modal();
    } else {
      window.location.href = 'quiz-simulator.html';
    }
  }

  function openExternalAI(platform) {
    copyPrompt();
    if (platform === 'chatgpt') window.open('https://chatgpt.com/', '_blank');
    else if (platform === 'claude') window.open('https://claude.ai/new', '_blank');
    else if (platform === 'gemini') window.open('https://gemini.google.com/app', '_blank');
  }

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="studio-card reveal in">
        <div class="studio-hd">
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var(--pr2); background:rgba(99,102,241,0.1); padding:4px 10px; border-radius:20px; display:inline-block; margin-bottom:8px;">
            ⚡ On-Site AI Practice &bull; 100% Free
          </span>
          <h3>AI Study Prompt Studio Playground</h3>
          <p>Practice calibrated questions directly inside PrepSelf, or copy custom prompts for external AI tools.</p>
        </div>

        <div class="studio-controls">
          <div class="studio-group">
            <label for="studioExamSelect">1. Select Target Exam</label>
            <select id="studioExamSelect" class="studio-select" onchange="PromptStudio.update()">
              ${EXAMS.map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
            </select>
          </div>

          <div class="studio-group">
            <label for="studioTopicSelect">2. Focus Subject / Topic</label>
            <select id="studioTopicSelect" class="studio-select" onchange="PromptStudio.update()">
              ${TOPICS.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
          </div>

          <div class="studio-group">
            <label for="studioGoalSelect">3. Desired Learning Goal</label>
            <select id="studioGoalSelect" class="studio-select" onchange="PromptStudio.update()">
              ${GOALS.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
            </select>
          </div>

          <div class="studio-group">
            <label for="studioDiffSelect">4. Difficulty Level</label>
            <select id="studioDiffSelect" class="studio-select" onchange="PromptStudio.update()">
              <option value="Prelims Standard">Moderate (Prelims Level)</option>
              <option value="Mains Advanced">Tough / Advanced (Mains Level)</option>
              <option value="Foundational Concept">Foundation / Beginner Level</option>
            </select>
          </div>
        </div>

        <div class="studio-prompt-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:var(--txt3); text-transform:uppercase; letter-spacing:0.04em;">Generated Prompt (Editable)</span>
            <span style="font-size:11px; color:var(--txt3);">Ready to run</span>
          </div>
          <textarea id="studioPromptText" class="studio-textarea" rows="5"></textarea>
        </div>

        <div class="studio-actions" style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn-practice-onsite" onclick="PromptStudio.practiceOnSite()" style="flex:1; min-width:260px; background:linear-gradient(135deg,#10B981,#059669); color:#fff; border:none; padding:13px 20px; border-radius:12px; font-size:14.5px; font-weight:900; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 14px rgba(16,185,129,0.35);">
              <span>⚡ Practice Questions On-Site (Zero Login)</span>
            </button>
            <button class="btn-copy-prompt" onclick="PromptStudio.copyPrompt()" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); color:#fff; padding:13px 18px; border-radius:12px; font-size:13.5px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              <span>📋 Copy Prompt</span>
            </button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.08);">
            <span style="font-size:12px; color:var(--txt3);">Optional External Launch:</span>
            <div class="studio-launchers" style="display:flex; gap:6px;">
              <button class="launcher-btn" onclick="PromptStudio.openExternalAI('chatgpt')">ChatGPT ↗</button>
              <button class="launcher-btn" onclick="PromptStudio.openExternalAI('claude')">Claude ↗</button>
              <button class="launcher-btn" onclick="PromptStudio.openExternalAI('gemini')">Gemini ↗</button>
            </div>
          </div>
        </div>
      </div>
    `;

    update();
  }

  return { render, update, copyPrompt, practiceOnSite, openExternalAI };
})();
