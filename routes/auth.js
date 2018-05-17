const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();

//USER MODEL
const User = require("../models/user-model");

//BCRYPT - encryption for passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//// CREATE new user if the username doesn't exist in the database
authRoutes.post("/signup", (req, res, next) => {
  // const firstname = req.body.firstName;
  // const lastname = req.body.lastName;
  // const username = req.body.username;
  // const birthday = req.body.birthday;
  // const emailAddress = req.body.emailAddress;
  // const shippingAddress = req.body.shippingAddress;
  // const role = req.body.role;
  // const password = req.body.password;

  const {
    firstName,
    lastName,
    userName,
    birthday,
    emailAddress,
    shippingAddress,
    password
  } = req.body;

  console.log(req.body);
  if (userName === "" || password === "") {
    const err = new Error("User or password invalid");
    err.status = 400;
    next(err);
    return;
  }

  User.findOne({ userName }, "userName", (err, user) => {
    if (user !== null) {
      const err = new Error("User name already exists");
      err.status = 400;
      next(err);
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      userName,
      password: hashPass,
      firstName,
      lastName,
      emailAddress,
      role: "user"
    });

    newUser.save(err => {
      if (err) {
        next(err);
      } else {
        req.login(newUser, () => {
          newUser.password = undefined;
          res.send({ userInfo: newUser });
        });
      }
    });
  });
});

// CREATE new session and return user resource
authRoutes.post("/login", (req, res, next) => {
  console.log("eheheheeh");
  const myFunction = passport.authenticate("local", (err, theUser, x) => {
    if (err) {
      next(err);
      return;
    }
    if (!theUser) {
      const err = new Error("Log in Failed");
      err.status = 400;
      next(err);
      return;
    }

    req.login(theUser, () => {
      theUser.password = undefined;
      res.json({ userInfo: theUser });
    });
  });
  myFunction(req, res, next);
});

// LOG OUT
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json({ userInfo: null });
});

// CHECKING THE LOG IN
authRoutes.get("/checklogin", (req, res, next) => {
  if (req.user) {
    req.user.password = undefined;
  }
  res.json({ userInfo: req.user });
});

module.exports = authRoutes;
