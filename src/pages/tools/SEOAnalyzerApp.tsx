import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, ArrowLeft, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

interface SEOAnalysis {
  seoScore: number;
  keywordDensity: number;
  readabilityScore: number;
  recommendations: Array<{
    category: 'critical' | 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }>;
}

export default function SEOAnalyzerApp() {
  const [content, setContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const { trackToolUsage } = useAnalytics();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
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

      const { data, error } = await supabase.functions.invoke('analyze-seo', {
        body: { content, targetKeyword }
      });

      if (error) throw error;

      setAnalysis(data);
      trackToolUsage('SEO Analyzer');
      toast({
        title: "Analysis Complete",
        description: "Your SEO analysis is ready!",
      });
    } catch (error: any) {
      console.error('Error analyzing content:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to analyze content",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'success':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>SEO Analyzer Tool | PLR Organizer Pro</title>
        <meta name="description" content="Analyze your PLR content for SEO optimization with AI-powered recommendations" />
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
            <h1 className="text-4xl font-bold mb-4">SEO Analyzer</h1>
            <p className="text-lg text-muted-foreground">
              Get comprehensive SEO analysis and recommendations for your PLR content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Content to Analyze</CardTitle>
                <CardDescription>Enter your PLR content for SEO analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Target Keyword (Optional)</label>
                  <Input
                    placeholder="e.g., PLR content optimization"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <Textarea
                    placeholder="Paste your content here for analysis..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  <div className="mt-2 text-sm text-muted-foreground">
                    {content.length} characters
                  </div>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !content.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <BarChart className="mr-2 h-5 w-5 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart className="mr-2 h-5 w-5" />
                      Analyze SEO
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {analysis && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.seoScore)}`}>
                        {analysis.seoScore}/100
                      </div>
                      <Progress value={analysis.seoScore} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Density</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{analysis.keywordDensity.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">
                        Ideal range: 1-3%
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Readability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className={`text-2xl font-bold ${getScoreColor(analysis.readabilityScore)}`}>
                        {analysis.readabilityScore}/100
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Flesch-Kincaid scale
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Actionable steps to improve your content's SEO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getCategoryIcon(rec.category)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{rec.title}</h4>
                          <Badge variant={getCategoryColor(rec.category) as any}>
                            {rec.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}