import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next"; // ✅ translation hook

const Navbar = () => {
  const { t } = useTranslation(); // ✅ translation function

  return (
    <nav className="navbar">
      <Link to="/">{t("nav.home")}</Link>
      <Link to="/leaf-detection">{t("nav.leafDetection")}</Link>
      <Link to="/chatbot">{t("nav.chatbot")}</Link>
    </nav>
  );
};

export default Navbar;
