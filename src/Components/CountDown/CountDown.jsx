import { useState } from "react";
import { useEffect } from "react";
import usePoll from "../../Hooks/usePoll";
import styles from "./CountDown.module.css";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function CountDown({ pollId, handlePollExpire }) {
  const { data } = usePoll(pollId);

  const [tillPollEnds] = useState(() => {
    const then = Date.now() + data.poll.tillExpire;
    return then;
  });

  const [didPollExpire, setDidPollExpire] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(Infinity);

  useEffect(() => {
    let timer;

    if (data.poll.tillExpire > 0 && secondsLeft >= 0) {
      setDidPollExpire(false);
      //Interval function
      function getTimeLeft() {
        let timeRemaining = Math.round((tillPollEnds - Date.now()) / 1000);
        setSecondsLeft(timeRemaining);
      }
      getTimeLeft();
      timer = setInterval(getTimeLeft, 1000);
      if (secondsLeft === 0) {
        setDidPollExpire(true);
        handlePollExpire();
      }
    } else {
      setDidPollExpire(true);
      handlePollExpire();
    }
    return () => {
      clearInterval(timer);
    };
  }, [secondsLeft]);

  return (
    <div className={styles.poll_time_and_expire_container}>
      {didPollExpire ? (
        <h1>Poll Expired</h1>
      ) : (
        <h1>{formatTime(secondsLeft)} Time left</h1>
      )}
    </div>
  );
}

export default CountDown;
