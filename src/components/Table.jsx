import React from 'react';
import '../styles/components.css';

export default function Table({ columns, data, onRowClick, className = '' }) {
  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="table-header-cell">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((row, index) => (
            <tr
              key={index}
              className="table-row"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="table-cell">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
