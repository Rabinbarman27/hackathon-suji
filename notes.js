// Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerText =
    now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Calendar
function loadCalendar() {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const days = new Date(year, now.getMonth() + 1, 0).getDate();

  let html = `<strong>${month} ${year}</strong><br><br>`;
  for (let i = 1; i <= days; i++) {
    html += i + " ";
  }
  document.getElementById("calendar").innerHTML = html;
}
loadCalendar();

// Notes
function saveNotes() {
  const subject = document.getElementById("subject").value;
  const notes = document.getElementById("notes").value;

  if (!subject || !notes) {
    alert("Please fill both fields");
    return;
  }

  const div = document.createElement("div");
  div.className = "note";
  div.innerHTML = `<strong>${subject}</strong><br>${notes}`;

  document.getElementById("savedNotes").appendChild(div);

  document.getElementById("subject").value = "";
  document.getElementById("notes").value = "";
}

function goBack() {
  window.history.back();
}
function buildCalendar() {
  const cal = document.getElementById("calendar");
  const today = new Date().getDate();

  cal.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    let d = document.createElement("div");
    d.className = "cal-day";
    d.innerText = i;

    if (i === today) {
      d.classList.add("today");
    }

    cal.appendChild(d);
  }
}

buildCalendar();
