// auth.js

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function getUsername() {
    return localStorage.getItem("username") || "";
}

function updateNavBar() {
    const loginBtn = document.querySelector(".login-button a");
    const userGreeting = document.querySelector(".user-greeting");

    if (isLoggedIn()) {
        loginBtn.textContent = "Logout";
        loginBtn.href = "#";
        loginBtn.onclick = function () {
            localStorage.clear();
            window.location.href = "index.html";
        };

        if (userGreeting) {
            userGreeting.textContent = `Hi, ${getUsername()}!`;
        }
    } else {
        loginBtn.textContent = "Login";
        loginBtn.href = "login.html";
        if (userGreeting) userGreeting.textContent = "";
    }
}

function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

window.addEventListener("DOMContentLoaded", updateNavBar);
