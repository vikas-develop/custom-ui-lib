import React, { useState, useEffect } from 'react';

export const RadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  direction = 'row', // 'row' or 'column'
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (optionValue) => {
    if (!disabled) {
      setSelectedValue(optionValue);
      if (onChange) {
        onChange(optionValue);
      }
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: direction,
    gap: '12px',
    flexWrap: 'wrap',
    ...props.style,
  };

  const radioStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    gap: '8px',
  };

  const inputStyle = {
    width: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px',
    height: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    accentColor: '#007bff',
  };

  const labelStyle = {
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    color: disabled ? '#999' : '#333',
    userSelect: 'none',
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {options.map((option) => {
        const optionValue = typeof option === 'string' ? option : option.value;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const optionDisabled = disabled || (typeof option === 'object' && option.disabled);
        const isSelected = selectedValue === optionValue;

        return (
          <label key={optionValue} style={radioStyle}>
            <input
              type="radio"
              name={groupName}
              value={optionValue}
              checked={isSelected}
              onChange={() => handleChange(optionValue)}
              disabled={optionDisabled}
              style={inputStyle}
            />
            {optionLabel && <span style={labelStyle}>{optionLabel}</span>}
          </label>
        );
      })}
    </div>
  );
};

