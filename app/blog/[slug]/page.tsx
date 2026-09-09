import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/products';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Aurelia Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-gold-600 mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>

          <article className="max-w-3xl mx-auto">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-xs">
                {post.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              <Link href="/blog">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </button>
              </Link>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-600 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
