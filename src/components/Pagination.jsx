import React from 'react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisible = 5,
  className = '',
  ...props
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    ...props.style,
  };

  const buttonStyle = {
    minWidth: '36px',
    height: '36px',
    padding: '8px 12px',
    border: '1px solid #dee2e6',
    backgroundColor: '#fff',
    color: '#007bff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <div style={containerStyle} className={className} {...props}>
      {showFirstLast && (
        <button
          style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = '#fff';
            }
          }}
        >
          ««
        </button>
      )}
      
      {showPrevNext && (
        <button
          style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.target.style.backgroundColor = '#fff';
            }
          }}
        >
          ‹
        </button>
      )}

      {visiblePages[0] > 1 && (
        <>
          <button
            style={buttonStyle}
            onClick={() => handlePageChange(1)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e9ecef')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span style={{ padding: '0 8px' }}>...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          style={page === currentPage ? activeButtonStyle : buttonStyle}
          onClick={() => handlePageChange(page)}
          onMouseEnter={(e) => {
            if (page !== currentPage) {
              e.target.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseLeave={(e) => {
            if (page !== currentPage) {
              e.target.style.backgroundColor = '#fff';
            }
          }}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span style={{ padding: '0 8px' }}>...</span>
          )}
          <button
            style={buttonStyle}
            onClick={() => handlePageChange(totalPages)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e9ecef')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
          >
            {totalPages}
          </button>
        </>
      )}

      {showPrevNext && (
        <button
          style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = '#fff';
            }
          }}
        >
          ›
        </button>
      )}

      {showFirstLast && (
        <button
          style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = '#e9ecef';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.backgroundColor = '#fff';
            }
          }}
        >
          »»
        </button>
      )}
    </div>
  );
};

