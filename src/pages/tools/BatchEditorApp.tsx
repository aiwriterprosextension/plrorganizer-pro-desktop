import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

interface PLRItem {
  id: string;
  title: string;
  description: string | null;
  selected: boolean;
  matchCount?: number;
}

export default function BatchEditorApp() {
  const [plrItems, setPlrItems] = useState<PLRItem[]>([]);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
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
    fetchPLRItems();
  };

  const fetchPLRItems = async () => {
    try {
      const { data, error } = await supabase
        .from('plr_items')
        .select('id, title, description')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlrItems((data || []).map(item => ({ ...item, selected: false })));
    } catch (error: any) {
      console.error('Error fetching PLR items:', error);
      toast({
        title: "Error",
        description: "Failed to load PLR items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    setPlrItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = () => {
    const allSelected = plrItems.every(item => item.selected);
    setPlrItems(items => items.map(item => ({ ...item, selected: !allSelected })));
  };

  const handleAnalyze = () => {
    if (!findText) {
      toast({
        title: "Error",
        description: "Please enter text to find",
        variant: "destructive",
      });
      return;
    }

    const selectedItems = plrItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item",
        variant: "destructive",
      });
      return;
    }

    const updatedItems = plrItems.map(item => {
      if (!item.selected) return item;

      const searchText = caseSensitive ? findText : findText.toLowerCase();
      const contentToSearch = caseSensitive 
        ? `${item.title} ${item.description || ''}`
        : `${item.title} ${item.description || ''}`.toLowerCase();

      const matches = (contentToSearch.match(new RegExp(searchText, 'g')) || []).length;
      return { ...item, matchCount: matches };
    });

    setPlrItems(updatedItems);
    setHasAnalyzed(true);
    
    const totalMatches = updatedItems.reduce((sum, item) => sum + (item.matchCount || 0), 0);
    toast({
      title: "Analysis Complete",
      description: `Found ${totalMatches} matches across ${selectedItems.length} items`,
    });
  };

  const handleApplyChanges = async () => {
    if (!findText || !replaceText) {
      toast({
        title: "Error",
        description: "Please enter both find and replace text",
        variant: "destructive",
      });
      return;
    }

    const selectedItems = plrItems.filter(item => item.selected && (item.matchCount || 0) > 0);
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "No items with matches selected",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const item of selectedItems) {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        
        const updatedTitle = item.title.replace(regex, replaceText);
        const updatedDescription = item.description?.replace(regex, replaceText) || null;

        const { error } = await supabase
          .from('plr_items')
          .update({
            title: updatedTitle,
            description: updatedDescription
          })
          .eq('id', item.id);

        if (error) {
          console.error('Error updating item:', error);
          errorCount++;
        } else {
          successCount++;
        }
      }

      toast({
        title: "Batch Edit Complete",
        description: `Successfully updated ${successCount} items${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      });

      if (successCount > 0) {
        trackToolUsage('Batch Editor');
        setFindText("");
        setReplaceText("");
        setHasAnalyzed(false);
        fetchPLRItems();
      }
    } catch (error: any) {
      console.error('Error in batch edit:', error);
      toast({
        title: "Error",
        description: "Failed to complete batch edit",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedCount = plrItems.filter(item => item.selected).length;
  const totalMatches = plrItems.reduce((sum, item) => sum + (item.matchCount || 0), 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Batch Editor Tool | PLR Organizer Pro</title>
        <meta name="description" content="Find and replace text across multiple PLR items simultaneously" />
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

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Batch Editor</h1>
            <p className="text-lg text-muted-foreground">
              Find and replace text across multiple PLR items at once
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find & Replace</CardTitle>
              <CardDescription>Configure your search and replacement text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="findText">Find</Label>
                  <Input
                    id="findText"
                    value={findText}
                    onChange={(e) => setFindText(e.target.value)}
                    placeholder="Text to find..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="replaceText">Replace with</Label>
                  <Input
                    id="replaceText"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    placeholder="Replacement text..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="caseSensitive"
                  checked={caseSensitive}
                  onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                />
                <Label htmlFor="caseSensitive" className="cursor-pointer">
                  Case sensitive
                </Label>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleAnalyze} disabled={!findText || selectedCount === 0}>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Matches
                </Button>
                <Button
                  onClick={handleApplyChanges}
                  disabled={!hasAnalyzed || isProcessing || totalMatches === 0}
                  variant="default"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {isProcessing ? "Applying..." : "Apply Changes"}
                </Button>
              </div>

              {hasAnalyzed && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm">
                    <strong>Analysis Results:</strong> Found {totalMatches} matches in {selectedCount} selected items
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select PLR Items</span>
                <Button variant="outline" size="sm" onClick={toggleAll}>
                  {plrItems.every(item => item.selected) ? "Deselect All" : "Select All"}
                </Button>
              </CardTitle>
              <CardDescription>
                {selectedCount} of {plrItems.length} items selected
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading PLR items...
                </div>
              ) : plrItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No PLR items found. Upload some items first.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-24">Matches</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plrItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            checked={item.selected}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.description?.substring(0, 100) || "No description"}
                        </TableCell>
                        <TableCell>
                          {hasAnalyzed && item.selected && item.matchCount !== undefined ? (
                            <span className={item.matchCount > 0 ? "text-primary font-semibold" : "text-muted-foreground"}>
                              {item.matchCount}
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}