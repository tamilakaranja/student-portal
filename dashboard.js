
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

if (student) {
  // Show what we already have straight away
  showStudent(student);

 
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