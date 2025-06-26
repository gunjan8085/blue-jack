import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function Security() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Security Concerns</h1>
          <p className="text-lg text-gray-600 mb-8">
            Security is non-negotiable in payments. ZifyPay uses bank-grade encryption, PCI DSS compliance, and real-time fraud monitoring to keep your business and your customers safe.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>End-to-end encryption for every transaction</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Continuous fraud detection and alerts</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Regular security audits and compliance updates</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Role-based access and audit trails</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
