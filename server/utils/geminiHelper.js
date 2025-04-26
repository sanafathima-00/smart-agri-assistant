const fs = require("fs");
const axios = require("axios");
const path = require("path");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY; // Add this!

// --- Gemini (for disease prediction) ---
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
              { text: userPrompt },
              {
                inlineData: {
                  mimeType: "image/png", // or "image/jpeg"
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const prediction = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No prediction received.";
    return prediction;
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    throw error;
  }
};

// --- Groq (for translation) ---
const translateWithGroq = async (text, targetLang) => {
  try {
    if (targetLang === "en") return text; // No translation needed

    const prompt = `Translate the following text into '${targetLang}' language:\n\n"${text}"`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a professional translator. ONLY return the translated text in the target language. DO NOT add any explanations, notes, or additional commentary."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
      }
    );    

    const translated = response.data.choices?.[0]?.message?.content?.trim() || text;
    return translated;
  } catch (error) {
    console.error("⚠️ Groq Translation Error:", error.response?.data || error.message);
    return text; // Fallback to original
  }
};

module.exports = { callGeminiAPI, translateWithGroq };
