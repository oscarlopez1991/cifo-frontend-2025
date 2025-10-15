const Scoreboard = ({ correct, incorrect }) => (
  <div className="scoreboard">
    <span className="score-correct">👍 Correct: {correct}</span>
    <span className="score-incorrect">❌ Incorrect: {incorrect}</span>
  </div>
);

export default Scoreboard;
