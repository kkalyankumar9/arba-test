const express = require("express");
const { auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");

const profileRoutes = express.Router();

profileRoutes.use(auth);

profileRoutes.patch("/profile_update/:id", async (req, res) => {
  const { id } = req.params;
  const { fullName, avatar, newPassword } = req.body;

  try {
    const user = await UserModel.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (avatar) {
      user.avatar = avatar;
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ msg: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

profileRoutes.get("/get", async (req, res) => {
  try {
    const data = await UserModel.find({ _id: req.body.userID });
    res.status(200).send(data);
    console.log(data)
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = { profileRoutes };
