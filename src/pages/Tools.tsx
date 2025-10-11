import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, RefreshCw, BarChart, Shield, CheckCircle, Languages, FileType, Scan, Code, Edit, FileEdit, ArrowRight, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";

const tools = [
  {
    id: "brand-kit",
    title: "Brand Kit Tool",
    description: "Create a consistent brand identity across all your PLR content",
    icon: Palette,
    features: [
      "Logo bank with placement suggestions",
      "Color palette storage",
      "Font pairing recommendations"
    ],
    slug: "brand-kit"
  },
  {
    id: "content-spinner",
    title: "Content Spinner",
    description: "Transform generic PLR into 100% unique content",
    icon: RefreshCw,
    features: [
      "Adjustable uniqueness levels",
      "Brand voice preservation",
      "Bulk processing capability"
    ],
    slug: "content-spinner"
  },
  {
    id: "seo-analyzer",
    title: "SEO Analyzer",
    description: "Optimize your PLR content for search engines",
    icon: BarChart,
    features: [
      "PLR-specific SEO scoring system",
      "Keyword optimization suggestions",
      "Readability assessment"
    ],
    slug: "seo-analyzer"
  },
  {
    id: "license-tracker",
    title: "License Tracker",
    description: "Never risk copyright issues with your PLR content",
    icon: Shield,
    features: [
      "License expiration alerts",
      "Usage rights visualization",
      "License violation risk assessment"
    ],
    slug: "license-tracker"
  },
  {
    id: "uniqueness-meter",
    title: "Uniqueness Meter",
    description: "Verify your content is original before publishing",
    icon: CheckCircle,
    features: [
      "Paragraph-by-paragraph analysis",
      "Uniqueness improvement suggestions",
      "Plagiarism risk assessment"
    ],
    slug: "uniqueness-meter"
  },
  {
    id: "translator",
    title: "Multi-Language Translator",
    description: "Convert PLR content into 27 different languages",
    icon: Languages,
    features: [
      "Support for 27 languages",
      "Context-aware translations",
      "Formatting preservation"
    ],
    slug: "translator"
  },
  {
    id: "file-converter",
    title: "File Converter",
    description: "Transform any PLR format to editable content",
    icon: FileType,
    features: [
      "Batch conversion capability",
      "OCR technology for locked PDFs",
      "Format preservation"
    ],
    slug: "file-converter"
  },
  {
    id: "ocr-tool",
    title: "OCR Tool",
    description: "Extract text from any PLR image or PDF",
    icon: Scan,
    features: [
      "99%+ text recognition accuracy",
      "Support for 50+ languages",
      "Table and chart recognition"
    ],
    slug: "ocr-tool"
  },
  {
    id: "html-editor",
    title: "HTML Editor",
    description: "Create & format website content without coding skills",
    icon: Code,
    features: [
      "WYSIWYG editing interface",
      "Drag-and-drop media insertion",
      "Built-in responsive design tools"
    ],
    slug: "html-editor"
  },
  {
    id: "batch-editor",
    title: "Batch Editor",
    description: "Edit hundreds of PLR files simultaneously",
    icon: Edit,
    features: [
      "Edit up to 100+ files at once",
      "Regular expression support",
      "Before/after preview for changes"
    ],
    slug: "batch-editor"
  },
  {
    id: "plr-editor",
    title: "PLR Editor",
    description: "Edit and customize your PLR content",
    icon: FileEdit,
    features: [
      "Rich text editing",
      "Quick customization",
      "Brand voice matching"
    ],
    slug: "plr-editor",
    comingSoon: true
  }
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Tools Suite | 11 Specialized Tools for PLR Content | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Our specialized tools help you manage, customize, and optimize your PLR content for maximum results. From branding to uniqueness checks, streamline your workflow." 
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">PLR Tools Suite</h1>
            <p className="text-xl text-muted-foreground">
              Our specialized tools help you manage, customize, and optimize your PLR content for maximum 
              results. From branding to uniqueness checks, these tools streamline your workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.id} className="relative">
                  {tool.comingSoon && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Coming soon
                    </div>
                  )}
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      {!tool.comingSoon ? (
                        <>
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link to={`/tools/${tool.slug}`}>Learn More</Link>
                          </Button>
                          <Button asChild size="sm" className="flex-1">
                            <Link to={`/tools/${tool.slug}/app`}>
                              Use Tool <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
