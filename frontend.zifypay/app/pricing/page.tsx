import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";

const pricingTiers = [
  {
    title: "Basic",
    price: "$0",
    description:
      "Start for free with essential tools to manage payments and monitor performance.",
    features: [
      "Free transaction processing",
      "Daily payouts to your bank",
      "Access to intuitive business dashboard",
    ],
    popular: false,
  },
  {
    title: "Business",
    price: "$29",
    description:
      "Upgrade your operations with powerful tools built for growing teams and customer loyalty.",
    features: [
      "Full-featured POS application",
      "Built-in loyalty and rewards programs",
      "Advanced sales and performance reports",
    ],
    popular: false,
  },
  {
    title: "Growth",
    price: "$79",
    description:
      "Accelerate your business with automation, faster deposits, and smart revenue tools.",
    features: [
      "Chargeblast automation tools",
      "Same-day bank deposits",
      "Enhanced inventory and customer insights",
    ],
    popular: false,
  },
  {
    title: "Premium",
    price: "$149",
    description:
      "Get the ultimate support and flexibility with enterprise-grade features and personalized service.",
    features: [
      "Dedicated account representative",
      "Custom integrations and support",
      "Full API access for developers",
    ],
    popular: true, // ⭐ Highlight Premium
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 px-4">
        <section className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            ZifyPay Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Transparent pricing that scales with your business. Choose the plan
            that fits your growth stage.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-300 hover:shadow-xl border ${
                  tier.popular
                    ? "border-blue-600 scale-105"
                    : "border-transparent"
                }`}
              >
                {/* Highlight Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Most Popular
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {tier.title}
                </h2>
                <div className="text-4xl font-bold text-blue-700 mb-4">
                  {tier.price}
                  <span className="text-sm text-gray-500">/mo</span>
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>

                <ul className="text-left space-y-3 text-gray-700 mb-6">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="Book-A-Demo"
                  className={`mt-auto w-full px-5 py-3 rounded-lg text-white font-semibold transition ${
                    tier.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-800 hover:bg-gray-900"
                  }`}
                >
                  Request Demo
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-20 px-4 lg:px-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image */}
            <div className="animate-fade-in-left duration-700">
              <img
                src="/pri.png"
                alt="Business owner managing payments with ZifyPay"
                className="w-full rounded-2xl shadow-xl object-cover"
              />
            </div>

            {/* Right Side: Content */}
            <div className="animate-fade-in-up duration-700 delay-200">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose ZifyPay?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ZifyPay is more than just a payment gateway. It’s your
                all-in-one toolkit for running smarter, faster, and more
                profitable operations — whether you're managing a single outlet
                or scaling across regions.
              </p>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Centralized Business Control
                    </h3> 
                    <p className="text-gray-600 text-sm">
                      Manage payments, inventory, staff, and insights  all from
                      one intuitive dashboard.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Transparent Pricing
                    </h3>
                    <p className="text-gray-600 text-sm">
                      No hidden charges. Simple, predictable pricing helps you
                      manage costs confidently.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Made for Indian Businesses
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Optimized for UPI, Rupay, GST workflows, and multilingual
                      operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
               
         
        </section>
      </main>
      <Footer />
    </div>
  );
}
