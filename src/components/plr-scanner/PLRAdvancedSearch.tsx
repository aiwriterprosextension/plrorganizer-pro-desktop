import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { useState } from "react";

interface AdvancedSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (criteria: SearchCriteria) => void;
}

export interface SearchCriteria {
  keyword: string;
  niche: string;
  contentType: string;
  license: string;
  quality: string;
  minConfidence: number;
  minSize: number;
  maxSize: number;
  minPrice: number;
  maxPrice: number;
  dateFrom: string;
  dateTo: string;
  purchaseDateFrom: string;
  purchaseDateTo: string;
  hasNotes: string;
  hasTags: string;
  isFavorite: string;
  isUsed: string;
}

export default function PLRAdvancedSearch({
  open,
  onOpenChange,
  onSearch,
}: AdvancedSearchProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    keyword: "",
    niche: "all",
    contentType: "all",
    license: "all",
    quality: "all",
    minConfidence: 0,
    minSize: 0,
    maxSize: 1000,
    minPrice: 0,
    maxPrice: 10000,
    dateFrom: "",
    dateTo: "",
    purchaseDateFrom: "",
    purchaseDateTo: "",
    hasNotes: "any",
    hasTags: "any",
    isFavorite: "any",
    isUsed: "any",
  });

  const handleSearch = () => {
    onSearch(criteria);
    onOpenChange(false);
  };

  const handleReset = () => {
    setCriteria({
      keyword: "",
      niche: "all",
      contentType: "all",
      license: "all",
      quality: "all",
      minConfidence: 0,
      minSize: 0,
      maxSize: 1000,
      minPrice: 0,
      maxPrice: 10000,
      dateFrom: "",
      dateTo: "",
      purchaseDateFrom: "",
      purchaseDateTo: "",
      hasNotes: "any",
      hasTags: "any",
      isFavorite: "any",
      isUsed: "any",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Advanced Search
          </DialogTitle>
          <DialogDescription>
            Search across all PLR items with advanced filters and criteria.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Keyword Search */}
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword Search</Label>
            <Input
              id="keyword"
              placeholder="Search in filename, notes, and tags..."
              value={criteria.keyword}
              onChange={(e) => setCriteria({ ...criteria, keyword: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Supports: "exact phrase", niche:health, size:&gt;50MB, *wildcard*
            </p>
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="niche">Niche</Label>
              <Select
                value={criteria.niche}
                onValueChange={(value) => setCriteria({ ...criteria, niche: value })}
              >
                <SelectTrigger id="niche">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Niches</SelectItem>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="mmo">Make Money Online</SelectItem>
                  <SelectItem value="self-help">Self-Help</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select
                value={criteria.contentType}
                onValueChange={(value) =>
                  setCriteria({ ...criteria, contentType: value })
                }
              >
                <SelectTrigger id="content-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="articles">Articles</SelectItem>
                  <SelectItem value="ebooks">eBooks</SelectItem>
                  <SelectItem value="graphics">Graphics</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">License Type</Label>
              <Select
                value={criteria.license}
                onValueChange={(value) => setCriteria({ ...criteria, license: value })}
              >
                <SelectTrigger id="license">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Licenses</SelectItem>
                  <SelectItem value="PLR">PLR</SelectItem>
                  <SelectItem value="MRR">MRR</SelectItem>
                  <SelectItem value="RR">RR</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality Rating</Label>
              <Select
                value={criteria.quality}
                onValueChange={(value) => setCriteria({ ...criteria, quality: value })}
              >
                <SelectTrigger id="quality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="A">A - Excellent</SelectItem>
                  <SelectItem value="B">B - Good</SelectItem>
                  <SelectItem value="C">C - Fair</SelectItem>
                  <SelectItem value="D">D - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>PLR Confidence: {criteria.minConfidence}%+</Label>
              <Slider
                value={[criteria.minConfidence]}
                onValueChange={([value]) =>
                  setCriteria({ ...criteria, minConfidence: value })
                }
                max={100}
                step={10}
                className="mt-2"
              />
            </div>
          </div>

          {/* File Size */}
          <div className="space-y-2">
            <Label>File Size (MB)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  placeholder="Min"
                  value={criteria.minSize}
                  onChange={(e) =>
                    setCriteria({ ...criteria, minSize: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max"
                  value={criteria.maxSize}
                  onChange={(e) =>
                    setCriteria({ ...criteria, maxSize: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Purchase Price ($)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  placeholder="Min"
                  value={criteria.minPrice}
                  onChange={(e) =>
                    setCriteria({ ...criteria, minPrice: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max"
                  value={criteria.maxPrice}
                  onChange={(e) =>
                    setCriteria({ ...criteria, maxPrice: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          {/* Date Range - Scanned */}
          <div className="space-y-2">
            <Label>Date Range (Scanned)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="date"
                  value={criteria.dateFrom}
                  onChange={(e) =>
                    setCriteria({ ...criteria, dateFrom: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={criteria.dateTo}
                  onChange={(e) => setCriteria({ ...criteria, dateTo: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Date Range - Purchase */}
          <div className="space-y-2">
            <Label>Purchase Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="date"
                  value={criteria.purchaseDateFrom}
                  onChange={(e) =>
                    setCriteria({ ...criteria, purchaseDateFrom: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={criteria.purchaseDateTo}
                  onChange={(e) =>
                    setCriteria({ ...criteria, purchaseDateTo: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="has-notes">Has Notes</Label>
              <Select
                value={criteria.hasNotes}
                onValueChange={(value) =>
                  setCriteria({ ...criteria, hasNotes: value })
                }
              >
                <SelectTrigger id="has-notes">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="has-tags">Has Tags</Label>
              <Select
                value={criteria.hasTags}
                onValueChange={(value) => setCriteria({ ...criteria, hasTags: value })}
              >
                <SelectTrigger id="has-tags">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="is-favorite">Favorites</Label>
              <Select
                value={criteria.isFavorite}
                onValueChange={(value) =>
                  setCriteria({ ...criteria, isFavorite: value })
                }
              >
                <SelectTrigger id="is-favorite">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="yes">Favorites Only</SelectItem>
                  <SelectItem value="no">Non-Favorites</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="is-used">Usage Status</Label>
              <Select
                value={criteria.isUsed}
                onValueChange={(value) => setCriteria({ ...criteria, isUsed: value })}
              >
                <SelectTrigger id="is-used">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="yes">Used</SelectItem>
                  <SelectItem value="no">Unused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
