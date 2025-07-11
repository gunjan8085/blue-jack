"use client"
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function EasyIntegration() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Integration Complexity</h1>
          <p className="text-lg text-gray-600 mb-8">
            Integrating new technology shouldn't be a headache. ZifyPay offers simple APIs, plug-and-play hardware, and expert onboarding to get you live fast—no technical expertise required.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Plug-and-play POS and pump integration</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Comprehensive API documentation</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Dedicated onboarding support</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Works with your existing hardware</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
