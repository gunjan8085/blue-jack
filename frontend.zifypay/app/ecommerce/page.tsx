import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function EcommerceIntegration() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">E-commerce Integration</h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect your C-store or fuel business to online sales channels. ZifyPay offers seamless shopping cart integration, real-time inventory sync, and unified reporting for both in-store and online transactions.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Sync products, prices, and promotions automatically</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Unified dashboard for online and offline sales</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Real-time inventory and order management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Easy integration with Shopify, WooCommerce, and more</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
