import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowUpDown, Upload, X, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ScannedFile {
  path: string;
  name: string;
  size: number;
  type: string;
  selected?: boolean;
  plrScore?: number;
  confidence?: string;
  suggestedNiche?: string;
  licenseType?: string;
  targetFolder?: string;
  aiReasoning?: string;
}

interface PLRScanResultsProps {
  files: ScannedFile[];
  onClose: () => void;
  onImportComplete?: () => void;
}

const NICHES = [
  "Health & Fitness",
  "Make Money Online",
  "Self-Help",
  "Business",
  "Technology",
  "Lifestyle",
  "Finance",
  "Marketing",
  "Relationships",
  "Education",
  "Uncategorized"
];

export function PLRScanResults({ files: initialFiles, onClose, onImportComplete }: PLRScanResultsProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState(initialFiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterConfidence, setFilterConfidence] = useState<string>("all");
  const [isImporting, setIsImporting] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>("plrScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const selectedCount = files.filter(f => f.selected).length;

  const handleToggleFile = (index: number) => {
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, selected: !f.selected } : f
    ));
  };

  const handleToggleAll = () => {
    const newSelected = selectedCount === 0;
    setFiles(prev => prev.map(f => ({ ...f, selected: newSelected })));
  };

  const handleNicheChange = (index: number, niche: string) => {
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, suggestedNiche: niche } : f
    ));
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const handleImport = async () => {
    const selectedFiles = files.filter(f => f.selected);
    
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file to import",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to import files",
          variant: "destructive"
        });
        return;
      }

      let successCount = 0;
      let errorCount = 0;

      for (const file of selectedFiles) {
        try {
          // Upload file to Supabase Storage
          const fileExt = file.type;
          const fileName = `${Date.now()}_${file.name}`;
          const filePath = `${session.data.session.user.id}/${fileName}`;

          // Read file from local system (Electron API)
          const fileData = await fetch(`file://${file.path}`).then(r => r.blob());
          
          const { error: uploadError } = await supabase.storage
            .from('plr-files')
            .upload(filePath, fileData);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('plr-files')
            .getPublicUrl(filePath);

          // Find matching category
          const categories = await supabase
            .from('categories')
            .select('id, name')
            .limit(20);

          let categoryId = categories.data?.find(c => 
            c.name.toLowerCase().includes(file.suggestedNiche?.toLowerCase() || '')
          )?.id;

          if (!categoryId && categories.data && categories.data.length > 0) {
            categoryId = categories.data[0].id;
          }

          // Create PLR item record
          const { error: insertError } = await supabase
            .from('plr_items')
            .insert({
              user_id: session.data.session.user.id,
              category_id: categoryId,
              title: file.name,
              description: `Imported from file scanner. Confidence: ${file.confidence}, License: ${file.licenseType}`,
              file_url: publicUrl,
              file_size: file.size,
              file_type: file.type,
              license_type: file.licenseType || 'Unknown',
              quality_rating: file.confidence === 'high' ? 'A' : file.confidence === 'medium' ? 'B' : 'C'
            });

          if (insertError) throw insertError;

          successCount++;
        } catch (error) {
          console.error('Error importing file:', error);
          errorCount++;
        }
      }

      toast({
        title: "Import Complete",
        description: `Successfully imported ${successCount} files. ${errorCount > 0 ? `${errorCount} failed.` : ''}`
      });

      if (onImportComplete) {
        onImportComplete();
      }

      onClose();
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Failed",
        description: "An error occurred during import",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  // Filter and sort files
  let filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConfidence = filterConfidence === "all" || file.confidence === filterConfidence;
    return matchesSearch && matchesConfidence;
  });

  filteredFiles = [...filteredFiles].sort((a, b) => {
    let aVal: any = a[sortColumn as keyof ScannedFile];
    let bVal: any = b[sortColumn as keyof ScannedFile];
    
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getConfidenceBadge = (confidence?: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      high: "default",
      medium: "secondary",
      low: "outline"
    };
    
    return (
      <Badge variant={variants[confidence || 'low']}>
        {confidence?.toUpperCase() || 'UNKNOWN'}
      </Badge>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex flex-col h-[80vh] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedCount} of {files.length} files selected
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={filterConfidence} onValueChange={setFilterConfidence}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter confidence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Confidence</SelectItem>
            <SelectItem value="high">High Only</SelectItem>
            <SelectItem value="medium">Medium Only</SelectItem>
            <SelectItem value="low">Low Only</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleToggleAll} variant="outline">
          {selectedCount === files.length ? 'Deselect All' : 'Select All'}
        </Button>
      </div>

      {/* Results Table */}
      <ScrollArea className="flex-1 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedCount === files.length && files.length > 0}
                  onCheckedChange={handleToggleAll}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  Filename
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('size')}>
                <div className="flex items-center gap-1">
                  Size
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('plrScore')}>
                <div className="flex items-center gap-1">
                  PLR Score
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>License</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox 
                    checked={file.selected}
                    onCheckedChange={() => handleToggleFile(index)}
                  />
                </TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{formatFileSize(file.size)}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 cursor-help">
                          {file.plrScore}%
                          {file.aiReasoning && <Info className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </TooltipTrigger>
                      {file.aiReasoning && (
                        <TooltipContent className="max-w-sm">
                          <p className="text-sm">{file.aiReasoning}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{getConfidenceBadge(file.confidence)}</TableCell>
                <TableCell>
                  <Select 
                    value={file.suggestedNiche} 
                    onValueChange={(value) => handleNicheChange(index, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NICHES.map(niche => (
                        <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{file.licenseType}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleImport} disabled={selectedCount === 0 || isImporting}>
          {isImporting && <Upload className="mr-2 h-4 w-4 animate-pulse" />}
          Import {selectedCount} Selected File{selectedCount !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  );
}
