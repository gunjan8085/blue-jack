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
      className="w-full min-h-screen bg-white flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      {/* Blurred Blue Background */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-[48px] bg-[#4B5CF0] opacity-80 blur-[100px] z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Text Content */}
          <div className="flex-1 max-w-lg text-center lg:text-left">
            <span className="inline-block px-4 py-2 mb-6 rounded-full bg-gray-100 text-gray-700 font-medium text-sm">
              <span className="inline-flex items-center gap-2">
                <Star className="w-4 h-4 text-black" fill="currentColor" />
                Trusted by businesses
              </span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-black leading-tight">
              Loved by the community
            </h2>

            <p className="text-base sm:text-lg text-gray-500 mb-8 leading-relaxed">
              Don't just take our word for it. See what business owners and
              entrepreneurs have to say about ZifyPay.
            </p>

            {/* Navigation Dots */}
            <div className="flex gap-2 justify-center lg:justify-start">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`w-5 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    active === idx
                      ? "bg-black"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Testimonial Card */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative w-full flex items-center justify-center min-h-[320px] sm:min-h-[360px]">
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
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full min-h-[280px] sm:min-h-[320px] flex flex-col justify-between relative">
                    {/* Star Rating */}
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                            fill="currentColor"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg sm:text-xl text-black font-medium leading-relaxed relative mb-6">
                        <span className="text-2xl sm:text-3xl text-gray-300 absolute -left-2 sm:-left-4 -top-1 sm:top-0 select-none">
                          "
                        </span>
                        <span className="block pl-4 sm:pl-6">{t.text}</span>
                      </blockquote>
                    </div>

                    {/* Divider */}
                    <hr className="my-4 border-gray-200" />

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gray-100"
                      />
                      <div>
                        <div className="font-semibold text-black text-base sm:text-lg">
                          {t.name}
                        </div>
                        <div className="text-gray-500 text-sm sm:text-base">
                          {t.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
