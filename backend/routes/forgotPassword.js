const express = require("express");
const session = require("express-session");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: "kkalyan2312@gmail.com",
    pass: process.env.PASSWORD,
  },
  debug: true,
});

const forgotPasswordRoute = express.Router();

forgotPasswordRoute.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

forgotPasswordRoute.post("/forgot_password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    // Set expiration time for the token (e.g., 1 hour)
    const resetTokenExpiration = Date.now() + 3600000;

    // Store reset token in session
    req.session.resetToken = { token, expiration: resetTokenExpiration, email };

    const mailOptions = {
      from: "kkalyan2312@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: ` Reset your password through this token:${token}`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .send({ msg: "Email sent successfully", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
    transporter.on("error", (error) => {
      console.error("Error occurred while sending email:", error);
    });
  }
});

forgotPasswordRoute.patch("/reset_password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const resetTokenData = req.session.resetToken;

    console.log("Token Data from Request:", token);

    if (
      !resetTokenData ||
      decodeURIComponent(resetTokenData.token) !== token ||
      resetTokenData.expiration < Date.now()
    ) {
      return res.status(404).send({ msg: "Invalid or expired token" });
    }

    req.session.resetToken = null;

    const user = await UserModel.findOne({ email: resetTokenData.email });

    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    if (!newPassword) {
      return res.status(400).send({ msg: "New password is required" });
    }

    if (validatePassword(newPassword)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save();

      return res.status(200).send({ msg: "Password reset successfully" });
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
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

function validatePassword(password) {
  const pattern =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.{8,})/;

  return pattern.test(password);
}
module.exports = { forgotPasswordRoute };
