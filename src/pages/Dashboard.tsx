import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { FileText, Book, Image, Code, Video, Music, Layout, Package, LogOut } from "lucide-react";

const categoryIcons = {
  FileText, Book, Image, Code, Video, Music, Layout, Package
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [plrItems, setPlrItems] = useState<any[]>([]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">PLR Organizer Pro</h1>
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your PLR content library</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons] || Package;
            const count = plrItems.filter(item => item.category_id === category.id).length;
            
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent PLR Items</CardTitle>
            <CardDescription>Your latest additions</CardDescription>
          </CardHeader>
          <CardContent>
            {plrItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No PLR items yet. Start adding your content!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {plrItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
