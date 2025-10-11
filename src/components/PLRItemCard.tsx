import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Download, Edit, Trash2, Loader2, FileText, Shield, AlertTriangle } from "lucide-react";

interface PLRItemCardProps {
  item: any;
  categories: any[];
  onUpdate: () => void;
}

export default function PLRItemCard({ item, categories, onUpdate }: PLRItemCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || "");
  const [categoryId, setCategoryId] = useState(item.category_id);
  const [licenseType, setLicenseType] = useState(item.license_type || "");
  const [tags, setTags] = useState(item.tags?.join(", ") || "");
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!item.file_url) return;
    
    try {
      const link = document.createElement('a');
      link.href = item.file_url;
      link.download = item.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your file is being downloaded",
      });
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!title || !categoryId) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('plr_items')
        .update({
          title,
          description,
          category_id: categoryId,
          license_type: licenseType || null,
          tags: tags ? tags.split(',').map(t => t.trim()) : null,
        })
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "PLR item updated successfully",
      });

      setEditOpen(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Delete file from storage
      if (item.file_url) {
        const fileName = item.file_url.split('/').slice(-2).join('/');
        await supabase.storage.from('plr-files').remove([fileName]);
      }

      // Delete database record
      const { error } = await supabase
        .from('plr_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "PLR item deleted successfully",
      });

      setDeleteOpen(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {item.categories && (
                <Badge variant="secondary">{item.categories.name}</Badge>
              )}
              {item.license_type && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {item.license_type}
                </Badge>
              )}
              {item.quality_rating && (
                <Badge 
                  variant={
                    item.quality_rating === 'A' ? 'default' : 
                    item.quality_rating === 'B' ? 'secondary' : 
                    item.quality_rating === 'C' ? 'outline' : 
                    'destructive'
                  }
                >
                  Quality: {item.quality_rating}
                </Badge>
              )}
            </div>
            {item.attribution_required && (
              <div className="flex items-center gap-1 text-warning text-xs">
                <AlertTriangle className="h-3 w-3" />
                <span>Attribution required</span>
              </div>
            )}
            {item.license_restrictions && item.license_restrictions.length > 0 && (
              <div className="flex items-center gap-1 text-warning text-xs">
                <AlertTriangle className="h-3 w-3" />
                <span>{item.license_restrictions.length} restriction(s)</span>
              </div>
            )}
            {item.file_size && (
              <p className="text-xs text-muted-foreground">
                Size: {(item.file_size / 1024).toFixed(2)} KB
              </p>
            )}
            {item.seller_name && (
              <p className="text-xs text-muted-foreground">
                Seller: {item.seller_name}
              </p>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit PLR Item</DialogTitle>
            <DialogDescription>Update the details of your PLR content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category *</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
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
            <div className="space-y-2">
              <Label htmlFor="edit-license">License Type</Label>
              <Input
                id="edit-license"
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
              <Input
                id="edit-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete PLR Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{item.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
