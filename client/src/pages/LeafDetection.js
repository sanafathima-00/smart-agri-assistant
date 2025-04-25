import React, { useState } from "react";
import axios from "axios";
import "./LeafDetection.css";
import DiseaseResultCard from "../components/DiseaseResultCard";
import { useTranslation } from "react-i18next"; // ✅ i18n hook

const LeafDetection = () => {
  const { t } = useTranslation(); // ✅ translation function

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert(t("leaf.alertNoImage"));
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    const farmerLanguage = localStorage.getItem("farmerLanguage") || "en";
    formData.append("language", farmerLanguage);

    try {
      const response = await axios.post("http://localhost:5000/api/detect", formData);
      if (response.data.success) {
        setResult(response.data.prediction);
      } else {
        setResult({ error: response.data.error || t("leaf.errorUnknown") });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: t("leaf.errorSubmit") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaf-container">
      <div className="leaf-background-overlay"></div>
      <div className="leaf-inner">
        <h2 className="leaf-title">{t("leaf.title")}</h2>

        <div className="leaf-form-box">
          <div className="leaf-form-inner-box">
            <form onSubmit={handleSubmit}>
              {!preview && (
                <>
                  <label htmlFor="file-upload" className="leaf-custom-file-upload">
                    {t("leaf.chooseImage")}
                  </label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} />
                </>
              )}

              {preview && <img src={preview} alt="Leaf Preview" className="leaf-preview" />}

              <button type="submit" disabled={loading}>
                {loading ? t("leaf.analyzing") : t("leaf.submit")}
              </button>
            </form>
          </div>
        </div>

        {result && (
          <div className="leaf-result-box">
            <DiseaseResultCard prediction={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeafDetection;
