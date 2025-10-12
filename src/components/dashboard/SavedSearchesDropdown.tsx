import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bookmark, Pin, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDashboardStore } from '@/stores/dashboardStore';

export default function SavedSearchesDropdown() {
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const { filters, searchQuery, setFilters, setSearchQuery } = useDashboardStore();
  const { toast } = useToast();
  
  useEffect(() => {
    loadSavedSearches();
  }, []);
  
  const loadSavedSearches = async () => {
    // @ts-ignore - Types will be regenerated after migration
    const { data } = await (supabase
      .from('saved_searches') as any)
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (data) setSavedSearches(data);
  };
  
  const saveCurrentSearch = async () => {
    const name = prompt('Name for this saved search:');
    if (!name) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    // @ts-ignore - Types will be regenerated after migration
    const { error } = await (supabase
      .from('saved_searches') as any)
      .insert({
        user_id: user.id,
        name,
        criteria: { filters, searchQuery },
      });
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Saved', description: 'Search saved successfully' });
      loadSavedSearches();
    }
  };
  
  const applySavedSearch = (criteria: any) => {
    setFilters(criteria.filters);
    setSearchQuery(criteria.searchQuery);
    toast({ title: 'Applied', description: 'Search filters applied' });
  };
  
  const deleteSavedSearch = async (id: string) => {
    // @ts-ignore - Types will be regenerated after migration
    const { error } = await (supabase
      .from('saved_searches') as any)
      .delete()
      .eq('id', id);
    
    if (!error) {
      loadSavedSearches();
      toast({ title: 'Deleted', description: 'Saved search removed' });
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Bookmark className="h-4 w-4 mr-2" />
          Saved Searches
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-background z-50">
        <DropdownMenuLabel>Saved Searches</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={saveCurrentSearch}>
          Save Current Search
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {savedSearches.length === 0 ? (
          <DropdownMenuItem disabled>No saved searches</DropdownMenuItem>
        ) : (
          savedSearches.map(search => (
            <DropdownMenuItem 
              key={search.id}
              className="flex items-center justify-between"
              onSelect={(e) => {
                e.preventDefault();
                applySavedSearch(search.criteria);
              }}
            >
              <span className="flex items-center">
                {search.is_pinned && <Pin className="h-3 w-3 mr-1" />}
                {search.name}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSavedSearch(search.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
