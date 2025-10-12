export interface ElectronAPI {
  // Legacy PLR Scanner APIs (for backward compatibility)
  selectFolders: () => Promise<{ canceled: boolean; paths?: string[] }>;
  scanFolders: (options: {
    paths: string[];
    includeSubfolders: boolean;
    fileTypes: string[];
  }) => Promise<Array<{
    path: string;
    name: string;
    size: number;
    modified: Date;
    type: string;
  }>>;
  analyzePLRFile: (filePath: string) => Promise<{
    path: string;
    filename: string;
    size: number;
    modified: Date;
    hash: string;
    type: string;
    plrScore: number;
    confidence: string;
    suggestedNiche: string;
    licenseType: string;
    contents: Array<{ name: string; path: string; size: number }>;
  } | null>;
  organizeFiles: (operations: Array<{
    operation: 'move' | 'copy';
    sourcePath: string;
    targetPath: string;
  }>) => Promise<Array<{
    success: boolean;
    sourcePath: string;
    targetPath?: string;
    error?: string;
  }>>;
  extractZip: (zipPath: string, targetPath: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  
  // Enhanced Dialog APIs
  openDirectory: () => Promise<string[]>;
  openFile: (options?: { filters?: { name: string; extensions: string[] }[] }) => Promise<string[]>;
  
  // Enhanced File System APIs
  readDir: (path: string) => Promise<Array<{
    name: string;
    path: string;
    isDirectory: boolean;
    size: number;
    modified: Date;
    created: Date;
  }>>;
  stat: (path: string) => Promise<{
    size: number;
    modified: Date;
    created: Date;
    isFile: boolean;
    isDirectory: boolean;
  }>;
  readFile: (path: string, encoding?: string) => Promise<string | Buffer>;
  writeFile: (path: string, data: string | Buffer) => Promise<{ success: boolean }>;
  move: (source: string, dest: string) => Promise<{ success: boolean }>;
  copy: (source: string, dest: string) => Promise<{ success: boolean }>;
  mkdir: (path: string, recursive?: boolean) => Promise<{ success: boolean }>;
  exists: (path: string) => Promise<boolean>;
  delete: (path: string) => Promise<{ success: boolean }>;
  scanDirectory: (path: string, options?: {
    includeSubfolders?: boolean;
    maxDepth?: number;
    fileTypes?: string[];
  }) => Promise<Array<{
    name: string;
    path: string;
    size: number;
    modified: Date;
    extension: string;
  }>>;
  
  // Archive APIs
  listArchiveContents: (path: string) => Promise<Array<{
    path: string;
    name: string;
    isDirectory: boolean;
    size: number;
  }>>;
  extractFile: (archivePath: string, filePath: string) => Promise<string>;
  extractArchive: (archivePath: string, destPath: string) => Promise<{ success: boolean }>;
  
  // File Watcher APIs
  watchDirectory: (path: string, watchId: string) => Promise<{ success: boolean }>;
  unwatchDirectory: (watchId: string) => Promise<{ success: boolean }>;
  
  // Event Listeners
  onScanProgress: (callback: (data: { filesFound: number; currentPath: string }) => void) => void;
  onFileAdded: (callback: (data: { watchId: string; path: string }) => void) => void;
  onFileChanged: (callback: (data: { watchId: string; path: string }) => void) => void;
  onFileRemoved: (callback: (data: { watchId: string; path: string }) => void) => void;
  
  // Cleanup
  removeListener: (channel: string) => void;
  
  // Environment flag
  isElectron: boolean;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
