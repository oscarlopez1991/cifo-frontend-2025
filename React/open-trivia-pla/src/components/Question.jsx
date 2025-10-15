import { useState, useMemo } from "react";

const Question = ({
  category,
  difficulty,
  question,
  correctAnswer,
  incorrectAnswers,
}) => {
  const [selected, setSelected] = useState(null);

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
    setSelected(answer);
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
      </div>
    </div>
  );
};

export default Question;
