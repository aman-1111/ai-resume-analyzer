import re

TECH_SKILLS = [
    "python","java","javascript","typescript",
    "react","angular","vue",
    "node","express","fastapi","flask",
    "sql","mysql","postgresql","mongodb",
    "html","css","tailwind",
    "git","github","docker","kubernetes",
    "aws","azure","gcp",
    "excel","power bi","tableau",
    "machine learning","tensorflow","pytorch",
    "pandas","numpy"
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

    resume_lower = resume_text.lower()

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched = sorted(list(resume_skills & jd_skills))
    missing = sorted(list(jd_skills - resume_skills))

    # -----------------------------
    # Skills Score (50 Marks)
    # -----------------------------

    if len(jd_skills) == 0:
        skills_score = 0
    else:
        skills_score = (len(matched) / len(jd_skills)) * 50

    # -----------------------------
    # Projects (20 Marks)
    # -----------------------------

    project_score = 20 if "project" in resume_lower else 0

    # -----------------------------
    # Experience (15 Marks)
    # -----------------------------

    experience_keywords = [
        "experience",
        "internship",
        "worked",
        "developer",
        "engineer"
    ]

    experience_score = 0

    for word in experience_keywords:
        if word in resume_lower:
            experience_score = 15
            break

    # -----------------------------
    # Education (10 Marks)
    # -----------------------------

    education_keywords = [
        "b.tech",
        "btech",
        "bachelor",
        "master",
        "degree",
        "university",
        "college"
    ]

    education_score = 0

    for word in education_keywords:
        if word in resume_lower:
            education_score = 10
            break

    # -----------------------------
    # Resume Quality (5 Marks)
    # -----------------------------

    quality_score = 5 if len(resume_text) > 800 else 2

    final_score = round(
        skills_score +
        project_score +
        experience_score +
        education_score +
        quality_score
    )

    if final_score > 100:
        final_score = 100

    return {

        "ats_score": final_score,

        "matched_skills": matched,

        "missing_skills": missing,

        "statistics":{

            "skills_found":len(resume_skills),

            "matched_skills":len(matched),

            "missing_skills":len(missing),

            "projects_detected":"Yes" if project_score else "No",

            "experience_detected":"Yes" if experience_score else "No",

            "education_detected":"Yes" if education_score else "No"

        },
        "score_breakdown": {
    "skills": round(skills_score),
    "projects": project_score,
    "experience": experience_score,
    "education": education_score,
    "resume_quality": quality_score
}

    }