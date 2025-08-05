// Users

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "admin" | "manager" | "user" | "viewer";
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  department: string;
  permissions: string[];
  isActive: boolean;
}

// Asset Management Models

export interface Asset {
  id: string;
  name: string;
  assetTag: string;
  category: string;
  location: string;
  status: "active" | "inactive" | "maintenance" | "retired";
  condition: "excellent" | "good" | "fair" | "poor";
  purchaseDate: Date;
  purchasePrice: number;
  supplier: string;
  warrantyExpiry: Date;
  assignedTo: string;
  description: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
  lastUpdated: string;
}

// Simplified Asset for Dashboard and Search
export interface AssetSummary {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "active" | "maintenance" | "retired" | "lost";
  lastUpdated: string;
}

// Extended Asset for Search with additional fields
export interface AssetSearch extends AssetSummary {
  brand: string;
  model: string;
  purchaseDate: string;
  warrantyExpiry: string;
  value: number;
  assignedTo: string;
}

export interface Location {
  id: string;
  name: string;
  building: string;
  floor: string;
  room: string;
  type: "office" | "conference" | "storage" | "lab" | "other";
  capacity: number;
  description: string;
  status: "active" | "inactive" | "maintenance";
  assetCount: number;
  lastUpdated: string;
  code?: string;
  parentLocation?: string;
  address?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive?: boolean;
}

export interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  parentCategory?: string;
  color: string;
  icon: string;
  status: "active" | "inactive";
  assetCount: number;
  lastUpdated: string;
}

export interface Model {
  id: string;
  name: string;
  code: string;
  description: string;
  brandId: string;
  categoryId: string;
  year: number;
  specifications: string;
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  description: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
}

export interface SystemSetting {
  id: string;
  category: string;
  name: string;
  value: string | boolean | number;
  type: "string" | "boolean" | "number" | "date";
  description: string;
  editable: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  message: string;
  user: string;
  action: string;
}

// Common status types
export type AssetStatus =
  | "active"
  | "inactive"
  | "maintenance"
  | "retired"
  | "lost";
export type LocationStatus = "active" | "inactive" | "maintenance";
export type CategoryStatus = "active" | "inactive";
export type AssetCondition = "excellent" | "good" | "fair" | "poor";
export type LocationType =
  | "office"
  | "conference"
  | "storage"
  | "lab"
  | "other";

// Select option types for dropdowns
export interface SelectOption {
  label: string;
  value: string;
}

// Date range type for filters
export type DateRange = [Date | null, Date | null];
