import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "primereact/button";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <Button
      icon={
        theme === "lara-light-blue" ? <Moon size={16} /> : <Sun size={16} />
      }
      onClick={handleThemeToggle}
      className="p-button-text p-button-rounded"
      tooltip={
        theme === "lara-light-blue"
          ? "Switch to Dark Mode"
          : "Switch to Light Mode"
      }
      tooltipOptions={{ position: "bottom" }}
    />
  );
};
