# Wrapper for Production with CORS enabled
from fastapi.middleware.cors import CORSMiddleware
from main import app

# Allow all origins for the demo
# In real production, replace "*" with your actual Netlify frontend URL
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This file can be run by Render using: uvicorn production:app --host 0.0.0.0 --port 10000
