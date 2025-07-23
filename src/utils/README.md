# Toast Utilities

This directory contains utilities for managing toast notifications throughout the FAM application.

## Files

- `toastUtils.ts` - Core toast utility functions and types
- `../hooks/useToast.ts` - Custom hook for easy toast access

## Usage

### Basic Usage

```tsx
import { useToast } from '@/hooks/useToast';
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

type MyComponentProps = {
  toastRef: RefObject<Toast>;
};

export const MyComponent: React.FC<MyComponentProps> = ({ toastRef }) => {
  const toast = useToast(toastRef);

  const handleSuccess = () => {
    toast.showSuccess('Success!', 'Operation completed successfully');
  };

  const handleError = () => {
    toast.showError('Error!', 'Something went wrong');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

### Available Methods

#### Basic Toast Methods

- `showSuccess(summary, detail?, life?)` - Show success toast
- `showError(summary, detail?, life?)` - Show error toast
- `showInfo(summary, detail?, life?)` - Show info toast
- `showWarning(summary, detail?, life?)` - Show warning toast

#### Entity Operation Methods

- `showCreated(entity, detail?)` - Show "Created" success message
- `showUpdated(entity, detail?)` - Show "Updated" success message
- `showDeleted(entity, detail?)` - Show "Deleted" success message
- `showSaved(entity, detail?)` - Show "Saved" success message

#### Action Result Methods

- `showActionSuccess(action, entity, detail?)` - Show action success message
- `showActionError(action, entity, detail?)` - Show action error message

#### Error Type Methods

- `showValidationError(message)` - Show validation error message
- `showNetworkError(detail?)` - Show network error message

#### Custom Method

- `showCustom(message)` - Show custom toast with full control

### Parameters

- `summary` (string) - The main toast title
- `detail` (string, optional) - Additional details for the toast
- `life` (number, optional) - Duration in milliseconds (default varies by type)
- `entity` (string) - The entity name for operation messages
- `action` (string) - The action name for action result messages
- `message` (ToastMessage) - Complete toast message object

### Toast Message Interface

```tsx
interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail?: string;
  life?: number;
}
```

### Default Life Times

- Success: 3000ms
- Error: 5000ms
- Info: 3000ms
- Warning: 4000ms

### Example Usage Patterns

#### CRUD Operations

```tsx
// Create
toast.showCreated('User');

// Update
toast.showUpdated('Profile');

// Delete
toast.showDeleted('Record');

// Save
toast.showSaved('Settings');
```

#### Action Results

```tsx
// Success
toast.showActionSuccess('Imported', 'Data');

// Error
toast.showActionError('Export', 'File');
```

#### Error Handling

```tsx
// Validation
toast.showValidationError('Please fill in all required fields');

// Network
toast.showNetworkError('Server is currently unavailable');
```

#### Custom Messages

```tsx
toast.showCustom({
  severity: 'info',
  summary: 'Custom Message',
  detail: 'This is a custom toast message',
  life: 6000
});
```

## Integration with App Component

The toast system is integrated into the main App component:

```tsx
// In App.tsx
const toastRef = useRef(null);

// Pass toastRef to child components
<MyComponent toastRef={toastRef} />

// Include Toast component
<Toast ref={toastRef} position="top-right" />
```

## Best Practices

1. **Use appropriate methods** - Use the specific methods for common operations instead of generic ones
2. **Provide meaningful details** - Include helpful details in the detail parameter
3. **Consistent messaging** - Use consistent language and formatting across the app
4. **Error handling** - Always show appropriate error messages for failed operations
5. **User feedback** - Show success messages for important user actions
