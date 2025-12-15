# Local Development Setup Guide

Follow these steps to run the Virtual Try-On project on your local machine.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Git](https://git-scm.com/) (Optional, for cloning)

## 1. Backend Setup (The AI Engine)
The backend handles image processing. It needs to run on port `8000`.

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment to keep dependencies clean:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Mac / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required libraries:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   > You should see: `Uvicorn running on http://127.0.0.1:8000`

## 2. Frontend Setup (The User Interface)
The frontend is the React website. It needs to run on port `5173`.

1. Open a **new** terminal window (leave the backend running).

2. Navigate to the main project folder (root):
   ```bash
   # If you are in backend, go back one level
   cd ..
   ```

3. Install Node dependencies:
   ```bash
   yarn install
   # OR if you don't have yarn:
   npm install
   ```

4. Start the development server:
   ```bash
   yarn run dev
   # OR
   npm run dev
   ```

5. Open your browser to the Local URL shown (usually `http://localhost:5173`).

## Troubleshooting

- **"Command not found: python"**: Try using `python3` instead.
- **"Connection Refused"**: Ensure the backend terminal is running and shows no errors.
- **Images not loading**: Check the browser console (F12). If you see 404s for `/api/...`, make sure the backend is running on port 8000 exactly.
