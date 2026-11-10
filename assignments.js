const form = document.getElementById('assignmentform');
const successBox = document.getElementById('successmsg');
const successCloseBtn = document.getElementById('successClose');



// assignments content


const assignments = {
  'math': {
    subject: 'Mathematics',
    title: 'Worksheet 4',
    details: 'Answer all the questions and show your working.',
    questions: [
      'Write 1/2 + 1/4 as one fraction.',
      'Which is bigger, 3/4 or 2/3? Explain how you know.',
      'In your own words, what is a numerataor?'
    ]
  },
    'english': {
    subject: 'English',
    title: 'Composition: My best day',
    details: 'Write about your favourite day, one paragraph for each part.',
    questions: [
      'Write a paragraph about the morning of your best day.',
      'Write a paragraph about the afternoon.',
      'Write a paragraph about the evening and how you felt.'
    ]
    },

  'science': {
    subject: 'Science',
    title: 'Plant life cycle diagram',
    details: 'Label the stages from seed to flowering plant.',
    questions: [
      'List the stages of a plant life cycle in order.',
      'What does a seed need to start growing?'
    ]
  }, 
    'socialstudies': {
    subject: 'Social studies',
    title: 'Map of Kenya',
    details: 'Mark the main counties and rivers on the outline map.',
    questions: [
      'Name three counties you marked on your map.',
      'Name two rivers you marked on your map.'
    ]
  }
};



const modal = document.getElementById('assignmentmodal');
const questionsBox = document.getElementById('modalquestions');
const closeBtn = document.getElementById('modalClose');


// open popup
function openModal(id) {
  const item = assignments[id];
  const card = document.querySelector('[data-id="' + id + '"]');

  // Fill in the text
  document.getElementById('modalsubject').textContent = item.subject;
  document.getElementById('modaltitle').textContent = item.title;
  document.getElementById('modaldue').textContent = card.querySelector('.due').textContent;
  document.getElementById('modaldetails').textContent = item.details;

 // One label and one answer box per question
  questionsBox.textContent = '';
  item.questions.forEach(function (text, index) {
    const wrap = document.createElement('div');
    wrap.className = 'question';

    const label = document.createElement('label');
    label.htmlFor = 'q-' + index;
    label.textContent = (index + 1) + '. ' + text;

    const box = document.createElement('textarea');
    box.id = 'q-' + index;

    wrap.appendChild(label);
    wrap.appendChild(box);
    questionsBox.appendChild(wrap);
  });

// close popup
  form.classList.remove('successhide');
  successBox.classList.add('successhide');

  // show the popup
  modal.classList.remove('modal-hide');
  modal.classList.remove('modal-hide');
}
// clicks
function closeModal() {
  modal.classList.add('modal-hide'); }

 document.querySelectorAll('.assignment-card .open-btn').forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    const card = button.closest('.assignment-card');
    if (card) openModal(card.dataset.id);
  });
});

closeBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeModal();
});


// submit and save assignment
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const completedAssignments =
        JSON.parse(localStorage.getItem('completedAssignments')) || [];

    const assignmentTitle = document.getElementById('modaltitle').textContent;
    const assignmentSubject = document.getElementById('modalsubject').textContent;

    completedAssignments.push({
        title: assignmentTitle,
        subject: assignmentSubject,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem(
        'completedAssignments',
        JSON.stringify(completedAssignments)
    );

    form.classList.add('successhide');
    successBox.classList.remove('successhide');
});

successCloseBtn.addEventListener('click', closeModal);

