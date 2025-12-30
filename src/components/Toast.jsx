import React, { useEffect, useState } from 'react';

export const Toast = ({
  message,
  variant = 'info', // 'success', 'error', 'warning', 'info'
  duration = 3000,
  onClose,
  position = 'top-right', // 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Wait for fade out animation
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variantStyles = {
    success: {
      backgroundColor: '#28a745',
      color: '#fff',
      icon: '✓',
    },
    error: {
      backgroundColor: '#dc3545',
      color: '#fff',
      icon: '✕',
    },
    warning: {
      backgroundColor: '#ffc107',
      color: '#333',
      icon: '⚠',
    },
    info: {
      backgroundColor: '#17a2b8',
      color: '#fff',
      icon: 'ℹ',
    },
  };

  const positionStyles = {
    'top-left': { top: '20px', left: '20px' },
    'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: '20px', right: '20px' },
  };

  const toastStyle = {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 9999,
    minWidth: '300px',
    maxWidth: '400px',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
    ...variantStyles[variant],
    ...positionStyles[position],
    ...props.style,
  };

  const iconStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const messageStyle = {
    flex: 1,
    fontSize: '14px',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '0',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    transition: 'opacity 0.2s',
  };

  if (!isVisible && !message) return null;

  return (
    <div style={toastStyle} className={className} {...props}>
      <span style={iconStyle}>{variantStyles[variant].icon}</span>
      <span style={messageStyle}>{message}</span>
      {onClose && (
        <button
          style={closeButtonStyle}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '1')}
          onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
        >
          ×
        </button>
      )}
    </div>
  );
};

