"use client"
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function SmallBusiness() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Small Business</h1>
          <p className="text-lg text-gray-600 mb-8">
            ZifyPay is perfect for growing fuel stations and C-stores. Get enterprise-grade features with simple setup, affordable pricing, and dedicated support—no IT team required.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Easy onboarding and migration</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>All-in-one POS, payments, and inventory</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>24/7 support and training</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Scales as your business grows</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
