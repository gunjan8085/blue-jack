import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function Enterprise() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Enterprise</h1>
          <p className="text-lg text-gray-600 mb-8">
            ZifyPay powers large-scale fuel and retail operations with advanced controls, real-time analytics, and robust compliance. Manage multiple locations and teams from a single dashboard.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Centralized management for all sites</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Role-based access and permissions</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Advanced reporting and compliance tools</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Custom integrations and dedicated support</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
