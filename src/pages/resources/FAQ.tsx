import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HelpCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  useEffect(() => {
    document.title = "Frequently Asked Questions - PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get answers to common questions about PLR Organizer Pro, including features, pricing, license tracking, and technical support.");
    }
  }, []);

  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          q: "What is PLR Organizer Pro?",
          a: "PLR Organizer Pro is an intelligent content management system specifically designed for managing Private Label Rights content. It helps you organize, track licenses, analyze ROI, and maximize the value of your PLR library through AI-powered categorization and comprehensive analytics."
        },
        {
          q: "What types of PLR content can I manage?",
          a: "You can manage all types of PLR content including eBooks, articles, videos, graphics, audio files, templates, courses, and software. Our system supports multiple file formats (PDF, DOC, DOCX, MP4, MP3, JPG, PNG, ZIP) up to 50MB per file."
        },
        {
          q: "Do I need technical knowledge to use PLR Organizer Pro?",
          a: "No technical knowledge required! Our platform is designed for content creators, not developers. Simply drag-and-drop your files, and our AI handles categorization automatically. The interface is intuitive and user-friendly."
        },
        {
          q: "How is this different from using Dropbox or Google Drive?",
          a: "While cloud storage is great for files, PLR Organizer Pro is purpose-built for PLR content with features like license tracking, usage history, ROI analytics, duplicate detection, and AI categorization. It understands PLR-specific needs that generic storage can't provide."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          q: "How does AI categorization work?",
          a: "Our AI analyzes your uploaded content (titles, descriptions, file contents) and automatically assigns categories, tags, quality ratings, and niches. You can always override AI suggestions and customize organization to match your preferences."
        },
        {
          q: "What is license tracking and why do I need it?",
          a: "License tracking monitors usage rights, restrictions, expiration dates, and attribution requirements for each PLR item. This prevents legal issues by alerting you before violating license terms. You'll never accidentally break license restrictions again."
        },
        {
          q: "Can I track where I've used my PLR content?",
          a: "Yes! Our usage history feature lets you log where and when you've deployed content (blog, YouTube, courses, emails, etc.). This prevents duplicate content penalties and helps you see which PLR items perform best across platforms."
        },
        {
          q: "How does ROI tracking work?",
          a: "Track purchase prices and revenue generated from each PLR item. Our analytics dashboard shows overall ROI, best-performing content, top sellers, and investment insights. Make data-driven decisions about future PLR purchases."
        },
        {
          q: "What are the AI tools included?",
          a: "We include four AI-powered tools: Content Spinner (rewrite PLR for uniqueness), SEO Analyzer (optimize content for search), Brand Kit (apply consistent branding), and Batch Editor (bulk text operations). All tools integrate directly with your library."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What pricing plans are available?",
          a: "We offer three plans: Starter ($19/month for 250 items), Professional ($39/month for 2,500 items - most popular), and Agency ($79/month for unlimited items with team features). Annual billing saves you 2 months."
        },
        {
          q: "Is there a free trial?",
          a: "Yes! All new users get a 7-day free trial with full access to all features. No credit card required to start. If you're not satisfied, we offer a 7-day money-back guarantee."
        },
        {
          q: "Can I change plans later?",
          a: "Absolutely! Upgrade or downgrade anytime from your account settings. Changes take effect immediately, and we'll prorate any billing differences."
        },
        {
          q: "What happens if I exceed my plan's item limit?",
          a: "You'll receive notifications as you approach your limit. You can either upgrade to a higher plan or archive older content. We never automatically charge you or delete your content."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What file types are supported?",
          a: "We support PDF, DOC, DOCX, MP4, MP3, JPG, PNG, and ZIP files up to 50MB each. Need support for other formats? Contact us and we'll consider adding them."
        },
        {
          q: "Is my content secure?",
          a: "Yes! All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Files are stored securely with access restricted to your account only. We perform daily automated backups and never share your data with third parties."
        },
        {
          q: "Can I export my data?",
          a: "Yes! You can export your entire library as CSV or PDF reports anytime. You maintain full ownership of your data and can leave at any time with all your information."
        },
        {
          q: "What if I have a problem or question?",
          a: "We offer email support with <24 hour response times for all plans. Professional and Agency plans get priority support with <4 hour responses. Our knowledge base has detailed guides, and we offer optional premium support for screen-sharing assistance."
        },
        {
          q: "Do you offer team accounts?",
          a: "Yes! Our Agency plan includes team features with user management, role-based permissions, shared libraries, and activity logs. Additional team members are $15/seat/month."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about PLR Organizer Pro
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-12">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources/support">
                <Button size="lg">
                  Contact Support
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
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
