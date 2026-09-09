import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CONTACT_PHONE } from '@/lib/contact';

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-24">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-soft border border-border/50">
              <h1 className="font-serif text-3xl font-bold text-charcoal mb-2 text-center">Create Account</h1>
              <p className="text-muted-foreground text-center mb-8">Join Aurelia for exclusive benefits</p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder={CONTACT_PHONE} />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the Terms & Conditions and Privacy Policy
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-charcoal hover:bg-gold-500 text-white">
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-gold-600 hover:text-gold-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
