'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-8">
          <div className="container-luxury py-24 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">Save your favorite pieces by clicking the heart icon on any product.</p>
            <Link href="/collections">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                Explore Collections
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">My Wishlist</h1>
          <p className="text-muted-foreground mb-8">{wishlist.length} items saved</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-soft border border-border/50 overflow-hidden group">
                <div className="relative aspect-square">
                  <Link href={`/products/${item.product.slug}`} className="absolute inset-0 block" aria-label={item.product.name}>
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-red-50 hover:text-red-500 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <Link href={`/products/${item.product.slug}`}>
                    <h3 className="font-serif text-base font-medium text-charcoal mb-1 hover:text-gold-600 transition-colors line-clamp-1">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mb-2">{item.product.category}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-semibold text-charcoal">{formatPrice(item.product.price)}</span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(item.product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => moveToCart(item.product.id)}
                    className="w-full bg-charcoal hover:bg-gold-500 text-white"
                    size="sm"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
