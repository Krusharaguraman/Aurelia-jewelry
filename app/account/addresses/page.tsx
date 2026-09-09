'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Trash2 } from 'lucide-react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', line: '123 Heritage Jewelry Avenue, Luxury District, Chennai, Tamil Nadu 600001' },
  ]);
  const [line, setLine] = useState('');

  const addAddress = () => {
    if (!line.trim()) return;
    setAddresses((prev) => [...prev, { id: Date.now(), label: `Address ${prev.length + 1}`, line: line.trim() }]);
    setLine('');
  };

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-3xl">
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-8">My Addresses</h1>

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-lg p-5 shadow-soft border border-border/50 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal">{addr.label}</p>
                  <p className="text-sm text-muted-foreground">{addr.line}</p>
                </div>
                <button
                  onClick={() => setAddresses((prev) => prev.filter((a) => a.id !== addr.id))}
                  className="p-2 text-muted-foreground hover:text-red-500"
                  aria-label="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-beige/30 rounded-lg p-6">
            <h2 className="font-serif text-lg font-bold text-charcoal mb-4">Add New Address</h2>
            <Label htmlFor="addr">Address</Label>
            <Input id="addr" value={line} onChange={(e) => setLine(e.target.value)} placeholder="Street, city, state, PIN" />
            <Button onClick={addAddress} className="mt-3 bg-charcoal hover:bg-gold-500 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}