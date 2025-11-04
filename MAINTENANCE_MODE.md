# Maintenance Mode

This application includes a built-in maintenance mode feature that allows you to temporarily disable access to the application while performing updates or maintenance.

## How to Enable Maintenance Mode

### Option 1: Environment Variable (Recommended)

Add the following environment variable to your `.env` file:

```env
VITE_MAINTENANCE_MODE=true
```

### Option 2: Build-time Configuration

Set the environment variable when building:

```bash
VITE_MAINTENANCE_MODE=true npm run build
```

## Configuration Options

### Required Variables

- **`VITE_MAINTENANCE_MODE`**: Set to `"true"` to enable maintenance mode, `"false"` or unset to disable.

### Optional Variables

- **`VITE_MAINTENANCE_MESSAGE`**: Custom message to display on the maintenance page.
  ```env
  VITE_MAINTENANCE_MESSAGE="We're upgrading our servers. Back in 30 minutes!"
  ```

- **`VITE_MAINTENANCE_ETA`**: Estimated time until service is restored.
  ```env
  VITE_MAINTENANCE_ETA="30 minutes"
  ```

- **`VITE_MAINTENANCE_BYPASS_SECRET`**: Secret key to bypass maintenance mode (for admin access).
  ```env
  VITE_MAINTENANCE_BYPASS_SECRET=your-secret-key-here
  ```

## Bypassing Maintenance Mode (Admin Access)

If you've set `VITE_MAINTENANCE_BYPASS_SECRET`, you can access the application during maintenance by adding the bypass parameter to the URL:

```
https://yourapp.com/?bypass=your-secret-key-here
```

The bypass will be stored in sessionStorage and persist during navigation. To clear it, close the browser tab or clear session storage.

## Usage Examples

### Enable Maintenance Mode

1. **Development:**
   ```bash
   # Create/edit .env file
   echo "VITE_MAINTENANCE_MODE=true" >> .env
   
   # Restart dev server
   npm run dev
   ```

2. **Production:**
   ```bash
   # Set environment variable in your deployment platform
   # Or build with the variable:
   VITE_MAINTENANCE_MODE=true npm run build
   ```

### Disable Maintenance Mode

1. **Development:**
   ```bash
   # Remove or set to false in .env
   echo "VITE_MAINTENANCE_MODE=false" >> .env
   # Or delete the line entirely
   
   # Restart dev server
   npm run dev
   ```

2. **Production:**
   - Update the environment variable in your deployment platform
   - Rebuild and redeploy the application

## How It Works

1. The `MaintenanceGuard` component wraps the entire application in `App.jsx`
2. It checks the `VITE_MAINTENANCE_MODE` environment variable at runtime
3. If enabled, it displays the `MaintenancePage` component instead of the router
4. All routes are blocked when maintenance mode is active (unless bypass is used)

## Customization

You can customize the maintenance page by editing:
- `src/app/layout/MaintenancePage.jsx` - The maintenance page UI
- `src/app/guards/MaintenanceGuard.jsx` - The maintenance logic

## Notes

- Maintenance mode is checked at runtime, so you need to rebuild the application for changes to take effect
- The bypass secret is checked from the URL query parameter and stored in sessionStorage
- Environment variables prefixed with `VITE_` are exposed to the client-side code
- For security, use a strong, unique bypass secret and keep it confidential

