import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ActionButtons from "../components/ActionButtons";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import "../pages/ResumeBuilder.css";

function ResumeBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  // AI generated resume received from MainApp
  const generatedResume = location.state?.generatedResume;

  const [resume, setResume] = useState(
    generatedResume || {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      summary: "",
      skills: "",
      experience: "",
      projects: "",
      education: "",
      certifications: "",
    }
  );

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="builder-page">

      <div className="top-buttons">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to ATS Resume Analyzer
        </button>
      </div>

      <div className="builder-header">
        <h1>🚀 AI ATS Resume Builder</h1>
        <p>Edit your AI-generated ATS resume</p>
      </div>

      <div className="builder-container">

        {/* Left Panel */}
        <div className="left-panel">
          <ResumeForm
            resume={resume}
            handleChange={handleChange}
          />
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <ActionButtons />

          <ResumePreview
            resume={resume}
          />
        </div>

      </div>
    </div>
  );
}

export default ResumeBuilder;