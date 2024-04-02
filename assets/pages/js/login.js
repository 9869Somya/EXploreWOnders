const email = document.getElementById("email");
const pass = document.getElementById("password");
const button = document.getElementById("login");

button.addEventListener("click", () => {
  const userEmail = email.value.trim();
  const userPassword = pass.value.trim();

  if (userEmail === "" || userPassword === "") {
    alert("Please enter both email and password");
    return;
  }

  fetch(`http://localhost:8000/users`)
    .then((res) => res.json())
    .then((data) => {
      const comp = data.find(
        (el) => el.email === userEmail && el.password === userPassword
      );

      if (comp !== undefined) {
        alert("Logged in!!");
        // localStorage.setItem("token", JSON.stringify(Date.now()));
        // localStorage.setItem("id", JSON.stringify(comp.id));
        window.location.href = "./homepage.html";
      } else {
        alert("User does not exist!!");
        window.location.href = "./signup.html";
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});
