import "./SuggestionCard.css";

function SuggestionCard({ suggestions }) {
  return (
    <div className="suggestion-card">

      <h2>💡 AI Suggestions</h2>

      <ul>

        {suggestions.map((item, index) => (

          <li key={index}>
            {item}
          </li>

        ))}

      </ul>

    </div>
  );
}

export default SuggestionCard;