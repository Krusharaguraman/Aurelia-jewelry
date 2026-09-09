import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RotateCcw, ShieldCheck, MessageSquare } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-3xl">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-6 text-center">Return Policy</h1>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <RotateCcw className="w-6 h-6 text-gold-600 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-1">14-Day Returns</h2>
                <p className="text-muted-foreground leading-relaxed">Return any ready-to-ship item within 14 days of delivery for a refund or exchange, provided the item is unworn and in original packaging with all certificates.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-gold-600 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-1">Diamond &amp; Gold Buyback</h2>
                <p className="text-muted-foreground leading-relaxed">We offer lifetime buyback on gold at the prevailing gold rate and 100% value exchange on certified diamonds.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-gold-600 flex-shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-1">How to Start a Return</h2>
                <p className="text-muted-foreground leading-relaxed">Message our support team via the contact page with your order number. We will arrange a free pickup and process your refund within 5-7 business days of inspection.</p>
              </div>
            </div>
            <div className="bg-beige/30 rounded-lg p-6">
              <p className="text-sm text-muted-foreground"><strong className="text-charcoal">Not eligible:</strong> custom-made pieces and engraved items, unless defective. For any questions, <a href="/contact" className="text-gold-600 hover:text-gold-700">contact us</a>.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}