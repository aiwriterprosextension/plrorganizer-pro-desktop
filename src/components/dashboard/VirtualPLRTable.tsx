import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VirtualPLRTableProps {
  items: any[];
  categories: any[];
  onUpdate: () => void;
}

export default function VirtualPLRTable({ items, categories, onUpdate }: VirtualPLRTableProps) {
  const { selectedItems, toggleItemSelection, sortBy, sortOrder, setSortBy, toggleSortOrder } = useDashboardStore();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingItem, setDeletingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const handleHeaderClick = (field: string) => {
    if (sortBy === field) {
      toggleSortOrder();
    } else {
      setSortBy(field);
    }
  };
  
  const handleDownload = async (item: any) => {
    if (!item.file_url) return;
    
    const { data } = supabase.storage
      .from('plr-files')
      .getPublicUrl(item.file_url.split('/').slice(-2).join('/'));
    
    const a = document.createElement('a');
    a.href = data.publicUrl;
    a.download = item.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const handleUpdate = async () => {
    if (!editingItem) return;
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('plr_items')
        .update({
          title: editingItem.title,
          description: editingItem.description,
          category_id: editingItem.category_id,
          license_type: editingItem.license_type,
          tags: editingItem.tags || [],
        })
        .eq('id', editingItem.id);
      
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Item updated successfully' });
      setEditingItem(null);
      onUpdate();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!deletingItem) return;
    setLoading(true);
    
    try {
      if (deletingItem.file_url) {
        const fileName = deletingItem.file_url.split('/').slice(-2).join('/');
        await supabase.storage.from('plr-files').remove([fileName]);
      }
      
      const { error } = await supabase
        .from('plr_items')
        .delete()
        .eq('id', deletingItem.id);
      
      if (error) throw error;
      
      toast({ title: 'Success', description: 'Item deleted successfully' });
      setDeletingItem(null);
      onUpdate();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };
  
  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };
  
  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead 
                onClick={() => handleHeaderClick('title')} 
                className="cursor-pointer hover:bg-muted"
              >
                Title <SortIcon field="title" />
              </TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>License</TableHead>
              <TableHead 
                onClick={() => handleHeaderClick('file_size')} 
                className="cursor-pointer hover:bg-muted"
              >
                Size <SortIcon field="file_size" />
              </TableHead>
              <TableHead>Quality</TableHead>
              <TableHead 
                onClick={() => handleHeaderClick('created_at')} 
                className="cursor-pointer hover:bg-muted"
              >
                Added <SortIcon field="created_at" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const isSelected = selectedItems.has(item.id);
              
              return (
                <TableRow key={item.id} className={isSelected ? 'bg-muted' : ''}>
                  <TableCell>
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.niche || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.categories?.name}</Badge>
                  </TableCell>
                  <TableCell>{item.license_type || '-'}</TableCell>
                  <TableCell>
                    {item.file_size ? `${(item.file_size / 1024 / 1024).toFixed(2)} MB` : '-'}
                  </TableCell>
                  <TableCell>
                    {item.quality_rating ? (
                      <Badge variant="outline">{item.quality_rating}</Badge>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleDownload(item)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingItem(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setDeletingItem(item)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit PLR Item</DialogTitle>
            <DialogDescription>Update the details of your PLR item</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editingItem.category_id}
                  onValueChange={(value) => setEditingItem({ ...editingItem, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>License Type</Label>
                <Input
                  value={editingItem.license_type || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, license_type: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete PLR Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingItem?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingItem(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
