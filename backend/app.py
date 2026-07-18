from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from utils.pdf_parser import extract_text_from_pdf
from utils.ats import calculate_ats

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running 🚀"
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    return {
        "filename": file.filename,
        "text": extracted_text
    }


@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text_from_pdf(file_path)

    result = calculate_ats(
        resume_text=resume_text,
        job_description=job_description
    )

    return result