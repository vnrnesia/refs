import { useState } from "react";

export default function TimerChallange() {

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    let timer;

    function handleStart () {
        timer = setTimeout(() => {
            setTimerExpired(true);
        }, targetTime * 1000);

        setTimerStarted(true)
        }

    function handleStop () {
        clearTimeout(timer);
        setTimerStarted(false);
    }
    




  return (
    <section className="challange">
      <h2>{title}</h2>
      {timerExpired && <p> You Lost! </p>}
      <p className="challange-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>Challange</button>
      </p>
      <p></p>
    </section>
  );
}
