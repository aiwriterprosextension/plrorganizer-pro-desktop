import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BulkNicheDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (niche: string, subNiche?: string) => Promise<void>;
  itemCount: number;
}

export default function BulkNicheDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  itemCount 
}: BulkNicheDialogProps) {
  const [niche, setNiche] = useState('');
  const [subNiche, setSubNiche] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleConfirm = async () => {
    if (!niche.trim()) return;
    
    setLoading(true);
    await onConfirm(niche, subNiche || undefined);
    setLoading(false);
    setNiche('');
    setSubNiche('');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Niche for {itemCount} Items</DialogTitle>
          <DialogDescription>
            Set the niche and sub-niche for all selected PLR items
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="niche">Niche *</Label>
            <Input
              id="niche"
              placeholder="e.g., Health & Wellness"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="subNiche">Sub-Niche (Optional)</Label>
            <Input
              id="subNiche"
              placeholder="e.g., Weight Loss"
              value={subNiche}
              onChange={(e) => setSubNiche(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!niche.trim() || loading}>
            {loading ? 'Updating...' : 'Update Niche'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
