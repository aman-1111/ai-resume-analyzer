import { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ATSCard from "./components/ATSCard";
import UploadCard from "./components/UploadCard";
import SkillsCard from "./components/SkillsCard";
import StatsCard from "./components/StatsCard";
import BreakdownCard from "./components/BreakdownCard";
import SectionsCard from "./components/SectionsCard";
import SuggestionCard from "./components/SuggestionCard";
import RoadmapCard from "./components/RoadmapCard";
import InterviewCard from "./components/InterviewCard";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const topRef = useRef(null);
  const uploadRef = useRef(null);
  const reportRef = useRef(null);
  const suggestionsRef = useRef(null);
  const interviewRef = useRef(null);
  const settingsRef = useRef(null);
  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  
  const scrollToUpload = () =>
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  
  const scrollToReport = () =>
    reportRef.current?.scrollIntoView({ behavior: "smooth" });
  
  const scrollToSuggestions = () =>
    suggestionsRef.current?.scrollIntoView({ behavior: "smooth" });
  
  const scrollToInterview = () =>
    interviewRef.current?.scrollIntoView({ behavior: "smooth" });
  
  const scrollToSettings = () =>
    settingsRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

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
      <Sidebar
  scrollToTop={scrollToTop}
  scrollToUpload={scrollToUpload}
  scrollToReport={scrollToReport}
  scrollToSuggestions={scrollToSuggestions}
  scrollToInterview={scrollToInterview}
  scrollToSettings={scrollToSettings}
/>
<div style={{ marginLeft: "280px" }}>
<Navbar
  scrollToTop={scrollToTop}
  scrollToUpload={scrollToUpload}
  scrollToReport={scrollToReport}
/>
<div
  className="theme-toggle"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️" : "🌙"}
</div>
<div className="header" ref={topRef}>

        <h1>🤖 Smart ATS Resume Analyzer</h1>

        <p>
          Analyze your resume against a Job Description,
          calculate ATS score and receive intelligent
          improvement suggestions.
        </p>

      </div>

      <div ref={uploadRef}>
  <UploadCard
    file={file}
    setFile={setFile}
    jobDescription={jobDescription}
    setJobDescription={setJobDescription}
    analyzeResume={analyzeResume}
    loading={loading}
  />
</div>
      {result && (

<div className="result-container" ref={reportRef}>

          {/* ATS CARD */}

          <ATSCard
  atsScore={result.ats.ats_score}
  jobFit={result.ai_analysis.job_fit}
/>

          {/* MATCHED SKILLS */}

          <SkillsCard
  matchedSkills={result.ats.matched_skills}
  missingSkills={result.ats.missing_skills}
/>
                    {/* Resume Statistics */}

                    <StatsCard
  statistics={result.ats.statistics}
/>

{/* ATS Score Breakdown */}

<BreakdownCard
    breakdown={result.ats.breakdown}
/>

{/* Resume Sections */}

<SectionsCard
    sections={result.ats.sections}
/>

{/* AI Suggestions */}

<div ref={suggestionsRef}>
  <SuggestionCard
    suggestions={result.ai_analysis.suggestions}
  />
</div>
{/* Resume Roadmap */}

<RoadmapCard
    roadmap={result.ai_analysis.roadmap}
/>

{/* Interview Questions */}

<div ref={interviewRef}>
  <InterviewCard
    questions={result.ai_analysis.interview_questions}
  />
</div>

{/* Download Button */}

<div className="download-section" ref={settingsRef}>

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
</div>

);
}

export default App;