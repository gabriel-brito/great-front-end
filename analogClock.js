import { useState, useEffect } from "react";

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const updateTime = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  return (
    <div>
      <div className="clock">
        <div
          id="hours"
          className="hour_hand"
          style={{
            transform: `rotateZ(${now.getHours() * 30}deg)`,
          }}
        />
        <div
          className="min_hand"
          id="minutes"
          style={{
            transform: `rotate(Z${now.getMinutes() * 6}deg)`,
          }}
        />
        <div
          id="seconds"
          className="sec_hand"
          style={{
            transform: `rotateZ(${now.getSeconds() * 6}deg)`,
          }}
        />
      </div>
    </div>
  );
}

// body {
//   font-family: sans-serif;
// }

// .clock {
//   width: 300px;
//   height: 300px;
//   border-radius: 50%;
//   position: absolute;
//   top: calc(50% - 150px);
//   left: calc(50% - 150px);
//   box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
// }

// .hour_hand {
//   position: absolute;
//   width: 6px;
//   height: 60px;
//   background: #222;
//   top: 30%;
//   left: 49%;
//   transform-origin: bottom;
// }

// .min_hand {
//   position: absolute;
//   width: 4px;
//   height: 80px;
//   background: #444;
//   top: 22.5%;
//   left: 49%;
//   transform-origin: bottom;
// }

// .sec_hand {
//   position: absolute;
//   width: 2px;
//   height: 118px;
//   background: red;
//   top: 10.5%;
//   left: 50%;
//   transform-origin: bottom;
// }
