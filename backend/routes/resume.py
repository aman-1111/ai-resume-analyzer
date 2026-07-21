from fastapi import APIRouter
from pydantic import BaseModel

from utils.gemini import generate_ats_resume

router = APIRouter()


class ResumeRequest(BaseModel):
    resume_text: str
    job_description: str = ""


@router.post("/generate-ats-resume")
async def generate_resume(data: ResumeRequest):

    result = generate_ats_resume(
        data.resume_text,
        data.job_description
    )

    print(result)   # 👈 Ye line add karo

    return result