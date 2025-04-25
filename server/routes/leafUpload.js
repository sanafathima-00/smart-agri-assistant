const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in uploads/ folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename with timestamp
  },
});

const upload = multer({ storage });

// POST route
router.post("/upload-leaf", upload.single("leafImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  res.status(200).json({
    message: "Image uploaded successfully!",
    filePath: req.file.path,
  });
});

module.exports = router;
