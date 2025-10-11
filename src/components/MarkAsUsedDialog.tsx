import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";

interface MarkAsUsedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemTitle: string;
  onSuccess: () => void;
}

export default function MarkAsUsedDialog({
  open,
  onOpenChange,
  itemId,
  itemTitle,
  onSuccess,
}: MarkAsUsedDialogProps) {
  const [platform, setPlatform] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [revenueGenerated, setRevenueGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform) {
      toast({
        title: "Missing platform",
        description: "Please select where you published this content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("usage_history").insert({
        plr_item_id: itemId,
        user_id: user.id,
        platform,
        published_url: publishedUrl || null,
        notes: notes || null,
        revenue_generated: revenueGenerated ? parseFloat(revenueGenerated) : 0,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Usage history recorded successfully",
      });

      // Reset form
      setPlatform("");
      setPublishedUrl("");
      setNotes("");
      setRevenueGenerated("");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Failed to record usage",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mark "{itemTitle}" as Used</DialogTitle>
          <DialogDescription>
            Track where and how you've deployed this PLR content
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform *</Label>
              <Select value={platform} onValueChange={setPlatform} required>
                <SelectTrigger>
                  <SelectValue placeholder="Where did you publish this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Email">Email Newsletter</SelectItem>
                  <SelectItem value="Course">Online Course</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="eBook">eBook</SelectItem>
                  <SelectItem value="Podcast">Podcast</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Published URL</Label>
              <Input
                id="url"
                type="url"
                value={publishedUrl}
                onChange={(e) => setPublishedUrl(e.target.value)}
                placeholder="https://example.com/my-content"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue Generated ($)</Label>
              <Input
                id="revenue"
                type="number"
                step="0.01"
                value={revenueGenerated}
                onChange={(e) => setRevenueGenerated(e.target.value)}
                placeholder="0.00"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Track income from this specific deployment
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details about this usage..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Usage"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
