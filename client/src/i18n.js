// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem("farmerLanguage") || "en", // 👈 Force default or stored
    debug: false,
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    react: {
      useSuspense: false
    },
    supportedLngs: [
      'as', 'en', 'hi', 'kn', 'ta', 'te', 'ml', 'pa', 'mr', 'bn', 'gu', 'or',
      'kok', 'ks', 'ne', 'sa', 'ur'
    ]
  });

export default i18n;
