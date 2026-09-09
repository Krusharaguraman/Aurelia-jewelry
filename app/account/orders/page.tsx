import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Package, Truck } from 'lucide-react';

const sampleOrders = [
  { id: 'AUR-123456', date: '2026-08-15', items: 'Gold Temple Necklace', status: 'Delivered', total: 285000 },
  { id: 'AUR-123457', date: '2026-09-01', items: 'Pearl Drop Earrings', status: 'Shipped', total: 45000 },
];

export default function OrdersPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12 max-w-3xl">
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-1">My Orders</h1>
          <p className="text-muted-foreground mb-8">Track and review your past purchases.</p>

          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-charcoal">#{order.id}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Package className="w-4 h-4" />
                  {order.items}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  {new Date(order.date).toLocaleDateString('en-IN')} · ₹{order.total.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/collections">
              <Button className="bg-charcoal hover:bg-gold-500 text-white">Shop More</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}