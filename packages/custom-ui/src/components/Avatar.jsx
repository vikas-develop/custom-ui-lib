import React from 'react';

export const Avatar = ({
  src,
  alt,
  name,
  size = 'medium', // small, medium, large
  shape = 'circle', // circle, square
  className = '',
  ...props
}) => {
  const sizeMap = {
    small: '32px',
    medium: '48px',
    large: '64px',
  };

  const avatarSize = sizeMap[size] || sizeMap.medium;

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const baseStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: shape === 'circle' ? '50%' : '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '24px' : '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#9e9e9e',
    overflow: 'hidden',
    flexShrink: 0,
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`avatar avatar-${size} avatar-${shape} ${className}`}
        style={baseStyle}
        {...props}
      />
    );
  }

  return (
    <div
      className={`avatar avatar-${size} avatar-${shape} ${className}`}
      style={baseStyle}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
};
