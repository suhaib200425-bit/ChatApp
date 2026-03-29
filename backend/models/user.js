const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  profileImage: {
    type: String,
    default: ""
  },

  isVerified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;