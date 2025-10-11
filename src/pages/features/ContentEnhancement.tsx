import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Wand2, Languages, FileEdit, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function ContentEnhancement() {
  useEffect(() => {
    document.title = "Content Enhancement Tools - Spin, Edit & Optimize PLR Content | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Enhance your PLR content with powerful editing, spinning, and optimization tools. Create unique, high-quality content with AI-powered rewriting and translation features.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Content Enhancement Tools for PLR
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your PLR content into unique, high-quality material with powerful editing, spinning, and optimization tools powered by AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <Card>
              <CardContent className="p-6">
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">AI Content Rewriting</h2>
                <p className="text-muted-foreground mb-4">
                  Use advanced AI to rewrite and improve your PLR content, making it unique while maintaining the original meaning and quality.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multiple rewriting styles and tones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Plagiarism-free content generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Preserve SEO keywords automatically</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Wand2 className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Content Spinning</h2>
                <p className="text-muted-foreground mb-4">
                  Create multiple unique versions of your PLR content with intelligent article spinning that maintains readability and quality.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Smart synonym replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Sentence structure variation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Generate unlimited unique versions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FileEdit className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Built-in Editor</h2>
                <p className="text-muted-foreground mb-4">
                  Edit your PLR content directly in the platform with a rich text editor featuring formatting, images, and real-time preview.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Rich text formatting options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Image upload and management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Version history and rollback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Languages className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Multi-Language Translation</h2>
                <p className="text-muted-foreground mb-4">
                  Translate your PLR content into multiple languages to reach global audiences and expand your market reach.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Support for 50+ languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Context-aware translation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Bulk translation for efficiency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Transform Your PLR Content Today</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Create unique, high-quality content with powerful enhancement tools
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
