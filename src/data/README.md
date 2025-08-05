# Data Management

This directory contains centralized sample data for the ATAG application. All sample data has been organized here to facilitate easy management and eventual replacement with API implementations.

## File Structure

- `sampleData.ts` - Contains all sample data and interfaces
- `README.md` - This documentation file

## Data Categories

### Assets

#### `sampleAssets`

Complete asset data for AssetForm component with all required fields:

- Asset identification (id, name, assetTag, serialNumber)
- Classification (category, model, manufacturer, brand)
- Location and assignment (location, assignedTo)
- Financial information (purchaseDate, purchasePrice, supplier, warrantyExpiry)
- Status and condition (status, condition)
- Maintenance tracking (lastMaintenance, nextMaintenance)
- Metadata (description, lastUpdated)

#### `sampleAssetSummaries`

Simplified asset data for Dashboard and quick views:

- Essential fields only (id, name, category, location, status)
- Optimized for performance in list views
- Used in dashboard cards and summary tables

#### `sampleAssetSearchData`

Extended asset data for search functionality:

- Includes search-specific fields (brand, model, value)
- Date fields formatted for search filters
- Additional metadata for advanced filtering

### Master Data

#### `sampleLocations`

Location data with hierarchical structure:

- Basic information (id, name, building, floor, room)
- Classification (type, capacity, description)
- Status and tracking (status, assetCount, lastUpdated)
- Extended fields (code, parentLocation, address, contact details)
- Active status for lifecycle management

#### `sampleAssetCategories`

Category data with visual properties:

- Core information (id, name, code, description)
- Hierarchy support (parentCategory)
- Visual elements (color, icon)
- Status and tracking (status, assetCount, lastUpdated)

#### `sampleBrands`

Brand information for asset classification:

- Basic details (id, name, code, description)
- Contact information (website, contactEmail, contactPhone)
- Status management (isActive)

#### `sampleModels`

Model specifications for asset categorization:

- Model details (id, name, code, description)
- Relationships (brandId, categoryId)
- Specifications (year, specifications)
- Status tracking (isActive)

### Administration

#### `sampleUsers`

User data for administration:

- Personal information (id, username, email, firstName, lastName, phone)
- Role and permissions (role, permissions, department)
- Status and activity (status, lastLogin, isActive)

#### `sampleSystemLogs`

System log data for auditing:

- Log entry details (id, timestamp, level, message)
- User and action tracking (user, action)
- Support for different log levels (info, warning, error, debug)

#### `sampleSystemSettings`

System configuration data:

- Setting details (id, category, name, value)
- Type information (type, description)
- Management flags (editable)

### Dashboard

#### `dashboardStats`

Statistics for dashboard cards:

- Asset counts by status
- Financial summaries
- Maintenance statistics
- User activity metrics

#### `chartData`

Chart data for dashboard visualizations:

- Asset distribution charts
- Growth trend data
- Status breakdown charts
- Location utilization data

### Dropdown Options

#### `dropdownOptions`

Centralized dropdown options for all components:

- Categories, statuses, locations
- Asset conditions and types
- User roles and permissions
- System settings categories

## Usage Patterns

### Importing Data

```tsx
import { 
  sampleAssets, 
  sampleLocations, 
  dropdownOptions,
  dashboardStats,
  chartData
} from '@/data/sampleData';
```

### Using in Components

```tsx
// Asset management
const [assets, setAssets] = useState<Asset[]>(sampleAssets);

// Master data
const [locations, setLocations] = useState<Location[]>(sampleLocations);

// Dropdown options
const categories = dropdownOptions.categories;
const statuses = dropdownOptions.statuses;

// Dashboard data
const stats = dashboardStats;
const chartData = chartData;
```

### Data Structure Consistency

All data follows the interfaces defined in `@/types/models.ts`:

- `Asset` - Complete asset information
- `AssetSummary` - Simplified asset data
- `AssetSearch` - Asset data for search functionality
- `Location` - Location information with hierarchy
- `Category` - Category information with visual properties
- `Brand` - Brand information
- `Model` - Model specifications
- `User` - User data for administration
- `SystemLog` - System log entries
- `SystemSetting` - System configuration

## Benefits

### Centralized Management

- **Single Source of Truth**: All sample data in one location
- **Easy Maintenance**: Update data in one place
- **Consistency**: Same data across all components
- **Version Control**: Track data changes in Git

### Development Efficiency

- **Rapid Prototyping**: Quick setup for new features
- **Testing**: Consistent test data across components
- **Demo Data**: Ready-to-use demonstration data
- **Offline Development**: Work without API dependencies

### Migration Path

- **API Replacement**: Simple to replace with API calls
- **Gradual Migration**: Replace one component at a time
- **Fallback Support**: Keep sample data during development
- **Type Safety**: Maintain same data structure

## Migration to API

When implementing the API, follow this approach:

### 1. Service Layer Creation

```tsx
// Create API services
// src/services/assetService.ts
export const assetService = {
  getAssets: () => fetch('/api/assets').then(res => res.json()),
  createAsset: (asset: Asset) => fetch('/api/assets', {
    method: 'POST',
    body: JSON.stringify(asset)
  }),
  // ... other methods
};
```

### 2. Hook Implementation

```tsx
// Create custom hooks
// src/hooks/useAssets.ts
export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: assetService.getAssets,
    initialData: sampleAssets // Fallback to sample data
  });
};
```

### 3. Component Updates

```tsx
// Before (using sample data)
import { sampleAssets } from '@/data/sampleData';
const [assets, setAssets] = useState<Asset[]>(sampleAssets);

// After (using API)
import { useAssets } from '@/hooks/useAssets';
const { data: assets, isLoading, error } = useAssets();
```

### 4. Error Handling

```tsx
// Handle API failures gracefully
const { data: assets, isLoading, error } = useAssets();

if (error) {
  // Fallback to sample data or show error message
  return <ErrorComponent error={error} />;
}

if (isLoading) {
  return <LoadingComponent />;
}
```

## Data Validation

### Type Safety

- All data conforms to TypeScript interfaces
- Compile-time validation of data structure
- IntelliSense support for data properties

### Runtime Validation

- Data integrity checks
- Required field validation
- Format validation for dates, emails, etc.

### Sample Data Quality

- Realistic data values
- Proper relationships between entities
- Consistent naming conventions
- Appropriate data volumes for testing

## Maintenance Guidelines

### Adding New Sample Data

1. **Define Interface**: Add type definition in `@/types/models.ts`
2. **Create Data**: Add sample data to `sampleData.ts`
3. **Export Data**: Export with descriptive name
4. **Update Documentation**: Add to this README if needed
5. **Test Usage**: Verify in components

### Updating Existing Data

1. **Modify Data**: Update the data in `sampleData.ts`
2. **Verify Types**: Ensure data matches interfaces
3. **Test Components**: Check all components using the data
4. **Update Documentation**: Reflect changes in this README

### Removing Sample Data

When implementing APIs:

1. **Remove Data**: Delete from `sampleData.ts`
2. **Update Imports**: Change component imports to use API services
3. **Remove Documentation**: Update this README
4. **Clean Up**: Remove this file when no longer needed

## Best Practices

### Data Organization

- Group related data together
- Use consistent naming conventions
- Maintain clear separation of concerns
- Document data relationships

### Performance Considerations

- Keep sample data size reasonable
- Use appropriate data structures
- Consider lazy loading for large datasets
- Optimize for common use cases

### Development Workflow

- Use sample data for development
- Implement API integration gradually
- Maintain data consistency across environments
- Version control data changes

---

*This documentation will be updated as the application evolves and API integration progresses.*
