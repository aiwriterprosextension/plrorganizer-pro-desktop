import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SubscriptionData {
  subscribed: boolean;
  product_id: string | null;
  subscription_end: string | null;
  planName: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSubscription(null);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Map product_id to plan names
      const planName = data.product_id === 'prod_starter' ? 'Starter' :
                       data.product_id === 'prod_professional' ? 'Professional' :
                       data.product_id === 'prod_enterprise' ? 'Enterprise' : 'Free';

      setSubscription({
        ...data,
        planName,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();

    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(() => {
      checkSubscription();
    });

    // Auto-refresh every 60 seconds
    const interval = setInterval(checkSubscription, 60000);

    return () => {
      authSubscription?.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return {
    subscription,
    isLoading,
    refetch: checkSubscription,
  };
};
