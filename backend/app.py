print("✅ LOADED MY APP.PY")

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from database import engine
from models.user import Base
from auth import router as auth_router

from utils.pdf_parser import extract_text_from_pdf
from utils.ats import calculate_ats
from utils.gemini import analyze_resume

app = FastAPI(
    title="AI Resume Analyzer API",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Register authentication routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- HOME ----------------

@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running 🚀"
    }

# ---------------- UPLOAD ----------------

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

# ---------------- ANALYZE ----------------

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text_from_pdf(file_path)

    ats_result = calculate_ats(
        resume_text,
        job_description
    )

    ai_result = analyze_resume(
        resume_text,
        job_description
    )

    return {
        "ats": ats_result,
        "ai_analysis": ai_result
    }