import React from 'react';

export const Chip = ({
  label,
  onDelete,
  variant = 'default',
  size = 'medium',
  disabled = false,
  avatar,
  icon,
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
    secondary: {
      backgroundColor: '#6c757d',
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
    outline: {
      backgroundColor: 'transparent',
      color: '#007bff',
      border: '1px solid #007bff',
    },
  };

  const sizeStyles = {
    small: {
      padding: '4px 8px',
      fontSize: '12px',
      height: '24px',
    },
    medium: {
      padding: '6px 12px',
      fontSize: '14px',
      height: '32px',
    },
    large: {
      padding: '8px 16px',
      fontSize: '16px',
      height: '40px',
    },
  };

  const chipStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '16px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    border: 'none',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...props.style,
  };

  const deleteIconStyle = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    marginLeft: '4px',
    fontSize: '16px',
    lineHeight: '1',
    opacity: 0.7,
    transition: 'opacity 0.2s',
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete(e);
    }
  };

  return (
    <span style={chipStyle} className={className} {...props}>
      {avatar && <span style={{ display: 'flex', alignItems: 'center' }}>{avatar}</span>}
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <span
          style={deleteIconStyle}
          onClick={handleDelete}
          onMouseEnter={(e) => {
            if (!disabled) e.target.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.7';
          }}
        >
          ×
        </span>
      )}
    </span>
  );
};
