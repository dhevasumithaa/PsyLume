const ANSWER_OPTIONS = [
  { label: 'Never',     value: 0 },
  { label: 'Rarely',    value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often',     value: 3 },
  { label: 'Always',    value: 4 },
];

const HELPLINES = [
  {
    name:   'Police / Ambulance / Fire',
    detail: 'All-in-one emergency services (India)',
    number: '112',
    tel: 'tel:112'
  },
  {
    name:   'National Mental Health Helpline – KIRAN',
    detail: '24/7 Rehabilitation-focused mental health aid, counseling, referrals',
    number: '1800-599-0019',
    tel: 'tel:1800-599-0019'
  },
  {
    name:   'National Tele Mental Health Programme (Tele-MANAS)',
    detail: '24/7 phone-based mental health counseling, psychotherapy, referrals',
    number: '14416',
    tel: 'tel:14416'
  },
];

const QUESTIONS = [
  /* --- Mood & Depression --- */
  { text: 'How often do you lose interest in things you usually enjoy?', cat: 'Depression' },
  { text: 'How often do you feel easily irritated or short-tempered?', cat: 'Stress' },
  { text: 'How often do you feel hurt by criticism or rejection?', cat: 'Anxiety' },
  { text: 'How often do you feel not good enough when comparing yourself to others?', cat: 'Self-esteem' },
  { text: 'Do you often look for approval from others to feel okay?', cat: 'Anxiety' },
  { text: 'How often do you push yourself to achieve more to prove your worth?', cat: 'Perfectionism' },

  /* --- Anxiety & Social --- */
  { text: 'Do you sometimes feel a sense of fear or uneasy without a clear reason?', cat: 'Anxiety' },
  { text: 'How often do daily tasks or responsibilities feel too overwhelming or unmanageable?', cat: 'Stress' },
  { text: 'Do social situations make you feel tired or want to avoid them?', cat: 'Social' },
  { text: 'Do you worry about being left or abandoned by people close to you?', cat: 'Attachment' },
  { text: 'How often do you feel jealous or competitive when others succeed?', cat: 'Social' },
  { text: 'How often do you worry about your appearance or flaws?', cat: 'Body image' },

  /* --- Emotional Awareness & Dissociation --- */
  { text: 'Do you find it hard to understand how others feel?', cat: 'Social' },
  { text: 'Do you find it difficult to understand or express your emotions?', cat: 'Emotional awareness' },
  { text: 'Do you ever feel disconnected from your surroundings or yourself?', cat: 'Dissociation' },
  { text: 'How often do you have thoughts or urges that are hard to control?', cat: 'OCD/Control' },
  { text: 'Do you feel a strong need to control or organize things?', cat: 'OCD/Control' },
  { text: 'How often do you depend on routines and feel uncomfortable with change?', cat: 'OCD/Control' },
  { text: 'Do you use daydreaming to escape from stress?', cat: 'Coping' },

  /* --- Energy, Mood & Perception --- */
  { text: 'How often do you feel tired even after resting?', cat: 'Energy' },
  { text: 'How often do you feel unusually energetic without a reason?', cat: 'Mood' },
  { text: 'Do you ever feel like others are watching or against you?', cat: 'Perception' },

  /* --- Critical / Triage Questions --- */
  { text: 'Do you sometimes feel life has no purpose or feel very hopeless?', cat: 'Depression' },
  { text: 'Do you sometimes find it hard to feel regret after hurting someone?', cat: 'Emotional awareness' },
  { text: 'Do you sometimes have thoughts about harming yourself or others?', cat: 'Crisis' },
];

const CATEGORY_DESCRIPTIONS = {
  'Depression':          'Low interest, low mood, heaviness. Try gentle activity, sunlight, and staying connected.',
  'Stress':              'Feeling overwhelmed by tasks/responsibilities. Try short breaks, prioritizing 1–2 tasks.',
  'Anxiety':             'Tension, fear, worry, sensitivity to rejection. Try breathing and grounding.',
  'Self-esteem':         'Self-criticism and comparison. Practice self-compassion and realistic goals.',
  'Perfectionism':       'Pressure to prove value. Try kinder self-talk and sustainable pacing.',
  'Social':              'Fatigue or difficulty in social interactions. Try small, safe connections.',
  'Attachment':          'Fear of being left out or abandoned. Reach out to trusted people.',
  'Body image':          'Preoccupation with appearance or flaws. Consider limiting mirror checks; focus on function.',
  'Emotional awareness': 'Numbness or difficulty expressing emotions. Try journaling and naming feelings.',
  'Dissociation':        'Feeling disconnected from self/surroundings. Try grounding with the 5‑4‑3‑2‑1 method.',
  'OCD/Control':         'Urges, rituals, strong need for control. Try delaying a ritual briefly and breathing.',
  'Coping':              'Using imagination to escape. Balance with brief grounding breaks.',
  'Energy':              'Fatigue despite rest. Gentle movement and consistent sleep can help.',
  'Mood':                'Unusually elevated energy/cheerfulness. Track patterns and sleep regularly.',
  'Perception':          'Feeling watched or targeted. Reduce stimulants; seek professional support if persistent.',
  'Crisis':              'Thoughts of harm. Use Immediate Help resources now.'
};

const RANGE_ADVICE = [
  { max: 20, label: 'Doing well',              class: 'good', tips: [
    'Keep up the habits that help (sleep, movement, hydration).',
    'Stay connected with people who make you feel safe.',
    'Do one small enjoyable activity daily.'
  ]},
  { max: 40, label: 'Mild signs of stress/anxiety', class: 'mild', tips: [
    'Try a 5‑minute breathing practice today.',
    'Schedule short breaks between tasks.',
    'Limit doomscrolling; create a calming evening routine.'
  ]},
  { max: 60, label: 'Moderate distress',       class: 'mod', tips: [
    'Talk to someone you trust about how you feel.',
    'Practice grounding (5 things you can see, 4 touch, 3 hear, 2 smell, 1 taste).',
    'Reduce workload where possible for a few days.'
  ]},
  { max: 80, label: 'High emotional strain',   class: 'high', tips: [
    'Consider speaking with a counselor/therapist.',
    'Prioritize sleep and regular meals.',
    'Avoid major decisions until you feel steadier.'
  ]},
  { max: 100, label: 'Critical concern',       class: 'crit', tips: [
    'Reach out to a professional or a helpline today.',
    'Keep a supportive person with you if possible.',
    'Use the Immediate Help button for numbers in your area.'
  ]},
];

const CRITICAL_CONDITION_RULES = [
  { key: 'Crisis',      label: 'Suicidal or harmful thoughts',                             showIf: s => s['Crisis']      >= 3 },
  { key: 'Perception',  label: 'Psychosis‑spectrum experiences (paranoia, feeling watched)', showIf: s => s['Perception']  >= 3 },
  { key: 'Dissociation',label: 'Dissociative experiences (disconnection from self/world)',  showIf: s => s['Dissociation'] >= 3 },
  { key: 'Mood',        label: 'Possible hypomanic symptoms (unusually high energy)',       showIf: s => s['Mood']        >= 3 },
  { key: 'OCD/Control', label: 'Obsessive‑compulsive features (urges/rituals)',             showIf: s => s['OCD/Control'] >= 3 },
  { key: 'Depression',  label: 'Major depressive features (low interest, hopelessness)',   showIf: s => s['Depression']  >= 6 },
];

const el      = id => document.getElementById(id);
const landing = el('landing');
const quiz    = el('quiz');
const results = el('results');
const helpModal = el('helpModal');
let savedAnswers = [];

/* Switch from landing -> quiz */
el('startBtn').onclick    = () => { landing.style.display='none'; quiz.style.display='block'; scrollTo(0,0); };

/* Switch from results -> quiz (retake) */
el('retakeBtn').onclick = () => { document.querySelectorAll('.opts input:checked').forEach(input => { input.checked = false; });

    // Reset progress bar
    progBar.style.width = '0%';
    progText.textContent = `0/${totalQs}`;

    // Hide results and show quiz
    results.style.display = 'none';
    quiz.style.display = 'block';

    // Go back to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* Switch from results -> landing */
el('backHomeBtn').onclick = () => { results.style.display='none'; landing.style.display='block'; scrollTo(0,0); };

/* All three "Immediate Help" buttons open the same modal */
['helpBtn1','helpBtn2','helpBtn3'].forEach(id => el(id).onclick = () => openHelp());

/* Close the modal via button or by clicking the dark overlay */
el('closeHelp').onclick = () => helpModal.style.display = 'none';
helpModal.addEventListener('click', e => { if (e.target === helpModal) helpModal.style.display = 'none'; });


const qWrap = el('questions');

QUESTIONS.forEach((q, i) => {
  const qBox = document.createElement('div');
  qBox.className = 'q';
  const num = i + 1;

  qBox.innerHTML = `
    <h3>${num}. ${q.text}</h3>
    <div class="opts" role="radiogroup" aria-label="${q.text}">
      ${ANSWER_OPTIONS.map(a => `
        <label class="opt">
          <input type="radio" name="q${num}" value="${a.value}" aria-checked="false" /> ${a.label}
        </label>
      `).join('')}
    </div>
  `;
  qWrap.appendChild(qBox);
});

const totalQs = QUESTIONS.length;
const progBar  = el('progBar');
const progText = el('progText');

qWrap.addEventListener('change', () => {
  const answered = document.querySelectorAll('.opts input:checked').length;
  const pct = Math.round((answered / totalQs) * 100);
  progBar.style.width  = pct + '%';
  progText.textContent = `${answered}/${totalQs}`;
});

el('submitBtn').onclick = () => {
  const radios = [...document.querySelectorAll('.opts input:checked')];

  if (radios.length < totalQs) {
    alert('Please answer all questions (you can choose "Never" if unsure).');
    return;
  }

  const answers   = radios.map(r => parseInt(r.value, 10));
  savedAnswers = answers;
  const catScores = {}; // total score per category
  const catCounts = {}; // number of questions per category
  let total = 0;

  answers.forEach((val, idx) => {
    total += val;
    const cat = QUESTIONS[idx].cat;
    catScores[cat] = (catScores[cat] || 0) + val;
    catCounts[cat] = (catCounts[cat] || 0) + 1;
  });

  showResults(total, maxTotal, catScores, catCounts);
};

function showResults(total, maxTotal, catScores, catCounts) {
  quiz.style.display    = 'none';
  results.style.display = 'block';

  const pct   = Math.round((total / maxTotal) * 100);
  const range = RANGE_ADVICE.find(r => pct <= r.max);

  el('scoreLine').innerHTML =
    `Overall score: <span class="scoreBadge ${range.class}">${pct}/100 – ${range.label}</span>`;

  el('rangeAdvice').innerHTML = `<ul>${range.tips.map(t => `<li>${t}</li>`).join('')}</ul>`;

  const catList = Object.keys(catScores).map(k => ({
    cat: k,
    avg: +(catScores[k] / catCounts[k]).toFixed(2)
  })).sort((a, b) => b.avg - a.avg);

  const top = catList.slice(0, 4);

  el('categoryList').innerHTML = top.map(item => {
    const desc       = CATEGORY_DESCRIPTIONS[item.cat] || '';

    const badgeClass = item.avg >= 3 ? 'crit' : item.avg >= 2 ? 'high' : item.avg >= 1 ? 'mod' : 'good';
    return `
      <div class="helpItem">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <strong>${item.cat}</strong>
          <span class="scoreBadge ${badgeClass}">${item.avg.toFixed(1)} / 4</span>
        </div>
        <div style="margin-top:6px">${desc}</div>
      </div>
    `;
  }).join('');


  const flags = {};
  catList.forEach(item => flags[item.cat] = item.avg);

  const criticalHits = CRITICAL_CONDITION_RULES.filter(rule => rule.showIf(flags));

  const criticalBox = el('criticalBox');
  if (pct >= 70 || criticalHits.length) {
    criticalBox.style.display = 'block';
    el('criticalConditions').innerHTML = criticalHits.length
      ? criticalHits.map(c => `<li>${c.label}</li>`).join('')
      : '<li>Overall distress appears high. Consider a professional evaluation.</li>';
  } else {
    criticalBox.style.display = 'none';
  }

  const extra = top.map(i => quickTipFor(i.cat));
  el('tips').innerHTML = [...new Set([...range.tips, ...extra])].map(t => `<li>${t}</li>`).join('');
}

function quickTipFor(cat) {
  const table = {
    'Anxiety':             'Try box breathing: in 4, hold 4, out 4, hold 4 — for 2 minutes.',
    'Stress':              'Pick 1 task, set a 10‑minute timer, then rest briefly.',
    'Depression':          'Step into daylight for 5–10 minutes and move gently.',
    'Self-esteem':         'Write one thing you did adequately today — not perfectly, just adequately.',
    'Perfectionism':       'Choose a task to do at 80% quality and ship it.',
    'Social':              'Send a short "thinking of you" message to someone safe.',
    'Attachment':          'Plan a brief check‑in with a trusted person this week.',
    'Body image':          'List 3 ways your body helps you function (not appearance).',
    'Emotional awareness': 'Name and write 3 feelings you noticed today.',
    'Dissociation':        'Grounding: describe 5 things you can see around you.',
    'OCD/Control':         'Delay a ritual by 1 minute while breathing slowly.',
    'Coping':              'Alternate 2 minutes imagination, 1 minute grounding with senses.',
    'Energy':              'Stick to a consistent wake time for 3 days.',
    'Mood':                'Track sleep/wake times for the next 3 days.',
    'Perception':          'Reduce caffeine for 48 hours and prioritize sleep.',
    'Crisis':              'Use the Immediate Help button and stay with someone you trust.'
  };

  return table[cat] || 'Take a short walk, hydrate, and rest your eyes for 2 minutes.';
}

function openHelp() {
  const list = el('helpList');

list.innerHTML = HELPLINES.map(h => `
  <div class="helpItem">
    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap">
      <div>
        <div><strong>${h.name}</strong></div>
        <div class="foot">${h.detail}</div>
      </div>

      <a class="helpNumber" href="${h.tel}">
        <i class="fa fa-phone"></i>${h.number}
      </a>

    </div>
  </div>
`).join('');

  helpModal.style.display = 'flex'; // Show the modal overlay
}

el('backBtn').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
