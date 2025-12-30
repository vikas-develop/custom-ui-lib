import React, { useEffect } from 'react';

export const Drawer = ({
  isOpen,
  onClose,
  position = 'left', // 'left', 'right', 'top', 'bottom'
  children,
  title,
  size = 'medium',
  className = '',
  ...props
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sizeMap = {
    small: position === 'left' || position === 'right' ? '300px' : '200px',
    medium: position === 'left' || position === 'right' ? '400px' : '300px',
    large: position === 'left' || position === 'right' ? '600px' : '400px',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  };

  const getDrawerStyle = () => {
    const baseStyle = {
      position: 'fixed',
      backgroundColor: '#fff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      transition: 'transform 0.3s ease',
      overflow: 'auto',
    };

    switch (position) {
      case 'left':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          bottom: 0,
          width: sizeMap[size],
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        };
      case 'right':
        return {
          ...baseStyle,
          top: 0,
          right: 0,
          bottom: 0,
          width: sizeMap[size],
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        };
      case 'top':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          right: 0,
          height: sizeMap[size],
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height: sizeMap[size],
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        };
      default:
        return baseStyle;
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #e0e0e0',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  };

  const contentStyle = {
    padding: '20px',
  };

  return (
    <>
      <div
        style={overlayStyle}
        onClick={onClose}
      />
      <div style={getDrawerStyle()} className={className} {...props}>
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button
              style={closeButtonStyle}
              onClick={onClose}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#f5f5f5')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              ×
            </button>
          </div>
        )}
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    </>
  );
};
