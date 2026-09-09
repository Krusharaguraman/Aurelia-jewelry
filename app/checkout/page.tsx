'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/store-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Truck, ArrowRight, Lock } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { CONTACT_PHONE } from '@/lib/contact';

export default function CheckoutPage() {
  const { cart, cartTotal } = useStore();
  const [step, setStep] = useState(1);

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-8">
          <div className="container-luxury py-24 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link href="/collections">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder={CONTACT_PHONE} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Street, City" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Chennai" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" placeholder="600001" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Tamil Nadu" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg mb-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit/Debit Card
                    </Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-6 bg-charcoal rounded" />
                      <div className="w-10 h-6 bg-blue-600 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg mb-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      UPI Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg mb-3">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                      Net Banking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="emi" id="emi" />
                    <Label htmlFor="emi" className="flex-1 cursor-pointer">
                      EMI (0% Interest)
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the Terms & Conditions and Privacy Policy. I understand that my order is subject to the return policy.
                </Label>
              </div>

              <Button className="w-full bg-charcoal hover:bg-gold-500 text-white" size="lg">
                Place Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                Your payment information is secure and encrypted
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-beige/30 rounded-lg p-6 sticky top-24">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-muted flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-charcoal truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-charcoal">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="font-medium">{formatPrice(cartTotal * 0.18)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-charcoal">Total</span>
                    <span className="font-bold text-xl text-charcoal">{formatPrice(cartTotal * 1.18)}</span>
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground space-y-1">
                  <p>Free insured shipping</p>
                  <p>14-day return policy</p>
                  <p>Lifetime warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
