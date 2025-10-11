import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileSpreadsheet, Download, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Templates() {
  useEffect(() => {
    document.title = "Free PLR Organization Templates & Tools | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Download free templates for PLR organization, license tracking, content calendars, and ROI analysis. Streamline your PLR management workflow.");
    }
  }, []);

  const templates = [
    {
      title: "PLR Content Organization Spreadsheet",
      description: "Master spreadsheet for tracking all your PLR content in one place",
      features: [
        "Pre-built categories and tags",
        "License tracking columns",
        "Usage status tracking",
        "Purchase date and price fields"
      ],
      format: "Excel & Google Sheets"
    },
    {
      title: "License Rights Tracker Template",
      description: "Comprehensive template for managing PLR licenses and usage restrictions",
      features: [
        "License type classification",
        "Expiration date tracking",
        "Restriction checklist",
        "Attribution requirement fields"
      ],
      format: "PDF & Excel"
    },
    {
      title: "Content Calendar Template",
      description: "Plan your PLR content deployment across platforms and campaigns",
      features: [
        "Monthly and weekly views",
        "Platform-specific sections",
        "Content status tracking",
        "Duplicate prevention notes"
      ],
      format: "Excel & Notion"
    },
    {
      title: "ROI Analysis Worksheet",
      description: "Calculate returns on your PLR investments with detailed formulas",
      features: [
        "Purchase cost tracking",
        "Revenue attribution",
        "ROI calculation formulas",
        "Seller performance metrics"
      ],
      format: "Excel with formulas"
    },
    {
      title: "Quality Assessment Checklist",
      description: "Standardized criteria for evaluating PLR content quality",
      features: [
        "Scoring rubric (A-D rating)",
        "Completeness evaluation",
        "Originality assessment",
        "Formatting quality check"
      ],
      format: "PDF checklist"
    },
    {
      title: "Content Repurposing Workflow",
      description: "Step-by-step templates for turning PLR into multiple assets",
      features: [
        "eBook to blog series workflow",
        "Video to social media workflow",
        "Article to email sequence workflow",
        "Platform-specific optimization tips"
      ],
      format: "PDF guide"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <FileSpreadsheet className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free PLR Organization Templates
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready-to-use templates and worksheets to streamline your PLR content management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {template.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mb-4">
                    Format: {template.format}
                  </p>
                  <Link to="/auth">
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8 max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Skip the Templates - Use Our Platform Instead</h2>
            <p className="text-muted-foreground mb-6">
              While templates are great, our platform automates everything for you. No manual data entry, no spreadsheet maintenance, no duplicate work.
            </p>
            <Link to="/auth">
              <Button size="lg">
                Try PLR Organizer Pro Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need help using these templates? Check out our guides
            </p>
            <Link to="/resources/guides">
              <Button variant="outline">
                View Guides
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
