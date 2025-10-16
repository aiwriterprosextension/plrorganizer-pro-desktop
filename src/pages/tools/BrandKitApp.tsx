import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Edit, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

interface BrandKit {
  id: string;
  name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  font_heading: string;
  font_body: string;
  created_at: string;
}

const webSafeFonts = [
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Courier New",
  "Verdana", "Trebuchet MS", "Impact", "Comic Sans MS", "Palatino",
  "Garamond", "Bookman", "Avant Garde", "Inter"
];

export default function BrandKitApp() {
  const [brandKits, setBrandKits] = useState<BrandKit[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    fontHeading: "Inter",
    fontBody: "Inter"
  });
  const { toast } = useToast();
  const { trackToolUsage } = useAnalytics();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use this tool",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    fetchBrandKits();
  };

  const fetchBrandKits = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_kits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBrandKits(data || []);
    } catch (error: any) {
      console.error('Error fetching brand kits:', error);
      toast({
        title: "Error",
        description: "Failed to load brand kits",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const brandKitData = {
        name: formData.name,
        user_id: session.user.id,
        primary_color: formData.primaryColor,
        secondary_color: formData.secondaryColor,
        font_heading: formData.fontHeading,
        font_body: formData.fontBody
      };

      if (editingId) {
        const { error } = await supabase
          .from('brand_kits')
          .update(brandKitData)
          .eq('id', editingId);

        if (error) throw error;
        trackToolUsage('Brand Kit');
        toast({ title: "Success", description: "Brand kit updated successfully!" });
      } else {
        const { error } = await supabase
          .from('brand_kits')
          .insert([brandKitData]);

        if (error) throw error;
        trackToolUsage('Brand Kit');
        toast({ title: "Success", description: "Brand kit created successfully!" });
      }

      setFormData({
        name: "",
        primaryColor: "#3B82F6",
        secondaryColor: "#8B5CF6",
        fontHeading: "Inter",
        fontBody: "Inter"
      });
      setIsCreating(false);
      setEditingId(null);
      fetchBrandKits();
    } catch (error: any) {
      console.error('Error saving brand kit:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save brand kit",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (kit: BrandKit) => {
    setFormData({
      name: kit.name,
      primaryColor: kit.primary_color,
      secondaryColor: kit.secondary_color,
      fontHeading: kit.font_heading,
      fontBody: kit.font_body
    });
    setEditingId(kit.id);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('brand_kits')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Brand kit deleted successfully!" });
      fetchBrandKits();
    } catch (error: any) {
      console.error('Error deleting brand kit:', error);
      toast({
        title: "Error",
        description: "Failed to delete brand kit",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Brand Kit Tool | PLR Organizer Pro</title>
        <meta name="description" content="Create and manage brand kits to maintain consistent branding across your PLR content" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/tools">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Link>
            </Button>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Brand Kit Manager</h1>
              <p className="text-lg text-muted-foreground">
                Create and manage your brand assets for consistent PLR content branding
              </p>
            </div>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Brand Kit
              </Button>
            )}
          </div>

          {isCreating && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingId ? "Edit" : "Create"} Brand Kit</CardTitle>
                <CardDescription>Define your brand colors and fonts</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Brand Kit Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., My Business Brand"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="w-20 h-10 cursor-pointer"
                        />
                        <Input
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          placeholder="#3B82F6"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                          className="w-20 h-10 cursor-pointer"
                        />
                        <Input
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                          placeholder="#8B5CF6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fontHeading">Heading Font</Label>
                      <Select value={formData.fontHeading} onValueChange={(value) => setFormData({ ...formData, fontHeading: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {webSafeFonts.map(font => (
                            <SelectItem key={font} value={font}>{font}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fontBody">Body Font</Label>
                      <Select value={formData.fontBody} onValueChange={(value) => setFormData({ ...formData, fontBody: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {webSafeFonts.map(font => (
                            <SelectItem key={font} value={font}>{font}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit">
                      <Palette className="mr-2 h-4 w-4" />
                      {editingId ? "Update" : "Create"} Brand Kit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingId(null);
                        setFormData({
                          name: "",
                          primaryColor: "#3B82F6",
                          secondaryColor: "#8B5CF6",
                          fontHeading: "Inter",
                          fontBody: "Inter"
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Loading brand kits...
              </div>
            ) : brandKits.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No brand kits yet. Create your first one!
              </div>
            ) : (
              brandKits.map((kit) => (
                <Card key={kit.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{kit.name}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(kit)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(kit.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Colors</div>
                        <div className="flex gap-2">
                          <div
                            className="w-12 h-12 rounded border"
                            style={{ backgroundColor: kit.primary_color }}
                            title={kit.primary_color}
                          />
                          <div
                            className="w-12 h-12 rounded border"
                            style={{ backgroundColor: kit.secondary_color }}
                            title={kit.secondary_color}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Fonts</div>
                        <div className="text-sm text-muted-foreground">
                          <div>Heading: {kit.font_heading}</div>
                          <div>Body: {kit.font_body}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}