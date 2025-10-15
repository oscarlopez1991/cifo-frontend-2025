import { useContext, useEffect, useState } from "react";
import SettingsContext from "../context/SettingsContext";
import ScoreContext from "../context/ScoreContext";
import Question from "./Question";
import Scoreboard from "./Scoreboard";
import categoryMap from "../helpers/categoryMap";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const { settings } = useContext(SettingsContext);
  const { resetScore } = useContext(ScoreContext);

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
      resetScore(); // Reset score when new questions are fetched
    };

    fetchData();
  }, [settings, resetScore]);

  return (
    <div className="bg-quiz">
      <div className="container">
        <Scoreboard />
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
