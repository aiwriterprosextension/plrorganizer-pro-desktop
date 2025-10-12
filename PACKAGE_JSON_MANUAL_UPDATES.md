# Manual package.json Updates Required

Since package.json cannot be automatically modified in Lovable, you'll need to manually add the following sections if you're running the desktop app locally.

## ✅ Dependencies Added (Already Done)

The following dependencies have been automatically installed:
- `@tanstack/react-table@^8.20.0` - Advanced data grid functionality
- `react-window@^1.8.10` - Virtual scrolling for large datasets
- `zustand@^5.0.2` - Lightweight state management
- `@types/react-window@^1.8.8` - TypeScript types for react-window

## ⚠️ Manual Updates Needed (For Local Development Only)

If you're running the Electron desktop app locally, manually add these to your `package.json`:

### 1. Add Main Entry Point

Add this line near the top (after "version"):

```json
"main": "electron/main.js",
```

### 2. Add Electron Scripts

Add these to the "scripts" section:

```json
"electron:dev": "NODE_ENV=development electron electron/main.js",
"electron:build": "npm run build && electron-builder"
```

For Windows, use:
```json
"electron:dev": "set NODE_ENV=development && electron electron/main.js",
"electron:build": "npm run build && electron-builder"
```

### 3. Add Electron Builder Configuration

Add this entire "build" section at the root level:

```json
"build": {
  "appId": "com.plrorganizer.app",
  "productName": "PLR Organizer Pro",
  "directories": {
    "output": "dist-electron"
  },
  "files": [
    "dist/**/*",
    "electron/**/*",
    "node_modules/**/*"
  ],
  "win": {
    "target": ["nsis", "portable"],
    "icon": "public/icon.ico"
  },
  "mac": {
    "target": ["dmg", "zip"],
    "icon": "public/icon.icns"
  },
  "linux": {
    "target": ["AppImage", "deb"],
    "icon": "public/icon.png"
  }
}
```

## Running the Desktop App

### Development Mode

1. Terminal 1 - Start web dev server:
   ```bash
   npm run dev
   ```

2. Terminal 2 - Start Electron:
   ```bash
   npm run electron:dev
   ```

### Production Build

```bash
# Build for current platform
npm run electron:build

# The built app will be in dist-electron/
```

## Notes

- The `electron` and `electron-builder` packages are already installed
- These manual updates are **only needed for local Electron development**
- The web version in Lovable works without these changes
- See `DESKTOP_APP_README.md` for full desktop app documentation
