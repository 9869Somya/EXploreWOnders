const uname = document.getElementById("name");
const quer = document.getElementById("query");
const email = document.getElementById("email");
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
    query: quer.value,
  };
  if (uname.length < 4 || quer.length < 5) {
    alert("Please fill out the query correctly.");
  } else {
    fetch("http://localhost:8000/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((el) => el.email === email.value);
        if (item === undefined) {
          // fetch("http://localhost:8000/users", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(user_data),
          // })
          //   .then((res) => res.json())
          //   .then(() => {
          //     alert(
          //       "Registration SuccessFull! Ready to Explore? Please Proceed to Login"
          //     );
          //     window.location.replace("./homepage.html");
          //   });
          alert("User does not exist!!");
        } else {
          fetch("http://localhost:8000/queries", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user_data),
          })
            .then((res) => res.json())
            .then(() => {
              alert("Query submitted successfully !!");
            });
        }
      });
  }

  // if (uname.length < 4 || quer.length < 5) {
  //   alert("Please fill out the query correctly.");
  // } else {
  //   fetch("http://localhost:8000/queries", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user_data),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       alert("Query submitted successfully !!");
  //     });
  // }
});
