import React from "react";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Avatar } from "primereact/avatar";
import { useCurrentPage } from "@/hooks/useCurrentPage";
import { Pages } from "@/types/ui";
import {
  Home,
  Tag,
  Building,
  Package,
  Search,
  Settings,
  X,
  Users
} from "lucide-react";
import "@/components/layout/Drawer.css";

interface DrawerProps {
  visible: boolean;
  onHide: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ visible, onHide }) => {
  const { currentPage, navigateToPage } = useCurrentPage();

  const navigationItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <Home size={20} />,
      className: currentPage === Pages.DASHBOARD ? "active" : "",
      command: () => {
        navigateToPage(Pages.DASHBOARD);
        onHide();
      }
    },
    {
      label: "Assets",
      icon: <Package size={20} />,
      className: currentPage.startsWith("/assets") ? "active" : "",
      items: [
        {
          label: "Assets Catalogue",
          icon: <Search size={16} />,
          className: currentPage === Pages.ASSETS ? "active" : "",
          command: () => {
            navigateToPage(Pages.ASSETS);
            onHide();
          }
        }
      ]
    },
    {
      label: "Master Data",
      icon: <Tag size={20} />,
      className: currentPage.startsWith("/master") ? "active" : "",
      items: [
        {
          label: "Locations",
          icon: <Building size={16} />,
          className: currentPage === Pages.ASSET_LOCATIONS ? "active" : "",
          command: () => {
            navigateToPage(Pages.ASSET_LOCATIONS);
            onHide();
          }
        },
        {
          label: "Categories",
          icon: <Tag size={16} />,
          className: currentPage === Pages.ASSET_CATEGORIES ? "active" : "",
          command: () => {
            navigateToPage(Pages.ASSET_CATEGORIES);
            onHide();
          }
        },
        {
          label: "Brands",
          icon: <Package size={16} />,
          className: currentPage === Pages.ASSET_BRANDS ? "active" : "",
          command: () => {
            navigateToPage(Pages.ASSET_BRANDS);
            onHide();
          }
        },
        {
          label: "Models",
          icon: <Package size={16} />,
          className: currentPage === Pages.ASSET_MODELS ? "active" : "",
          command: () => {
            navigateToPage(Pages.ASSET_MODELS);
            onHide();
          }
        }
      ]
    },
    {
      label: "Administration",
      icon: <Settings size={20} />,
      className: currentPage.startsWith("/admin") ? "active" : "",
      items: [
        {
          label: "Users",
          icon: <Users size={16} />,
          className: currentPage === Pages.USERS ? "active" : "",
          command: () => {
            navigateToPage(Pages.USERS);
            onHide();
          }
        },
        {
          label: "Settings",
          icon: <Settings size={16} />,
          className: currentPage === Pages.SETTINGS ? "active" : "",
          command: () => {
            navigateToPage(Pages.SETTINGS);
            onHide();
          }
        }
      ]
    }
  ];

  const userInfo = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Asset Manager"
  };

  return (
    <PrimeSidebar
      visible={visible}
      position="left"
      onHide={onHide}
      className="app-drawer"
      showCloseIcon={false}
      modal={true}
      blockScroll={true}
    >
      <div className="drawer-header">
        <div className="logo-container">
          <div className="logo-icon">
            <Building size={32} />
          </div>
          <h1 className="logo-text">AMS</h1>
        </div>
        <Button
          icon={<X size={24} />}
          className="p-button-text p-button-rounded close-btn"
          onClick={onHide}
        />
      </div>

      <nav className="drawer-nav">
        <Menu model={navigationItems} className="drawer-menu" />
      </nav>

      <div className="drawer-footer">
        <div className="user-info">
          <Avatar
            label={userInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            size="normal"
            shape="circle"
            className="user-avatar"
          />
          <div className="user-details">
            <div className="user-name">{userInfo.name}</div>
            <div className="user-role">{userInfo.role}</div>
          </div>
        </div>
      </div>
    </PrimeSidebar>
  );
};
