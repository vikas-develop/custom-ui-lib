import React from "react";

export const Card = ({ children, title, footer, ...props }) => {
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
    overflow: 'hidden',
    ...props.style,
  };

  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: '600',
    fontSize: '18px',
  };

  const bodyStyle = {
    padding: '16px',
  };

  const footerStyle = {
    padding: '16px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
  };

  return (
    <div style={cardStyle} {...props}>
      {title && <div style={headerStyle}>{title}</div>}
      <div style={bodyStyle}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
};

