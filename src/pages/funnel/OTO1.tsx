import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Building2, ArrowRight, ArrowDown } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

export default function OTO1() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth?redirect=/funnel/oto1");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { 
          priceId: "price_plr_organizer_agency", // TODO: Replace with actual price ID
          planName: "PLR Organizer Pro - Agency License",
          successUrl: `${window.location.origin}/funnel/oto2`,
          cancelUrl: `${window.location.origin}/funnel/oto2`
        },
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process upgrade",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoThanks = () => {
    navigate("/funnel/oto2");
  };

  const agencyBenefits = [
    { icon: Users, title: "Unlimited Client Accounts", desc: "Create and manage accounts for all your clients" },
    { icon: Building2, title: "White Label Rights", desc: "Remove our branding, add yours" },
    { icon: Users, title: "5 Team Member Seats", desc: "Add your VAs and team members" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <SEO 
        title="Agency License Upgrade - PLR Organizer Pro"
        description="Upgrade to Agency License and serve unlimited clients with white-label rights."
      />

      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 text-center">
        <p className="text-lg font-semibold">
          🎉 WAIT! Your Order Is Almost Complete...
        </p>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-warning/10 text-warning hover:bg-warning/20">
            ONE-TIME OFFER - 66% OFF
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Want to Use PLR Organizer Pro 
            <span className="block text-primary mt-2">For Your Clients Too?</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Upgrade to the <span className="font-bold text-foreground">Agency License</span> and 
            unlock the ability to manage PLR content for unlimited clients with full white-label rights!
          </p>

          {/* Video/Image Placeholder */}
          <div className="relative bg-card border rounded-xl overflow-hidden mb-8 aspect-video max-w-2xl mx-auto shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <Building2 className="w-16 h-16 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-muted-foreground">Agency Features Demo</p>
                <p className="text-sm text-muted-foreground/70">Video placeholder</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {agencyBenefits.map((benefit, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What's Included */}
          <Card className="mb-10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Agency License Includes:</h2>
              
              <div className="space-y-4 text-left max-w-md mx-auto">
                {[
                  "Unlimited client accounts",
                  "Full white-label rights (your branding)",
                  "5 team member seats included",
                  "Priority agency support",
                  "Commercial usage rights",
                  "Client reporting dashboard",
                  "Bulk operations for all accounts",
                  "Free lifetime updates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="bg-primary/5 border-2 border-primary rounded-xl p-8 mb-8">
            <p className="text-muted-foreground mb-2">Regular Price: <span className="line-through">$197</span></p>
            <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
              Only $67
            </p>
            <p className="text-success font-semibold">One-Time Payment - No Monthly Fees!</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto text-lg px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "YES! Upgrade to Agency License - $67"}
              <ArrowRight className="ml-2" />
            </Button>

            <div>
              <button 
                onClick={handleNoThanks}
                className="text-muted-foreground hover:text-foreground text-sm underline"
              >
                No thanks, I don't need to serve clients. Skip this offer →
              </button>
            </div>
          </div>

          {/* Guarantee Note */}
          <p className="text-sm text-muted-foreground mt-8">
            ✅ Same 30-Day Money Back Guarantee Applies
          </p>
        </div>
      </section>

      {/* Scarcity */}
      <section className="bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive font-semibold animate-pulse">
            ⚠️ This special pricing is only available RIGHT NOW on this page. 
            If you leave, the price goes back to $197.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PLR Organizer Pro. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
