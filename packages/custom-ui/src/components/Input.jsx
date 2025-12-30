import React from "react";

export const Input = ({ 
  label, 
  error, 
  helperText,
  size = 'medium',
  ...props 
}) => {
  const inputStyle = {
    width: '100%',
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '14px 16px' : '10px 14px',
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    border: error ? '1px solid #dc3545' : '1px solid #ced4da',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '4px',
  };

  const helperTextStyle = {
    color: '#6c757d',
    fontSize: '12px',
    marginTop: '4px',
  };

  return (
    <div style={{ marginBottom: '16px', width: '100%' }}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        style={inputStyle}
        {...props}
      />
      {error && <div style={errorStyle}>{error}</div>}
      {helperText && !error && <div style={helperTextStyle}>{helperText}</div>}
    </div>
  );
};

