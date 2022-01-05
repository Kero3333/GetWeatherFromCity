const city = document.querySelector("#city");

const updateButton = () => {
  const submit = document.querySelector("#submit");
  if (city.value === "") {
    submit.setAttribute("disabled", false);
    submit.style.backgroundColor = "grey";
  } else {
    submit.removeAttribute("disabled");
    submit.style.backgroundColor = "blue";
  }
  console.log(city.value);
};

city.addEventListener("input", updateButton);
updateButton();
