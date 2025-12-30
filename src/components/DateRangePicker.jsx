import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from './Calendar.jsx';

export const DateRangePicker = ({
  value,
  onChange,
  placeholder = 'Select date range',
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectingStart, setSelectingStart] = useState(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value && value.start && value.end) {
      setStartDate(new Date(value.start));
      setEndDate(new Date(value.end));
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
    if (selectingStart || !startDate || date < startDate) {
      setStartDate(date);
      setEndDate(null);
      setSelectingStart(false);
    } else {
      setEndDate(date);
      setSelectingStart(true);
      setIsOpen(false);
      if (onChange) {
        onChange({ start: startDate, end: date });
      }
    }
  };

  const getDisplayValue = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else if (startDate) {
      return `${startDate.toLocaleDateString()} - ...`;
    }
    return '';
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
          value={getDisplayValue()}
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
              value={selectingStart ? startDate : endDate}
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
