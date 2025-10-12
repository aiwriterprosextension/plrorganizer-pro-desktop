const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const crypto = require('crypto');
const JSZip = require('jszip');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers

// Select folders
ipcMain.handle('select-folders', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'multiSelections']
  });
  
  if (result.canceled) {
    return { canceled: true };
  }
  
  return { canceled: false, paths: result.filePaths };
});

// Scan folders
ipcMain.handle('scan-folders', async (event, options) => {
  const { paths, includeSubfolders, fileTypes } = options;
  const results = [];
  
  for (const folderPath of paths) {
    const files = await scanDirectory(folderPath, includeSubfolders, fileTypes);
    results.push(...files);
  }
  
  return results;
});

// Analyze PLR file
ipcMain.handle('analyze-plr-file', async (event, filePath) => {
  try {
    const stats = await fs.stat(filePath);
    const fileHash = await calculateFileHash(filePath);
    
    const analysis = {
      path: filePath,
      filename: path.basename(filePath),
      size: stats.size,
      modified: stats.mtime,
      hash: fileHash,
      type: path.extname(filePath).toLowerCase(),
      plrScore: 0,
      confidence: 'low',
      suggestedNiche: 'Unknown',
      licenseType: 'Unknown',
      contents: []
    };
    
    // Layer 1: Filename analysis
    analysis.plrScore += analyzeFilename(analysis.filename);
    
    // Layer 2: Archive inspection (if ZIP)
    if (analysis.type === '.zip') {
      const archiveData = await inspectArchive(filePath);
      analysis.contents = archiveData.contents;
      analysis.plrScore += archiveData.score;
      analysis.licenseType = archiveData.licenseType || 'Unknown';
    }
    
    // Calculate confidence
    if (analysis.plrScore >= 90) analysis.confidence = 'high';
    else if (analysis.plrScore >= 60) analysis.confidence = 'medium';
    else analysis.confidence = 'low';
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing file:', error);
    return null;
  }
});

// Move/organize files
ipcMain.handle('organize-files', async (event, operations) => {
  const results = [];
  
  for (const op of operations) {
    try {
      const targetDir = path.dirname(op.targetPath);
      
      // Create target directory if it doesn't exist
      await fs.mkdir(targetDir, { recursive: true });
      
      // Copy or move file
      if (op.operation === 'move') {
        await fs.rename(op.sourcePath, op.targetPath);
      } else {
        await fs.copyFile(op.sourcePath, op.targetPath);
      }
      
      results.push({
        success: true,
        sourcePath: op.sourcePath,
        targetPath: op.targetPath
      });
    } catch (error) {
      results.push({
        success: false,
        sourcePath: op.sourcePath,
        error: error.message
      });
    }
  }
  
  return results;
});

// Extract ZIP file
ipcMain.handle('extract-zip', async (event, zipPath, targetPath) => {
  try {
    const data = await fs.readFile(zipPath);
    const zip = await JSZip.loadAsync(data);
    
    await fs.mkdir(targetPath, { recursive: true });
    
    for (const [filename, file] of Object.entries(zip.files)) {
      if (!file.dir) {
        const content = await file.async('nodebuffer');
        const filePath = path.join(targetPath, filename);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content);
      }
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Helper functions

async function scanDirectory(dirPath, recursive, fileTypes) {
  const files = [];
  
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory() && recursive) {
        const subFiles = await scanDirectory(fullPath, recursive, fileTypes);
        files.push(...subFiles);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (fileTypes.includes('all') || fileTypes.includes(ext)) {
          const stats = await fs.stat(fullPath);
          files.push({
            path: fullPath,
            name: item.name,
            size: stats.size,
            modified: stats.mtime,
            type: ext
          });
        }
      }
    }
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
  
  return files;
}

function analyzeFilename(filename) {
  let score = 0;
  const lower = filename.toLowerCase();
  
  // PLR indicators
  if (lower.includes('plr')) score += 100;
  else if (lower.includes('private label')) score += 100;
  else if (lower.includes('mrr') || lower.includes('master resell')) score += 80;
  else if (lower.includes('resell') || lower.includes('resale')) score += 70;
  
  // Package indicators
  if (lower.includes('pack') || lower.includes('bundle') || lower.includes('collection')) {
    score += 25;
  }
  
  // Content type indicators
  if (lower.includes('article') || lower.includes('ebook') || lower.includes('graphic')) {
    score += 15;
  }
  
  return Math.min(score, 100);
}

async function inspectArchive(zipPath) {
  try {
    const data = await fs.readFile(zipPath);
    const zip = await JSZip.loadAsync(data);
    
    const contents = [];
    let score = 0;
    let licenseType = 'Unknown';
    
    // Analyze folder structure
    const folders = new Set();
    for (const filename of Object.keys(zip.files)) {
      const parts = filename.split('/');
      if (parts.length > 1) {
        folders.add(parts[0].toLowerCase());
      }
      
      contents.push({
        name: path.basename(filename),
        path: filename,
        size: zip.files[filename]._data?.uncompressedSize || 0
      });
    }
    
    // Check for PLR folder patterns
    const plrFolders = ['articles', 'ebooks', 'graphics', 'videos', 'audio', 'source', 'reseller', 'sales page'];
    for (const folder of folders) {
      if (plrFolders.some(plr => folder.includes(plr))) {
        score += 20;
      }
    }
    
    // Check for license files
    for (const filename of Object.keys(zip.files)) {
      const lower = filename.toLowerCase();
      if (lower.includes('license') || lower.includes('rights') || lower.includes('terms')) {
        score += 25;
        
        // Try to read license file
        try {
          const file = zip.files[filename];
          if (!file.dir) {
            const content = await file.async('string');
            const contentLower = content.toLowerCase();
            
            if (contentLower.includes('private label') || contentLower.includes('plr')) {
              licenseType = 'PLR';
            } else if (contentLower.includes('master resell') || contentLower.includes('mrr')) {
              licenseType = 'MRR';
            } else if (contentLower.includes('resell rights')) {
              licenseType = 'RR';
            }
          }
        } catch (e) {
          // Ignore read errors
        }
      }
    }
    
    return {
      contents,
      score: Math.min(score, 100),
      licenseType
    };
  } catch (error) {
    console.error('Error inspecting archive:', error);
    return { contents: [], score: 0, licenseType: 'Unknown' };
  }
}

async function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fsSync.createReadStream(filePath);
    
    stream.on('data', data => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}
