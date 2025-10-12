import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FolderTree, 
  File, 
  ChevronRight, 
  ChevronDown, 
  AlertTriangle,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';
import { OrganizationConfig } from './OrganizationConfigDialog';

interface FilePreview {
  originalPath: string;
  newPath: string;
  fileName: string;
  size: number;
  conflict: boolean;
}

interface FolderNode {
  name: string;
  files: FilePreview[];
  children: Map<string, FolderNode>;
}

interface OrganizationPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  config: OrganizationConfig;
  items: any[];
}

export default function OrganizationPreview({
  open,
  onOpenChange,
  onConfirm,
  config,
  items,
}: OrganizationPreviewProps) {
  const [preview, setPreview] = useState<FilePreview[]>([]);
  const [folderTree, setFolderTree] = useState<FolderNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    totalSize: 0,
    conflictCount: 0,
    folderCount: 0,
  });

  useEffect(() => {
    if (open) {
      generatePreview();
    }
  }, [open, config, items]);

  const generatePreview = () => {
    const previews: FilePreview[] = [];
    const root: FolderNode = { name: 'root', files: [], children: new Map() };
    let totalSize = 0;
    let conflictCount = 0;

    items.forEach((item) => {
      const path = generatePath(item, config);
      const fileName = generateFileName(item, config);
      const fullPath = `${path}/${fileName}`;
      
      const preview: FilePreview = {
        originalPath: item.file_url || item.title,
        newPath: fullPath,
        fileName,
        size: item.file_size || 0,
        conflict: false, // Would check actual filesystem
      };
      
      totalSize += preview.size;
      if (preview.conflict) conflictCount++;
      
      previews.push(preview);
      addToTree(root, path.split('/'), preview);
    });

    setPreview(previews);
    setFolderTree(root);
    setStats({
      totalSize,
      conflictCount,
      folderCount: countFolders(root),
    });
  };

  const generatePath = (item: any, config: OrganizationConfig): string => {
    const base = config.outputBasePath;
    
    switch (config.folderStructure) {
      case 'niche':
        const parts = [item.niche || 'Uncategorized'];
        if (config.createSubfolders && item.sub_niche) {
          parts.push(item.sub_niche);
        }
        return `${base}/${parts.join('/')}`;
      
      case 'license':
        return `${base}/${item.license_type || 'Unknown'}`;
      
      case 'date':
        const date = new Date(item.created_at);
        return `${base}/${date.getFullYear()}/${date.toLocaleString('default', { month: 'long' })}`;
      
      case 'custom':
        let custom = config.customTemplate || '{niche}';
        custom = custom.replace('{niche}', item.niche || 'Uncategorized');
        custom = custom.replace('{license}', item.license_type || 'Unknown');
        custom = custom.replace('{date}', new Date(item.created_at).getFullYear().toString());
        custom = custom.replace('{category}', item.categories?.name || 'Other');
        return `${base}/${custom}`;
      
      default:
        return base;
    }
  };

  const generateFileName = (item: any, config: OrganizationConfig): string => {
    const ext = item.file_type || '.zip';
    const title = item.title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
    
    switch (config.namingConvention) {
      case 'descriptive':
        return `${item.niche || 'Unknown'} - ${title} - ${item.license_type || 'PLR'}${ext}`;
      
      case 'numbered':
        const index = items.indexOf(item) + 1;
        return `${String(index).padStart(3, '0')}_${title}${ext}`;
      
      default:
        return `${title}${ext}`;
    }
  };

  const addToTree = (node: FolderNode, pathParts: string[], file: FilePreview) => {
    if (pathParts.length === 0) {
      node.files.push(file);
      return;
    }

    const [first, ...rest] = pathParts;
    if (!node.children.has(first)) {
      node.children.set(first, { name: first, files: [], children: new Map() });
    }
    addToTree(node.children.get(first)!, rest, file);
  };

  const countFolders = (node: FolderNode): number => {
    let count = node.children.size;
    node.children.forEach(child => {
      count += countFolders(child);
    });
    return count;
  };

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTree = (node: FolderNode, path: string = '', level: number = 0) => {
    const fullPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(fullPath);

    return (
      <div key={fullPath}>
        {node.name !== 'root' && (
          <div
            className={`flex items-center gap-2 py-1 px-2 hover:bg-muted cursor-pointer rounded`}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => toggleFolder(fullPath)}
          >
            {node.children.size > 0 ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="w-4" />
            )}
            <FolderTree className="h-4 w-4 text-primary" />
            <span className="font-medium">{node.name}</span>
            <Badge variant="secondary" className="ml-auto">
              {node.files.length + Array.from(node.children.values()).reduce(
                (sum, child) => sum + child.files.length,
                0
              )} files
            </Badge>
          </div>
        )}

        {(isExpanded || node.name === 'root') && (
          <>
            {node.files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 py-1 px-2 text-sm text-muted-foreground"
                style={{ paddingLeft: `${(level + 1) * 16 + 24}px` }}
              >
                <File className="h-3 w-3" />
                <span className="flex-1 truncate">{file.fileName}</span>
                {file.conflict && (
                  <AlertTriangle className="h-3 w-3 text-warning" />
                )}
                <span className="text-xs">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
            ))}
            
            {Array.from(node.children.values()).map(child =>
              renderTree(child, fullPath, level + 1)
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Organization Preview</DialogTitle>
          <DialogDescription>
            Review the planned folder structure before organizing files
          </DialogDescription>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderTree className="h-4 w-4" />
              Folders
            </div>
            <div className="text-2xl font-bold">{stats.folderCount}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <File className="h-4 w-4" />
              Files
            </div>
            <div className="text-2xl font-bold">{preview.length}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HardDrive className="h-4 w-4" />
              Total Size
            </div>
            <div className="text-2xl font-bold">
              {(stats.totalSize / 1024 / 1024 / 1024).toFixed(2)} GB
            </div>
          </div>
        </div>

        {/* Conflicts Warning */}
        {stats.conflictCount > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {stats.conflictCount} file conflicts detected. Files will be handled
              according to your duplicate settings: {config.handleDuplicates}
            </AlertDescription>
          </Alert>
        )}

        {/* Folder Tree */}
        <div className="border rounded-lg">
          <div className="p-3 border-b bg-muted/50">
            <h4 className="font-semibold">Folder Structure</h4>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="p-2">
              {folderTree && renderTree(folderTree)}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Back to Config
          </Button>
          <Button onClick={onConfirm}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Start Organization
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
