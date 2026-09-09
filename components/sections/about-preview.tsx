'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Gem, Leaf, ShieldCheck } from 'lucide-react';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

const features = [
  { icon: Award, title: 'Hallmarked Gold', desc: 'BIS certified authenticity' },
  { icon: Gem, title: 'Certified Diamonds', desc: 'GIA certified quality' },
  { icon: Leaf, title: 'Ethical Sourcing', desc: 'Responsibly mined' },
  { icon: ShieldCheck, title: 'Lifetime Warranty', desc: 'On all jewelry' },
];

export function AboutPreview() {
  return (
    <section className="py-24 bg-ivory">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <SlideUp>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/15955333/pexels-photo-15955333.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Master craftsman creating jewelry"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white p-6 rounded-lg shadow-luxury hidden sm:block">
                <p className="font-serif text-4xl font-bold">2018</p>
                <p className="text-sm tracking-wide">Established</p>
              </div>
            </div>
          </SlideUp>

          <div>
            <SlideUp delay={0.1}>
              <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                Where Heritage Meets Modern Luxury
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Aurelia blends timeless Indian craftsmanship with contemporary luxury. Every piece is
                meticulously designed to celebrate milestones, traditions, and memories. Our master
                artisans bring decades of expertise to each creation, ensuring unparalleled quality
                and artistry.
              </p>
            </SlideUp>

            <StaggerContainer stagger={0.1} className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-soft border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-medium text-charcoal">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
