/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Theme, ThemeContextType, ThemeProviderProps } from "@/types/ui";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme =
      typeof window !== "undefined" && typeof localStorage !== "undefined"
        ? (localStorage.getItem("ams-theme") as Theme)
        : undefined;
    if (savedTheme) {
      return savedTheme;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "lara-dark-blue";
    }
    return "lara-light-blue";
  });

  const setTheme = (newTheme: Theme | ((prevTheme: Theme) => Theme)) => {
    setThemeState((prevTheme) => {
      const resolvedTheme =
        typeof newTheme === "function" ? newTheme(prevTheme) : newTheme;

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("ams-theme", resolvedTheme);
      }

      return resolvedTheme;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme =
        prevTheme === "lara-light-blue" ? "lara-dark-blue" : "lara-light-blue";
      return newTheme;
    });
  };

  // PrimeReact configuration with proper APIOptions structure
  const primeReactConfig = {
    unstyled: false,
    pt: {},
    theme: {
      name: theme,
      dark: theme === "lara-dark-blue"
    }
  };

  return (
    <PrimeReactProvider value={primeReactConfig}>
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </PrimeReactProvider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
