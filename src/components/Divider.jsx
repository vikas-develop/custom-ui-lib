import React from 'react';

export const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'medium',
  text,
  className = '',
  ...props
}) => {
  const spacingMap = {
    none: '0',
    small: '8px',
    medium: '16px',
    large: '24px',
  };

  const variantStyles = {
    solid: {
      borderStyle: 'solid',
    },
    dashed: {
      borderStyle: 'dashed',
    },
    dotted: {
      borderStyle: 'dotted',
    },
  };

  if (orientation === 'vertical') {
    const verticalStyle = {
      display: 'inline-block',
      width: '1px',
      height: '100%',
      minHeight: '20px',
      borderLeft: `1px ${variantStyles[variant].borderStyle} #e0e0e0`,
      margin: `0 ${spacingMap[spacing]}`,
      verticalAlign: 'middle',
      ...props.style,
    };

    return <div style={verticalStyle} className={className} {...props} />;
  }

  const horizontalStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: `${spacingMap[spacing]} 0`,
    ...props.style,
  };

  const lineStyle = {
    flex: text ? 1 : 'none',
    borderTop: `1px ${variantStyles[variant].borderStyle} #e0e0e0`,
    height: '1px',
  };

  const textStyle = {
    padding: '0 16px',
    fontSize: '14px',
    color: '#666',
    whiteSpace: 'nowrap',
    ...props.textStyle,
  };

  return (
    <div style={horizontalStyle} className={className} {...props}>
      {text && <div style={lineStyle} />}
      {text && <span style={textStyle}>{text}</span>}
      {text && <div style={lineStyle} />}
      {!text && <div style={lineStyle} />}
    </div>
  );
};
