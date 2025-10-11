import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileCheck, AlertTriangle, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function LicenseTracking() {
  useEffect(() => {
    document.title = "License Tracking System - Manage PLR Usage Rights & Licenses | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Track and manage PLR licenses, usage rights, and restrictions. Never violate license terms with automated tracking, alerts, and comprehensive license management tools.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PLR License Tracking System
            </h1>
            <p className="text-xl text-muted-foreground">
              Never worry about license violations again. Track usage rights, restrictions, and expiration dates for all your PLR content in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <Card>
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">License Management</h2>
                <p className="text-muted-foreground mb-4">
                  Store and manage all license information for your PLR content, including usage rights, restrictions, and attribution requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Centralized license database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Automatic license detection from files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Custom license templates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <FileCheck className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Usage Rights Tracking</h2>
                <p className="text-muted-foreground mb-4">
                  Keep detailed records of how you can use each piece of PLR content, including allowed modifications and distribution methods.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Commercial vs personal use tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Modification permission levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Distribution rights management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <AlertTriangle className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Restriction Alerts</h2>
                <p className="text-muted-foreground mb-4">
                  Get automatic alerts when content has usage restrictions or when you are about to violate license terms.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Real-time restriction warnings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Email notifications for violations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Usage history and audit trail</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-secondary mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Expiration Tracking</h2>
                <p className="text-muted-foreground mb-4">
                  Track license expiration dates and get notified before licenses expire so you can renew or remove content in time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Expiration date calendar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advance expiration warnings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Auto-archive expired content</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Compliant with License Tracking</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Protect yourself from license violations and manage usage rights effortlessly
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
