const city = document.querySelector("#city");

const updateButton = () => {
  const submit = document.querySelector("#submit");
  if (city.value === "") {
    submit.setAttribute("disabled", false);
  } else {
    submit.removeAttribute("disabled");
  }
  console.log(city.value);
};

city.addEventListener("input", updateButton);
updateButton();
