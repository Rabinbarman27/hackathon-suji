let startTime = localStorage.getItem("sessionStart");
let mode = localStorage.getItem("studyMode");

document.getElementById("modeTitle").innerText =
  mode + " Mode 📘";

function updateTimer() {
  let now = Date.now();
  let diff = Math.floor((now - startTime) / 1000);

  let h = String(Math.floor(diff / 3600)).padStart(2, "0");
  let m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  let s = String(diff % 60).padStart(2, "0");

  document.getElementById("timer").innerText =
    `${h}:${m}:${s}`;
}

setInterval(updateTimer, 1000);

function stopSession() {
  alert("Study session ended ✅");
  localStorage.removeItem("sessionStart");
  window.location.href = "dashboard.html";
}
