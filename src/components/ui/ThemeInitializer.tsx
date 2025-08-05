import React, { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeInitializer: React.FC = () => {
  const { theme } = useTheme();
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    // Find or create the theme link element
    let linkElement = document.getElementById("theme-link") as HTMLLinkElement;

    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.id = "theme-link";
      linkElement.rel = "stylesheet";
      document.head.appendChild(linkElement);
    }

    linkRef.current = linkElement;

    // Load initial theme
    loadTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (linkRef.current) {
      loadTheme(theme);
    }
  }, [theme]);

  const loadTheme = (themeName: string) => {
    if (linkRef.current) {
      const themePath = `primereact/resources/themes/${themeName}/theme.css`;
      linkRef.current.href = themePath;
    }
  };

  // This component doesn't render anything, it just handles theme initialization
  return null;
};
