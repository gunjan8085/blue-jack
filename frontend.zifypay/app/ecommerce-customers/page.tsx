import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function EcommerceCustomers() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">E-commerce</h1>
          <p className="text-lg text-gray-600 mb-8">
            ZifyPay helps online fuel and retail businesses connect in-store and online sales. Enjoy unified inventory, seamless checkout, and real-time analytics across all channels.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Unified product and customer data</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Integrated loyalty and promotions</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Real-time inventory sync</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Easy integration with major e-commerce platforms</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
