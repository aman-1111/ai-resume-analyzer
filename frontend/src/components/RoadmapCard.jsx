import "./RoadmapCard.css";

function RoadmapCard({ roadmap }) {
  return (
    <div className="roadmap-card">
      <div className="card-header">
        <h2>🗺️ Resume Improvement Roadmap</h2>
        <span className="card-tag">AI Generated</span>
      </div>

      <div className="roadmap-list">
        {roadmap.map((step, index) => (
          <div className="roadmap-item" key={index}>
            <div className="roadmap-number">
              {index + 1}
            </div>

            <div className="roadmap-content">
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapCard;