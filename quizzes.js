const quiz = {
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
};

// element ids 

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
  // Save quiz results
const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

quizResults.push({
    subject: quiz.subject,
    title: quiz.title,
    score: percent,
    correct: correct,
    total: total,
    date: new Date().toLocaleDateString()
});

localStorage.setItem('quizResults', JSON.stringify(quizResults));

  document.getElementById('score-ring').style.setProperty('--score', percent);
  document.getElementById('score-text').textContent = correct + '/' + total;
  document.getElementById('score-percent').textContent = percent + '%';
  document.getElementById('result-heading').textContent = percent >= 50 ? 'Great work!' : 'Keep practising!';
  document.getElementById('result-message').textContent =
    'You got ' + correct + ' out of ' + total + ' questions right.';
  document.getElementById('fact-correct').textContent = correct;
  document.getElementById('fact-review').textContent = total - correct;
  document.getElementById('fact-time').textContent = formatTime(totalSeconds - secondsLeft);

  quizScreen.classList.add('screen-hide');
  resultScreen.classList.remove('screen-hide');
}

subjectEl.textContent = quiz.subject + ' - ' + quiz.title;
timerEl.textContent = formatTime(secondsLeft) + ' left';
showQuestion();
const timer = setInterval(tick, 1000);