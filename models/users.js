const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
