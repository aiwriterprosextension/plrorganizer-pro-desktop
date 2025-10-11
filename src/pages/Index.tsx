import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FolderSearch, Sparkles, Shield, Zap, Check, Star, Users, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Index = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Organizer Pro - The Intelligent PLR Content Management System</title>
        <meta name="description" content="Organize, Manage, and Monetize Your PLR Content Effortlessly. The most powerful SaaS platform for managing Private Label Rights content." />
      </Helmet>
      
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

        {/* Social Proof Section */}
        <section className="container mx-auto px-4 py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Trusted by Content Creators Worldwide
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              
              <div className="p-6">
                <FolderSearch className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">500K+</div>
                <p className="text-muted-foreground">PLR Files Organized</p>
              </div>
              
              <div className="p-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">2,000+</div>
                <p className="text-muted-foreground">Hours Saved Monthly</p>
              </div>
              
              <div className="p-6">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <p className="text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How PLR Organizer Pro Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 text-lg">
              Get organized and maximize your PLR content value in three simple steps
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your PLR</h3>
                  <p className="text-muted-foreground">
                    Drag and drop your PLR files or folders. Our system automatically categorizes and organizes everything.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customize & Enhance</h3>
                  <p className="text-muted-foreground">
                    Use our powerful tools to rebrand, spin, and optimize your content for maximum uniqueness and SEO value.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Publish & Profit</h3>
                  <p className="text-muted-foreground">
                    Export your polished content and track licenses to ensure you're always compliant and profitable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose PLR Organizer Pro?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Save Hours Every Week</h3>
                  <p className="text-muted-foreground">
                    Automate tedious organization tasks and focus on growing your business instead of managing files.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Never Lose Track of Licenses</h3>
                  <p className="text-muted-foreground">
                    Built-in license tracking ensures you always know what you can and can't do with your content.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Maximize Content Value</h3>
                  <p className="text-muted-foreground">
                    Transform generic PLR into unique, branded content that stands out and ranks higher in search.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">All-in-One Platform</h3>
                  <p className="text-muted-foreground">
                    Everything you need from organization to editing to publishing in one powerful platform.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Smart AI Tools</h3>
                  <p className="text-muted-foreground">
                    Leverage AI-powered features for content spinning, SEO optimization, and automated categorization.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Scale Your Business</h3>
                  <p className="text-muted-foreground">
                    Process hundreds of files at once with batch operations designed for serious content marketers.
                  </p>
                </div>
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
