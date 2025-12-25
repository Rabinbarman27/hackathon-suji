// 🔐 Login protection
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

// 🚪 Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// 📘 Navigation
function openNotes() {
  window.location.href = "notes.html";
}

function openStudyMethods() {
  window.location.href = "study-methods.html";
}

function openProgress() {
  window.location.href = "progress.html";
}

// ⏱️ Start study session from card
function startSession(mode) {
  localStorage.setItem("activeMode", mode);
  localStorage.setItem("sessionStart", Date.now());

  window.location.href = "progress.html";
}
function drawCardCharts() {
  let progress = JSON.parse(localStorage.getItem("progressByMode")) || {};

  function draw(id, label, color) {
    let data = progress[label] || [];
    new Chart(document.getElementById(id), {
      type: "line",
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [{
          label: label,
          data,
          borderColor: color,
          tension: 0.4
        }]
      }
    });
  }

  draw("pomodoroChart", "Pomodoro", "#5f9cff");
  draw("recallChart", "Active Recall", "#7b5cff");
  draw("spacedChart", "Spaced Repetition", "#4caf50");
  draw("teachingChart", "Teaching", "#ff9800");
}

drawCardCharts();
