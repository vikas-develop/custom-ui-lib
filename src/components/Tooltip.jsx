import React, { useState, useRef, useEffect } from 'react';

export const Tooltip = ({
  children,
  content,
  position = 'top', // 'top', 'bottom', 'left', 'right'
  delay = 0,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState(null);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      setShowTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (showTimeout) {
        clearTimeout(showTimeout);
      }
    };
  }, [showTimeout]);

  const getPositionStyle = () => {
    const baseStyle = {
      position: 'absolute',
      zIndex: 10000,
      backgroundColor: '#333',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.2s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
      case 'left':
        return {
          ...baseStyle,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
      case 'right':
        return {
          ...baseStyle,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
      default:
        return baseStyle;
    }
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    ...props.style,
  };

  const arrowStyle = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  };

  const getArrowStyle = () => {
    const arrowSize = '6px';
    switch (position) {
      case 'top':
        return {
          ...arrowStyle,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `${arrowSize} ${arrowSize} 0 ${arrowSize}`,
          borderColor: '#333 transparent transparent transparent',
        };
      case 'bottom':
        return {
          ...arrowStyle,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `0 ${arrowSize} ${arrowSize} ${arrowSize}`,
          borderColor: 'transparent transparent #333 transparent',
        };
      case 'left':
        return {
          ...arrowStyle,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize} 0 ${arrowSize} ${arrowSize}`,
          borderColor: 'transparent transparent transparent #333',
        };
      case 'right':
        return {
          ...arrowStyle,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize} ${arrowSize} ${arrowSize} 0`,
          borderColor: 'transparent #333 transparent transparent',
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
      {...props}
    >
      {children}
      {!disabled && (
        <div style={getPositionStyle()} ref={tooltipRef}>
          {content}
          <div style={getArrowStyle()} />
        </div>
      )}
    </div>
  );
};

