const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: String,
    fullName : String,


    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
  
    avatar: String
  },
  {
    versionKey: false,
  }
);

const UserModel = new mongoose.model("usersdata", userSchema);

module.exports = { UserModel };
