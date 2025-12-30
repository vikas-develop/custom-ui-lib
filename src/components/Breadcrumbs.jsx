import React from 'react';

export const Breadcrumbs = ({
  items = [],
  separator = '/',
  className = '',
  ...props
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const separatorStyle = {
    margin: '0 8px',
    color: '#6c757d',
    userSelect: 'none',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.2s',
  };

  const activeStyle = {
    color: '#6c757d',
    cursor: 'default',
  };

  return (
    <nav
      className={`breadcrumbs ${className}`}
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '14px',
      }}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = item.active !== false && isLast;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span style={separatorStyle} aria-hidden="true">
                {separator}
              </span>
            )}
            {item.href && !isActive ? (
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick(e);
                  }
                }}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                {item.label}
              </a>
            ) : (
              <span
                style={isActive ? activeStyle : linkStyle}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
