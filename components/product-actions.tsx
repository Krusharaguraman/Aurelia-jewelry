'use client';

import { useState } from 'react';
import { Heart, GitCompare, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/components/store-provider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const sizeGuides: Record<string, { label: string; sizes: string[] }> = {
  ring: { label: 'Ring Size (Indian)', sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14'] },
  bangle: { label: 'Bangle Size (inches)', sizes: ['2.2', '2.4', '2.6', '2.8', '2.10', '2.12'] },
  bracelet: { label: 'Bracelet Size (inches)', sizes: ['6.5', '7', '7.5', '8', '8.5'] },
  anklet: { label: 'Anklet Size (inches)', sizes: ['9', '9.5', '10', '10.5', '11'] },
  necklace: { label: 'Necklace Length (inches)', sizes: ['16', '18', '20', '22', '24', '30'] },
  chain: { label: 'Chain Length (inches)', sizes: ['18', '20', '22', '24', '30'] },
  earring: { label: 'Earring Style', sizes: ['Stud', 'Drop', 'Jhumka', 'Chandelier', 'Hoop'] },
};

export function ProductActions({ product }: { product: Product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, addToCompare, isInCompare, removeFromCompare } =
    useStore();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const sizeGuide = product.hasSizeGuide && product.sizeGuideType ? sizeGuides[product.sizeGuideType] : null;
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const outOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (sizeGuide && !selectedSize) {
      toast({ title: 'Please select a size first.' });
      return;
    }
    addToCart(product, 1, selectedSize || undefined);
    toast({ title: 'Added to your cart!' });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: 'Removed from your wishlist.' });
    } else {
      addToWishlist(product);
      toast({ title: 'Added to your wishlist!' });
    }
  };

  const handleCompare = () => {
    if (inCompare) {
      removeFromCompare(product.id);
      toast({ title: 'Removed from compare.' });
    } else {
      addToCompare(product);
      toast({ title: 'Added to compare.' });
    }
  };

  return (
    <>
      {/* Size Guide */}
      {sizeGuide && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">Select Size — {sizeGuide.label}</label>
          <div className="flex flex-wrap gap-2">
            {sizeGuide.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md transition-colors text-sm ${
                  selectedSize === size
                    ? 'border-gold-500 bg-gold-500 text-white'
                    : 'border-border hover:border-gold-500 hover:text-gold-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-charcoal hover:bg-gold-500 text-white"
          size="lg"
          disabled={outOfStock}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          onClick={handleWishlist}
          variant="outline"
          className="border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white"
          size="lg"
        >
          <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
          Wishlist
        </Button>
        <Button
          onClick={handleCompare}
          variant="outline"
          className={`border-gold-500 hover:bg-gold-500 hover:text-white ${inCompare ? 'bg-gold-500 text-white' : 'text-gold-700'}`}
          size="lg"
        >
          <GitCompare className="w-5 h-5 mr-2" />
          Compare
        </Button>
      </div>
    </>
  );
}
