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
    <li><a href="#">About</a></li>
  `;

    if (isLoggedIn()) {
        // Show Dashboard if logged in
        navLinks.innerHTML += `
      <li><a href="dashboard.html">Dashboard</a></li>
      <li class="login-button"><a href="#">Logout</a></li>
    `;

        const logoutBtn = navLinks.querySelector(".login-button a");
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.clear();
            firebase.auth().signOut().then(() => {
                window.location.href = "index.html";
            });
        });
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

window.addEventListener("DOMContentLoaded", updateNavBar);
document.addEventListener("DOMContentLoaded", () => {
    updateNavBar();

    // Safely bind logout button
    document.body.addEventListener("click", function (e) {
        if (e.target.closest(".login-button a") && e.target.textContent === "Logout") {
            e.preventDefault();
            localStorage.clear();
            firebase.auth().signOut().then(() => {
                window.location.href = "index.html";
            });
        }
    });
});
