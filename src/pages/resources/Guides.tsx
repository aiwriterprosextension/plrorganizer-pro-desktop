import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Guides() {
  useEffect(() => {
    document.title = "PLR Organization Guides & Tutorials | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Comprehensive guides and tutorials for organizing, managing, and monetizing your PLR content library. Learn best practices from industry experts.");
    }
  }, []);

  const guides = [
    {
      title: "Getting Started with PLR Organization",
      description: "Learn the fundamentals of organizing your PLR library for maximum efficiency and profitability.",
      content: "Master the basics: setting up your first library, creating categories, tagging strategies, and best practices for naming conventions. Perfect for beginners.",
      link: "/blog/content-marketing/getting-started-with-plr",
      category: "Getting Started"
    },
    {
      title: "License Compliance Best Practices",
      description: "Understand PLR licenses and ensure you never violate usage restrictions.",
      content: "Deep dive into license types (PLR, MRR, RR), common restrictions, attribution requirements, and how to track expiration dates. Protect yourself legally.",
      link: "/blog/content-marketing/plr-license-guide",
      category: "Legal & Compliance"
    },
    {
      title: "Maximizing ROI on PLR Investments",
      description: "Learn how to calculate and improve returns on your PLR content purchases.",
      content: "Track purchase prices, measure revenue generated, identify best-performing content, and make data-driven buying decisions. Includes ROI formulas and case studies.",
      link: "/blog/content-marketing/plr-roi-strategies",
      category: "Financial Analytics"
    },
    {
      title: "Advanced Categorization Strategies",
      description: "Go beyond basic folders with niche-specific organization systems.",
      content: "Learn industry-proven categorization methods by niche, content type, quality level, and usage status. Includes templates for different business models.",
      link: "/blog/content-marketing/plr-organization-tips",
      category: "Organization"
    },
    {
      title: "Content Repurposing Workflows",
      description: "Transform one piece of PLR into multiple assets across platforms.",
      content: "Step-by-step workflows for converting eBooks into blog series, videos into social posts, and articles into email sequences. Maximize content value.",
      link: "/blog/content-marketing/repurpose-plr-content",
      category: "Content Strategy"
    },
    {
      title: "Quality Assessment Framework",
      description: "Develop a system for rating PLR quality before purchasing or using.",
      content: "Learn to evaluate completeness, originality, formatting, readability, and commercial viability. Avoid low-quality content that wastes time and money.",
      link: "/blog/content-marketing/evaluating-plr-quality",
      category: "Quality Control"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PLR Organization Guides & Tutorials
            </h1>
            <p className="text-xl text-muted-foreground">
              Master PLR content management with comprehensive guides, step-by-step tutorials, and expert best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-primary">{guide.category}</span>
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {guide.content}
                  </p>
                  <Link to={guide.link}>
                    <Button variant="outline" className="w-full">
                      Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Organize Your PLR Library?</h2>
            <p className="text-muted-foreground mb-6">
              Apply these strategies with our intelligent PLR management platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
