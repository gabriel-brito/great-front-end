import { useState, createContext, useContext } from "react";

const boardContext = createContext(null);

const ROWS = 6;
const COLUMNS = 7;
const DISCS_SEQUENCE_TO_WIN = 4;
const DIRECTiON_DELTAS = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: -1, col: 1 },
];
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

function isWinningSequence(
  startRow,
  startCol,
  deltaRow,
  deltaCol,
  board,
  player
) {
  for (let i = 0; i < DISCS_SEQUENCE_TO_WIN; i++) {
    const row = startRow + i * deltaRow;
    const col = startCol + i * deltaCol;

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

function checkWinner(board, player) {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      for (const { row: deltaRow, col: deltaCol } of DIRECTiON_DELTAS) {
        if (isWinningSequence(i, j, deltaRow, deltaCol, board, player)) {
          return true;
        }
      }
    }
  }

  return false;
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
    setWinner("");
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
