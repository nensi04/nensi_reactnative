import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  resetTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [overrideMode, setOverrideMode] = useState<null | boolean>(null);
  
  const isDarkMode = overrideMode !== null ? overrideMode : systemScheme === 'dark';

  const toggleTheme = () => {
    setOverrideMode(prev => prev === null ? !isDarkMode : !prev);
  };

  const resetTheme = () => {
    setOverrideMode(null);
  };

  const setLightMode = () => {
    setOverrideMode(false);
  };

  const setDarkMode = () => {
    setOverrideMode(true);
  };

  const value: ThemeContextType = {
    isDarkMode,
    toggleTheme,
    resetTheme,
    setLightMode,
    setDarkMode,
    isSystemTheme: overrideMode === null,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
