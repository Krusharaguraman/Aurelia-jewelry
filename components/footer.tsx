'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from '@/lib/contact';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Collections', href: '/collections' },
  { label: 'Custom Design', href: '/custom-design' },
  { label: 'Store Locator', href: '/store-locator' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Size & Fit Guide', href: '/size-guide' },
];

const collections = [
  { label: 'Rings', href: '/collections?category=rings' },
  { label: 'Bangles', href: '/collections?category=bangles' },
  { label: 'Necklaces', href: '/collections?category=necklaces' },
  { label: 'Earrings', href: '/collections?category=earrings' },
  { label: 'Bridal Collection', href: '/collections?category=bridal-collection' },
  { label: 'Temple Jewelry', href: '/collections?category=temple-jewelry' },
];

const policies = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return Policy', href: '/return-policy' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const hint = data.detail && data.detail !== data.error ? ` (${data.detail})` : '';
        toast({
          title: 'Subscription failed',
          description: (data.error || 'Please try again later.') + hint,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Thank you for subscribing to Aurelia!' });
        setEmail('');
      }
    } catch {
      toast({
        title: 'Subscription failed',
        description: 'Network error. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-charcoal text-white mt-20">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="text-gold-500">
                <path
                  d="M18 2L22 14H34L24 22L28 34L18 26L8 34L12 22L2 14H14L18 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="18" cy="18" r="3" fill="currentColor" />
              </svg>
              <span className="font-serif text-2xl font-bold text-gradient-gold">Aurelia</span>
            </div>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Timeless Elegance, Crafted with Trust. Premium handcrafted jewelry inspired by heritage and crafted for modern elegance since 2018.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter / X' },
                { icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-gold-400">Collections</h3>
            <ul className="space-y-2.5">
              {collections.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-serif text-lg mt-6 mb-4 text-gold-400">Policies</h3>
            <ul className="space-y-2.5">
              {policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4 text-gold-400">Stay Connected</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{CONTACT_PHONE}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>123 Heritage Jewelry Avenue, Luxury District, Chennai, Tamil Nadu 600001</span>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white" disabled={subscribing}>
                {subscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxury py-5">
          <p className="text-center text-sm text-white/50">
            &copy; 2026 Aurelia. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
