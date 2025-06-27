import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function InstantSettlement() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Payment Delays</h1>
          <p className="text-lg text-gray-600 mb-8">
            Waiting days for your funds can disrupt operations. ZifyPay offers instant settlement, so your money is available as soon as the transaction is complete—no more cash flow headaches.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Funds available instantly after each sale</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>No waiting for batch settlements</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Improved cash flow for daily operations</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Real-time transaction tracking</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
