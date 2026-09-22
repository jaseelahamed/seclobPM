import React from "react";
import { useProductContext } from "../context/ProductContext";
import "../pages/Dashboard/dashboard.scss";

const Pagination = () => {
  const { filters, setFilters, total, totalPages } = useProductContext();
  const { page, limit } = filters;

  const startItem = (page - 1) * limit + 1;
  let endItem = page * limit;
  if (endItem > total) endItem = total;

  const rowsPerPageOptions = [6, 10, 12, 24];

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setFilters(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  return (
    <div className="pagination-wrapper container">
      <div>
        {`${startItem} of ${total} items`}
      </div>

      <div className="pagination-numbers">
        {pageNumbers.map(num => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`page-item ${num === page ? 'active' : ''}`}
            style={{ 
              border: 'none', 
              background: num === page ? undefined : 'transparent',
              color: num === page ? '#fff' : '#EDA415'
            }}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="show-rows">
        <span>Show</span>
        <select value={limit} onChange={handleRowsPerPageChange}>
          {rowsPerPageOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt} rows
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
