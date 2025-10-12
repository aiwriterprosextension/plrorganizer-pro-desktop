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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface BulkLicenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (licenseType: string, restrictions?: string) => Promise<void>;
  itemCount: number;
}

const LICENSE_TYPES = [
  'Private Label Rights (PLR)',
  'Master Resell Rights (MRR)',
  'Resell Rights (RR)',
  'Personal Use Only',
  'Unrestricted Use',
];

export default function BulkLicenseDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  itemCount 
}: BulkLicenseDialogProps) {
  const [licenseType, setLicenseType] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleConfirm = async () => {
    if (!licenseType) return;
    
    setLoading(true);
    await onConfirm(licenseType, restrictions || undefined);
    setLoading(false);
    setLicenseType('');
    setRestrictions('');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set License for {itemCount} Items</DialogTitle>
          <DialogDescription>
            Set the license type and restrictions for all selected PLR items
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="licenseType">License Type *</Label>
            <Select value={licenseType} onValueChange={setLicenseType}>
              <SelectTrigger id="licenseType">
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                {LICENSE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="restrictions">Restrictions (Optional)</Label>
            <Textarea
              id="restrictions"
              placeholder="Any license restrictions or special conditions..."
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!licenseType || loading}>
            {loading ? 'Updating...' : 'Update License'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
