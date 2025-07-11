"use client"
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function UserExperience() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Poor User Experience</h1>
          <p className="text-lg text-gray-600 mb-8">
            Slow checkouts and confusing interfaces frustrate customers and staff. ZifyPay delivers a modern, intuitive POS and mobile experience that keeps lines moving and customers happy.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Touch-based, dual-screen POS for fast service</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Mobile payments and digital receipts</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Integrated loyalty and promotions</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Consistent experience across all devices</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
