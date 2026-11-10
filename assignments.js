

// who is logged in 

const student = JSON.parse(sessionStorage.getItem('student') || 'null');

// Not logged in? Back to the login page.
if (!student) {
  window.location.replace('index.html');
}

const myGrade = student ? student.grade : '';

// Each student gets their own list of results
const RESULTS_KEY = 'assignmentResults_' + (student ? student.studentId : 'none');




// things on page

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


// saved results 

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


// update status
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

// calender 
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


// bult cards 

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


// filters 

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
  
    statusFilter = button.dataset.filter === 'to-do' ? 'todo' : button.dataset.filter;

    document.querySelectorAll('.filters button').forEach(function (b) {
      b.classList.remove('active');
    });
    button.classList.add('active');

    applyFilters();
  });
});

subjectFilter.addEventListener('change', applyFilters);


// -popup

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




form.addEventListener('submit', function (event) {
  event.preventDefault();

  const a = currentAssignment;
  if (!a) return;
  if (findResult(a.id)) return;  

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


// start
if (student) {
  gradeLabel.textContent = myGrade + ' assignments';
  fillSubjectOptions();
  renderCards();
}