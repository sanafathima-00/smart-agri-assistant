const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cropIssueRoutes = require("./routes/cropIssues");
const diseaseDetectionRoutes = require("./routes/diseaseDetection");
const userInfoRoutes = require("./routes/userInfo"); // ✅ New line

const app = express();
const PORT = process.env.PORT || 5000;

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🌱 MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🛣 Routes
app.use("/api/issues", cropIssueRoutes);
app.use("/api/detect", diseaseDetectionRoutes);
app.use("/api/user-info", userInfoRoutes); // ✅ New route added

// 🏠 Root route
app.get("/", (req, res) => {
  res.send("🌱 Smart Agriculture Assistant Server is Running!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
