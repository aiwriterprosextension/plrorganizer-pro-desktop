import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, HelpCircle, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("guides");

  const guides = [
    {
      title: "PLR Software Guides",
      description: "Everything you need to know to get started with PLR",
      content: "Learn the fundamentals of PLR content and how to use it effectively in your business.",
      link: "/blog/plr-guides/ultimate-guide-organizing-plr-content"
    },
    {
      title: "PLR Organization Strategies",
      description: "Best practices for organizing your PLR content",
      content: "Discover proven strategies to keep your PLR content organized and easily accessible.",
      link: "/blog/plr-guides"
    },
    {
      title: "Content Marketing with PLR",
      description: "Maximize your ROI with PLR content",
      content: "Learn how to leverage PLR content effectively in your marketing campaigns.",
      link: "/blog/content-strategy/maximize-plr-roi"
    }
  ];

  const templates = [
    {
      title: "Content Organization Template",
      description: "A ready-to-use template for organizing your PLR library",
      content: "Download our proven template for categorizing and managing PLR content."
    },
    {
      title: "License Tracking Spreadsheet",
      description: "Keep track of all your PLR licenses in one place",
      content: "Never lose track of usage rights and expiration dates with this comprehensive template."
    },
    {
      title: "Content Calendar Template",
      description: "Plan your PLR content publication schedule",
      content: "Organize when and where you'll publish your PLR content for maximum impact."
    }
  ];

  const faqs = [
    {
      question: "What is PLR content?",
      answer: "PLR (Private Label Rights) content is pre-created content that you can purchase and modify as your own. You can rebrand it, edit it, and use it in your business."
    },
    {
      question: "How do I organize thousands of PLR files?",
      answer: "Use a systematic approach with consistent naming conventions, proper categorization, and tools like PLR Organizer Pro to automate the organization process."
    },
    {
      question: "Can I modify PLR content?",
      answer: "Yes! That's the main advantage of PLR. You can edit, rebrand, and customize the content to match your brand voice and style. Always check the specific license terms for each PLR package."
    },
    {
      question: "How do I make PLR content unique?",
      answer: "Use our Content Spinner tool to rewrite the content, add your own examples and case studies, update statistics, and infuse your brand voice throughout the piece."
    },
    {
      question: "What are the best PLR niches?",
      answer: "Popular PLR niches include health & wellness, personal finance, online business, self-improvement, and digital marketing. Choose niches that align with your audience and expertise."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>PLR Resources | Guides, Templates & Support | PLR Organizer Pro</title>
        <meta 
          name="description" 
          content="Access comprehensive PLR guides, downloadable templates, FAQs, and expert support to help you master PLR content management and maximize your ROI." 
        />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">PLR Resources</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to succeed with PLR content management
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="guides">
                <BookOpen className="h-4 w-4 mr-2" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="faq">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="support">
                <Mail className="h-4 w-4 mr-2" />
                Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides" className="space-y-6">
              {guides.map((guide, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{guide.content}</p>
                    <Button asChild>
                      <Link to={guide.link}>View Guide</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-6">
              {templates.map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{template.content}</p>
                    <Button asChild>
                      <Link to="/auth">Download Template</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="support">
              <Card>
                <CardHeader>
                  <CardTitle>Get Support</CardTitle>
                  <CardDescription>
                    We're here to help you succeed with PLR Organizer Pro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-muted-foreground mb-2">
                      support@plrorganizerpro.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Support Hours</h3>
                    <p className="text-muted-foreground">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond within 24 hours during business days
                    </p>
                  </div>
                  
                  <Button asChild className="w-full sm:w-auto">
                    <Link to="/contact">Contact Support</Link>
                  </Button>
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
