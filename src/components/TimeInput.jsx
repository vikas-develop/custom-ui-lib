import React, { useState, useRef, useEffect } from 'react';

export const TimeInput = ({
  value,
  onChange,
  label,
  error,
  helperText,
  disabled = false,
  size = 'medium',
  format = '24h', // '24h' or '12h'
  className = '',
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    if (format === '12h') {
      // Convert 24h to 12h format
      const [hours, minutes] = timeString.split(':');
      if (!hours || !minutes) return timeString;
      
      const hour24 = parseInt(hours, 10);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      return `${String(hour12).padStart(2, '0')}:${minutes} ${ampm}`;
    }
    
    return timeString;
  };

  const parseTime = (timeString) => {
    if (!timeString) return null;
    
    if (format === '12h') {
      const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const ampm = match[3].toUpperCase();
        
        if (ampm === 'PM' && hours !== 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        
        return `${String(hours).padStart(2, '0')}:${minutes}`;
      }
    } else {
      const match = timeString.match(/(\d{1,2}):(\d{2})/);
      if (match) {
        const hours = String(parseInt(match[1], 10)).padStart(2, '0');
        const minutes = match[2];
        return `${hours}:${minutes}`;
      }
    }
    
    return null;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      const parsedTime = parseTime(newValue);
      if (parsedTime) {
        onChange(parsedTime, e);
      } else {
        onChange(null, e);
      }
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    const parsedTime = parseTime(inputValue);
    if (parsedTime) {
      setInputValue(format === '12h' ? formatTime(parsedTime) : parsedTime);
    }
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
    width: '100%',
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
    border: `1px solid ${error ? '#dc3545' : isFocused ? '#007bff' : '#ced4da'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#dc3545' : '#6c757d',
    marginTop: '4px',
  };

  const placeholder = format === '12h' ? 'HH:MM AM/PM' : 'HH:MM';

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

