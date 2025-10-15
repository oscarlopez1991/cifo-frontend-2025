import { useContext } from "react";
import ScoreContext from "../context/ScoreContext";

const Scoreboard = () => {
  const { score } = useContext(ScoreContext);

  return (
    <div className="scoreboard">
      <span className="score-correct">👍 Correct: {score.correct}</span>
      <span className="score-incorrect">❌ Incorrect: {score.incorrect}</span>
    </div>
  );
};

export default Scoreboard;
