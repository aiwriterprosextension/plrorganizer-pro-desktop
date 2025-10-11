import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, Lightbulb, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About Us - PLR Content Management Solution | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about PLR Organizer Pro, the leading SaaS platform for managing Private Label Rights content. Our mission is to help content creators organize and monetize PLR efficiently.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              About PLR Organizer Pro
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Transforming how content creators manage and monetize PLR content
            </p>

            <div className="prose prose-lg mx-auto mb-16">
              <p className="text-lg">
                PLR Organizer Pro was born from a simple observation: content creators were drowning in disorganized PLR content. 
                Hours wasted searching for files, confusion about license rights, and missed opportunities to monetize valuable content.
              </p>
              <p className="text-lg">
                We built PLR Organizer Pro to solve these challenges with intelligent automation, powerful organization tools, 
                and comprehensive license management. Our platform helps thousands of content creators transform chaos into 
                organized, monetizable assets.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                <p className="text-muted-foreground">
                  Empower content creators to efficiently manage and monetize their PLR content through innovative technology.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Lightbulb className="h-8 w-8 text-secondary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become the world&apos;s leading platform for PLR content management and optimization.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
                <p className="text-muted-foreground">
                  Innovation, simplicity, and customer success drive everything we do at PLR Organizer Pro.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Thousands of Satisfied Users</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start organizing your PLR content today and unlock its full potential
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="text-lg px-8">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
