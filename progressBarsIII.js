import { useState, useEffect } from "react";
import "./styles.css";

function ProgressBar({ isAllowedToGo = false, callback = () => {} }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAllowedToGo) return;

    if (progress === 100) {
      callback();
      return;
    }

    const updateProgress = setInterval(() => {
      setProgress((progress) => progress + 1);
    }, 20);

    return () => {
      clearInterval(updateProgress);
    };
  }, [progress, isAllowedToGo, callback]);

  return (
    <div
      style={{
        width: "100%",
        height: "8px",
        backgroundColor: "lightgrey",
        borderRadius: "12px",
        marginBottom: "8px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "8px",
          width: `${progress}%`,
          left: 0,
          top: "0",
          backgroundColor: "green",
          position: "absolute",
        }}
      ></div>
    </div>
  );
}

// Sliding Window Problem
export default function App() {
  const [barsQuantity, setBarsQuantity] = useState([]);
  const [currentWindow, setCurrentWindow] = useState([0, 3]);

  const addBar = () => {
    setBarsQuantity([...barsQuantity, true]);
  };

  const handleWindow = () => {
    const [x, z] = currentWindow;
    setCurrentWindow([x + 1, z + 1]);
  };

  return (
    <div>
      {barsQuantity.map((currentBar, index) => (
        <ProgressBar
          key={`bar-${index}`}
          isAllowedToGo={index >= currentWindow[0] && index < currentWindow[1]}
          callback={handleWindow}
        />
      ))}

      <button onClick={addBar}>Add</button>
    </div>
  );
}
