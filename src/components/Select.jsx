import React, { useState, useRef, useEffect } from 'react';

export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  helperText,
  disabled = false,
  size = 'medium',
  multiple = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? (value || []) : value);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setSelectedValues(multiple ? (value || []) : value);
  }, [value, multiple]);

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

  const handleSelect = (optionValue) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      if (onChange) {
        onChange(newValues);
      }
    } else {
      setSelectedValues(optionValue);
      setIsOpen(false);
      if (onChange) {
        onChange(optionValue);
      }
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          return val === selectedValues[0];
        });
        return typeof option === 'string' ? option : option?.label || selectedValues[0];
      }
      return `${selectedValues.length} selected`;
    } else {
      if (!selectedValues) return placeholder;
      const option = options.find((opt) => {
        const val = typeof option === 'string' ? opt : opt.value;
        return val === selectedValues;
      });
      return typeof option === 'string' ? option : option?.label || selectedValues;
    }
  };

  const isSelected = (optionValue) => {
    if (multiple) {
      return selectedValues.includes(optionValue);
    }
    return selectedValues === optionValue;
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

  const triggerStyle = {
    width: '100%',
    padding: sizeStyles[size].padding,
    paddingRight: '40px',
    fontSize: sizeStyles[size].fontSize,
    border: `1px solid ${error ? '#dc3545' : '#ccc'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    textAlign: 'left',
    color: selectedValues && (multiple ? selectedValues.length > 0 : true) ? '#333' : '#999',
  };

  const arrowStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
    transition: 'transform 0.2s',
    fontSize: '12px',
    color: '#666',
    pointerEvents: 'none',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxHeight: '300px',
    overflowY: 'auto',
    display: isOpen ? 'block' : 'none',
  };

  const optionStyle = (optionValue, optionDisabled) => ({
    padding: '12px 16px',
    cursor: optionDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: isSelected(optionValue) ? '#e3f2fd' : 'transparent',
    color: optionDisabled ? '#ccc' : isSelected(optionValue) ? '#007bff' : '#333',
    transition: 'background-color 0.2s',
    opacity: optionDisabled ? 0.5 : 1,
  });

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#dc3545' : '#6c757d',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className={className} ref={wrapperRef}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <div
          style={triggerStyle}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {getDisplayValue()}
        </div>
        <span style={arrowStyle}>▼</span>
        <div style={dropdownStyle}>
          {options.length === 0 ? (
            <div style={{ padding: '12px 16px', color: '#999', textAlign: 'center' }}>
              No options available
            </div>
          ) : (
            options.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const optionDisabled = disabled || (typeof option === 'object' && option.disabled);

              return (
                <div
                  key={optionValue}
                  style={optionStyle(optionValue, optionDisabled)}
                  onClick={() => !optionDisabled && handleSelect(optionValue)}
                  onMouseEnter={(e) => {
                    if (!optionDisabled && !isSelected(optionValue)) {
                      e.target.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected(optionValue)) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {multiple && (
                    <span style={{ marginRight: '8px' }}>
                      {isSelected(optionValue) ? '☑' : '☐'}
                    </span>
                  )}
                  {optionLabel}
                </div>
              );
            })
          )}
        </div>
      </div>
      {(helperText || error) && (
        <span style={helperTextStyle}>{error || helperText}</span>
      )}
    </div>
  );
};

