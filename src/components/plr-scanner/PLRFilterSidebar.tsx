import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";

export interface FilterOptions {
  confidenceLevels: string[];
  niches: string[];
  licenseTypes: string[];
  fileTypes: string[];
  showDuplicatesOnly: boolean;
}

interface PLRFilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableNiches: Array<{ niche: string; count: number }>;
  totalFiltered: number;
  totalItems: number;
}

export default function PLRFilterSidebar({
  filters,
  onFiltersChange,
  availableNiches,
  totalFiltered,
  totalItems,
}: PLRFilterSidebarProps) {
  const confidenceLevels = [
    { label: "High (90%+)", value: "high", count: 0 },
    { label: "Medium (60-89%)", value: "medium", count: 0 },
    { label: "Low (<60%)", value: "low", count: 0 },
  ];

  const licenseTypes = [
    { label: "PLR", value: "PLR" },
    { label: "MRR", value: "MRR" },
    { label: "RR", value: "RR" },
    { label: "Other", value: "Other" },
  ];

  const fileTypes = [
    { label: "Archives (ZIP/RAR)", value: "archive" },
    { label: "Folders", value: "folder" },
    { label: "All Files", value: "all" },
  ];

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const resetFilters = () => {
    onFiltersChange({
      confidenceLevels: ["high", "medium"],
      niches: [],
      licenseTypes: ["PLR", "MRR", "RR"],
      fileTypes: ["archive"],
      showDuplicatesOnly: false,
    });
  };

  const hasActiveFilters = 
    filters.confidenceLevels.length !== 2 ||
    filters.niches.length > 0 ||
    filters.licenseTypes.length !== 3 ||
    filters.fileTypes.length !== 1 ||
    filters.showDuplicatesOnly;

  return (
    <div className="w-80 border-r bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-7 text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {totalFiltered} of {totalItems} items
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4 space-y-6">
          {/* PLR Confidence */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">PLR Confidence</Label>
            <div className="space-y-2">
              {confidenceLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`confidence-${level.value}`}
                    checked={filters.confidenceLevels.includes(level.value)}
                    onCheckedChange={() => toggleFilter("confidenceLevels", level.value)}
                  />
                  <label
                    htmlFor={`confidence-${level.value}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Niche Categories */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Niche Categories
            </Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableNiches.length === 0 ? (
                <p className="text-sm text-muted-foreground">No niches detected</p>
              ) : (
                availableNiches.map((item) => (
                  <div key={item.niche} className="flex items-center space-x-2">
                    <Checkbox
                      id={`niche-${item.niche}`}
                      checked={filters.niches.includes(item.niche)}
                      onCheckedChange={() => toggleFilter("niches", item.niche)}
                    />
                    <label
                      htmlFor={`niche-${item.niche}`}
                      className="text-sm cursor-pointer flex-1 flex items-center justify-between"
                    >
                      <span>{item.niche || "Unknown"}</span>
                      <Badge variant="secondary" className="ml-2">
                        {item.count}
                      </Badge>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <Separator />

          {/* License Type */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">License Type</Label>
            <div className="space-y-2">
              {licenseTypes.map((license) => (
                <div key={license.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`license-${license.value}`}
                    checked={filters.licenseTypes.includes(license.value)}
                    onCheckedChange={() => toggleFilter("licenseTypes", license.value)}
                  />
                  <label
                    htmlFor={`license-${license.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {license.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* File Type */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">File Type</Label>
            <div className="space-y-2">
              {fileTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filetype-${type.value}`}
                    checked={filters.fileTypes.includes(type.value)}
                    onCheckedChange={() => toggleFilter("fileTypes", type.value)}
                  />
                  <label
                    htmlFor={`filetype-${type.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Duplicates */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Duplicates</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-duplicates"
                checked={filters.showDuplicatesOnly}
                onCheckedChange={(checked) =>
                  onFiltersChange({ ...filters, showDuplicatesOnly: checked === true })
                }
              />
              <label htmlFor="show-duplicates" className="text-sm cursor-pointer">
                Show Only Duplicates
              </label>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
