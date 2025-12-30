import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from './Calendar.jsx';

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  error,
  helperText,
  disabled = false,
  size = 'medium',
  minDate,
  maxDate,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setInputValue(date.toLocaleDateString());
      }
    } else {
      setInputValue('');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDateSelect = (date) => {
    if (onChange) {
      onChange(date);
    }
    setInputValue(date.toLocaleDateString());
    setIsOpen(false);
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
    position: 'relative',
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

  const inputContainerStyle = {
    position: 'relative',
    width: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: sizeStyles[size].padding,
    paddingRight: '40px',
    fontSize: sizeStyles[size].fontSize,
    border: `1px solid ${error ? '#dc3545' : '#ccc'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const calendarIconStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '18px',
    color: '#666',
    pointerEvents: disabled ? 'none' : 'auto',
  };

  const calendarContainerStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#dc3545' : '#666',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className={className} ref={wrapperRef}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          onClick={() => !disabled && setIsOpen(!isOpen)}
          style={inputStyle}
          {...props}
        />
        <span
          style={calendarIconStyle}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          📅
        </span>
        {isOpen && !disabled && (
          <div style={calendarContainerStyle}>
            <Calendar
              value={value}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        )}
      </div>
      {(helperText || error) && (
        <span style={helperTextStyle}>{error || helperText}</span>
      )}
    </div>
  );
};
