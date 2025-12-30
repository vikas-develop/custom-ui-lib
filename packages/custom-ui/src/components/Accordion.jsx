import React, { useState } from 'react';

export const Accordion = ({ 
  title, 
  children, 
  defaultOpen = false,
  onToggle,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className={`accordion ${className}`} {...props}>
      <button
        className="accordion-header"
        onClick={handleToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: '12px 16px',
          textAlign: 'left',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#f9f9f9'}
      >
        <span>{title}</span>
        <span
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
            fontSize: '20px',
          }}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          className="accordion-content"
          style={{
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
