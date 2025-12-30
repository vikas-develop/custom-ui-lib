import React, { useState } from 'react';

export const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  error,
  helperText,
  disabled = false,
  size = 'medium',
  className = '',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        let clampedValue = numValue;
        if (min !== undefined) clampedValue = Math.max(clampedValue, min);
        if (max !== undefined) clampedValue = Math.min(clampedValue, max);
        onChange(clampedValue, e);
      } else if (newValue === '' || newValue === '-') {
        onChange(null, e);
      }
    }
  };

  const handleIncrement = () => {
    if (disabled) return;
    const currentValue = parseFloat(inputValue) || 0;
    const newValue = max !== undefined ? Math.min(currentValue + step, max) : currentValue + step;
    setInputValue(newValue.toString());
    if (onChange) onChange(newValue);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const currentValue = parseFloat(inputValue) || 0;
    const newValue = min !== undefined ? Math.max(currentValue - step, min) : currentValue - step;
    setInputValue(newValue.toString());
    if (onChange) onChange(newValue);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
    ...props.containerStyle,
  };

  const labelStyle = {
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: '500',
    color: error ? '#dc3545' : '#333',
    marginBottom: '4px',
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: size === 'small' ? '6px 40px 6px 12px' : size === 'large' ? '12px 50px 12px 20px' : '8px 45px 8px 16px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    border: `1px solid ${error ? '#dc3545' : '#ced4da'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const buttonStyle = {
    position: 'absolute',
    right: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const incrementButtonStyle = {
    width: size === 'small' ? '20px' : size === 'large' ? '28px' : '24px',
    height: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    border: '1px solid #ced4da',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    borderRadius: '4px 4px 0 0',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  };

  const decrementButtonStyle = {
    ...incrementButtonStyle,
    borderRadius: '0 0 4px 4px',
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#dc3545' : '#6c757d',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
        <div style={buttonStyle}>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && parseFloat(inputValue) >= max)}
            style={incrementButtonStyle}
            onMouseEnter={(e) => {
              if (!disabled && !(max !== undefined && parseFloat(inputValue) >= max)) {
                e.target.style.backgroundColor = '#e9ecef';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = disabled ? '#f5f5f5' : '#fff';
            }}
          >
            ▲
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && parseFloat(inputValue) <= min)}
            style={decrementButtonStyle}
            onMouseEnter={(e) => {
              if (!disabled && !(min !== undefined && parseFloat(inputValue) <= min)) {
                e.target.style.backgroundColor = '#e9ecef';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = disabled ? '#f5f5f5' : '#fff';
            }}
          >
            ▼
          </button>
        </div>
      </div>
      {(helperText || error) && (
        <span style={helperTextStyle}>{error || helperText}</span>
      )}
    </div>
  );
};

