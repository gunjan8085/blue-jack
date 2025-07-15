"use client";
import Image from "next/image";
import {
  ShoppingCart,
  LayoutDashboard,
  CreditCard,
  Database,
} from "lucide-react";

const featuresLeft = [
  {
    title: "Unified Billing System",
    description:
      "Manage in-store and online purchases in one seamless dashboard.",
    icon: ShoppingCart,
  },
  {
    title: "Smart Inventory Tracking",
    description:
      "Real-time stock updates and alerts to avoid overstock or shortages.",
    icon: Database,
  },
];

const featuresRight = [
  {
    title: "Customer-Centric Dashboard",
    description:
      "Understand customer trends and personalize engagement with ease.",
    icon: LayoutDashboard,
  },
  {
    title: "Multi-Payment Support",
    description:
      "Accept cards, wallets, UPI & contactless methods without hassle.",
    icon: CreditCard,
  },
];

export default function RetailPOSFeatures() {
  return (
    <section className="min-h-screen md:py-48 bg-gradient-to-r from-[#001A39] to-[#001433] py-16 px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto text-center">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          Retail POS Features That Power Growth
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto mb-12 text-lg">
          Discover how our smart retail solutions help you streamline
          operations, elevate customer experience, and boost sales in-store and
          online.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Features */}
          <div className="flex flex-col gap-8">
            {featuresLeft.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <div className="relative w-[260px] h-[260px]  rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
              <Image
                src="/Pos.png"
                alt="Retail POS Visual"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Features */}
          <div className="flex flex-col gap-8">
            {featuresRight.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 text-left shadow-xl border border-white/20 hover:shadow-2xl transition-all flex flex-col gap-2 min-w-[220px]">
      <div className="mb-2">
        <Icon size={32} color="#fff" strokeWidth={2.2} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-200">{description}</p>
    </div>
  );
}
