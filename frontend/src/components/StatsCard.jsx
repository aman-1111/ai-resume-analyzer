import "./StatsCard.css";

function StatsCard({ statistics }) {
  return (
    <div className="stats-card">

      <h2>📊 Resume Statistics</h2>

      <div className="stats-grid">

        <div className="stat-box">
          <h3>{statistics.total_skills}</h3>
          <p>Total Skills</p>
        </div>

        <div className="stat-box">
          <h3>{statistics.projects}</h3>
          <p>Projects</p>
        </div>

        <div className="stat-box">
          <h3>{statistics.experience}</h3>
          <p>Experience</p>
        </div>

        <div className="stat-box">
          <h3>{statistics.education}</h3>
          <p>Education</p>
        </div>

      </div>

    </div>
  );
}

export default StatsCard;