"use client";
import Image from "next/image";
import { BarChart2, FileText, Smartphone, Shield } from "lucide-react";

const featuresLeft = [
  {
    title: "Real-time analytics",
    description:
      "Gain actionable insights with our real-time analytics feature.",
    icon: BarChart2,
  },
  {
    title: "Customizable reports",
    description:
      "Streamline your financial processes with automated workflows.",
    icon: FileText,
  },
];

const featuresRight = [
  {
    title: "Mobile accessibility",
    description:
      "Manage your finances on the go with our mobile-friendly platform.",
    icon: Smartphone,
  },
  {
    title: "Enhanced security",
    description:
      "Protect your sensitive financial data with our state-of-the-art security measures.",
    icon: Shield,
  },
];

export default function CoreFeatures() {
  return (
    <section className="min-h-screen md:py-48 bg-gradient-to-r from-[#001A39] to-[#001433] py-16 px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto text-center">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          Core features that set us apart from the competition
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto mb-12 text-lg">
          Explore our standout features designed to deliver exceptional
          performance and value, distinguishing us from the competition.
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
            <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
              <Image
                src="https://imgs.search.brave.com/vaGrL2dhG-nY_Czrrn2r0DVheJmTVVrisuAmEk3dj4k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFqUUVpMUNrR0wu/anBn"
                alt="Core Feature Visual"
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
