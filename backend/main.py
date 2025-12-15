from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import uuid
from PIL import Image
import asyncio
import io

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory Setup
UPLOAD_DIR = "uploads"
STATIC_DIR = "static"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

# Mount static directory to serve generated results
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def read_root():
    return {"message": "Virtual Try-On API is running"}

@app.post("/api/try-on")
async def try_on(person_image: UploadFile = File(...), cloth_image: UploadFile = File(...)):
    # 1. Save Uploaded Files
    person_filename = f"{uuid.uuid4()}_{person_image.filename}"
    cloth_filename = f"{uuid.uuid4()}_{cloth_image.filename}"
    
    person_path = os.path.join(UPLOAD_DIR, person_filename)
    cloth_path = os.path.join(UPLOAD_DIR, cloth_filename)

    with open(person_path, "wb") as buffer:
        shutil.copyfileobj(person_image.file, buffer)
    with open(cloth_path, "wb") as buffer:
        shutil.copyfileobj(cloth_image.file, buffer)

    # 2. Simulate AI Processing Delay
    await asyncio.sleep(2)

    # 3. AI Inference Logic
    # ---------------------------------------------------------
    # TODO:
    # Replace this demo logic with IDM-VTON inference
    # Steps:
    # 1. Human parsing
    # 2. Pose estimation
    # 3. Cloth warping
    # 4. Diffusion-based try-on generation
    # ---------------------------------------------------------

    try:
        # DEMO LOGIC: Simple overlay using Pillow to prove the pipeline works
        person_img = Image.open(person_path).convert("RGBA")
        cloth_img = Image.open(cloth_path).convert("RGBA")

        # Logic: Resize cloth to approx 50% of person width and paste in upper center
        target_width = int(person_img.width * 0.5)
        aspect_ratio = cloth_img.height / cloth_img.width
        target_height = int(target_width * aspect_ratio)
        
        cloth_resized = cloth_img.resize((target_width, target_height))
        
        # Calculate position (center horizontally, 1/4 down vertically)
        paste_x = (person_img.width - target_width) // 2
        paste_y = int(person_img.height * 0.25)

        # Create result image
        result_img = person_img.copy()
        result_img.paste(cloth_resized, (paste_x, paste_y), cloth_resized)

        # Save result
        result_filename = f"result_{uuid.uuid4()}.png"
        result_path = os.path.join(STATIC_DIR, result_filename)
        result_img.save(result_path, format="PNG")

        # Return URL
        return {"output_image_url": f"/static/{result_filename}"}

    except Exception as e:
        print(f"Error processing image: {e}")
        # Return a fallback image if processing fails
        return {"output_image_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
