import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { ShieldCheck, Hammer, Palette, Headphones, ArrowRight, Award } from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '10,000+', label: 'Custom Designs Created' },
  { value: '100%', label: 'Certified Jewelry' },
  { value: '2018', label: 'Trusted Since' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Certified Authenticity',
    desc: 'Every piece comes with GIA and BIS certification, guaranteeing the purity and quality of our metals and stones.',
  },
  {
    icon: Hammer,
    title: 'Master Craftsmanship',
    desc: 'Our artisans bring decades of heritage expertise to every handcrafted piece, from casting to the final polish.',
  },
  {
    icon: Palette,
    title: 'Bespoke Designs',
    desc: 'From sketches to certified masterpieces, our design consultants create one-of-a-kind jewelry tailored to you.',
  },
  {
    icon: Headphones,
    title: 'Lifetime Support',
    desc: 'Complimentary cleaning, polishing, and inspection for life — because your jewelry journey never ends.',
  },
];

export const metadata = {
  title: 'About Us | Aurelia',
  description:
    'Discover Aurelia — premium handcrafted luxury jewelry blending heritage craftsmanship with modern elegance since 2018.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        {/* Hero */}
        <section className="bg-beige/40 py-16">
          <div className="container-luxury text-center">
            <SlideUp>
              <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">About Aurelia</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Timeless Elegance, Crafted with Trust. We are a premium handcrafted jewelry house blending
                generations of heritage craftsmanship with contemporary design.
              </p>
            </SlideUp>
          </div>
        </section>


        {/* Story */}
        <section className="py-20">
          <div className="container-luxury grid lg:grid-cols-2 gap-12 items-center">
            <SlideUp>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-luxury">
                <Image
                  src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Aurelia craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SlideUp>
            <SlideUp delay={0.15}>
              <h2 className="font-serif text-3xl font-bold text-charcoal mb-4">Heritage Meets Modern Elegance</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2018, Aurelia was born from a simple belief: jewelry should be more than an
                  accessory — it should be a story you carry with you. Every piece we create honors the
                  timeless artistry of Indian jewelry-making while embracing the sensibilities of the modern
                  wearer.
                </p>
                <p>
                  From our flagship atelier in Chennai, our master artisans handcraft each ring, necklace,
                  bangle, and earring using certified metals and stones. Whether it is a bridal temple set
                  passed down for generations or a bespoke engagement ring designed from scratch, we treat
                  every creation as a legacy in the making.
                </p>
                <p>
                  Today, thousands of customers across India trust Aurelia for life&apos;s most precious
                  moments — and our lifetime support promise means we are with them for every moment after,
                  too.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild className="bg-charcoal hover:bg-gold-500 text-white">
                  <Link href="/collections">
                    Explore Collections
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white">
                  <Link href="/custom-design">Design Your Own</Link>
                </Button>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-charcoal">
          <div className="container-luxury">
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-400 mb-1">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container-luxury">
            <SlideUp className="text-center mb-12">
              <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">What We Stand For</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Our Promise to You</h2>
            </SlideUp>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <div className="flex gap-4 p-6 rounded-lg bg-white shadow-soft border border-border/50 h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-charcoal mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container-luxury">
            <div className="bg-beige/40 rounded-lg p-10 text-center">
              <Award className="w-10 h-10 text-gold-600 mx-auto mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-3">
                Visit Us or Start Your Custom Journey
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Experience our craftsmanship in person at one of our stores, or collaborate with our designers
                to create a piece that is uniquely yours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-charcoal hover:bg-gold-500 text-white">
                  <Link href="/store-locator">Find a Store</Link>
                </Button>
                <Button asChild variant="outline" className="border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-white">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

