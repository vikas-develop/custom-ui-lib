import React, { useState, useRef, useEffect } from 'react';

export const Popover = ({
  trigger,
  content,
  position = 'bottom', // 'top', 'bottom', 'left', 'right'
  isOpen: controlledIsOpen,
  onOpenChange,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : isOpen;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        if (!isControlled) {
          setIsOpen(false);
        }
        if (onOpenChange) {
          onOpenChange(false);
        }
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, isControlled, onOpenChange]);

  const handleToggle = () => {
    const newOpen = !open;
    if (!isControlled) {
      setIsOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const getPositionStyle = () => {
    const baseStyle = {
      position: 'absolute',
      zIndex: 1000,
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '12px',
      minWidth: '150px',
      maxWidth: '300px',
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

  return (
    <div style={containerStyle} className={className} {...props}>
      <div ref={triggerRef} onClick={handleToggle} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {trigger}
      </div>
      {open && (
        <div ref={popoverRef} style={getPositionStyle()}>
          {content}
        </div>
      )}
    </div>
  );
};

