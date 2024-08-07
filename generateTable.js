import { useState } from "react";
import "./styles.css";

function Table({ rows, columns }) {
  return (
    <table>
      {Array.from({ length: rows }, () => 0).map((_, rowIndex) => (
        <tr key={`${rowIndex}-key`}>
          {Array.from({ length: columns }, () => 0).map((_, columnIndex) => (
            <td
              style={{ border: "1px solid", padding: "8px" }}
              key={`${columnIndex}-index`}
            >
              {columnIndex % 2 === 0
                ? rows * columnIndex + (rowIndex + 1)
                : rows * (columnIndex + 1) - rowIndex}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default function App() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const rows = formData.get("rows");
    const columns = formData.get("columns");

    setRows(Number(rows));
    setColumns(Number(columns));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="rows">Rows</label>{" "}
          <input
            type="number"
            placeholder="4"
            id="rows"
            name="rows"
            min={1}
            defaultValue={rows}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="columns">Columns</label>{" "}
          <input
            name="columns"
            type="number"
            placeholder="5"
            id="columns"
            min={1}
            defaultValue={columns}
          />
        </div>

        <button style={{ marginBottom: "24px" }}>Submit</button>
      </form>

      {Boolean(rows) && Boolean(columns) && (
        <Table rows={rows} columns={columns} />
      )}
    </>
  );
}
