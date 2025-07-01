"use client";

import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center px-4 py-20">
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Let’s Talk
              </h1>
              <p className="text-gray-600 text-lg">
                Whether you're a small business or a growing enterprise, we're
                here to help. Reach out to the ZifyPay team for product
                questions, support, or partnership inquiries.
              </p>
            </div>

            <ul className="space-y-6 text-gray-700 text-base">
              <li>
                <div className="font-semibold text-gray-800 mb-1">Email</div>
                <a
                  href="mailto:support@zifypay.com"
                  className="text-blue-600 underline"
                >
                  support@zifypay.com
                </a>
              </li>
              <li>
                <div className="font-semibold text-gray-800 mb-1">Phone</div>
                <a href="tel:+911234567890" className="text-blue-600 underline">
                  +91 12345 67890
                </a>
              </li>
              <li>
                <div className="font-semibold text-gray-800 mb-1">
                  Live Chat
                </div>
                Available from{" "}
                <span className="font-medium">9:00 AM – 9:00 PM IST</span>
              </li>
              <li>
                <div className="font-semibold text-gray-800 mb-1">Address</div>
                ZifyPay HQ, Sector 62, Noida, UP, India
              </li>
            </ul>
          </div>

          {/* Right Side - Contact Form */}
          <form className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Send us a message
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
              >
                Submit Message
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
