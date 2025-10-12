import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FolderOpen, Loader2, HardDrive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PLRScanResults } from "./PLRScanResults";

interface ScannedFile {
  path: string;
  name: string;
  size: number;
  modified: Date;
  type: string;
  selected?: boolean;
  plrScore?: number;
  confidence?: string;
  suggestedNiche?: string;
  licenseType?: string;
  targetFolder?: string;
  matchCount?: number;
}

interface PLRScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

export function PLRScannerDialog({ open, onOpenChange, onImportComplete }: PLRScannerDialogProps) {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanProgress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [scannedFiles, setScannedFiles] = useState<ScannedFile[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const [scanOptions, setScanOptions] = useState({
    includeSubfolders: true,
    scanArchives: true,
    fileTypes: ['.zip', '.rar', '.7z', '.pdf', '.doc', '.docx']
  });

  const isElectron = typeof window !== 'undefined' && (window as any).electronAPI?.isElectron;

  const handleSelectFolders = async () => {
    if (!isElectron) {
      toast({
        title: "Desktop App Required",
        description: "This feature requires the desktop application for full file system access.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await (window as any).electronAPI.selectFolders();
      
      if (!result.canceled && result.paths) {
        setSelectedPaths(result.paths);
        toast({
          title: "Folders Selected",
          description: `${result.paths.length} folder(s) selected for scanning`
        });
      }
    } catch (error) {
      console.error('Error selecting folders:', error);
      toast({
        title: "Error",
        description: "Failed to select folders",
        variant: "destructive"
      });
    }
  };

  const handleStartScan = async () => {
    if (selectedPaths.length === 0) {
      toast({
        title: "No Folders Selected",
        description: "Please select folders to scan first",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setProgress(0);
    setCurrentFile("");

    try {
      // Step 1: Scan for files
      const files = await (window as any).electronAPI.scanFolders({
        paths: selectedPaths,
        includeSubfolders: scanOptions.includeSubfolders,
        fileTypes: scanOptions.scanArchives ? scanOptions.fileTypes : []
      });

      toast({
        title: "Scan Complete",
        description: `Found ${files.length} files. Now analyzing for PLR content...`
      });

      setIsScanning(false);
      setIsAnalyzing(true);

      // Step 2: Analyze each file for PLR indicators
      const analyzedFiles: ScannedFile[] = [];
      let plrCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentFile(file.name);
        setProgress(Math.round(((i + 1) / files.length) * 100));

        const analysis = await (window as any).electronAPI.analyzePLRFile(file.path);
        
        if (analysis) {
          analyzedFiles.push({
            ...file,
            selected: analysis.plrScore >= 60,
            plrScore: analysis.plrScore,
            confidence: analysis.confidence,
            suggestedNiche: analysis.suggestedNiche || 'Uncategorized',
            licenseType: analysis.licenseType,
            targetFolder: '' // Will be set by AI or user
          });

          if (analysis.plrScore >= 60) plrCount++;
        }
      }

      setScannedFiles(analyzedFiles);
      setShowResults(true);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: `Detected ${plrCount} PLR packages out of ${files.length} files`
      });

    } catch (error) {
      console.error('Error scanning:', error);
      toast({
        title: "Scan Failed",
        description: "An error occurred during scanning",
        variant: "destructive"
      });
      setIsScanning(false);
      setIsAnalyzing(false);
    }
  };

  if (showResults) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>PLR Scan Results</DialogTitle>
            <DialogDescription>
              Review detected PLR packages and configure organization settings
            </DialogDescription>
          </DialogHeader>
          
          <PLRScanResults 
            files={scannedFiles}
            onClose={() => {
              setShowResults(false);
              setScannedFiles([]);
              setSelectedPaths([]);
              onOpenChange(false);
            }}
            onImportComplete={onImportComplete}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>PLR File Scanner</DialogTitle>
          <DialogDescription>
            Scan your computer for PLR packages and organize them automatically
          </DialogDescription>
        </DialogHeader>

        {!isElectron && (
          <div className="bg-warning/10 border border-warning rounded-lg p-4">
            <p className="text-sm text-warning-foreground">
              <strong>Desktop App Required:</strong> Full file system scanning requires the desktop application. 
              Download the desktop version for Windows, Mac, or Linux to use this feature.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Folder Selection */}
          <div>
            <Label className="text-base font-semibold mb-2 block">Select Folders to Scan</Label>
            <div className="space-y-2">
              <Button 
                onClick={handleSelectFolders} 
                variant="outline" 
                className="w-full justify-start"
                disabled={!isElectron || isScanning || isAnalyzing}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                {selectedPaths.length > 0 ? `${selectedPaths.length} folder(s) selected` : 'Choose Folders...'}
              </Button>
              
              {selectedPaths.length > 0 && (
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md max-h-32 overflow-y-auto">
                  {selectedPaths.map((path, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <HardDrive className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{path}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scan Options */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Scan Options</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="subfolders" 
                checked={scanOptions.includeSubfolders}
                onCheckedChange={(checked) => 
                  setScanOptions(prev => ({ ...prev, includeSubfolders: checked as boolean }))
                }
                disabled={isScanning || isAnalyzing}
              />
              <Label htmlFor="subfolders" className="font-normal cursor-pointer">
                Include subfolders (recursive scan)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="archives" 
                checked={scanOptions.scanArchives}
                onCheckedChange={(checked) => 
                  setScanOptions(prev => ({ ...prev, scanArchives: checked as boolean }))
                }
                disabled={isScanning || isAnalyzing}
              />
              <Label htmlFor="archives" className="font-normal cursor-pointer">
                Scan inside ZIP/RAR archives
              </Label>
            </div>
          </div>

          {/* Progress Display */}
          {(isScanning || isAnalyzing) && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {isScanning ? 'Scanning files...' : 'Analyzing PLR content...'}
                </span>
                <span className="text-sm text-muted-foreground">{scanProgress}%</span>
              </div>
              
              <div className="w-full bg-background rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>

              {currentFile && (
                <div className="text-xs text-muted-foreground truncate">
                  Current: {currentFile}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isScanning || isAnalyzing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleStartScan}
              disabled={!isElectron || selectedPaths.length === 0 || isScanning || isAnalyzing}
            >
              {(isScanning || isAnalyzing) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Start Scanning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
