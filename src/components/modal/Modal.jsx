import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import soundFile from "../../assets/sound/timer.mp3";

function Modal({ isOpen, onClose }) {
  const [count, setCount] = useState(1);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const sound = new Audio(soundFile);

  useEffect(() => {
    let intervalId;

    if (isOpen) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);

      sound.play();
      setSoundPlaying(true);
    } else {
      clearInterval(intervalId);
      sound.pause();
      sound.currentTime = 0;
      setSoundPlaying(false);
    }

    return () => clearInterval(intervalId);
  }, [isOpen]);

  const formatTime = (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (value) => {
    return value.toString().padStart(2, "0");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg">
          <p className="text-gray-900 text-lg">{formatTime(count)}</p>
          <Button onClick={handleClose} className="mt-4">
            Close
          </Button>
        </div>
      </div>
    )
  );
}

export default Modal;
