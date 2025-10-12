import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FolderOpen, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface OrganizationConfig {
  outputBasePath: string;
  folderStructure: 'niche' | 'license' | 'date' | 'custom';
  namingConvention: 'original' | 'descriptive' | 'numbered';
  handleDuplicates: 'skip' | 'rename' | 'overwrite';
  createSubfolders: boolean;
  customTemplate?: string;
}

interface OrganizationConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (config: OrganizationConfig) => void;
  itemCount: number;
}

export default function OrganizationConfigDialog({
  open,
  onOpenChange,
  onConfirm,
  itemCount,
}: OrganizationConfigDialogProps) {
  const [config, setConfig] = useState<OrganizationConfig>({
    outputBasePath: '',
    folderStructure: 'niche',
    namingConvention: 'original',
    handleDuplicates: 'rename',
    createSubfolders: true,
  });

  const handleSelectFolder = async () => {
    if (window.electronAPI) {
      const paths = await window.electronAPI.openDirectory();
      if (paths && paths.length > 0) {
        setConfig({ ...config, outputBasePath: paths[0] });
      }
    }
  };

  const handleConfirm = () => {
    if (!config.outputBasePath) {
      alert('Please select an output folder');
      return;
    }
    onConfirm(config);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configure File Organization</DialogTitle>
          <DialogDescription>
            Set up how you want to organize {itemCount} PLR items on your computer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Output Folder */}
          <div className="space-y-2">
            <Label htmlFor="output-path">Output Folder *</Label>
            <div className="flex gap-2">
              <Input
                id="output-path"
                value={config.outputBasePath}
                placeholder="Select destination folder..."
                readOnly
              />
              <Button onClick={handleSelectFolder} variant="outline">
                <FolderOpen className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Choose where organized files should be saved
            </p>
          </div>

          {/* Folder Structure */}
          <div className="space-y-2">
            <Label htmlFor="folder-structure">Folder Structure</Label>
            <Select
              value={config.folderStructure}
              onValueChange={(value: any) =>
                setConfig({ ...config, folderStructure: value })
              }
            >
              <SelectTrigger id="folder-structure">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="niche">
                  By Niche (e.g., Health/Weight Loss/...)
                </SelectItem>
                <SelectItem value="license">
                  By License Type (e.g., PLR/MRR/RR)
                </SelectItem>
                <SelectItem value="date">
                  By Date Added (e.g., 2025/January/...)
                </SelectItem>
                <SelectItem value="custom">
                  Custom Template
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Template */}
          {config.folderStructure === 'custom' && (
            <div className="space-y-2">
              <Label htmlFor="custom-template">Custom Template</Label>
              <Input
                id="custom-template"
                value={config.customTemplate || ''}
                onChange={(e) =>
                  setConfig({ ...config, customTemplate: e.target.value })
                }
                placeholder="{niche}/{license}/{date}"
              />
              <p className="text-xs text-muted-foreground">
                Available variables: {'{niche}'}, {'{license}'}, {'{date}'}, {'{category}'}
              </p>
            </div>
          )}

          {/* Naming Convention */}
          <div className="space-y-2">
            <Label htmlFor="naming">File Naming Convention</Label>
            <Select
              value={config.namingConvention}
              onValueChange={(value: any) =>
                setConfig({ ...config, namingConvention: value })
              }
            >
              <SelectTrigger id="naming">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">
                  Keep Original Names
                </SelectItem>
                <SelectItem value="descriptive">
                  Descriptive (Niche - Title - License.ext)
                </SelectItem>
                <SelectItem value="numbered">
                  Numbered (001_filename.ext)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duplicate Handling */}
          <div className="space-y-2">
            <Label htmlFor="duplicates">Handle Duplicates</Label>
            <Select
              value={config.handleDuplicates}
              onValueChange={(value: any) =>
                setConfig({ ...config, handleDuplicates: value })
              }
            >
              <SelectTrigger id="duplicates">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skip">Skip (Don't Copy)</SelectItem>
                <SelectItem value="rename">Rename (Add Counter)</SelectItem>
                <SelectItem value="overwrite">Overwrite Existing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Create Subfolders */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="subfolders"
              checked={config.createSubfolders}
              onCheckedChange={(checked) =>
                setConfig({ ...config, createSubfolders: checked === true })
              }
            />
            <label
              htmlFor="subfolders"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create subfolders for sub-niches
            </label>
          </div>

          {/* Warning */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This will copy/move {itemCount} files to the selected location.
              Make sure you have enough disk space available.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!config.outputBasePath}>
            Preview Organization
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
