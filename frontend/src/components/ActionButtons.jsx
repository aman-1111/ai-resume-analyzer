import { downloadResume } from "../utils/downloadResume";

function ActionButtons() {
  return (
    <div className="action-buttons">

      <button
        className="download-btn"
        onClick={downloadResume}
      >
        📄 Download PDF
      </button>

    </div>
  );
}

export default ActionButtons;