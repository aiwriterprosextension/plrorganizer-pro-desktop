import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <SEO 
        title="Thank You - PLR Organizer Pro"
        description="Your purchase is complete. Access your PLR Organizer Pro account now."
      />

      {/* Header */}
      <div className="bg-success py-4 text-center">
        <p className="text-lg font-semibold text-success-foreground">
          🎉 Congratulations! Your Purchase Is Complete!
        </p>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
          
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Welcome to PLR Organizer Pro!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your account has been created and you're ready to start organizing your PLR empire. 
            Check your email for login details!
          </p>

          {/* Next Steps */}
          <Card className="mb-10">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">Your Next Steps:</h2>
              
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Access Your Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the button below to log into your PLR Organizer Pro dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Download Desktop App (Optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      For bulk folder scanning, download our desktop app
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Upload Your First PLR Content</h3>
                    <p className="text-sm text-muted-foreground">
                      Start organizing by uploading your PLR files to the dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Try the AI Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Use Content Spinner and SEO Analyzer to enhance your content
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <Button asChild size="lg" className="h-auto py-4">
              <Link to="/dashboard">
                <ArrowRight className="mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-auto py-4">
              <Link to="/downloads">
                <Download className="mr-2" />
                Download Desktop App
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <Link to="/resources/guides" className="font-medium hover:text-primary">
                  Quick Start Guide
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <Link to="/resources/support" className="font-medium hover:text-primary">
                  Get Support
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Download className="w-8 h-8 text-primary mx-auto mb-2" />
                <Link to="/resources/templates" className="font-medium hover:text-primary">
                  Free Templates
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Support Note */}
          <p className="text-sm text-muted-foreground mt-10">
            Need help? Email us at <a href="mailto:support@plrorganizerpro.com" className="text-primary hover:underline">support@plrorganizerpro.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-6 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PLR Organizer Pro. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
