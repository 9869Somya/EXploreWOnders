const uname = document.getElementById("fullName");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const dob = document.getElementById("dob");
const gen = document.getElementById("gender");
const coun = document.getElementById("country");
const num = document.getElementById("contactNumber");
const traPref = document.getElementById("travelPreferences");
const submit_form = document.getElementById("submit");

function isEmail(eemail) {
  for (var i = 0; i < eemail.length; i++)
    if (eemail.charAt(i) === "@") return true;
  return false;
}

submit_form.addEventListener("click", (e) => {
  e.preventDefault();
  const user_data = {
    name: uname.value,
    email: email.value,
    password: pass.value,
    dob: dob.value,
    gender: gen.value,
    country: coun.value,
    contact: num.value,
    travelPreference: traPref.value,
  };

  if (!isEmail(email.value) || pass.value.length < 6 || uname.length === 0) {
    alert(
      "! Reminder\n --> All Fields are mandatory\n--> Email should be valid\n--> Password length should not be less than 6"
    );
  } else {
    fetch("http://localhost:8000/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((el) => el.email === email.value);
        if (item === undefined) {
          fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user_data),
          })
            .then((res) => res.json())
            .then(() => {
              alert(
                "Registration SuccessFull! Ready to Explore? Please Proceed to Login"
              );
              window.location.replace("./homepage.html");
            });
        } else {
          alert(
            "User Already Exist!\nPlease Login or \nCreate account with another email !"
          );
          window.location.assign("./signup.html");
        }
      });
  }
});
