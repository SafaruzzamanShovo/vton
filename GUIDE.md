# 🚀 Beginner's Deployment Guide

This project is a **Full Stack App** (React Frontend + Python Backend). You cannot host it all in one place easily for free, so we split it up.

## 📦 1. The Backend (Python)
**Host:** Render.com (Free Tier)

1.  Create a new **Web Service** on Render.
2.  Connect your GitHub repo.
3.  **Settings:**
    *   **Root Directory:** `.` (leave empty or dot)
    *   **Build Command:** `pip install -r backend/requirements.txt`
    *   **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4.  **Environment Variables:**
    *   Add `PYTHON_VERSION` = `3.9.0` (Recommended)

## 🎨 2. The Frontend (React)
**Host:** Netlify (Free Tier)

1.  Create a new **Site from Git** on Netlify.
2.  Connect your GitHub repo.
3.  **Settings:**
    *   **Build Command:** `yarn build`
    *   **Publish Directory:** `dist`
4.  **Environment Variables (The Bridge):**
    *   You must tell the Frontend where the Backend lives.
    *   Add a variable named `VITE_API_URL`.
    *   Value: Your Render URL (e.g., `https://your-app.onrender.com`).

## ⚠️ Important Notes
*   **Cold Starts:** On the free tier, Render puts your backend to "sleep" if no one uses it. The first request might take 50+ seconds. Be patient!
*   **CORS:** If you see "Network Error", ensure your Backend allows requests from your Netlify domain. (The provided code allows all origins `*` by default for simplicity in this demo).
