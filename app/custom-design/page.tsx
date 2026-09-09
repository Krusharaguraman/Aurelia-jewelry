'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CheckCircle2, Palette, Hammer, MessageSquare, PackageCheck } from 'lucide-react';
import { CONTACT_PHONE } from '@/lib/contact';

const metals = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Silver'];
const stones = ['Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'Kundan', 'Polki', 'No Stone'];
const budgets = ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,50,000', '₹2,50,000+'];
const occasions = ['Engagement', 'Wedding', 'Anniversary', 'Birthday', 'Festive', 'Everyday', 'Other'];

const processSteps = [
  {
    icon: MessageSquare,
    title: 'Free Consultation',
    desc: 'Share your vision, inspiration, and budget. Our design consultants guide you through every option.',
  },
  {
    icon: Palette,
    title: 'Design & Approve',
    desc: 'Our designers create sketches and CAD renders for your approval. Unlimited revisions until it is perfect.',
  },
  {
    icon: Hammer,
    title: 'Handcrafted',
    desc: 'Master artisans with decades of experience handcraft your piece with meticulous attention to detail.',
  },
  {
    icon: PackageCheck,
    title: 'Certified Delivery',
    desc: 'Your finished piece arrives fully certified, hallmarked, and insured within 3-4 weeks.',
  },
];

export default function CustomDesignPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    metal: '',
    stone: '',
    budget: '',
    occasion: '',
    notes: '',
  });
  const [inspirationImage, setInspirationImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB.');
      return;
    }
    setError('');
    const reader = new FileReader();
    reader.onload = () => setInspirationImage(reader.result as string);
    reader.readAsDataURL(file);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.metal || !form.stone || !form.budget) {
      setError('Please fill in your name, email, metal, stone, and budget.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    try {
      const res = await fetch('/api/custom-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          inspirationImage: inspirationImage || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const hint = data.detail && data.detail !== data.error ? ` (${data.detail})` : '';
        setError((data.error || 'Failed to submit your design request. Please try again.') + hint);
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      <Header />
      <main className="pt-8">
        {/* Hero */}
        <section className="bg-beige/40 py-16">
          <div className="container-luxury text-center">
            <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Bespoke Atelier</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">Custom Design Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create your own unique piece with our custom design service. Upload your inspiration, choose your
              metal, stone, and budget — our master craftsmen will bring your vision to life with a free
              consultation.
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container-luxury">
            <h2 className="font-serif text-3xl font-bold text-charcoal mb-10 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div key={step.title} className="p-8 rounded-lg bg-white shadow-soft border border-border/50 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-gold-600" />
                  </div>
                  <p className="text-xs text-gold-600 tracking-[0.2em] uppercase mb-1">Step {idx + 1}</p>
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Form */}
        <section className="pb-20">
          <div className="container-luxury max-w-3xl">
            <div className="bg-white rounded-lg p-8 shadow-soft border border-border/50">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Request Received!</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you, {form.name.split(' ')[0]}. Our design consultant will reach out within 24 hours to
                    schedule your free consultation.
                  </p>
                  <Button asChild className="bg-charcoal hover:bg-gold-500 text-white">
                    <Link href="/collections">Browse Collections</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Start Your Design</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill in the details below and our team will contact you within 24 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder={CONTACT_PHONE}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Metal *</Label>
                        <Select value={form.metal} onValueChange={(v) => handleInputChange('metal', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select metal" />
                          </SelectTrigger>
                          <SelectContent>
                            {metals.map((m) => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Stone *</Label>
                        <Select value={form.stone} onValueChange={(v) => handleInputChange('stone', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stone" />
                          </SelectTrigger>
                          <SelectContent>
                            {stones.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Budget *</Label>
                        <Select value={form.budget} onValueChange={(v) => handleInputChange('budget', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgets.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Occasion</Label>
                        <Select value={form.occasion} onValueChange={(v) => handleInputChange('occasion', v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occasion" />
                          </SelectTrigger>
                          <SelectContent>
                            {occasions.map((o) => (
                              <SelectItem key={o} value={o}>{o}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Describe Your Design</Label>
                      <Textarea
                        id="notes"
                        rows={5}
                        value={form.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Describe the piece you have in mind — style, motifs, engravings, inspiration, anything else..."
                      />
                    </div>

                    <div>
                      <Label>Inspiration Image</Label>
                      <div className="mt-1 flex items-center gap-4">
                        <label className="flex-1 cursor-pointer border border-dashed border-border rounded-lg px-4 py-6 text-center hover:border-gold-500 transition-colors">
                          <Upload className="w-6 h-6 text-gold-600 mx-auto mb-2" />
                          <span className="text-sm text-muted-foreground">
                            {inspirationImage ? 'Replace image' : 'Upload an inspiration photo (max 5 MB)'}
                          </span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                        {inspirationImage && (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0">
                            <Image src={inspirationImage} alt="Inspiration" fill className="object-cover" unoptimized />
                          </div>
                        )}
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-red-600" role="alert">
                        {error}
                      </p>
                    )}

                    <Button type="submit" className="w-full bg-charcoal hover:bg-gold-500 text-white" size="lg">
                      Submit Design Request
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Free consultation · No obligation · Custom pieces take 3-4 weeks
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

