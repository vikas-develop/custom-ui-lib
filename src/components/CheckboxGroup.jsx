import React, { useState, useEffect } from 'react';
import { Checkbox } from './Checkbox.jsx';

export const CheckboxGroup = ({
  options = [],
  value = [],
  onChange,
  direction = 'row', // 'row' or 'column'
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState(value);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleChange = (optionValue, checked) => {
    let newValues;
    if (checked) {
      newValues = [...selectedValues, optionValue];
    } else {
      newValues = selectedValues.filter((val) => val !== optionValue);
    }
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues, optionValue, checked);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: direction,
    gap: '12px',
    flexWrap: 'wrap',
    ...props.style,
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {options.map((option) => {
        const optionValue = typeof option === 'string' ? option : option.value;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const optionDisabled = disabled || (typeof option === 'object' && option.disabled);

        return (
          <Checkbox
            key={optionValue}
            checked={selectedValues.includes(optionValue)}
            onChange={(checked) => handleChange(optionValue, checked)}
            label={optionLabel}
            disabled={optionDisabled}
            size={size}
          />
        );
      })}
    </div>
  );
};
