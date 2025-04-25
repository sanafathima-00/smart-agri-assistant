const express = require("express");
const router = express.Router();
const UserInfo = require("../models/UserInfo");

// POST /api/user-info
router.post("/", async (req, res) => {
  try {
    const { name, location, language } = req.body;

    const newUser = new UserInfo({
      name,
      location,
      language,
      timestamp: new Date(),
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User info saved!" });
  } catch (err) {
    console.error("Error saving user info:", err.message);
    res.status(500).json({ success: false, message: "Failed to save user info." });
  }
});

module.exports = router;