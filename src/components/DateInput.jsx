import React, { useState, useRef, useEffect } from 'react';

export const DateInput = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  error,
  helperText,
  disabled = false,
  size = 'medium',
  format = 'YYYY-MM-DD',
  className = '',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        const formatted = formatDate(date, format);
        setInputValue(formatted);
      }
    } else {
      setInputValue('');
    }
  }, [value, format]);

  const formatDate = (date, formatStr) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return formatStr
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  };

  const parseDate = (dateString) => {
    const parts = dateString.split(/[-\/]/);
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      const date = parseDate(newValue);
      if (date && !isNaN(date.getTime())) {
        onChange(date, e);
      } else {
        onChange(null, e);
      }
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
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
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    ...props.containerStyle,
  };

  const labelStyle = {
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: '500',
    color: error ? '#dc3545' : '#333',
    marginBottom: '4px',
  };

  const inputStyle = {
    width: '100%',
    padding: sizeStyles[size].padding,
    fontSize: sizeStyles[size].fontSize,
    border: `1px solid ${error ? '#dc3545' : isFocused ? '#007bff' : '#ccc'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#dc3545' : '#666',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyle}
        {...props}
      />
      {(helperText || error) && (
        <span style={helperTextStyle}>{error || helperText}</span>
      )}
    </div>
  );
};
