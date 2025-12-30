import React, { useState, useEffect, useRef } from 'react';

export const ScrollShadow = ({
  children,
  showTopShadow = true,
  showBottomShadow = true,
  shadowColor = 'rgba(0, 0, 0, 0.1)',
  className = '',
  ...props
}) => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const containerRef = useRef(null);

  const checkScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowTop(scrollTop > 0);
    setShowBottom(scrollTop < scrollHeight - clientHeight - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // Also check when content changes
    const observer = new MutationObserver(checkScroll);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      observer.disconnect();
    };
  }, [children]);

  // Separate style props for wrapper and container
  const { style: wrapperStyleProp, ...restProps } = props;

  const wrapperStyle = {
    position: 'relative',
    display: 'block',
    overflow: 'hidden', // Prevent wrapper from scrolling
    ...wrapperStyleProp,
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'auto',
    width: '100%',
    // If maxHeight is set on wrapper, inner container should fill it
    height: wrapperStyleProp?.maxHeight ? '100%' : (wrapperStyleProp?.height || 'auto'),
    maxHeight: wrapperStyleProp?.maxHeight || 'none',
  };

  const topShadowStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '20px',
    background: `linear-gradient(to bottom, ${shadowColor}, transparent)`,
    pointerEvents: 'none',
    zIndex: 10,
    opacity: showTop && showTopShadow ? 1 : 0,
    transition: 'opacity 0.2s',
  };

  const bottomShadowStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20px',
    background: `linear-gradient(to top, ${shadowColor}, transparent)`,
    pointerEvents: 'none',
    zIndex: 10,
    opacity: showBottom && showBottomShadow ? 1 : 0,
    transition: 'opacity 0.2s',
  };

  return (
    <div style={wrapperStyle} className={className}>
      <div style={containerStyle} ref={containerRef} {...restProps}>
        {children}
      </div>
      {showTopShadow && <div style={topShadowStyle} />}
      {showBottomShadow && <div style={bottomShadowStyle} />}
    </div>
  );
};
