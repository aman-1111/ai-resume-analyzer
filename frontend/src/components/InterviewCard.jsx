import "./InterviewCard.css";

function InterviewCard({ questions }) {
  return (
    <div className="interview-card">

      <div className="card-header">

        <h2>🎤 Interview Questions</h2>

        <span className="card-tag">
          Practice
        </span>

      </div>

      <div className="question-list">

        {questions.map((question, index) => (

          <div
            className="question-item"
            key={index}
          >

            <div className="question-number">
              Q{index + 1}
            </div>

            <div className="question-text">
              {question}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default InterviewCard;