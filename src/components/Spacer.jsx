import React from 'react';

export const Spacer = ({
  size = 'medium', // 'small', 'medium', 'large' or number (px)
  axis = 'vertical', // 'vertical', 'horizontal', 'both'
  className = '',
  ...props
}) => {
  const sizeMap = {
    small: '8px',
    medium: '16px',
    large: '24px',
  };

  const actualSize = typeof size === 'number' ? `${size}px` : sizeMap[size] || sizeMap.medium;

  const getStyle = () => {
    const baseStyle = {
      flexShrink: 0,
      ...props.style,
    };

    switch (axis) {
      case 'horizontal':
        return {
          ...baseStyle,
          width: actualSize,
          height: '1px',
        };
      case 'both':
        return {
          ...baseStyle,
          width: actualSize,
          height: actualSize,
        };
      case 'vertical':
      default:
        return {
          ...baseStyle,
          width: '1px',
          height: actualSize,
        };
    }
  };

  return <div style={getStyle()} className={className} {...props} />;
};

