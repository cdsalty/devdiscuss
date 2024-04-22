'use client';

// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState, useEffect } from 'react';

// 8. Define our types to satisfy TypeScript and pass it to ThemeContext from the first step.
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// 1. Create the context to store the theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Create and export the provider function that will be used to wrap the app
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('');

  // 3. Create a function to handle the theme change (won't be ready for use until we connect the theme to the local storage)
  // eslint-disable-next-line no-unused-vars
  const handleThemeChange = () => {
    // Last step added into the logic to include the theme from the local storage, etc:
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      // 5. Check the current theme so when the user changes it, the opposite theme is applied
      setMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setMode('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // 6. Via useEffect, check and use the user's preferred theme (will comment out for now to prevent infinite loop)
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  // 4. Return the Provider with the mode, setMode;(Whatever is passed to the value prop will be available to all children components that use the useTheme hook)
  //    giving the children acccess to the theme throughout the app
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 7. Create a custom hook/function that will make it easy to access the theme throughout the app
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
