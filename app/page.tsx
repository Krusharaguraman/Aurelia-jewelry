import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { AboutPreview } from '@/components/sections/about-preview';
import { FeaturedCollections } from '@/components/sections/featured-collections';
import { ShopByCategory } from '@/components/sections/shop-by-category';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Testimonials } from '@/components/sections/testimonials';
import { BlogPreview } from '@/components/sections/blog-preview';
import { FAQPreview } from '@/components/sections/faq-preview';
import { StoreLocatorPreview } from '@/components/sections/store-locator-preview';
import { ContactPreview } from '@/components/sections/contact-preview';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutPreview />
        <FeaturedCollections />
        <ShopByCategory />
        <WhyChooseUs />
        <Testimonials />
        <BlogPreview />
        <FAQPreview />
        <StoreLocatorPreview />
        <ContactPreview />
      </main>
      <Footer />
    </>
  );
}
