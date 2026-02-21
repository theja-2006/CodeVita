// AUTH CHECK
const user = getCurrentUser();
if (!user || user.role !== "caretaker") {
    window.location.href = "index.html";
}

// DEMO TASK DATA
let tasks = [
    { id: 1, name: "Morning medication", time: "8:00 AM", done: false, missed: false },
    { id: 2, name: "Breakfast served", time: "8:30 AM", done: false, missed: false },
    { id: 3, name: "Physical therapy", time: "10:00 AM", done: false, missed: false },
    { id: 4, name: "Lunch prepared", time: "12:00 PM", done: false, missed: false }
];

function parseTimeToToday(timeStr) {
    const [time, modifier] = timeStr.split(" ");

    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const taskDate = new Date();
    taskDate.setHours(hours, minutes, 0, 0);

    return taskDate;
}

let photosToday = 3;
let alerts = 0;

let reliability = parseFloat(localStorage.getItem("withcare_rating")) || 5.0;
let warningShown = false;

let weeklyMisses = parseInt(localStorage.getItem("withcare_weekly_misses")) || 0;
let weekStart = localStorage.getItem("withcare_week_start");

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let completed = 0;

    tasks.forEach(task => {
        if (task.done) completed++;

        const div = document.createElement("div");
        div.className = "task-item";

        div.innerHTML = `
            <span>
    ${task.name} — ${task.time}
    ${task.missed ? '<span style="color:red">(MISSED)</span>' : ''}
</span>
            <button ${task.done ? "disabled" : ""} onclick="completeTask(${task.id})">
                ${task.done ? "✓ Done" : "Mark"}
            </button>
        `;

        list.appendChild(div);
    });

    // stats update
    document.getElementById("tasksDone").innerText =
        `${completed}/${tasks.length}`;

    document.getElementById("progress").innerText =
        Math.round((completed / tasks.length) * 100) + "%";

    document.getElementById("photos").innerText = photosToday;
    document.getElementById("alerts").innerText = alerts;
}

function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.done = true;
    addActivity(`Completed: ${task.name}`);
    renderTasks();
}

function checkEscalation() {
    // Warning at 6 misses
    if (weeklyMisses >= 6 && !warningShown) {
        addActivity("⚠ Warning: Multiple missed tasks this week");
        warningShown = true;
    }

    // Rating drop at 9 misses
    if (weeklyMisses >= 9) {
        reliability = Math.max(1, reliability - 0.5);
        localStorage.setItem("withcare_rating", reliability.toFixed(1));

        addActivity("⭐ Reliability rating decreased");
        
        // reset so it doesn't keep decreasing repeatedly
        weeklyMisses = 0;
        localStorage.setItem("withcare_weekly_misses", weeklyMisses);
    }
}

function addActivity(text) {
    // UI update (caretaker side)
    const list = document.getElementById("activityList");
    if (list) {
        const div = document.createElement("div");
        div.className = "activity-item";
        div.innerText = text;
        list.prepend(div);
    }

    // 🔥 STORE for family visibility
    let alertsFeed =
        JSON.parse(localStorage.getItem("withcare_alert_feed")) || [];

    alertsFeed.unshift({
        text: text,
        time: new Date().toLocaleString()
    });

    localStorage.setItem(
        "withcare_alert_feed",
        JSON.stringify(alertsFeed.slice(0, 50)) // keep last 50
    );
}

function checkWeeklyReset() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday start
    startOfWeek.setHours(0, 0, 0, 0);

    if (!weekStart || new Date(weekStart) < startOfWeek) {
        weeklyMisses = 0;
        weekStart = startOfWeek.toISOString();

        localStorage.setItem("withcare_weekly_misses", weeklyMisses);
        localStorage.setItem("withcare_week_start", weekStart);
    }
}

function addTask() {
    const name = prompt("Enter task name:");
    const time = prompt("Enter time (e.g., 3:00 PM)");
    if (!name || !time) return;

    tasks.push({
        id: Date.now(),
        name,
        time,
        done: false
    });

    renderTasks();
}

// initial render
checkWeeklyReset();
renderTasks();

function checkMissedTasks() {
    const now = new Date();
    let updated = false;

    tasks.forEach(task => {
        if (task.done || task.missed) return;

        const taskTime = parseTimeToToday(task.time);
        const diffMinutes = (now - taskTime) / (1000 * 60);

        // 5-minute grace rule
        if (diffMinutes > 5) {
            task.missed = true;
            alerts++;
            weeklyMisses++;
localStorage.setItem("withcare_weekly_misses", weeklyMisses);
            checkEscalation();
            addActivity(`❌ Missed: ${task.name}`);
            updated = true;
        }
    });

    if (updated) {
        renderTasks();
    }
}

// check every minute
setInterval(checkMissedTasks, 60000);

//////////////////

// 📷 Caretaker photo upload preview
document.addEventListener("DOMContentLoaded", () => {
    const upload = document.getElementById("photoUpload");
    const preview = document.getElementById("photoPreview");

    if (!upload || !preview) return;

    upload.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";

            // 🔥 save so family can see later
            localStorage.setItem("latestCarePhoto", e.target.result);

            // update stats if you have photos counter
            updatePhotoCount();
        };

        reader.readAsDataURL(file);
    });
});

// optional safe counter update
function updatePhotoCount() {
    const el = document.getElementById("photos");
    if (!el) return;

    let count = Number(localStorage.getItem("photoCount") || 0);
    count++;
    localStorage.setItem("photoCount", count);
    el.textContent = count;
}
