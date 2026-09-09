'use client';

import { faqItems } from '@/lib/products';
import { SlideUp } from '@/components/motion-wrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

export function FAQPreview() {
  return (
    <section className="py-24 bg-beige/30">
      <div className="container-luxury max-w-3xl">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Got Questions?</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Frequently Asked Questions
          </h2>
        </SlideUp>

        <SlideUp delay={0.1}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-white rounded-lg px-6 shadow-soft border border-border/50"
              >
                <AccordionTrigger className="font-serif text-base font-medium text-charcoal text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SlideUp>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Still have questions?{' '}
            <Link href="/contact" className="text-gold-600 hover:text-gold-700 font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
