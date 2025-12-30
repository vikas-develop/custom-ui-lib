import React, { useState } from 'react';

export const Tabs = ({
  items = [],
  defaultActiveTab = 0,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default', // 'default', 'pills', 'underline'
  orientation = 'horizontal', // 'horizontal', 'vertical'
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const isControlled = controlledActiveTab !== undefined;
  const currentActiveTab = isControlled ? controlledActiveTab : activeTab;

  const handleTabClick = (index) => {
    if (!isControlled) {
      setActiveTab(index);
    }
    if (onChange) {
      onChange(index, items[index]);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'row' : 'column',
    width: '100%',
    ...props.style,
  };

  const tabsListStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: variant === 'pills' ? '8px' : '0',
    borderBottom: variant === 'underline' && orientation === 'horizontal' ? '1px solid #e0e0e0' : 'none',
    borderRight: variant === 'underline' && orientation === 'vertical' ? '1px solid #e0e0e0' : 'none',
    marginBottom: orientation === 'horizontal' ? '16px' : '0',
    marginRight: orientation === 'vertical' ? '16px' : '0',
    ...props.tabsStyle,
  };

  const getTabStyle = (index) => {
    const isActive = currentActiveTab === index;
    const baseStyle = {
      padding: '12px 16px',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      fontSize: '16px',
      fontWeight: isActive ? '600' : '400',
      color: isActive ? '#007bff' : '#666',
      transition: 'all 0.2s',
      position: 'relative',
      whiteSpace: 'nowrap',
    };

    if (variant === 'pills') {
      return {
        ...baseStyle,
        backgroundColor: isActive ? '#007bff' : 'transparent',
        color: isActive ? '#fff' : '#666',
        borderRadius: '20px',
        padding: '8px 16px',
      };
    }

    if (variant === 'underline') {
      return {
        ...baseStyle,
        borderBottom: orientation === 'horizontal' && isActive ? '2px solid #007bff' : '2px solid transparent',
        borderRight: orientation === 'vertical' && isActive ? '2px solid #007bff' : '2px solid transparent',
        marginBottom: orientation === 'horizontal' && isActive ? '-1px' : '0',
        marginRight: orientation === 'vertical' && isActive ? '-1px' : '0',
      };
    }

    return baseStyle;
  };

  const contentStyle = {
    flex: 1,
    ...props.contentStyle,
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      <div style={tabsListStyle}>
        {items.map((item, index) => {
          const tabContent = typeof item === 'string' ? item : item.label;
          const tabKey = typeof item === 'string' ? item : item.key || index;
          
          return (
            <button
              key={tabKey}
              style={getTabStyle(index)}
              onClick={() => handleTabClick(index)}
              onMouseEnter={(e) => {
                if (currentActiveTab !== index) {
                  e.target.style.backgroundColor = variant === 'pills' ? '#f0f0f0' : 'rgba(0,123,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentActiveTab !== index) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tabContent}
            </button>
          );
        })}
      </div>
      <div style={contentStyle}>
        {items[currentActiveTab] && (
          typeof items[currentActiveTab] === 'object' && items[currentActiveTab].content
            ? items[currentActiveTab].content
            : null
        )}
      </div>
    </div>
  );
};

