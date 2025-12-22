function createAccount() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (name === "" || email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password
  };

  // Save user to localStorage
  localStorage.setItem("studentUser", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "index.html";
}
