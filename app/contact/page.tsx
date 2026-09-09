import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_LINK,
  SOCIAL_LINKS,
  SOCIAL_HANDLES,
} from '@/lib/contact';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-4 text-center">Contact Us</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-1">Phone</h3>
                      <p className="text-muted-foreground">{CONTACT_PHONE}</p>
                      <p className="text-sm text-muted-foreground">Mon-Sat, 10am-8pm IST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-1">Email</h3>
                      <p className="text-muted-foreground">{CONTACT_EMAIL}</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-1">Visit Our Store</h3>
                      <p className="text-muted-foreground">
                        123 Heritage Jewelry Avenue<br />
                        Luxury District, Chennai<br />
                        Tamil Nadu 600001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-1">Store Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 10am - 8pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-beige/30 rounded-lg p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Other Ways to Connect</h3>
                <div className="space-y-3">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gold-600 hover:text-gold-700">
                    <span className="font-medium">WhatsApp</span>
                    <span className="text-muted-foreground">{CONTACT_PHONE}</span>
                  </a>
                  <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gold-600 hover:text-gold-700">
                    <span className="font-medium">Twitter / X</span>
                    <span className="text-muted-foreground">{SOCIAL_HANDLES.twitter}</span>
                  </a>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gold-600 hover:text-gold-700">
                    <span className="font-medium">Instagram</span>
                    <span className="text-muted-foreground">{SOCIAL_HANDLES.instagram}</span>
                  </a>
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gold-600 hover:text-gold-700">
                    <span className="font-medium">Facebook</span>
                    <span className="text-muted-foreground">{SOCIAL_HANDLES.facebook}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
