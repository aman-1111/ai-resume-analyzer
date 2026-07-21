import os
import re
import json

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =====================================================
# Existing ATS Analyzer
# =====================================================

TECH_SKILLS = [
    "python","java","javascript","react","node","express","fastapi","flask",
    "sql","mysql","mongodb","postgresql","html","css","tailwind","git",
    "github","docker","aws","azure","excel","power bi","tableau",
    "machine learning","tensorflow","pytorch","numpy","pandas",
]

def extract_skills(text):
    text = text.lower()
    found = []
    for skill in TECH_SKILLS:
        if re.search(r"\b" + re.escape(skill) + r"\b", text):
            found.append(skill)
    return found

def analyze_resume(resume_text, job_description):
    resume_text = resume_text.lower()
    job_description = job_description.lower()

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched = sorted(list(set(resume_skills) & set(jd_skills)))
    missing = sorted(list(set(jd_skills) - set(resume_skills)))

    summary = f"Your resume matches {len(matched)} out of {len(jd_skills)} required skills."

    strengths = []
    if len(matched) >= 5:
        strengths.append("Strong technical skill match with the job description.")
    elif len(matched) >= 3:
        strengths.append("Good technical foundation.")
    else:
        strengths.append("Basic technical skills detected.")

    if "project" in resume_text:
        strengths.append("Projects section detected.")
    if "internship" in resume_text or "experience" in resume_text:
        strengths.append("Relevant experience found.")

    suggestions = []
    mapping = {
        "docker":"Learn Docker and build one containerized project.",
        "git":"Mention Git and GitHub experience.",
        "sql":"Improve SQL skills with JOINS and Aggregations.",
        "python":"Strengthen Python fundamentals.",
        "aws":"Gain AWS cloud knowledge.",
        "react":"Build a React project."
    }
    for k,v in mapping.items():
        if k in missing:
            suggestions.append(v)
    if not suggestions:
        suggestions.append("Great! Resume already matches well.")

    roadmap = []
    roadmap_map = {
        "docker":"Learn Docker.",
        "git":"Maintain projects on GitHub.",
        "sql":"Practice SQL.",
        "python":"Build Python projects.",
        "aws":"Complete AWS fundamentals.",
        "react":"Create React projects."
    }
    for k,v in roadmap_map.items():
        if k in missing:
            roadmap.append(v)
    if not roadmap:
        roadmap.append("Excellent alignment.")

    if len(jd_skills)==0:
        fit="Unknown"
    else:
        percentage=(len(matched)/len(jd_skills))*100
        if percentage>=85:
            fit="Excellent"
        elif percentage>=70:
            fit="Strong"
        elif percentage>=50:
            fit="Average"
        else:
            fit="Needs Improvement"

    interview_questions = [
        "Explain your latest project.",
        "What is FastAPI?",
        "Explain React Hooks.",
        "Difference between SQL and NoSQL.",
        "What is REST API?",
        "Explain Git workflow.",
        "What are Python decorators?",
        "How does JWT authentication work?",
        "Explain normalization in SQL.",
        "Why should we hire you?"
    ]

    return {
        "summary": summary,
        "strengths": strengths,
        "missing_skills": missing,
        "suggestions": suggestions,
        "roadmap": roadmap,
        "job_fit": fit,
        "interview_questions": interview_questions,
    }

def generate_ats_resume(resume_text, job_description):
    prompt = f"""
You are an expert ATS Resume Writer.

Improve the resume according to the Job Description.

Rules:
- Don't invent fake experience.
- Don't invent fake companies.
- Keep information truthful.
- Improve grammar.
- Improve summary.
- Improve project descriptions.
- Improve wording.
- Add ATS keywords naturally.
- Return ONLY valid JSON.
- Do NOT use markdown.

Return JSON in this format:
{{
    "fullName":"",
    "jobTitle":"",
    "email":"",
    "phone":"",
    "linkedin":"",
    "github":"",
    "summary":"",
    "skills":"",
    "experience":"",
    "projects":"",
    "education":"",
    "certifications":""
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role":"user","content":prompt}],
            temperature=0.2,
        )

        text = response.choices[0].message.content.strip()

        if text.startswith("```json"):
            text = text.replace("```json","").replace("```","").strip()
        elif text.startswith("```"):
            text = text.replace("```","").strip()

        data = json.loads(text)

        # Convert arrays/objects to strings for frontend compatibility

        if isinstance(data.get("experience"), list):
            data["experience"] = "\n\n".join(
                f"{exp.get('jobTitle','')} - {exp.get('company','')}\n"
                f"{exp.get('duration','')}\n"
                + "\n".join(f"• {a}" for a in exp.get("achievements", []))
                for exp in data["experience"]
            )

        if isinstance(data.get("projects"), list):
            data["projects"] = "\n\n".join(
                f"{p.get('name','')}\n"
                f"Tech: {p.get('technologies','')}\n"
                f"{p.get('description','')}"
                for p in data["projects"]
            )

        if isinstance(data.get("education"), list):
            data["education"] = "\n\n".join(
                f"{e.get('degree','')}\n"
                f"{e.get('institution','')}\n"
                f"{e.get('duration', e.get('year',''))}"
                for e in data["education"]
            )

        if isinstance(data.get("certifications"), list):
            data["certifications"] = "\n".join(
                f"{c.get('name','')} ({c.get('year','')})"
                for c in data["certifications"]
            )

        data["success"] = True
        return data

    except json.JSONDecodeError:
        return {
            "success": False,
            "message": "AI returned invalid JSON."
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }
