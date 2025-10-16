import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from "@supabase/supabase-js";
import { FolderSearch, Upload, CheckCircle2, Loader2, FileArchive, Folder, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PLRScanResults } from "@/components/plr-scanner/PLRScanResults";

interface ScannedPackage {
  path: string;
  name: string;
  type: 'zip' | 'folder';
  size: number;
  children?: ScannedPackage[];
  plrScore?: number;
  confidence?: string;
  suggestedNiche?: string;
}

export default function PLRScanner() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setProgress] = useState(0);
  const [scannedPackages, setScannedPackages] = useState<ScannedPackage[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/auth");
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSelectFolder = async () => {
    if (!window.electronAPI?.isElectron) {
      toast({
        title: "Desktop App Required",
        description: "Local folder scanning requires the desktop application.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await window.electronAPI.openDirectory();
      if (result && result.length > 0) {
        await scanFolders(result);
      }
    } catch (error) {
      console.error("Error selecting folder:", error);
      toast({
        title: "Error",
        description: "Failed to select folder",
        variant: "destructive",
      });
    }
  };

  const scanFolders = async (paths: string[]) => {
    setIsScanning(true);
    setProgress(0);
    const packages: ScannedPackage[] = [];

    try {
      for (const path of paths) {
        const files = await window.electronAPI!.scanDirectory(path, {
          includeSubfolders: true,
          fileTypes: ['.zip', '.rar', '.pdf', '.doc', '.docx'],
        });

        // Organize files into tree structure
        const tree = buildFileTree(files, path);
        packages.push(...tree);
        setProgress((packages.length / files.length) * 100);
      }

      setScannedPackages(packages);
      setShowResults(true);
      
      toast({
        title: "Scan Complete",
        description: `Found ${packages.length} PLR packages`,
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        title: "Scan Failed",
        description: "Error scanning folders",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const buildFileTree = (files: any[], basePath: string): ScannedPackage[] => {
    const tree: ScannedPackage[] = [];
    const pathMap = new Map<string, ScannedPackage>();

    files.forEach(file => {
      const relativePath = file.path.replace(basePath, '').split('/').filter(Boolean);
      const isZip = file.extension?.toLowerCase() === '.zip';
      
      const package_: ScannedPackage = {
        path: file.path,
        name: file.name,
        type: isZip ? 'zip' : 'folder',
        size: file.size,
        children: [],
      };

      if (relativePath.length === 1) {
        tree.push(package_);
      }
      
      pathMap.set(file.path, package_);
    });

    return tree;
  };

  const renderPackageTree = (packages: ScannedPackage[], level = 0) => {
    return packages.map((pkg, index) => (
      <div key={`${pkg.path}-${index}`} style={{ paddingLeft: `${level * 20}px` }} className="py-1">
        <div className="flex items-center gap-2 text-sm">
          {pkg.type === 'zip' ? (
            <FileArchive className="h-4 w-4 text-primary" />
          ) : (
            <Folder className="h-4 w-4 text-secondary" />
          )}
          <span className="font-medium">{pkg.name}</span>
          <CheckCircle2 className="h-3 w-3 text-success ml-auto" />
        </div>
        {pkg.children && pkg.children.length > 0 && (
          <div className="ml-4 border-l border-border pl-2">
            {renderPackageTree(pkg.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (showResults && scannedPackages.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              ← Back to Scanner
            </Button>
          </div>
          <PLRScanResults
            files={scannedPackages.map(pkg => ({
              path: pkg.path,
              name: pkg.name,
              size: pkg.size,
              type: pkg.type,
              selected: false,
            }))}
            onClose={() => setShowResults(false)}
            onImportComplete={() => {
              setShowResults(false);
              navigate("/dashboard");
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">PLR Folder Scanner</h1>
          <p className="text-lg text-muted-foreground">
            Automatically detect and organize PLR packages from your computer
          </p>
        </div>

        {!window.electronAPI?.isElectron && (
          <Alert className="mb-6">
            <AlertDescription>
              <strong>Desktop App Required:</strong> Full folder scanning requires the desktop application. 
              Download it from the Tools page or use the web upload feature instead.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Folder Scanner</CardTitle>
            <CardDescription>
              Select folders to scan for PLR content, or upload ZIP files directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleSelectFolder}
                  disabled={!window.electronAPI?.isElectron || isScanning}
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <FolderSearch className="mr-2 h-5 w-5" />
                      Browse Folders
                    </>
                  )}
                </Button>
                <Button size="lg" variant="outline" disabled={isScanning}>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Zips
                </Button>
              </div>

              {isScanning && (
                <div className="space-y-2">
                  <Progress value={scanProgress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    Scanning folders... {Math.round(scanProgress)}%
                  </p>
                </div>
              )}

              {scannedPackages.length > 0 && !isScanning && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-t pt-4">
                    <h3 className="text-lg font-semibold">Detected Packages</h3>
                    <span className="text-sm text-muted-foreground">
                      Found: {scannedPackages.length} packages
                    </span>
                  </div>
                  
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    {renderPackageTree(scannedPackages)}
                  </ScrollArea>

                  <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <span className="font-medium">
                        Found: {scannedPackages.length} packages | Ready to analyze
                      </span>
                    </div>
                    <Button onClick={() => setShowResults(true)}>
                      Analyze Packages
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            The scanner will detect both zipped (.zip, .rar) and unzipped PLR packages.
            It recursively scans all subfolders to find your content.
          </p>
        </div>
      </main>
    </div>
  );
}
