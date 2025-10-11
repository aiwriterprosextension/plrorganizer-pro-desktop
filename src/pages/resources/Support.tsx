import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LifeBuoy, Mail, BookOpen, MessageCircle, Clock } from "lucide-react";
import { useEffect } from "react";

export default function Support() {
  useEffect(() => {
    document.title = "Support & Help Center - PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get help with PLR Organizer Pro. Access knowledge base, contact support, and find resources to maximize your PLR content management.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How Can We Help You?
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers, get support, and learn how to make the most of PLR Organizer Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>
                  Comprehensive guides and tutorials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our extensive library of articles, how-to guides, and video tutorials covering all features.
                </p>
                <Link to="/resources/guides">
                  <Button variant="outline" className="w-full">
                    Browse Guides
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-2" />
                <CardTitle>FAQ</CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Find instant answers to frequently asked questions about features, pricing, and technical issues.
                </p>
                <Link to="/resources/faq">
                  <Button variant="outline" className="w-full">
                    View FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  Direct help from our team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find what you need? Contact our support team and we'll get back to you within 24 hours.
                </p>
                <Link to="/contact">
                  <Button className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Support Hours & Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Available Monday-Friday, 9 AM - 6 PM EST
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Starter Plan:</span> Response within 24 hours
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Professional Plan:</span> Priority response within 4 hours
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Agency Plan:</span> Priority response within 4 hours + phone/screen share support
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Premium Support Add-On</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upgrade to premium support for $29/month and get:
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Response within 2 hours (business hours)</li>
                    <li>• Phone support with screen sharing</li>
                    <li>• Dedicated account manager</li>
                    <li>• Priority feature requests</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Self-Help Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/resources/guides" className="block p-4 rounded-lg border hover:bg-accent transition-colors">
                    <h3 className="font-semibold mb-1">Organization Guides</h3>
                    <p className="text-sm text-muted-foreground">Step-by-step tutorials for organizing your PLR library</p>
                  </Link>
                  <Link to="/resources/templates" className="block p-4 rounded-lg border hover:bg-accent transition-colors">
                    <h3 className="font-semibold mb-1">Templates & Tools</h3>
                    <p className="text-sm text-muted-foreground">Download free templates and worksheets</p>
                  </Link>
                  <Link to="/blog" className="block p-4 rounded-lg border hover:bg-accent transition-colors">
                    <h3 className="font-semibold mb-1">Blog Articles</h3>
                    <p className="text-sm text-muted-foreground">Latest tips, strategies, and best practices</p>
                  </Link>
                  <Link to="/tools" className="block p-4 rounded-lg border hover:bg-accent transition-colors">
                    <h3 className="font-semibold mb-1">Tools Overview</h3>
                    <p className="text-sm text-muted-foreground">Learn about our AI-powered PLR tools</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary text-primary-foreground rounded-lg p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 opacity-90">
              Try PLR Organizer Pro free for 7 days - no credit card required
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
