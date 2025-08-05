import React, { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Drawer } from "@/components/layout/Drawer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { Dashboard } from "@/pages/home/Dashboard";
import { AssetsCatalogue } from "@/pages/assets/AssetsCatalogue";
import { AssetDetail } from "@/pages/assets/AssetDetail";
import { AssetLocations } from "@/pages/master/locations/AssetLocations";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { Pages } from "@/types/ui";
import "@/App.css";

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = () => {
  const { currentPage } = useCurrentPage();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const toastRef = useRef<Toast>(null);

  const handleDrawerToggle = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleDrawerHide = () => {
    setDrawerVisible(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      default:
      case Pages.DASHBOARD:
        return <Dashboard toastRef={toastRef} />;
      case Pages.ASSETS:
        return <AssetsCatalogue toastRef={toastRef} />;
      case Pages.ASSET_DETAIL_VIEW:
      case Pages.ASSET_DETAIL_EDIT:
        return <AssetDetail toastRef={toastRef} />;
      case Pages.ASSET_LOCATIONS:
        return <AssetLocations toastRef={toastRef} />;
      case Pages.ADMIN:
        return <div>Admin page</div>;
    }
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <Tooltip />
        <div className="main-content">
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className="page-container">{renderPage()}</main>
        </div>
        <Drawer visible={drawerVisible} onHide={handleDrawerHide} />
        <Toast ref={toastRef} position="top-right" />
      </div>
    </ThemeProvider>
  );
};

export default App;
