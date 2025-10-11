import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service - User Agreement | PLR Organizer Pro";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Read the terms of service for PLR Organizer Pro. Understand your rights and responsibilities when using our PLR content management platform.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
              <p>
                By accessing and using PLR Organizer Pro, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Use of Service</h2>
              <p>You agree to use PLR Organizer Pro only for lawful purposes. You are prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Transmitting malicious code or viruses</li>
                <li>Attempting to gain unauthorized access</li>
                <li>Interfering with the service&apos;s operation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">User Content</h2>
              <p>
                You retain all rights to the PLR content you upload to our service. By uploading content, you grant us 
                a limited license to store, process, and display your content solely for the purpose of providing our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Subscription and Payment</h2>
              <p>
                Paid subscriptions are billed in advance on a recurring basis. You agree to provide accurate payment 
                information and authorize us to charge your payment method. Subscriptions automatically renew unless 
                cancelled before the renewal date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account at any time for violations of these terms. 
                You may cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
              <p>
                PLR Organizer Pro is provided "as is" without warranties of any kind. We shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of significant changes 
                via email or through the service. Continued use of the service after changes constitutes acceptance 
                of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact</h2>
              <p>
                For questions about these Terms of Service, contact us at legal@plrorganizer.pro
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
