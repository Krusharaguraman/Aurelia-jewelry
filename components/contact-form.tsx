'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const hint = data.detail && data.detail !== data.error ? ` (${data.detail})` : '';
        setErrorMessage((data.error || 'Failed to send your message. Please try again.') + hint);
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-soft border border-border/50">
      <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">Send us a Message</h2>

      {status === 'success' ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Send className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. We will get back to you within 24 hours.
          </p>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={form.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="How can we help?"
            />
          </div>
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us more about your inquiry..."
              rows={6}
              required
            />
          </div>

          {status === 'error' && errorMessage && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3" role="alert">
              {errorMessage}
            </p>
          )}

          <Button type="submit" className="w-full bg-charcoal hover:bg-gold-500 text-white" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
