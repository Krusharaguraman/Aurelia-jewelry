'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, clearCart } = useStore();

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-8">
          <div className="container-luxury py-24 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-bold text-charcoal mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/collections">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                Continue Shopping
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
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 bg-white rounded-lg shadow-soft border border-border/50">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-serif text-base font-medium text-charcoal hover:text-gold-600 transition-colors truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">{item.product.category}</p>
                    {item.size && (
                      <p className="text-sm text-muted-foreground mb-2">Size: {item.size}</p>
                    )}
                    <p className="text-lg font-semibold text-charcoal">{formatPrice(item.product.price)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1), item.size)}
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-gold-500 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1, item.size)}
                        className="w-16 h-8 text-center"
                      />
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.size)}
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:border-gold-500 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Link href="/collections">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-beige/30 rounded-lg p-6 sticky top-24">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="font-medium">{formatPrice(cartTotal * 0.18)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-charcoal">Total</span>
                    <span className="font-bold text-xl text-charcoal">{formatPrice(cartTotal * 1.18)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full bg-charcoal hover:bg-gold-500 text-white mb-3">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <div className="text-center text-xs text-muted-foreground">
                  <p>Free insured shipping on all orders</p>
                  <p>14-day return policy</p>
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
