from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from utils.pdf_parser import extract_text_from_pdf

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running 🚀"
    }

# Resume Upload Route
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # uploads folder create if not exists
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(file_path)

    return {
        "filename": file.filename,
        "text": extracted_text[:1000]
    }