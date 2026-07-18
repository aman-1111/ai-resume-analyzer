import re

TECH_SKILLS = [
    "python", "java", "javascript", "typescript",
    "react", "angular", "vue",
    "node", "express", "fastapi", "flask",
    "sql", "mysql", "postgresql", "mongodb",
    "html", "css", "tailwind",
    "git", "github", "docker", "kubernetes",
    "aws", "azure", "gcp",
    "excel", "power bi", "tableau",
    "machine learning", "tensorflow", "pytorch",
    "pandas", "numpy"
]


def extract_skills(text):
    text = text.lower()
    found = set()

    for skill in TECH_SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found.add(skill)

    return found


def calculate_ats(resume_text, job_description):

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched = sorted(list(resume_skills & jd_skills))
    missing = sorted(list(jd_skills - resume_skills))

    if len(jd_skills) == 0:
        score = 0
    else:
        score = round((len(matched) / len(jd_skills)) * 100)

    return {
        "ats_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }