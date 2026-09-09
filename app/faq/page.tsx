import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { faqItems } from '@/lib/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-4 text-center">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find answers to common questions about our jewelry, orders, and services.
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-white rounded-lg px-6 shadow-soft border border-border/50"
                >
                  <AccordionTrigger className="font-serif text-base font-medium text-charcoal text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center p-6 bg-beige/30 rounded-lg">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-2">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Please reach out to our friendly team.
              </p>
              <a href="/contact" className="inline-block">
                <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-md">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
