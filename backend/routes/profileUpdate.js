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

  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});
profileRoutes.patch("/change_password/:id", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    // Find the user by id
    const user = await UserModel.findById(id);
    
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Compare old password with the one stored in the database
    bcrypt.compare(oldPassword, user.password, async (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      }

      if (!result) {
        return res.status(401).send({ error: "Invalid old password" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password with the new hashed password
      await UserModel.findByIdAndUpdate(id, { password: hashedPassword });

      res.status(200).send({ message: "Password updated successfully" });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: "Internal server error" });
  }
});


module.exports = { profileRoutes };
