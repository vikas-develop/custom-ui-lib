import React from 'react';

export const Code = ({
  children,
  inline = false,
  language = '',
  className = '',
  ...props
}) => {
  if (inline) {
    const inlineStyle = {
      backgroundColor: '#f5f5f5',
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: 'Monaco, "Courier New", monospace',
      fontSize: '0.9em',
      color: '#e83e8c',
      ...props.style,
    };

    return (
      <code style={inlineStyle} className={className} {...props}>
        {children}
      </code>
    );
  }

  const blockStyle = {
    display: 'block',
    backgroundColor: '#f5f5f5',
    padding: '16px',
    borderRadius: '8px',
    fontFamily: 'Monaco, "Courier New", monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    overflowX: 'auto',
    border: '1px solid #e0e0e0',
    color: '#333',
    ...props.style,
  };

  const preStyle = {
    margin: 0,
    padding: 0,
  };

  return (
    <pre style={preStyle}>
      <code style={blockStyle} className={className} data-language={language} {...props}>
        {children}
      </code>
    </pre>
  );
};
