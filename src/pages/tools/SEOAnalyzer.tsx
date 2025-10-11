import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Check, ArrowRight, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function SEOAnalyzer() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR SEO Analyzer | Optimize PLR Content for Search Engines</title>
        <meta 
          name="description" 
          content="Get tailored SEO recommendations to help your PLR content rank higher in search results. PLR-specific scoring, keyword optimization, and readability assessment." 
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">SEO Analyzer: Optimize Your PLR Content for Search Engines</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Want your PLR content to rank on Google? Our SEO Analyzer provides tailored recommendations to help your PLR content rank higher in search results. Get actionable insights used by SEO professionals to turn generic PLR into search-optimized assets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="sm:text-lg">
              <Link to="/tools/seo-analyzer/app">
                Try SEO Analyzer Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="sm:text-lg">
              <a href="#features">
                See Features
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">PLR-Specific SEO Scoring</h3>
                    <p className="text-muted-foreground text-sm">
                      Get a comprehensive SEO score designed specifically for PLR content, identifying unique optimization opportunities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Keyword Optimization Suggestions</h3>
                    <p className="text-muted-foreground text-sm">
                      Receive smart keyword recommendations with optimal density targets to improve your content's search visibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Readability Assessment</h3>
                    <p className="text-muted-foreground text-sm">
                      Analyze content readability with industry-standard scores and get suggestions to make your PLR more accessible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Competitive Analysis</h3>
                    <p className="text-muted-foreground text-sm">
                      See how your PLR content stacks up against top-ranking competitors and get insights to outperform them.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground mb-12">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Boost Your PLR Content's Rankings?</h2>
              <p className="mb-6 text-lg opacity-90">
                Get actionable SEO insights tailored for PLR content
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/auth">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
