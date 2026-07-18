import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Download PDF Report
  // -----------------------------

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AI Resume Analysis Report", 20, 20);

    doc.setFontSize(15);

    doc.text(`ATS Score : ${result.ats.ats_score}%`, 20, 40);

    doc.text(
      `Job Fit : ${result.ai_analysis.job_fit}`,
      20,
      52
    );

    let y = 70;

    doc.text("Matched Skills", 20, y);

    y += 10;

    result.ats.matched_skills.forEach((skill) => {
      doc.text("- " + skill, 30, y);
      y += 8;
    });

    y += 5;

    doc.text("Missing Skills", 20, y);

    y += 10;

    result.ats.missing_skills.forEach((skill) => {
      doc.text("- " + skill, 30, y);
      y += 8;
    });

    y += 5;

    doc.text("Suggestions", 20, y);

    y += 10;

    result.ai_analysis.suggestions.forEach((item) => {
      doc.text("- " + item, 30, y);
      y += 8;
    });

    y += 5;

    doc.text("Resume Roadmap", 20, y);

    y += 10;

    result.ai_analysis.roadmap.forEach((item) => {
      doc.text("- " + item, 30, y);
      y += 8;
    });

    doc.save("AI_Resume_Report.pdf");
  };

  // -----------------------------
  // Analyze Resume
  // -----------------------------

  const analyzeResume = async () => {
    if (!file || !jobDescription) {
      alert("Please upload resume and enter job description.");
      return;
    }

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
      console.log(err);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Job Fit Badge
  // -----------------------------

  const getBadgeColor = () => {
    if (!result) return "";

    switch (result.ai_analysis.job_fit) {
      case "Excellent":
        return "excellent";

      case "Strong":
        return "strong";

      case "Average":
        return "average";

      default:
        return "poor";
    }
  };

  return (
    <div className="app">

      <div className="header">

        <h1>🤖 Smart ATS Resume Analyzer</h1>

        <p>
          Analyze your resume against a Job Description,
          calculate ATS score and receive intelligent
          improvement suggestions.
        </p>

      </div>

      <div className="card">

        <label className="label">
          Upload Resume
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
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
        />

        <button onClick={analyzeResume}>
          {loading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

      </div>

      {result && (

        <div className="result-container">

          {/* ATS CARD */}

          <div className="score-card">

            <h2>ATS Score</h2>

            <div className="circle">

              {result.ats.ats_score}%

            </div>

            <div
              className={`fit-badge ${getBadgeColor()}`}
            >
              {result.ai_analysis.job_fit}
            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width:
                    result.ats.ats_score + "%"
                }}
              ></div>

            </div>

          </div>

          {/* MATCHED SKILLS */}

          <div className="skills-card">

            <h2>Matched Skills</h2>

            <div className="badges">

              {result.ats.matched_skills.length > 0 ? (

                result.ats.matched_skills.map(
                  (skill, index) => (
                    <span
                      className="badge green"
                      key={index}
                    >
                      {skill}
                    </span>
                  )
                )

              ) : (

                <p>No matched skills</p>

              )}

            </div>

            <h2
              style={{
                marginTop: "30px"
              }}
            >
              Missing Skills
            </h2>

            <div className="badges">

              {result.ats.missing_skills.length > 0 ? (

                result.ats.missing_skills.map(
                  (skill, index) => (
                    <span
                      className="badge red"
                      key={index}
                    >
                      {skill}
                    </span>
                  )
                )

              ) : (

                <p>No missing skills 🎉</p>

              )}

            </div>

          </div>
                    {/* Resume Statistics */}

                    <div className="stats-card">

<h2>Resume Statistics</h2>

<div className="stats-grid">

  <div className="stat-box">
    <h3>{result.ats.statistics.total_skills}</h3>
    <p>Total Skills</p>
  </div>

  <div className="stat-box">
    <h3>{result.ats.statistics.projects}</h3>
    <p>Projects</p>
  </div>

  <div className="stat-box">
    <h3>{result.ats.statistics.experience}</h3>
    <p>Experience</p>
  </div>

  <div className="stat-box">
    <h3>{result.ats.statistics.education}</h3>
    <p>Education</p>
  </div>

</div>

</div>

{/* ATS Score Breakdown */}

<div className="breakdown-card">

<h2>ATS Score Breakdown</h2>

<table>

  <tbody>

    <tr>
      <td>Skills Match</td>
      <td>{result.ats.breakdown.skills}/50</td>
    </tr>

    <tr>
      <td>Projects</td>
      <td>{result.ats.breakdown.projects}/20</td>
    </tr>

    <tr>
      <td>Experience</td>
      <td>{result.ats.breakdown.experience}/15</td>
    </tr>

    <tr>
      <td>Education</td>
      <td>{result.ats.breakdown.education}/10</td>
    </tr>

    <tr>
      <td>Resume Quality</td>
      <td>{result.ats.breakdown.quality}/5</td>
    </tr>

  </tbody>

</table>

</div>

{/* Resume Sections */}

<div className="sections-card">

<h2>Resume Section Analysis</h2>

<ul>

  {Object.entries(result.ats.sections).map(
    ([section, present]) => (

      <li key={section}>

        {present ? "✅" : "❌"}{" "}
        {section.charAt(0).toUpperCase() +
          section.slice(1)}

      </li>

    )
  )}

</ul>

</div>

{/* AI Suggestions */}

<div className="suggestion-card">

<h2>AI Suggestions</h2>

<ul>

  {result.ai_analysis.suggestions.map(
    (item, index) => (

      <li key={index}>{item}</li>

    )
  )}

</ul>

</div>

{/* Resume Roadmap */}

<div className="roadmap-card">

<h2>Resume Improvement Roadmap</h2>

<ol>

  {result.ai_analysis.roadmap.map(
    (item, index) => (

      <li key={index}>{item}</li>

    )
  )}

</ol>

</div>

{/* Interview Questions */}

<div className="interview-card">

<h2>Interview Questions</h2>

<ol>

  {result.ai_analysis.interview_questions.map(
    (question, index) => (

      <li key={index}>
        {question}
      </li>

    )
  )}

</ol>

</div>

{/* Download Button */}

<div className="download-section">

<button
  className="download-btn"
  onClick={downloadReport}
>
  📄 Download PDF Report
</button>

</div>

</div>

)}

</div>

);
}

export default App;