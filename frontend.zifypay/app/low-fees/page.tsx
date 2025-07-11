"use client"
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function LowFees() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">High Transaction Fees</h1>
          <p className="text-lg text-gray-600 mb-8">
            Traditional payment processors eat into your profits with high fees. ZifyPay eliminates transaction fees for fuel and retail businesses, helping you keep more of what you earn—without sacrificing security or compliance.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Zero-fee processing for all payment types</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>No hidden charges or monthly minimums</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Transparent, predictable pricing</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Full PCI DSS compliance and security</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
