import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Session } from "@supabase/supabase-js";
import { Search, LogOut, FolderSearch, Grid3x3, Table2, List, X, SlidersHorizontal } from "lucide-react";
import PLRUploadDialog from "@/components/PLRUploadDialog";
import Header from "@/components/Header";
import { PLRScannerDialog } from "@/components/plr-scanner/PLRScannerDialog";
import PLRFilterSidebar from "@/components/plr-scanner/PLRFilterSidebar";
import PLRAdvancedSearch from "@/components/plr-scanner/PLRAdvancedSearch";
import PLRBulkActionsBar from "@/components/plr-scanner/PLRBulkActionsBar";
import SavedSearchesDropdown from "@/components/dashboard/SavedSearchesDropdown";
import VirtualPLRGrid from "@/components/dashboard/VirtualPLRGrid";
import VirtualPLRTable from "@/components/dashboard/VirtualPLRTable";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useBulkOperations } from "@/hooks/useBulkOperations";
import BulkNicheDialog from "@/components/dialogs/BulkNicheDialog";
import BulkTagsDialog from "@/components/dialogs/BulkTagsDialog";
import BulkLicenseDialog from "@/components/dialogs/BulkLicenseDialog";
import BulkDeleteConfirmDialog from "@/components/dialogs/BulkDeleteConfirmDialog";
import { Badge } from "@/components/ui/badge";

export default function DashboardEnhanced() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [plrItems, setPlrItems] = useState<any[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  
  // Bulk action dialogs
  const [showNicheDialog, setShowNicheDialog] = useState(false);
  const [showTagsDialog, setShowTagsDialog] = useState(false);
  const [showLicenseDialog, setShowLicenseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    selectedItems,
    toggleItemSelection,
    deselectAll,
    selectAll,
    showFilterSidebar,
    toggleFilterSidebar,
    showAdvancedSearch,
    toggleAdvancedSearch,
    sortBy,
    sortOrder,
    activeFilterCount,
    resetFilters,
  } = useDashboardStore();
  
  const {
    bulkUpdateNiche,
    bulkAddTags,
    bulkSetLicense,
    bulkDelete,
    bulkExportCSV,
    bulkMarkFavorite,
    isProcessing,
  } = useBulkOperations();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        loadData();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    // @ts-ignore - Types will be regenerated after migration
    const { data: categoriesData } = await (supabase.from("categories") as any)
      .select("*")
      .order("name");
    
    // @ts-ignore - Types will be regenerated after migration
    const { data: itemsData } = await (supabase.from("plr_items") as any)
      .select("*, categories(name, icon)")
      .order(sortBy, { ascending: sortOrder === 'asc' });

    if (categoriesData) setCategories(categoriesData);
    if (itemsData) setPlrItems(itemsData);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Apply filters and search
  const filteredItems = plrItems.filter(item => {
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.niche?.toLowerCase().includes(query) ||
        item.sub_niche?.toLowerCase().includes(query) ||
        (item.tags || []).some((tag: string) => tag.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }
    
    // Filters
    if (filters.niches.length > 0 && !filters.niches.includes(item.niche)) return false;
    if (filters.licenseTypes.length > 0 && !filters.licenseTypes.includes(item.license_type)) return false;
    if (filters.fileTypes.length > 0 && !filters.fileTypes.includes(item.file_type)) return false;
    if (filters.qualityRatings.length > 0 && !filters.qualityRatings.includes(item.quality_rating)) return false;
    if (filters.showDuplicatesOnly && !item.is_duplicate) return false;
    if (filters.showFavoritesOnly && !item.is_favorite) return false;
    
    return true;
  });

  const handleBulkAction = (action: string) => {
    const selected = Array.from(selectedItems);
    if (selected.length === 0) return;
    
    switch (action) {
      case 'niche':
        setShowNicheDialog(true);
        break;
      case 'tags':
        setShowTagsDialog(true);
        break;
      case 'license':
        setShowLicenseDialog(true);
        break;
      case 'favorite':
        bulkMarkFavorite(selected, true).then(() => {
          loadData();
          deselectAll();
        });
        break;
      case 'export':
        const itemsToExport = plrItems.filter(item => selected.includes(item.id));
        bulkExportCSV(itemsToExport);
        deselectAll();
        break;
      case 'delete':
        setShowDeleteDialog(true);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        {/* Filter Sidebar */}
        {showFilterSidebar && (
          <PLRFilterSidebar
            filters={{
              confidenceLevels: [],
              niches: filters.niches,
              licenseTypes: filters.licenseTypes,
              fileTypes: filters.fileTypes,
              showDuplicatesOnly: filters.showDuplicatesOnly,
            }}
            onFiltersChange={(newFilters) => {
              setFilters({
                niches: newFilters.niches,
                licenseTypes: newFilters.licenseTypes,
                fileTypes: newFilters.fileTypes,
                showDuplicatesOnly: newFilters.showDuplicatesOnly,
              });
            }}
            availableNiches={Array.from(
              plrItems.reduce((acc, item) => {
                if (item.niche) {
                  const count = acc.get(item.niche) || 0;
                  acc.set(item.niche, count + 1);
                }
                return acc;
              }, new Map<string, number>())
            ).map(([niche, count]) => ({ niche, count }))}
            totalFiltered={filteredItems.length}
            totalItems={plrItems.length}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your PLR Library</h1>
              <p className="text-muted-foreground">
                {filteredItems.length} of {plrItems.length} items
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
                  </Badge>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              {!showFilterSidebar && (
                <Button variant="outline" onClick={toggleFilterSidebar}>
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowScanner(true)}>
                <FolderSearch className="mr-2 h-4 w-4" />
                Scan Computer
              </Button>
              <PLRUploadDialog categories={categories} onUploadComplete={loadData} />
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search PLR items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <SavedSearchesDropdown />
            <Button variant="outline" onClick={toggleAdvancedSearch}>
              Advanced Search
            </Button>
            {(activeFilterCount > 0 || searchQuery) && (
              <Button variant="outline" onClick={resetFilters}>
                Clear All
              </Button>
            )}
            
            {/* View Mode Toggle */}
            <div className="flex gap-1 border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Table2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedItems.size > 0 && (
            <div className="mb-6">
              <PLRBulkActionsBar
                selectedCount={selectedItems.size}
                totalCount={filteredItems.length}
                onSelectAll={() => {
                  const allIds = filteredItems.map(item => item.id);
                  selectAll(allIds);
                }}
                onDeselectAll={deselectAll}
                onSetNiche={() => handleBulkAction('niche')}
                onAddTags={() => handleBulkAction('tags')}
                onSetLicense={() => handleBulkAction('license')}
                onChangeTargetFolder={() => {}}
                onMarkDuplicate={() => {}}
                onExport={() => handleBulkAction('export')}
                onAddToFavorites={() => handleBulkAction('favorite')}
                onDelete={() => handleBulkAction('delete')}
              />
            </div>
          )}

          {/* PLR Items Display */}
          <section>
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {plrItems.length === 0 
                    ? "No PLR items yet. Start by uploading your first content!"
                    : "No items match your search or filter criteria."}
                </p>
                {plrItems.length === 0 && (
                  <PLRUploadDialog categories={categories} onUploadComplete={loadData} />
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <VirtualPLRGrid
                items={filteredItems}
                categories={categories}
                onUpdate={loadData}
                selectedItems={selectedItems}
                onToggleSelection={toggleItemSelection}
              />
            ) : (
              <VirtualPLRTable
                items={filteredItems}
                categories={categories}
                onUpdate={loadData}
              />
            )}
          </section>
        </main>
      </div>

      {/* Dialogs */}
      <PLRScannerDialog 
        open={showScanner}
        onOpenChange={setShowScanner}
        onImportComplete={loadData}
      />
      
      <PLRAdvancedSearch
        open={showAdvancedSearch}
        onOpenChange={toggleAdvancedSearch}
        onSearch={(criteria) => {
          setSearchQuery(criteria.keyword);
          setFilters({
            niches: criteria.niche === 'all' ? [] : [criteria.niche],
            licenseTypes: criteria.license === 'all' ? [] : [criteria.license],
            fileTypes: criteria.contentType === 'all' ? [] : [criteria.contentType],
          });
        }}
      />
      
      <BulkNicheDialog
        open={showNicheDialog}
        onOpenChange={setShowNicheDialog}
        onConfirm={async (niche, subNiche) => {
          await bulkUpdateNiche(Array.from(selectedItems), niche, subNiche);
          loadData();
          deselectAll();
        }}
        itemCount={selectedItems.size}
      />
      
      <BulkTagsDialog
        open={showTagsDialog}
        onOpenChange={setShowTagsDialog}
        onConfirm={async (tags) => {
          await bulkAddTags(Array.from(selectedItems), tags);
          loadData();
          deselectAll();
        }}
        itemCount={selectedItems.size}
      />
      
      <BulkLicenseDialog
        open={showLicenseDialog}
        onOpenChange={setShowLicenseDialog}
        onConfirm={async (licenseType, restrictions) => {
          await bulkSetLicense(Array.from(selectedItems), licenseType, restrictions);
          loadData();
          deselectAll();
        }}
        itemCount={selectedItems.size}
      />
      
      <BulkDeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={async () => {
          await bulkDelete(Array.from(selectedItems));
          loadData();
          deselectAll();
        }}
        itemCount={selectedItems.size}
        loading={isProcessing}
      />
    </div>
  );
}
