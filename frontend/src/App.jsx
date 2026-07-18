import { useState } from "react";
import axios from "axios";
import "./App.css";
import jsPDF from "jspdf";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }
    const downloadReport = () => {
      if (!result) return;
    
      const doc = new jsPDF();
    
      doc.setFontSize(20);
      doc.text("AI Resume Analysis Report", 20, 20);
    
      doc.setFontSize(14);
      doc.text(`ATS Score: ${result.ats.ats_score}%`, 20, 40);
    
      doc.text("Matched Skills:", 20, 60);
      result.ats.matched_skills.forEach((skill, i) => {
        doc.text(`• ${skill}`, 30, 70 + i * 8);
      });
    
      let y = 80 + result.ats.matched_skills.length * 8;
    
      doc.text("Missing Skills:", 20, y);
      result.ats.missing_skills.forEach((skill, i) => {
        doc.text(`• ${skill}`, 30, y + 10 + i * 8);
      });
    
      y += 20 + result.ats.missing_skills.length * 8;
    
      doc.text("Suggestions:", 20, y);
      result.ai_analysis.suggestions.forEach((item, i) => {
        doc.text(`• ${item}`, 30, y + 10 + i * 8);
      });
    
      y += 20 + result.ai_analysis.suggestions.length * 8;
    
      doc.text("Interview Questions:", 20, y);
      result.ai_analysis.interview_questions.forEach((q, i) => {
        doc.text(`${i + 1}. ${q}`, 30, y + 10 + i * 8);
      });
    
      doc.save("AI_Resume_Report.pdf");
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <div className="header">
        <h1>🤖 AI Resume Analyzer</h1>
        <p>
          Upload your resume and compare it with a Job Description to
          calculate ATS Score and receive improvement suggestions.
        </p>
      </div>

      <div className="card">

        <label className="label">
          Upload Resume (PDF)
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label className="label">
          Job Description
        </label>

        <textarea
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button onClick={analyzeResume}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

      </div>

      {result && (

        <div className="result-container">

          <div className="score-card">

            <h2>ATS Score</h2>

            <div className="circle">

              {result.ats.ats_score}%

            </div>

          </div>

          <div className="skills-card">

            <h2>Matched Skills</h2>

            <div className="badges">

              {result.ats.matched_skills.length > 0 ? (
                result.ats.matched_skills.map((skill, index) => (
                  <span className="badge green" key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <p>No matched skills</p>
              )}

            </div>

            <h2 style={{ marginTop: "25px" }}>
              Missing Skills
            </h2>

            <div className="badges">

              {result.ats.missing_skills.length > 0 ? (
                result.ats.missing_skills.map((skill, index) => (
                  <span className="badge red" key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <p>No missing skills 🎉</p>
              )}

            </div>

          </div>

          <div className="suggestion-card">

            <h2>AI Suggestions</h2>

            <ul>

              {result.ai_analysis.suggestions.map((item, index) => (
                <li key={index}>
                  💡 {item}
                </li>
              ))}

            </ul>

          </div>

          <div className="question-card">

            <h2>Interview Questions</h2>

            <ol>

              {result.ai_analysis.interview_questions.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ol>
          
          </div>

        </div>

      )}

    </div>
  );
}

export default App;