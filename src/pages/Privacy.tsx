import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy - Data Protection & Security | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Read our privacy policy to understand how PLR Organizer Pro collects, uses, and protects your personal information and PLR content data.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
              <p>
                PLR Organizer Pro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>PLR content files you upload to our service</li>
                <li>Payment information for subscription management</li>
                <li>Communication preferences and support inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. 
                Your content is encrypted during transmission and storage, and we regularly review our security practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. 
                You may request deletion of your data at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at privacy@plrorganizer.pro
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
