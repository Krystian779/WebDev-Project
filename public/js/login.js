// Toggle between login and register forms
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showRegisterLink = document.getElementById("show-register");
  const showLoginLink = document.getElementById("show-login");

  // Show register form
  showRegisterLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Show login form
  showLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // Client-side validation for registration
  const registerFormElement = document.querySelector("#register-form form");
  registerFormElement.addEventListener("submit", function (e) {
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById(
      "register-confirm-password"
    ).value;
    const email = document.getElementById("register-email").value;

    // Validate password length
    if (password.length < 6) {
      e.preventDefault();
      alert("Password must be at least 6 characters long");
      return false;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      e.preventDefault();
      alert("Passwords do not match");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert("Please enter a valid email address");
      return false;
    }
  });
});
