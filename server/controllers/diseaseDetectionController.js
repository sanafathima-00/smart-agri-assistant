const fs = require("fs");
const path = require("path");
const { callGeminiAPI } = require("../utils/geminiHelper");

const detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded." });
    }

    const imagePath = req.file.path;

    const prompt = `
You are an expert in plant pathology. Analyze the uploaded crop leaf image and return a JSON object in the following format:

{
  "crop": "Name of the crop",
  "disease": "Detected disease (or 'Healthy' if no disease)",
  "confidence": "High / Medium / Low",
  "symptoms": "List of visible symptoms",
  "cause": "Brief explanation of the cause",
  "organic_measures": "Organic treatment suggestions",
  "chemical_measures": "Chemical treatment suggestions",
  "advisory_note": "Short advice to the farmer"
}

Only return a **valid JSON** object. Do not include any explanation or extra text.
    `;

    const geminiResponse = await callGeminiAPI(imagePath, prompt);

    // Clean up the uploaded image
    fs.unlinkSync(imagePath);

    // Try to parse Gemini's response as JSON
    let prediction = {};
    try {
      // Extract JSON if Gemini returns extra text before/after
      const jsonStart = geminiResponse.indexOf("{");
      const jsonEnd = geminiResponse.lastIndexOf("}");
      const jsonString = geminiResponse.substring(jsonStart, jsonEnd + 1);

      prediction = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError.message);
      return res.status(500).json({ error: "Gemini response was not valid JSON." });
    }

    // Send structured result
    // Normalize keys to camelCase for frontend
const camelCasePrediction = {
  crop: prediction.crop,
  disease: prediction.disease,
  confidence: prediction.confidence,
  symptoms: prediction.symptoms,
  cause: prediction.cause,
  organicMeasures: prediction.organic_measures,
  chemicalMeasures: prediction.chemical_measures,
  advisoryNote: prediction.advisory_note,
};

res.status(200).json({ success: true, prediction: camelCasePrediction });

  } catch (err) {
    console.error("❌ Disease Detection Error:", err);
    res.status(500).json({ error: "Failed to detect disease." });
  }
};

module.exports = { detectDisease };
