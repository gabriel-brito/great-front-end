import { useState, createContext, useContext } from "react";

import "./styles.css";

const boardContext = createContext(null);

// Red pieces: #d9313d
// Yellow pieces: #fdc601
// Blue board: #1c61f2

// Create Board (6x7) - Done;
// Push funcionality (top down) - Done;
// add reset funcionality - Done;
// alternate between users - Done;
// verify winning conditions - Done;
// - 1) row - Done;
// - 2) column - Done;
// - 3) Diagonal - Done;
// Add draw funcionality - Done;

const ROWS = 6;
const COLUMNS = 7;
const DISCS_SEQUENCE_TO_WIN = 4;
const BOARD_BASE = Array.from({ length: ROWS }, () =>
  Array(COLUMNS).fill(null)
);

function Board() {
  const { board } = useBoardContext();

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={`row-${rowIndex}`}>
          {row.map((col, colIndex) => (
            <div
              className="cell"
              key={`col-${colIndex}`}
              style={{ backgroundColor: col ? col : "white" }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ControlCell({ column }) {
  const [isHovering, setIsHovering] = useState(false);
  const { playerColor, handlePlayerChoice } = useBoardContext();

  return (
    <button
      onClick={() => {
        handlePlayerChoice(column);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="cell"
      style={{
        border: "none",
        backgroundColor: isHovering ? playerColor : "white",
      }}
    />
  );
}

function Controls() {
  const columnArray = Array(COLUMNS).fill(null);

  return (
    <div className="controls">
      {columnArray.map((_, index) => (
        <ControlCell key={`control-${index}`} column={index} />
      ))}
    </div>
  );
}

function ResetButton() {
  const { resetGame } = useBoardContext();

  return (
    <div className="reset-button-wrapper">
      <button onClick={resetGame} aria-label="Reset Game">
        Reset Game
      </button>
    </div>
  );
}

function GameStatus() {
  const { winner, isDraw } = useBoardContext();

  if (!winner && !isDraw) return null;

  const statusMessage = isDraw ? "Draw" : "Winner";
  const statusColor = isDraw ? "grey" : winner;

  return (
    <div
      className="game-status-wrapper"
      style={{
        color: isDraw ? "black" : "white",
        backgroundColor: statusColor,
      }}
    >
      {statusMessage}
    </div>
  );
}

export default function App() {
  return (
    <BoardContextProvider>
      <GameStatus />

      <Controls />

      <Board />

      <ResetButton />
    </BoardContextProvider>
  );
}

function checkWinnerByHorizontal(board, player) {
  let result = false;

  for (let i = 0; i < board.length; i++) {
    let count = 0;

    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === player) {
        count++;
      } else {
        count = 0;
      }

      if (count === DISCS_SEQUENCE_TO_WIN) {
        result = true;
        break;
      }
    }
  }

  return result;
}

function checkWinnerByVertical(board, player) {
  let result = false;

  for (let i = 0; i < COLUMNS; i++) {
    let count = 0;

    for (let j = 0; j < board.length; j++) {
      if (board[j][i] === player) {
        count++;
      } else {
        count = 0;
      }

      if (count === DISCS_SEQUENCE_TO_WIN) {
        result = true;
        break;
      }
    }
  }

  return result;
}

function checkWinnerByDiagonal(board, player) {
  let result = false;

  // Check top-left to bottom-right diagonals
  for (let row = 0; row <= ROWS - 4; row++) {
    for (let col = 0; col <= COLUMNS - 4; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        result = true;
      }
    }
  }

  // Check bottom-left to top-right diagonals
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col <= COLUMNS - 4; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        result = true;
      }
    }
  }

  return result;
}

function checkWinner(board, player) {
  return (
    checkWinnerByHorizontal(board, player) ||
    checkWinnerByVertical(board, player) ||
    checkWinnerByDiagonal(board, player)
  );
}

function BoardContextProvider({ children }) {
  const [board, setBoard] = useState(BOARD_BASE);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState("");
  const playerColor = playerTurn % 2 === 0 ? "#d9313d" : "#fdc601";
  const maxMoves = ROWS * COLUMNS;
  const movesCount = board.reduce(
    (count, row) => count + row.filter(Boolean).length,
    0
  );
  const isDraw = maxMoves === movesCount;

  const handlePlayerChoice = (column) => {
    if (winner || isDraw) return;

    const boardClone = board.map((row) => [...row]);
    let rowIndex = ROWS - 1;

    while (boardClone[rowIndex][column] !== null) {
      rowIndex--;
    }

    if (rowIndex < 0) return;

    boardClone[rowIndex][column] = playerColor;

    if (checkWinner(boardClone, playerColor)) {
      setWinner(playerColor);
    }

    setBoard(boardClone);
    setPlayerTurn(playerTurn + 1);
  };

  const resetGame = () => {
    setBoard(BOARD_BASE);
    setPlayerTurn(1);
  };

  const value = {
    isDraw,
    winner,
    resetGame,
    board,
    playerColor,
    handlePlayerChoice,
  };

  return (
    <boardContext.Provider value={value}>{children}</boardContext.Provider>
  );
}

const useBoardContext = () => {
  const state = useContext(boardContext);

  return state;
};
