const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const crypto = require('crypto');
const JSZip = require('jszip');
const chokidar = require('chokidar');

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

// === PLR Organizer IPC Handlers ===

// Legacy handlers (keep for compatibility)
ipcMain.handle('select-folders', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'multiSelections']
  });
  return { canceled: result.canceled, paths: result.filePaths };
});

ipcMain.handle('scan-folders', async (event, options) => {
  const { paths, includeSubfolders, fileTypes } = options;
  const results = [];
  
  for (const folderPath of paths) {
    const files = await scanDirectory(folderPath, includeSubfolders, fileTypes);
    results.push(...files);
  }
  
  return results;
});

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
    
    analysis.plrScore += analyzeFilename(analysis.filename);
    
    if (analysis.type === '.zip') {
      const archiveData = await inspectArchive(filePath);
      analysis.contents = archiveData.contents;
      analysis.plrScore += archiveData.score;
      analysis.licenseType = archiveData.licenseType || 'Unknown';
    }
    
    if (analysis.plrScore >= 90) analysis.confidence = 'high';
    else if (analysis.plrScore >= 60) analysis.confidence = 'medium';
    else analysis.confidence = 'low';
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing file:', error);
    return null;
  }
});

ipcMain.handle('organize-files', async (event, operations) => {
  const results = [];
  
  for (const op of operations) {
    try {
      const targetDir = path.dirname(op.targetPath);
      await fs.mkdir(targetDir, { recursive: true });
      
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

// === Enhanced File System APIs ===

ipcMain.handle('dialog:openDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'multiSelections']
  });
  return result.filePaths;
});

ipcMain.handle('dialog:openFile', async (event, options) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: options?.filters || [
      { name: 'Archives', extensions: ['zip', 'rar', '7z'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  return result.filePaths;
});

ipcMain.handle('fs:readDir', async (event, dirPath) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const items = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dirPath, entry.name);
        const stats = await fs.stat(fullPath);
        
        return {
          name: entry.name,
          path: fullPath,
          isDirectory: entry.isDirectory(),
          size: stats.size,
          modified: stats.mtime,
          created: stats.birthtime
        };
      })
    );
    
    return items;
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
});

ipcMain.handle('fs:stat', async (event, filePath) => {
  try {
    const stats = await fs.stat(filePath);
    return {
      size: stats.size,
      modified: stats.mtime,
      created: stats.birthtime,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    };
  } catch (error) {
    console.error('Error getting file stats:', error);
    throw error;
  }
});

ipcMain.handle('fs:readFile', async (event, filePath, encoding) => {
  try {
    const data = await fs.readFile(filePath, encoding || null);
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
});

ipcMain.handle('fs:writeFile', async (event, filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
    return { success: true };
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
});

ipcMain.handle('fs:move', async (event, sourcePath, destPath) => {
  try {
    await fs.rename(sourcePath, destPath);
    return { success: true };
  } catch (error) {
    console.error('Error moving file:', error);
    throw error;
  }
});

ipcMain.handle('fs:copy', async (event, sourcePath, destPath) => {
  try {
    await fs.copyFile(sourcePath, destPath);
    return { success: true };
  } catch (error) {
    console.error('Error copying file:', error);
    throw error;
  }
});

ipcMain.handle('fs:mkdir', async (event, dirPath, recursive) => {
  try {
    await fs.mkdir(dirPath, { recursive: recursive || false });
    return { success: true };
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
});

ipcMain.handle('fs:exists', async (event, filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
});

ipcMain.handle('fs:delete', async (event, filePath) => {
  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
});

ipcMain.handle('fs:scanDirectory', async (event, dirPath, options = {}) => {
  const {
    includeSubfolders = true,
    maxDepth = 10,
    fileTypes = ['zip', 'rar', '7z']
  } = options;
  
  const results = [];
  
  async function scan(currentPath, depth = 0) {
    if (depth > maxDepth) return;
    
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.isDirectory() && includeSubfolders) {
          await scan(fullPath, depth + 1);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).slice(1).toLowerCase();
          
          if (fileTypes.length === 0 || fileTypes.includes(ext)) {
            const stats = await fs.stat(fullPath);
            results.push({
              name: entry.name,
              path: fullPath,
              size: stats.size,
              modified: stats.mtime,
              extension: ext
            });
          }
        }
        
        if (results.length % 100 === 0 && mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('scan:progress', {
            filesFound: results.length,
            currentPath: fullPath
          });
        }
      }
    } catch (error) {
      console.error(`Error scanning ${currentPath}:`, error);
    }
  }
  
  await scan(dirPath);
  return results;
});

// === Archive Operations ===

ipcMain.handle('archive:listContents', async (event, archivePath) => {
  try {
    const data = await fs.readFile(archivePath);
    const zip = await JSZip.loadAsync(data);
    
    const files = [];
    zip.forEach((relativePath, file) => {
      files.push({
        path: relativePath,
        name: path.basename(relativePath),
        isDirectory: file.dir,
        size: file._data?.uncompressedSize || 0
      });
    });
    
    return files;
  } catch (error) {
    console.error('Error listing archive contents:', error);
    throw error;
  }
});

ipcMain.handle('archive:extractFile', async (event, archivePath, filePath) => {
  try {
    const data = await fs.readFile(archivePath);
    const zip = await JSZip.loadAsync(data);
    const file = zip.file(filePath);
    
    if (!file) {
      throw new Error('File not found in archive');
    }
    
    const content = await file.async('text');
    return content;
  } catch (error) {
    console.error('Error extracting file:', error);
    throw error;
  }
});

ipcMain.handle('archive:extract', async (event, archivePath, destPath) => {
  try {
    const data = await fs.readFile(archivePath);
    const zip = await JSZip.loadAsync(data);
    
    const promises = [];
    zip.forEach((relativePath, file) => {
      const targetPath = path.join(destPath, relativePath);
      
      if (file.dir) {
        promises.push(fs.mkdir(targetPath, { recursive: true }));
      } else {
        promises.push(
          file.async('nodebuffer').then(content => {
            return fs.mkdir(path.dirname(targetPath), { recursive: true })
              .then(() => fs.writeFile(targetPath, content));
          })
        );
      }
    });
    
    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error('Error extracting archive:', error);
    throw error;
  }
});

// === File Watcher ===

const watchers = new Map();

ipcMain.handle('fs:watchDirectory', async (event, dirPath, watchId) => {
  if (watchers.has(watchId)) {
    watchers.get(watchId).close();
  }
  
  const watcher = chokidar.watch(dirPath, {
    persistent: true,
    ignoreInitial: true
  });
  
  watcher
    .on('add', filePath => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('fs:fileAdded', { watchId, path: filePath });
      }
    })
    .on('change', filePath => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('fs:fileChanged', { watchId, path: filePath });
      }
    })
    .on('unlink', filePath => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('fs:fileRemoved', { watchId, path: filePath });
      }
    });
  
  watchers.set(watchId, watcher);
  return { success: true };
});

ipcMain.handle('fs:unwatchDirectory', async (event, watchId) => {
  if (watchers.has(watchId)) {
    watchers.get(watchId).close();
    watchers.delete(watchId);
  }
  return { success: true };
});

// === Helper Functions ===

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
  
  if (lower.includes('plr')) score += 100;
  else if (lower.includes('private label')) score += 100;
  else if (lower.includes('mrr') || lower.includes('master resell')) score += 80;
  else if (lower.includes('resell') || lower.includes('resale')) score += 70;
  
  if (lower.includes('pack') || lower.includes('bundle') || lower.includes('collection')) {
    score += 25;
  }
  
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
    
    const plrFolders = ['articles', 'ebooks', 'graphics', 'videos', 'audio', 'source', 'reseller', 'sales page'];
    for (const folder of folders) {
      if (plrFolders.some(plr => folder.includes(plr))) {
        score += 20;
      }
    }
    
    for (const filename of Object.keys(zip.files)) {
      const lower = filename.toLowerCase();
      if (lower.includes('license') || lower.includes('rights') || lower.includes('terms')) {
        score += 25;
        
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
          // Ignore
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

// Cleanup
app.on('before-quit', () => {
  watchers.forEach(watcher => watcher.close());
  watchers.clear();
});
