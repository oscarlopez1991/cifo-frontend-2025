import { useContext, useEffect, useState } from "react";
import SettingsContext from "../context/SettingsContext";
import Question from "./Question";
import Scoreboard from "./Scoreboard";
import categoryMap from "../helpers/categoryMap";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const { settings } = useContext(SettingsContext);

  const apiUrl = "https://opentdb.com/api.php?type=multiple";

  useEffect(() => {
    const fetchData = async () => {
      const filterNumber = "&amount=" + settings.number;
      const filterCategory = `&category=${
        categoryMap[settings.category] || categoryMap.Sports
      }`;
      const filterDifficulty =
        "&difficulty=" + settings.difficulty.toLowerCase();
      const response = await fetch(
        `${apiUrl}${filterNumber}${filterCategory}${filterDifficulty}`
      );
      const data = await response.json();
      setQuestions(data.results);
      setScore({ correct: 0, incorrect: 0 }); // Reset score when new questions are fetched
    };

    fetchData();
  }, [settings]);

  const handleAnswer = (isCorrect) => {
    setScore((prevScore) => ({
      ...prevScore,
      correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
      incorrect: !isCorrect ? prevScore.incorrect + 1 : prevScore.incorrect,
    }));
  };

  return (
    <div className="bg-quiz">
      <div className="container">
        <Scoreboard correct={score.correct} incorrect={score.incorrect} />
        <div className="questions">
          {questions.map((quizItem) => (
            <Question
              key={`${quizItem.question}-${quizItem.correct_answer}`}
              category={quizItem.category}
              type={quizItem.type}
              difficulty={quizItem.difficulty}
              question={quizItem.question}
              correctAnswer={quizItem.correct_answer}
              incorrectAnswers={quizItem.incorrect_answers}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
