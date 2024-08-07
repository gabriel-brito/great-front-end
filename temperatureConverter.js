import { useState } from "react";
import "./styles.css";

const rowStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "8px",
};

const celsiusToFahrenheit = (celsius) => {
  const formula = (celsius * 9) / 5 + 32;

  if (`${formula}`.length > 5) {
    return parseFloat(formula).toFixed(1);
  }

  return formula;
};

export default function App() {
  const [temperature, setTemperature] = useState("");

  const handleTemperature = (event) => {
    setTemperature(Number(event.target.value));
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
      <div style={rowStyles}>
        <input
          placeholder="0"
          value={temperature}
          onChange={handleTemperature}
          type="number"
          id="celsius"
          name="celsius"
        />
        <label htmlFor="celsius">Celsius</label>
      </div>

      <span>=</span>

      <div style={rowStyles}>
        <input
          placeholder="32"
          type="number"
          id="fahrenheit"
          name="fahrenheit"
          onChange={handleTemperature}
          value={celsiusToFahrenheit(temperature)}
        />
        <label htmlFor="fahrenheit">Fahrenheit</label>
      </div>
    </div>
  );
}
