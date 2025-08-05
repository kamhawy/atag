/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, ThemeContextType, ThemeProviderProps } from "@/types/ui";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function setPrimeReactTheme(theme: Theme) {
  // PrimeReact themes work by adding/removing CSS classes to the body
  if (typeof document !== "undefined") {
    const body = document.body;

    // Remove existing theme classes
    body.classList.remove("lara-light-blue", "lara-dark-blue");

    // Add the appropriate theme class
    body.classList.add(theme);

    // Also set data-theme for our custom components (use simplified theme name)
    const simpleTheme = theme === "lara-dark-blue" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", simpleTheme);
  }
}

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
      if (typeof document !== "undefined") {
        setPrimeReactTheme(resolvedTheme);
      }

      return resolvedTheme;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "lara-light-blue" ? "lara-dark-blue" : "lara-light-blue"
    );
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      setPrimeReactTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
