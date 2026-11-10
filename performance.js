
// Get logged-in student
const student = JSON.parse(sessionStorage.getItem('student'));

if (!student || !student.studentId) {
    alert('Please log in again.');
    window.location.href = 'login.html';
}

// Get this student's storage keys
const quizKey = 'quizResults_' + student.studentId;
const assignmentKey = 'completedAssignments_' + student.studentId;

// Get this student's quiz results
const quizResults = JSON.parse(localStorage.getItem(quizKey)) || [];

// Get this student's assignments
const completedAssignments = JSON.parse(localStorage.getItem(assignmentKey)) || [];


// average 

let average = 0;

if (quizResults.length > 0) {
    const totalScores = quizResults.reduce(function (sum, quiz) {
        return sum + quiz.score;
    }, 0);

    average = Math.round(totalScores / quizResults.length);
}

document.getElementById('overallAverage').textContent = average + '%';


//  sssignments Completed

document.getElementById('assignmentsCompleted').textContent =
    completedAssignments.length;


// quizzes Completed

document.getElementById('quizzesCompleted').textContent =
    quizResults.length;


    





















// 4. SubjectPerformance

const subjectList = document.getElementById('subjectList');

// Group quiz results by subject
const subjectScores = {};

quizResults.forEach(function (quiz) {

    if (!subjectScores[quiz.subject]) {
        subjectScores[quiz.subject] = [];
    }

    subjectScores[quiz.subject].push(quiz.score);

});

// Clear the existing subject rows
subjectList.textContent = '';

// Display each subject
Object.keys(subjectScores).forEach(function (subject) {

    const scores = subjectScores[subject];

    const totalScore = scores.reduce(function (sum, score) {
        return sum + score;
    }, 0);

    const average = Math.round(totalScore / scores.length);

    // Create subject row
    const row = document.createElement('div');
    row.className = 'subject-row';

    const details = document.createElement('div');
    details.className = 'subject-details';

    const heading = document.createElement('h3');
    heading.textContent = subject;

    const percentage = document.createElement('span');
    percentage.textContent = average + '%';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    const fill = document.createElement('div');
    fill.className = 'progress-fill';

    fill.style.width = average + '%';

    
    details.appendChild(heading);
    details.appendChild(percentage);

    progressBar.appendChild(fill);

    row.appendChild(details);
    row.appendChild(progressBar);

    subjectList.appendChild(row);

});
