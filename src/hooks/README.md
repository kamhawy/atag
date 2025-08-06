# Custom Hooks

This directory contains custom React hooks that encapsulate common functionality across the application.

## useAddAsset

A custom hook that encapsulates the AddAsset functionality, including state management, dialog control, and asset creation logic.

### Features

- **State Management**: Manages dialog visibility and selected category
- **Toast Integration**: Provides success/error feedback using the toast system
- **Callback Support**: Optional callback for when assets are created
- **Type Safety**: Full TypeScript support with proper type definitions

### Usage

#### Basic Usage

```tsx
import { useAddAsset } from "@/hooks/useAddAsset";

const MyComponent = () => {
  const {
    showAddAssetDialog,
    selectedCategory,
    openAddAssetDialog,
    handleSaveAsset,
    handleCancelAddAsset
  } = useAddAsset();

  return (
    <div>
      <Button onClick={() => openAddAssetDialog()}>
        Add Asset
      </Button>
      
      <Dialog
        visible={showAddAssetDialog}
        onHide={handleCancelAddAsset}
        header="Add New Asset"
      >
        <AddAssetFormDialog
          onSave={handleSaveAsset}
          onCancel={handleCancelAddAsset}
        />
      </Dialog>
    </div>
  );
};
```

#### With Category Pre-selection

```tsx
const MyComponent = () => {
  const {
    showAddAssetDialog,
    selectedCategory,
    openAddAssetDialog,
    handleSaveAsset,
    handleCancelAddAsset
  } = useAddAsset({
    onAssetCreated: (asset) => {
      // Handle the newly created asset
      console.log("Asset created:", asset);
    }
  });

  const handleAddToCategory = (categoryName: string) => {
    openAddAssetDialog(categoryName);
  };

  return (
    <div>
      <Button onClick={() => handleAddToCategory("Electronics")}>
        Add to Electronics
      </Button>
      
      <Dialog
        visible={showAddAssetDialog}
        onHide={handleCancelAddAsset}
        header={`Add New Asset - ${selectedCategory || 'Category'}`}
      >
        <AddAssetFormDialog
          onSave={handleSaveAsset}
          onCancel={handleCancelAddAsset}
          preSelectedCategory={selectedCategory || ""}
        />
      </Dialog>
    </div>
  );
};
```

#### With Toast Integration

```tsx
const MyComponent = ({ toastRef }) => {
  const {
    showAddAssetDialog,
    selectedCategory,
    openAddAssetDialog,
    handleSaveAsset,
    handleCancelAddAsset
  } = useAddAsset({
    toastRef,
    onAssetCreated: (asset) => {
      // Custom logic after asset creation
      refreshAssetList();
    }
  });

  // ... rest of component
};
```

### API Reference

#### Parameters

- `toastRef` (optional): Reference to the toast component for notifications
- `onAssetCreated` (optional): Callback function called when an asset is successfully created

#### Returns

- `showAddAssetDialog`: Boolean indicating if the dialog should be visible
- `selectedCategory`: String containing the currently selected category (if any)
- `openAddAssetDialog`: Function to open the dialog, optionally with a pre-selected category
- `closeAddAssetDialog`: Function to close the dialog and reset state
- `handleSaveAsset`: Function to handle asset saving
- `handleCancelAddAsset`: Function to handle dialog cancellation

### Integration Examples

#### AssetCatalogue Component

```tsx
// In AssetCatalogue.tsx
const {
  showAddAssetDialog,
  selectedCategory,
  openAddAssetDialog,
  handleSaveAsset,
  handleCancelAddAsset
} = useAddAsset({
  toastRef,
  onAssetCreated: (asset) => {
    setAssets([...assets, asset]);
  }
});
```

#### AssetCategories Component

```tsx
// In AssetCategories.tsx
const {
  showAddAssetDialog,
  selectedCategory,
  openAddAssetDialog,
  handleSaveAsset,
  handleCancelAddAsset
} = useAddAsset({
  toastRef,
  onAssetCreated: (asset) => {
    // Update category asset count or refresh data
    console.log("Asset created:", asset);
  }
});

// Usage in action buttons
<Button onClick={() => openAddAssetDialog(category.name)}>
  Add Asset to Category
</Button>
```

### Benefits

1. **Reusability**: Can be used across multiple components
2. **Consistency**: Ensures consistent behavior for asset creation
3. **Maintainability**: Centralized logic makes updates easier
4. **Type Safety**: Full TypeScript support prevents runtime errors
5. **Separation of Concerns**: UI components focus on presentation, hook handles logic
