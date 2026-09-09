import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-6 text-center">Privacy Policy</h1>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p className="text-sm">Last updated: 2026. This policy explains what information Aurelia collects, how we use it, and the choices you have.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">1. Information We Collect</h2>
            <p>When you place an order, create an account, or contact us, we collect the information you provide: name, email address, phone number, delivery address, and order details. We never store your card details — payments are processed securely by our payment partners.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">2. How We Use Your Information</h2>
            <p>We use your information to process orders, arrange insured delivery, provide customer support, and — only if you opt in — send you updates about new collections and offers.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">3. Data Security</h2>
            <p>Your personal data is encrypted in transit (256-bit SSL) and stored securely. Access is restricted to authorised staff only.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">4. Your Rights</h2>
            <p>You may request a copy of your data, ask us to correct it, or request deletion at any time by writing to our support team. We will respond within 30 days.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">5. Contact</h2>
            <p>For any privacy questions, email us through our <a href="/contact" className="text-gold-600 hover:text-gold-700">contact page</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}