import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalInvested: 0,
    totalRevenue: 0,
    overallROI: 0,
    utilizationRate: 0,
  });

  useEffect(() => {
    document.title = "Analytics Dashboard - PLR Organizer Pro";
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      loadAnalytics();
    }
  }, [session]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Get ROI analytics from view
      const { data: roiData, error: roiError } = await supabase
        .from("plr_roi_analytics")
        .select("*")
        .order("roi_multiplier", { ascending: false });

      if (roiError) throw roiError;

      // Get all PLR items to calculate utilization
      const { data: allItems, error: itemsError } = await supabase
        .from("plr_items")
        .select("id, purchase_price");

      if (itemsError) throw itemsError;

      setAnalytics(roiData || []);

      // Calculate total stats
      const totalInvested = allItems?.reduce((sum, item) => sum + (item.purchase_price || 0), 0) || 0;
      const totalRevenue = roiData?.reduce((sum, item) => sum + (item.total_revenue || 0), 0) || 0;
      const usedItems = roiData?.filter(item => item.times_used > 0).length || 0;
      const utilizationRate = allItems && allItems.length > 0 ? (usedItems / allItems.length) * 100 : 0;

      setTotalStats({
        totalInvested,
        totalRevenue,
        overallROI: totalInvested > 0 ? ((totalRevenue - totalInvested) / totalInvested) * 100 : 0,
        utilizationRate,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ROI Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your PLR investments and measure returns
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalStats.totalInvested.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Purchase price of all PLR items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${totalStats.totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Revenue generated from PLR
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall ROI</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold flex items-center gap-2 ${totalStats.overallROI >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalStats.overallROI >= 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {totalStats.overallROI.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Return on investment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Utilization</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalStats.utilizationRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Of library actively used
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing PLR Items</CardTitle>
            <CardDescription>Ranked by ROI and revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  No usage data yet. Mark your PLR items as used to see analytics!
                </p>
                <Button onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Times Used</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.seller_name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.times_used}x</Badge>
                      </TableCell>
                      <TableCell>${(item.purchase_price || 0).toFixed(2)}</TableCell>
                      <TableCell className="text-success font-medium">
                        ${(item.total_revenue || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {item.roi_multiplier > 0 ? (
                          <Badge className="bg-success text-success-foreground">
                            {item.roi_multiplier.toFixed(1)}x
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
