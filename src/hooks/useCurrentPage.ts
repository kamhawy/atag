import { useState, useEffect } from "react";
import { Pages, PageType } from "@/types/ui";

export const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(Pages.DASHBOARD);

  useEffect(() => {
    const updateCurrentPage = () => {
      const path =
        typeof window !== "undefined" ? window.location.pathname : "";
      const searchParams = new URLSearchParams(window.location.search);
      const mode = searchParams.get("mode");

      // Map paths to page types
      switch (path) {
        case "/":
        case "/dashboard":
          setCurrentPage(Pages.DASHBOARD);
          break;
        case "/master/locations":
          setCurrentPage(Pages.ASSET_LOCATIONS);
          break;
        case "/master/categories":
          setCurrentPage(Pages.ASSET_CATEGORIES);
          break;
        case "/master/brands":
          setCurrentPage(Pages.ASSET_BRANDS);
          break;
        case "/master/models":
          setCurrentPage(Pages.ASSET_MODELS);
          break;
        case "/assets":
          setCurrentPage(Pages.ASSETS);
          break;
        default:
          // Handle dynamic asset routes
          if (path.startsWith("/assets/")) {
            // Check if it's an edit mode via query parameter
            if (mode === "edit") {
              setCurrentPage(Pages.ASSET_DETAIL_EDIT);
            } else {
              // It's a view route
              setCurrentPage(Pages.ASSET_DETAIL_VIEW);
            }
          } else {
            setCurrentPage(Pages.DASHBOARD);
          }
          break;
        case "/admin/users":
          setCurrentPage(Pages.USERS);
          break;
        case "/admin/settings":
          setCurrentPage(Pages.SETTINGS);
          break;
      }
    };

    updateCurrentPage();

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", updateCurrentPage);
      return () => {
        window.removeEventListener("popstate", updateCurrentPage);
      };
    }
    return undefined;
  }, []);

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const path = page === Pages.DASHBOARD ? "/" : page;
      window.history.pushState({}, "", path);
    }
  };

  return {
    currentPage,
    setCurrentPage,
    navigateToPage
  };
};
