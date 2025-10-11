import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, AlertTriangle, CheckCircle2, Clock, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LicenseTracker() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [plrItems, setPlrItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "License Tracker - PLR Organizer Pro";
    
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
      loadLicenseData();
    }
  }, [session]);

  const loadLicenseData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("plr_items")
        .select("*, categories(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPlrItems(data || []);
    } catch (error) {
      console.error("Error loading license data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = plrItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.license_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsWithRestrictions = plrItems.filter(item => 
    item.license_restrictions && item.license_restrictions.length > 0
  );

  const expiringItems = plrItems.filter(item => {
    if (!item.license_expires_at) return false;
    const expiryDate = new Date(item.license_expires_at);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow && expiryDate > new Date();
  });

  const getLicenseBadgeColor = (licenseType: string | null) => {
    if (!licenseType) return "secondary";
    const type = licenseType.toUpperCase();
    if (type.includes("PLR")) return "default";
    if (type.includes("MRR")) return "secondary";
    if (type.includes("RR")) return "outline";
    return "secondary";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Loading license data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">License Tracker</h1>
          <p className="text-muted-foreground">
            Monitor license compliance, restrictions, and expiration dates for all your PLR content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plrItems.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                PLR items tracked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">With Restrictions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{itemsWithRestrictions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Items requiring attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Clock className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiringItems.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Within 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>License Overview</CardTitle>
                <CardDescription>All PLR items with license information</CardDescription>
              </div>
              <div className="w-72">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or license..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No items found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>License Type</TableHead>
                    <TableHead>Restrictions</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        {item.license_type ? (
                          <Badge variant={getLicenseBadgeColor(item.license_type)}>
                            {item.license_type}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not specified</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.license_restrictions && item.license_restrictions.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <span className="text-sm">{item.license_restrictions.length} restriction(s)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <span className="text-sm">No restrictions</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.license_expires_at ? (
                          <span className="text-sm">
                            {new Date(item.license_expires_at).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.license_expires_at && new Date(item.license_expires_at) < new Date() ? (
                          <Badge variant="destructive">Expired</Badge>
                        ) : item.license_expires_at && expiringItems.some(e => e.id === item.id) ? (
                          <Badge variant="outline" className="text-warning">Expiring Soon</Badge>
                        ) : (
                          <Badge variant="outline" className="text-success">Active</Badge>
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
