'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Headphones, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '10,000+', label: 'Custom Designs' },
  { value: '100%', label: 'Certified Jewelry' },
];

const trustIndicators = [
  { icon: ShieldCheck, label: 'Certified Jewelry' },
  { icon: Lock, label: 'Secure Shopping' },
  { icon: Headphones, label: 'Lifetime Support' },
];

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={process.env.NEXT_PUBLIC_HERO_IMAGE || 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1920'}
          alt="Luxury gold jewelry collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
              Established 2018
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white font-bold mb-4 leading-tight"
          >
            Aurelia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-xl sm:text-2xl text-gold-300 mb-6"
          >
            Timeless Elegance, Crafted with Trust
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
          >
            Premium handcrafted jewelry inspired by heritage and crafted for modern elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link href="/collections">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6 text-sm tracking-widest uppercase">
                Explore Collections
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/store-locator">
              <Button
                variant="outline"
                className="border-white/40 bg-white/90 text-charcoal hover:bg-charcoal hover:text-white px-8 py-6 text-sm tracking-widest uppercase"
              >
                Visit Store
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            {trustIndicators.map((indicator) => (
              <div key={indicator.label} className="flex items-center gap-2 text-white/80">
                <indicator.icon className="w-5 h-5 text-gold-400" />
                <span className="text-sm tracking-wide">{indicator.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-6 max-w-lg"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl sm:text-3xl text-gold-400 font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/60 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
