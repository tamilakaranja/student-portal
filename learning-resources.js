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













