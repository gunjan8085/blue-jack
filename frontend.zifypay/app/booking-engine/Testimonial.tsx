import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "ZifyPay made it so easy to get funding for my salon. The process was fast, transparent, and the support team was always there to help. Highly recommended!",
    name: "Priya Sharma",
    title: "Salon Owner, Beauty Bliss",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "We switched to ZifyPay for our business payments and haven't looked back. The dashboard is intuitive and the instant settlements are a game changer.",
    name: "Rahul Mehta",
    title: "Retailer, Urban Mart",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "Thanks to ZifyPay, we were able to expand our gym with flexible funding. The rates are fair and the approval was lightning fast!",
    name: "Anjali Verma",
    title: "Gym Owner, FitZone",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="px-16 w-full min-h-screen py-20 bg-white flex flex-col md:flex-row items-center justify-center gap-8 relative"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      {/* Blurred Blue Background */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-[48px] bg-[#4B5CF0] opacity-80 blur-[100px] z-0" />
      {/* Left Side */}
      <div className="flex-1 max-w-lg text-left px-6 z-10 flex flex-col justify-center items-start">
        <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gray-100 text-gray-700 font-medium text-sm">
          <span className="inline-flex items-center gap-1">
            <Star
              className="w-4 h-4 text-black inline-block"
              fill="currentColor"
            />{" "}
            Trusted by businesses
          </span>
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black leading-tight">
          Loved by the community
        </h2>
        <p className="text-lg text-gray-500 mb-8">
          Don't just take our word for it. See what business owners and
          entrepreneurs have to say about ZifyPay.
        </p>
        <div className="flex gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`inline-block w-5 h-2 rounded-full transition-all duration-300 ${
                active === idx ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Right Side: Testimonial Card */}
      <div className="flex-1 flex items-center justify-center px-6 z-10 min-h-[480px]">
        <div className="relative w-full max-w-xl flex items-center justify-center min-h-[300px]">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
                active === idx
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-95 z-0"
              }`}
              aria-hidden={active !== idx}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col justify-between relative">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl text-black font-medium leading-relaxed relative mb-6">
                    <span className="text-3xl text-gray-300 absolute -left-4 top-0 select-none">
                      “
                    </span>
                    {t.text}
                  </blockquote>
                </div>
                <hr className="my-4" />
                <div className="flex items-center gap-4 mt-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <div className="font-semibold text-black">{t.name}</div>
                    <div className="text-gray-500 text-sm">{t.title}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
