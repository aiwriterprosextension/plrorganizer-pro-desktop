# Electron API Usage Guide for PLR Organizer

This guide explains how to use the Electron APIs in your React components for the PLR Organizer desktop application.

## Quick Start

All Electron APIs are available via `window.electronAPI`. TypeScript types are included for autocomplete and type safety.

## Checking if Running in Electron

```typescript
const isElectron = window.electronAPI?.isElectron || false;

if (isElectron) {
  // Use desktop features
} else {
  // Use web fallback
}
```

## Dialog APIs

### Open Directory Dialog

```typescript
const handleSelectFolder = async () => {
  const folders = await window.electronAPI.openDirectory();
  console.log('Selected folders:', folders);
  // folders is an array of absolute paths
};
```

### Open File Dialog

```typescript
const handleSelectFiles = async () => {
  const files = await window.electronAPI.openFile({
    filters: [
      { name: 'Archives', extensions: ['zip', 'rar', '7z'] },
      { name: 'Documents', extensions: ['pdf', 'doc', 'docx'] }
    ]
  });
  console.log('Selected files:', files);
};
```

## File System Operations

### Read Directory

```typescript
const listFolderContents = async (folderPath: string) => {
  const items = await window.electronAPI.readDir(folderPath);
  
  items.forEach(item => {
    console.log({
      name: item.name,
      path: item.path,
      isFolder: item.isDirectory,
      size: item.size,
      modified: item.modified
    });
  });
};
```

### Get File Stats

```typescript
const getFileInfo = async (filePath: string) => {
  const stats = await window.electronAPI.stat(filePath);
  console.log('File size:', stats.size);
  console.log('Modified:', stats.modified);
  console.log('Is file:', stats.isFile);
};
```

### Read File

```typescript
// Read as text
const content = await window.electronAPI.readFile('/path/to/file.txt', 'utf8');

// Read as binary
const buffer = await window.electronAPI.readFile('/path/to/file.zip');
```

### Write File

```typescript
await window.electronAPI.writeFile('/path/to/output.txt', 'File content here');
```

### Move File

```typescript
await window.electronAPI.move(
  '/path/to/source.zip',
  '/path/to/destination/source.zip'
);
```

### Copy File

```typescript
await window.electronAPI.copy(
  '/path/to/source.zip',
  '/path/to/backup/source.zip'
);
```

### Create Directory

```typescript
// Create single directory
await window.electronAPI.mkdir('/path/to/new-folder', false);

// Create nested directories
await window.electronAPI.mkdir('/path/to/nested/folders', true);
```

### Check if File Exists

```typescript
const exists = await window.electronAPI.exists('/path/to/file.zip');
if (exists) {
  console.log('File exists!');
}
```

### Delete File

```typescript
await window.electronAPI.delete('/path/to/unwanted-file.zip');
```

## Directory Scanning

### Scan Directory for PLR Files

```typescript
const handleScanPLR = async () => {
  const folders = await window.electronAPI.openDirectory();
  
  if (folders.length === 0) return;
  
  // Listen for progress updates
  window.electronAPI.onScanProgress((data) => {
    console.log(`Found ${data.filesFound} files`);
    console.log(`Current: ${data.currentPath}`);
  });
  
  // Start scanning
  const results = await window.electronAPI.scanDirectory(folders[0], {
    includeSubfolders: true,
    maxDepth: 10,
    fileTypes: ['zip', 'rar', '7z'] // Empty array = all files
  });
  
  console.log('Scan complete:', results);
  
  // Cleanup listener
  window.electronAPI.removeListener('scan:progress');
};
```

## Archive Operations

### List Archive Contents

```typescript
const inspectZip = async (zipPath: string) => {
  const contents = await window.electronAPI.listArchiveContents(zipPath);
  
  contents.forEach(item => {
    console.log({
      name: item.name,
      path: item.path,
      isFolder: item.isDirectory,
      size: item.size
    });
  });
};
```

### Extract Single File from Archive

```typescript
const extractLicense = async (zipPath: string) => {
  const content = await window.electronAPI.extractFile(
    zipPath,
    'license.txt'
  );
  console.log('License content:', content);
};
```

### Extract Entire Archive

```typescript
const extractAll = async (zipPath: string, destFolder: string) => {
  // Create destination folder
  await window.electronAPI.mkdir(destFolder, true);
  
  // Extract
  await window.electronAPI.extractArchive(zipPath, destFolder);
  
  console.log('Extraction complete!');
};
```

## File Watching

### Watch Directory for Changes

```typescript
const setupFolderWatch = async (folderPath: string) => {
  const watchId = 'plr-folder-watch';
  
  // Set up event listeners
  window.electronAPI.onFileAdded(({ path }) => {
    console.log('New file added:', path);
  });
  
  window.electronAPI.onFileChanged(({ path }) => {
    console.log('File changed:', path);
  });
  
  window.electronAPI.onFileRemoved(({ path }) => {
    console.log('File removed:', path);
  });
  
  // Start watching
  await window.electronAPI.watchDirectory(folderPath, watchId);
  
  // Later, to stop watching:
  // await window.electronAPI.unwatchDirectory(watchId);
  // window.electronAPI.removeListener('fs:fileAdded');
  // window.electronAPI.removeListener('fs:fileChanged');
  // window.electronAPI.removeListener('fs:fileRemoved');
};
```

## Complete Example: PLR Scanner Component

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function PLRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesFound, setFilesFound] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  
  const handleScan = async () => {
    // Check if running in Electron
    if (!window.electronAPI?.isElectron) {
      alert('This feature requires the desktop app');
      return;
    }
    
    try {
      // Select folders
      const folders = await window.electronAPI.openDirectory();
      if (folders.length === 0) return;
      
      setIsScanning(true);
      setProgress(0);
      setFilesFound(0);
      
      // Listen for progress
      window.electronAPI.onScanProgress((data) => {
        setFilesFound(data.filesFound);
        // You could calculate percentage if you know total files
      });
      
      // Scan
      const scanned = await window.electronAPI.scanDirectory(folders[0], {
        includeSubfolders: true,
        maxDepth: 10,
        fileTypes: ['zip', 'rar', '7z']
      });
      
      // Process results (analyze for PLR indicators)
      const analyzed = await analyzeForPLR(scanned);
      setResults(analyzed);
      
      setIsScanning(false);
      
      // Cleanup
      window.electronAPI.removeListener('scan:progress');
      
    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
    }
  };
  
  const analyzeForPLR = async (files: any[]) => {
    const analyzed = [];
    
    for (const file of files) {
      // Analyze filename for PLR keywords
      const filename = file.name.toLowerCase();
      const plrKeywords = ['plr', 'mrr', 'resell', 'private label'];
      const score = plrKeywords.some(kw => filename.includes(kw)) ? 90 : 30;
      
      // Check archive contents if it's a ZIP
      let licenseType = 'Unknown';
      if (file.extension === 'zip') {
        try {
          const contents = await window.electronAPI.listArchiveContents(file.path);
          const hasLicense = contents.some(c => 
            c.name.toLowerCase().includes('license')
          );
          
          if (hasLicense) {
            licenseType = 'PLR (License Found)';
          }
        } catch (error) {
          console.error('Error reading ZIP:', error);
        }
      }
      
      analyzed.push({
        ...file,
        plrScore: score,
        confidence: score > 80 ? 'HIGH' : score > 50 ? 'MEDIUM' : 'LOW',
        licenseType,
        suggestedNiche: detectNiche(filename)
      });
    }
    
    return analyzed;
  };
  
  const detectNiche = (filename: string) => {
    const niches = {
      'health': ['health', 'fitness', 'weight', 'diet', 'keto'],
      'business': ['business', 'marketing', 'sales', 'entrepreneur'],
      'tech': ['wordpress', 'plugin', 'theme', 'code', 'software']
    };
    
    for (const [niche, keywords] of Object.entries(niches)) {
      if (keywords.some(kw => filename.includes(kw))) {
        return niche;
      }
    }
    
    return 'Uncategorized';
  };
  
  return (
    <div className="space-y-4">
      <Button onClick={handleScan} disabled={isScanning}>
        {isScanning ? 'Scanning...' : 'Scan Computer for PLR'}
      </Button>
      
      {isScanning && (
        <div className="space-y-2">
          <p>Files found: {filesFound}</p>
          <Progress value={progress} />
        </div>
      )}
      
      {results.length > 0 && (
        <div>
          <h3>Found {results.length} PLR files</h3>
          {/* Display results in table */}
        </div>
      )}
    </div>
  );
}
```

## Error Handling

Always wrap Electron API calls in try-catch blocks:

```typescript
try {
  const files = await window.electronAPI.scanDirectory(path, options);
  // Process files
} catch (error) {
  console.error('Scan failed:', error);
  // Show user-friendly error message
}
```

## Best Practices

1. **Always check if in Electron**: Use `window.electronAPI?.isElectron`
2. **Clean up listeners**: Call `removeListener()` when component unmounts
3. **Handle errors**: All operations can fail (permissions, disk full, etc.)
4. **Show progress**: Use progress callbacks for long operations
5. **Validate paths**: Check if files exist before operations
6. **Use absolute paths**: Always use full paths, not relative ones

## Performance Tips

1. **Batch operations**: Process multiple files in parallel when possible
2. **Use progress callbacks**: Don't block UI during long scans
3. **Limit recursion depth**: Set reasonable `maxDepth` for directory scans
4. **Filter early**: Use `fileTypes` to skip unwanted files during scan
5. **Cache results**: Store scan results to avoid re-scanning

## Security Notes

- All file operations are restricted to user-selected folders
- No automatic file access without user permission
- Context isolation is enabled for security
- No Node.js integration in renderer process

## Troubleshooting

**"window.electronAPI is undefined"**
- You're running in web browser, not Electron app
- Use feature detection: `if (window.electronAPI) { ... }`

**"Permission denied" errors**
- User doesn't have file system permissions
- Ask user to select folder via dialog first

**Archive extraction fails**
- File might be corrupted
- Archive format might not be supported (only ZIP supported)
- Destination folder might not have write permissions

## Next Steps

See `DESKTOP_APP_README.md` for building and distributing the desktop app.
