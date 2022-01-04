const getCoordinate = require("./getCoordinate.js");
const express = require("express");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.post("/", async (req, res) => {
  const city = req.body.city;
  console.log(req.body);
  try {
    const temp = await getCoordinate(city);
    console.log(temp);
    if (temp.error) {
      res.render("index", { info: `${temp.error}` });
    }
    res.render("index", { info: { city: city, temp: temp } });
  } catch (error) {
    console.log(error);
    res.render("index", { error });
  }
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact", { msg: "" });
});

app.post("/contact", async (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOpts = {
    to: process.env.GMAIL_USER,
    subject: `${req.body.name} <${req.body.email}>`,
    text: `${req.body.message}`,
  };

  transporter.sendMail(mailOpts, (err, response) => {
    if (err) {
      console.log(err.message);
      res.render("contact", {});
    } else {
      const alertMsg = "message as send";
      res.render("contact", { msg: 0 });
    }
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
