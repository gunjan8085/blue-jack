import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            Need help or want to learn more about ZifyPay? Reach out to our team for support, partnership opportunities, or product inquiries. We're here to help you grow your business.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Email: <a href="mailto:support@zifypay.com" className="text-blue-700 underline">support@zifypay.com</a></li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Phone: <a href="tel:+911234567890" className="text-blue-700 underline">+91 12345 67890</a></li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Live chat available 9am–9pm IST</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
