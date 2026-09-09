import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-24">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-soft border border-border/50">
              <h1 className="font-serif text-3xl font-bold text-charcoal mb-2 text-center">Welcome Back</h1>
              <p className="text-muted-foreground text-center mb-8">Sign in to your Aurelia account</p>

              <form className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">Remember me</Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-gold-600 hover:text-gold-700">
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full bg-charcoal hover:bg-gold-500 text-white">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-gold-600 hover:text-gold-700 font-medium">
                    Create one
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
