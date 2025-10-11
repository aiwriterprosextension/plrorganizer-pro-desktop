import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Zap, Layers, Download, Upload, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function BatchProcessing() {
  useEffect(() => {
    document.title = "Batch Processing Tool - Automate PLR Content Operations | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Process hundreds of PLR files at once with powerful batch operations. Upload, organize, edit, and export multiple files simultaneously with automation workflows.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Batch Processing for PLR Content
            </h1>
            <p className="text-xl text-muted-foreground">
              Save hours of work by processing multiple PLR files simultaneously. Automate repetitive tasks with powerful batch operations and workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <Card>
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Bulk Operations</h2>
                <p className="text-muted-foreground mb-4">
                  Perform operations on hundreds of files at once, including categorization, tagging, editing, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Process unlimited files simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Bulk category and tag assignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Mass file renaming and organization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Upload className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Bulk Upload</h2>
                <p className="text-muted-foreground mb-4">
                  Upload entire folders or multiple files at once with automatic processing and organization.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Drag and drop folder upload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Auto-categorize during upload</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Resume interrupted uploads</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Layers className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Workflow Automation</h2>
                <p className="text-muted-foreground mb-4">
                  Create custom workflows to automate repetitive tasks and apply complex operations to multiple files.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Custom workflow builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Scheduled batch operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Reusable workflow templates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Download className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Bulk Export</h2>
                <p className="text-muted-foreground mb-4">
                  Export multiple files at once in various formats, compressed archives, or organized folder structures.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multi-format batch export</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Automatic ZIP archive creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Preserve folder structure on export</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Process Faster with Batch Operations</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Automate your workflow and save hours with powerful batch processing
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
