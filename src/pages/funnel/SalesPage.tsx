import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Shield, Clock, Users, ArrowRight, PlayCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

export default function SalesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth?redirect=/funnel/sales");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { 
          priceId: "price_plr_organizer_fe", // TODO: Replace with actual W+ or Stripe price ID
          planName: "PLR Organizer Pro - Front End",
          successUrl: `${window.location.origin}/funnel/oto1`,
          cancelUrl: `${window.location.origin}/funnel/sales`
        },
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process purchase",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testimonials = [
    { name: "Sarah M.", role: "Content Marketer", text: "Finally organized my 10,000+ PLR files! This tool is a game-changer.", rating: 5 },
    { name: "Mike D.", role: "Digital Product Creator", text: "The AI content spinner alone is worth 10x the price. Incredible value!", rating: 5 },
    { name: "Jennifer L.", role: "Online Coach", text: "Saved me 20+ hours per week on content management. Absolutely love it!", rating: 5 },
  ];

  const features = [
    { icon: Zap, title: "AI Content Spinner", desc: "Transform PLR into unique content instantly" },
    { icon: Shield, title: "License Tracking", desc: "Never violate terms again with smart tracking" },
    { icon: Clock, title: "Batch Processing", desc: "Edit hundreds of files in seconds" },
    { icon: Users, title: "Brand Kit Manager", desc: "Apply your branding with one click" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <SEO 
        title="PLR Organizer Pro - Transform Your PLR Content Library"
        description="Stop wasting hours searching for PLR content. Organize, enhance, and profit from your PLR library with AI-powered tools."
      />

      {/* Urgency Banner */}
      <div className="bg-destructive text-destructive-foreground py-3 text-center">
        <p className="text-sm md:text-base font-semibold animate-pulse">
          🔥 LAUNCH SPECIAL: 87% OFF - Only $27 Today! (Regular $197) 🔥
        </p>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            LIMITED TIME LAUNCH OFFER
          </Badge>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Stop Drowning in PLR Chaos...
            <span className="block text-primary mt-2">Start Profiting in Minutes!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The #1 AI-Powered PLR Organization System That Transforms Your Messy Content Library 
            Into a <span className="font-semibold text-foreground">Profit-Generating Machine</span>
          </p>

          {/* Video Placeholder */}
          <div className="relative bg-card border rounded-xl overflow-hidden mb-8 aspect-video max-w-3xl mx-auto shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <PlayCircle className="w-20 h-20 text-primary mx-auto mb-4 opacity-80" />
                <p className="text-muted-foreground">Demo Video Placeholder</p>
                <p className="text-sm text-muted-foreground/70">Replace with actual sales video</p>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="text-lg px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
            onClick={handleBuyNow}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "YES! Get Instant Access for Only $27"}
            <ArrowRight className="ml-2" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            ✅ 30-Day Money Back Guarantee • ✅ Instant Access • ✅ No Monthly Fees
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
              Does This Sound Familiar? 😫
            </h2>
            
            <div className="space-y-4 text-lg">
              {[
                "You have THOUSANDS of PLR files scattered across folders, drives, and downloads...",
                "You buy amazing PLR packs but NEVER use them because you can't find anything...",
                "You're TERRIFIED of violating license terms but can't track what's allowed...",
                "You spend HOURS manually editing PLR when you should be selling...",
                "Your competitors are pumping out content while you're stuck organizing..."
              ].map((problem, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <span className="text-destructive font-bold">✗</span>
                  <p className="text-foreground">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-success/10 text-success">THE SOLUTION</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Introducing PLR Organizer Pro
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              The All-In-One AI-Powered Platform That Does The Heavy Lifting For You
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className="text-left hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
              Everything You Get Today:
            </h2>

            <div className="space-y-4">
              {[
                { item: "PLR Organizer Pro Software (Web + Desktop)", value: "$197" },
                { item: "AI Content Spinner (Unlimited Usage)", value: "$97" },
                { item: "SEO Analyzer Tool", value: "$67" },
                { item: "Brand Kit Manager", value: "$47" },
                { item: "Batch Editor Tool", value: "$47" },
                { item: "Smart Categorization System", value: "$37" },
                { item: "License Tracking Dashboard", value: "$37" },
                { item: "Lifetime Updates", value: "$97" },
                { item: "Priority Support", value: "$47" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-success" />
                    <span className="font-medium">{item.item}</span>
                  </div>
                  <span className="text-muted-foreground line-through">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/5 border-2 border-primary rounded-xl text-center">
              <p className="text-lg text-muted-foreground mb-2">Total Value: <span className="line-through">$673</span></p>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">Today Only: $27</p>
              <p className="text-success font-semibold">You Save: $646 (96% OFF!)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
            What Our Users Are Saying:
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              30-Day "No Questions Asked" Guarantee
            </h2>
            <p className="text-lg text-muted-foreground">
              Try PLR Organizer Pro completely risk-free. If you're not 100% satisfied for ANY reason, 
              just let us know within 30 days and we'll refund every penny. No questions, no hassle.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Ready to Finally Organize Your PLR Empire?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 2,500+ content creators who have transformed their PLR workflow
            </p>

            <Button 
              size="lg" 
              className="text-lg px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
              onClick={handleBuyNow}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Get Instant Access Now - Only $27"}
              <ArrowRight className="ml-2" />
            </Button>

            <p className="text-sm text-muted-foreground mt-6">
              ⚡ Instant Access • 💳 Secure Checkout • 🔒 30-Day Guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PLR Organizer Pro. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground">Terms of Service</a>
            <a href="/contact" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
