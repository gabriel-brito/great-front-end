import { useState, useEffect } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
      return;
    }

    const handleProgress = setInterval(() => {
      setProgress(progress + 1);
    }, 50);

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

// style.css
// body {
//   font-family: sans-serif;
// }

// .base {
//   background-color: rgb(233, 236, 239);
//   border-radius: 8px;
//   height: 20px;
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
