
// Get the logged-in student's information
const student = JSON.parse(sessionStorage.getItem('student'));

// Check whether a student is logged in
if (!student || !student.studentId) {

    alert('Please log in to view your profile.');

    window.location.href = 'login.html';

} else {

    // Display student's name
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('fullName').textContent = student.name;

    // Display student ID
    document.getElementById('overviewStudentId').textContent = student.studentId;
    document.getElementById('studentId').textContent = student.studentId;

    // Display grade
    document.getElementById('studentGrade').textContent = student.grade || 'Not provided';

    // Display academic information
    document.getElementById('studentTerm').textContent = student.term || 'Not provided';
    document.getElementById('studentYear').textContent = student.year || 'Not provided';

    // Generate initials from the student's name
    const initials = student.name
        .trim()
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    document.getElementById('studentInitials').textContent = initials;
}

// Sign out
const signoutLink = document.querySelector('.top-bar-actions a:last-child');

signoutLink.addEventListener('click', function() {
    sessionStorage.removeItem('student');
});
