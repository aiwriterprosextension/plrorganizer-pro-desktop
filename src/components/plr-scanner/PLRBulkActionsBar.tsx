import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckSquare,
  ChevronDown,
  Copy,
  Download,
  FolderOpen,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react";

interface PLRBulkActionsBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onSetNiche: () => void;
  onAddTags: () => void;
  onSetLicense: () => void;
  onChangeTargetFolder: () => void;
  onMarkDuplicate: () => void;
  onExport: () => void;
  onAddToFavorites: () => void;
  onDelete: () => void;
}

export default function PLRBulkActionsBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onSetNiche,
  onAddTags,
  onSetLicense,
  onChangeTargetFolder,
  onMarkDuplicate,
  onExport,
  onAddToFavorites,
  onDelete,
}: PLRBulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="border-b bg-muted/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-primary" />
            <span className="font-semibold">{selectedCount} items selected</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSelectAll}>
              Select All ({totalCount})
            </Button>
            <Button variant="outline" size="sm" onClick={onDeselectAll}>
              <X className="w-3 h-3 mr-1" />
              Deselect All
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Set Niche
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onSetNiche}>
                Change Niche Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={onAddTags}>
            <Tag className="w-3 h-3 mr-1" />
            Add Tags
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Set License
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onSetLicense}>
                Change License Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={onChangeTargetFolder}>
            <FolderOpen className="w-3 h-3 mr-1" />
            Change Target
          </Button>

          <Button variant="outline" size="sm" onClick={onMarkDuplicate}>
            <Copy className="w-3 h-3 mr-1" />
            Mark as Duplicate
          </Button>

          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="w-3 h-3 mr-1" />
            Export CSV
          </Button>

          <Button variant="outline" size="sm" onClick={onAddToFavorites}>
            <Star className="w-3 h-3 mr-1" />
            Add to Favorites
          </Button>

          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="w-3 h-3 mr-1" />
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
}
