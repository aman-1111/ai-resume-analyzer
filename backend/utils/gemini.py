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

    resume_text = resume_text.lower()
    job_description = job_description.lower()

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched = sorted(list(set(resume_skills) & set(jd_skills)))
    missing = sorted(list(set(jd_skills) - set(resume_skills)))

    # -------------------------
    # Summary
    # -------------------------

    summary = (
        f"Your resume matches {len(matched)} out of "
        f"{len(jd_skills)} required skills."
    )

    # -------------------------
    # Strengths
    # -------------------------

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

    # -------------------------
    # Suggestions
    # -------------------------

    suggestions = []

    if "docker" in missing:
        suggestions.append("Learn Docker and build one containerized project.")

    if "git" in missing:
        suggestions.append("Mention Git and GitHub experience.")

    if "sql" in missing:
        suggestions.append("Improve SQL skills with Joins, GROUP BY and Aggregations.")

    if "python" in missing:
        suggestions.append("Strengthen Python fundamentals.")

    if "aws" in missing:
        suggestions.append("Gain basic AWS cloud knowledge.")

    if "react" in missing:
        suggestions.append("Build a React project and showcase it.")

    if len(suggestions) == 0:
        suggestions.append("Great! Your resume already matches the job description well.")

    # -------------------------
    # Resume Improvement Roadmap
    # -------------------------

    roadmap = []

    if "docker" in missing:
        roadmap.append("Learn Docker and add it to your projects.")

    if "git" in missing:
        roadmap.append("Maintain all projects on GitHub.")

    if "sql" in missing:
        roadmap.append("Practice SQL using real datasets.")

    if "python" in missing:
        roadmap.append("Build one Python project for your portfolio.")

    if "aws" in missing:
        roadmap.append("Complete AWS Cloud Practitioner fundamentals.")

    if "react" in missing:
        roadmap.append("Create a responsive React application.")

    if len(roadmap) == 0:
        roadmap.append("Excellent! Your resume is already well aligned with the job.")

    # -------------------------
    # Job Fit Rating
    # -------------------------

    if len(jd_skills) == 0:
        fit = "Unknown"

    else:

        percentage = (len(matched) / len(jd_skills)) * 100

        if percentage >= 85:
            fit = "Excellent"

        elif percentage >= 70:
            fit = "Strong"

        elif percentage >= 50:
            fit = "Average"

        else:
            fit = "Needs Improvement"

    # -------------------------
    # Interview Questions
    # -------------------------

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

        "interview_questions": interview_questions

    }