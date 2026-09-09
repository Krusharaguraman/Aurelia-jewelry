'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { products, categories } from '@/lib/products';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  // Update searchQuery when URL changes
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const metals = ['18K Gold', '22K Gold', 'Platinum', 'Sterling Silver'];
  const occasions = ['Wedding', 'Engagement', 'Anniversary', 'Festival', 'Traditional', 'Casual', 'Party', 'Gift', 'Daily Wear', 'Bridal'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Metal filter
    if (selectedMetals.length > 0) {
      result = result.filter(p => selectedMetals.includes(p.metal));
    }

    // Occasion filter
    if (selectedOccasions.length > 0) {
      result = result.filter(p => p.occasion.some(o => selectedOccasions.includes(o)));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, selectedMetals, selectedOccasions, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 500000]);
    setSelectedMetals([]);
    setSelectedOccasions([]);
    setSortBy('featured');
  };

  const activeFilterCount = [
    selectedCategory,
    searchQuery,
    selectedMetals.length > 0,
    selectedOccasions.length > 0,
  ].filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
              {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : 'All Collections'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && <Badge className="bg-gold-500 text-white">{activeFilterCount}</Badge>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Category */}
                    <div>
                      <Label className="font-medium mb-3 block">Category</Label>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCategory('')}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            !selectedCategory ? 'bg-gold-100 text-gold-700' : 'hover:bg-beige/50'
                          }`}
                        >
                          All Categories
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              selectedCategory === cat.slug ? 'bg-gold-100 text-gold-700' : 'hover:bg-beige/50'
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="font-medium mb-3 block">
                        Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </Label>
                      <Slider
                        min={0}
                        max={500000}
                        step={10000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-2"
                      />
                    </div>

                    {/* Metal */}
                    <div>
                      <Label className="font-medium mb-3 block">Metal</Label>
                      <div className="space-y-2">
                        {metals.map((metal) => (
                          <div key={metal} className="flex items-center gap-2">
                            <Checkbox
                              id={metal}
                              checked={selectedMetals.includes(metal)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedMetals([...selectedMetals, metal]);
                                } else {
                                  setSelectedMetals(selectedMetals.filter(m => m !== metal));
                                }
                              }}
                            />
                            <Label htmlFor={metal} className="text-sm cursor-pointer">{metal}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <Label className="font-medium mb-3 block">Occasion</Label>
                      <div className="space-y-2">
                        {occasions.map((occasion) => (
                          <div key={occasion} className="flex items-center gap-2">
                            <Checkbox
                              id={occasion}
                              checked={selectedOccasions.includes(occasion)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedOccasions([...selectedOccasions, occasion]);
                                } else {
                                  setSelectedOccasions(selectedOccasions.filter(o => o !== occasion));
                                }
                              }}
                            />
                            <Label htmlFor={occasion} className="text-sm cursor-pointer">{occasion}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="relative">
                <Button variant="outline" className="gap-2">
                  Sort By
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory || searchQuery || selectedMetals.length > 0 || selectedOccasions.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find(c => c.slug === selectedCategory)?.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedMetals.map((metal) => (
                <Badge key={metal} variant="secondary" className="gap-1">
                  {metal}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMetals(selectedMetals.filter(m => m !== metal))} />
                </Badge>
              ))}
              {selectedOccasions.map((occasion) => (
                <Badge key={occasion} variant="secondary" className="gap-1">
                  {occasion}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedOccasions(selectedOccasions.filter(o => o !== occasion))} />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                Clear all
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <CollectionsContent />
    </Suspense>
  );
}
