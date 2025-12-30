import React from 'react';

export const Navbar = ({
  brand,
  links = [],
  position = 'left', // 'left', 'center', 'right'
  variant = 'default', // 'default', 'dark', 'light'
  className = '',
  ...props
}) => {
  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: variant === 'dark' ? '#212529' : variant === 'light' ? '#f8f9fa' : '#fff',
    borderBottom: variant === 'light' ? '1px solid #dee2e6' : variant === 'default' ? '1px solid #e0e0e0' : 'none',
    boxShadow: variant === 'default' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    ...props.style,
  };

  const brandStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: variant === 'dark' ? '#fff' : '#333',
    textDecoration: 'none',
    marginRight: '32px',
    ...props.brandStyle,
  };

  const linksContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flex: 1,
    justifyContent: position === 'center' ? 'center' : position === 'right' ? 'flex-end' : 'flex-start',
    ...props.linksStyle,
  };

  const linkStyle = {
    color: variant === 'dark' ? '#fff' : '#333',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  };

  return (
    <nav style={navbarStyle} className={className} {...props}>
      {brand && (
        <a href={brand.href || '#'} style={brandStyle} onClick={brand.onClick}>
          {brand.text || brand}
        </a>
      )}
      <div style={linksContainerStyle}>
        {links.map((link, index) => {
          const linkProps = typeof link === 'string' 
            ? { text: link, href: '#' }
            : link;
          
          return (
            <a
              key={index}
              href={linkProps.href || '#'}
              style={linkStyle}
              onClick={linkProps.onClick}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {linkProps.text || linkProps.label || link}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

