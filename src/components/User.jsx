import React from 'react';
import { Avatar } from './Avatar.jsx';

export const User = ({
  name,
  description,
  avatar,
  avatarProps = {},
  size = 'medium',
  showAvatar = true,
  className = '',
  ...props
}) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    ...props.style,
  };

  const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const nameStyle = {
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
    lineHeight: '1.2',
  };

  const descriptionStyle = {
    fontSize: size === 'small' ? '12px' : size === 'large' ? '14px' : '13px',
    color: '#666',
    margin: 0,
    lineHeight: '1.2',
  };

  const avatarSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';

  return (
    <div style={containerStyle} className={className} {...props}>
      {showAvatar && (
        <Avatar
          name={name}
          src={avatar}
          size={avatarSize}
          {...avatarProps}
        />
      )}
      <div style={infoStyle}>
        {name && <div style={nameStyle}>{name}</div>}
        {description && <div style={descriptionStyle}>{description}</div>}
      </div>
    </div>
  );
};

