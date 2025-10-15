import { createContext, useState, useCallback } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const updateScore = useCallback((isCorrect) => {
    setScore((prevScore) => ({
      ...prevScore,
      correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
      incorrect: !isCorrect ? prevScore.incorrect + 1 : prevScore.incorrect,
    }));
  }, []);

  const resetScore = useCallback(() => {
    setScore({ correct: 0, incorrect: 0 });
  }, []);

  return (
    <ScoreContext.Provider value={{ score, updateScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
