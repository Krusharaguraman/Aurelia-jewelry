'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { products } from '@/lib/products';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useStore } from '@/components/store-provider';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  'Help me choose a wedding necklace',
  'Find jewelry under ₹50,000',
  'Recommend anniversary gifts',
  'Explain diamond certification',
  'What ring size should I buy?',
  'Suggest bridal jewelry',
];

const systemPrompt = `You are Aurelia AI Jewelry Consultant, a luxury jewelry expert assistant for Aurelia, a premium handcrafted jewelry brand. 

When recommending products, ALWAYS include the product slug in this format: [product:slug-name]. For example: [product:eternal-diamond-solitaire-ring] or [product:bridal-kundan-bangle-set].

Available products and their slugs:
- eternal-diamond-solitaire-ring (Diamond Ring, ₹1,25,000)
- royal-gold-temple-necklace (Temple Necklace, ₹2,85,000)
- bridal-kundan-bangle-set (Bangle Set, ₹1,95,000)
- pearl-drop-earrings (Pearl Earrings, ₹45,000)
- temple-jewelry-jhumka-set (Jhumka Set, ₹1,65,000)
- custom-engagement-ring (Custom Ring, ₹85,000)
- vintage-gold-chain (Gold Chain, ₹75,000)
- diamond-tennis-bracelet (Diamond Bracelet, ₹1,55,000)
- silver-anklet-payal (Silver Anklet, ₹8,500)
- emerald-pendant-necklace (Emerald Pendant, ₹95,000)

Help customers with jewelry recommendations, diamond certification questions, sizing guidance, and bridal jewelry suggestions. Be elegant, knowledgeable, and concise. Keep responses under 150 words.`;

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useStore();
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const renderProductCard = (slug: string) => {
    const product = products.find(p => p.slug === slug);
    if (!product) return null;

    return (
      <div className="my-2 p-3 bg-white rounded-lg border border-gold-200 hover:border-gold-500 transition-colors">
        <div className="flex items-center gap-3">
          <Link href={`/products/${product.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted relative flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm font-medium text-charcoal truncate">{product.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{product.category}</p>
              <p className="text-sm font-semibold text-gold-600">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </Link>
          <Button
            size="icon"
            onClick={() => {
              addToCart(product);
              toast({ title: 'Added to your cart!' });
            }}
            className="bg-charcoal hover:bg-gold-500 text-white flex-shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="mt-2 block text-center text-xs text-gold-600 hover:text-gold-700 font-medium"
        >
          View & select size →
        </Link>
      </div>
    );
  };

  const CustomMarkdown = ({ children }: { children: string }) => {
    const segments = children.split(/(\[product:[^\]]+\])/g);

    return (
      <>
        {segments.map((segment, index) => {
          const match = segment.match(/^\[product:([^\]]+)\]$/);
          if (match) {
            return <div key={`product-${index}`}>{renderProductCard(match[1])}</div>;
          }
          if (!segment.trim()) return null;
          return <ReactMarkdown key={`text-${index}`}>{segment}</ReactMarkdown>;
        })}
      </>
    );
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          systemPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      console.log('API Response:', data);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I apologize, but I am having trouble connecting right now. Please try again in a moment, or contact our team at ${CONTACT_EMAIL} for immediate assistance.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[calc(100dvh-7rem)] bg-white rounded-2xl shadow-luxury-lg border border-border flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-gold-600 to-gold-400 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-white text-sm font-medium">Aurelia AI Consultant</h3>
                  <p className="text-white/80 text-xs">Your personal jewelry expert</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-4">
                    <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Hello! I am your personal jewelry consultant. How can I help you today?
                    </p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-beige/50 hover:bg-beige transition-colors text-charcoal"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm prose prose-sm ${
                        msg.role === 'user'
                          ? 'bg-gold-500 text-white rounded-br-sm prose-invert'
                          : 'bg-beige text-charcoal rounded-bl-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <CustomMarkdown>{msg.content}</CustomMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-beige px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about jewelry..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gold-500 hover:bg-gold-600"
                  disabled={loading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 shadow-luxury-lg flex items-center justify-center text-white"
        aria-label="Open AI assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
