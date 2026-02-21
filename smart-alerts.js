/* ================= STORAGE HELPERS ================= */

function getTasks() {
    return JSON.parse(localStorage.getItem("withcare_tasks") || "[]");
}

function saveTasks(tasks) {
    localStorage.setItem("withcare_tasks", JSON.stringify(tasks));
}

function getCaretakerStats() {
    return JSON.parse(localStorage.getItem("withcare_ct_stats") || "{}");
}

function saveCaretakerStats(stats) {
    localStorage.setItem("withcare_ct_stats", JSON.stringify(stats));
}

/* ================= TIME CHECK ================= */

function parseTimeToday(timeStr) {
    const now = new Date();
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
}

/* ================= ALERT ENGINE ================= */

function checkMissedTasks() {
    const tasks = getTasks();
    const stats = getCaretakerStats();

    const now = new Date();

    let changed = false;

    tasks.forEach(task => {
        if (task.done) return;
        if (task.missed) return;

        const scheduled = parseTimeToday(task.time);
        const diffMinutes = (now - scheduled) / 60000;

        // 🚨 MISSED after 5 minutes
        if (diffMinutes >= 5) {
            task.missed = true;
            task.status = "missed";

            stats.weeklyMissed = (stats.weeklyMissed || 0) + 1;

            addFamilyAlert(`Missed: ${task.name}`);

            changed = true;
        }
    });

    /* ===== ESCALATION RULES ===== */

    if ((stats.weeklyMissed || 0) >= 9) {
        stats.rating = Math.max((stats.rating || 5) - 1, 1);
        stats.weeklyMissed = 0;
    }

    saveTasks(tasks);
    saveCaretakerStats(stats);

    return changed;
}

/* ================= FAMILY ALERTS ================= */

function addFamilyAlert(text) {
    const alerts = JSON.parse(localStorage.getItem("withcare_family_alerts") || "[]");

    alerts.unshift({
        text,
        time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("withcare_family_alerts", JSON.stringify(alerts));
}

/* ================= AUTO MONITOR ================= */

// runs every minute
setInterval(checkMissedTasks, 60000);