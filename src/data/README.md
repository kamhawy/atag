# Sample Data Management

This directory contains centralized sample data for the FAM application. All sample data has been moved here from individual components to make it easier to manage and eventually replace with API implementations.

## File Structure

- `sampleData.ts` - Contains all sample data and interfaces
- `README.md` - This documentation file

## Data Categories

### Assets

- `sampleAssets` - Full asset data for AssetForm component
- `sampleAssetSummaries` - Simplified asset data for Dashboard
- `sampleAssetSearchData` - Asset data for AssetSearch component

### Locations

- `sampleLocations` - Location data for Locations component

### Asset Categories

- `sampleAssetCategories` - Category data for AssetCategories component

### Administration

- `sampleUsers` - User data for Administration component
- `sampleSystemLogs` - System log data for Administration component
- `sampleSystemSettings` - System settings data for Administration component

### Dashboard

- `dashboardStats` - Statistics for dashboard cards
- `chartData` - Chart data for dashboard visualizations

### Dropdown Options

- `dropdownOptions` - Centralized dropdown options for all components

## Usage

### Importing Data

```tsx
import { 
  sampleAssets, 
  sampleLocations, 
  dropdownOptions 
} from '@/data/sampleData';
```

### Using in Components

```tsx
// Instead of defining data locally
const [assets, setAssets] = useState<Asset[]>(sampleAssets);

// Use centralized dropdown options
const categories = dropdownOptions.categories;
const statuses = dropdownOptions.statuses;
```

## Benefits

1. **Centralized Management** - All sample data in one place
2. **Easy Replacement** - Simple to replace with API calls
3. **Consistency** - Same data across all components
4. **Maintainability** - Update data in one location
5. **Type Safety** - Proper TypeScript interfaces

## Migration to API

When implementing the API, you can:

1. **Replace imports** - Change from `sampleData` to API service calls
2. **Keep structure** - Maintain the same data structure for consistency
3. **Gradual migration** - Replace one component at a time
4. **Fallback support** - Keep sample data as fallback during development

### Example API Migration

```tsx
// Before (using sample data)
import { sampleAssets } from '@/data/sampleData';
const [assets, setAssets] = useState<Asset[]>(sampleAssets);

// After (using API)
import { useAssets } from '@/hooks/useAssets';
const { assets, loading, error } = useAssets();
```

## Data Interfaces

All data follows the interfaces defined in `@/types/models.ts`:

- `Asset` - Full asset information
- `AssetSummary` - Simplified asset data
- `AssetSearch` - Asset data for search functionality
- `Location` - Location information
- `AssetCategory` - Category information
- `User` - User data for administration
- `SystemLog` - System log entries
- `SystemSetting` - System configuration

## Maintenance

### Adding New Sample Data

1. Add the data to `sampleData.ts`
2. Export it with a descriptive name
3. Update this README if needed
4. Import in the relevant component

### Updating Existing Data

1. Modify the data in `sampleData.ts`
2. All components using this data will automatically reflect changes
3. No need to update individual components

### Removing Sample Data

When implementing APIs:

1. Remove the sample data from `sampleData.ts`
2. Update component imports to use API services
3. Remove this README file when no longer needed
