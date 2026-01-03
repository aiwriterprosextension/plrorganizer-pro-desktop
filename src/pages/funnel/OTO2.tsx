import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, Package, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

export default function OTO2() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth?redirect=/funnel/oto2");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { 
          priceId: "price_plr_organizer_reseller", // TODO: Replace with actual price ID
          planName: "PLR Organizer Pro - Reseller Rights",
          successUrl: `${window.location.origin}/funnel/thank-you`,
          cancelUrl: `${window.location.origin}/funnel/downsell`
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
    navigate("/funnel/downsell");
  };

  const resellerBenefits = [
    { icon: DollarSign, title: "Keep 100% Profits", desc: "Sell PLR Organizer Pro and keep every dollar" },
    { icon: Package, title: "Done-For-You Package", desc: "Sales page, graphics, and email swipes included" },
    { icon: FileText, title: "Full Rights", desc: "Sell unlimited copies at any price you choose" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <SEO 
        title="Reseller Rights - PLR Organizer Pro"
        description="Get reseller rights and sell PLR Organizer Pro as your own product, keeping 100% of the profits."
      />

      {/* Header */}
      <div className="bg-success text-success-foreground py-4 text-center">
        <p className="text-lg font-semibold">
          💰 EXCLUSIVE: Turn PLR Organizer Pro Into YOUR Product!
        </p>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-success/10 text-success hover:bg-success/20">
            RESELLER RIGHTS - KEEP 100% PROFITS
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Want to SELL PLR Organizer Pro
            <span className="block text-success mt-2">And Keep ALL The Money?</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            With <span className="font-bold text-foreground">Reseller Rights</span>, you can sell 
            PLR Organizer Pro as YOUR OWN product and keep 100% of every sale!
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {resellerBenefits.map((benefit, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow border-success/20">
                <CardContent className="p-6">
                  <benefit.icon className="w-10 h-10 text-success mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What's Included */}
          <Card className="mb-10 border-success/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Your Reseller Package Includes:</h2>
              
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  "Full reseller rights to PLR Organizer Pro",
                  "Ready-made sales page (editable)",
                  "Professional sales video",
                  "Email swipe files (5 emails)",
                  "Banner ad graphics (multiple sizes)",
                  "Social media promotional images",
                  "Customer support documentation",
                  "PayPal/Stripe integration guide",
                  "Warrior Plus integration tutorial",
                  "Sell at ANY price you want",
                  "Unlimited sales - no limits!",
                  "Keep 100% of all profits"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ROI Calculator */}
          <Card className="mb-10 bg-muted/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">💡 Quick Math:</h3>
              <p className="text-muted-foreground mb-4">
                If you sell just <span className="font-bold text-foreground">3 copies at $37 each</span>, 
                you've already made <span className="font-bold text-success">$111</span> - 
                more than covering your investment!
              </p>
              <p className="text-muted-foreground">
                Sell 10 copies = <span className="font-bold text-success">$370</span> profit<br/>
                Sell 50 copies = <span className="font-bold text-success">$1,850</span> profit<br/>
                Sell 100 copies = <span className="font-bold text-success">$3,700</span> profit
              </p>
            </CardContent>
          </Card>

          {/* Pricing */}
          <div className="bg-success/5 border-2 border-success rounded-xl p-8 mb-8">
            <p className="text-muted-foreground mb-2">Regular Price: <span className="line-through">$297</span></p>
            <p className="text-4xl md:text-5xl font-bold text-success mb-2">
              Only $97
            </p>
            <p className="text-success font-semibold">One-Time Payment - Unlimited Sales Forever!</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto text-lg px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all bg-success hover:bg-success/90"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "YES! Give Me Reseller Rights - $97"}
              <ArrowRight className="ml-2" />
            </Button>

            <div>
              <button 
                onClick={handleNoThanks}
                className="text-muted-foreground hover:text-foreground text-sm underline"
              >
                No thanks, I don't want to resell this product →
              </button>
            </div>
          </div>

          {/* Guarantee Note */}
          <p className="text-sm text-muted-foreground mt-8">
            ✅ Same 30-Day Money Back Guarantee Applies
          </p>
        </div>
      </section>

      {/* Urgency */}
      <section className="bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive font-semibold">
            ⚠️ Reseller rights are limited! Once we hit 100 resellers, this offer closes permanently.
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
