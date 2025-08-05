import {
  Asset,
  AssetSummary,
  AssetSearch as AssetSearchModel,
  Location,
  Category,
  User,
  Model,
  SystemLog,
  SystemSetting,
  Brand
} from "@/types/models";

// Sample Assets Data
export const sampleAssets: Asset[] = [
  {
    id: "AST001",
    name: "Ergonomic Office Chair",
    assetTag: "CHR-001",
    category: "Office Furniture",
    location: "Main Office",
    status: "active",
    condition: "excellent",
    purchaseDate: new Date("2023-06-15"),
    purchasePrice: 450.0,
    supplier: "Office Supplies Co.",
    warrantyExpiry: new Date("2025-06-15"),
    assignedTo: "John Smith",
    description: "High-quality ergonomic office chair with adjustable features",
    serialNumber: "SN-CHR-2023-001",
    model: "ErgoPro 5000",
    manufacturer: "ComfortMax",
    lastMaintenance: new Date("2024-01-10"),
    nextMaintenance: new Date("2024-07-10"),
    lastUpdated: "2024-01-15"
  },
  {
    id: "AST002",
    name: "Dell Latitude Laptop",
    assetTag: "LAP-001",
    category: "IT Equipment",
    location: "IT Department",
    status: "active",
    condition: "good",
    purchaseDate: new Date("2023-08-20"),
    purchasePrice: 1200.0,
    supplier: "Tech Solutions Inc.",
    warrantyExpiry: new Date("2026-08-20"),
    assignedTo: "Sarah Johnson",
    description: "Business laptop with 16GB RAM and 512GB SSD",
    serialNumber: "SN-LAP-2023-001",
    model: "Latitude 5520",
    manufacturer: "Dell",
    lastMaintenance: new Date("2024-01-05"),
    nextMaintenance: new Date("2024-07-05"),
    lastUpdated: "2024-01-14"
  },
  {
    id: "AST003",
    name: "Conference Table",
    assetTag: "TBL-001",
    category: "Office Furniture",
    location: "Conference Room 1",
    status: "active",
    condition: "good",
    purchaseDate: new Date("2023-03-10"),
    purchasePrice: 800.0,
    supplier: "Furniture World",
    warrantyExpiry: new Date("2025-03-10"),
    assignedTo: "Facility Manager",
    description: "Large conference table seating 12 people",
    serialNumber: "SN-TBL-2023-001",
    model: "Conference Pro XL",
    manufacturer: "TableCo",
    lastMaintenance: new Date("2023-12-20"),
    nextMaintenance: new Date("2024-06-20"),
    lastUpdated: "2024-01-13"
  },
  {
    id: "AST004",
    name: "HP Laser Printer",
    assetTag: "PRN-001",
    category: "IT Equipment",
    location: "IT Storage",
    status: "maintenance",
    condition: "fair",
    purchaseDate: new Date("2022-11-05"),
    purchasePrice: 350.0,
    supplier: "Print Solutions",
    warrantyExpiry: new Date("2024-11-05"),
    assignedTo: "IT Department",
    description: "Network laser printer for office use",
    serialNumber: "SN-PRN-2022-001",
    model: "LaserJet Pro M404n",
    manufacturer: "HP",
    lastMaintenance: new Date("2024-01-08"),
    nextMaintenance: new Date("2024-02-08"),
    lastUpdated: "2024-01-12"
  },
  {
    id: "AST005",
    name: "Whiteboard",
    assetTag: "WB-001",
    category: "Office Supplies",
    location: "Training Room",
    status: "active",
    condition: "excellent",
    purchaseDate: new Date("2023-09-15"),
    purchasePrice: 120.0,
    supplier: "Office Supplies Co.",
    warrantyExpiry: new Date("2025-09-15"),
    assignedTo: "Training Department",
    description: "Large magnetic whiteboard for presentations",
    serialNumber: "SN-WB-2023-001",
    model: "Magnetic Pro",
    manufacturer: "BoardCo",
    lastMaintenance: new Date("2023-12-01"),
    nextMaintenance: new Date("2024-06-01"),
    lastUpdated: "2024-01-11"
  }
];

// Sample Asset Summary Data (for Dashboard)
export const sampleAssetSummaries: AssetSummary[] = [
  {
    id: "AST001",
    name: "Office Chair - Ergonomic",
    category: "Furniture",
    location: "Building A - Floor 2",
    status: "active",
    lastUpdated: "2024-01-15"
  },
  {
    id: "AST002",
    name: "Projector - Epson",
    category: "Electronics",
    location: "Conference Room 1",
    status: "maintenance",
    lastUpdated: "2024-01-14"
  },
  {
    id: "AST003",
    name: "Whiteboard - Magnetic",
    category: "Office Equipment",
    location: "Training Room",
    status: "active",
    lastUpdated: "2024-01-13"
  },
  {
    id: "AST004",
    name: "Coffee Machine",
    category: "Appliances",
    location: "Break Room",
    status: "retired",
    lastUpdated: "2024-01-12"
  }
];

// Sample Asset Search Data
export const sampleAssetSearchData: AssetSearchModel[] = [
  {
    id: "AST001",
    name: "Office Chair - Ergonomic",
    category: "Furniture",
    brand: "Herman Miller",
    model: "Aeron",
    location: "Building A - Floor 2",
    status: "active",
    purchaseDate: "2023-01-15",
    warrantyExpiry: "2026-01-15",
    value: 1200,
    assignedTo: "John Smith",
    lastUpdated: "2024-01-15"
  },
  {
    id: "AST002",
    name: "Projector - Epson",
    category: "Electronics",
    brand: "Epson",
    model: "PowerLite 1781W",
    location: "Conference Room 1",
    status: "maintenance",
    purchaseDate: "2022-08-20",
    warrantyExpiry: "2025-08-20",
    value: 800,
    assignedTo: "IT Department",
    lastUpdated: "2024-01-14"
  },
  {
    id: "AST003",
    name: "Whiteboard - Magnetic",
    category: "Office Equipment",
    brand: "Quartet",
    model: "Magnetic Glass",
    location: "Training Room",
    status: "active",
    purchaseDate: "2023-03-10",
    warrantyExpiry: "2026-03-10",
    value: 450,
    assignedTo: "Training Team",
    lastUpdated: "2024-01-13"
  },
  {
    id: "AST004",
    name: "Coffee Machine",
    category: "Appliances",
    brand: "Breville",
    model: "BES870XL",
    location: "Break Room",
    status: "retired",
    purchaseDate: "2020-06-15",
    warrantyExpiry: "2023-06-15",
    value: 600,
    assignedTo: "Facilities",
    lastUpdated: "2024-01-12"
  },
  {
    id: "AST005",
    name: "Laptop - Dell",
    category: "Electronics",
    brand: "Dell",
    model: "Latitude 5520",
    location: "Building B - Floor 1",
    status: "active",
    purchaseDate: "2023-11-05",
    warrantyExpiry: "2026-11-05",
    value: 1500,
    assignedTo: "Sarah Johnson",
    lastUpdated: "2024-01-11"
  }
];

// Sample Locations Data
export const sampleLocations: Location[] = [
  {
    id: "LOC001",
    name: "Main Office",
    building: "Building A",
    floor: "Floor 2",
    room: "Room 201",
    type: "office",
    capacity: 50,
    description: "Main office space for administrative staff",
    status: "active",
    assetCount: 25,
    lastUpdated: "2024-01-15"
  },
  {
    id: "LOC002",
    name: "Conference Room 1",
    building: "Building A",
    floor: "Floor 1",
    room: "Room 101",
    type: "conference",
    capacity: 20,
    description: "Large conference room with presentation equipment",
    status: "active",
    assetCount: 8,
    lastUpdated: "2024-01-14"
  },
  {
    id: "LOC003",
    name: "IT Storage",
    building: "Building B",
    floor: "Basement",
    room: "Room B01",
    type: "storage",
    capacity: 0,
    description: "Storage area for IT equipment and supplies",
    status: "active",
    assetCount: 15,
    lastUpdated: "2024-01-13"
  },
  {
    id: "LOC004",
    name: "Research Lab",
    building: "Building C",
    floor: "Floor 3",
    room: "Room 301",
    type: "lab",
    capacity: 10,
    description: "Research laboratory with specialized equipment",
    status: "maintenance",
    assetCount: 12,
    lastUpdated: "2024-01-12"
  }
];

// Sample Asset Categories Data
export const sampleAssetCategories: Category[] = [
  {
    id: "CAT001",
    name: "Office Furniture",
    code: "OF",
    description: "Furniture items for office use",
    parentCategory: "",
    color: "#3B82F6",
    icon: "chair",
    status: "active",
    assetCount: 45,
    lastUpdated: "2024-01-15"
  },
  {
    id: "CAT002",
    name: "IT Equipment",
    code: "IT",
    description: "Information technology equipment",
    parentCategory: "",
    color: "#10B981",
    icon: "computer",
    status: "active",
    assetCount: 32,
    lastUpdated: "2024-01-14"
  },
  {
    id: "CAT003",
    name: "Office Supplies",
    code: "OS",
    description: "General office supplies and consumables",
    parentCategory: "",
    color: "#F59E0B",
    icon: "package",
    status: "active",
    assetCount: 28,
    lastUpdated: "2024-01-13"
  },
  {
    id: "CAT004",
    name: "Electronics",
    code: "EL",
    description: "Electronic devices and equipment",
    parentCategory: "",
    color: "#EF4444",
    icon: "monitor",
    status: "active",
    assetCount: 19,
    lastUpdated: "2024-01-12"
  },
  {
    id: "CAT005",
    name: "Appliances",
    code: "AP",
    description: "Kitchen and utility appliances",
    parentCategory: "",
    color: "#8B5CF6",
    icon: "settings",
    status: "active",
    assetCount: 12,
    lastUpdated: "2024-01-11"
  }
];

export const sampleBrands: Brand[] = [
  {
    id: "BRD001",
    name: "Herman Miller",
    code: "HM",
    description: "Premium office furniture manufacturer",
    website: "https://www.hermanmiller.com",
    contactEmail: "info@hermanmiller.com",
    contactPhone: "+1-800-646-4400",
    isActive: true
  },
  {
    id: "BRD002",
    name: "Dell Technologies",
    code: "DELL",
    description: "Computer technology company",
    website: "https://www.dell.com",
    contactEmail: "support@dell.com",
    contactPhone: "+1-800-999-3355",
    isActive: true
  },
  {
    id: "BRD003",
    name: "HP Inc.",
    code: "HP",
    description: "Information technology company",
    website: "https://www.hp.com",
    contactEmail: "support@hp.com",
    contactPhone: "+1-800-474-6836",
    isActive: true
  },
  {
    id: "BRD004",
    name: "Epson",
    code: "EPSON",
    description: "Electronics and imaging equipment",
    website: "https://epson.com",
    contactEmail: "support@epson.com",
    contactPhone: "+1-800-463-7766",
    isActive: true
  },
  {
    id: "BRD005",
    name: "Breville",
    code: "BREV",
    description: "Kitchen appliance manufacturer",
    website: "https://www.breville.com",
    contactEmail: "support@breville.com",
    contactPhone: "+1-866-273-8455",
    isActive: true
  }
];

export const sampleModels: Model[] = [
  {
    id: "MOD001",
    name: "Aeron Chair",
    code: "AERON",
    description: "Ergonomic office chair with mesh back",
    brandId: "BRD001",
    categoryId: "CAT001",
    year: 2023,
    specifications: "Adjustable height, lumbar support, breathable mesh",
    isActive: true
  },
  {
    id: "MOD002",
    name: "Latitude 5520",
    code: "LAT5520",
    description: "Business laptop with Intel processor",
    brandId: "BRD002",
    categoryId: "CAT002",
    year: 2023,
    specifications: "Intel i7, 16GB RAM, 512GB SSD, 15.6 display",
    isActive: true
  },
  {
    id: "MOD003",
    name: "LaserJet Pro M404n",
    code: "LJP404N",
    description: "Network laser printer",
    brandId: "BRD003",
    categoryId: "CAT002",
    year: 2022,
    specifications: "40 ppm, duplex printing, network connectivity",
    isActive: true
  },
  {
    id: "MOD004",
    name: "PowerLite 1781W",
    code: "PL1781W",
    description: "WXGA projector for presentations",
    brandId: "BRD004",
    categoryId: "CAT004",
    year: 2022,
    specifications: "3200 lumens, WXGA resolution, wireless connectivity",
    isActive: true
  },
  {
    id: "MOD005",
    name: "BES870XL",
    code: "BES870XL",
    description: "Barista Express espresso machine",
    brandId: "BRD005",
    categoryId: "CAT005",
    year: 2020,
    specifications: "15-bar pump, built-in grinder, steam wand",
    isActive: true
  }
];

// Sample Users Data (for Administration)

export const sampleUsers: User[] = [
  {
    id: "USR001",
    username: "john.doe",
    email: "john.doe@company.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1-555-0101",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 10:30:00",
    department: "IT",
    permissions: ["read", "write", "delete", "admin"],
    isActive: true
  },
  {
    id: "USR002",
    username: "sarah.johnson",
    email: "sarah.johnson@company.com",
    firstName: "Sarah",
    lastName: "Johnson",
    phone: "+1-555-0102",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-15 09:15:00",
    department: "Facilities",
    permissions: ["read", "write"],
    isActive: true
  },
  {
    id: "USR003",
    username: "mike.wilson",
    email: "mike.wilson@company.com",
    firstName: "Mike",
    lastName: "Wilson",
    phone: "+1-555-0103",
    role: "user",
    status: "active",
    lastLogin: "2024-01-14 16:45:00",
    department: "Operations",
    permissions: ["read"],
    isActive: true
  },
  {
    id: "USR004",
    username: "lisa.brown",
    email: "lisa.brown@company.com",
    firstName: "Lisa",
    lastName: "Brown",
    phone: "+1-555-0104",
    role: "viewer",
    status: "inactive",
    lastLogin: "2024-01-10 14:20:00",
    department: "HR",
    permissions: ["read"],
    isActive: false
  }
];

export const sampleSystemLogs: SystemLog[] = [
  {
    id: "LOG001",
    timestamp: "2024-01-15 10:30:00",
    level: "info",
    message: "User john.doe logged in successfully",
    user: "john.doe",
    action: "LOGIN"
  },
  {
    id: "LOG002",
    timestamp: "2024-01-15 10:25:00",
    level: "warning",
    message: "Failed login attempt for user unknown",
    user: "unknown",
    action: "LOGIN_FAILED"
  },
  {
    id: "LOG003",
    timestamp: "2024-01-15 10:20:00",
    level: "info",
    message: "Asset AST001 updated by sarah.johnson",
    user: "sarah.johnson",
    action: "ASSET_UPDATE"
  },
  {
    id: "LOG004",
    timestamp: "2024-01-15 10:15:00",
    level: "error",
    message: "Database connection timeout",
    user: "system",
    action: "SYSTEM_ERROR"
  }
];

export const sampleSystemSettings: SystemSetting[] = [
  {
    id: "SET001",
    category: "Security",
    name: "Session Timeout",
    value: 30,
    type: "number",
    description: "Session timeout in minutes",
    editable: true
  },
  {
    id: "SET002",
    category: "Security",
    name: "Two-Factor Authentication",
    value: true,
    type: "boolean",
    description: "Enable two-factor authentication",
    editable: true
  },
  {
    id: "SET003",
    category: "System",
    name: "Maintenance Mode",
    value: false,
    type: "boolean",
    description: "Enable maintenance mode",
    editable: true
  },
  {
    id: "SET004",
    category: "System",
    name: "Backup Frequency",
    value: "daily",
    type: "string",
    description: "System backup frequency",
    editable: true
  }
];

// Dashboard Statistics
export const dashboardStats = {
  totalAssets: 1247,
  totalLocations: 24,
  maintenanceRequired: 8,
  assetsUnderWarranty: 892
};

// Chart Data
export const chartData = {
  assetDistribution: {
    labels: ["Office Equipment", "Furniture", "Electronics", "Tools", "Other"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6"
        ],
        borderWidth: 0
      }
    ]
  },
  assetTrend: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Assets",
        data: [120, 135, 142, 158, 165, 180],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4
      },
      {
        label: "Active Assets",
        data: [110, 125, 132, 145, 152, 165],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4
      }
    ]
  }
};

// Dropdown Options
export const dropdownOptions = {
  categories: [
    { label: "Office Furniture", value: "Office Furniture" },
    { label: "IT Equipment", value: "IT Equipment" },
    { label: "Office Supplies", value: "Office Supplies" },
    { label: "Electronics", value: "Electronics" },
    { label: "Appliances", value: "Appliances" },
    { label: "Tools", value: "Tools" }
  ],
  locations: [
    { label: "Main Office", value: "Main Office" },
    { label: "IT Department", value: "IT Department" },
    { label: "Conference Room 1", value: "Conference Room 1" },
    { label: "IT Storage", value: "IT Storage" },
    { label: "Training Room", value: "Training Room" },
    { label: "Break Room", value: "Break Room" }
  ],
  statuses: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Retired", value: "retired" }
  ],
  conditions: [
    { label: "Excellent", value: "excellent" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  locationTypes: [
    { label: "Office", value: "office" },
    { label: "Conference Room", value: "conference" },
    { label: "Storage", value: "storage" },
    { label: "Laboratory", value: "lab" },
    { label: "Other", value: "other" }
  ],
  icons: [
    { label: "Chair", value: "chair" },
    { label: "Desk", value: "desk" },
    { label: "Monitor", value: "monitor" },
    { label: "Computer", value: "computer" },
    { label: "Package", value: "package" },
    { label: "Flask", value: "flask" },
    { label: "Settings", value: "settings" },
    { label: "Tag", value: "tag" }
  ],
  roles: [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "User", value: "user" },
    { label: "Viewer", value: "viewer" }
  ],
  departments: [
    { label: "IT", value: "IT" },
    { label: "Facilities", value: "Facilities" },
    { label: "Operations", value: "Operations" },
    { label: "HR", value: "HR" }
  ]
};
