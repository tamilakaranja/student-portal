
// Get saved quiz results
const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

// Get saved assignment submissions
const completedAssignments = JSON.parse(localStorage.getItem('completedAssignments')) || [];


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
