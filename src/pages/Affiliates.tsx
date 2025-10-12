import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, DollarSign, Users, TrendingUp, Mail, Share2 } from "lucide-react";

export default function Affiliates() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4" variant="secondary">Affiliate Program</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Earn Up to <span className="text-primary">$81.50</span> Per Customer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Promote PLR Organizer Pro and earn 50% commissions on all products. 
            Join our affiliate program and turn your audience into income.
          </p>
          <Button size="lg" className="text-lg">
            Become an Affiliate
          </Button>
        </section>

        {/* Commission Structure */}
        <section className="container mx-auto px-4 py-16 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12">Commission Structure</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Front-End Offer</CardTitle>
                <CardDescription>PLR Organizer Pro - Starter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">$9.50</div>
                <p className="text-sm text-muted-foreground mb-4">50% of $19 sale</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Lifetime Starter license
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    High conversion rate
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">OTO 1: Professional</CardTitle>
                <CardDescription>Unlimited + AI Tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">$23.50</div>
                <p className="text-sm text-muted-foreground mb-4">50% of $47 sale</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    AI-powered tools
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    25-30% take rate
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">OTO 2: Enterprise</CardTitle>
                <CardDescription>Done-For-You Setup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">$48.50</div>
                <p className="text-sm text-muted-foreground mb-4">50% of $97 sale</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    Team collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    10-15% take rate
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-primary">
              Total Potential: $81.50 per customer!
            </p>
            <p className="text-muted-foreground mt-2">
              Plus recurring commissions on future upgrades and renewals
            </p>
          </div>
        </section>

        {/* Why Promote */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Promote PLR Organizer Pro?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>High Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional sales funnel with proven copy and video that converts cold traffic into buyers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Huge Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Millions of content creators, marketers, and entrepreneurs need PLR organization solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multiple Income Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn on initial sale plus 2 one-time offers. Average order value exceeds $50.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Share2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Ready-Made Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Email swipes, banner ads, social posts, and video scripts - everything you need to promote.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Email Sequences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pre-written email sequences that nurture leads and drive sales on autopilot.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Real Product Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Promote a product that actually solves problems. Low refund rate and happy customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Download Center */}
        <section className="container mx-auto px-4 py-16 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12">Affiliate Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Swipes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  5 proven email templates ready to send to your list
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Banner Ads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  4 sizes: 300x250, 728x90, 160x600, 468x60
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  10 ready-to-share posts for Facebook, Twitter, LinkedIn
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Scripts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  3 YouTube video scripts for review and tutorial content
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our affiliate program today and start promoting PLR Organizer Pro to your audience.
            </p>
            <Button size="lg" className="text-lg">
              Sign Up as Affiliate
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No approval required. Get your affiliate link instantly.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
