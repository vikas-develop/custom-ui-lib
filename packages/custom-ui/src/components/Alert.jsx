import React from 'react';

export const Alert = ({
  children,
  variant = 'info', // info, success, warning, error
  title,
  onClose,
  className = '',
  ...props
}) => {
  const variantStyles = {
    info: {
      backgroundColor: '#e3f2fd',
      borderColor: '#2196f3',
      color: '#1976d2',
    },
    success: {
      backgroundColor: '#e8f5e9',
      borderColor: '#4caf50',
      color: '#2e7d32',
    },
    warning: {
      backgroundColor: '#fff3e0',
      borderColor: '#ff9800',
      color: '#f57c00',
    },
    error: {
      backgroundColor: '#ffebee',
      borderColor: '#f44336',
      color: '#c62828',
    },
  };

  const style = variantStyles[variant] || variantStyles.info;

  return (
    <div
      className={`alert alert-${variant} ${className}`}
      style={{
        padding: '12px 16px',
        border: `1px solid ${style.borderColor}`,
        borderRadius: '4px',
        backgroundColor: style.backgroundColor,
        color: style.color,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px',
      }}
      {...props}
    >
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px' }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: '14px' }}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: style.color,
            cursor: 'pointer',
            fontSize: '20px',
            lineHeight: '1',
            padding: '0',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};
