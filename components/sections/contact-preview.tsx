'use client';

import { Phone, Mail, MessageCircle, Video, Calendar, MessageSquare } from 'lucide-react';
import { SlideUp } from '@/components/motion-wrapper';
import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL, CONTACT_PHONE_TEL, WHATSAPP_LINK } from '@/lib/contact';

const supportOptions = [
  { icon: Video, title: 'Virtual Consultation', desc: 'Book a video call with our experts' },
  { icon: Calendar, title: 'Appointment Booking', desc: 'Schedule an in-store visit' },
  { icon: MessageSquare, title: 'Live Chat Assistance', desc: 'Chat with our jewelry consultants' },
];

export function ContactPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container-luxury">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Get in Touch</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            We&apos;re Here to Help
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated team is available to assist you with any questions about our jewelry,
            custom designs, or your purchase.
          </p>
        </SlideUp>

        <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          {supportOptions.map((option) => (
            <SlideUp key={option.title} delay={0.1}>
              <div className="text-center p-6 rounded-lg bg-beige/30 border border-border/50">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-3">
                  <option.icon className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-serif text-base font-medium text-charcoal mb-1">{option.title}</h3>
                <p className="text-xs text-muted-foreground">{option.desc}</p>
              </div>
            </SlideUp>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href={CONTACT_PHONE_TEL}>
            <Button className="bg-gold-500 hover:bg-gold-600 text-white">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            <Button variant="outline" className="border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white">
              <Mail className="w-4 h-4 mr-2" />
              Email Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
