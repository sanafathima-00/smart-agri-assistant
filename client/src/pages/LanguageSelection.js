// src/pages/LanguageSelection.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./LanguageSelection.css";

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem("farmerLanguage") || "en");

  useEffect(() => {
    // Change language immediately when dropdown changes
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("farmerLanguage", selectedLang); // Optional: persist instantly
  };

  const handleProceed = () => {
    if (language === "default") {
      alert(t("languageSelect.select"));
      return;
    }
    navigate("/auth");
  };

  return (
    <div className="language-container">
      <div className="language-overlay" />
      <h1 className="language-heading">{t("languageSelect.subtitle")}</h1>
      <div className="language-box">
        <div className="language-inner-box">
          <label htmlFor="languageSelect" className="language-label">
            {t("languageSelect.select")}
          </label>
          <select
            id="languageSelect"
            value={language}
            onChange={handleLanguageChange}
            className="language-dropdown"
          >
            <option value="default" disabled>
              -- {t("languageSelect.select")} --
            </option>
            <option value="en">{t("home.lang.english")}</option>
            <option value="hi">{t("home.lang.hindi")}</option>
            <option value="kn">{t("home.lang.kannada")}</option>
            <option value="ta">{t("home.lang.tamil")}</option>
            <option value="te">{t("home.lang.telugu")}</option>
            <option value="ml">{t("home.lang.malayalam")}</option>
            <option value="pa">{t("home.lang.punjabi")}</option>
            <option value="mr">{t("home.lang.marathi")}</option>
            <option value="bn">{t("home.lang.bengali")}</option>
            <option value="gu">{t("home.lang.gujarati")}</option>
            <option value="or">{t("home.lang.odia")}</option>
            <option value="kok">{t("home.lang.konkani")}</option>
            <option value="ks">{t("home.lang.kashmiri")}</option>
            <option value="ne">{t("home.lang.nepali")}</option>
            <option value="sa">{t("home.lang.sanskrit")}</option>
            <option value="ur">{t("home.lang.urdu")}</option>
            <option value="as">{t("home.lang.assamese")}</option>
          </select>
          <button onClick={handleProceed} className="language-proceed-button">
            {t("languageSelect.proceed")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
