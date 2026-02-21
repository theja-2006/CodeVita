const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active-form");
    registerForm.classList.remove("active-form");
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active-form");
    loginForm.classList.remove("active-form");
});

/* ================= REGISTER ================= */
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const role = registerForm.querySelector('input[name="role"]:checked')?.value;

    if (!role) {
        alert("Please select a role");
        return;
    }

    const user = {
        id: Date.now(),
        name,
        email,
        password,
        role,
        rating: 5,
        weeklyMissed: 0
    };

    registerUser(user);
    setCurrentUser(user);

    routeUser(user);
});

/* ================= LOGIN ================= */
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    const user = loginUser(email, password);

    if (!user) {
        alert("Invalid credentials");
        return;
    }

    setCurrentUser(user);
    routeUser(user);
});

/* ================= ROUTING ================= */
function routeUser(user) {
    if (user.role === "family") {
        window.location.href = "family.html";
    } else {
        window.location.href = "caretaker.html";
    }
}