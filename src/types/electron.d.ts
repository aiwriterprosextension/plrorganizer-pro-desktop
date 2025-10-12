export interface ElectronAPI {
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
  isElectron: boolean;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
