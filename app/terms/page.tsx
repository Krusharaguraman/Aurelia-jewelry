import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-6 text-center">Terms &amp; Conditions</h1>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p className="text-sm">Last updated: 2026. By using the Aurelia website you agree to these terms.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">1. Orders &amp; Pricing</h2>
            <p>All prices are in Indian Rupees (INR) and include applicable taxes unless stated. We may cancel an order if payment is not authorised or if an item is unavailable.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">2. Certificates &amp; Hallmarking</h2>
            <p>All gold is BIS hallmarked and diamonds are GIA certified as described on each product page. Certification documents accompany your delivery.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">3. Custom Designs</h2>
            <p>Custom pieces are made to order and may take 3-4 weeks. Custom items are not eligible for standard returns unless defective.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">4. Intellectual Property</h2>
            <p>All content on this site, including designs and imagery, is the property of Aurelia and may not be reproduced without permission.</p>
            <h2 className="font-serif text-xl font-bold text-charcoal">5. Governing Law</h2>
            <p>These terms are governed by the laws of India. Questions? Reach us via the <a href="/contact" className="text-gold-600 hover:text-gold-700">contact page</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}