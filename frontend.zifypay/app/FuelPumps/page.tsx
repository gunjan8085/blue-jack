"use client";
import Image from "next/image";
import {
  TestimonialSection,
  TestimonialItem,
} from "../list-your-business/usecase/Testimonial";

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

const fuelTestimonials: TestimonialItem[] = [
  {
    name: "Amit Patel",
    title: "Owner, City Gas Station",
    quote:
      "The Zifypay Fuel POS system made our checkout process lightning fast. Our customers love the convenience, and our sales have increased!",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Priya Sharma",
    title: "Manager, Highway Fuel Mart",
    quote:
      "Switching to Zifypay's POS was the best decision. The system is easy to use and the support is fantastic.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "John Lee",
    title: "Franchise Owner, QuickPump",
    quote:
      "We can now track sales and inventory in real time. The customizable features are a game changer for our business.",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

export default function FuelPumps() {
  return (
    <section className="min-h-screen bg-[#ebf8ff] flex flex-col items-center justify-center py-16 px-4">
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
      </div>
      <TestimonialSection
        heading={
          <>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              WHAT FUEL RETAILERS
            </span>{" "}
            SAY
            <br />
            ABOUT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              ZIFYPAY POS
            </span>
          </>
        }
        description="Hear from real fuel retailers who have transformed their business with Zifypay's modern POS system."
        testimonials={fuelTestimonials}
        accentFrom="from-blue-400"
        accentTo="to-cyan-400"
      />
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
      className={`bg-[#094183] text-white rounded-3xl shadow-xl p-6 flex flex-col justify-between ${className}`}
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
