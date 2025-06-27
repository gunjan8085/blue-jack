import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function Startups() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Startups</h1>
          <p className="text-lg text-gray-600 mb-8">
            Launch your new fuel or retail business with ZifyPay. Get up and running fast with minimal setup, flexible pricing, and all the tools you need to grow.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Quick setup and onboarding</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Affordable, scalable plans</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>All-in-one POS and payments</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Expert support for new businesses</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
