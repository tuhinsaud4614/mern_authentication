require("dotenv").config();
const router = require("express").Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/", (req, res) => res.json({ msg: "users works" }));

// Register
router.post("/register", cors(), (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);
  
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // rating
          d: "mm" // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", cors(), (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    // Find user by email
    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not Found";
        return res.status(404).json(errors);
      }
      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          /// res.json({ msg: "success" });
          //user matched
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          //Sign Token
          jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(404).json(errors);
        }
      });
    });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      msg: "success",
      user: {
        id: req.user.id,
        email: req.user.email
      }
    });
  }
);

module.exports = router;
