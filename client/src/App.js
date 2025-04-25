import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LeafDetection from "./pages/LeafDetection";
import Chatbot from "./pages/Chatbot";
import Navbar from "./components/Navbar";
import LanguageSelection from "./pages/LanguageSelection";
import AuthForm from "./pages/AuthForm";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("farmerLanguage");
    if (savedLang && savedLang !== "default") {
      i18n.changeLanguage(savedLang);
      setLanguageSelected(true);
    }
  }, [i18n]);

  return (
    <Router>
      {/* Only show Navbar after login - we’ll handle this in Home.js later */}
      <Routes>
        <Route path="/" element={<LanguageSelection />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/auth" element={<Home />} />
        <Route path="/leaf-detection" element={<><Navbar /><LeafDetection /></>} />
        <Route path="/chatbot" element={<><Navbar /><Chatbot /></>} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
      </Routes>
    </Router>
  );
}

export default App;
