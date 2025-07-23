/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, ThemeContextType, ThemeProviderProps } from "@/types/ui";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const PRIMEREACT_LIGHT =
  "primereact/resources/themes/lara-light-blue/theme.css";
const PRIMEREACT_DARK = "primereact/resources/themes/lara-dark-blue/theme.css";

function setPrimeReactTheme(theme: Theme) {
  // Remove any existing theme link
  const id = "prime-theme-link";
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (link) link.remove();
  // Add the correct theme
  link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = theme === "dark" ? PRIMEREACT_DARK : PRIMEREACT_LIGHT;
  document.head.appendChild(link);
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
      return "dark";
    }
    return "light";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("ams-theme", newTheme);
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
      setPrimeReactTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      setPrimeReactTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    // On mount, ensure correct theme is loaded
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
