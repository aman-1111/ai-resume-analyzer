function ResumePreview({ resume }) {
    return (
<div id="resume-preview" className="resume-preview">  
        {/* Header */}
        <div className="resume-header">
          <h1>{resume.fullName || "Your Name"}</h1>
          <h3>{resume.jobTitle || "Job Title"}</h3>
  
          <div className="contact-info">
            <span>📧 {resume.email || "example@gmail.com"}</span>
            <span>📞 {resume.phone || "+91 XXXXX XXXXX"}</span>
          </div>
  
          <div className="contact-info">
            <span>💼 {resume.linkedin || "LinkedIn"}</span>
            <span>💻 {resume.github || "GitHub"}</span>
          </div>
        </div>
  
        {/* Summary */}
        <div className="resume-section">
          <h2>Professional Summary</h2>
          <p>
            {resume.summary ||
              "Your professional summary will appear here."}
          </p>
        </div>
  
        {/* Skills */}
        <div className="resume-section">
          <h2>Skills</h2>
  
          {resume.skills ? (
            <ul>
              {resume.skills
                .split(",")
                .map((skill, index) => (
                  <li key={index}>{skill.trim()}</li>
                ))}
            </ul>
          ) : (
            <p>Skills will appear here.</p>
          )}
        </div>
  
        {/* Experience */}
        <div className="resume-section">
          <h2>Experience</h2>
          <p>
            {resume.experience ||
              "Your work experience will appear here."}
          </p>
        </div>
  
        {/* Projects */}
        <div className="resume-section">
          <h2>Projects</h2>
          <p>
            {resume.projects ||
              "Your projects will appear here."}
          </p>
        </div>
  
        {/* Education */}
        <div className="resume-section">
          <h2>Education</h2>
          <p>
            {resume.education ||
              "Your education details will appear here."}
          </p>
        </div>
  
        {/* Certifications */}
        <div className="resume-section">
          <h2>Certifications</h2>
          <p>
            {resume.certifications ||
              "Your certifications will appear here."}
          </p>
        </div>
  
      </div>
    );
  }
  
  export default ResumePreview;