'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSent(true);
  };

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-24">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-soft border border-border/50">
              <h1 className="font-serif text-3xl font-bold text-charcoal mb-2 text-center">Reset Password</h1>
              <p className="text-muted-foreground text-center mb-8">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-charcoal mb-2">Check your inbox</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    If an account exists for <strong>{email}</strong>, a password reset link is on its way.
                  </p>
                  <Button variant="outline" onClick={() => setSent(false)}>Use a different email</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-charcoal hover:bg-gold-500 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Reset Link
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Remembered it?{' '}
                    <Link href="/login" className="text-gold-600 hover:text-gold-700 font-medium">
                      Sign in
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}