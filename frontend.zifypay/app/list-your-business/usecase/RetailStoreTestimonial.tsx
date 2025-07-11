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
  accentFrom = "from-green-500",
  accentTo = "to-blue-400",
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
        <p className="text-gray-300 mb-10 max-w-2xl text-left text-lg">
          {description}
        </p>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="min-h-[420px] rounded-2xl bg-gradient-to-br from-white/90 to-white/70 shadow-xl p-6 flex flex-col items-center text-center relative overflow-hidden gap-4"
            >
              {/* Quotation Mark */}
              <div
                className={`absolute top-4 left-4 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${accentFrom} ${accentTo} opacity-20 select-none`}
              >
                “
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 z-10">
                <Image
                  src={t.img}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>

              {/* Quote */}
              <p className="text-xl font-semibold text-gray-800 z-10 leading-relaxed">
                {t.quote}
              </p>

              {/* Name & Title */}
              <div className="mt-auto z-10">
                <div className="font-bold text-gray-900 text-lg">{t.name}</div>
                <div className="text-sm text-gray-500">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ✅ Testimonial Data for Retail Store Use Case
const retailTestimonials: TestimonialItem[] = [
  {
    name: "Anjali Verma",
    title: "Retail Manager, Shopper's Delight",
    quote:
      "ZifyPay transformed our POS operations. Inventory sync, customer checkout, and real-time insights – everything just works.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Rahul Mehra",
    title: "Owner, StyleNest Boutique",
    quote:
      "We switched from a legacy system to ZifyPay. The learning curve was minimal, and the impact was immediate — more sales, less chaos.",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Neha Shah",
    title: "Co-founder, FreshMart",
    quote:
      "The multi-store reporting and seamless payments are a game changer. ZifyPay made our retail expansion possible.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function RetailStoreTestimonial() {
  return (
    <TestimonialSection
      heading={
        <>
          Hear From{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            Real Retailers
          </span>{" "}
          Who Switched to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            ZifyPay POS
          </span>
        </>
      }
      description="ZifyPay is powering modern retail stores with smart billing, CRM, and inventory control. Here's what our customers have to say."
      testimonials={retailTestimonials}
      accentFrom="from-green-400"
      accentTo="to-blue-400"
    />
  );
}
