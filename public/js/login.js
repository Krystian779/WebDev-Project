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
    e.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById(
      "register-confirm-password"
    ).value;

    // Validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      alert("User already exists");
      return;
    }

    // Save new user
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");

    // Switch back to login form
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  const loginFormElement = document.querySelector("#login-form form");

  loginFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // Store logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful!");

    // Redirect after login
    window.location.href = "/";
  });
});

/*
registerFormElement.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById(
    "register-confirm-password"
  ).value;

  // Validation (you already did this well)
  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Get existing users OR empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate email
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert("User already exists");
    return;
  }

  // Save new user
  users.push({
    name,
    email,
    password,
    address: "",
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");

  registerForm.style.display = "none";
  loginForm.style.display = "block";

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    console.log("User logged in:", loggedInUser.email);
  }

  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  }
});*/
