import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RefreshCw, Copy, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

export default function ContentSpinnerApp() {
  const [originalContent, setOriginalContent] = useState("");
  const [spunContent, setSpunContent] = useState("");
  const [uniquenessLevel, setUniquenessLevel] = useState([50]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { trackToolUsage } = useAnalytics();
  const navigate = useNavigate();

  const handleSpin = async () => {
    if (!originalContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to spin",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    try {
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

      const { data, error } = await supabase.functions.invoke('spin-content', {
        body: { content: originalContent, uniquenessLevel: uniquenessLevel[0] }
      });

      if (error) throw error;

      setSpunContent(data.spunContent);
      trackToolUsage('Content Spinner');
      toast({
        title: "Success",
        description: "Content has been rewritten successfully!",
      });
    } catch (error: any) {
      console.error('Error spinning content:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to spin content",
        variant: "destructive",
      });
    } finally {
      setIsSpinning(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(spunContent);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Spun content copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Content Spinner Tool | PLR Organizer Pro</title>
        <meta name="description" content="Transform generic PLR content into unique, SEO-friendly content using AI-powered rewriting" />
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
            <h1 className="text-4xl font-bold mb-4">Content Spinner</h1>
            <p className="text-lg text-muted-foreground">
              Transform your PLR content into 100% unique, SEO-friendly content using AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Original Content</CardTitle>
                <CardDescription>Paste your PLR content here</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter or paste your original PLR content here..."
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="mt-4 text-sm text-muted-foreground">
                  {originalContent.length} characters
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spun Content</CardTitle>
                <CardDescription>AI-rewritten unique content</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Your unique content will appear here..."
                  value={spunContent}
                  readOnly
                  className="min-h-[300px] resize-none bg-muted"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {spunContent.length} characters
                  </div>
                  {spunContent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Uniqueness Level</CardTitle>
              <CardDescription>
                Adjust how much the content should be rewritten (30% = light changes, 100% = complete rewrite)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={uniquenessLevel}
                  onValueChange={setUniquenessLevel}
                  min={30}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Light (30%)</span>
                  <span className="font-semibold text-primary">{uniquenessLevel[0]}%</span>
                  <span className="text-muted-foreground">Heavy (100%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleSpin}
              disabled={isSpinning || !originalContent.trim()}
              className="min-w-[200px]"
            >
              {isSpinning ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Spinning...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Spin Content
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}