import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FolderSearch, Tag, Search, Filter, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function SmartOrganization() {
  useEffect(() => {
    document.title = "Smart Organization Tool - AI-Powered PLR Content Categorization | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Automatically organize and categorize your PLR content with AI-powered smart organization. Tag, filter, and find your content instantly with intelligent content management.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Smart Organization for PLR Content
            </h1>
            <p className="text-xl text-muted-foreground">
              Let AI automatically categorize, tag, and organize your entire PLR library. Find any content in seconds with intelligent search and filtering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <Card>
              <CardContent className="p-6">
                <FolderSearch className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">AI-Powered Categorization</h2>
                <p className="text-muted-foreground mb-4">
                  Our advanced AI analyzes your PLR content and automatically assigns relevant categories, making organization effortless.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Automatic content analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Smart folder structure creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Duplicate detection and removal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Tag className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Intelligent Tagging System</h2>
                <p className="text-muted-foreground mb-4">
                  Automatically generate relevant tags for every piece of content, making search and discovery incredibly fast.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Auto-generated keyword tags</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Custom tag creation and management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Tag-based content grouping</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Search className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Powerful Search Engine</h2>
                <p className="text-muted-foreground mb-4">
                  Find any content instantly with full-text search across all your PLR files, descriptions, and metadata.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full-text content search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced search operators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Search history and saved queries</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Filter className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Advanced Filtering</h2>
                <p className="text-muted-foreground mb-4">
                  Filter your content by type, date, category, license, and custom criteria to find exactly what you need.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multi-criteria filtering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Saved filter presets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sort by relevance, date, or popularity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Organize Your PLR Library?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start managing your content efficiently with smart organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
