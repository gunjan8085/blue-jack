
"use client"
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function FindServices() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Find Services</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover ZifyPay-enabled fuel stations, C-stores, and retail partners near you. Search by location, service type, or special offers to find exactly what you need.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Fuel stations and C-stores in your area</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Special offers and loyalty programs</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Verified ZifyPay partners</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
