const fs = require("fs");
const axios = require("axios");
const path = require("path");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const callGeminiAPI = async (imagePath, userPrompt) => {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString("base64");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: userPrompt,
              },
              {
                inlineData: {
                  mimeType: "image/png", // Change to "image/jpeg" if your uploads are JPG
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const prediction = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No prediction received.";
    return prediction;
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { callGeminiAPI };
