const getCoordinate = require("./getCoordinate.js");
const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.post("/", async (req, res) => {
  const city = req.body.city;
  console.log(req.body);
  const temp = await getCoordinate(city);
  if (temp.error) {
    res.render("index", { temp: temp.error });
  } else {
    console.log(temp);
    res.render("index", {
      temp: `The temperature of ${temp.city} is ${temp.temp}°C`,
    });
  }
});

app.get("/", (req, res) => {
  res.render("index", { temp: "" });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
