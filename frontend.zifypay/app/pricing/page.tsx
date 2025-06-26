import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

const pricingTiers = [
  {
    title: 'Fuel & Retail POS',
    price: '₹0/mo',
    description: 'No monthly software fees. Pay only for hardware or add-ons you choose.',
    features: [
      'Unlimited transactions',
      'All POS features included',
      'Free updates & support',
      'No hidden charges'
    ]
  },
  {
    title: 'Payment Processing',
    price: '0%',
    description: 'Zero transaction fees for all card, wallet, and UPI payments processed via ZifyPay.',
    features: [
      'No MDR or per-transaction fees',
      'Instant settlement',
      'PCI DSS compliance',
      '24/7 support'
    ]
  },
  {
    title: 'Add-ons',
    price: 'Custom',
    description: 'Optional hardware, integrations, and advanced analytics available as add-ons.',
    features: [
      'Pump controller hardware',
      'E-commerce integration',
      'Custom analytics & dashboards',
      'API access'
    ]
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-4xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600 mb-12">
            ZifyPay believes in fair, transparent pricing. No hidden fees, no surprises—just powerful tools to grow your business.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">{tier.title}</h2>
                <div className="text-3xl font-bold mb-2 text-blue-700">{tier.price}</div>
                <div className="text-gray-600 mb-4">{tier.description}</div>
                <ul className="text-left space-y-2 mb-6">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/demo" className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Request Demo</a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
