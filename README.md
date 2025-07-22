# **Smart Agriculture Assistant – Backend**



## 🌾 Project Overview

The **Smart Agri Assistant Backend** is the core server and API layer powering the Smart Agri Assistant web application. It handles user management, image uploads, disease detection logic using Gemini, and integrates AI capabilities via Groq.

---

## ✨ Features

- 📦 RESTful APIs for user authentication and crop issue submission
- 🌿 Upload and store plant leaf images securely
- 🧠 Disease detection via **Gemini 1.5 Flash**
- 🌍 Translated results using **Groq LLaMA 3 70B**
- 🔐 Secure handling of user data with MongoDB

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Services**: Gemini 1.5 Flash, Groq LLaMA 3 70B
- **File Handling**: `multer` for uploads
- **Env Management**: `dotenv`

---

## 🚀 Installation and Setup

### Prerequisites
- Node.js, npm, MongoDB

### Steps

1. Navigate to the server directory:
   ```bash
   cd smart-agri-assistant/server
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. Start the Server:
   ```bash
   node index.js
   ```

5. Runs on: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure (Backend only)

```
server/
├── controllers/
│   └── diseaseDetectionController.js
├── models/
│   ├── cropIssue.js
│   └── UserInfo.js
├── routes/
│   ├── cropIssues.js
│   ├── diseaseDetection.js
│   ├── leafUpload.js
│   └── userInfo.js
├── uploads/
├── utils/
│   └── geminiHelper.js
├── .env
├── index.js
├── package.json
└── .gitignore
```

---

## 📦 Dependencies

- express
- mongoose
- dotenv
- multer
- axios
- cors

---

## 🔧 Customization

- Update AI model logic in `utils/geminiHelper.js`
- Add new endpoints in `routes/`
- Customize MongoDB schemas in `models/`

---

## 🐞 Known Issues

- Rate limits from Gemini/Groq APIs may affect performance
- No rate-limiting middleware implemented yet

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

- Gemini and Groq API teams for open AI services
- Express.js and MongoDB for server and storage support
- All contributors who tested endpoints and improved API structure
