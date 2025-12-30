import React, { useState, useRef, useEffect } from 'react';

export const Slider = ({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
  marks = false,
  className = '',
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue !== undefined ? defaultValue : value !== undefined ? value : min);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const isControlled = value !== undefined;

  const actualValue = isControlled ? value : currentValue;

  useEffect(() => {
    if (isControlled) {
      setCurrentValue(value);
    }
  }, [value, isControlled]);

  const getPercentage = () => {
    return ((actualValue - min) / (max - min)) * 100;
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || disabled) return;
    updateValue(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round((min + (percentage / 100) * (max - min)) / step) * step;
    const clampedValue = Math.max(min, Math.min(max, newValue));

    if (!isControlled) {
      setCurrentValue(clampedValue);
    }
    if (onChange) {
      onChange(clampedValue);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const containerStyle = {
    width: '100%',
    padding: '8px 0',
    ...props.style,
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const sliderTrackStyle = {
    position: 'relative',
    width: '100%',
    height: '6px',
    backgroundColor: '#e0e0e0',
    borderRadius: '3px',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const sliderFillStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${getPercentage()}%`,
    backgroundColor: disabled ? '#ccc' : '#007bff',
    borderRadius: '3px',
    transition: isDragging ? 'none' : 'width 0.2s',
  };

  const sliderThumbStyle = {
    position: 'absolute',
    left: `${getPercentage()}%`,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '18px',
    height: '18px',
    backgroundColor: disabled ? '#ccc' : '#007bff',
    borderRadius: '50%',
    border: '2px solid #fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    cursor: disabled ? 'not-allowed' : 'grab',
    transition: isDragging ? 'none' : 'left 0.2s',
  };

  const marksStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#666',
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {label && (
        <div style={labelStyle}>
          <span>{label}</span>
          {showValue && <span>{actualValue}</span>}
        </div>
      )}
      <div
        ref={sliderRef}
        style={sliderTrackStyle}
        onMouseDown={handleMouseDown}
      >
        <div style={sliderFillStyle} />
        <div style={sliderThumbStyle} />
        {marks && (
          <div style={marksStyle}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    </div>
  );
};

