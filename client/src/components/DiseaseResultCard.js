// src/components/DiseaseResultCard.js
import React from "react";
import { useTranslation } from "react-i18next"; // 👈 Import useTranslation hook
import "./DiseaseResultCard.css";

const DiseaseResultCard = ({ prediction }) => {
  const { t } = useTranslation(); // 👈 Initialize

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
      <h2>{t('prediction.title')}</h2>

      <p><strong>{t('prediction.crop')}:</strong> {prediction.crop}</p>
      <p><strong>{t('prediction.disease')}:</strong> {prediction.disease}</p>
      <p><strong>{t('prediction.confidence')}:</strong> {prediction.confidence}</p>
      <p><strong>{t('prediction.symptoms')}:</strong> {prediction.symptoms}</p>
      <p><strong>{t('prediction.cause')}:</strong> {prediction.cause}</p>

      <div>
        <p><strong>{t('prediction.organicMeasures')}:</strong></p>
        {organicList?.length > 0 ? (
          <ul className="disease-list">
            {organicList.map((measure, idx) => (
              <li key={idx}>{measure}</li>
            ))}
          </ul>
        ) : (
          <p>{t('prediction.noOrganicMeasures')}</p>
        )}
      </div>

      <div>
        <p><strong>{t('prediction.chemicalMeasures')}:</strong></p>
        {chemicalList?.length > 0 ? (
          <ul className="disease-list">
            {chemicalList.map((measure, idx) => (
              <li key={idx}>{measure}</li>
            ))}
          </ul>
        ) : (
          <p>{t('prediction.noChemicalMeasures')}</p>
        )}
      </div>

      <p><strong>{t('prediction.advisoryNote')}:</strong> {prediction.advisoryNote}</p>
    </div>
  );
};

export default DiseaseResultCard;
