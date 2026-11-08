// Add variables 

const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.video-item');
const videoBox = document.getElementById('video-box');
const subjectEl = document.getElementById('video-subject');
const titleEl = document.getElementById('video-title');
const detailsEl = document.getElementById('video-details');
const watchedBtn = document.getElementById('watched-btn');
const notes = document.getElementById('notes');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-notes');

const comingSoon = videoBox.innerHTML;
 
let current = null;   
function playVideo(item) {
  current = item;

items.forEach(function (other) { other.classList.remove('is-active'); });
  item.classList.add('is-active');
  subjectEl.textContent = item.dataset.subject;
  titleEl.textContent = item.dataset.title;
  detailsEl.textContent = item.dataset.minutes + ' min \u00B7 Video lesson';


// show the YouTube player, or Video coming soon
  const id = item.dataset.youtube;
  if (id) { 
    videoBox.innerHTML = '';
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube.com/embed/' + id + '?rel=0';
    frame.title = item.dataset.title;
    frame.allowFullscreen = true;
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.border = '0';
    frame.style.borderRadius = 'inherit';
    videoBox.appendChild(frame);
  } else {
    videoBox.innerHTML = comingSoon;
  }
 
  updateWatchedButton();
}
 
items.forEach(function (item) {
  item.addEventListener('click', function () { playVideo(item); });
});

// marked as watched 

function updateWatchedButton() {
  const isWatched = current.classList.contains('watched');
  watchedBtn.textContent = isWatched ? 'Watched \u2713' : 'Mark as watched';
  watchedBtn.classList.toggle('is-watched', isWatched);
}
 
watchedBtn.addEventListener('click', function () {
  current.classList.toggle('watched');
  updateWatchedButton();
});



 // subject filters
filters.forEach(function (button) {
  button.addEventListener('click', function () {
    const subject = button.dataset.subject;

    filters.forEach(function (other) { other.classList.remove('is-active'); });
    button.classList.add('is-active');

    let firstVisible = null;
    items.forEach(function (item) {
      const show = subject === 'all' || item.dataset.subject === subject;
      item.style.display = show ? '' : 'none';
      if (show && !firstVisible) firstVisible = item;
    });

    if (current.style.display === 'none' && firstVisible) {
      playVideo(firstVisible);
    }
  });
});



// notes 
function updateWordCount() {
  const text = notes.value.trim();
  const words = text === '' ? 0 : text.split(/\s+/).length;
  wordCount.textContent = words + (words === 1 ? ' word' : ' words');
}
 
notes.addEventListener('input', updateWordCount);
 
clearBtn.addEventListener('click', function () {
  if (notes.value.trim() !== '' && !confirm('Clear all your notes?')) return;
  notes.value = '';
  updateWordCount();
  notes.focus();
});


playVideo(items[0]);

