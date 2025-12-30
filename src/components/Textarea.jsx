import React, { useState } from 'react';

export const Textarea = ({
  label,
  error,
  helperText,
  size = 'medium',
  rows = 4,
  resize = 'vertical', // 'none', 'both', 'horizontal', 'vertical'
  maxLength,
  showCount = false,
  value: controlledValue,
  onChange,
  className = '',
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      if (onChange) {
        onChange(e);
      }
    }
  };

  const sizeStyles = {
    small: {
      padding: '6px 12px',
      fontSize: '14px',
    },
    medium: {
      padding: '8px 16px',
      fontSize: '16px',
    },
    large: {
      padding: '12px 20px',
      fontSize: '18px',
    },
  };

  const containerStyle = {
    marginBottom: '16px',
    width: '100%',
    ...props.containerStyle,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: '500',
    color: error ? '#dc3545' : '#495057',
  };

  const textareaStyle = {
    width: '100%',
    padding: sizeStyles[size].padding,
    fontSize: sizeStyles[size].fontSize,
    border: `1px solid ${error ? '#dc3545' : isFocused ? '#007bff' : '#ced4da'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: resize,
    lineHeight: '1.5',
    ...props.style,
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '12px',
  };

  const helperTextStyle = {
    color: '#6c757d',
    fontSize: '12px',
  };

  const countStyle = {
    color: maxLength && value.length > maxLength * 0.9 ? '#dc3545' : '#6c757d',
    fontSize: '12px',
    marginLeft: 'auto',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <textarea
        rows={rows}
        value={value}
        onChange={handleChange}
        onFocus={(e) => {
          setIsFocused(true);
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
        maxLength={maxLength}
        style={textareaStyle}
        {...props}
      />
      <div style={footerStyle}>
        {(error || helperText) && (
          <span style={error ? errorStyle : helperTextStyle}>
            {error || helperText}
          </span>
        )}
        {showCount && maxLength && (
          <span style={countStyle}>
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

