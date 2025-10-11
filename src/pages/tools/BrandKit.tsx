import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Check, ArrowRight, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function BrandKit() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Brand Kit Tool | Create Consistent Branding Across All PLR Content</title>
        <meta 
          name="description" 
          content="Store logos, colors, fonts and apply them with one click to maintain consistent branding across all your PLR content. Save hours on repetitive branding tasks." 
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Brand Kit Tool: Create a Consistent Brand Identity Across All Your PLR Content</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Tired of manually adding your branding to every PLR file? Our Brand Kit Tool stores your logos, colors, and fonts, then applies them with one click to maintain consistency across all your PLR content. Used by smart marketers to save hours on repetitive branding tasks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="sm:text-lg">
              <Link to="/tools/brand-kit/app">
                Try Brand Kit Now
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
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Logo Bank with Smart Placement</h3>
                    <p className="text-muted-foreground text-sm">
                      Store multiple logo versions and get intelligent placement suggestions for headers, footers, and watermarks based on content type.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Color Palette Storage</h3>
                    <p className="text-muted-foreground text-sm">
                      Save your brand colors with automatic complementary color suggestions to maintain visual harmony across all PLR materials.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Font Pairing Recommendations</h3>
                    <p className="text-muted-foreground text-sm">
                      Get expert font pairing suggestions that complement your brand while maintaining readability across different content formats.
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
                    <h3 className="font-semibold text-lg mb-2">One-Click Application</h3>
                    <p className="text-muted-foreground text-sm">
                      Apply your complete brand kit to any PLR content with a single click, ensuring consistency across all your materials.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground mb-12">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Brand Your PLR Content Consistently?</h2>
              <p className="mb-6 text-lg opacity-90">
                Join marketers who save hours on branding with our Brand Kit Tool
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
