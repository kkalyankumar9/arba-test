const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const { BlackListModule } = require("../models/blackList");

const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res) => {
  const { firstName, userName, email, password, avatar } = req.body;

  try {
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      return res.status(400).send({ msg: "Invalid email format" });
    }

    const user = await UserModel.find({ email });
    console.log(user);
    if (user.length) {
      return res.status(400).send({ msg: "User is Already exists" });
    } else {
      if (validatePassword(password)) {
        bcrypt.hash(password, 2, async (err, hash) => {
          if (err) {
            res.status(400).send({ err: err });
          } else {
            const data = new UserModel({
              fullName: firstName,
              userName,
              email,
              password: hash,
              avatar,
            });
            await data.save();
            res.status(200).send({ msg: "User Signup successfully" });
          }
        });
      } else {
        res.status(400).send({
          msg: "Password must meet the following criteria:",
          requirements: {
            length: "At least 8 characters",
            uppercase: "At least one uppercase letter (A-Z)",
            digit: "At least one digit (0-9)",
            specialCharacter:
              "At least one special character (!@#$%^&*()_+{}[]:;<>,.?~)",
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

userRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const secretkey = process.env.SECRETKEY;
          if (!secretkey) {
            return res.status(500).send({ msg: "Secret key not defined" });
          }
          const token = jwt.sign(
            { userID: user._id, owner: user.userName },
            secretkey
          );

          res.status(200).send({
            msg: "Login successfull",
            token: token,
          });
        } else {
          res.status(400).send({ err: "password does not match" });
        }
      });
    } else {
      res.status(400).send({ err: "email not match" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

userRoutes.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    // Verify the token
    jwt.verify(token, process.env.SECRETKEY, async (error, decode) => {
      if (error) {
        return res.status(400).json({ msg: "Invalid token" });
      }
      // Check if the token is blacklisted
      const isBlacklisted = await BlackListModule.findOne({ token });

      if (isBlacklisted) {
        return res
          .status(400)
          .json({ msg: "Token blacklisted, please log in again" });
      } else {
        await BlackListModule.create({ token });

        return res.status(200).json({ msg: "Logout Successfull." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
module.exports = { userRoutes };

function validatePassword(password) {
  const pattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;

  return pattern.test(password);
}
