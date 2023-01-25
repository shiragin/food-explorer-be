const { request } = require("express");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  savedrecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  password: {
    type: String,
    required: true,
  },
  repassword: {
    type: String
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
});

userSchema.methods.generateAuthToken = function () {
  const user = this;

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_TOKEN, { expiresIn: "1000000hr" });
  console.log(token, "tokennn")
  return token;
}


const User = mongoose.model("User", userSchema);

module.exports = User;
