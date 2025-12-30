import React from 'react';

export const Checkbox = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  size = 'medium',
  className = '',
  ...props
}) => {
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked, e);
    }
  };

  const sizeMap = {
    small: '16px',
    medium: '20px',
    large: '24px',
  };

  const checkboxSize = sizeMap[size];

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    gap: '8px',
    ...props.style,
  };

  const checkboxStyle = {
    width: checkboxSize,
    height: checkboxSize,
    cursor: disabled ? 'not-allowed' : 'pointer',
    accentColor: '#007bff',
    ...props.inputStyle,
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
        ref={(el) => {
          if (el && indeterminate) {
            el.indeterminate = true;
          }
        }}
        style={checkboxStyle}
        {...props}
      />
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
};
