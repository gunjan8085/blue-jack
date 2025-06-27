import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function MultiCurrency() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Multi-currency</h1>
          <p className="text-lg text-gray-600 mb-8">
            Accept payments in any currency, from any customer. ZifyPay supports global payment acceptance, automatic currency conversion, and transparent reporting for international transactions.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Accept all major global currencies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Automatic conversion and transparent rates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Unified reporting for all transactions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Compliant with international payment standards</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
