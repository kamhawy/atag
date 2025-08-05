# Utilities

This directory contains utility functions and helpers for the ATAG application. These utilities provide common functionality used throughout the application.

## Files

- `toastUtils.ts` - Core toast utility functions and types
- `../hooks/useToast.ts` - Custom hook for easy toast access

## Toast Notification System

The toast notification system provides a comprehensive feedback mechanism for user actions throughout the application.

### Core Components

#### `toastUtils.ts`
Contains the core toast utility functions and type definitions for consistent toast messaging across the application.

#### `useToast.ts` (in hooks directory)
Custom React hook that provides easy access to toast functionality with a simplified API.

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

- **Success**: 3000ms (3 seconds)
- **Error**: 5000ms (5 seconds)
- **Info**: 3000ms (3 seconds)
- **Warning**: 4000ms (4 seconds)

### Example Usage Patterns

#### CRUD Operations

```tsx
// Create operations
toast.showCreated('User');
toast.showCreated('Asset', 'Asset has been successfully created');

// Update operations
toast.showUpdated('Profile');
toast.showUpdated('Settings', 'Settings have been saved');

// Delete operations
toast.showDeleted('Record');
toast.showDeleted('Asset', 'Asset has been permanently deleted');

// Save operations
toast.showSaved('Configuration');
toast.showSaved('Preferences', 'Your preferences have been updated');
```

#### Action Results

```tsx
// Success actions
toast.showActionSuccess('Imported', 'Data');
toast.showActionSuccess('Exported', 'Report', 'Report exported successfully');

// Error actions
toast.showActionError('Export', 'File');
toast.showActionError('Import', 'Data', 'Failed to import data');
```

#### Error Handling

```tsx
// Validation errors
toast.showValidationError('Please fill in all required fields');
toast.showValidationError('Email format is invalid');

// Network errors
toast.showNetworkError('Server is currently unavailable');
toast.showNetworkError('Connection timeout. Please try again.');
```

#### Custom Messages

```tsx
// Custom success message
toast.showCustom({
  severity: 'success',
  summary: 'Custom Success',
  detail: 'This is a custom success message',
  life: 6000
});

// Custom info message
toast.showCustom({
  severity: 'info',
  summary: 'Information',
  detail: 'This is an informational message',
  life: 4000
});

// Custom warning message
toast.showCustom({
  severity: 'warn',
  summary: 'Warning',
  detail: 'Please review your input before proceeding',
  life: 5000
});

// Custom error message
toast.showCustom({
  severity: 'error',
  summary: 'Critical Error',
  detail: 'A critical error has occurred. Please contact support.',
  life: 8000
});
```

## Integration with App Component

The toast system is integrated into the main App component:

```tsx
// In App.tsx
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const App: React.FC = () => {
  const toastRef = useRef<Toast>(null);

  return (
    <div className="app-container">
      {/* Pass toastRef to child components */}
      <MyComponent toastRef={toastRef} />
      
      {/* Include Toast component */}
      <Toast ref={toastRef} position="top-right" />
    </div>
  );
};
```

### Toast Configuration

The Toast component can be configured with various options:

```tsx
<Toast 
  ref={toastRef} 
  position="top-right"
  baseZIndex={1000}
  autoZIndex={true}
  key="main-toast"
  className="custom-toast"
  style={{ width: '400px' }}
/>
```

## Best Practices

### Message Guidelines

1. **Use Appropriate Methods**: Use the specific methods for common operations instead of generic ones
2. **Provide Meaningful Details**: Include helpful details in the detail parameter
3. **Consistent Messaging**: Use consistent language and formatting across the app
4. **Error Handling**: Always show appropriate error messages for failed operations
5. **User Feedback**: Show success messages for important user actions

### Performance Considerations

1. **Limit Toast Count**: Avoid showing too many toasts simultaneously
2. **Appropriate Duration**: Use appropriate life times for different message types
3. **Memory Management**: Ensure toasts are properly cleaned up
4. **User Experience**: Don't overwhelm users with too many notifications

### Accessibility

1. **Screen Reader Support**: Ensure toast messages are accessible to screen readers
2. **Keyboard Navigation**: Support keyboard navigation for toast interactions
3. **Color Contrast**: Maintain proper color contrast for all toast types
4. **Focus Management**: Handle focus appropriately when toasts appear

### Error Handling Patterns

```tsx
// Try-catch pattern
try {
  await saveData();
  toast.showSuccess('Data saved successfully');
} catch (error) {
  toast.showError('Failed to save data', error.message);
}

// API response pattern
const response = await apiCall();
if (response.success) {
  toast.showSuccess('Operation completed');
} else {
  toast.showError('Operation failed', response.error);
}

// Validation pattern
if (!isValid) {
  toast.showValidationError('Please correct the errors before proceeding');
  return;
}
```

## Customization

### Custom Toast Styles

You can customize toast appearance using CSS:

```css
/* Custom toast styles */
.p-toast .p-toast-message {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.p-toast .p-toast-message-success {
  background: linear-gradient(135deg, #4caf50, #45a049);
}

.p-toast .p-toast-message-error {
  background: linear-gradient(135deg, #f44336, #d32f2f);
}
```

### Custom Toast Components

For more complex toast requirements, you can create custom toast components:

```tsx
// Custom toast with action buttons
const CustomToast = ({ message, onAction }) => (
  <div className="custom-toast">
    <div className="toast-content">
      <h4>{message.summary}</h4>
      <p>{message.detail}</p>
    </div>
    <div className="toast-actions">
      <button onClick={onAction}>Action</button>
    </div>
  </div>
);
```

## Testing

### Unit Testing

```tsx
// Test toast functionality
import { render, screen, fireEvent } from '@testing-library/react';
import { useToast } from '@/hooks/useToast';

test('shows success toast', () => {
  const TestComponent = () => {
    const toast = useToast(toastRef);
    return (
      <button onClick={() => toast.showSuccess('Test')}>
        Show Toast
      </button>
    );
  };

  render(<TestComponent />);
  fireEvent.click(screen.getByText('Show Toast'));
  
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Integration Testing

```tsx
// Test toast integration with components
test('shows toast on form submission', async () => {
  render(<AssetForm />);
  
  // Fill form and submit
  fireEvent.click(screen.getByText('Save'));
  
  // Check for success toast
  await waitFor(() => {
    expect(screen.getByText('Asset saved successfully')).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Common Issues

1. **Toast Not Showing**: Ensure toastRef is properly passed and Toast component is rendered
2. **Multiple Toasts**: Check for multiple Toast components or conflicting refs
3. **Styling Issues**: Verify CSS is properly loaded and not overridden
4. **Performance**: Monitor for memory leaks with long-running toasts

### Debug Tips

```tsx
// Debug toast system
const toast = useToast(toastRef);

// Add logging
const debugToast = (method, ...args) => {
  console.log(`Toast ${method}:`, args);
  toast[method](...args);
};

// Use debug version
debugToast('showSuccess', 'Test message');
```

---

*This documentation covers the current toast implementation. Additional utilities will be documented here as they are added to the application.*