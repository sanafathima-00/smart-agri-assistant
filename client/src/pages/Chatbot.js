import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendMessageToBot } from "../services/botService";
import { startSpeechRecognition, speakText } from "../services/speechService";
import "./Chatbot.css";

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    { text: t("chat.welcome"), isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");
  const [listening, setListening] = useState(false);

  const getLanguageCode = () => {
    const lang = localStorage.getItem("farmerLanguage") || i18n.language || "en";
    const langMap = {
      en: "en-IN",
      hi: "hi-IN",
      kn: "kn-IN",
      ta: "ta-IN",
      te: "te-IN",
      ml: "ml-IN",
      pa: "pa-IN",
      mr: "mr-IN",
      bn: "bn-IN",
      gu: "gu-IN",
      or: "or-IN",
      as: "as-IN",
      kok: "kok-IN",
      ks: "ks-IN",
      ne: "ne-NP",
      sa: "sa-IN",
      ur: "ur-IN",
    };
    return langMap[lang] || "en-IN";
  };

  const startListening = () => {
    const langCode = getLanguageCode();
    setListening(true);

    startSpeechRecognition(
      langCode,
      (transcript) => {
        setUserInput(transcript);
        setListening(false);
      },
      () => {
        setListening(false);
      }
    );
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const lang = localStorage.getItem("farmerLanguage") || "en";
    const userMessage = { text: userInput, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    const botResponses = await sendMessageToBot(userInput, lang);
    const botMessages = botResponses.map((text) => ({ text, isUser: false }));

    // ✅ Speak cleaned-up, language-respected bot responses
    botMessages.forEach((msg) => speakText(msg.text, getLanguageCode()));
    setMessages((prev) => [...prev, ...botMessages]);
    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-background-overlay"></div>
      <h2 className="chatbot-title">{t("chat.title")}</h2>
      <div className="chatbot-box">
        <div className="chatbot-inner-box">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.isUser ? "user" : "bot"}`}>
                <span className={`chatbot-bubble ${msg.isUser ? "user" : "bot"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              className="chatbot-input"
            />
            <button onClick={startListening} className="chatbot-mic-button">
              {listening ? "🔴" : "🎙️"}
            </button>
            <button onClick={handleSend} className="chatbot-send-button">
              {t("chat.send")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;