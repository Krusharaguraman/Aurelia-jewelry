'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/components/store-provider';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function QuickViewDialog({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product;
}) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const inWishlist = isInWishlist(product.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="100%"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-gold-500' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <h2 className="font-serif text-2xl font-medium mb-2">{product.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-semibold text-charcoal">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-medium text-red-600">
                  Save {calculateDiscount(product.originalPrice, product.price)}%
                </span>
              )}
            </div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Metal</span>
                <span className="font-medium">{product.metal}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Stone</span>
                <span className="font-medium">{product.stone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Certification</span>
                <span className="font-medium">{product.certification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-medium text-green-600">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-auto">
              <Button
                onClick={() => {
                  addToCart(product);
                  onOpenChange(false);
                }}
                className="flex-1 bg-gold-500 hover:bg-gold-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
                className="border-gold-500"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Link href={`/products/${product.slug}`}>
                <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
