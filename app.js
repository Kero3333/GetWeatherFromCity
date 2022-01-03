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
      temp: `La température de la ville de ${temp.city} est de ${temp.temp}°C`,
    });
  }
});

app.get("/", (req, res) => {
  res.render("index", { temp: "" });
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
