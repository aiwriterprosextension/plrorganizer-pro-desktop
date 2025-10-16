import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";

interface SubscriptionGuardProps {
  children: ReactNode;
  requiredPlan?: "starter" | "professional" | "enterprise";
  feature?: string;
}

export const SubscriptionGuard = ({ 
  children, 
  requiredPlan = "starter",
  feature = "this feature" 
}: SubscriptionGuardProps) => {
  const { subscription, isLoading } = useSubscription();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check if user has required plan
  const hasAccess = subscription?.subscribed && 
    (requiredPlan === "starter" || 
     (requiredPlan === "professional" && ["professional", "enterprise"].includes(subscription.product_id || "")) ||
     (requiredPlan === "enterprise" && subscription.product_id === "prod_enterprise"));

  if (!hasAccess) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Upgrade Required</CardTitle>
            <CardDescription className="text-lg">
              {feature} is available on {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} plan and above
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Unlock this feature and many more by upgrading your subscription.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate("/pricing")} size="lg">
                View Plans
              </Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" size="lg">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
