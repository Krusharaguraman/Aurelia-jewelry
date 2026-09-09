'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, GitCompare, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useStore } from '@/components/store-provider';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { QuickViewDialog } from '@/components/quick-view-dialog';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addToCompare, isInCompare, removeFromCompare } = useStore();
  const [quickView, setQuickView] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-card rounded-lg overflow-hidden shadow-soft border border-border/50"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Link href={`/products/${product.slug}`} className="absolute inset-0 block" aria-label={product.name}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge className="bg-gold-500 text-white">New</Badge>}
            {product.isBestSeller && <Badge className="bg-charcoal text-white">Best Seller</Badge>}
            {product.originalPrice && (
              <Badge className="bg-red-600 text-white">
                {calculateDiscount(product.originalPrice, product.price)}% Off
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all"
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-charcoal'}`} />
            </button>
            <button
              onClick={() => setQuickView(true)}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-charcoal" />
            </button>
            <button
              onClick={() => (inCompare ? removeFromCompare(product.id) : addToCompare(product))}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-all"
              aria-label="Compare"
            >
              <GitCompare className={`w-4 h-4 ${inCompare ? 'text-gold-600' : 'text-charcoal'}`} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 max-[640px]:translate-y-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={() => addToCart(product)}
              className="w-full bg-charcoal hover:bg-gold-500 text-white"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-base font-medium mb-1 hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-charcoal">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewDialog open={quickView} onOpenChange={setQuickView} product={product} />
    </>
  );
}
