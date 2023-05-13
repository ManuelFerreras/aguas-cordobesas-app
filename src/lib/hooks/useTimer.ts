import { useEffect, useState } from "react";

export default function useTimer() {
  const [timer, setTimer] = useState<number>(30000);

  const restartTimer = () => {
    setTimer(30000);
  };

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev - 1000), 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    timer,
    restartTimer,
  };
}
