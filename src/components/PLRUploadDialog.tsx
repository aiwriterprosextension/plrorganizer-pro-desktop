import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Upload, Loader2 } from "lucide-react";

interface PLRUploadDialogProps {
  categories: any[];
  onUploadComplete: () => void;
}

export default function PLRUploadDialog({ categories, onUploadComplete }: PLRUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [tags, setTags] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [attributionRequired, setAttributionRequired] = useState(false);
  const [licenseExpiresAt, setLicenseExpiresAt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [aiAssessing, setAiAssessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !categoryId) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and select a file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('plr-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('plr-files')
        .getPublicUrl(fileName);

      // Optional: AI quality assessment
      let aiAssessment = null;
      if (title && description) {
        setAiAssessing(true);
        try {
          const { data: assessData } = await supabase.functions.invoke('assess-quality', {
            body: { 
              title, 
              description: description || title,
              fileType: file.type 
            }
          });
          aiAssessment = assessData;
        } catch (aiError) {
          console.error('AI assessment failed:', aiError);
          // Continue without AI assessment
        } finally {
          setAiAssessing(false);
        }
      }

      // Create PLR item record
      const { error: insertError } = await supabase
        .from('plr_items')
        .insert({
          user_id: user.id,
          title,
          description,
          category_id: categoryId,
          license_type: licenseType || null,
          tags: tags ? tags.split(',').map(t => t.trim()) : null,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          seller_name: sellerName || null,
          purchase_price: purchasePrice ? parseFloat(purchasePrice) : null,
          purchase_date: purchaseDate || null,
          attribution_required: attributionRequired,
          license_expires_at: licenseExpiresAt || null,
          quality_rating: aiAssessment?.quality_score || null,
          niche: aiAssessment?.niche || null,
          sub_niche: aiAssessment?.sub_niche || null,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "PLR item uploaded successfully",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategoryId("");
      setLicenseType("");
      setTags("");
      setSellerName("");
      setPurchasePrice("");
      setPurchaseDate("");
      setAttributionRequired(false);
      setLicenseExpiresAt("");
      setFile(null);
      setOpen(false);
      onUploadComplete();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Upload className="mr-2 h-5 w-5" />
          Upload PLR Content
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload PLR Content</DialogTitle>
          <DialogDescription>
            Add a new PLR item to your library. Fill in the details and upload your file.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter PLR item title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your PLR content"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
              <Label htmlFor="license">License Type</Label>
              <Input
                id="license"
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
                placeholder="e.g., PLR, MRR, RR"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., marketing, social media, templates"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seller">Seller Name</Label>
                <Input
                  id="seller"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Where did you buy this?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Purchase Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiresAt">License Expires</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={licenseExpiresAt}
                  onChange={(e) => setLicenseExpiresAt(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="attribution"
                checked={attributionRequired}
                onChange={(e) => setAttributionRequired(e.target.checked)}
                className="rounded border-input"
              />
              <Label htmlFor="attribution" className="cursor-pointer">
                Attribution required for this content
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File *</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                required
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading || aiAssessing}>
              {uploading || aiAssessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {aiAssessing ? "Analyzing..." : "Uploading..."}
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
