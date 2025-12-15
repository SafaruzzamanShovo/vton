import os
import shutil
import uuid
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import asyncio

# SOTA AI Client
try:
    from gradio_client import Client, handle_file
    HAS_GRADIO = True
except ImportError:
    HAS_GRADIO = False
    print("Warning: gradio_client not found. SOTA features disabled.")

app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
STATIC_DIR = BASE_DIR / "static"

UPLOAD_DIR.mkdir(exist_ok=True)
STATIC_DIR.mkdir(exist_ok=True)

# Mount Static Files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.post("/api/try-on")
async def try_on(person_image: UploadFile = File(...), cloth_image: UploadFile = File(...)):
    # 1. Save Uploaded Files
    person_filename = f"{uuid.uuid4()}_person.png"
    cloth_filename = f"{uuid.uuid4()}_cloth.png"
    
    person_path = UPLOAD_DIR / person_filename
    cloth_path = UPLOAD_DIR / cloth_filename

    with open(person_path, "wb") as buffer:
        shutil.copyfileobj(person_image.file, buffer)
    with open(cloth_path, "wb") as buffer:
        shutil.copyfileobj(cloth_image.file, buffer)

    # 2. Try SOTA AI Generation (IDM-VTON)
    if HAS_GRADIO:
        try:
            print("--- Starting SOTA AI Inference (IDM-VTON) ---")
            
            # Initialize Client (Connects to HuggingFace Space)
            # We use yisol/IDM-VTON which is the official SOTA space
            client = Client("yisol/IDM-VTON")
            
            # The API parameters for IDM-VTON can be complex. 
            # We map our inputs to the API's expected format.
            # Note: This call blocks, so we run it in a thread to not freeze the server
            
            def run_inference():
                return client.predict(
                    dict={"background": handle_file(str(person_path)), "layers": [], "composite": None},
                    garm_img=handle_file(str(cloth_path)),
                    garment_des="A cool clothing item",
                    is_checked=True, # Use auto-generated mask
                    is_checked_crop=False,
                    denoise_steps=30,
                    seed=42,
                    api_name="/tryon"
                )

            # Run in thread pool
            result_path = await asyncio.to_thread(run_inference)
            
            # The result is a tuple usually (image_path, mask_path)
            # We take the first element which is the image
            generated_image_path = result_path[0]
            
            # Copy result to our static folder
            output_filename = f"result_{uuid.uuid4()}.png"
            final_output_path = STATIC_DIR / output_filename
            shutil.copy(generated_image_path, final_output_path)
            
            print(f"--- AI Success: {output_filename} ---")
            return {"output_image_url": f"/static/{output_filename}"}

        except Exception as e:
            print(f"SOTA AI Failed: {e}")
            print("Falling back to internal demo logic...")
            # Fall through to demo logic below

    # 3. Fallback Demo Logic (If AI fails or no internet)
    # Simple overlay to prove the backend works
    try:
        person_img = Image.open(person_path).convert("RGBA")
        cloth_img = Image.open(cloth_path).convert("RGBA")

        # Resize cloth to fit roughly in the center
        target_width = int(person_img.width * 0.6)
        ratio = target_width / cloth_img.width
        target_height = int(cloth_img.height * ratio)
        cloth_resized = cloth_img.resize((target_width, target_height))

        # Paste in center
        x_offset = (person_img.width - target_width) // 2
        y_offset = (person_img.height - target_height) // 2 + 100

        # Create result
        result = person_img.copy()
        result.paste(cloth_resized, (x_offset, y_offset), cloth_resized)

        output_filename = f"demo_{uuid.uuid4()}.png"
        output_path = STATIC_DIR / output_filename
        result.save(output_path)

        return {"output_image_url": f"/static/{output_filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
