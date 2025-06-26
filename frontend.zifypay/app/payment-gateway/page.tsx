import Image from 'next/image';
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    title: "Zero Transaction Fees",
    description: "Eliminate payment processing fees while maintaining full compliance with all major card networks.",
    icon: "/icons/zero-fees.svg"
  },
  {
    title: "Fuel Integration",
    description: "Seamlessly integrate with all major fuel pump brands for unified transaction processing.",
    icon: "/icons/fuel-pump.svg"
  },
  {
    title: "Real-time Processing",
    description: "Instant transaction processing with immediate settlement options.",
    icon: "/icons/real-time.svg"
  },
  {
    title: "Multi-Payment Support",
    description: "Accept credit cards, debit cards, mobile wallets, and fleet cards.",
    icon: "/icons/payments.svg"
  }
];

const securityFeatures = [
  "PCI DSS Level 1 Compliance",
  "End-to-end Encryption",
  "Fraud Detection",
  "Real-time Monitoring",
  "Automated Compliance Reporting"
];

export default function PaymentGateway() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Secure Payment Processing with Zero Fees
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Modernize your fuel station's payment processing with our integrated gateway. 
              Accept all payment types with no transaction fees, instant settlement, and 
              complete security.
            </p>
            <div className="flex gap-4">
              <a 
                href="/demo" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Schedule Demo
              </a>
              <a 
                href="/pricing" 
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 mb-6 relative">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
              Bank-Grade Security & Compliance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 flex items-center justify-center text-center"
                >
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Easy Integration with Your Current System
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our payment gateway integrates seamlessly with all major fuel pump brands 
                and POS systems. Get up and running in less than a day with our expert 
                support team.
              </p>
              <ul className="space-y-4">
                {[
                  "Direct pump integration",
                  "Works with existing hardware",
                  "24/7 technical support",
                  "Free installation assistance"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-xl p-8">
                <div className="aspect-video relative">
                  <Image
                    src="/images/integration-demo.png"
                    alt="Integration Demo"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Eliminate Transaction Fees?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join over 1,000 fuel stations already saving thousands monthly
          </p>
          <a
            href="/demo"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-block"
          >
            Get Started Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
