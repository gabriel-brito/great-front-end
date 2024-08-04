import { useState, useEffect } from "react";

const wrapperStyles = {
  border: "3px solid gray",
  borderRadius: "8px",
  backgroundColor: "black",
  color: "white",
  textAlign: "right",
  height: "fit-content",
};

const timerStyles = {
  padding: "0 16px",
  fontSize: "64px",
  margin: 0,
};

const isBrowser = typeof window !== "undefined";

export default function Clock() {
  const [now, setNow] = useState(() => {
    if (isBrowser) return new Date();

    return null;
  });

  const handleZeros = (time) => {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  };

  useEffect(() => {
    const handleClockUpdates = setInterval(() => {
      if (isBrowser) {
        setNow(new Date());
      }
    }, 1000);

    return () => clearInterval(handleClockUpdates);
  }, []);

  return (
    <div style={wrapperStyles}>
      <p style={timerStyles}>
        {!now
          ? "Starting..."
          : `${handleZeros(now.getHours())}:${handleZeros(
              now.getMinutes()
            )}:${handleZeros(now.getSeconds())}`}
      </p>
    </div>
  );
}
