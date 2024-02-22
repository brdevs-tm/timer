import React, { useState, useEffect } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import soundFile from "../../assets/sound/timer.mp3";
import Modal from "../modal/Modal";

function Timer() {
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const sound = new Audio(soundFile);

  const handleChange = (e, field) => {
    const value = e.target.value.trim() !== "" ? parseInt(e.target.value) : 0;
    setTime((prevTime) => ({
      ...prevTime,
      [field]: value,
    }));
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const { hours, minutes, seconds } = time;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          setIsActive(false);
          setIsModalOpen(true);
          sound.play();
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setTime((prevTime) => ({
                hours: prevTime.hours - 1,
                minutes: 59,
                seconds: 59,
              }));
            } else {
              setTime((prevTime) => ({
                ...prevTime,
                minutes: prevTime.minutes - 1,
                seconds: 59,
              }));
            }
          } else {
            setTime((prevTime) => ({
              ...prevTime,
              seconds: prevTime.seconds - 1,
            }));
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      sound.pause();
    };
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  const isAnyInputZero =
    time.hours === 0 || time.minutes === 0 || time.seconds === 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="flex justify-center text-5xl">Timer</h1>
      <div className="flex gap-3">
        <Input
          type="number"
          placeholder="Hours"
          value={time.hours}
          onChange={(e) => handleChange(e, "hours")}
        />
        <Input
          type="number"
          placeholder="Minutes"
          value={time.minutes}
          onChange={(e) => handleChange(e, "minutes")}
        />
        <Input
          type="number"
          placeholder="Seconds"
          value={time.seconds}
          onChange={(e) => handleChange(e, "seconds")}
        />
      </div>
      <p className="flex justify-center text-5xl">{`${formatTime(
        time.hours
      )}:${formatTime(time.minutes)}:${formatTime(time.seconds)}`}</p>
      <div className="flex gap-2 mt-40">
        <Button onClick={handleStart} disabled={isAnyInputZero}>
          Start
        </Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Timer;
