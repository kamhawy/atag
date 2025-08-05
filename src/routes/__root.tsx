import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Drawer } from "@/components/layout/Drawer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeInitializer } from "@/components/ui/ThemeInitializer";
import "@/App.css";

const RootComponent = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleDrawerHide = () => {
    setDrawerVisible(false);
  };

  return (
    <ThemeProvider>
      <ThemeInitializer />
      <div className="app-container">
        <Drawer visible={drawerVisible} onHide={handleDrawerHide} />
        <div className="main-content">
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className="page-container">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  component: RootComponent
});
