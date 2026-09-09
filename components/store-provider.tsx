'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, WishlistItem, CompareItem } from '@/types';

interface StoreContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  compare: CompareItem[];
  recentlyViewed: Product[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  addToRecentlyViewed: (product: Product) => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [compare, setCompare] = useState<CompareItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('aurelia-cart');
      const savedWishlist = localStorage.getItem('aurelia-wishlist');
      const savedCompare = localStorage.getItem('aurelia-compare');
      const savedRecent = localStorage.getItem('aurelia-recent');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedCompare) setCompare(JSON.parse(savedCompare));
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('aurelia-cart', JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('aurelia-wishlist', JSON.stringify(wishlist));
  }, [wishlist, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('aurelia-compare', JSON.stringify(compare));
  }, [compare, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('aurelia-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed, mounted]);

  const addToCart = useCallback((product: Product, quantity = 1, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number, size?: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((item) => item.product.id === productId),
    [wishlist]
  );

  const addToCompare = useCallback((product: Product) => {
    setCompare((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, { product }];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setCompare((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const isInCompare = useCallback(
    (productId: string) => compare.some((item) => item.product.id === productId),
    [compare]
  );

  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  const saveForLater = useCallback((productId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        addToWishlist(item.product);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  }, [addToWishlist]);

  const moveToCart = useCallback((productId: string) => {
    setWishlist((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        addToCart(item.product);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  }, [addToCart]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compare,
        recentlyViewed,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        addToRecentlyViewed,
        saveForLater,
        moveToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
