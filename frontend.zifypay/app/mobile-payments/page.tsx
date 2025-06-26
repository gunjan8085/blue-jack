import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function MobilePayments() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Mobile Payments</h1>
          <p className="text-lg text-gray-600 mb-8">
            Accept payments anywhere on your forecourt or in-store. ZifyPay enables your staff to process card, wallet, or UPI payments on any mobile device, with instant receipts and real-time sync to your POS and inventory.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Contactless and QR payments for fast, hygienic transactions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Works offline with auto-sync when back online</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Instant digital receipts and SMS confirmations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Integrated with loyalty and promotions</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
