'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { GitCompare, X, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export default function ComparePage() {
  const { compare, removeFromCompare, clearCompare } = useStore();

  if (compare.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-8">
          <div className="container-luxury py-24 text-center">
            <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">Compare Products</h1>
            <p className="text-muted-foreground mb-8">Add products to compare their features side by side.</p>
            <Link href="/collections">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const features = [
    { label: 'Metal', key: 'metal' as const },
    { label: 'Purity', key: 'purity' as const },
    { label: 'Stone', key: 'stone' as const },
    { label: 'Weight', key: 'weight' as const },
    { label: 'Certification', key: 'certification' as const },
    { label: 'Warranty', key: 'warranty' as const },
    { label: 'Gender', key: 'gender' as const },
  ];

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-charcoal">Compare Products</h1>
            <Button variant="outline" onClick={clearCompare}>
              Clear All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Product Header Row */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${compare.length}, 1fr)` }}>
                <div></div>
                {compare.map((item) => (
                  <div key={item.product.id} className="relative">
                    <button
                      onClick={() => removeFromCompare(item.product.id)}
                      className="absolute top-0 right-0 p-1 text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label="Remove from compare"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-serif text-base font-medium text-charcoal hover:text-gold-600 transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-semibold text-gold-600 mt-2">{formatPrice(item.product.price)}</p>
                  </div>
                ))}
              </div>

              {/* Features Comparison */}
              <div className="space-y-4">
                {features.map((feature) => (
                  <div
                    key={feature.key}
                    className="grid gap-4 p-4 bg-beige/30 rounded-lg"
                    style={{ gridTemplateColumns: `200px repeat(${compare.length}, 1fr)` }}
                  >
                    <div className="font-medium text-charcoal">{feature.label}</div>
                    {compare.map((item) => (
                      <div key={item.product.id} className="text-muted-foreground">
                        {item.product[feature.key]}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Rating */}
                <div
                  className="grid gap-4 p-4 bg-beige/30 rounded-lg"
                  style={{ gridTemplateColumns: `200px repeat(${compare.length}, 1fr)` }}
                >
                  <div className="font-medium text-charcoal">Rating</div>
                  {compare.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-1">
                      <span className="font-medium">{item.product.rating}</span>
                      <span className="text-muted-foreground">({item.product.reviewCount})</span>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div
                  className="grid gap-4 p-4 bg-beige/30 rounded-lg"
                  style={{ gridTemplateColumns: `200px repeat(${compare.length}, 1fr)` }}
                >
                  <div className="font-medium text-charcoal">Highlights</div>
                  {compare.map((item) => (
                    <div key={item.product.id} className="space-y-1">
                      {item.product.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-1 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-gold-600 flex-shrink-0 mt-0.5" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div
                  className="grid gap-4 p-4"
                  style={{ gridTemplateColumns: `200px repeat(${compare.length}, 1fr)` }}
                >
                  <div></div>
                  {compare.map((item) => (
                    <div key={item.product.id}>
                      <Link href={`/products/${item.product.slug}`} className="block">
                        <Button className="w-full bg-charcoal hover:bg-gold-500 text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
