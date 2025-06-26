import Image from "next/image";
import HeroSection from "@/components/pos/Herosection";
import Subsection1 from "@/components/pos/subsection";
import { Navbar5 } from "@/components/pos/navbar-5";
import Subsection2 from "@/components/pos/subsection2";
import Subsection4 from "@/components/pos/subsection4";
import Subsection3 from "@/components/pos/subsection3";
import Footer from "@/components/pos/Footer";
import FAQ from "@/components/pos/FAQ";

export default function Home() {
  return (
    <div className="bg-gray-300">
      <Navbar5 />
     
      <HeroSection />
      <Subsection1 />
      <Subsection2 />

      <Subsection4 />
      <FAQ />
      <Subsection3 />
      <Footer />
    </div>
  );
}
