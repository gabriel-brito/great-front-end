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

export default function App() {
  const [diceQuantity, setDiceQuantity] = useState(0);
  const dices = new Array(diceQuantity).fill(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const diceQuantity = formData.get("quantity");
    setDiceQuantity(Number(diceQuantity));
  };

  return (
    <div>
      <DiceQuantityForm handleSubmit={handleSubmit} />

      <div className="dice-table">
        {dices.length > 0 &&
          dices.map((_, index) => (
            <DiceRenderer
              key={`dice-${index}`}
              diceNumber={Math.round(Math.random() * 6)}
            />
          ))}
      </div>
    </div>
  );
}
