const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolders: () => ipcRenderer.invoke('select-folders'),
  scanFolders: (options) => ipcRenderer.invoke('scan-folders', options),
  analyzePLRFile: (filePath) => ipcRenderer.invoke('analyze-plr-file', filePath),
  organizeFiles: (operations) => ipcRenderer.invoke('organize-files', operations),
  extractZip: (zipPath, targetPath) => ipcRenderer.invoke('extract-zip', zipPath, targetPath),
  isElectron: true
});
