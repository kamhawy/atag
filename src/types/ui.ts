import { ReactNode } from "react";

// Theme Types
export type Theme = "lara-light-blue" | "lara-dark-blue";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

// Navigation Types

export enum Pages {
  DASHBOARD = "/",
  // Master Data
  ASSET_LOCATIONS = "/master/locations",
  ASSET_LOCATION_FORM = "/master/locations/{locationId}",
  ASSET_LOCATION_NEW = "/master/locations/new",
  ASSET_CATEGORIES = "/master/categories",
  ASSET_CATEGORY_FORM = "/master/categories/{categoryId}",
  ASSET_CATEGORY_NEW = "/master/categories/new",
  ASSET_BRANDS = "/master/brands",
  ASSET_BRAND_FORM = "/master/brands/{brandId}",
  ASSET_BRAND_NEW = "/master/brands/new",
  ASSET_MODELS = "/master/models",
  ASSET_MODEL_FORM = "/master/models/{modelId}",
  ASSET_MODEL_NEW = "/master/models/new",
  // Assets
  ASSETS = "/assets",
  ASSET_FORM = "/assets/{assetId}",
  ASSET_NEW = "/assets/new",
  // Admin
  ADMIN = "/admin",
  USERS = "/admin/users",
  USER_FORM = "/admin/users/{userId}",
  USER_NEW = "/admin/users/new",
  SETTINGS = "/admin/settings"
}

export type PageType = Pages;

// Toast/Notification Types
export interface ToastMessage {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail: string;
  life?: number;
}

// Dialog/Modal Types
export interface DialogState {
  visible: boolean;
  isEdit: boolean;
}

// Form State Types
export interface FormState<T> {
  data: T | null;
  isLoading: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
}

// Table/DataGrid Types
export interface TableState {
  globalFilter: string;
  selectedRows: unknown[];
  sortField?: string;
  sortOrder?: number;
  first?: number;
  rows?: number;
}

// Filter Types
export interface FilterState {
  searchTerm: string;
  selectedCategory: string | null;
  selectedStatus: string | null;
  selectedLocation: string | null;
  dateRange: [Date | null, Date | null];
  showFilters: boolean;
}

// Action Button Types
export interface ActionButton {
  icon: ReactNode;
  tooltip: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

// Breadcrumb Types
export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: ReactNode;
}

// Sidebar Navigation Types
export interface SidebarItem {
  id: Pages;
  label: string;
  icon: ReactNode;
  path: string;
}

// Chart Data Types
export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string | string[];
  tension?: number;
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins?: {
    legend?: {
      position: "top" | "bottom" | "left" | "right";
      labels?: {
        usePointStyle?: boolean;
        padding?: number;
      };
    };
  };
  scales?: {
    y?: {
      beginAtZero?: boolean;
      grid?: {
        color?: string;
      };
    };
    x?: {
      grid?: {
        color?: string;
      };
    };
  };
}

// Status Severity Types
export type Severity = "success" | "info" | "warn" | "error" | "secondary";

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  retry?: () => void;
}

// Pagination Types
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

// Search Types
export interface SearchState {
  query: string;
  filters: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
