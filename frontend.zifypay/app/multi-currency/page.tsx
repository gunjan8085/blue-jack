import Navbar from "@/components/landingPage/Navbar";
import Footer from "@/components/Footer";
import { CTASection } from "@/components/cta-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { FeaturesList } from "@/components/features-list";
// import {HardwareSection} from"@/components/hardware-card";
import { ContentMarquee } from "@/components/content-marquee";
import { HardwareSection } from "@/components/hardware-section";
import { FAQSection } from "@/components/faq-section";
export default function MobilePayments() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <section className="w-full bg-white py-16 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-black leading-tight">
              Multi-currency <br />
              Integration
            </h1>
            <div className="flex gap-4 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition">
                Get started
              </button>
              <button className="border border-gray-300 text-black font-semibold py-3 px-6 rounded-md transition hover:bg-gray-100">
                Contact sales
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <img
              src="/mult.png" // Replace with actual image path
              alt="Mobile Payment"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <FeaturesShowcase />
      <section className="w-full bg-white px-4 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-6 text-gray-800 text-lg">
            <div className="flex items-start gap-3">
              <span className="text-xl">🌀</span>
              <span>Accept all major global currencies</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🖥️</span>
              <span>Automatic conversion and transparent rates</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">📦</span>
              <span>Unified reporting for all transactions</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🔌</span>
              <span>Compliant with international payment standards</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <img
              src="/2rec.png" // Replace with your actual path
              alt="Omnichannel ecommerce integration"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* <FeaturesList /> */}
      <HardwareSection />
      <ContentMarquee autoPlay={true} autoPlayInterval={4000} />
      <CTASection />
      <FAQSection />

      <Footer />
    </div>
  );
}
