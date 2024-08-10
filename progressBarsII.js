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

export default function App() {
  const [barsQuantity, setBarsQuantity] = useState([]);
  const [currentBarLoad, setCurrentBarLoad] = useState(0);

  const addBar = () => {
    setBarsQuantity([...barsQuantity, true]);
  };

  return (
    <div>
      {barsQuantity.map((currentBar, index) => (
        <ProgressBar
          key={`bar-${index}`}
          isAllowedToGo={index === currentBarLoad}
          callback={() => {
            setCurrentBarLoad(currentBarLoad + 1);
          }}
        />
      ))}

      <button onClick={addBar}>Add</button>
    </div>
  );
}
