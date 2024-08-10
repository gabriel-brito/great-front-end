import { useState, useEffect } from "react";
import "./styles.css";

// 1) Create a grid 3x3; // Done
// 2) Render every item in the screen; // Done
// 3) Omit the rendering of the 4 index; // Done
// 4) Start to capture the square index on click; // Done
// 5) If the memory has indexes, light up the square that
// matches the memory index; // Done
// 6) If every quare where filled, start poping out
// the memory indexes saved; 300ms interval. // Done

const GRID = new Array(9).fill();
const MAX_LENGTH = 8;
const deepClone = (array) => JSON.parse(JSON.stringify(array));

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
            <div
              style={{
                backgroundColor: hasBeenSelected ? "green" : "transparent",
                display: "inline-block",
                float: "left",
                border: isMiddleGrid ? "none" : "1px solid",
                height: "80px",
                width: "80px",
                margin: "10px",
              }}
              onClick={() => {
                if (isMiddleGrid || blockedClick || hasBeenSelected) return;

                handleClick(index);
              }}
              key={`row-${index}`}
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
