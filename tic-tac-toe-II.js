import { useState } from "react";
import "./styles.css";

const ROWS = 5;
const COLUMNS = 5;
const SEQUENCE_TO_WIN = 4;
const DIRECTION_DELTAS = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: -1, col: 1 },
];
const BOARD_BASE = Array.from({ length: ROWS }, () => Array(COLUMNS).fill());

const Player = {
  X: 1,
  O: 2,
};

function isWinnerSequence(
  startRow,
  startCol,
  deltaRow,
  deltaColumn,
  board,
  player
) {
  for (let i = 0; i < SEQUENCE_TO_WIN; i++) {
    const row = startRow + i * deltaRow;
    const col = startCol + i * deltaColumn;

    if (
      row < 0 ||
      row >= ROWS ||
      col < 0 ||
      col >= COLUMNS ||
      board[row][col] !== player
    ) {
      return false;
    }
  }

  return true;
}

export default function App() {
  const [gameTable, setGameTable] = useState(BOARD_BASE);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winnerPlayer, setWinnerPlayer] = useState("");
  const hasWinner = !!winnerPlayer;
  const nextTurn = currentTurn === "X" ? "O" : "X";

  const handleReset = () => {
    setGameTable(BOARD_BASE);
    setCurrentTurn("X");
    setWinnerPlayer("");
  };

  const handleWinner = (playerChoise) => {
    setWinnerPlayer(`Player ${Player[playerChoise]} wins!`);
  };

  const handleClick = (row, column) => {
    const board = gameTable.map((row) => [...row]);

    if (board[row][column]) {
      return;
    }

    board[row][column] = currentTurn;
    setGameTable(board);

    if (checkDraw(board)) {
      setWinnerPlayer("Draw!");
      return;
    }

    if (checkWinners(board, currentTurn)) {
      return;
    }

    setCurrentTurn(nextTurn);
  };

  const checkWinners = (board, player) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        for (const { row: deltaRow, col: deltaColumn } of DIRECTION_DELTAS) {
          if (isWinnerSequence(i, j, deltaRow, deltaColumn, board, player)) {
            handleWinner(player);

            return true;
          }
        }
      }
    }

    return false;
  };

  const checkDraw = (gameTable) => {
    const possibleMovements = ROWS * COLUMNS;
    const movementsMade = gameTable.reduce(
      (acc, row) => acc + row.filter(Boolean).length,
      0
    );

    return possibleMovements === movementsMade;
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
              <button
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
              </button>
            ))}
          </div>
        ))}
      </div>

      {hasWinner && <button onClick={handleReset}>Reset</button>}
    </div>
  );
}
