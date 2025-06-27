import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function EcommerceCustomers() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <section className="w-full bg-white py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-black leading-tight">
              Mobile <br />
              Payments
            </h1>
            <div className="flex gap-4 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition">
                Get started
              </button>
              <button className="border border-gray-300 text-black font-semibold py-3 px-6 rounded-md transition hover:bg-gray-100">
                Contact sales
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <img
              src="/mobilepay.png" // Replace with actual image path
              alt="Mobile Payment"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">E-commerce</h1>
          <p className="text-lg text-gray-600 mb-8">
            ZifyPay helps online fuel and retail businesses connect in-store and
            online sales. Enjoy unified inventory, seamless checkout, and
            real-time analytics across all channels.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              Unified product and customer data
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              Integrated loyalty and promotions
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              Real-time inventory sync
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              Easy integration with major e-commerce platforms
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
