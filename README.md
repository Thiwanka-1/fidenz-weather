# 🌤️ Fidenz Weather App

A full-stack weather application built for the **Fidenz Internship Take-home Assignment**.

It includes:

- **Secure Auth with Auth0** (MFA-enabled)
- **City-based Weather Fetching** (OpenWeatherMap API)
- **Node.js + Express Backend**
- **React + Vite + Tailwind CSS v4 Frontend**

---

## 📁 Project Structure

```
fidenz-weather/
├── backend/
│   ├── server.js
│   ├── cities.json
│   ├── package.json
│   └── .env               # <-- add your API key here
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env               # <-- add your Auth0 settings here
└── README.md
```

---

## ⚙️ Technologies Used

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Vite, Tailwind CSS (v4)    |
| Backend   | Node.js, Express                  |
| API       | OpenWeatherMap                    |
| Auth      | Auth0 (SPA with MFA enabled)      |

---

## 🚀 Setup Instructions

### 🔧 Prerequisites

- Node.js v18+
- NPM or Yarn
- Free Auth0 Account
- OpenWeatherMap API Key

---

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
OWM_API_KEY=your_openweathermap_api_key
```

Run the server:

```bash
npm run dev
```

Backend runs at: [http://localhost:4000](http://localhost:4000)

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

Run the dev server:

```bash
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)

---



## 🌐 Environment Summary

**Backend:**
```
PORT=4000
OWM_API_KEY=your_openweathermap_api_key
```

**Frontend:**
```
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

---


> 🔚 Thank you for reviewing this assignment. Looking forward to your feedback!
