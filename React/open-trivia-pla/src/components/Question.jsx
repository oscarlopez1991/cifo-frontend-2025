import { useState, useMemo } from "react";

const Question = ({
  category,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
  onCorrect,
  onIncorrect,
}) => {
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  const answers = useMemo(() => {
    const arr = [correctAnswer, ...incorrectAnswers];
    return arr.sort(() => Math.random() - 0.5);
  }, [correctAnswer, incorrectAnswers]);

  const sanitize = (text) =>
    text
      .replaceAll("&quot;", '"')
      .replaceAll("&#039;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&deg;", "º")
      .replaceAll("&shy;", "\u00AD");

  const handleAnswerClick = (answer) => {
    if (selected) return; // Only allows answering once

    setSelected(answer);
    if (answer === correctAnswer) {
      setPopupMsg("✅ Correct!");
      onCorrect && onCorrect();
    } else {
      setPopupMsg("❌ Incorrect!");
      onIncorrect && onIncorrect();
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

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
