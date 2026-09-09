'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

export function FeaturedCollections() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-24 bg-white">
      <div className="container-luxury">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Curated Selection</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of exquisite jewelry pieces, each crafted to perfection
            by our master artisans.
          </p>
        </SlideUp>

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 text-sm tracking-widest uppercase transition-colors"
          >
            View All Collections
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
