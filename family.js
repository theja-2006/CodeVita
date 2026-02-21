// AUTH CHECK
const user = getCurrentUser();
if (!user || user.role !== "family") {
    window.location.href = "index.html";
}

let tasks = [];
let alerts = [];
let rating = 5.0;
let proofCount = 0;

// SAVE PROFILE
function saveProfile() {
    const name = document.getElementById("patientName").value;
    const type = document.getElementById("careType").value;

    if (!name || !type) {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("careProfile", JSON.stringify({ name, type }));

    document.getElementById("profileStatus").innerText =
        "✅ Care profile saved";
}

function loadFamilyAlerts() {
    const container = document.getElementById("familyAlerts");
    if (!container) return;

    const alertsFeed =
        JSON.parse(localStorage.getItem("withcare_alert_feed")) || [];

    container.innerHTML = "";

    if (alertsFeed.length === 0) {
        container.innerHTML =
            "<p style='color:#777'>No alerts yet</p>";
        return;
    }

    const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

alertsFeed
    .filter(a => new Date(a.time) >= oneWeekAgo)
    .slice(0, 10)
    .forEach(alert => {
        const div = document.createElement("div");
        div.className = "activity-item";
        div.innerText = `${alert.text} — ${alert.time}`;
        container.appendChild(div);
    });
}

// ADD TASK (family assigns only)
function addTask() {
    const name = prompt("Task name:");
    const time = prompt("Task time (e.g., 9:00 AM)");
    if (!name || !time) return;

    tasks.push({
        id: Date.now(),
        name,
        time,
        status: "pending"
    });

    renderTasks();
}

// RENDER TASKS (view only)
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let pending = 0;

    tasks.forEach(task => {
        if (task.status !== "completed") pending++;

        const div = document.createElement("div");
        div.className = "task-item";

        div.innerHTML = `
            <span>${task.name} — ${task.time}</span>
            <span>${task.status}</span>
        `;

        list.appendChild(div);
    });

    document.getElementById("taskStatus").innerText =
        `${pending} Pending`;

    document.getElementById("missedAlerts").innerText = alerts.length;
    document.getElementById("rating").innerText = `⭐ ${rating.toFixed(1)}`;
    document.getElementById("proofCount").innerText = proofCount;
}

function startFamilyAutoRefresh() {
    setInterval(() => {
        loadFamilyAlerts();
        loadCaretakerRating();
        // add more loaders here later if needed
    }, 10000); // every 10 seconds
}

// DEMO ALERT (later backend will control)
function addAlert(text) {
    alerts.push(text);

    const list = document.getElementById("alertList");
    const div = document.createElement("div");
    div.className = "alert-item";
    div.innerText = text;

    list.prepend(div);
}

// INITIAL
renderTasks();

loadFamilyAlerts();
//loadCaretakerRating();
startFamilyAutoRefresh();

// ================= FAMILY PHOTO VIEW =================
document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("familyPhotoView");
    const text = document.getElementById("noPhotoText");

    if (!img || !text) return;

    const savedPhoto = localStorage.getItem("latestCarePhoto");

    if (savedPhoto) {
        img.src = savedPhoto;
        img.style.display = "block";
        text.style.display = "none";
    } else {
        img.style.display = "none";
        text.style.display = "block";
    }
});