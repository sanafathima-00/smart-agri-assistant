// models/CropIssue.js
const mongoose = require("mongoose");

const cropIssueSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  location: { type: String, required: true },
  issue: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CropIssue", cropIssueSchema);
