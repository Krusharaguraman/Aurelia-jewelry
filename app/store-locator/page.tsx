import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Phone, Mail, MapPin, Landmark, Car, Clock } from 'lucide-react';
import { STORE_CONTACTS } from '@/lib/contact';

const stores = [
  {
    id: 1,
    name: 'Flagship Store - Chennai',
    address: '123 Heritage Jewelry Avenue, Luxury District, Chennai, Tamil Nadu 600001',
    phone: STORE_CONTACTS.chennai.phone,
    email: STORE_CONTACTS.chennai.email,
    hours: 'Monday - Saturday: 10:00 AM - 8:00 PM\nSunday: Closed',
    parking: 'Complimentary valet parking',
    landmark: 'Opposite Grand Heritage Mall',
  },
  {
    id: 2,
    name: 'Bengaluru Boutique',
    address: '456 MG Road, Brigade Road, Bengaluru, Karnataka 560001',
    phone: STORE_CONTACTS.bengaluru.phone,
    email: STORE_CONTACTS.bengaluru.email,
    hours: 'Monday - Saturday: 10:00 AM - 8:00 PM\nSunday: 11:00 AM - 6:00 PM',
    parking: 'Basement parking available',
    landmark: 'Near UB City Mall',
  },
  {
    id: 3,
    name: 'Mumbai Showroom',
    address: '789 Linking Road, Bandra West, Mumbai, Maharashtra 400050',
    phone: STORE_CONTACTS.mumbai.phone,
    email: STORE_CONTACTS.mumbai.email,
    hours: 'Monday - Saturday: 10:00 AM - 9:00 PM\nSunday: 11:00 AM - 7:00 PM',
    parking: 'Street parking available',
    landmark: 'Next to PVR Cinema',
  },
];

export default function StoreLocatorPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-4 text-center">Store Locator</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Visit our stores across India for a personalized jewelry shopping experience.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-luxury h-[500px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.889!2d80.2785!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTMwMDUw!5e0!3m2!1sen!2sin!4v0000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Locations"
              />
            </div>

            {/* Store List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {stores.map((store) => (
                <div key={store.id} className="bg-white rounded-lg p-6 shadow-soft border border-border/50">
                  <h2 className="font-serif text-xl font-bold text-charcoal mb-4">{store.name}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal">Address</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{store.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal">Store Hours</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{store.hours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Car className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal">Parking</p>
                        <p className="text-sm text-muted-foreground">{store.parking}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Landmark className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal">Landmark</p>
                        <p className="text-sm text-muted-foreground">{store.landmark}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal">Phone</p>
                        <p className="text-sm text-muted-foreground">{store.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-charcoal">Email</p>
                        <p className="text-sm text-muted-foreground">{store.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-beige/30 rounded-lg p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">Book an Appointment</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule a personalized consultation with our jewelry experts at your nearest store. We'll help you find the perfect piece for any occasion.
            </p>
            <a href="/contact">
              <button className="bg-charcoal hover:bg-gold-500 text-white px-8 py-3 rounded-md">
                Schedule Visit
              </button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
