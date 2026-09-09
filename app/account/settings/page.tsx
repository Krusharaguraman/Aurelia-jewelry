'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Bell, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-2xl">
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-8">Account Settings</h1>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gold-600" />
                Profile
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Label>Name</Label>
                <Input defaultValue="John Doe" />
                <Label>Email</Label>
                <Input type="email" defaultValue="john@example.com" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-gold-600" />
                Notifications
              </h2>
              <div className="flex items-center gap-2">
                <Checkbox id="notifEmail" defaultChecked />
                <Label htmlFor="notifEmail" className="text-sm cursor-pointer">Email me about orders and offers</Label>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
                Security
              </h2>
              <p className="text-sm text-muted-foreground mb-3">Change your password any time through the login screen.</p>
              <Link href="/forgot-password" className="text-sm text-gold-600 hover:text-gold-700">Reset password →</Link>
            </div>

            <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} className="bg-charcoal hover:bg-gold-500 text-white w-full">
              {saved ? 'Saved ✓' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}