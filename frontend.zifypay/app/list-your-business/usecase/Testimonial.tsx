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
  testimonials: TestimonialItem[];
  accentFrom?: string;
  accentTo?: string;
}

export function TestimonialSection({
  heading,
  testimonials,
  accentFrom = "from-blue-500",
  accentTo = "to-teal-400",
}: TestimonialSectionProps) {
  return (
    <section className="md:py-48 min-h-screen bg-gradient-to-r from-[#001A39] to-[#001433] flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-7xl w-full mx-auto">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          {heading}
        </h2>
        {/* Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:mt-24">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl bg-gradient-to-br from-white/90 to-white/70 shadow-xl p-8 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Quotation Mark */}
              <div
                className={`absolute top-4 left-4 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${accentFrom} ${accentTo} opacity-20 select-none`}
              >
                “
              </div>
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-teal-400 mb-6 z-10">
                <Image
                  src={t.img}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {/* Quote */}
              <p className="text-xl font-semibold text-gray-800 mb-6 z-10">
                {t.quote}
              </p>
              {/* Name & Title */}
              <div className="mt-auto z-10">
                <div className="font-bold text-gray-900 text-lg">{t.name}</div>
                <div className="text-base text-gray-500">{t.title}</div>
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
    name: "Sarah Thompson",
    title: "Owner, Serenity Spa",
    quote:
      "ZifyPay transformed our payment process with zero processing fees and a free terminal. The mobile POS and online booking system streamlined our operations, saving us time and money!",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Michael Chen",
    title: "Manager, AutoFix Garage",
    quote:
      "The cloud dashboard gives us real-time insights into sales and customer behavior. ZifyPay's all-in-one solution is perfect for our growing business, with no hidden costs!",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Emily Rodriguez",
    title: "Founder, PetCare Plus",
    quote:
      "ZifyPay’s easy onboarding and mobile-first design let us manage bookings and payments on the go. Our clients love the seamless experience, and we love the savings!",
    img: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

export default function Testimonial() {
  return (
    <TestimonialSection
      heading={
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            WHAT BUSINESS OWNERS
          </span>{" "}
          SAY
          <br />
          ABOUT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
            ZIFYPAY
          </span>
        </>
      }
      testimonials={defaultTestimonials}
      accentFrom="from-blue-500"
      accentTo="to-teal-400"
    />
  );
}
