import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function ListYourBusiness() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">List Your Business</h1>
          <p className="text-lg text-gray-600 mb-8">
            Join the ZifyPay network and reach more customers. List your fuel station, C-store, or retail business to unlock powerful POS, payments, and analytics tools.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Easy onboarding and setup</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Access to 1,000+ ZifyPay users</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Dedicated business support</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
