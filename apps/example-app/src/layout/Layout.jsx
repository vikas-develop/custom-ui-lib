import React from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children, selectedComponent, onComponentSelect }) => {
  const { themeStyles } = useTheme();

  return (
    <div 
      style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: themeStyles.background,
        color: themeStyles.text,
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <Sidebar selectedComponent={selectedComponent} onComponentSelect={onComponentSelect} />
      <div
        style={{
          flex: 1,
          padding: '40px',
          backgroundColor: themeStyles.background,
          color: themeStyles.text,
          overflowY: 'auto',
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
