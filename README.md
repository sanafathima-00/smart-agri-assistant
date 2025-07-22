# **Smart Agriculture Assistant – Backend**



## 🌾 Project Overview

The **Smart Agri Assistant Backend** powers the server-side logic of the Smart Agri Assistant platform. It handles user authentication, image uploads, disease detection via Gemini, multilingual response generation through Groq, and manages all MongoDB database operations securely and efficiently.

---

## ✨ Features

- 🔐 Farmer authentication using phone number, user ID, and location
- 🌿 Image upload and disease detection with **Gemini 1.5 Flash**
- 🌍 Multilingual translation via **Groq LLaMA 3 70B**
- 📂 RESTful API endpoints for user, crop issue, and disease routes
- 🧠 Helper functions for model interaction and translation
- 💾 MongoDB storage with Mongoose models

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (with Mongoose)  
- **File Handling:** Multer  
- **AI Integration:** Gemini 1.5 Flash, Groq LLaMA 3 70B  
- **Config & Utils:** dotenv, cors, axios

---

## 🚀 Installation and Setup

### Prerequisites

- Node.js and npm installed  
- MongoDB connection string  
- API keys for Gemini and Groq

### Steps

1. Navigate to the server directory:
   ```bash
   cd smart-agri-assistant/server

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. Start the Backend:

   ```bash
   node index.js
   ```

5. Server will be running at: [http://localhost:5000](http://localhost:5000)

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
├── uploads/              # Stores leaf images
├── utils/
│   └── geminiHelper.js   # Helper for Gemini API
├── .env
├── index.js              # Entry point
├── package.json
└── .gitignore
```

---

## 🔧 Customization

* Add new API endpoints in `routes/` and link them to logic in `controllers/`
* Modify AI logic and prompt formatting in `utils/geminiHelper.js`
* Change MongoDB schemas inside the `models/` directory

---

## 🐞 Known Issues

* Rate-limiting for AI APIs not implemented yet
* Lacks retry logic for failed external API requests
* Needs stronger validation and error handling

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

* Node.js and Express.js for backend foundation
* MongoDB & Mongoose for flexible data modeling
* Gemini and Groq APIs for advanced AI-powered logic
* All testers, developers, and farmers who helped improve backend workflows
