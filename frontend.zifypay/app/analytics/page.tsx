import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Analytics</h1>
          <p className="text-lg text-gray-600 mb-8">
            Track your business performance with ZifyPay's analytics tools. Get insights on sales, inventory, customer trends, and more—all in one place.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Real-time sales and inventory data</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Customer and product trends</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Exportable reports for compliance</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
