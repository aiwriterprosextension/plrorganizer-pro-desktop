import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface BulkDeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  itemCount: number;
  loading: boolean;
}

export default function BulkDeleteConfirmDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  itemCount,
  loading 
}: BulkDeleteConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Delete {itemCount} Items?
          </DialogTitle>
          <DialogDescription>
            This will permanently delete {itemCount} PLR {itemCount === 1 ? 'item' : 'items'} and their associated files from storage. 
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>What will be deleted:</strong>
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside mt-2">
            <li>{itemCount} database {itemCount === 1 ? 'record' : 'records'}</li>
            <li>Associated files from storage</li>
            <li>All metadata and tags</li>
            <li>Usage history</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Items'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
