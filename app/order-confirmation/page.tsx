import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, Truck, Mail, Phone } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '@/lib/contact';

export default function OrderConfirmationPage() {
  const orderNumber = 'AUR-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">Thank you for your purchase</p>
            <p className="text-lg font-medium text-charcoal mb-8">Order #{orderNumber}</p>

            <div className="bg-beige/30 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-4">A confirmation email has been sent to your email address with your order details.</p>
              <div className="flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Processing</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collections">
                <Button variant="outline" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/account">
                <Button className="w-full sm:w-auto bg-charcoal hover:bg-gold-500 text-white">
                  Track Order
                </Button>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Need help?</p>
              <div className="flex justify-center gap-6">
                <a href={CONTACT_PHONE_TEL} className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700">
                  <Phone className="w-4 h-4" />
                  {CONTACT_PHONE}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700">
                  <Mail className="w-4 h-4" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
