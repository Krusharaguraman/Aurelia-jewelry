'use client';

import { ShieldCheck, Hammer, Palette, Lock, RotateCcw, Headphones } from 'lucide-react';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

const features = [
  { icon: ShieldCheck, title: 'Certified Jewelry', desc: 'All our jewelry comes with GIA and BIS certification for guaranteed authenticity and quality.' },
  { icon: Hammer, title: 'Trusted Craftsmanship', desc: 'Master artisans with decades of experience craft each piece with meticulous attention to detail.' },
  { icon: Palette, title: 'Custom Designs', desc: 'Create your own unique piece with our custom design service and free consultation.' },
  { icon: Lock, title: 'Secure Shopping', desc: '256-bit SSL encryption and secure payment processing for complete peace of mind.' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '14-day return policy on all non-customized jewelry with hassle-free processing.' },
  { icon: Headphones, title: 'Lifetime Support', desc: 'Dedicated customer support and lifetime warranty on all our jewelry pieces.' },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-ivory">
      <div className="container-luxury">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Our Promise</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Why Choose Aurelia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing an exceptional jewelry experience, from selection to
            lifetime support.
          </p>
        </SlideUp>

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group p-8 rounded-lg bg-white shadow-soft border border-border/50 hover:shadow-luxury transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-gold-600" />
                </div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
