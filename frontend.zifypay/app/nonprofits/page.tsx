"use client"

import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function Nonprofits() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Non-profits</h1>
          <p className="text-lg text-gray-600 mb-8">
            ZifyPay supports non-profits and community organizations with special rates and easy-to-use tools for managing donations, events, and retail operations.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Discounted processing and POS fees</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Donation and event management tools</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Easy reporting for grants and compliance</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Dedicated support for non-profits</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
