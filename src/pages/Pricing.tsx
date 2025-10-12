import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Pricing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    document.title = "Pricing Plans - Affordable PLR Content Management | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Choose the perfect plan for your PLR content management needs. Start with a free trial, upgrade to Pro for advanced features, or scale with Enterprise solutions.");
    }

    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  const handleCheckout = async (priceId: string, planName: string) => {
    // Check if user is logged in
    if (!session) {
      navigate("/auth");
      return;
    }

    setIsLoading(planName);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { priceId, planName },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      priceId: "price_starter_monthly", // TODO: Replace with actual Stripe price ID
      description: "Perfect for beginners starting with PLR",
      features: [
        "Up to 500 PLR items",
        "Basic organization tools",
        "Smart categorization",
        "5 GB storage",
        "Email support",
        "Mobile app access"
      ]
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      priceId: "price_professional_monthly", // TODO: Replace with actual Stripe price ID
      description: "For serious PLR content creators",
      features: [
        "Unlimited PLR items",
        "All organization tools",
        "Content enhancement suite",
        "License tracking",
        "Batch processing",
        "50 GB storage",
        "Priority support",
        "API access",
        "Custom workflows"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      priceId: "price_enterprise_monthly", // TODO: Replace with actual Stripe price ID
      description: "For teams and agencies",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "Team collaboration",
        "Advanced analytics",
        "White-label options",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your PLR content management needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg" : ""}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleCheckout(plan.priceId, plan.name)}
                    disabled={isLoading === plan.name}
                  >
                    {isLoading === plan.name ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Start Free Trial"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I change plans later?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will pro-rate any differences.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and can arrange invoice billing for Enterprise customers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground">
                  No setup fees. All plans include full access to features from day one with no hidden costs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens after the free trial?</h3>
                <p className="text-muted-foreground">
                  After your 14-day free trial, you will be automatically enrolled in your chosen plan. Cancel anytime during the trial with no charges.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
