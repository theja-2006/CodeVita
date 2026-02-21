// Simple localStorage-based auth system

function getUsers() {
    return JSON.parse(localStorage.getItem("withcare_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("withcare_users", JSON.stringify(users));
}

function registerUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

function loginUser(email, password) {
    const users = getUsers();
    return users.find(
        u => u.email === email && u.password === password
    );
}

function setCurrentUser(user) {
    localStorage.setItem("withcare_current_user", JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("withcare_current_user"));
}

function logout() {
    localStorage.removeItem("withcare_current_user");
    window.location.href = "index.html";
}