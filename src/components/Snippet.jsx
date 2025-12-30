import React, { useState } from 'react';

export const Snippet = ({
  children,
  copyable = true,
  symbol = '$',
  onCopy,
  className = '',
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;
    
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      if (onCopy) {
        onCopy(children);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '8px 12px',
    fontFamily: 'Monaco, "Courier New", monospace',
    fontSize: '14px',
    ...props.style,
  };

  const symbolStyle = {
    color: '#666',
    userSelect: 'none',
  };

  const textStyle = {
    flex: 1,
    color: '#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const copyButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#007bff',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {symbol && <span style={symbolStyle}>{symbol}</span>}
      <span style={textStyle}>{children}</span>
      {copyable && (
        <button
          style={copyButtonStyle}
          onClick={handleCopy}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#e9ecef')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
};

