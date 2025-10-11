import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Check, ArrowRight, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ContentSpinner() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Content Spinner | Transform Generic PLR into 100% Unique Content</title>
        <meta 
          name="description" 
          content="Use AI to make your PLR content unique and SEO-friendly in seconds. Adjustable uniqueness levels, brand voice preservation, and bulk processing. Avoid duplicate content penalties." 
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Content Spinner: Transform Generic PLR into 100% Unique Content</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Worried about duplicate content penalties? Our Content Spinner uses AI to make your PLR content unique and SEO-friendly in seconds, avoiding duplicate content penalties while preserving your brand voice. Trusted by content creators to transform generic PLR into engaging original content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="sm:text-lg">
              <Link to="/tools/content-spinner/app">
                Try Content Spinner Now
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
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Adjustable Uniqueness Levels</h3>
                    <p className="text-muted-foreground text-sm">
                      Control how much your content changes with precision sliders, from light touch-ups to complete rewrites while maintaining meaning.
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
                    <h3 className="font-semibold text-lg mb-2">Brand Voice Preservation</h3>
                    <p className="text-muted-foreground text-sm">
                      Our AI learns your writing style and maintains your brand voice throughout the spinning process for authentic-sounding content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Bulk Processing Capability</h3>
                    <p className="text-muted-foreground text-sm">
                      Process hundreds of PLR articles simultaneously with consistent quality, saving days of manual rewriting work.
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
                    <h3 className="font-semibold text-lg mb-2">SEO Optimization</h3>
                    <p className="text-muted-foreground text-sm">
                      Automatically optimize spun content for search engines while maintaining natural readability and keyword relevance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground mb-12">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Create Unique Content Instantly?</h2>
              <p className="mb-6 text-lg opacity-90">
                Transform your PLR library into 100% unique, SEO-friendly content
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
