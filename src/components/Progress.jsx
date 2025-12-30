import React from 'react';

export const Progress = ({
  value = 0,
  max = 100,
  size = 'medium',
  variant = 'default', // 'default', 'success', 'warning', 'error', 'info'
  showLabel = false,
  label,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    small: {
      height: '4px',
      fontSize: '12px',
    },
    medium: {
      height: '8px',
      fontSize: '14px',
    },
    large: {
      height: '12px',
      fontSize: '16px',
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: '#007bff',
    },
    success: {
      backgroundColor: '#28a745',
    },
    warning: {
      backgroundColor: '#ffc107',
    },
    error: {
      backgroundColor: '#dc3545',
    },
    info: {
      backgroundColor: '#17a2b8',
    },
  };

  const containerStyle = {
    width: '100%',
    ...props.style,
  };

  const progressBarStyle = {
    width: '100%',
    height: sizeStyles[size].height,
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
  };

  const progressFillStyle = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: variantStyles[variant].backgroundColor,
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: showLabel ? '8px' : 0,
  };

  const labelStyle = {
    color: '#fff',
    fontSize: sizeStyles[size].fontSize,
    fontWeight: '600',
    whiteSpace: 'nowrap',
  };

  const externalLabelStyle = {
    fontSize: sizeStyles[size].fontSize,
    color: '#333',
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {label && (
        <div style={externalLabelStyle}>
          <span>{label}</span>
          {showLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div style={progressBarStyle}>
        <div style={progressFillStyle}>
          {showLabel && !label && (
            <span style={labelStyle}>{Math.round(percentage)}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

