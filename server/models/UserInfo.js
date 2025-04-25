const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  name: String,
  location: String,
  language: String,
  timestamp: Date,
});

module.exports = mongoose.model("UserInfo", userInfoSchema);