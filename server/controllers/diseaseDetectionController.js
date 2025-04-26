const fs = require("fs");
const path = require("path");
const { callGeminiAPI, translateWithGroq } = require("../utils/geminiHelper");

const detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded." });
    }

    const imagePath = req.file.path;
    const selectedLang = req.body.language || "en";

    const prompt = `
You are an expert in plant pathology. Analyze the uploaded crop leaf image and return a JSON object in the following format:

{
  "crop": "Name of the crop",
  "disease": "Detected disease (or 'Healthy' if no disease)",
  "confidence": "High / Medium / Low",
  "symptoms": ["List of visible symptoms"],
  "cause": "Brief explanation of the cause",
  "organic_measures": ["Organic treatment suggestions"],
  "chemical_measures": ["Chemical treatment suggestions"],
  "advisory_note": "Short advice to the farmer"
}

Only return a **valid JSON** object. Do not include any explanation or extra text.
    `;

    const geminiResponse = await callGeminiAPI(imagePath, prompt);

    // Delete uploaded image after use
    fs.unlinkSync(imagePath);

    let prediction = {};
    try {
      const jsonStart = geminiResponse.indexOf("{");
      const jsonEnd = geminiResponse.lastIndexOf("}");
      const jsonString = geminiResponse.substring(jsonStart, jsonEnd + 1);
      prediction = JSON.parse(jsonString);
      console.log("🎯 Gemini Original Prediction:", prediction);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError.message);
      return res.status(500).json({ error: "Gemini response was not valid JSON." });
    }

    // 🌍 Translate prediction fields using Groq
    const translateArray = async (arr) => {
      return Promise.all((arr || []).map(item => translateWithGroq(item, selectedLang)));
    };

    const translatedPrediction = {
      crop: await translateWithGroq(prediction.crop, selectedLang),
      disease: await translateWithGroq(prediction.disease, selectedLang),
      confidence: await translateWithGroq(prediction.confidence, selectedLang),
      symptoms: await translateArray(prediction.symptoms),
      cause: await translateWithGroq(prediction.cause, selectedLang),
      organicMeasures: await translateArray(prediction.organic_measures),
      chemicalMeasures: await translateArray(prediction.chemical_measures),
      advisoryNote: await translateWithGroq(prediction.advisory_note, selectedLang),
    };

    res.status(200).json({
      success: true,
      prediction: translatedPrediction,
    });

  } catch (err) {
    console.error("❌ Disease Detection Error:", err);
    res.status(500).json({ error: "Failed to detect disease." });
  }
};

module.exports = { detectDisease };
