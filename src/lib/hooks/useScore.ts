import { useState } from "react";

export default function useScore() {
  const [score, setScore] = useState<number>(0);

  const increaseScore = () => {
    setScore((prev) => prev + 10);
  };

  const restartScore = () => {
    setScore(0);
  };

  return {
    increaseScore,
    score,
    restartScore,
  };
}
