import { Button } from "@/components/ui/button";
import { ArrowRight, FolderSearch, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "PLR Organizer Pro - The Intelligent PLR Content Management System";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Organize, Manage, and Monetize Your PLR Content Effortlessly. The most powerful SaaS platform for managing Private Label Rights content.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main>
        {/* Hero Content */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
              Organize, Manage, and Monetize Your PLR Content{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The Intelligent PLR Content Management System that transforms chaos into organized, 
              monetizable assets. Say goodbye to scattered files and hello to streamlined success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Everything You Need to Manage PLR Content
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Powerful tools designed specifically for PLR content creators and marketers
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <FolderSearch className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
                <p className="text-muted-foreground">
                  Automatically categorize and organize your PLR content with AI-powered tagging.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <Sparkles className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Content Enhancement</h3>
                <p className="text-muted-foreground">
                  Spin, edit, and optimize your content with powerful built-in tools.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">License Tracking</h3>
                <p className="text-muted-foreground">
                  Keep track of usage rights and licenses for every piece of content.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <Zap className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
                <p className="text-muted-foreground">
                  Process multiple files at once with powerful automation workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your PLR Workflow?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of content creators who have streamlined their PLR management
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
