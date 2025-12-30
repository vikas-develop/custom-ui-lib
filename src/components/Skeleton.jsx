import React from 'react';

export const Skeleton = ({
  variant = 'text', // 'text', 'circular', 'rectangular'
  width,
  height,
  animation = 'pulse', // 'pulse', 'wave', 'none'
  className = '',
  ...props
}) => {
  const baseStyle = {
    backgroundColor: '#e0e0e0',
    borderRadius: variant === 'circular' ? '50%' : variant === 'rectangular' ? '4px' : '4px',
    width: width || (variant === 'circular' ? '40px' : variant === 'text' ? '100%' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '1em' : '200px'),
    display: 'inline-block',
    ...props.style,
  };

  const pulseAnimation = `
    @keyframes skeleton-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  const waveAnimation = `
    @keyframes skeleton-wave {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
  `;

  const getAnimationStyle = () => {
    if (animation === 'pulse') {
      return {
        ...baseStyle,
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
      };
    } else if (animation === 'wave') {
      return {
        ...baseStyle,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200px 100%',
        animation: 'skeleton-wave 1.6s linear infinite',
      };
    }
    return baseStyle;
  };

  return (
    <>
      {(animation === 'pulse' || animation === 'wave') && (
        <style>
          {animation === 'pulse' ? pulseAnimation : waveAnimation}
        </style>
      )}
      <div style={getAnimationStyle()} className={className} {...props} />
    </>
  );
};

