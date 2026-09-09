'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { SlideUp } from '@/components/motion-wrapper';

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.pexels.com/photos/37485302/pexels-photo-37485302.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container-luxury relative z-10">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-3">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Cherished by Our Customers
          </h2>
        </SlideUp>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed mb-8 text-white/90">
                  &ldquo;{testimonials[current].content}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400">
                    <Image
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gold-400">{testimonials[current].name}</p>
                    <p className="text-sm text-white/60">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="border-white/30 text-white hover:bg-white hover:text-charcoal rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-gold-400 w-8' : 'bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="border-white/30 text-white hover:bg-white hover:text-charcoal rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
