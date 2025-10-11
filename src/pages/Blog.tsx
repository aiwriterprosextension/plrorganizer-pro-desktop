import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Blog() {
  useEffect(() => {
    document.title = "PLR Blog - Tips, Guides & Resources | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore PLR content management tips, best practices, and industry insights. Learn how to maximize the value of your Private Label Rights content.");
    }
  }, []);

  const posts = [
    {
      title: "10 Best Practices for Organizing PLR Content",
      excerpt: "Learn the essential strategies for keeping your PLR library organized and easily accessible...",
      date: "2025-10-08",
      readTime: "5 min read",
      category: "Organization"
    },
    {
      title: "How to Maximize the Value of Your PLR Content",
      excerpt: "Discover proven techniques to enhance and monetize your PLR content effectively...",
      date: "2025-10-05",
      readTime: "7 min read",
      category: "Monetization"
    },
    {
      title: "Understanding PLR Licenses: A Complete Guide",
      excerpt: "Everything you need to know about different types of PLR licenses and usage rights...",
      date: "2025-10-01",
      readTime: "10 min read",
      category: "Legal"
    },
    {
      title: "Automating Your PLR Workflow for Maximum Efficiency",
      excerpt: "Save hours every week with these automation strategies for PLR content management...",
      date: "2025-09-28",
      readTime: "6 min read",
      category: "Automation"
    },
    {
      title: "SEO Optimization Tips for PLR Content",
      excerpt: "Make your PLR content rank higher in search engines with these proven SEO techniques...",
      date: "2025-09-25",
      readTime: "8 min read",
      category: "SEO"
    },
    {
      title: "Creating Unique Content from PLR: Advanced Techniques",
      excerpt: "Transform generic PLR into unique, valuable content that stands out from the competition...",
      date: "2025-09-20",
      readTime: "9 min read",
      category: "Content Creation"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PLR Content Management Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Tips, guides, and insights to help you succeed with PLR content
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm mb-2">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded">
                      {post.category}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
