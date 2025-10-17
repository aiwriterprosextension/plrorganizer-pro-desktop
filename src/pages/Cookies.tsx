import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Cookie Policy - How We Use Cookies"
        description="Learn about how PLR Organizer Pro uses cookies to enhance your browsing experience, analyze site usage, and provide personalized features."
        keywords={["cookie policy", "cookies", "privacy", "data collection", "website tracking"]}
      />
      
      <Header />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit our website. They help us provide you 
                with a better experience by remembering your preferences and understanding how you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous usage data via <a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics</a>.</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices, such as language preferences and display options.</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites and display relevant advertisements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Session Cookies</h3>
                  <p className="text-muted-foreground">
                    Temporary cookies that expire when you close your browser. Used for maintaining your login session.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Persistent Cookies</h3>
                  <p className="text-muted-foreground">
                    Remain on your device for a set period or until manually deleted. Used for remembering your preferences.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Third-Party Cookies</h3>
                  <p className="text-muted-foreground">
                    Set by external services we use, such as Google Analytics and payment processors, in accordance with <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's cookie policies</a>.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
              <p className="mt-4">
                Note that disabling cookies may affect the functionality of our website and limit your ability to use certain features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Consent</h2>
              <p>
                By using our website, you consent to our use of cookies as described in this policy. If you do not agree 
                with our use of cookies, you should adjust your browser settings or refrain from using our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an 
                updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please <Link to="/contact" className="text-primary hover:underline">contact us</Link> or email cookies@plrorganizer.pro
              </p>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-3">Related Policies</h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
