# 🌾 Smart Agri Assistant

Smart Agri Assistant is a full-stack web application designed to assist farmers in identifying plant diseases, handling queries, and providing multilingual support — using cutting-edge AI technologies.

## ✨ Features

- 🌐 Language Selection (multi-language support using i18next)
- 🧑‍🌾 Farmer Authentication (Signup/Login using User ID, phone number, and location)
- 🏡 Home Page (Language re-selection)
- 🌱 Leaf Detection
  - Upload plant leaf images.
  - Detect diseases using **Gemini 1.5 Flash**.
  - Translation handled via **Groq LLaMA 3 70B** model.
- 🤖 Chatbot
  - Conversational assistant.
  - Responds in selected language.
  - Powered by **Groq LLaMA 3 70B** model.
- 🎤 Voice Support
  - Speech recognition via Web Speech API.
  - Text-to-speech responses.

## 🏗️ Project Structure

```
smart-agri-assistant/
├── public/
│   ├── locales/
│       ├── en/
│       	└── translation.json
├── client/                  
│   ├── src/
│       ├── assets/
│       	└── bg.jpeg
│       ├── components/
│       	└── DiseaseResultCard.js
│       	└── DiseaseResultCard.css
│       	└── Navbar.js
│       	└── Navbar.css
│       ├── pages/
│       	└── AuthForm.js
│       	└── AuthForm.css
│       	└── Chatbot.js
│       	└── Chatbot.css
│       	└── Home.js
│       	└── Home.css
│       	└── LanguageSelection.js
│       	└── LanguageSelection.css
│       	└── LeafDetection.js
│       	└── LeafDetection.css
│       ├── services/
│       	└── botServices.js
│       	└── speechServices.js
│       └── App.js
│       └── App.css
│       └── index.js
│       └── index.css
│       └── i18n.js
│   └── package-lock.json
│   └── package.json
│   └── .gitignore
│
├── server/
│   ├── controllers/
│       └── diseaseDetectionController.js
│   ├── models/
│       └── cropIssue.js
│       └── UserInfo.js
│   ├── routes/
│       └── cropIssues.js
│       └── diseaseDetection.js
│       └── leafUpload.js
│       └── userInfo.js         
│   ├── uploads/
│   ├── utils/
│       └── geminiHelper.js       
│   └── .env                 
│   └── index.js
│   └── package-lock.json
│   └── package.json  
└── .gitignore                       
```

## ⚙️ Technologies Used

- **Frontend:** React.js, i18next
- **Backend:** Node.js, Express.js
- **Databases:** (MongoDB / Filesystem for uploads)
- **APIs:** Gemini 1.5 Flash, Groq LLaMA 3 70B
- **Speech Services:** Web Speech API

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-agri-assistant.git
```

### 2. Setup Client (Frontend)

```bash
cd smart-agri-assistant/client
npm install
npm start
```

Runs on [http://localhost:3000](http://localhost:3000)

### 3. Setup Server (Backend)

```bash
cd smart-agri-assistant/server
npm install
npm run dev
```

Runs on [http://localhost:5000](http://localhost:5000)

### 4. Setup Environment Variables

Create a `.env` file inside `server/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```
