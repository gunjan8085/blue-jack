import Navbar from "./Navbar";
import HeroSection from "./herosection";
import VideoSection from "./video-section-simple";
import FeaturesSection from "./features-section";
import ModulesSection from "./modules-section";
import CtaSection from "./cta-section";
import Footer from "./footer";
import BenefitsSection from "./benefits-section"

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-br-4xl">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <BenefitsSection/>
      <ModulesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
