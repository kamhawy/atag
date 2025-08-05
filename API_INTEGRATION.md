# API Integration Guide

This document provides comprehensive guidance for integrating the ATAG frontend with backend APIs. It covers the expected API structure, data models, authentication, and integration patterns.

## Table of Contents

- [Overview](#overview)
- [API Base Structure](#api-base-structure)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Integration Patterns](#integration-patterns)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview

The ATAG frontend is designed to work with a RESTful API backend. The integration follows modern web development patterns with proper error handling, loading states, and optimistic updates.

### Key Integration Features

- **Type-safe API calls** using TypeScript interfaces
- **TanStack Query** for server state management
- **Comprehensive error handling** with user-friendly messages
- **Loading states** and skeleton screens
- **Optimistic updates** for better UX
- **Caching strategies** for performance
- **Real-time updates** via WebSocket (future)

## API Base Structure

### Base URL Configuration

```typescript
// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_VERSION = 'v1';
const API_TIMEOUT = 30000; // 30 seconds
```

### Request/Response Structure

```typescript
// Standard API Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: PaginationInfo;
}

// Pagination Information
interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Error Response
interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
  timestamp: string;
}
```

## Authentication

### Authentication Flow

The application supports multiple authentication methods:

1. **JWT Token Authentication** (Primary)
2. **Windows Domain Authentication** (Enterprise)
3. **API Key Authentication** (Service-to-service)

### JWT Authentication

```typescript
// Login Request
interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// Login Response
interface LoginResponse {
  success: true;
  data: {
    token: string;
    refreshToken: string;
    user: User;
    expiresAt: string;
  };
}

// Token Refresh
interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  success: true;
  data: {
    token: string;
    refreshToken: string;
    expiresAt: string;
  };
}
```

### Authentication Headers

```typescript
// Request headers
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};
```

### Authentication Service

```typescript
// src/services/authService.ts
export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    return response.json();
  },

  logout: async (): Promise<void> => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
  }
};
```

## Data Models

### Asset Management

```typescript
// Asset Model
interface Asset {
  id: string;
  name: string;
  assetTag: string;
  category: string;
  location: string;
  status: AssetStatus;
  condition: AssetCondition;
  purchaseDate: string;
  purchasePrice: number;
  supplier: string;
  warrantyExpiry: string;
  assignedTo: string;
  description: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  lastMaintenance: string;
  nextMaintenance: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

// Asset Create/Update Request
interface AssetRequest {
  name: string;
  assetTag: string;
  categoryId: string;
  locationId: string;
  status: AssetStatus;
  condition: AssetCondition;
  purchaseDate: string;
  purchasePrice: number;
  supplier: string;
  warrantyExpiry: string;
  assignedTo?: string;
  description?: string;
  serialNumber?: string;
  modelId: string;
  manufacturer: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
}

// Asset Search/Filter Request
interface AssetSearchRequest {
  search?: string;
  categoryId?: string;
  locationId?: string;
  status?: AssetStatus;
  condition?: AssetCondition;
  assignedTo?: string;
  purchaseDateFrom?: string;
  purchaseDateTo?: string;
  warrantyExpiryFrom?: string;
  warrantyExpiryTo?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### Master Data Models

```typescript
// Location Model
interface Location {
  id: string;
  name: string;
  building: string;
  floor: string;
  room: string;
  type: LocationType;
  capacity: number;
  description: string;
  status: LocationStatus;
  assetCount: number;
  lastUpdated: string;
  code?: string;
  parentLocationId?: string;
  address?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category Model
interface Category {
  id: string;
  name: string;
  code: string;
  description: string;
  parentCategoryId?: string;
  color: string;
  icon: string;
  status: CategoryStatus;
  assetCount: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

// Brand Model
interface Brand {
  id: string;
  name: string;
  code: string;
  description: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Model Model
interface Model {
  id: string;
  name: string;
  code: string;
  description: string;
  brandId: string;
  categoryId: string;
  year: number;
  specifications: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### User Management

```typescript
// User Model
interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  department: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// User Create/Update Request
interface UserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  department: string;
  permissions?: string[];
  password?: string; // Only for create
}
```

## Endpoints

### Asset Endpoints

```typescript
// GET /api/assets
// Get all assets with filtering and pagination
interface GetAssetsResponse {
  success: true;
  data: Asset[];
  pagination: PaginationInfo;
}

// GET /api/assets/{id}
// Get asset by ID
interface GetAssetResponse {
  success: true;
  data: Asset;
}

// POST /api/assets
// Create new asset
interface CreateAssetResponse {
  success: true;
  data: Asset;
  message: string;
}

// PUT /api/assets/{id}
// Update asset
interface UpdateAssetResponse {
  success: true;
  data: Asset;
  message: string;
}

// DELETE /api/assets/{id}
// Delete asset
interface DeleteAssetResponse {
  success: true;
  message: string;
}

// POST /api/assets/bulk-delete
// Bulk delete assets
interface BulkDeleteAssetsRequest {
  assetIds: string[];
}

interface BulkDeleteAssetsResponse {
  success: true;
  message: string;
  deletedCount: number;
}

// GET /api/assets/export
// Export assets to Excel/CSV
interface ExportAssetsRequest {
  format: 'excel' | 'csv';
  filters?: AssetSearchRequest;
}

interface ExportAssetsResponse {
  success: true;
  data: {
    downloadUrl: string;
    fileName: string;
  };
}
```

### Master Data Endpoints

```typescript
// Locations
GET    /api/locations              // Get all locations
GET    /api/locations/{id}         // Get location by ID
POST   /api/locations              // Create location
PUT    /api/locations/{id}         // Update location
DELETE /api/locations/{id}         // Delete location

// Categories
GET    /api/categories             // Get all categories
GET    /api/categories/{id}        // Get category by ID
POST   /api/categories             // Create category
PUT    /api/categories/{id}        // Update category
DELETE /api/categories/{id}        // Delete category

// Brands
GET    /api/brands                 // Get all brands
GET    /api/brands/{id}            // Get brand by ID
POST   /api/brands                 // Create brand
PUT    /api/brands/{id}            // Update brand
DELETE /api/brands/{id}            // Delete brand

// Models
GET    /api/models                 // Get all models
GET    /api/models/{id}            // Get model by ID
POST   /api/models                 // Create model
PUT    /api/models/{id}            // Update model
DELETE /api/models/{id}            // Delete model
```

### User Management Endpoints

```typescript
// Users
GET    /api/users                  // Get all users
GET    /api/users/{id}             // Get user by ID
POST   /api/users                  // Create user
PUT    /api/users/{id}             // Update user
DELETE /api/users/{id}             // Delete user
PATCH  /api/users/{id}/status      // Update user status

// Authentication
POST   /api/auth/login             // User login
POST   /api/auth/logout            // User logout
POST   /api/auth/refresh           // Refresh token
GET    /api/auth/me                // Get current user
PUT    /api/auth/change-password   // Change password
POST   /api/auth/forgot-password   // Forgot password
POST   /api/auth/reset-password    // Reset password
```

### Dashboard Endpoints

```typescript
// GET /api/dashboard/stats
// Get dashboard statistics
interface DashboardStatsResponse {
  success: true;
  data: {
    totalAssets: number;
    activeAssets: number;
    maintenanceAssets: number;
    retiredAssets: number;
    totalValue: number;
    recentAssets: AssetSummary[];
    assetDistribution: ChartData;
    maintenanceSchedule: MaintenanceItem[];
  };
}

// GET /api/dashboard/charts
// Get dashboard chart data
interface DashboardChartsResponse {
  success: true;
  data: {
    assetDistribution: ChartData;
    statusBreakdown: ChartData;
    locationUtilization: ChartData;
    growthTrend: ChartData;
  };
}
```

## Error Handling

### HTTP Status Codes

```typescript
// Success Codes
200 OK                    // Request successful
201 Created              // Resource created
204 No Content           // Request successful, no content

// Client Error Codes
400 Bad Request          // Invalid request data
401 Unauthorized         // Authentication required
403 Forbidden            // Insufficient permissions
404 Not Found            // Resource not found
409 Conflict             // Resource conflict
422 Unprocessable Entity // Validation errors

// Server Error Codes
500 Internal Server Error // Server error
502 Bad Gateway          // Gateway error
503 Service Unavailable   // Service unavailable
```

### Error Response Format

```typescript
interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
  timestamp: string;
  path?: string;
  method?: string;
}

// Example error responses
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": ["Name is required"],
    "email": ["Invalid email format"]
  },
  "code": "VALIDATION_ERROR",
  "timestamp": "2024-01-15T10:30:00Z"
}

{
  "success": false,
  "message": "Asset not found",
  "code": "NOT_FOUND",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Handling Service

```typescript
// src/services/errorHandler.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (response: Response): never => {
  if (response.status === 401) {
    // Handle unauthorized - redirect to login
    window.location.href = '/login';
  }
  
  if (response.status === 403) {
    // Handle forbidden - show access denied
    throw new ApiError(403, 'Access denied');
  }
  
  return response.json().then((error: ApiErrorResponse) => {
    throw new ApiError(
      response.status,
      error.message,
      error.errors,
      error.code
    );
  });
};
```

## Integration Patterns

### Service Layer Pattern

```typescript
// src/services/assetService.ts
export const assetService = {
  // Get all assets with filtering
  getAssets: async (params?: AssetSearchRequest): Promise<GetAssetsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/assets?${queryParams}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  },

  // Get asset by ID
  getAsset: async (id: string): Promise<GetAssetResponse> => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  },

  // Create asset
  createAsset: async (asset: AssetRequest): Promise<CreateAssetResponse> => {
    const response = await fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(asset)
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  },

  // Update asset
  updateAsset: async (id: string, asset: AssetRequest): Promise<UpdateAssetResponse> => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(asset)
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  },

  // Delete asset
  deleteAsset: async (id: string): Promise<DeleteAssetResponse> => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  },

  // Bulk delete assets
  bulkDeleteAssets: async (assetIds: string[]): Promise<BulkDeleteAssetsResponse> => {
    const response = await fetch(`${API_BASE_URL}/assets/bulk-delete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ assetIds })
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  },

  // Export assets
  exportAssets: async (params: ExportAssetsRequest): Promise<ExportAssetsResponse> => {
    const response = await fetch(`${API_BASE_URL}/assets/export`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw handleApiError(response);
    }
    
    return response.json();
  }
};
```

### TanStack Query Integration

```typescript
// src/hooks/useAssets.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';

export const useAssets = (params?: AssetSearchRequest) => {
  return useQuery({
    queryKey: ['assets', params],
    queryFn: () => assetService.getAssets(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAsset = (id: string) => {
  return useQuery({
    queryKey: ['assets', id],
    queryFn: () => assetService.getAsset(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: assetService.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, asset }: { id: string; asset: AssetRequest }) =>
      assetService.updateAsset(id, asset),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      queryClient.invalidateQueries({ queryKey: ['assets', id] });
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: assetService.deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
};
```

### Component Integration

```tsx
// src/pages/assets/AssetsCatalogue.tsx
import { useAssets, useDeleteAsset } from '@/hooks/useAssets';
import { useToast } from '@/hooks/useToast';

export const AssetsCatalogue: React.FC = () => {
  const toast = useToast(toastRef);
  const [filters, setFilters] = useState<AssetSearchRequest>({});
  
  const { data, isLoading, error } = useAssets(filters);
  const deleteAssetMutation = useDeleteAsset();
  
  const handleDelete = async (id: string) => {
    try {
      await deleteAssetMutation.mutateAsync(id);
      toast.showSuccess('Asset deleted successfully');
    } catch (error) {
      toast.showError('Failed to delete asset', error.message);
    }
  };
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

## Testing

### API Mocking

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  // Get assets
  rest.get(`${API_BASE_URL}/assets`, (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: sampleAssets.slice((page - 1) * pageSize, page * pageSize),
        pagination: {
          currentPage: page,
          pageSize,
          totalRecords: sampleAssets.length,
          totalPages: Math.ceil(sampleAssets.length / pageSize),
          hasNext: page < Math.ceil(sampleAssets.length / pageSize),
          hasPrevious: page > 1,
        },
      })
    );
  }),

  // Create asset
  rest.post(`${API_BASE_URL}/assets`, async (req, res, ctx) => {
    const asset = await req.json();
    
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: { ...asset, id: 'new-id', createdAt: new Date().toISOString() },
        message: 'Asset created successfully',
      })
    );
  }),
];
```

### Integration Tests

```typescript
// src/tests/integration/assetApi.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AssetsCatalogue } from '@/pages/assets/AssetsCatalogue';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

test('loads and displays assets', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AssetsCatalogue />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
  });
});

test('handles asset deletion', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AssetsCatalogue />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
  });

  const deleteButton = screen.getByTestId('delete-asset-1');
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText('Asset 1')).not.toBeInTheDocument();
  });
});
```

## Deployment

### Environment Configuration

```bash
# Production environment variables
VITE_API_BASE_URL=https://api.atag.com/api
VITE_APP_TITLE=ATAG - Asset Management Solution
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

### CORS Configuration

```typescript
// Backend CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Development
    'https://atag.com',      // Production
    'https://www.atag.com'   // Production with www
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ]
};
```

### Security Headers

```typescript
// Backend security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

---

*This API integration guide will be updated as the backend implementation progresses and new requirements are identified.*
