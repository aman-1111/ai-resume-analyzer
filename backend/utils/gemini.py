import re

TECH_SKILLS = [
    "python", "java", "javascript", "react", "node", "express",
    "fastapi", "flask", "sql", "mysql", "mongodb", "postgresql",
    "html", "css", "tailwind", "git", "github", "docker", "aws",
    "azure", "excel", "power bi", "tableau", "machine learning",
    "tensorflow", "pytorch", "numpy", "pandas"
]


def extract_skills(text):
    text = text.lower()
    found = []

    for skill in TECH_SKILLS:
        if re.search(r"\b" + re.escape(skill) + r"\b", text):
            found.append(skill)

    return found


def analyze_resume(resume_text, job_description):

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))

    strengths = []

    if len(matched) >= 5:
        strengths.append("Strong technical skill match with the job description.")
    elif len(matched) >= 3:
        strengths.append("Good technical foundation.")
    else:
        strengths.append("Basic technical skills detected.")

    suggestions = []

    if "docker" in missing:
        suggestions.append("Learn Docker and add a project using containers.")

    if "aws" in missing:
        suggestions.append("Gain basic AWS cloud knowledge.")

    if "git" in missing:
        suggestions.append("Mention Git and GitHub experience.")

    suggestions.append("Add measurable achievements in your experience section.")
    suggestions.append("Improve the professional summary.")
    suggestions.append("Customize the resume for each job role.")

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
        "summary": "Resume analyzed successfully.",
        "strengths": strengths,
        "missing_skills": missing,
        "suggestions": suggestions,
        "interview_questions": interview_questions
    }