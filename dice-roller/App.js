import { useState, useId } from "react";

import { dicePatterns } from "./dices";

import "./styles.css";

function DiceRenderer({ diceNumber }) {
  if (!diceNumber) return;

  const dice = dicePatterns[diceNumber];

  return (
    <div className="dice">
      {dice.map((diceRow, diceIndex) => (
        <div className="row" key={`dice-${diceIndex}`}>
          {diceRow.map((dot, dotIndex) => (
            <div
              className={`dot ${dot ? "fullfiled" : ""}`}
              key={`dot-${dotIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function DiceQuantityForm({ handleSubmit }) {
  const inputId = useId();

  return (
    <form className="dice-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <label htmlFor={inputId}>Number of dice</label>
        <input
          id={inputId}
          min={1}
          max={12}
          name="quantity"
          required
          type="number"
        />
      </div>

      <button type="submit">Roll</button>
    </form>
  );
}

const generateDices = (quantity) =>
  Array.from({ length: quantity }, () =>
    Math.max(Math.ceil(Math.round(Math.random() * 6)), 1)
  );

export default function App() {
  const [diceResults, setDiceResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const diceQuantity = formData.get("quantity");

    setDiceResults(generateDices(diceQuantity));
  };

  return (
    <div>
      <DiceQuantityForm handleSubmit={handleSubmit} />

      {diceResults.length > 0 && (
        <div aria-live="polite" role="status" className="dice-table">
          {diceResults.map((result, index) => (
            <DiceRenderer key={`dice-${index}`} diceNumber={result} />
          ))}

          <div className="screen-reader-only">{diceResults.join(", ")}</div>
        </div>
      )}
    </div>
  );
}
