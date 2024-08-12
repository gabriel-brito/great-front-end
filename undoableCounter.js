import { useState } from "react";
import "./styles.css";

function Controls({
  reset,
  isUndoAvailable,
  isRedoAvailable,
  handleUndo,
  handleRedo,
}) {
  return (
    <div className="controls">
      <button disabled={!isUndoAvailable} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={!isRedoAvailable} onClick={handleRedo}>
        Redo
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function Operations({ currentValue, handleOperation }) {
  return (
    <div className="operations">
      <div className="button-group">
        <button onClick={() => handleOperation("/2")}>/2</button>
        <button onClick={() => handleOperation("-1")}>-1</button>
      </div>

      <span className="current-value">{currentValue}</span>

      <div className="button-group">
        <button onClick={() => handleOperation("+1")}>+1</button>
        <button onClick={() => handleOperation("*2")}>x2</button>
      </div>
    </div>
  );
}

function OperationsTable({ history }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Operation</th>
          <th>Old</th>
          <th>New</th>
        </tr>
      </thead>
      <tbody>
        {history.map((story, index) => (
          <tr key={`story-${index}`}>
            <td>{story.operation}</td>
            <td>{story.oldValue}</td>
            <td>{story.newValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const hasHistory = history.length > 0;

  const reset = () => {
    setRedoHistory([]);
    setHistory([]);
    setCurrentValue(0);
  };

  const handleRedo = () => {
    const lastOperation = redoHistory[redoHistory.length - 1];
    const newRedoHistory = redoHistory.slice();
    const newHistory = history.slice();

    newRedoHistory.pop();
    setRedoHistory(newRedoHistory);

    newHistory.push(lastOperation);
    setHistory(newHistory);

    setCurrentValue(lastOperation.newValue);
  };

  const handleUndo = () => {
    const newHistory = history.slice();
    const newRedoHistory = redoHistory.slice();
    const lastHistory = newHistory.pop();

    newRedoHistory.push(lastHistory);

    setRedoHistory(newRedoHistory);
    setCurrentValue(lastHistory.oldValue);
    setHistory(newHistory);
  };

  const handleOperation = (action) => {
    const operation = operations[action];
    const newValue = operation(currentValue);

    setHistory([
      ...history,
      {
        operation: action,
        oldValue: currentValue,
        newValue: newValue,
      },
    ]);

    setRedoHistory([]);
    setCurrentValue(newValue);
  };

  return (
    <>
      <Controls
        reset={reset}
        isUndoAvailable={hasHistory}
        handleUndo={handleUndo}
        isRedoAvailable={redoHistory.length > 0}
        handleRedo={handleRedo}
      />

      <Operations
        handleOperation={handleOperation}
        currentValue={currentValue}
      />

      {hasHistory && <OperationsTable history={history} />}
    </>
  );
}

const operations = {
  "/2": (num) => num / 2,
  "-1": (num) => num - 1,
  "+1": (num) => num + 1,
  "*2": (num) => num * 2,
};

// body {
//   font-family: sans-serif;
// }

// .controls {
//   display: flex;
//   gap: 4px;
//   justify-content: center;
// }

// .operations {
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   padding: 16px;
//   border-top: 1px solid;
//   border-bottom: 1px solid;
//   gap: 16px;
//   margin: 16px;
// }

// .operations .current-value {
//   font-size: 24px;
//   font-weight: 500;
// }

// .table {
//   margin: 0 auto;
// }
