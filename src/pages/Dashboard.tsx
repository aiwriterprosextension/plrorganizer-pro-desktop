import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Session } from "@supabase/supabase-js";
import { FileText, FolderOpen, Tag, ShieldCheck, Search, LogOut, Book, Image, Layout, Video, Music, Code, Package, FolderSearch } from "lucide-react";
import PLRUploadDialog from "@/components/PLRUploadDialog";
import PLRItemCard from "@/components/PLRItemCard";
import Header from "@/components/Header";
import { PLRScannerDialog } from "@/components/plr-scanner/PLRScannerDialog";

const categoryIcons: Record<string, any> = {
  "Articles": FileText,
  "eBooks": Book,
  "Graphics": Image,
  "Templates": Layout,
  "Videos": Video,
  "Audio": Music,
  "Software": Code,
  "Other": Package,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [plrItems, setPlrItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        loadData();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    // @ts-ignore - Types will be regenerated after migration
    const { data: categoriesData } = await (supabase.from("categories") as any)
      .select("*")
      .order("name");
    
    // @ts-ignore - Types will be regenerated after migration
    const { data: itemsData } = await (supabase.from("plr_items") as any)
      .select("*, categories(name, icon)")
      .order("created_at", { ascending: false });

    if (categoriesData) setCategories(categoriesData);
    if (itemsData) setPlrItems(itemsData);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredItems = plrItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your PLR Library</h1>
            <p className="text-muted-foreground">
              Manage and organize your PLR content
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowScanner(true)}>
              <FolderSearch className="mr-2 h-4 w-4" />
              Scan Computer
            </Button>
            <PLRUploadDialog categories={categories} onUploadComplete={loadData} />
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search PLR items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category.name] || FolderOpen;
              const itemCount = plrItems.filter(
                (item) => item.category_id === category.id
              ).length;
              const isSelected = selectedCategory === category.id;

              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                >
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {selectedCategory && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedCategory(null)}
              className="mt-4"
            >
              Clear Filter
            </Button>
          )}
        </section>

        {/* PLR Items Grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory ? 'Filtered' : 'All'} PLR Items ({filteredItems.length})
          </h2>
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  {plrItems.length === 0 
                    ? "No PLR items yet. Start by uploading your first content!"
                    : "No items match your search or filter criteria."}
                </p>
                {plrItems.length === 0 && (
                  <PLRUploadDialog categories={categories} onUploadComplete={loadData} />
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <PLRItemCard 
                  key={item.id} 
                  item={item} 
                  categories={categories}
                  onUpdate={loadData}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <PLRScannerDialog 
        open={showScanner}
        onOpenChange={setShowScanner}
        onImportComplete={loadData}
      />
    </div>
  );
}
