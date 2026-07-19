import "./SectionsCard.css";

function SectionsCard({ sections }) {
  return (
    <div className="sections-card">

      <h2>📋 Resume Section Analysis</h2>

      <div className="sections-list">

        {Object.entries(sections).map(([section, present]) => (

          <div
            key={section}
            className={`section-item ${present ? "present" : "missing"}`}
          >

            <span>
              {present ? "✅" : "❌"}
            </span>

            <span>{section}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SectionsCard;