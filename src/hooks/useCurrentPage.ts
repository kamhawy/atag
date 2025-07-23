import { useState, useEffect } from "react";
import { Pages, PageType } from "@/types/ui";

export const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(Pages.DASHBOARD);

  useEffect(() => {
    const updateCurrentPage = () => {
      const path =
        typeof window !== "undefined" ? window.location.pathname : "";

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
        case "/assets/":
        case "/assets/new":
          setCurrentPage(Pages.ASSET_FORM);
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
