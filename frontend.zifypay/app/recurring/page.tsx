import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function RecurringBilling() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Recurring Billing</h1>
          <p className="text-lg text-gray-600 mb-8">
            Automate subscription and membership payments for your car wash, fleet, or loyalty programs. ZifyPay makes it easy to set up, manage, and track recurring payments with full transparency and compliance.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Automated invoicing and payment collection</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Flexible billing cycles and customer management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Instant notifications for failed or successful payments</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>
              <span>Detailed reporting and compliance support</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
