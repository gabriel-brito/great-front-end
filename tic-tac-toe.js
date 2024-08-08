import { useState } from "react";
import "./styles.css";

const table = Array(3)
  .fill()
  .map(() => Array(3).fill());

const Player = {
  X: 1,
  O: 2,
};

export default function App() {
  const [gameTable, setGameTable] = useState(table);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winnerPlayer, setWinnerPlayer] = useState("");
  const hasWinner = !!winnerPlayer;
  const nextTurn = currentTurn === "X" ? "O" : "X";

  const handleReset = () => {
    setGameTable(table);
    setCurrentTurn("X");
    setWinnerPlayer("");
  };

  const handleWinner = (playerChoise) => {
    setWinnerPlayer(`Player ${Player[playerChoise]} wins!`);
  };

  const checkWinner = (iterator, playerChoise) => {
    return iterator.every((entry) => entry === playerChoise);
  };

  const handleClick = (row, column) => {
    const gameTableClone = JSON.parse(JSON.stringify(gameTable));
    const thisTurn = currentTurn;

    if (gameTableClone[row][column]) {
      return;
    }

    gameTableClone[row][column] = thisTurn;

    checkDraw(gameTableClone);
    checkWinners(gameTableClone, thisTurn);

    setCurrentTurn(nextTurn);
    setGameTable(gameTableClone);
  };

  const horizontalWinner = (row, playerChoise) => {
    const result = [];

    row.forEach((column) => {
      result.push(column);
    });

    if (checkWinner(result, playerChoise)) {
      handleWinner(playerChoise);
    }
  };

  const verticalWinner = (table, playerChoise) => {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      const verticalResult = [];

      for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
        verticalResult.push(table[rowIndex][columnIndex]);
      }

      if (checkWinner(verticalResult, playerChoise)) {
        handleWinner(playerChoise);
        break;
      }
    }
  };

  const winnerByDiagonal = (table, playerChoise) => {
    const leftDiagonal = [table[0][0], table[1][1], table[2][2]];
    const rightDiagonal = [table[0][2], table[1][1], table[2][0]];

    if (
      checkWinner(leftDiagonal, playerChoise) ||
      checkWinner(rightDiagonal, playerChoise)
    ) {
      handleWinner(playerChoise);
    }
  };

  const checkWinners = (gameTableClone, playerChoise) => {
    gameTableClone.forEach((row) => {
      horizontalWinner(row, playerChoise);
    });

    verticalWinner(gameTableClone, playerChoise);

    winnerByDiagonal(gameTableClone, playerChoise);
  };

  const checkDraw = (gameTable) => {
    let isDraw = true;

    for (let rowIndex = 0; rowIndex < gameTable.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        if (!gameTable[rowIndex][columnIndex]) {
          isDraw = false;
          break;
        }
      }
    }

    if (isDraw) {
      setWinnerPlayer("Draw!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>{hasWinner ? winnerPlayer : `Player ${Player[currentTurn]} turn`}</h2>

      <div style={{ marginBottom: "24px" }}>
        {gameTable.map((row, rowIndex) => (
          <div key={`${rowIndex}-row`} style={{ display: "flex" }}>
            {row.map((column, columnIndex) => (
              <div
                style={{
                  padding: "16px",
                  width: "40px",
                  height: "40px",
                  border: "1px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
                onClick={() => {
                  if (!hasWinner) {
                    handleClick(rowIndex, columnIndex);
                  }
                }}
                key={`${rowIndex}-${columnIndex}-column`}
              >
                {column}
              </div>
            ))}
          </div>
        ))}
      </div>

      {hasWinner && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}
