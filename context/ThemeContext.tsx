import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  theme: string;
  toggleTheme: (newTheme: string) => void;
}

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    getTheme();
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
