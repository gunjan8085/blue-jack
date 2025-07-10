"use client";
import Image from "next/image";

const features = [
  {
    title: "Convenience & Repeat Business",
    text: "A POS system offers convenience, encourages repeat business, and transforms pump stations into profitable businesses.",
  },
  {
    title: "Outdated Methods Lose Revenue",
    text: "Gas stations using old payment methods earn less than those with modern fuel retail POS systems. Not all POS software is as easy or customizable as ours.",
  },
  {
    title: "Grow Your Business",
    text: "Outdated POS systems slow down checkouts and lose customers. Fast, modern POS keeps customers happy and boosts convenience store sales.",
  },
  {
    title: "The New Age of POS",
    text: "Tablets, card readers, scanners, and digital payments are the new standard. Upgrade to deliver unmatched customer service.",
  },
  {
    title: "Customizable Features",
    text: "Our fuel POS system comes with a host of customizable features tailored to your gas station's needs.",
  },
];

export default function Bendo() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#001A39] to-[#001433] flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6 bento-grid">
        {/* Top Left Card */}
        <BentoCard
          className="row-span-2"
          title={features[0].title}
          text={features[0].text}
        />
        {/* Top Center Image */}
        <div className="row-span-2 flex items-center justify-center rounded-3xl bg-[#ebf8ff] shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Fuel Retail POS"
            width={260}
            height={320}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>
        {/* Top Right Card */}
        <BentoCard
          className="row-span-1"
          title={features[1].title}
          text={features[1].text}
        />
        {/* Middle Right Card */}
        <BentoCard
          className="row-span-1"
          title={features[2].title}
          text={features[2].text}
        />
        {/* Bottom Left Card */}
        <BentoCard
          className="row-span-1"
          title={features[3].title}
          text={features[3].text}
        />
        {/* Bottom Right Card */}
        <BentoCard
          className="row-span-1"
          title={features[4].title}
          text={features[4].text}
        />
        {/* Buttons in the grid */}
        <div className="col-span-1 md:col-span-3 flex justify-center gap-6 mt-4">
          <button
            className="px-10 py-4 rounded-2xl text-lg font-semibold text-white bg-blue-600 bg-opacity-60 backdrop-blur-md shadow-xl border border-blue-400/40 hover:bg-blue-700/80 transition-all duration-200"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            Blue Glass Button
          </button>
          <button
            className="px-10 py-4 rounded-2xl text-lg font-semibold text-[#094183] bg-white/10 bg-opacity-30 backdrop-blur-md shadow-xl border border-white/30 hover:bg-white/20 transition-all duration-200"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            Transparent Glass Button
          </button>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  title,
  text,
  className = "",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#ebf8ff] text-[#094183] rounded-3xl shadow-xl p-6 flex flex-col justify-between ${className}`}
      style={{ minHeight: 180 }}
    >
      <h3
        className="text-xl font-bold mb-2"
        style={{ fontFamily: "'Proxima Nova', sans-serif" }}
      >
        {title}
      </h3>
      <p className="text-base opacity-90">{text}</p>
    </div>
  );
}
