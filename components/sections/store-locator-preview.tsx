'use client';

import { MapPin, Clock, Car, Landmark } from 'lucide-react';
import { SlideUp } from '@/components/motion-wrapper';

export function StoreLocatorPreview() {
  return (
    <section className="py-24 bg-ivory">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <SlideUp>
            <div className="rounded-lg overflow-hidden shadow-luxury h-[400px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.889!2d80.2785!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTMwMDUw!5e0!3m2!1sen!2sin!4v0000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
              />
            </div>
          </SlideUp>

          <div>
            <SlideUp delay={0.1}>
              <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-3">Visit Us</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                Our Flagship Store
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 Heritage Jewelry Avenue, Luxury District,
                      <br />
                      Chennai, Tamil Nadu 600001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Store Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Monday – Saturday: 10:00 AM – 8:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Parking</p>
                    <p className="text-sm text-muted-foreground">Complimentary valet parking</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Landmark className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Landmark</p>
                    <p className="text-sm text-muted-foreground">Opposite Grand Heritage Mall</p>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
}
