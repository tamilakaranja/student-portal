const quizzes = {
  fractions: {
  subject: 'Mathematics',
  title: 'Fractions practice test',
  minutes: 10,
  questions: [
    { question: 'What is 1/2 + 1/4?', options: ['2/6', '3/4', '1/4', '2/4'], answer: 1 },
    { question: 'Which fraction is the biggest?', options: ['1/2', '1/4', '3/4', '1/8'], answer: 2 },
    { question: 'Which fraction is equal to 1/2?', options: ['2/4', '1/3', '2/3', '3/5'], answer: 0 },
    { question: 'What is 3/4 - 1/4?', options: ['1/4', '1/2', '1', '3/8'], answer: 1 },
    { question: 'In the fraction 5/8, what is the denominator?', options: ['5', '13', '3', '8'], answer: 3 },
    { question: 'What is 1/3 of 12?', options: ['4', '3', '6', '9'], answer: 0 },
    { question: 'Which fraction is smaller than 1/2?', options: ['3/4', '2/3', '1/4', '5/6'], answer: 2 },
    { question: 'What is 2/5 + 1/5?', options: ['3/10', '2/5', '3/5', '1/5'], answer: 2 },
    { question: '4/4 is equal to which number?', options: ['0', '4', '1/4', '1'], answer: 3 },
    { question: 'What is 1/4 of 20?', options: ['5', '4', '10', '80'], answer: 0 }
   ]
  },

  science: {
    subject: 'Science',
    title: 'Living things and the Earth',
    minutes: 10,
    questions: [
      { question: 'Which gas do plants take in from the air to make food?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 1 },
      { question: 'At what temperature does water boil, in degrees Celsius?', options: ['50', '90', '100', '120'], answer: 2 },
      { question: 'Which part of a plant takes in water from the soil?', options: ['Leaves', 'Stem', 'Roots', 'Flower'], answer: 2 },
      { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], answer: 2 },
      { question: 'What is it called when liquid water turns into a gas?', options: ['Condensation', 'Evaporation', 'Freezing', 'Melting'], answer: 1 }
     ]
  },

  english: {
    subject: 'English',
    title: 'Grammar and vocabulary',
    minutes: 10,
    questions: [
      { question: 'Which of these words is a noun?', options: ['Run', 'Happiness', 'Quickly', 'Beautiful'], answer: 1 },
      { question: 'Which sentence is correct?', options: ['She go to school every day.', 'She goes to school every day.', 'She going to school every day.', 'She gone to school every day.'], answer: 1 },
      { question: 'What is the plural of "child"?', options: ['Childs', 'Childes', 'Children', 'Childrens'], answer: 2 },
      { question: 'Which word means the opposite of "ancient"?', options: ['Old', 'Modern', 'Large', 'Quiet'], answer: 1 },
      { question: 'Which punctuation mark ends a question?', options: ['.', ',', '?', '!'], answer: 2 }
    ]
  },

  socialstudies: {
    subject: 'Social Studies',
    title: 'Kenya and the world',
    minutes: 10,
    questions: [
      { question: 'What is the capital city of Kenya?', options: ['Mombasa', 'Nairobi', 'Kisumu', 'Nakuru'], answer: 1 },
      { question: 'Which is the largest lake in Africa?', options: ['Lake Victoria', 'Lake Turkana', 'Lake Naivasha', 'Lake Nakuru'], answer: 0 },
      { question: 'In which year did Kenya gain independence?', options: ['1957', '1960', '1963', '1970'], answer: 2 },
      { question: 'Which is the highest mountain in Kenya?', options: ['Mount Kilimanjaro', 'Mount Kenya', 'Mount Elgon', 'Mount Longonot'], answer: 1 },
      { question: 'Which imaginary line divides the Earth into the Northern and Southern Hemispheres?', options: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'International Date Line'], answer: 1 }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const quizId = quizzes[params.get('id')] ? params.get('id') : 'fractions';
const quiz = quizzes[quizId];
const reviewMode = params.get('review') === '1';   

const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const subjectEl = document.getElementById('quiz-subject');
const timerEl = document.getElementById('quiz-timer');
const progressFill = document.getElementById('progress-content');
const countEl = document.getElementById('question-count');
const questionEl = document.getElementById('question-text');
const optionsBox = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const reviewBtn = document.getElementById('review-btn');


const total = quiz.questions.length;
const totalSeconds = quiz.minutes * 60;
let current = 0;
let answers = [];
let secondsLeft = totalSeconds;

function formatTime(seconds) {
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}


function showQuestion() {
  const q = quiz.questions[current];

  questionEl.textContent = q.question;
  countEl.textContent = 'Question ' + (current + 1) + ' of ' + total;
  progressFill.style.width = ((current + 1) / total * 100) + '%';
 optionsBox.textContent = '';
  q.options.forEach(function (text, index) {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'option';
    tile.innerHTML = '<span class="option-letter">' + 'ABCD'[index] + '</span>' + text;

    if (answers[current] === index) tile.classList.add('selected');
    tile.addEventListener('click', function () { pickAnswer(index); });

    optionsBox.appendChild(tile);
  });

  prevBtn.disabled = current === 0;
  nextBtn.textContent = current === total - 1 ? 'Finish quiz' : 'Next question';
}

function pickAnswer(index) {
  answers[current] = index;
  showQuestion();
}

prevBtn.addEventListener('click', function () {
  current--;
  showQuestion();
});

nextBtn.addEventListener('click', function () {
  if (current < total - 1) {
    current++;
    showQuestion();
  } else {
    finishQuiz();
  }
});

function tick() {
  secondsLeft--;
  timerEl.textContent = formatTime(secondsLeft) + ' left';
  if (secondsLeft <= 0) finishQuiz();
}

function finishQuiz() {
  clearInterval(timer);

  let correct = 0;
  quiz.questions.forEach(function (q, i) {
    if (answers[i] === q.answer) correct++;
  });
  const percent = Math.round(correct / total * 100);
 // Get the logged-in student
const student = JSON.parse(sessionStorage.getItem('student'));

if (!student || !student.studentId) {
    alert('Student session not found. Please log in again.');
    return;
}

// Create a separate storage key for each student
const quizKey = 'quizResults_' + student.studentId;

// Get this student's existing results
const quizResults = JSON.parse(localStorage.getItem(quizKey)) || [];

// Add the new quiz result
quizResults.push({
    id: quizId,
    answers: quiz.questions.map(function (q, i) { return answers[i] === undefined ? null : answers[i]; }),
    seconds: totalSeconds - secondsLeft,
    subject: quiz.subject,
    title: quiz.title,
    score: percent,
    correct: correct,
    total: total,
    date: new Date().toLocaleDateString()
});

// Save results under this student's ID
localStorage.setItem(quizKey, JSON.stringify(quizResults));

  document.getElementById('score-ring').style.setProperty('--score', percent);
  document.getElementById('score-text').textContent = correct + '/' + total;
  document.getElementById('score-percent').textContent = percent + '%';
  document.getElementById('result-heading').textContent = percent >= 50 ? 'Great work!' : 'Keep practising!';
  document.getElementById('result-message').textContent =
    'You got ' + correct + ' out of ' + total + ' questions right.';
  document.getElementById('fact-correct').textContent = correct;
  document.getElementById('fact-review').textContent = total - correct;
  document.getElementById('fact-time').textContent = formatTime(totalSeconds - secondsLeft);

  showReview(quiz.questions.map(function (q, i) { return answers[i] === undefined ? null : answers[i]; }));

  quizScreen.classList.add('screen-hide');
  resultScreen.classList.remove('screen-hide');
}

// the marked review: right answers green, wrong answers red
function showReview(picked) {
  const box = document.getElementById('review-list');
  if (!box) return;
  box.textContent = '';

  quiz.questions.forEach(function (q, i) {
    const item = document.createElement('div');
    item.className = 'review-item';

    const heading = document.createElement('p');
    heading.className = 'review-question';
    heading.textContent = (i + 1) + '. ' + q.question + (picked[i] === null ? '  (not answered)' : '');
    item.appendChild(heading);

    q.options.forEach(function (optionText, index) {
      const row = document.createElement('div');
      row.className = 'review-option';
      let note = '';

      if (index === q.answer) {
        row.classList.add('review-correct');
        note = picked[i] === index ? '  (your answer - correct)' : '  (correct answer)';
      } else if (picked[i] === index) {
        row.classList.add('review-wrong');
        note = '  (your answer)';
      }

      row.textContent = 'ABCD'[index] + '. ' + optionText + note;
      item.appendChild(row);
    });

    box.appendChild(item);
  });
}

// "View results": show the student's last saved attempt, without starting the quiz
function showSavedResult() {
  const me = JSON.parse(sessionStorage.getItem('student'));
  if (!me || !me.studentId) {
    window.location.replace('index.html');
    return;
  }

  const tries = (JSON.parse(localStorage.getItem('quizResults_' + me.studentId)) || []).filter(function (r) {
    return r.id === quizId && r.answers;
  });
  if (tries.length === 0) {
    window.location.replace('quizzes.html');
    return;
  }
  const last = tries[tries.length - 1];

  document.getElementById('score-ring').style.setProperty('--score', last.score);
  document.getElementById('score-text').textContent = last.correct + '/' + last.total;
  document.getElementById('score-percent').textContent = last.score + '%';
  document.getElementById('result-heading').textContent = last.score >= 50 ? 'Great work!' : 'Keep practising!';
  document.getElementById('result-message').textContent =
    'You got ' + last.correct + ' out of ' + last.total + ' questions right.';
  document.getElementById('fact-correct').textContent = last.correct;
  document.getElementById('fact-review').textContent = last.total - last.correct;
  document.getElementById('fact-time').textContent = formatTime(last.seconds || 0);

  showReview(last.answers);

  quizScreen.classList.add('screen-hide');
  resultScreen.classList.remove('screen-hide');
}

// the "Redo quiz" button starts this quiz again
const redoBtn = document.getElementById('redo-btn');
if (redoBtn) {
  redoBtn.addEventListener('click', function () {
    window.location.href = 'quiz.html?id=' + quizId;
  });
}

// the "review" button scrolls down to the marked answers
if (reviewBtn) {
  reviewBtn.addEventListener('click', function () {
    const box = document.getElementById('review-list');
    if (box) box.scrollIntoView({ behavior: 'smooth' });
  });
}

subjectEl.textContent = quiz.subject + ' - ' + quiz.title;

let timer;
if (reviewMode) {
  showSavedResult();
} else {
  timerEl.textContent = formatTime(secondsLeft) + ' left';
  showQuestion();
  timer = setInterval(tick, 1000);
}