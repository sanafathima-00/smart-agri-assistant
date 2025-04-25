import React from "react";
import "./DiseaseResultCard.css";

const DiseaseResultCard = ({ prediction }) => {
  if (!prediction) return null;

  if (prediction.error) {
    return <p style={{ color: "red", fontWeight: "bold" }}>{prediction.error}</p>;
  }

  const organicList = Array.isArray(prediction.organicMeasures)
    ? prediction.organicMeasures
    : prediction.organicMeasures
      ?.split(/\n|◈|\*/g)
      .map((item) => item.trim())
      .filter(Boolean);

  const chemicalList = Array.isArray(prediction.chemicalMeasures)
    ? prediction.chemicalMeasures
    : prediction.chemicalMeasures
      ?.split(/\n|◈|\*/g)
      .map((item) => item.trim())
      .filter(Boolean);

  return (
      <div className="disease-card">
        <h2>Prediction Result</h2>

        <p><strong>Crop:</strong> {prediction.crop}</p>
        <p><strong>Disease:</strong> {prediction.disease}</p>
        <p><strong>Confidence:</strong> {prediction.confidence}</p>
        <p><strong>Symptoms:</strong> {prediction.symptoms}</p>
        <p><strong>Cause:</strong> {prediction.cause}</p>
        <div>
          <p><strong>Organic Measures:</strong></p>
          {organicList?.length > 0 ? (
            <ul className="disease-list">
              {organicList.map((measure, idx) => (
                <li key={idx}>{measure}</li>
              ))}
            </ul>
          ) : (
            <p>– No specific organic measures provided.</p>
          )}
        </div>

        <div>
          <p><strong>Chemical Measures:</strong></p>
          {chemicalList?.length > 0 ? (
            <ul className="disease-list">
              {chemicalList.map((measure, idx) => (
                <li key={idx}>{measure}</li>
              ))}
            </ul>
          ) : (
            <p>– No specific chemical measures provided.</p>
          )}
        </div>

        <p><strong>Advisory Note:</strong> {prediction.advisoryNote}</p>
      </div>
  );
};
export default DiseaseResultCard;
