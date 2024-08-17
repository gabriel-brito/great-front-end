import { useState, useContext, createContext } from "react";

const SelectedColorContext = createContext(null);

const BASE_CANVAS = Array.from({ length: 15 }, () =>
  Array.from({ length: 15 }, () => null)
);

const COLORS = {
  white: "#fff",
  gray: "#e9ecef",
  black: "#000",
  red: "#cc0001",
  orange: "#fb940b",
  yellow: "#ffff01",
  green: "#01cc00",
  teal: "#38d9a9",
  blue: "#228be6",
  purple: "#7950f2",
  beige: "#ff8787",
};

// 1) Draw Canvas - Done;
// 2) Create bottom tools - Done;
// 3) Select color on click - Done;
// 4) Color cell on click - Done;
// 5) Alternate between "draw" and "erase" mode - Done;

function Cell({ isOdd, color = null, handleClick }) {
  const styles = color ? { backgroundColor: color } : {};

  return (
    <button
      onClick={handleClick}
      role="cell"
      className={["cell", isOdd && "odd-cell"].filter(Boolean).join(" ")}
      style={styles}
    />
  );
}

function Canvas() {
  const { canvas } = useCanvasProvider();
  const { paintCell } = useCanvasProvider();

  return (
    <div aria-live="polite" className="canvas">
      {canvas.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <Cell
              handleClick={() => paintCell(rowIndex, cellIndex)}
              key={`cell-${cellIndex}`}
              isOdd={(cellIndex + rowIndex) % 2 === 0}
              color={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function PaletteCell({ color, hex }) {
  const { handleSelectedColor, selectedColor } = useCanvasProvider();

  return (
    <button
      className={["palette", "cell", selectedColor === hex && "selected"]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: hex }}
      aria-label={`${color} cell`}
      onClick={() => handleSelectedColor(hex)}
    />
  );
}

function Pallet() {
  return (
    <div className="palette">
      {Object.entries(COLORS).map(([color, hex]) => (
        <PaletteCell key={`cell-${color}`} color={color} hex={hex} />
      ))}
    </div>
  );
}

function Controls() {
  const { isDrawing, handleMethod } = useCanvasProvider();

  return (
    <div className="controls">
      <div className="controls-buttons">
        <button
          onClick={() => handleMethod("draw")}
          className={isDrawing ? "selected" : ""}
        >
          Draw
        </button>
        <button
          onClick={() => handleMethod("erase")}
          className={!isDrawing ? "selected" : ""}
        >
          Erase
        </button>
      </div>

      <Pallet />
    </div>
  );
}

export default function App() {
  return (
    <CanvasProvider>
      <Canvas />

      <Controls />
    </CanvasProvider>
  );
}

function CanvasProvider({ children }) {
  const [canvas, setCanvas] = useState(BASE_CANVAS);
  const [method, setMethod] = useState("draw");
  const [selectedColor, setSelectedColor] = useState(null);
  const isDrawing = method === "draw";

  const handleSelectedColor = (hex) => {
    setSelectedColor(hex);
  };

  const paintCell = (row, col) => {
    if (!selectedColor) return;

    const canvasClone = canvas.slice();

    canvasClone[row][col] = isDrawing ? selectedColor : null;

    setCanvas(canvasClone);
  };

  const handleMethod = (newMethod) => {
    if (newMethod === method) return;

    setMethod(newMethod);
  };

  const value = {
    paintCell,
    canvas,
    isDrawing,
    handleMethod,
    handleSelectedColor,
    selectedColor,
  };

  return (
    <SelectedColorContext.Provider value={value}>
      {children}
    </SelectedColorContext.Provider>
  );
}

function useCanvasProvider() {
  const state = useContext(SelectedColorContext);

  return state;
}
