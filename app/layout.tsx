import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { StoreProvider } from '@/components/store-provider';
import { AIAssistant } from '@/components/ai-assistant';
import { Toaster } from '@/components/ui/toaster';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from '@/lib/contact';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aurelia | Timeless Elegance, Crafted with Trust',
  description:
    'Discover handcrafted luxury jewelry including rings, bangles, necklaces, earrings, bridal collections, and custom-designed masterpieces.',
  keywords: [
    'Jewelry Store',
    'Gold Jewelry',
    'Diamond Jewelry',
    'Custom Jewelry',
    'Bridal Jewelry',
    'Luxury Jewelry',
    'Aurelia',
  ],
  openGraph: {
    title: 'Aurelia | Timeless Elegance, Crafted with Trust',
    description:
      'Discover handcrafted luxury jewelry including rings, bangles, necklaces, earrings, bridal collections, and custom-designed masterpieces.',
    type: 'website',
    siteName: 'Aurelia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurelia | Timeless Elegance, Crafted with Trust',
    description:
      'Discover handcrafted luxury jewelry including rings, bangles, necklaces, earrings, bridal collections, and custom-designed masterpieces.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aurelia',
  description: 'Premium handcrafted luxury jewelry including rings, bangles, necklaces, earrings, and bridal collections.',
  url: 'https://aurelia-jewelry.com',
  logo: 'https://aurelia-jewelry.com/logo.png',
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Heritage Jewelry Avenue, Luxury District',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600001',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.twitter,
  ].filter((url) => url !== '#'),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://aurelia-jewelry.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Collections',
      item: 'https://aurelia-jewelry.com/collections',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Blog',
      item: 'https://aurelia-jewelry.com/blog',
    },
  ],
};

const jsonLd = [organizationSchema, breadcrumbSchema];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <StoreProvider>
          {children}
          <AIAssistant />
          <Toaster />
        </StoreProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
