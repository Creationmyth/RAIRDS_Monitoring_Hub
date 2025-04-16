// auth.js

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function updateNavBar() {
    const loginBtn = document.querySelector(".login-button a");
    if (isLoggedIn()) {
        loginBtn.textContent = "Logout";
        loginBtn.href = "#";
        loginBtn.onclick = function () {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "index.html";
        };
    } else {
        loginBtn.textContent = "Login";
        loginBtn.href = "login.html";
    }
}

// Protect page
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

// Call updateNavBar on load
window.addEventListener("DOMContentLoaded", updateNavBar);
