let timerInterval = null;
let seconds = 0;

// current mode (from dashboard card click)
const mode = localStorage.getItem("studyMode") || "General";

// points
let points = parseInt(localStorage.getItem("points")) || 0;
document.getElementById("points").innerText = points;

// ================= TIMER =================
function startStudy() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    seconds++;

    let hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    let mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    let secs = String(seconds % 60).padStart(2, "0");
    document.getElementById("timer").innerText = `${hrs}:${mins}:${secs}`;

    // every 30 minutes
    if (seconds % 1800 === 0) {
      points += 10;
      localStorage.setItem("points", points);
      document.getElementById("points").innerText = points;

      saveProgress(30);
      drawCombinedChart();
    }
  }, 1000);
}

function stopStudy() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// ================= SAVE PROGRESS =================
function saveProgress(minutes) {
  let progress = JSON.parse(localStorage.getItem("studyProgress")) || {};
  let today = new Date().toISOString().slice(0, 10);

  if (!progress[mode]) {
    progress[mode] = {};
  }

  progress[mode][today] = (progress[mode][today] || 0) + minutes;
  localStorage.setItem("studyProgress", JSON.stringify(progress));
}

// ================= DRAW GRAPH =================
function drawCombinedChart() {
  let progress = JSON.parse(localStorage.getItem("studyProgress")) || {};

  // Collect dates
  let datesSet = new Set();
  Object.values(progress).forEach(modeData => {
    Object.keys(modeData).forEach(date => datesSet.add(date));
  });

  let labels = Array.from(datesSet).sort().slice(-60);

  // If NO data yet → show empty graph
  if (labels.length === 0) {
    labels = ["No Data"];
  }

  let colors = {
    "Pomodoro": "#5f9cff",
    "Active Recall": "#7b5cff",
    "Spaced Repetition": "#4caf50",
    "Teaching": "#ff9800",
    "General": "#9e9e9e"
  };

  let datasets = [];

  for (let mode in progress) {
    datasets.push({
      label: mode,
      data: labels.map(d => progress[mode][d] || 0),
      backgroundColor: colors[mode] || "#607d8b"
    });
  }

  // If still no datasets, add dummy one
  if (datasets.length === 0) {
    datasets.push({
      label: "Study Time",
      data: labels.map(() => 0),
      backgroundColor: "#cfd8ff"
    });
  }

  const ctx = document.getElementById("progressChart").getContext("2d");

  if (window.progressChart) {
    window.progressChart.destroy();
  }

  window.progressChart = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Minutes Studied"
          }
        }
      }
    }
  });
}

// draw once on load
drawCombinedChart();

// ================= NAV =================
function goBack() {
  window.location.href = "dashboard.html";
}
