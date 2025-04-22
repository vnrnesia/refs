import { useState, useRef, useEffect } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [timerStarted, setTimerStarted] = useState(false);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // Timer sıfırlanınca ResultModal aç
  useEffect(() => {
    if (timeRemaining <= 0 && timerStarted) {
      clearInterval(timer.current);
      dialog.current.open();
      setTimerStarted(false);
    }
  }, [timeRemaining, timerStarted]);

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
    setTimerStarted(false);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10); // 10 ms'de bir güncelle
    setTimerStarted(true);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
    setTimerStarted(false);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
