import "./UploadCard.css";

function UploadCard({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  analyzeResume,
  loading,
}) {
  return (
    <div className="upload-card">

      <h2>📄 Resume Upload</h2>

      <div
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setFile(e.dataTransfer.files[0]);
        }}
      >
        <p>📂 Drag & Drop Resume Here</p>

        <p className="or-text">OR</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && (
          <div className="selected-file">
            ✅ {file.name}

            <button
              className="remove-btn"
              onClick={() => setFile(null)}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <label>Job Description</label>

      <textarea
        value={jobDescription}
        placeholder="Paste Job Description..."
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button
        className="analyze-btn"
        onClick={analyzeResume}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </div>
  );
}

export default UploadCard;