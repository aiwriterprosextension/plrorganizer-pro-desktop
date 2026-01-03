import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Gift, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

export default function Downsell() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth?redirect=/funnel/downsell");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { 
          priceId: "price_plr_organizer_lite_reseller", // TODO: Replace with actual price ID
          planName: "PLR Organizer Pro - Lite Reseller",
          successUrl: `${window.location.origin}/funnel/thank-you`,
          cancelUrl: `${window.location.origin}/funnel/thank-you`
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
    navigate("/funnel/thank-you");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <SEO 
        title="Special Lite Offer - PLR Organizer Pro"
        description="Get the Lite Reseller package at a special discounted price."
      />

      {/* Header */}
      <div className="bg-warning text-warning-foreground py-4 text-center">
        <p className="text-lg font-semibold">
          ⏰ WAIT! Don't Leave Empty Handed...
        </p>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Gift className="w-16 h-16 text-warning mx-auto mb-6" />
          
          <Badge className="mb-4 bg-warning/10 text-warning hover:bg-warning/20">
            FINAL OFFER - 82% OFF
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
            I Understand $97 Is A Lot...
            <span className="block text-warning mt-2">How About Just $17?</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Get the <span className="font-bold text-foreground">Lite Reseller Package</span> at 
            this crazy discounted price. You'll get everything you need to start selling!
          </p>

          {/* What's Included */}
          <Card className="mb-10 border-warning/30">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">Lite Reseller Package Includes:</h2>
              
              <div className="space-y-3 text-left max-w-sm mx-auto">
                {[
                  "Personal use license + 10 reseller sales",
                  "Basic sales page template",
                  "3 email swipe files",
                  "Social media graphics pack",
                  "Quick start guide",
                  "Keep 100% of your 10 sales"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Math */}
          <Card className="mb-10 bg-muted/50">
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Sell just <span className="font-bold text-foreground">1 copy at $27</span> and 
                you've already made <span className="font-bold text-success">$10 profit</span>!
              </p>
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="bg-warning/5 border-2 border-warning rounded-xl p-8 mb-8">
            <p className="text-muted-foreground mb-2">Was: <span className="line-through">$97</span></p>
            <p className="text-4xl md:text-5xl font-bold text-warning mb-2">
              Only $17
            </p>
            <p className="text-success font-semibold">One-Time Payment!</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto text-lg px-10 py-6 h-auto shadow-lg hover:shadow-xl transition-all bg-warning hover:bg-warning/90 text-warning-foreground"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "YES! Get Lite Reseller for $17"}
              <ArrowRight className="ml-2" />
            </Button>

            <div>
              <button 
                onClick={handleNoThanks}
                className="text-muted-foreground hover:text-foreground text-sm underline"
              >
                No thanks, take me to my purchase →
              </button>
            </div>
          </div>

          {/* Final Note */}
          <p className="text-sm text-muted-foreground mt-8">
            This is our final offer. After this page, you won't see this deal again.
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
