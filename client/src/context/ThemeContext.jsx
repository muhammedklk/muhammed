import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always force light theme — ignore device/browser dark mode preference
  const [theme] = useState('light');

  useEffect(() => {
    // Force light theme on document always
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.removeAttribute('dark');
    document.documentElement.style.colorScheme = 'light';
    localStorage.setItem('portfolio_theme', 'light');
  }, []);

  // toggleTheme kept for API compatibility but does nothing (light is always forced)
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
