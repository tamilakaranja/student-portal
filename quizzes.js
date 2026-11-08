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
const progressFill = document.getElementById('progress-fill');
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
let remaining = totalSeconds;    
let timerId = null;
let reviewing = false;


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