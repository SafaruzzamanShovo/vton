# Virtual Try-On Backend

This is a FastAPI backend for the Virtual Try-On demo.

## Setup Instructions

1. **Prerequisites**: Ensure you have Python 3.8+ installed.

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

4. **Test**:
   The API will be available at `http://localhost:8000`.
   - Docs: `http://localhost:8000/docs`
   - Try-On Endpoint: `POST /api/try-on`

## Directory Structure
- `uploads/`: Stores temporary raw uploaded images.
- `static/`: Stores generated result images (served publicly).

## AI Integration
To replace the demo logic with real IDM-VTON:
1. Open `main.py`.
2. Locate the `TODO: INTEGRATE REAL AI MODEL HERE` section.
3. Import your inference pipeline and pass the `person_path` and `cloth_path`.
