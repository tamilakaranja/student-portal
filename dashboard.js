
const API_URL = "https://script.google.com/macros/s/AKfycbwLMuGGr19KbrSZY1soJfsu-Q8t9WgpQMasDrWSYlXmDD-Re3D_6NzY85spRHSTfwRR9w/exec";

const student = JSON.parse(sessionStorage.getItem("student") || "null");

// If not logged in back to log in pge
if (!student) {
  window.location.replace("index.html");
}

function showStudent(info) {
  const firstName = info.name.trim().split(" ")[0];
  document.getElementById("studentName").textContent = firstName;
  document.getElementById("studentInfo").textContent = info.grade + ", " + info.term + ", " + info.year;
}

// Next up box + "due this week" card, using the student's real assignments
// My Performance card: average of all quiz and assignment scores
function showAverage() {
  const quizResults = JSON.parse(localStorage.getItem("quizResults_" + student.studentId)) || [];
  const assignmentResults = JSON.parse(localStorage.getItem("assignmentResults_" + student.studentId)) || [];
  const all = quizResults.concat(assignmentResults);
  const text = document.getElementById("averageGrade");

  if (all.length === 0) {
    text.textContent = "No results yet";
    return;
  }

  const total = all.reduce(function (sum, r) { return sum + r.score; }, 0);
  text.textContent = "Average grade " + Math.round(total / all.length) + "%";
}

function showAssignmentInfo() {
  showAverage();
  const results = JSON.parse(localStorage.getItem("assignmentResults_" + student.studentId)) || [];
  const doneIds = results.map(function (r) { return r.id; });
  const now = new Date();
  const weekAway = new Date(now.getTime() + 7 * 86400000);

  const upcoming = assignments
    .filter(function (a) {
      return a.grade === student.grade && doneIds.indexOf(a.id) === -1 && new Date(a.due) > now;
    })
    .sort(function (x, y) { return new Date(x.due) - new Date(y.due); });

  const thisWeek = upcoming.filter(function (a) { return new Date(a.due) <= weekAway; });

  const nextTitle = document.getElementById("nextTitle");
  const nextLink = document.getElementById("nextLink");
  const dueCount = document.getElementById("dueCount");

  if (upcoming.length === 0) {
    nextTitle.textContent = "You have no assignments due. Well done!";
    nextLink.hidden = true;
    dueCount.textContent = "Nothing due";
    return;
  }

  const next = upcoming[0];
  const due = new Date(next.due);
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((dueDay - today) / 86400000);

  let when;
  if (days === 0) when = "today";
  else if (days === 1) when = "tomorrow";
  else when = "on " + due.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });

  nextTitle.textContent = next.subject + " " + next.title + " is due " + when;
  nextLink.hidden = false;
  dueCount.textContent = thisWeek.length + " due this week";
}

if (student) {
  // Show what we already have straight away
  showStudent(student);
  showAssignmentInfo();

 
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "profile", token: student.token })
  })
    .then(function (response) { return response.json(); })
    .then(function (result) {
      if (result.ok) {
         student.studentId = result.studentId;
        student.name = result.name;
        student.grade = result.grade;
        student.term = result.term;
        student.year = result.year;
           sessionStorage.setItem("student", JSON.stringify(student));
        showStudent(student);
        showAssignmentInfo();
      } else {
        sessionStorage.removeItem("student");
        window.location.replace("index.html");
      }
    })
    .catch(function () {  });
}

// Sign out
document.getElementById("signout").addEventListener("click", function () {
  if (student) {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ action: "logout", token: student.token })
    });
  }
  sessionStorage.removeItem("student");
});