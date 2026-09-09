export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  metal: string;
  purity: string;
  stone: string;
  weight: string;
  certification: string;
  warranty: string;
  stock: number;
  rating: number;
  reviewCount: number;
  gender: 'Women' | 'Men' | 'Unisex' | 'Kids';
  occasion: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  hasSizeGuide: boolean;
  sizeGuideType: 'ring' | 'bangle' | 'bracelet' | 'anklet' | 'necklace' | 'chain' | 'earring' | null;
  highlights: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CompareItem {
  product: Product;
}

export interface CustomDesign {
  id: string;
  name: string;
  email: string;
  phone: string;
  metal: string;
  stone: string;
  budget: string;
  occasion: string;
  notes: string;
  inspirationImage?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  count: number;
}
