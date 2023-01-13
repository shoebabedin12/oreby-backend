const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/userSchema");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const { hp } = require("./helpers/hashpassword");
const emailvalidation = require("./helpers/emailvalidation.js");

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
    terms
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
        token: token
      });
      
      user.save();
      res.send("Registration Successfull");
    }
  );
  
});


// 01645394660
app.get("/users", async function (req, res) {
  let data = await User.find({}).select("-password")
  res.send(data);

});

app.listen(5000, () => {
  console.log("your port is start on 5000");
});
