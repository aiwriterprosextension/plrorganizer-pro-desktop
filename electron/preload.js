const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Legacy PLR Scanner APIs (keep for compatibility)
  selectFolders: () => ipcRenderer.invoke('select-folders'),
  scanFolders: (options) => ipcRenderer.invoke('scan-folders', options),
  analyzePLRFile: (filePath) => ipcRenderer.invoke('analyze-plr-file', filePath),
  organizeFiles: (operations) => ipcRenderer.invoke('organize-files', operations),
  extractZip: (zipPath, targetPath) => ipcRenderer.invoke('extract-zip', zipPath, targetPath),
  
  // Enhanced Dialog APIs
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  openFile: (options) => ipcRenderer.invoke('dialog:openFile', options),
  
  // Enhanced File System APIs
  readDir: (path) => ipcRenderer.invoke('fs:readDir', path),
  stat: (path) => ipcRenderer.invoke('fs:stat', path),
  readFile: (path, encoding) => ipcRenderer.invoke('fs:readFile', path, encoding),
  writeFile: (path, data) => ipcRenderer.invoke('fs:writeFile', path, data),
  move: (source, dest) => ipcRenderer.invoke('fs:move', source, dest),
  copy: (source, dest) => ipcRenderer.invoke('fs:copy', source, dest),
  mkdir: (path, recursive) => ipcRenderer.invoke('fs:mkdir', path, recursive),
  exists: (path) => ipcRenderer.invoke('fs:exists', path),
  delete: (path) => ipcRenderer.invoke('fs:delete', path),
  scanDirectory: (path, options) => ipcRenderer.invoke('fs:scanDirectory', path, options),
  
  // Archive APIs
  listArchiveContents: (path) => ipcRenderer.invoke('archive:listContents', path),
  extractFile: (archivePath, filePath) => ipcRenderer.invoke('archive:extractFile', archivePath, filePath),
  extractArchive: (archivePath, destPath) => ipcRenderer.invoke('archive:extract', archivePath, destPath),
  
  // File Watcher APIs
  watchDirectory: (path, watchId) => ipcRenderer.invoke('fs:watchDirectory', path, watchId),
  unwatchDirectory: (watchId) => ipcRenderer.invoke('fs:unwatchDirectory', watchId),
  
  // Event Listeners
  onScanProgress: (callback) => {
    ipcRenderer.on('scan:progress', (event, data) => callback(data));
  },
  onFileAdded: (callback) => {
    ipcRenderer.on('fs:fileAdded', (event, data) => callback(data));
  },
  onFileChanged: (callback) => {
    ipcRenderer.on('fs:fileChanged', (event, data) => callback(data));
  },
  onFileRemoved: (callback) => {
    ipcRenderer.on('fs:fileRemoved', (event, data) => callback(data));
  },
  
  // Cleanup
  removeListener: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
  
  // Environment flag
  isElectron: true
});
