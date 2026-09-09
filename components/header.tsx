'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/components/store-provider';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { categories } from '@/lib/products';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Collections', href: '/collections' },
  { label: 'Custom Design', href: '/custom-design' },
  { label: 'Store Locator', href: '/store-locator' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const { cartCount, wishlist, compare } = useStore();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <div className="bg-charcoal text-white text-xs py-2 px-4 text-center">
        <p className="tracking-wider">
          <span className="hidden sm:inline">Free Insured Shipping Across India &nbsp;|&nbsp; Lifetime Warranty &nbsp;|&nbsp;</span>
          <span className="sm:hidden">Free Shipping &amp; Lifetime Warranty &nbsp;|&nbsp;</span>
          Certified Jewelry
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-soft' : 'bg-ivory'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden p-2" aria-label="Open menu">
                    <Menu className="w-6 h-6 text-charcoal" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-ivory">
                  <SheetHeader>
                    <SheetTitle className="font-serif text-2xl text-gradient-gold">Aurelia</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 mt-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 text-sm tracking-wide text-charcoal hover:bg-beige rounded-md transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center gap-2">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-gold-500">
                  <path
                    d="M18 2L22 14H34L24 22L28 34L18 26L8 34L12 22L2 14H14L18 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="18" cy="18" r="3" fill="currentColor" />
                </svg>
                <span className="font-serif text-2xl font-bold text-gradient-gold hidden sm:block">
                  Aurelia
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
                link.href === '/collections' ? (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 luxury-link text-charcoal">
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-ivory border-border">
                      <DropdownMenuItem asChild>
                        <Link href="/collections" className="font-medium text-gold-600">
                          All Collections
                        </Link>
                      </DropdownMenuItem>
                      {categories.slice(0, 8).map((cat) => (
                        <DropdownMenuItem key={cat.slug} asChild>
                          <Link href={`/collections?category=${cat.slug}`}>{cat.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={link.href} href={link.href} className="luxury-link text-charcoal">
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-gold-600 transition-colors"
                aria-label="Search"
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              <Link href="/wishlist" className="relative p-2 hover:text-gold-600 transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link href="/compare" className="relative p-2 hover:text-gold-600 transition-colors hidden sm:block" aria-label="Compare">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 6H7L3 12l4 6h18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {compare.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {compare.length}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative p-2 hover:text-gold-600 transition-colors" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href="/account" className="p-2 hover:text-gold-600 transition-colors hidden sm:block" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={handleSearch}>
                <Input
                  placeholder="Search for rings, necklaces, bangles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border-gold-300 focus:border-gold-500"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
