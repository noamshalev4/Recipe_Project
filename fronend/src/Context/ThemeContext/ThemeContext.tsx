import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Typing the ThemeProvider component props to include 'children' (ReactNode)
interface ThemeProviderProps {
  children: ReactNode;  // Add this line
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add('bg-dark', 'text-light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('bg-dark', 'text-light');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}  {/* Render children passed to ThemeProvider */}
    </ThemeContext.Provider>
  );
};
