import { useState, useEffect } from "react";
import "./styles.css";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === 100) {
      return;
    }

    const handleProgress = setInterval(() => {
      setProgress(progress + 1);
    }, 20);

    return () => {
      clearInterval(handleProgress);
    };
  }, [progress]);

  return (
    <div className="progress base">
      <div className="base progress-filled" style={{ width: `${progress}%` }}>
        <span>{progress}%</span>
      </div>
    </div>
  );
}

export default function App() {
  const [progressBarCount, setProgressBarCount] = useState(0);
  const bars = new Array(progressBarCount).fill("");

  const increment = () => {
    setProgressBarCount(progressBarCount + 1);
  };

  return (
    <div>
      <button onClick={increment} style={{ marginBottom: "24px" }}>
        Add
      </button>

      <div>
        {bars.length > 0 &&
          bars.map((_, index) => <ProgressBar key={`${index}-progress-bar`} />)}
      </div>
    </div>
  );
}

// body {
//   font-family: sans-serif;
// }

// .base {
//   background-color: rgb(233, 236, 239);
//   border-radius: 8px;
//   height: 20px;
//   margin-bottom: 12px;
// }

// .progress {
//   border: 1px solid #c5c5c5;
//   position: relative;
// }

// .progress-filled {
//   position: absolute;
//   background-color: #0d6efd;
//   overflow: hidden;
//   text-align: center;
// }

// .progress-filled span {
//   color: white;
//   margin: 0;
// }
