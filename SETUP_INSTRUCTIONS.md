# Setup Instructions for Desktop App

## Required Package.json Script Updates

Since package.json cannot be modified automatically, you need to manually add these scripts:

### 1. Open `package.json` in your code editor

### 2. Add these scripts to the "scripts" section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    
    // ADD THESE NEW SCRIPTS:
    "electron:dev": "NODE_ENV=development electron electron/main.js",
    "electron:start": "electron electron/main.js",
    "electron:build": "npm run build && electron-builder",
    "electron:build:win": "npm run build && electron-builder --win",
    "electron:build:mac": "npm run build && electron-builder --mac",
    "electron:build:linux": "npm run build && electron-builder --linux",
    "electron:build:all": "npm run build && electron-builder -mwl"
  }
}
```

### 3. Save the file

## How to Run

### Development Mode:

Terminal 1 (Web Dev Server):
```bash
npm run dev
```

Terminal 2 (Electron):
```bash
npm run electron:dev
```

### Production Build:

```bash
# Build for your current platform
npm run electron:build

# Or build for specific platforms:
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

## What Gets Built

The desktop app will be created in `dist-electron/` folder:

- **Windows**: `.exe` installer and portable version
- **macOS**: `.dmg` and `.zip` 
- **Linux**: `.AppImage` and `.deb`

## First Time Setup Checklist

- [x] Dependencies installed (electron, electron-builder, jszip, chokidar)
- [x] Electron main.js created
- [x] Electron preload.js created
- [x] PLR Scanner components created
- [x] TypeScript definitions added
- [x] electron-builder.json configured
- [ ] **YOU NEED TO DO:** Add scripts to package.json (see above)

## Testing the Desktop App

1. Start the dev server: `npm run dev`
2. In another terminal: `npm run electron:dev`
3. Click "Scan Computer" button in Dashboard
4. Select folders to scan
5. Review results and import

## Differences from Web Version

| Feature | Web | Desktop |
|---------|-----|---------|
| Upload Files | ✅ Manual | ✅ Manual |
| Scan Folders | ❌ | ✅ Full Access |
| Scan Drives | ❌ | ✅ Full Access |
| ZIP Analysis | ❌ | ✅ Deep Inspection |
| Batch Import | ⚠️ Limited | ✅ Unlimited |
| File Organization | ❌ | ✅ (Phase 5) |

## Troubleshooting

### Script not found error
Make sure you added the scripts to package.json correctly.

### Electron doesn't start
- Check that electron was installed: `npm list electron`
- Try reinstalling: `npm install electron@latest`

### "Module not found" errors
Make sure all dependencies are installed:
```bash
npm install electron electron-builder jszip chokidar
```

### Build fails
- Run `npm run build` first to verify web build works
- Check that electron-builder.json is in root directory
- Ensure you have proper code signing (macOS) if distributing

## Next Steps

Once the desktop app is running:

1. Test folder scanning
2. Test PLR detection accuracy
3. Test import functionality
4. Review DESKTOP_APP_README.md for full documentation
5. Start implementing Phase 3-9 features from the specification

## Support

For issues:
1. Check console logs in Electron DevTools
2. Review electron/main.js logs
3. Test in web version first to isolate Electron-specific issues
