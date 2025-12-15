# How to Host This Project for Free

## Part 1: Backend (Render.com)
1. Push this code to a GitHub repository.
2. Go to [Render.com](https://render.com) and create a **New Web Service**.
3. Connect your GitHub repository.
4. **Settings**:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn production:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy**.
6. Once deployed, copy your backend URL (e.g., `https://my-tryon-api.onrender.com`).

## Part 2: Frontend (Netlify or Vercel)
1. Go to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. Import the same GitHub repository.
3. **Settings**:
   - **Build Command**: `yarn build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - Add a new variable named `VITE_API_URL`.
   - Value: Your Render Backend URL (e.g., `https://my-tryon-api.onrender.com`).
5. Click **Deploy**.

## Part 3: Connect Them
1. Once the Frontend is deployed, open the URL.
2. The `src/config.ts` file will automatically use the `VITE_API_URL` you set in Netlify/Vercel to talk to your Render backend.

**Note on "Free" Tiers:**
- **Render**: The free tier spins down after inactivity. The first request might take 50+ seconds.
- **Data**: Uploaded images on Render's free tier are temporary. They will disappear if the server restarts (which happens often on free tier).
