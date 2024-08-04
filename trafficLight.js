import { useState, useEffect } from "react";

const trafficLightWrapper = {
  backgroundColor: "#3d3a33",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: "8px",
  padding: "16px",
  border: "1px solid",
  width: "fit-content",
  margin: "16px auto",
  boxShadow: "2px 7px 5px -1px rgba(0,0,0,0.75)",
};

const trafficLightBulb = {
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  border: "1px solid",
};

const signalEnumIndex = {
  0: "Red",
  1: "Yellow",
  2: "Green",
};

const currentSignalMiliseconds = {
  Red: 4000,
  Yellow: 500,
  Green: 3000,
};

export default function TrafficLight() {
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const signals = ["red", "yellow", "green"];
  const currentInterval =
    currentSignalMiliseconds[signalEnumIndex[currentSignalIndex]];

  useEffect(() => {
    const handleSignalChange = setInterval(() => {
      if (currentSignalIndex === 2) {
        setCurrentSignalIndex(0);
      } else {
        setCurrentSignalIndex(currentSignalIndex + 1);
      }
    }, currentInterval);

    return () => clearInterval(handleSignalChange);
  }, [currentSignalIndex, currentInterval]);

  return (
    <main style={{ textAlign: "center" }}>
      <div style={trafficLightWrapper}>
        {signals.map((signal, index) => (
          <div
            key={`${signal}-${index}`}
            style={{
              ...trafficLightBulb,
              backgroundColor: signal,
              opacity: signal === signals[currentSignalIndex] ? 1 : 0.25,
            }}
          />
        ))}
      </div>
    </main>
  );
}
