import { useContext, useState, useMemo, useCallback } from "react";
import ScoreContext from "../context/ScoreContext";

const Question = ({
  category,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
}) => {
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const { updateScore } = useContext(ScoreContext);

  const sanitize = useCallback(
    (text) =>
      text
        .replaceAll("&quot;", '"')
        .replaceAll("&#039;", "'")
        .replaceAll("&amp;", "&")
        .replaceAll("&deg;", "º")
        .replaceAll("&shy;", "\u00AD"),
    []
  );

  const answers = useMemo(() => {
    const arr = [correctAnswer, ...incorrectAnswers];
    return arr.sort(() => Math.random() - 0.5);
  }, [correctAnswer, incorrectAnswers]);

  const handleAnswerClick = useCallback(
    (answer) => {
      if (selected) return;

      const isCorrect = answer === correctAnswer;
      setSelected(answer);
      setPopupMsg(isCorrect ? "✅ Correct!" : "❌ Incorrect!");
      updateScore(isCorrect);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    },
    [selected, correctAnswer, updateScore]
  );

  return (
    <div>
      <div className="card">
        <h2>{category}</h2>
        <p className="difficulty">{difficulty}</p>
        <p className="question">{sanitize(question)}</p>
        {answers.map((answer) => (
          <p
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            className={`answer ${
              selected
                ? answer === correctAnswer
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
          >
            {sanitize(answer)}
          </p>
        ))}
        {showPopup && <div className="popup">{popupMsg}</div>}
      </div>
    </div>
  );
};

export default Question;
