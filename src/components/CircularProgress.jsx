import React from 'react';

export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 'medium',
  color = '#007bff',
  strokeWidth = 4,
  showLabel = false,
  variant = 'determinate', // 'determinate' or 'indeterminate'
  className = '',
  ...props
}) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const radius = sizeMap[size];
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const offset = circumference - (percentage / 100) * circumference;

  const containerStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: center * 2,
    height: center * 2,
    ...props.style,
  };

  const svgStyle = {
    transform: 'rotate(-90deg)',
    animation: variant === 'indeterminate' 
      ? 'circular-progress-rotate 1.4s linear infinite' 
      : 'none',
  };

  const circleStyle = {
    fill: 'none',
    stroke: variant === 'indeterminate' ? color : '#e0e0e0',
    strokeWidth,
    strokeLinecap: 'round',
  };

  const progressCircleStyle = {
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeDasharray: circumference,
    strokeDashoffset: variant === 'indeterminate' ? circumference * 0.25 : offset,
    transition: variant === 'determinate' ? 'stroke-dashoffset 0.3s ease' : 'none',
    animation: variant === 'indeterminate' ? 'circular-progress-spin 1.4s linear infinite' : 'none',
    transformOrigin: 'center',
  };

  const labelStyle = {
    position: 'absolute',
    fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px',
    fontWeight: '600',
    color: color,
  };

  const keyframesStyle = `
    @keyframes circular-progress-spin {
      0% {
        stroke-dashoffset: ${circumference * 0.25};
      }
      50% {
        stroke-dashoffset: ${circumference * 0.75};
      }
      100% {
        stroke-dashoffset: ${circumference * 0.25};
      }
    }
    @keyframes circular-progress-rotate {
      from {
        transform: rotate(-90deg);
      }
      to {
        transform: rotate(270deg);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={containerStyle} className={className} {...props}>
        <svg width={center * 2} height={center * 2} style={svgStyle}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            style={circleStyle}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            style={progressCircleStyle}
          />
        </svg>
        {showLabel && variant === 'determinate' && (
          <span style={labelStyle}>{Math.round(percentage)}%</span>
        )}
      </div>
    </>
  );
};
