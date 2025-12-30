import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const themeStyles = {
    light: {
      background: '#ffffff',
      text: '#333333',
      sidebarBg: '#f8f9fa',
      sidebarBorder: '#e0e0e0',
      sidebarText: '#333333',
      sidebarHover: '#e9ecef',
      sidebarActive: '#007bff',
      sidebarActiveText: '#ffffff',
      cardBg: '#ffffff',
      cardBorder: '#e0e0e0',
    },
    dark: {
      background: '#1a1a1a',
      text: '#e0e0e0',
      sidebarBg: '#2d2d2d',
      sidebarBorder: '#404040',
      sidebarText: '#e0e0e0',
      sidebarHover: '#404040',
      sidebarActive: '#007bff',
      sidebarActiveText: '#ffffff',
      cardBg: '#2d2d2d',
      cardBorder: '#404040',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
