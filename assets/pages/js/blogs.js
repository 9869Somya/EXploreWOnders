const bpic = document.getElementById("image");
const date = document.getElementById("date");
const title = document.getElementById("title");
const desc = document.getElementById("description");
const submit_form = document.getElementById("submit");

let url11 = "";
bpic.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsDataURL(bpic.files[0]);
  fr.addEventListener("load", () => {
    url11 = fr.result;
  });
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const user_data = {
    date: date.value,
    title: title.value,
    image:
      bpic.value.length === 0
        ? "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww"
        : url11,
    description: desc.value,
  };

  if (title.length === 0 || desc.length === 0) {
    alert("! Reminder\n --> All Fields are mandatory");
  } else {
    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Blog post created successfully!");
      });
  }
});
