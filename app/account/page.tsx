'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Heart, GitCompare, MapPin, Settings, LogOut, Package, Clock, CheckCircle2 } from 'lucide-react';

export default function AccountPage() {
  const orders = [
    { id: 'AUR-123456', date: '2026-08-15', status: 'Delivered', total: 125000 },
    { id: 'AUR-123457', date: '2026-09-01', status: 'Shipped', total: 45000 },
  ];

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-beige/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User className="w-10 h-10 text-gold-600" />
                  </div>
                  <h2 className="font-serif text-lg font-bold text-charcoal">John Doe</h2>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>

                <nav className="space-y-1">
                  <Link href="/account" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold-100 text-gold-700 font-medium">
                    <User className="w-5 h-5" />
                    Profile
                  </Link>
                  <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-beige/50 text-muted-foreground transition-colors">
                    <Package className="w-5 h-5" />
                    Orders
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-beige/50 text-muted-foreground transition-colors">
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>
                  <Link href="/compare" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-beige/50 text-muted-foreground transition-colors">
                    <GitCompare className="w-5 h-5" />
                    Compare
                  </Link>
                  <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-beige/50 text-muted-foreground transition-colors">
                    <MapPin className="w-5 h-5" />
                    Addresses
                  </Link>
                  <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-beige/50 text-muted-foreground transition-colors">
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                  <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Profile Overview */}
              <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">My Account</h2>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-beige/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-charcoal">{orders.length}</p>
                    <p className="text-sm text-muted-foreground">Orders</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-charcoal">3</p>
                    <p className="text-sm text-muted-foreground">Wishlist</p>
                  </div>
                  <div className="p-4 bg-beige/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-charcoal">2</p>
                    <p className="text-sm text-muted-foreground">Addresses</p>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-charcoal">{order.id}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{new Date(order.date).toLocaleDateString('en-IN')}</span>
                        <span className="font-medium">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/account/orders">
                  <Button variant="outline" className="w-full mt-4">
                    View All Orders
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
