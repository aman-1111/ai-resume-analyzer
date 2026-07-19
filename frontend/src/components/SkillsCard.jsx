import "./SkillsCard.css";

function SkillsCard({ matchedSkills, missingSkills }) {
  return (
    <div className="skills-card">

      <div className="skills-section">

        <h2>✅ Matched Skills</h2>

        <div className="badges">

          {matchedSkills.length ? (
            matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="badge matched"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No matched skills found.</p>
          )}

        </div>

      </div>

      <div className="skills-section">

        <h2>❌ Missing Skills</h2>

        <div className="badges">

          {missingSkills.length ? (
            missingSkills.map((skill, index) => (
              <span
                key={index}
                className="badge missing"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No missing skills 🎉</p>
          )}

        </div>

      </div>

    </div>
  );
}

export default SkillsCard;