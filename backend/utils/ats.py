import re

SKILLS = [
    "python",
    "java",
    "javascript",
    "react",
    "node",
    "sql",
    "mysql",
    "mongodb",
    "power bi",
    "excel",
    "tableau",
    "aws",
    "docker",
    "git",
    "html",
    "css",
    "machine learning",
    "fastapi",
    "flask"
]

def calculate_ats(resume_text, job_description):

    resume = resume_text.lower()
    jd = job_description.lower()

    matched = []
    missing = []

    for skill in SKILLS:
        if skill in jd:
            if skill in resume:
                matched.append(skill)
            else:
                missing.append(skill)

    if len(matched)+len(missing)==0:
        score=0
    else:
        score=int((len(matched)/(len(matched)+len(missing)))*100)

    return {
        "score":score,
        "matched":matched,
        "missing":missing
    }