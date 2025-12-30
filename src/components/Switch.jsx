import React from 'react';

export const Switch = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'medium',
  color = '#007bff',
  className = '',
  ...props
}) => {
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked, e);
    }
  };

  const sizeMap = {
    small: {
      width: '36px',
      height: '20px',
      thumbSize: '16px',
    },
    medium: {
      width: '44px',
      height: '24px',
      thumbSize: '20px',
    },
    large: {
      width: '52px',
      height: '28px',
      thumbSize: '24px',
    },
  };

  const dimensions = sizeMap[size];

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    gap: '8px',
    opacity: disabled ? 0.6 : 1,
    ...props.style,
  };

  const switchStyle = {
    position: 'relative',
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: checked ? color : '#ccc',
    borderRadius: dimensions.height,
    transition: 'background-color 0.2s',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const padding = 2; // Padding from track edges
  const thumbSize = parseInt(dimensions.thumbSize);
  const thumbDiameter = thumbSize - (padding * 2);
  const trackWidth = parseInt(dimensions.width);
  
  const thumbStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: checked ? `${trackWidth - thumbSize}px` : `${padding}px`,
    width: `${thumbDiameter}px`,
    height: `${thumbDiameter}px`,
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: 'left 0.2s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  const labelStyle = {
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    color: disabled ? '#999' : '#333',
    userSelect: 'none',
    ...props.labelStyle,
  };

  return (
    <label style={containerStyle} className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={{ display: 'none' }}
        {...props}
      />
      <div style={switchStyle}>
        <div style={thumbStyle} />
      </div>
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
};

