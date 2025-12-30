import React from 'react';
import { useTheme } from '../context/ThemeContext';

const components = [
  { id: 'all', name: 'All Components' },
  { id: 'button', name: 'Button' },
  { id: 'card', name: 'Card' },
  { id: 'input', name: 'Input' },
  { id: 'modal', name: 'Modal' },
  { id: 'spinner', name: 'Spinner' },
  { id: 'accordion', name: 'Accordion' },
  { id: 'autocomplete', name: 'Autocomplete' },
  { id: 'alert', name: 'Alert' },
  { id: 'avatar', name: 'Avatar' },
  { id: 'badge', name: 'Badge' },
  { id: 'breadcrumbs', name: 'Breadcrumbs' },
];

const Sidebar = ({ selectedComponent, onComponentSelect }) => {
  const { themeStyles, theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        width: '250px',
        backgroundColor: themeStyles.sidebarBg,
        borderRight: `1px solid ${themeStyles.sidebarBorder}`,
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <div style={{ padding: '0 20px 20px 20px', borderBottom: `1px solid ${themeStyles.sidebarBorder}`, marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: themeStyles.sidebarText }}>
            Components
          </h2>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: `1px solid ${themeStyles.sidebarBorder}`,
              borderRadius: '4px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '18px',
              color: themeStyles.sidebarText,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = themeStyles.sidebarHover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      <nav>
        {components.map((component) => (
          <button
            key={component.id}
            onClick={() => onComponentSelect(component.id)}
            style={{
              width: '100%',
              padding: '12px 20px',
              textAlign: 'left',
              border: 'none',
              backgroundColor: selectedComponent === component.id ? themeStyles.sidebarActive : 'transparent',
              color: selectedComponent === component.id ? themeStyles.sidebarActiveText : themeStyles.sidebarText,
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
              borderLeft: selectedComponent === component.id ? '3px solid #0056b3' : '3px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (selectedComponent !== component.id) {
                e.target.style.backgroundColor = themeStyles.sidebarHover;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedComponent !== component.id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {component.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
export { components };
