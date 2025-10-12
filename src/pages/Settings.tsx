import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, ExternalLink } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile state
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Dashboard preferences
  const [viewMode, setViewMode] = useState("grid");
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [sortBy, setSortBy] = useState("created_at");
  
  // Subscription state
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        loadUserData(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    try {
      // Load profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setAvatarUrl(profile.avatar_url || "");
        setViewMode(profile.dashboard_view_mode || "grid");
        setItemsPerPage(profile.items_per_page?.toString() || "50");
        setSortBy(profile.default_sort_by || "created_at");
      }

      // Load subscription
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (sub) {
        setSubscription(sub);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!session?.user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!session?.user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          dashboard_view_mode: viewMode,
          items_per_page: parseInt(itemsPerPage),
          default_sort_by: sortBy,
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Preferences saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session?.user || !subscription?.stripe_customer_id) {
      toast({
        title: "Error",
        description: "No active subscription found",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-customer-portal-session", {
        body: { customerId: subscription.stripe_customer_id },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to open customer portal",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account settings and preferences
          </p>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input
                      id="avatarUrl"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Preferences</CardTitle>
                  <CardDescription>
                    Customize your dashboard experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="viewMode">Default View Mode</Label>
                    <Select value={viewMode} onValueChange={setViewMode}>
                      <SelectTrigger id="viewMode">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="table">Table View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemsPerPage">Items Per Page</Label>
                    <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger id="itemsPerPage">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sortBy">Default Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sortBy">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created_at">Date Added</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="purchase_date">Purchase Date</SelectItem>
                        <SelectItem value="quality_rating">Quality Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSavePreferences}
                    disabled={isSaving}
                  >
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subscription ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Plan</p>
                          <p className="text-2xl font-bold capitalize">{subscription.plan_name}</p>
                        </div>
                        <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                          {subscription.status}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Plan Features:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {subscription.plan_name === "free" && (
                            <>
                              <li>Up to 100 PLR items</li>
                              <li>Basic organization tools</li>
                              <li>Limited AI features</li>
                            </>
                          )}
                          {subscription.plan_name === "starter" && (
                            <>
                              <li>Up to 1,000 PLR items</li>
                              <li>Full organization suite</li>
                              <li>Unlimited AI content spinning</li>
                              <li>Basic analytics</li>
                            </>
                          )}
                          {subscription.plan_name === "pro" && (
                            <>
                              <li>Unlimited PLR items</li>
                              <li>Advanced analytics & ROI tracking</li>
                              <li>Unlimited AI features</li>
                              <li>Priority support</li>
                              <li>Batch processing</li>
                            </>
                          )}
                          {subscription.plan_name === "enterprise" && (
                            <>
                              <li>Everything in Pro</li>
                              <li>Team collaboration</li>
                              <li>API access</li>
                              <li>Custom integrations</li>
                              <li>Dedicated account manager</li>
                            </>
                          )}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        {subscription.plan_name === "free" ? (
                          <Button className="w-full" onClick={() => navigate("/pricing")}>
                            Upgrade Plan
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={handleManageSubscription}
                            disabled={isLoadingPortal || !subscription.stripe_customer_id}
                          >
                            {isLoadingPortal ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                              </>
                            ) : (
                              <>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Manage Subscription
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No subscription found. Please contact support.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
