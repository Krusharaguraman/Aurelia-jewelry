import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const sizeCharts = [
  {
    category: 'Rings',
    note: 'Measure the inner diameter of a ring you already own, or wrap a string around your finger and compare.',
    sizes: [
      ['Indian Size', 'Diameter (mm)', 'US Size', 'Circumference (mm)'],
      ['5', '15.6', '5', '49'],
      ['6', '16.5', '6', '52'],
      ['7', '17.3', '7', '54.5'],
      ['8', '18.2', '8', '57'],
      ['9', '19.0', '9', '59.5'],
      ['10', '19.8', '10', '62'],
      ['11', '20.6', '11', '64.5'],
      ['12', '21.3', '12', '67'],
      ['13', '22.2', '13', '69.5'],
      ['14', '23.0', '14', '72'],
    ],
  },
  {
    category: 'Bangles',
    note: 'Bangle size is the inner diameter. Measure across a bangle you already wear comfortably.',
    sizes: [
      ['Bangle Size', 'Inner Diameter (inches)'],
      ['Small', '2.2'],
      ['Medium', '2.4'],
      ['Large', '2.6'],
      ['Extra Large', '2.8'],
    ],
  },
  {
    category: 'Necklaces & Chains',
    note: 'Choker: 14-16". Princess: 17-18". Matinee: 20-24". Opera: 28-36".',
    sizes: [
      ['Length', 'Fit'],
      ['16"', 'Choker'],
      ['18"', 'Princess'],
      ['20"', 'Matinee'],
      ['22"', 'Matinee'],
      ['24"', 'Matinee'],
      ['30"', 'Opera'],
    ],
  },
  {
    category: 'Earrings',
    note: 'Stud, Drop, Jhumka and Chandelier styles fit most ear types. Choose by look and occasion.',
    sizes: [
      ['Style', 'Best For'],
      ['Stud', 'Everyday & office wear'],
      ['Drop', 'Evenings & parties'],
      ['Jhumka', 'Traditional events'],
      ['Chandelier', 'Weddings & receptions'],
    ],
  },
  {
    category: 'Bracelets & Anklets',
    note: 'Measure your wrist/ankle with a flexible tape; add 0.5-1" for a comfortable fit.',
    sizes: [
      ['Item', 'Sizes (inches)'],
      ['Bracelet', '6.5, 7, 7.5, 8, 8.5'],
      ['Anklet', '9, 9.5, 10, 10.5, 11'],
    ],
  },
];

export default function SizeGuidePage() {
  return (
    <>
      <Header />
      <main className="pt-8">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl font-bold text-charcoal mb-4 text-center">Size &amp; Fit Guide</h1>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find your perfect fit with our easy size charts. Not sure? Message us and our experts will help you measure correctly.
          </p>

          {sizeCharts.map((chart) => (
            <div key={chart.category} className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">{chart.category}</h2>
              <p className="text-sm text-muted-foreground mb-4">{chart.note}</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-white rounded-lg border border-border/50 shadow-soft">
                  <tbody>
                    {chart.sizes.map((row, i) => (
                      <tr key={i} className={i === 0 ? 'bg-gold-100' : i % 2 === 0 ? 'bg-white' : 'bg-beige/20'}>
                        {row.map((cell, j) => (
                          <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-medium text-charcoal' : 'text-muted-foreground'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="bg-beige/30 rounded-lg p-8 text-center mt-8">
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-3">Still unsure about your size?</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Every Aurelia order in your size can be exchanged within 14 days, and our consultants are happy to guide you.
            </p>
            <a href="/contact" className="inline-block bg-charcoal hover:bg-gold-500 text-white px-8 py-3 rounded-md transition-colors">
              Ask Our Experts
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}