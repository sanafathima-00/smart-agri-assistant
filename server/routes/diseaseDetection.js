const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { detectDisease } = require("../controllers/diseaseDetectionController");

// Save uploaded files to /uploads directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Use Gemini-based controller
router.post("/", upload.single("image"), detectDisease);

module.exports = router;
