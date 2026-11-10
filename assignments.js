// ============================================================
//  ASSIGNMENTS PAGE
//  - each student only sees the assignments for THEIR grade
//  - questions are multiple choice and are marked automatically
//  - a card starts as "To do" and becomes "Submitted" once handed in
// ============================================================


// ---------- 1. Who is logged in? ----------

const student = JSON.parse(sessionStorage.getItem('student') || 'null');

// Not logged in? Back to the login page.
if (!student) {
  window.location.replace('index.html');
}

const myGrade = student ? student.grade : '';

// Each student gets their own list of results
const RESULTS_KEY = 'assignmentResults_' + (student ? student.studentId : 'none');


// ---------- 2. All the assignments ----------
// To add one: copy a block, give it a NEW id, set the grade, subject, due date and questions.
// "answer" is the position of the right option, counting from 0 (A = 0, B = 1, C = 2, D = 3).
// "due" is written as year-month-dayThour:minute (24-hour clock).

const assignments = [

  // ===================== GRADE 7 =====================
  {
    id: 'g7-math-fractions',
    grade: 'Grade 7',
    subject: 'Mathematics',
    title: 'Fractions worksheet',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-17T16:00',
    questions: [
      { question: 'What is 1/2 + 1/4?', options: ['2/6', '3/4', '1/4', '2/4'], answer: 1 },
      { question: 'Which is bigger, 3/4 or 2/3?', options: ['3/4', '2/3', 'They are equal', 'Cannot tell'], answer: 0 },
      { question: 'In the fraction 5/8, what is the numerator?', options: ['8', '5', '13', '3'], answer: 1 },
      { question: 'What is 3/5 - 1/5?', options: ['2/5', '2/10', '4/5', '3/10'], answer: 0 }
    ]
  },
  {
    id: 'g7-english-nouns-verbs',
    grade: 'Grade 7',
    subject: 'English',
    title: 'Nouns and verbs',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-18T19:00',
    questions: [
      { question: 'Which word is a noun?', options: ['Quickly', 'Teacher', 'Jump', 'Bright'], answer: 1 },
      { question: 'Which word is the verb in: "The children play in the garden."?', options: ['children', 'play', 'garden', 'The'], answer: 1 },
      { question: 'Which sentence is correct?', options: ['She walk to school every day.', 'She walks to school every day.', 'She walking to school every day.', 'She walken to school every day.'], answer: 1 },
      { question: 'What is the plural of "child"?', options: ['Childs', 'Childes', 'Children', 'Childrens'], answer: 2 }
    ]
  },
  {
    id: 'g7-science-plants',
    grade: 'Grade 7',
    subject: 'Science',
    title: 'Plant life cycle',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-12T16:00',
    questions: [
      { question: 'Which is the first stage of a plant\'s life cycle?', options: ['Flowering', 'Seed', 'Fruit', 'Seedling'], answer: 1 },
      { question: 'What does a seed need to start growing?', options: ['Water, air and warmth', 'Only sunlight', 'Only soil', 'Darkness and ice'], answer: 0 },
      { question: 'Which part of the plant takes in water from the soil?', options: ['Leaves', 'Flower', 'Roots', 'Fruit'], answer: 2 },
      { question: 'Which part of a flower later becomes the fruit?', options: ['Petal', 'Ovary', 'Stem', 'Root'], answer: 1 }
    ]
  },
  {
    id: 'g7-sst-kenya-map',
    grade: 'Grade 7',
    subject: 'Social studies',
    title: 'Map of Kenya',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-05T16:00',
    questions: [
      { question: 'What is the capital city of Kenya?', options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'], answer: 2 },
      { question: 'Which is the largest lake in Africa, shared by Kenya, Uganda and Tanzania?', options: ['Lake Turkana', 'Lake Victoria', 'Lake Naivasha', 'Lake Baringo'], answer: 1 },
      { question: 'Which is the longest river in Kenya?', options: ['Tana River', 'Athi River', 'Nzoia River', 'Ewaso Nyiro'], answer: 0 },
      { question: 'Which ocean borders Kenya to the east?', options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 2 }
    ]
  },

  // ===================== GRADE 8 =====================
  {
    id: 'g8-math-ratios',
    grade: 'Grade 8',
    subject: 'Mathematics',
    title: 'Ratios and percentages',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-17T16:00',
    questions: [
      { question: 'What is 20% of 50?', options: ['5', '10', '20', '25'], answer: 1 },
      { question: 'Simplify the ratio 12:18.', options: ['2:3', '3:4', '6:9', '4:5'], answer: 0 },
      { question: 'A shirt costing KES 800 has a 25% discount. How much is the discount?', options: ['KES 100', 'KES 200', 'KES 400', 'KES 25'], answer: 1 },
      { question: 'Write 3/4 as a percentage.', options: ['34%', '43%', '75%', '80%'], answer: 2 }
    ]
  },
  {
    id: 'g8-english-vocabulary',
    grade: 'Grade 8',
    subject: 'English',
    title: 'Vocabulary and meaning',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-19T19:00',
    questions: [
      { question: 'Which word means the opposite of "generous"?', options: ['Kind', 'Selfish', 'Happy', 'Brave'], answer: 1 },
      { question: 'Which word means "very big"?', options: ['Tiny', 'Enormous', 'Narrow', 'Fragile'], answer: 1 },
      { question: 'Yesterday, Amina ___ her homework before supper.', options: ['finish', 'finishes', 'finished', 'finishing'], answer: 2 },
      { question: 'Which word is a synonym of "begin"?', options: ['Stop', 'Start', 'Finish', 'Delay'], answer: 1 }
    ]
  },
  {
    id: 'g8-science-matter',
    grade: 'Grade 8',
    subject: 'Science',
    title: 'States of matter',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-11T16:00',
    questions: [
      { question: 'Which state of matter has a fixed shape and a fixed volume?', options: ['Solid', 'Liquid', 'Gas', 'Steam'], answer: 0 },
      { question: 'What is it called when a liquid turns into a gas?', options: ['Condensation', 'Freezing', 'Evaporation', 'Melting'], answer: 2 },
      { question: 'At what temperature does pure water freeze, in degrees Celsius?', options: ['0', '10', '50', '100'], answer: 0 },
      { question: 'What happens when ice turns into water?', options: ['Freezing', 'Melting', 'Boiling', 'Condensation'], answer: 1 }
    ]
  },
  {
    id: 'g8-sst-trade',
    grade: 'Grade 8',
    subject: 'Social studies',
    title: 'Trade and resources',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-06T16:00',
    questions: [
      { question: 'What is trade?', options: ['Buying and selling goods and services', 'Growing food', 'Building roads', 'Teaching students'], answer: 0 },
      { question: 'Which of these is a renewable resource?', options: ['Coal', 'Oil', 'Sunlight', 'Natural gas'], answer: 2 },
      { question: 'Which country is Kenya\'s neighbour to the north?', options: ['Tanzania', 'Uganda', 'Ethiopia', 'Rwanda'], answer: 2 },
      { question: 'Which crop is a major cash crop grown in the Kenyan highlands?', options: ['Tea', 'Cocoa', 'Rubber', 'Palm oil'], answer: 0 }
    ]
  },

  // ===================== GRADE 9 =====================
  {
    id: 'g9-math-pythagoras',
    grade: 'Grade 9',
    subject: 'Mathematics',
    title: 'Pythagoras theorem',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-18T16:00',
    questions: [
      { question: 'A right-angled triangle has two sides of 3 cm and 4 cm. How long is the hypotenuse?', options: ['5 cm', '6 cm', '7 cm', '12 cm'], answer: 0 },
      { question: 'Which formula is Pythagoras\' theorem?', options: ['a + b = c', 'a² + b² = c²', 'a × b = c', 'a² - b² = c²'], answer: 1 },
      { question: 'The hypotenuse is...', options: ['The shortest side', 'The side opposite the right angle', 'Any side', 'The side at the bottom'], answer: 1 },
      { question: 'A triangle has sides 5, 12 and 13. Is it right-angled?', options: ['Yes, because 5² + 12² = 13²', 'No, because 5 + 12 is not 13', 'No, because 13 is too long', 'Yes, because 5 + 12 = 17'], answer: 0 }
    ]
  },
  {
    id: 'g9-english-figures',
    grade: 'Grade 9',
    subject: 'English',
    title: 'Figures of speech',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-20T19:00',
    questions: [
      { question: '"The classroom was a zoo." This is an example of a...', options: ['Simile', 'Metaphor', 'Alliteration', 'Onomatopoeia'], answer: 1 },
      { question: '"As brave as a lion." This is a...', options: ['Metaphor', 'Personification', 'Simile', 'Idiom'], answer: 2 },
      { question: 'Which word is an example of onomatopoeia?', options: ['Buzz', 'Table', 'Happy', 'Quick'], answer: 0 },
      { question: '"The wind whispered through the trees." This is...', options: ['Personification', 'Simile', 'Hyperbole', 'A proverb'], answer: 0 }
    ]
  },
  {
    id: 'g9-science-atoms',
    grade: 'Grade 9',
    subject: 'Science',
    title: 'Atoms and elements',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-13T16:00',
    questions: [
      { question: 'What is the centre of an atom called?', options: ['Electron', 'Nucleus', 'Shell', 'Molecule'], answer: 1 },
      { question: 'Which particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], answer: 2 },
      { question: 'What is the chemical symbol for oxygen?', options: ['O', 'Ox', 'Og', 'Oy'], answer: 0 },
      { question: 'An element is a substance that...', options: ['Is made of only one kind of atom', 'Is made of different atoms joined together', 'Cannot be found in nature', 'Is always a gas'], answer: 0 }
    ]
  },
  {
    id: 'g9-sst-constitution',
    grade: 'Grade 9',
    subject: 'Social studies',
    title: 'The Constitution of Kenya',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-04T16:00',
    questions: [
      { question: 'In which year was the current Constitution of Kenya promulgated?', options: ['2002', '2007', '2010', '2013'], answer: 2 },
      { question: 'How many counties does Kenya have?', options: ['27', '37', '47', '57'], answer: 2 },
      { question: 'Who is the head of state and government in Kenya?', options: ['The Speaker', 'The Chief Justice', 'The President', 'The Governor'], answer: 2 },
      { question: 'Which arm of government makes the laws?', options: ['The Judiciary', 'The Executive', 'The Legislature', 'The Police'], answer: 2 }
    ]
  }

];


// ---------- 3. Things on the page ----------

const list = document.getElementById('assignmentList');
const emptyMessage = document.getElementById('emptyMessage');
const subjectFilter = document.getElementById('subjectFilter');
const gradeLabel = document.getElementById('gradeLabel');

const modal = document.getElementById('assignmentmodal');
const form = document.getElementById('assignmentform');
const questionsBox = document.getElementById('modalquestions');
const formError = document.getElementById('formError');
const successBox = document.getElementById('successmsg');
const resultScore = document.getElementById('resultScore');
const reviewList = document.getElementById('reviewList');
const closeBtn = document.getElementById('modalClose');
const successCloseBtn = document.getElementById('successClose');

let statusFilter = 'all';        // which status button is selected
let currentAssignment = null;    // the assignment open in the pop-up


// ---------- 4. Saved results (one list per student) ----------

function getResults() {
  return JSON.parse(localStorage.getItem(RESULTS_KEY)) || [];
}

function findResult(id) {
  const all = getResults();
  for (let i = 0; i < all.length; i++) {
    if (all[i].id === id) return all[i];
  }
  return null;
}


// ---------- 5. Working out each card's status and dates ----------

// "submitted" if there is a saved result, "overdue" if the due date has passed, otherwise "todo"
function statusOf(a) {
  if (findResult(a.id)) return 'submitted';
  if (new Date(a.due) < new Date()) return 'overdue';
  return 'todo';
}

function formatDue(iso) {
  const d = new Date(iso);
  const day = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const time = d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
  return day + ', ' + time;
}

// how many calendar days from today until the due date (0 = today, 1 = tomorrow)
function daysUntil(iso) {
  const due = new Date(iso);
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((dueDay - today) / 86400000);
}

function statusLabel(a, status) {
  if (status === 'submitted') return 'Submitted';
  if (status === 'overdue') return 'Overdue';
  const days = daysUntil(a.due);
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return 'To do';
}

function dueText(a, status, result) {
  if (status === 'submitted') {
    return 'Submitted on ' + result.date + '  |  Score: ' + result.correct + ' / ' + result.total + ' (' + result.score + '%)';
  }
  if (status === 'overdue') return 'Was due ' + formatDue(a.due);
  return 'Due ' + formatDue(a.due);
}


// ---------- 6. Building the cards ----------

function makeCard(a) {
  const status = statusOf(a);
  const result = findResult(a.id);

  const card = document.createElement('article');
  card.className = 'assignment-card';
  card.dataset.status = status;
  card.dataset.id = a.id;
  card.dataset.subject = a.subject;

  const top = document.createElement('div');
  top.className = 'card';
  const subject = document.createElement('span');
  subject.className = 'subject';
  subject.textContent = a.subject;
  const badge = document.createElement('span');
  badge.className = 'status';
  badge.textContent = statusLabel(a, status);
  top.appendChild(subject);
  top.appendChild(badge);

  const title = document.createElement('h2');
  title.textContent = a.title;

  const due = document.createElement('p');
  due.className = 'due';
  due.textContent = dueText(a, status, result);

  const details = document.createElement('p');
  details.className = 'details';
  details.textContent = a.questions.length + ' questions. ' + a.details;

  const button = document.createElement('a');
  button.href = '#';
  button.className = 'open-btn';
  button.textContent = status === 'submitted' ? 'View results' : 'Open assignment';
  button.addEventListener('click', function (event) {
    event.preventDefault();
    openModal(a.id);
  });

  card.appendChild(top);
  card.appendChild(title);
  card.appendChild(due);
  card.appendChild(details);
  card.appendChild(button);
  return card;
}

function renderCards() {
  list.textContent = '';

  // only this student's grade
  const mine = [];
  assignments.forEach(function (a) {
    if (a.grade === myGrade) mine.push(a);
  });

  // To do first, then Overdue, then Submitted. Soonest due date first inside each.
  const order = { todo: 0, overdue: 1, submitted: 2 };
  mine.sort(function (x, y) {
    return (order[statusOf(x)] - order[statusOf(y)]) || (new Date(x.due) - new Date(y.due));
  });

  mine.forEach(function (a) {
    list.appendChild(makeCard(a));
  });

  applyFilters();
}


// ---------- 7. Filters (status buttons + subject drop-down) ----------

function applyFilters() {
  const subjectChoice = subjectFilter.value;
  const cards = list.querySelectorAll('.assignment-card');
  let visible = 0;

  cards.forEach(function (card) {
    const statusOk = statusFilter === 'all' || card.dataset.status === statusFilter;
    const subjectOk = subjectChoice === 'all' || card.dataset.subject === subjectChoice;
    card.hidden = !(statusOk && subjectOk);
    if (statusOk && subjectOk) visible++;
  });

  if (cards.length === 0) {
    emptyMessage.textContent = 'There are no assignments for your grade yet.';
  } else {
    emptyMessage.textContent = 'No assignments match these filters.';
  }
  emptyMessage.hidden = visible > 0;
}

// fill the subject drop-down with the subjects this grade has
function fillSubjectOptions() {
  const seen = [];
  assignments.forEach(function (a) {
    if (a.grade === myGrade && seen.indexOf(a.subject) === -1) seen.push(a.subject);
  });
  seen.forEach(function (name) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    subjectFilter.appendChild(option);
  });
}

document.querySelectorAll('.filters button').forEach(function (button) {
  button.addEventListener('click', function () {
    // the HTML says "to-do", the cards say "todo"
    statusFilter = button.dataset.filter === 'to-do' ? 'todo' : button.dataset.filter;

    document.querySelectorAll('.filters button').forEach(function (b) {
      b.classList.remove('active');
    });
    button.classList.add('active');

    applyFilters();
  });
});

subjectFilter.addEventListener('change', applyFilters);


// ---------- 8. The pop-up ----------

function openModal(id) {
  let a = null;
  assignments.forEach(function (x) {
    if (x.id === id) a = x;
  });
  if (!a) return;
  currentAssignment = a;

  document.getElementById('modalsubject').textContent = a.subject;
  document.getElementById('modaltitle').textContent = a.title;
  document.getElementById('modaldetails').textContent = a.details;

  const result = findResult(id);

  if (result) {
    // already handed in: show the marked result
    document.getElementById('modaldue').textContent = 'Submitted on ' + result.date;
    showResult(a, result);
  } else {
    // not handed in yet: show the questions
    document.getElementById('modaldue').textContent = dueText(a, statusOf(a), null);
    buildQuestions(a);
    formError.textContent = '';
    form.classList.remove('successhide');
    successBox.classList.add('successhide');
  }

  modal.classList.remove('modal-hide');
}

function closeModal() {
  modal.classList.add('modal-hide');
}

// one block per question, with a radio button for each option
function buildQuestions(a) {
  questionsBox.textContent = '';

  a.questions.forEach(function (q, i) {
    const wrap = document.createElement('div');
    wrap.className = 'question';

    const text = document.createElement('p');
    text.className = 'question-text';
    text.textContent = (i + 1) + '. ' + q.question;
    wrap.appendChild(text);

    q.options.forEach(function (optionText, index) {
      const label = document.createElement('label');
      label.className = 'choice';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'q-' + i;
      radio.value = index;

      label.appendChild(radio);
      label.appendChild(document.createTextNode('ABCD'[index] + '. ' + optionText));
      wrap.appendChild(label);
    });

    questionsBox.appendChild(wrap);
  });
}


// ---------- 9. Submitting and marking ----------

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const a = currentAssignment;
  if (!a) return;
  if (findResult(a.id)) return;   // already handed in, can't submit twice

  // what the student picked for each question
  const picked = [];
  let missing = false;
  a.questions.forEach(function (q, i) {
    const chosen = form.querySelector('input[name="q-' + i + '"]:checked');
    if (chosen) {
      picked.push(Number(chosen.value));
    } else {
      picked.push(null);
      missing = true;
    }
  });

  if (missing) {
    formError.textContent = 'Please answer every question before you submit.';
    return;
  }

  // marking
  let correct = 0;
  a.questions.forEach(function (q, i) {
    if (picked[i] === q.answer) correct++;
  });
  const total = a.questions.length;
  const percent = Math.round(correct / total * 100);

  // save (this is also what the performance page will read)
  const result = {
    id: a.id,
    grade: a.grade,
    subject: a.subject,
    title: a.title,
    score: percent,
    correct: correct,
    total: total,
    answers: picked,
    date: new Date().toLocaleDateString('en-GB')
  };
  const all = getResults();
  all.push(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(all));

  showResult(a, result);
  renderCards();   // the card now says Submitted
});


// ---------- 10. The marked result: right answers green, wrong answers red ----------

function showResult(a, result) {
  form.classList.add('successhide');
  successBox.classList.remove('successhide');

  resultScore.textContent = 'You scored ' + result.correct + ' / ' + result.total + ' (' + result.score + '%)';
  reviewList.textContent = '';

  a.questions.forEach(function (q, i) {
    const item = document.createElement('div');
    item.className = 'review-item';

    const heading = document.createElement('p');
    heading.className = 'review-question';
    heading.textContent = (i + 1) + '. ' + q.question;
    item.appendChild(heading);

    q.options.forEach(function (optionText, index) {
      const row = document.createElement('div');
      row.className = 'review-option';
      let note = '';

      if (index === q.answer) {
        row.classList.add('review-correct');
        note = result.answers[i] === index ? '  (your answer - correct)' : '  (correct answer)';
      } else if (result.answers[i] === index) {
        row.classList.add('review-wrong');
        note = '  (your answer)';
      }

      row.textContent = 'ABCD'[index] + '. ' + optionText + note;
      item.appendChild(row);
    });

    reviewList.appendChild(item);
  });
}


// ---------- 11. Buttons and keys ----------

closeBtn.addEventListener('click', closeModal);
successCloseBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeModal();
});

// Sign out: forget who was logged in
const signout = document.getElementById('signout');
if (signout) {
  signout.addEventListener('click', function () {
    sessionStorage.removeItem('student');
  });
}


// ---------- 12. Start ----------

if (student) {
  gradeLabel.textContent = myGrade + ' assignments';
  fillSubjectOptions();
  renderCards();
}