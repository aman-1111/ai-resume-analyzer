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

    resume_lower = resume_text.lower()

    # -----------------------------
    # Resume Section Detection
    # -----------------------------
    section_keywords = {
        "Contact Information": ["email", "@", "phone", "mobile", "linkedin"],
        "Summary": ["summary", "objective", "profile"],
        "Skills": ["skills", "technical skills"],
        "Projects": ["project", "projects"],
        "Experience": ["experience", "internship", "employment", "worked"],
        "Education": ["education", "b.tech", "bachelor", "master", "university", "college"],
        "Certifications": ["certification", "certifications", "certificate"]
    }

    sections = {}

    for section, keywords in section_keywords.items():
        sections[section] = any(keyword in resume_lower for keyword in keywords)

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)

    matched = sorted(list(resume_skills & jd_skills))
    missing = sorted(list(jd_skills - resume_skills))

    # Skills Score (50)
    skills_score = (len(matched) / len(jd_skills)) * 50 if jd_skills else 0

    # Projects (20)
    project_score = 20 if "project" in resume_lower else 0

    # Experience (15)
    experience_keywords = [
        "experience",
        "internship",
        "worked",
        "developer",
        "engineer"
    ]

    experience_score = 15 if any(word in resume_lower for word in experience_keywords) else 0

    # Education (10)
    education_keywords = [
        "b.tech",
        "btech",
        "bachelor",
        "master",
        "degree",
        "university",
        "college"
    ]

    education_score = 10 if any(word in resume_lower for word in education_keywords) else 0

    # Resume Quality (5)
    quality_score = 5 if len(resume_text) > 800 else 2

    final_score = round(
        skills_score
        + project_score
        + experience_score
        + education_score
        + quality_score
    )

    final_score = min(final_score, 100)

    return {
    "ats_score": final_score,
    "matched_skills": matched,
    "missing_skills": missing,

    # Used by Resume Statistics Card
    "statistics": {
    "total_skills": len(resume_skills),
    "projects": len(re.findall(r"\bproject\b", resume_lower)),
    "experience": len(
        re.findall(
            r"\b(experience|internship|developer|engineer|worked)\b",
            resume_lower
        )
    ),
    "education": len(
        re.findall(
            r"\b(b\.tech|btech|bachelor|master|degree|college|university)\b",
            resume_lower
        )
    ),
},

    # Used by ATS Breakdown Card
    "breakdown": {
        "skills": round(skills_score),
        "projects": project_score,
        "experience": experience_score,
        "education": education_score,
        "quality": quality_score,
    },

    # Used by Resume Section Analysis
    "sections": sections
}