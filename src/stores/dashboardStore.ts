import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FilterOptions {
  confidenceLevels: number[];
  niches: string[];
  licenseTypes: string[];
  fileTypes: string[];
  showDuplicatesOnly: boolean;
  showFavoritesOnly: boolean;
  qualityRatings: string[];
  dateRange?: { from: Date; to: Date };
  sizeRange?: { min: number; max: number };
}

interface DashboardState {
  // View State
  viewMode: 'grid' | 'table' | 'list';
  itemsPerPage: number;
  currentPage: number;
  
  // Search & Filter
  searchQuery: string;
  filters: FilterOptions;
  activeFilterCount: number;
  
  // Selection
  selectedItems: Set<string>;
  lastSelectedId: string | null;
  
  // Sorting
  sortBy: 'created_at' | 'title' | 'file_size' | 'scan_confidence' | 'niche' | 'purchase_date';
  sortOrder: 'asc' | 'desc';
  
  // UI State
  showFilterSidebar: boolean;
  showAdvancedSearch: boolean;
  
  // Actions
  setViewMode: (mode: 'grid' | 'table' | 'list') => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  
  // Selection Actions
  toggleItemSelection: (id: string) => void;
  selectItems: (ids: string[]) => void;
  deselectAll: () => void;
  selectAll: (ids: string[]) => void;
  
  // Sorting
  setSortBy: (field: string) => void;
  toggleSortOrder: () => void;
  
  // UI Actions
  toggleFilterSidebar: () => void;
  toggleAdvancedSearch: () => void;
  setCurrentPage: (page: number) => void;
}

const defaultFilters: FilterOptions = {
  confidenceLevels: [],
  niches: [],
  licenseTypes: [],
  fileTypes: [],
  showDuplicatesOnly: false,
  showFavoritesOnly: false,
  qualityRatings: [],
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial State
      viewMode: 'grid',
      itemsPerPage: 50,
      currentPage: 1,
      searchQuery: '',
      filters: defaultFilters,
      activeFilterCount: 0,
      selectedItems: new Set<string>(),
      lastSelectedId: null,
      sortBy: 'created_at',
      sortOrder: 'desc',
      showFilterSidebar: true,
      showAdvancedSearch: false,
      
      // View Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      
      // Search & Filter Actions
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
      
      setFilters: (newFilters) => {
        const filters = { ...get().filters, ...newFilters };
        const activeCount = Object.entries(filters).reduce((count, [key, value]) => {
          if (key === 'showDuplicatesOnly' || key === 'showFavoritesOnly') {
            return count + (value ? 1 : 0);
          }
          if (key === 'dateRange' || key === 'sizeRange') {
            return count + (value ? 1 : 0);
          }
          return count + (Array.isArray(value) ? value.length : 0);
        }, 0);
        
        set({ filters, activeFilterCount: activeCount, currentPage: 1 });
      },
      
      resetFilters: () => set({ 
        filters: defaultFilters, 
        activeFilterCount: 0,
        searchQuery: '',
        currentPage: 1 
      }),
      
      // Selection Actions
      toggleItemSelection: (id) => {
        const selectedItems = new Set(get().selectedItems);
        if (selectedItems.has(id)) {
          selectedItems.delete(id);
        } else {
          selectedItems.add(id);
        }
        set({ selectedItems, lastSelectedId: id });
      },
      
      selectItems: (ids) => {
        const selectedItems = new Set(get().selectedItems);
        ids.forEach(id => selectedItems.add(id));
        set({ selectedItems });
      },
      
      deselectAll: () => set({ selectedItems: new Set<string>(), lastSelectedId: null }),
      
      selectAll: (ids) => set({ selectedItems: new Set(ids) }),
      
      // Sorting Actions
      setSortBy: (field) => set({ sortBy: field as any }),
      toggleSortOrder: () => set({ sortOrder: get().sortOrder === 'asc' ? 'desc' : 'asc' }),
      
      // UI Actions
      toggleFilterSidebar: () => set({ showFilterSidebar: !get().showFilterSidebar }),
      toggleAdvancedSearch: () => set({ showAdvancedSearch: !get().showAdvancedSearch }),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'plr-dashboard-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        itemsPerPage: state.itemsPerPage,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        showFilterSidebar: state.showFilterSidebar,
      }),
    }
  )
);
