"use client";

import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 px-4">
        <section className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 md:p-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            At ZifyPay, we take your privacy seriously. This policy outlines how
            we collect, use, and protect your personal information when you use
            our services.
          </p>

          <div className="space-y-8 text-gray-700 text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. Data Collection
              </h2>
              <p>
                We collect only the necessary information to provide you with a
                seamless and secure experience. This includes your name, email,
                phone number, business details, and payment information when
                needed.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Use of Data
              </h2>
              <p>
                Your data is used solely to enhance your experience, process
                transactions, provide support, and deliver relevant updates. We
                do not sell or rent your data to any third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Data Protection
              </h2>
              <p>
                ZifyPay uses industry-standard encryption and secure
                infrastructure to protect your data at rest and in transit. Our
                systems are regularly audited to maintain the highest level of
                security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                4. Compliance
              </h2>
              <p>
                We are fully compliant with Indian data privacy regulations
                (including the DPDP Act) and international standards such as
                GDPR, where applicable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                5. Your Rights
              </h2>
              <p>
                You have full control over your data. You can access, update, or
                request deletion of your personal information at any time by
                contacting us at{" "}
                <a
                  href="mailto:support@zifypay.com"
                  className="text-blue-600 underline"
                >
                  support@zifypay.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                6. Cookies & Tracking
              </h2>
              <p>
                We use cookies to analyze traffic and improve user experience.
                You can manage cookie preferences in your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                7. Updates to Policy
              </h2>
              <p>
                We may update this policy from time to time. Any changes will be
                reflected here, and continued use of ZifyPay means you accept
                the updated terms.
              </p>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            Last updated: July 1, 2025
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
