// routes/cropIssues.js
const express = require("express");
const router = express.Router();
const CropIssue = require("../models/CropIssue");

// POST - Submit an issue
router.post("/", async (req, res) => {
  try {
    const { crop, location, issue, description } = req.body;

    // Validation
    if (!crop || !location || !issue || !description) {
      return res
        .status(400)
        .json({ error: "All fields are required (crop, location, issue, description)" });
    }

    const newIssue = new CropIssue({ crop, location, issue, description });
    const savedIssue = await newIssue.save();

    res
      .status(201)
      .json({ message: "Issue submitted successfully!", data: savedIssue });
  } catch (err) {
    console.error("❌ Error saving crop issue:", err);
    res.status(500).json({ error: "Failed to submit issue." });
  }
});

// GET - Fetch all issues
router.get("/", async (req, res) => {
  try {
    const issues = await CropIssue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    console.error("❌ Error fetching issues:", err);
    res.status(500).json({ error: "Failed to fetch issues." });
  }
});

module.exports = router;
