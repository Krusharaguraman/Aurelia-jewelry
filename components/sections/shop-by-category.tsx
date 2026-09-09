'use client';

import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/products';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

export function ShopByCategory() {
  return (
    <section className="py-24 bg-beige/30">
      <div className="container-luxury">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Browse</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive collection of jewelry categories, each offering unique designs and
            craftsmanship.
          </p>
        </SlideUp>

        <StaggerContainer stagger={0.05} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <Link href={`/collections?category=${category.slug}`} className="group block">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-serif text-lg font-medium">{category.name}</h3>
                    <p className="text-xs text-white/70">{category.count} items</p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
