"use client";
import Image from "next/image";

export interface TestimonialItem {
  name: string;
  title: string;
  quote: string;
  img: string;
}

interface TestimonialSectionProps {
  heading: React.ReactNode;
  description: string;
  testimonials: TestimonialItem[];
  accentFrom?: string;
  accentTo?: string;
}

export function TestimonialSection({
  heading,
  description,
  testimonials,
  accentFrom = "from-fuchsia-500",
  accentTo = "to-purple-400",
}: TestimonialSectionProps) {
  return (
    <section className="md:py-48 min-h-screen bg-gradient-to-r from-[#001A39] to-[#001433] flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full mx-auto">
        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-left"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          {heading}
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl text-left">{description}</p>
        {/* Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-gradient-to-br from-white/90 to-white/70 shadow-xl p-6 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Quotation Mark */}
              <div
                className={`absolute top-4 left-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${accentFrom} ${accentTo} opacity-20 select-none`}
              >
                “
              </div>
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-400 mb-4 z-10">
                <Image
                  src={t.img}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              {/* Quote */}
              <p className="text-lg font-semibold text-gray-800 mb-4 z-10">
                {t.quote}
              </p>
              {/* Name & Title */}
              <div className="mt-auto z-10">
                <div className="font-bold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default export for backward compatibility
const defaultTestimonials = [
  {
    name: "Brian Armstrong",
    title: "CEO, Coinbase",
    quote:
      "Keep track of the hottest NFTs. Rarible makes it easy for me to keep track of the most trending pieces of art/NFTs. They have the biggest selection, lowest fees, and lots of action. Payments are hassle free.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Changpeng Zhao",
    title: "CEO, Binance",
    quote:
      "No extra charges. Less royalties. Rarible makes all fees and transparencies. No hidden charges. The publishing fee is 5% & is lower than even OpenSea's basic fees for a drop. The best and latest exchange on Rarible is less royalty on sales.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Vitalik Buterin",
    title: "Co-founder, Ethereum",
    quote:
      "Rarible is a game changer for digital artists and creators. The platform's ease of use and innovative features make it my go-to for NFT trading.",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
  },
];

export default function Testimonial() {
  return (
    <TestimonialSection
      heading={
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-400">
            WHAT THE BIGGEST CRYPTO LEADERS
          </span>{" "}
          SAYS
          <br />
          ABOUT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            RARIBLE
          </span>
        </>
      }
      description="Rarible is a marketplace aiming to link sellers (typically content creators such as digital artists, model creators or meme makers) with buyers who can select pieces they wish to purchase."
      testimonials={defaultTestimonials}
      accentFrom="from-fuchsia-500"
      accentTo="to-purple-400"
    />
  );
}
