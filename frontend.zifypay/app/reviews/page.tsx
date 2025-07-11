import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

export default function Reviews() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Reviews</h1>
          <p className="text-lg text-gray-600 mb-8">
            See what customers are saying about ZifyPay-powered stations and stores. Real feedback from real users helps you choose the best service for your needs.
          </p>
          <ul className="text-left space-y-4 mx-auto max-w-md">
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Verified customer reviews</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Ratings for service, speed, and experience</li>
            <li className="flex items-start gap-3"><span className="inline-block w-2 h-2 mt-2 bg-blue-600 rounded-full"></span>Share your own feedback</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
