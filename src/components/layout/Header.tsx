import React, { useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Search, Bell, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import "@/components/layout/Header.css";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const [globalSearch, setGlobalSearch] = useState("");
  const { theme, toggleTheme } = useTheme();
  // Use safe check for window
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Generate breadcrumbs based on current location
  const generateBreadcrumbs = () => {
    const pathSegments = location.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Home", url: "/" }];

    if (pathSegments.length === 0) {
      return breadcrumbs;
    }

    let currentPath = "";
    pathSegments.forEach((segment: string) => {
      currentPath += `/${segment}`;
      // Convert segment to readable label
      const label = segment
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({
        label,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();
  const home = { icon: "pi pi-home", url: "/" };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Removed console.log for lint
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Button
          className="p-button-text p-button-rounded drawer-toggle-btn"
          onClick={onDrawerToggle}
          tooltip="Toggle Navigation"
        >
          <Menu size={20} />
        </Button>
        <BreadCrumb
          model={breadcrumbItems}
          home={home}
          className="header-breadcrumb"
        />
      </div>

      <div className="header-right">
        <form onSubmit={handleGlobalSearch} className="global-search-form">
          <span className="p-input-icon-left">
            <Search size={16} className="search-icon-0" />
            <InputText
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search assets, locations, categories..."
              className="global-search-input"
            />
          </span>
          <Button
            type="submit"
            className="p-button-outlined p-button-rounded search-btn"
            tooltip="Search"
          >
            <Search size={16} />
          </Button>
        </form>

        <div className="header-actions">
          <Button
            className="p-button-outlined p-button-rounded notification-btn"
            tooltip="Notifications"
            badge="3"
            badgeClassName="notification-badge"
          >
            <Bell size={20} />
          </Button>

          <Button
            className="p-button-outlined p-button-rounded theme-toggle-btn"
            onClick={toggleTheme}
            tooltip={
              theme === "lara-light-blue"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"
            }
          >
            {theme === "lara-light-blue" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
