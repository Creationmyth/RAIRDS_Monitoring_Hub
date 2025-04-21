// auth.js

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function getUsername() {
    return localStorage.getItem("username") || "";
}

function updateNavBar() {
    const navLinks = document.querySelector(".nav-links");

    // Clear current nav links
    navLinks.innerHTML = "";

    // Always show Home and About
    navLinks.innerHTML += `
        <li><a href="index.html">Home</a></li>
        <li><a href="About.html">About</a></li>
    `;

    if (isLoggedIn()) {
        // Show Dashboard and Logout if logged in
        navLinks.innerHTML += `
            <li><a href="dashboard.html">Dashboard</a></li>
            <li class="login-button"><a href="#" data-action="logout">Logout</a></li>
        `;
    } else {
        // Show Login if not logged in
        navLinks.innerHTML += `
            <li class="login-button"><a href="login.html">Login</a></li>
        `;
    }

    // Optional: Update greeting if it exists
    const userGreeting = document.querySelector(".user-greeting");
    if (userGreeting && isLoggedIn()) {
        userGreeting.textContent = `Hi, ${getUsername()}!`;
    } else if (userGreeting) {
        userGreeting.textContent = "";
    }
}

function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavBar();

    // Handle logout click with delegation
    document.addEventListener("click", function (e) {
        const target = e.target.closest("a[data-action='logout']");
        if (target) {
            e.preventDefault();
            localStorage.clear();
            firebase.auth().signOut().then(() => {
                window.location.href = "login.html"; // Redirect to login page
            }).catch((error) => {
                console.error("Logout error:", error);
            });
        }
    });
});
