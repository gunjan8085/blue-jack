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
    img: "https://imgs.search.brave.com/Nw9MRQHAikQ95Su35ViLqoxGA7DNeJCIx-__HVlKgdI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wb3dl/cmZ1bC1idXNpbmVz/cy13b21hbi1jb25m/aWRlbnQtY2VvLWNv/bXBhbnktaGVhZHF1/YXJ0ZXJzLTUzMTg1/NTIyLmpwZw",
  },
  {
    name: "Rahul Mehra",
    title: "Owner, StyleNest Boutique",
    quote:
      "We switched from a legacy system to ZifyPay. The learning curve was minimal, and the impact was immediate — more sales, less chaos.",
    img: "https://imgs.search.brave.com/Ti_wMZ-YdhCoFnk8UBMs4-TW7apAnt-ykkK2VGTD55s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1j/ZW8tYnVzaW5lc3Nt/YW4tb2ZmaWNlLWNv/cnBvcmF0ZS1hcm1z/LWNyb3NzZWQtc3Vj/Y2Vzc2Z1bC13b3Jr/cGxhY2UtbWFuYWdl/bWVudC1zbWlsZS1z/ZW5pb3ItZXhlY3V0/aXZlLWF0dG9ybmV5/LXByYWN0aWNlLWRp/cmVjdG9yLXByb2Zl/c3Npb25hbC1ib3Nz/XzU5MDQ2NC0zNDY2/MjQuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA",
  },
  {
    name: "Neha Shah",
    title: "Co-founder, FreshMart",
    quote:
      "The multi-store reporting and seamless payments are a game changer. ZifyPay made our retail expansion possible.",
    img: "https://imgs.search.brave.com/OEqJIB_1-zKZjZiDxTYMR-hZLcFJOT500Z3GU0MFMMQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mZW1h/bGUtY29tcGFueS1j/ZW8tYmVhdXRpZnVs/LWNvbmZpZGVudC1z/dGFuZGluZy1iZWhp/bmQtaGVyLW9mZmlj/ZS1jaGFpci1sb29r/aW5nLWNhbWVyYS0x/Mzk5ODE4OTEuanBn",
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
