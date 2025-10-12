# PLR Organizer Pro - Desktop Application

This project can run as both a web application and a desktop application with full file system access.

## Desktop Features

The desktop version includes the **PLR File Scanner** tool that can:
- Scan entire folders and drives for PLR content
- Recursively search subfolders
- Analyze ZIP archives for PLR indicators
- Detect PLR confidence scores based on filenames and content
- Organize files by niche automatically
- Import multiple files in batch

## Running the Desktop App

### Development Mode

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the web dev server**:
   ```bash
   npm run dev
   ```

3. **In a new terminal, start Electron**:
   ```bash
   npm run electron:dev
   ```

### Building for Production

Build desktop installers for your platform:

**Windows:**
```bash
npm run electron:build:win
```

**macOS:**
```bash
npm run electron:build:mac
```

**Linux:**
```bash
npm run electron:build:linux
```

**All platforms:**
```bash
npm run electron:build
```

Installers will be created in the `dist-electron` folder.

## Package.json Scripts

Add these scripts to your `package.json`:

```json
"scripts": {
  "electron:dev": "electron electron/main.js",
  "electron:build": "npm run build && electron-builder",
  "electron:build:win": "npm run build && electron-builder --win",
  "electron:build:mac": "npm run build && electron-builder --mac",
  "electron:build:linux": "npm run build && electron-builder --linux"
}
```

## File Structure

```
electron/
├── main.js          # Electron main process (file system access)
├── preload.js       # Bridge between Electron and web app

src/components/plr-scanner/
├── PLRScannerDialog.tsx   # Main scanner UI
└── PLRScanResults.tsx     # Results table with import

electron-builder.json  # Build configuration
```

## How It Works

### 1. File Selection
- Uses Electron's native folder picker dialog
- Supports multi-folder selection
- Shows selected paths in UI

### 2. Scanning Process
- Recursively walks directory tree
- Filters by file type (.zip, .pdf, .doc, etc.)
- Shows progress in real-time

### 3. PLR Analysis
Each file is analyzed through multiple layers:

**Layer 1: Filename Analysis**
- Searches for PLR keywords
- Package indicators (bundle, pack, collection)
- Scores 0-100%

**Layer 2: Archive Inspection**
- Lists ZIP contents without extracting
- Detects common PLR folder structures
- Looks for license files

**Layer 3: License Detection**
- Reads license.txt files
- Identifies PLR, MRR, RR types
- Extracts restrictions

### 4. Results Review
- Sortable, filterable table
- Shows PLR score and confidence
- Edit niche assignments
- Select files to import

### 5. Import to Cloud
- Uploads files to Supabase Storage
- Creates PLR item records in database
- Links to categories
- Syncs with web app

## Web vs Desktop

| Feature | Web App | Desktop App |
|---------|---------|-------------|
| File Upload | Manual upload | Scan computer |
| Folder Access | Single folder | Multiple drives |
| Recursive Scan | No | Yes |
| ZIP Analysis | No | Yes |
| Batch Import | Limited | Unlimited |
| File Moving | No | Yes (coming soon) |

## Security Notes

- Electron runs with Node.js access for file operations
- Context isolation enabled for security
- IPC handlers validate all operations
- Files are scanned locally before upload
- No files sent to external services except Supabase

## Troubleshooting

### "Desktop App Required" message
You're running the web version. Install and run the desktop app for full features.

### Scan not finding files
- Check folder permissions
- Ensure recursive option is enabled
- Verify file types in scan options

### Import fails
- Check internet connection (uploads to Supabase)
- Verify you're signed in
- Check file size limits (50MB default)

## Future Enhancements

Phase 3-9 features coming soon:
- AI-powered niche detection (using Gemini)
- Physical file organization
- Virtual collections
- Duplicate detection
- Batch rename tools
- Export functionality
- Analytics dashboard
- Search across all metadata

## Support

For issues or questions:
- Check the main README.md
- Review PLR_LOVABLE_KNOWLEDGE.md
- Contact support
