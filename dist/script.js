document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const savedUser = JSON.parse(localStorage.getItem("studentUser"));

  if (!savedUser) {
    alert("No account found. Please create one.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    // mark user as logged in
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password");
  }
});
function socialLogin(provider) {
  alert(provider.toUpperCase() + " login coming soon 🚀");

  // Demo login
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "dashboard.html";
}
