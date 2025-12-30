import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // default, primary, success, warning, error, info
  size = 'medium', // small, medium, large
  dot = false, // Show a dot instead of text
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: {
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
    primary: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    success: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    warning: {
      backgroundColor: '#ffc107',
      color: '#333',
    },
    error: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    info: {
      backgroundColor: '#17a2b8',
      color: '#fff',
    },
  };

  const sizeStyles = {
    small: {
      padding: dot ? '4px' : '2px 8px',
      fontSize: '10px',
      minWidth: dot ? '8px' : 'auto',
      height: dot ? '8px' : 'auto',
    },
    medium: {
      padding: dot ? '6px' : '4px 10px',
      fontSize: '12px',
      minWidth: dot ? '10px' : 'auto',
      height: dot ? '10px' : 'auto',
    },
    large: {
      padding: dot ? '8px' : '6px 12px',
      fontSize: '14px',
      minWidth: dot ? '12px' : 'auto',
      height: dot ? '12px' : 'auto',
    },
  };

  const style = {
    ...variantStyles[variant],
    ...sizeStyles[size],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dot ? '50%' : '12px',
    fontWeight: '600',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    ...props.style,
  };

  return (
    <span
      className={`badge badge-${variant} badge-${size} ${className}`}
      style={style}
      {...props}
    >
      {dot ? null : children}
    </span>
  );
};
