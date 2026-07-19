import "./BreakdownCard.css";

function BreakdownCard({ breakdown }) {
  return (
    <div className="breakdown-card">
      <h2>📈 ATS Score Breakdown</h2>

      <table>
        <tbody>
          <tr>
            <td>Skills Match</td>
            <td>{breakdown.skills}/50</td>
          </tr>

          <tr>
            <td>Projects</td>
            <td>{breakdown.projects}/20</td>
          </tr>

          <tr>
            <td>Experience</td>
            <td>{breakdown.experience}/15</td>
          </tr>

          <tr>
            <td>Education</td>
            <td>{breakdown.education}/10</td>
          </tr>

          <tr>
            <td>Resume Quality</td>
            <td>{breakdown.quality}/5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BreakdownCard;