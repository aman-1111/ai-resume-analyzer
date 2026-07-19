import "./ATSCard.css";

function ATSCard({ atsScore, jobFit }) {
  const getColor = () => {
    if (atsScore >= 80) return "#16a34a";
    if (atsScore >= 60) return "#2563eb";
    if (atsScore >= 40) return "#f59e0b";
    return "#dc2626";
  };

  return (
    <div className="ats-card">

      <h2>🎯 ATS Score</h2>

      <div
        className="ats-circle"
        style={{
          background: `conic-gradient(
            ${getColor()} ${atsScore * 3.6}deg,
            #e5e7eb 0deg
          )`,
        }}
      >
        <div className="ats-inner">
          <h1>{atsScore}%</h1>
        </div>
      </div>

      <div
        className="job-fit"
        style={{
          background: getColor(),
        }}
      >
        {jobFit}
      </div>

      <div className="progress">

        <div
          className="progress-fill"
          style={{
            width: `${atsScore}%`,
            background: getColor(),
          }}
        ></div>

      </div>

    </div>
  );
}

export default ATSCard;