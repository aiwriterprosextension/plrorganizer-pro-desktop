import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Cookies() {
  useEffect(() => {
    document.title = "Cookie Policy - How We Use Cookies | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about how PLR Organizer Pro uses cookies and similar technologies to improve your experience and provide our services.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us 
                provide you with a better experience by remembering your preferences and improving our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the service to function properly</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our service</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-2 mt-4">Session Cookies</h3>
              <p>
                Temporary cookies that expire when you close your browser. These help us maintain your session 
                while you navigate through our service.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">Persistent Cookies</h3>
              <p>
                Remain on your device for a set period. These remember your preferences and settings for future visits.
              </p>

              <h3 className="text-xl font-semibold mb-2 mt-4">Third-Party Cookies</h3>
              <p>
                Set by services we use, such as analytics providers and payment processors, to enhance functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to block 
                or delete cookies. However, blocking all cookies may impact your ability to use certain features 
                of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Consent</h2>
              <p>
                By using our service, you consent to our use of cookies as described in this policy. You can 
                withdraw your consent at any time by adjusting your cookie preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting 
                the new policy on this page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at cookies@plrorganizer.pro
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
