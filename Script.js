const API_URL = "https://script.google.com/macros/s/AKfycbwLMuGGr19KbrSZY1soJfsu-Q8t9WgpQMasDrWSYlXmDD-Re3D_6NzY85spRHSTfwRR9w/exec";
 
function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "message " + type;
}
 
async function sendToServer(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return response.json();
}
 
function startSession(data) {
  sessionStorage.setItem("student", JSON.stringify({
    token: data.token,
    name: data.name,
    grade: data.grade,
    term: data.term,
    year: data.year
  }));
  window.location.href = "dashboard.html";
}
 
function handleForm(formId, messageId, getPayload) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);
 
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const button = form.querySelector("button");
    button.disabled = true;
    showMessage(message, "Please wait...", "");
 
    try {
      const result = await sendToServer(getPayload());
      if (result.ok) {
        startSession(result);
        return;
      }
      showMessage(message, result.error || "Something went wrong.", "error");
    } catch (error) {
      showMessage(message, "Could not reach the server. Check your internet and try again.", "error");
    }
    button.disabled = false;
  });
}
 
handleForm("loginForm", "loginMessage", function () {
  return {
    action: "login",
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  };
});
 
handleForm("registerForm", "registerMessage", function () {
  return {
    action: "register",
    name: document.getElementById("regName").value,
    email: document.getElementById("regEmail").value,
    password: document.getElementById("regPassword").value,
    grade: document.getElementById("regGrade").value
  };
});