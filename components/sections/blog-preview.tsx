'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/products';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

export function BlogPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container-luxury">
        <SlideUp className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Insights & Guides</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            From Our Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert guides and tips to help you make informed decisions about your jewelry.
          </p>
        </SlideUp>

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium text-charcoal mb-2 group-hover:text-gold-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-gold-600 group-hover:text-gold-700">
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
