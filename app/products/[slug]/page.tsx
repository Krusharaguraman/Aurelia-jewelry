import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getReviewsByProduct } from '@/lib/products';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { ProductActions } from '@/components/product-actions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, ShieldCheck, Award, Truck, RotateCcw, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Aurelia`,
    description: product.description,
  };
}

function ProductSchema({ product }: { product: any }) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Aurelia',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/products/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);
  const reviews = getReviewsByProduct(product.id);

  return (
    <>
      <ProductSchema product={product} />
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <Link href="/collections" className="inline-flex items-center text-sm text-muted-foreground hover:text-gold-600 mb-8">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Collections
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.isNew && <Badge className="absolute top-4 left-4 bg-gold-500 text-white">New</Badge>}
                {product.isBestSeller && <Badge className="absolute top-4 left-4 bg-charcoal text-white">Best Seller</Badge>}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity">
                    <Image src={img} alt={`${product.name} view ${idx + 2}`} fill className="object-cover" sizes="25vw" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-charcoal">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <Badge className="bg-red-600 text-white">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                    </Badge>
                  </>
                )}
              </div>

              {product.stock < 10 && product.stock > 0 && (
                <p className="text-sm text-orange-600 mb-4">Only {product.stock} left in stock!</p>
              )}
              {product.stock === 0 && (
                <p className="text-sm text-red-600 mb-4">Out of stock</p>
              )}

              {/* Size Guide + Action Buttons (interactive) */}
              <ProductActions product={product} />

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-beige/30 rounded-lg mb-8">
                <div className="text-center">
                  <ShieldCheck className="w-6 h-6 text-gold-600 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Certified</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-gold-600 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Hallmarked</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-gold-600 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-gold-600 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">14-Day Returns</p>
                </div>
              </div>

              {/* Product Highlights */}
              <div className="space-y-2">
                {product.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="max-w-4xl mx-auto mb-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="care">Care Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
                </div>
              </TabsContent>
              <TabsContent value="specs" className="mt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Metal</p>
                    <p className="font-medium">{product.metal}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Purity</p>
                    <p className="font-medium">{product.purity}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Stone</p>
                    <p className="font-medium">{product.stone}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Certification</p>
                    <p className="font-medium">{product.certification}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Warranty</p>
                    <p className="font-medium">{product.warranty}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{product.gender}</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Occasion</p>
                    <p className="font-medium">{product.occasion.join(', ')}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6 bg-beige/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                            ))}
                          </div>
                          <span className="font-medium">{review.title}</span>
                        </div>
                        <p className="text-muted-foreground mb-3">{review.content}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{review.author}</span>
                          <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review!</p>
                )}
              </TabsContent>
              <TabsContent value="care" className="mt-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="cleaning">
                    <AccordionTrigger>Cleaning Instructions</AccordionTrigger>
                    <AccordionContent>
                      Clean with mild soap and warm water. Use a soft brush for intricate designs. Avoid harsh chemicals and ultrasonic cleaners for certain stones.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="storage">
                    <AccordionTrigger>Storage Tips</AccordionTrigger>
                    <AccordionContent>
                      Store each piece separately in a soft pouch or jewelry box to prevent scratches. Keep away from direct sunlight and moisture.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="maintenance">
                    <AccordionTrigger>Professional Maintenance</AccordionTrigger>
                    <AccordionContent>
                      Have your jewelry professionally cleaned and inspected annually. Check prongs and settings regularly to ensure stones are secure.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal mb-8 text-center">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
