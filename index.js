const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
const { hp } = require("./helpers/hashpassword");
const emailvalidation = require("./helpers/emailvalidation.js");
const test = require("./middleware/test");
const { getMaxListeners } = require("./model/userSchema");
const env = require("dotenv").config({ path: "./.env" });
console.log(process.env);

mongoose.connect(
  "mongodb+srv://shoebabedin12:shoebabedin12@cluster0.rzej111.mongodb.net/oreby?retryWrites=true&w=majority",
  () => {
    console.log("your db is connected");
  }
);

app.use(cors());

app.post("/registration", async function (req, res) {
  let {
    firstname,
    lastname,
    email,
    telephone,
    address1,
    country,
    city,
    postcode,
    state,
    password,
    terms,
  } = req.body;

  let emailvali = await emailvalidation(email);

  if (!emailvali) {
    return res.send("Please provide your valid email");
  }
  let pass = await hp(password);

  let data = await User.find({ email });

  if (data[0]) {
    return res.send("This email already exist");
  }
  jwt.sign(
    {
      data: email,
    },
    "LY4,aQ!]{:e;^7\2",
    function (err, token) {
      console.log("token", token);
      let user = new User({
        firstname,
        lastname,
        email,
        telephone,
        address1,
        country,
        city,
        postcode,
        state,
        password: pass,
        terms,
        token: token,
      });

      user.save();
      res.send("Registration Successfull");
    }
  );
});

// 01645394660
app.get("/users", test, function (req, res) {
  // let data = await User.find({}).select("-password")
  // res.send(data);
  console.log("hi");
});

app.get("/email", async function (req, res) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    name: "shoeb",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: { name: process.env.COMPANY_NAME, address: process.env.EMAIL },
    to: "shoebabedin14@gmail.com",
    subject: "Reba",
    text: "Reba",
    html: '<p>hi Reba</p>',
   
  });

  res.send("Mail Sent");
});

app.listen(5000, () => {
  console.log("your port is start on 5000");
});
