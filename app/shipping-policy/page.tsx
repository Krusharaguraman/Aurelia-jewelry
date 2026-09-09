import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Truck, PackageCheck, ShieldCheck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-6 text-center">Shipping Policy</h1>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Truck className="w-6 h-6 text-gold-600 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-1">Delivery Timelines</h2>
                <p className="text-muted-foreground leading-relaxed">Ready-to-ship pieces: 3-5 business days within India. Custom designs: 3-4 weeks (we confirm the timeline after design approval).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <PackageCheck className="w-6 h-6 text-gold-600 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-1">Shipping Charges</h2>
                <p className="text-muted-foreground leading-relaxed">Free insured shipping on all orders across India. No minimum order value required.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-gold-600 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-1">Insured &amp; Secure</h2>
                <p className="text-muted-foreground leading-relaxed">Every shipment is fully insured against loss or damage in transit. You will receive tracking details by email and SMS once your order ships.</p>
              </div>
            </div>
            <div className="bg-beige/30 rounded-lg p-6">
              <p className="text-sm text-muted-foreground">Questions about delivery? <a href="/contact" className="text-gold-600 hover:text-gold-700">Contact our support team</a>.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}