import { useState, useEffect } from "react";
import "./styles.css";

const GRID = new Array(9).fill();
const MAX_LENGTH = 8;
const deepClone = (array) => JSON.parse(JSON.stringify(array));

function Cell({ label, disabled, isMiddleGrid, onClick, hasBeenSelected }) {
  return (
    <button
      ariaLabel={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: hasBeenSelected ? "green" : "transparent",
        display: "inline-block",
        float: "left",
        border: isMiddleGrid ? "none" : "1px solid",
        height: "80px",
        width: "80px",
        margin: "10px",
      }}
    ></button>
  );
}

export default function App() {
  const [orderClicked, setOrderClicked] = useState([]);
  const [blockedClick, setBlockedClick] = useState(false);
  const [hasReached, setHasReached] = useState(false);

  const handleClick = (index) => {
    const newArray = deepClone(orderClicked);
    newArray.push(index);
    setOrderClicked(newArray);
    setHasReached(newArray.length === MAX_LENGTH);
  };

  useEffect(() => {
    if (hasReached) {
      const popOut = setInterval(() => {
        setBlockedClick(true);
        const newArray = deepClone(orderClicked);

        newArray.pop();
        setOrderClicked(newArray);

        setBlockedClick(false);
      }, 300);

      return () => {
        clearInterval(popOut);
      };
    }
  }, [orderClicked, hasReached]);

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "12px",
          border: "1px solid",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "320px",
        }}
      >
        {GRID.map((_, index) => {
          const hasBeenSelected = orderClicked.includes(index);
          const isMiddleGrid = index === 4;

          return (
            <Cell
              label={`cell-${index}`}
              isMiddleGrid={isMiddleGrid}
              hasBeenSelected={hasBeenSelected}
              disabled={isMiddleGrid || blockedClick || hasBeenSelected}
              onClick={() => {
                handleClick(index);
              }}
              key={`cell-${index}`}
            />
          );
        })}
      </div>

      <p>
        <strong>Order</strong>: {orderClicked.join(", ")}
      </p>
    </main>
  );
}
