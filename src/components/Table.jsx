import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  striped = false,
  bordered = false,
  hoverable = false,
  size = 'medium',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    small: {
      padding: '8px 12px',
      fontSize: '14px',
    },
    medium: {
      padding: '12px 16px',
      fontSize: '16px',
    },
    large: {
      padding: '16px 20px',
      fontSize: '18px',
    },
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    ...props.style,
  };

  const headerCellStyle = {
    ...sizeStyles[size],
    backgroundColor: '#f8f9fa',
    fontWeight: '600',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    color: '#495057',
  };

  const cellStyle = {
    ...sizeStyles[size],
    borderBottom: bordered ? '1px solid #dee2e6' : '1px solid transparent',
  };

  const rowStyle = (index) => ({
    backgroundColor: striped && index % 2 === 1 ? '#f8f9fa' : '#fff',
    transition: hoverable ? 'background-color 0.2s' : 'none',
  });

  const getCellValue = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row, data.indexOf(row));
    }
    return row[column.key];
  };

  return (
    <table style={tableStyle} className={className} {...props}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={column.key || index} style={headerCellStyle}>
              {column.header || column.title || column.key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              style={{
                ...cellStyle,
                textAlign: 'center',
                color: '#999',
                padding: '40px',
              }}
            >
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={rowStyle(rowIndex)}
              onMouseEnter={(e) => {
                if (hoverable) {
                  e.currentTarget.style.backgroundColor = '#e9ecef';
                }
              }}
              onMouseLeave={(e) => {
                if (hoverable) {
                  e.currentTarget.style.backgroundColor = striped && rowIndex % 2 === 1 ? '#f8f9fa' : '#fff';
                }
              }}
            >
              {columns.map((column, colIndex) => (
                <td key={column.key || colIndex} style={cellStyle}>
                  {getCellValue(row, column)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

