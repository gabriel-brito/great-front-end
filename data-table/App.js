import { useState } from "react";
import DataTable from "./DataTable";
import users from "./data/users.json";

// Create a maximum rows select - Done;
// Create the pagination UI - Done;
// Create the pagination functionality.

const options = [5, 10, 20];

function Pagination({ itemsPerPage, handleitemsPerPage, pagination }) {
  return (
    <div className="pagination flex-center">
      <select
        aria-label="Page Size"
        defaultValue={itemsPerPage}
        onChange={handleitemsPerPage}
      >
        {options.map((option) => (
          <option key={`option-${option}`} value={option}>
            Show {option}
          </option>
        ))}
      </select>

      <div className="pagination-wrapper flex-center">
        <button
          onClick={() => {
            pagination.handlePagination("prev");
          }}
          disabled={pagination.page === 1}
        >
          Prev
        </button>

        <p aria-label="Page Number">
          Page {pagination.page} of {pagination.lastPage}
        </p>

        <button
          onClick={() => {
            pagination.handlePagination("next");
          }}
          disabled={pagination.currentPage === pagination.lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const lastPage = Math.ceil(users.length / itemsPerPage);

  const paginationStart = (page - 1) * itemsPerPage;
  const paginationEnd = paginationStart + itemsPerPage;

  const handleitemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
    setPage(0);
  };

  const handlePagination = (operation) => {
    const nextPage = operation === "next" ? page + 1 : page - 1;
    setPage(nextPage);
  };

  const tableData = users.slice(paginationStart, paginationEnd);

  return (
    <div>
      <DataTable users={tableData} />

      <hr />

      <Pagination
        pagination={{ page, lastPage, handlePagination }}
        itemsPerPage={itemsPerPage}
        handleitemsPerPage={handleitemsPerPage}
      />
    </div>
  );
}
