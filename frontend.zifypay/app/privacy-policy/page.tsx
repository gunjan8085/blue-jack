import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-8">
            We value your privacy. ZifyPay is committed to protecting your data and ensuring transparency in how we use and store your information. Read our full privacy policy for details.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Data is encrypted and securely stored</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>We never sell your personal information</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Full compliance with Indian and global data laws</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
