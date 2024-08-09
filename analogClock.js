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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.75)",
        }}
      >
        <div
          style={{
            width: "25px",
            height: "25px",
            backgroundColor: "lightgrey",
            borderRadius: "50%",
            position: "absolute",
            top: "calc(50% - 12.5px)",
            left: "calc(50% - 12.5px)",
            zIndex: 1,
          }}
        />
        <div
          id="hours"
          style={{
            position: "absolute",
            transformOrigin: "bottom",
            width: "3px",
            height: "90px",
            left: "49%",
            top: "21%",
            backgroundColor: "black",
            transform: `rotateZ(${now.getHours() * 30}deg)`,
          }}
        />
        <div
          id="minutes"
          style={{
            position: "absolute",
            transformOrigin: "bottom",
            width: "2px",
            height: "125px",
            left: "49%",
            top: "8%",
            backgroundColor: "black",
            transform: `rotateZ(${now.getMinutes() * 6}deg)`,
          }}
        />
        <div
          id="seconds"
          style={{
            position: "absolute",
            transformOrigin: "bottom",
            width: "1px",
            height: "125px",
            left: "49%",
            top: "9%",
            backgroundColor: "red",
            transform: `rotateZ(${now.getSeconds() * 6}deg)`,
          }}
        />
      </div>
    </div>
  );
}
