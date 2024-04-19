import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'dim' | 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  // setTheme: (theme: Theme) => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setDimTheme: () => void;
}

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Create a provider component for the theme
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get the theme from local storage (or use 'dim' by default)
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme as Theme) || 'dim';
  });

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setDimTheme = () => setTheme('dim');

  useEffect(() => {
    localStorage.setItem('theme', theme);

    if (theme === 'dim') {
      document.documentElement.style.setProperty('--color-primary-500', '#f089cb');
      document.documentElement.style.setProperty('--color-primary-600', '#E470B9');
      document.documentElement.style.setProperty('--color-primary-700', '#D85EAB');
      document.documentElement.style.setProperty('--color-secondary-500', '#3DA5E9');
      document.documentElement.style.setProperty('--color-off-white', '#CBF5E6');
      document.documentElement.style.setProperty('--color-red', '#FF5252');
      document.documentElement.style.setProperty('--color-dark-1', '#071a33');
      document.documentElement.style.setProperty('--color-dark-2', '#071a33');
      document.documentElement.style.setProperty('--color-dark-3', '#18233B');
      document.documentElement.style.setProperty('--color-dark-4', '#132943');
      document.documentElement.style.setProperty('--color-dark-5', '#31455b');
      document.documentElement.style.setProperty('--color-dark-6', '#18233B');
      document.documentElement.style.setProperty('--color-light-1', '#E7E9EA');
      document.documentElement.style.setProperty('--color-light-2', '#E7E9EA');
      document.documentElement.style.setProperty('--color-light-3', '#97A0AB');
      document.documentElement.style.setProperty('--color-light-4', '#6A6F77');
      document.documentElement.style.setProperty('--color-semitransaperent-1', 'rgba(7, 26, 51, 0.75)');
    } else if (theme === 'dark') {
      document.documentElement.style.setProperty('--color-primary-500', '#f089cb');
      document.documentElement.style.setProperty('--color-primary-600', '#E470B9');
      document.documentElement.style.setProperty('--color-primary-700', '#D85EAB');
      document.documentElement.style.setProperty('--color-secondary-500', '#3DA5E9');
      document.documentElement.style.setProperty('--color-off-white', '#CBF5E6');
      document.documentElement.style.setProperty('--color-red', '#FF5252');
      document.documentElement.style.setProperty('--color-dark-1', '#000000');
      document.documentElement.style.setProperty('--color-dark-2', '#000000');
      document.documentElement.style.setProperty('--color-dark-3', '#181818');
      document.documentElement.style.setProperty('--color-dark-4', '#16181c');
      document.documentElement.style.setProperty('--color-dark-5', '#2f3336');
      document.documentElement.style.setProperty('--color-dark-6', '#111112');
      document.documentElement.style.setProperty('--color-light-1', '#E7E9EA');
      document.documentElement.style.setProperty('--color-light-2', '#E7E9EA');
      document.documentElement.style.setProperty('--color-light-3', '#97A0AB');
      document.documentElement.style.setProperty('--color-light-4', '#6A6F77');
      document.documentElement.style.setProperty('--color-semitransaperent-1', 'rgba(0, 0, 0, 0.75)');
    } else if (theme === 'light') {
      document.documentElement.style.setProperty('--color-primary-500', '#f089cb');
      document.documentElement.style.setProperty('--color-primary-600', '#E470B9');
      document.documentElement.style.setProperty('--color-primary-700', '#D85EAB');
      document.documentElement.style.setProperty('--color-secondary-500', '#3DA5E9');
      document.documentElement.style.setProperty('--color-off-white', '#CBF5E6');
      document.documentElement.style.setProperty('--color-red', '#FF5252');
      document.documentElement.style.setProperty('--color-dark-1', '#FFFFFF');
      document.documentElement.style.setProperty('--color-dark-2', '#FFFFFF');
      document.documentElement.style.setProperty('--color-dark-3', '#e9ebed');
      document.documentElement.style.setProperty('--color-dark-4', '#f4f8fb');
      document.documentElement.style.setProperty('--color-dark-5', '#D4DADD');
      document.documentElement.style.setProperty('--color-dark-6', '#D4DADD');
      document.documentElement.style.setProperty('--color-light-1', '#0f1419');
      document.documentElement.style.setProperty('--color-light-2', '#0f1419');
      document.documentElement.style.setProperty('--color-light-3', '#536471');
      document.documentElement.style.setProperty('--color-light-4', '#6A6F77');
      document.documentElement.style.setProperty('--color-semitransaperent-1', 'rgba(255, 255, 255, 0.75)');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setLightTheme, setDarkTheme, setDimTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a hook to use the theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };