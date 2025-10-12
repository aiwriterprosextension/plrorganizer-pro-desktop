import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useBulkOperations() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const bulkUpdateNiche = async (itemIds: string[], niche: string, subNiche?: string) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('plr_items')
        .update({ niche, sub_niche: subNiche })
        .in('id', itemIds);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `Updated niche for ${itemIds.length} items`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };
  
  const bulkAddTags = async (itemIds: string[], newTags: string[]) => {
    setIsProcessing(true);
    try {
      const { data: items } = await supabase
        .from('plr_items')
        .select('id, tags')
        .in('id', itemIds);
      
      if (!items) throw new Error('Failed to fetch items');
      
      const updates = items.map(item => ({
        id: item.id,
        tags: Array.from(new Set([...(item.tags || []), ...newTags]))
      }));
      
      await Promise.all(
        updates.map(update =>
          supabase
            .from('plr_items')
            .update({ tags: update.tags })
            .eq('id', update.id)
        )
      );
      
      toast({
        title: 'Success',
        description: `Added tags to ${itemIds.length} items`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };
  
  const bulkSetLicense = async (itemIds: string[], licenseType: string, restrictions?: string) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('plr_items')
        .update({ 
          license_type: licenseType, 
          license_restrictions: restrictions 
        })
        .in('id', itemIds);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `Updated license for ${itemIds.length} items`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };
  
  const bulkMarkFavorite = async (itemIds: string[], isFavorite: boolean) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('plr_items')
        .update({ is_favorite: isFavorite })
        .in('id', itemIds);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `${isFavorite ? 'Added' : 'Removed'} ${itemIds.length} items ${isFavorite ? 'to' : 'from'} favorites`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };
  
  const bulkDelete = async (itemIds: string[]) => {
    setIsProcessing(true);
    try {
      const { data: items } = await supabase
        .from('plr_items')
        .select('file_url, user_id')
        .in('id', itemIds);
      
      if (items && items.length > 0) {
        const fileNames = items
          .filter(item => item.file_url)
          .map(item => {
            const parts = item.file_url.split('/');
            return `${item.user_id}/${parts[parts.length - 1]}`;
          });
        
        if (fileNames.length > 0) {
          await supabase.storage.from('plr-files').remove(fileNames);
        }
      }
      
      const { error } = await supabase
        .from('plr_items')
        .delete()
        .in('id', itemIds);
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `Deleted ${itemIds.length} items`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };
  
  const bulkExportCSV = (items: any[]) => {
    try {
      const headers = [
        'Title',
        'Niche',
        'Sub-Niche',
        'Category',
        'License Type',
        'Quality Rating',
        'File Size (MB)',
        'Tags',
        'Seller',
        'Purchase Price',
        'Purchase Date',
        'Created Date',
        'File Path',
      ];
      
      const rows = items.map(item => [
        item.title,
        item.niche || '',
        item.sub_niche || '',
        item.categories?.name || '',
        item.license_type || '',
        item.quality_rating || '',
        item.file_size ? (item.file_size / 1024 / 1024).toFixed(2) : '',
        (item.tags || []).join('; '),
        item.seller_name || '',
        item.purchase_price || '',
        item.purchase_date || '',
        new Date(item.created_at).toLocaleDateString(),
        item.file_url || '',
      ]);
      
      const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plr-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Export Complete',
        description: `Exported ${items.length} items to CSV`,
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: 'Export Failed',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false, error };
    }
  };
  
  return {
    bulkUpdateNiche,
    bulkAddTags,
    bulkSetLicense,
    bulkMarkFavorite,
    bulkDelete,
    bulkExportCSV,
    isProcessing,
  };
}
