const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name must contain at least 2 characters"],
    maxLength: [30, "Name cannot exceed 32 characters"],
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    minLength: [10, "Phone must contain at least 10 characters"],
    maxLength: [11, "Phone cannot exceed 12 characters"],
  },

  password: {
    type: String,
    required: true,
    minLength: [8, "Passwod must contain at least 8 characters"],

  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
