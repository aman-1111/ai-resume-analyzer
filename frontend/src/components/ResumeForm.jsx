  function ResumeForm({ resume, handleChange }) {
      return (
        <div className="resume-form">
    
          <h2>Personal Information</h2>
    
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={resume.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
    
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={resume.jobTitle}
              onChange={handleChange}
              placeholder="Data Analyst"
            />
          </div>
    
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={resume.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>
    
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={resume.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
    
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={resume.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
            />
          </div>
    
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="text"
              name="github"
              value={resume.github}
              onChange={handleChange}
              placeholder="GitHub URL"
            />
          </div>
    
          <div className="form-group">
            <label>Professional Summary</label>
            <textarea
              rows="5"
              name="summary"
              value={resume.summary}
              onChange={handleChange}
              placeholder="Write a professional summary..."
            />
          </div>
    
          <div className="form-group">
            <label>Skills</label>
            <textarea
              rows="3"
              name="skills"
              value={resume.skills}
              onChange={handleChange}
              placeholder="Python, SQL, Power BI, React, Machine Learning..."
            />
          </div>
    
          <div className="form-group">
            <label>Experience</label>
            <textarea
              rows="5"
              name="experience"
              value={resume.experience}
              onChange={handleChange}
              placeholder="Describe your work experience..."
            />
          </div>
    
          <div className="form-group">
            <label>Projects</label>
            <textarea
              rows="5"
              name="projects"
              value={resume.projects}
              onChange={handleChange}
              placeholder="Describe your academic and personal projects..."
            />
          </div>
    
          <div className="form-group">
            <label>Education</label>
            <textarea
              rows="4"
              name="education"
              value={resume.education}
              onChange={handleChange}
              placeholder="B.Tech CSE - University Name (2022-2026)"
            />
          </div>
    
          <div className="form-group">
            <label>Certifications</label>
            <textarea
              rows="3"
              name="certifications"
              value={resume.certifications}
              onChange={handleChange}
              placeholder="Google Data Analytics, Microsoft Power BI..."
            />
          </div>
    
        </div>
      );
    }
    
    export default ResumeForm;