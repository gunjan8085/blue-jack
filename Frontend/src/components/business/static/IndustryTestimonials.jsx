import React, { useRef } from "react";

// Example testimonials data
const testimonials = [
  {
    type: "video",
    videoUrl: "/assets/images/business-landing-page/business-vid-review.mp4", // Replace with your video path
    thumbnail: "/assets/images/business-landing-page/business-thumb-review.jpg", // fallback image
    name: "",
    role: "Industry Leader",
  },
  {
    stars: 5,
    title: "ZifyPay is so easy to manage my team",
    text: "I work with booth renters at my top-rated salon in Manhattan, New York City. I love Fresha because it offers my clients a professional appointment booking experience with seamless online booking features, automated reminder emails and texts",
    name: "Pamela B",
    role: "Salon owner, NYC"
  },
  {
    stars: 5,
    title: "ZifyPay is so easy to manage my team",
    text: "I work with booth renters at my top-rated salon in Manhattan, New York City. I love Fresha because it offers my clients a professional appointment booking experience with seamless online booking features, automated reminder emails and texts, and a very easy to use platform",
    name: "Alex E",
    role: "Hair stylist and owner"
  },
  {
    stars: 5,
    title: "Powerful Scheduling",
    text: "This appointment scheduling software is very user friendly and it's free! I accidentally stumbled onto Fresha and was skeptical at first as it was free. I decided to give it a go and was utterly surprised as it had more functionality than previous software I was using called Timely. I have 3 business accounts on Fresha.",
    name: "Gayle S",
    role: "Business owner"
  },
  {
    stars: 5,
    title: "Smart Salon Software",
    text: "Brand is the most advanced salon software in beauty and wellness. It comes packed with smart features for appointment scheduling, point-of-sales (POS), marketing features and financial reports all built for salons and beauty businesses. Also I love that the customer support is always available.",
    name: "Bianca",
    role: "Business owner"
  },
  {
    stars: 5,
    title: "Booking Made Easy",
    text: "I am a freelance makeup artist who has been searching tirelessly for a salon scheduling app that can make appointment bookings easy, track my clients who visit the salon and their appointments bookings, manage discounts, gift certificates and group appointment bookings. My clients love the online booking.",
    name: "Independent",
    role: "Beauty Makeup Artist"
  },
  {
    stars: 5,
    title: "Simplify Salon Scheduling",
    text: "I love that Fresha is simple and easy to use salon software. Coming from a much more complicated system like MINDBODY or Booksy, Fresha was so wonderfully easy to figure out and implement. Customer service has always been so kind and responsive.",
    name: "Emily P",
    role: "Salon Owner"
  },
  {
    stars: 5,
    title: "Easy Payments, Bookings",
    text: "Client payments and booking appointments is now a breeze, Their support/on-boarding has been very engaging and helpful for our business. The 'pay as you go' model is ideal for small companies starting out, but powerful for those already going full steam. It's a great solution for any business.",
    name: "Warren D",
    role: "Psychotherapist"
  }
];

const clampLines = "tw-line-clamp-5"; // Tailwind line-clamp plugin required

const IndustryTestimonials = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: dir * (width * 0.7), behavior: "smooth" });
    }
  };

  return (
    <section className="tw-bg-white tw-py-20">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
        <h3 className="tw-text-6xl tw-font-extrabold tw-mb-8 tw-text-left">
          Top-rated by the industry
        </h3>
        <p className="tw-text-lg tw-text-left tw-mb-8 tw-text-gray-600">
        ZifyPay’s top-tier software and service earn rave reviews. See why our partners love us.
        </p>
        <div className="tw-relative">
          {/* Arrows */}
          <button
            className="tw-absolute tw-left-0 tw-top-1/2 -tw-translate-y-1/2 tw-bg-white tw-border tw-rounded-full tw-shadow tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-z-10 tw-hidden md:tw-flex"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            type="button"
          >
            &#8592;
          </button>
          <button
            className="tw-absolute tw-right-0 tw-top-1/2 -tw-translate-y-1/2 tw-bg-white tw-border tw-rounded-full tw-shadow tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-z-10 tw-hidden md:tw-flex"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            type="button"
          >
            &#8594;
          </button>
          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="tw-overflow-x-auto tw-flex tw-gap-6 tw-scrollbar-hide tw-py-4 tw-px-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((t, idx) =>
              t.type === "video" ? (
                <div
                  key={idx}
                  className="tw-bg-[#f6f6fa] tw-rounded-2xl tw-shadow tw-p-0 tw-min-w-[500px] tw-max-w-xs tw-flex tw-flex-col tw-items-center tw-justify-center tw-aspect-[2/3] tw-h-[420px]"
                  style={{ minHeight: 80 }}
                >
                  <video
                    controls
                    poster={t.thumbnail}
                    className="tw-w-full tw-h-64 tw-object-cover tw-rounded-t-2xl"
                  >
                    <source src={t.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="tw-p-4 tw-text-center">
                    <div className="tw-font-bold">{t.name}</div>
                    <div className="tw-text-sm tw-text-gray-500">{t.role}</div>
                  </div>
                </div>
              ) : (
                <div
                  key={idx}
                  className="tw-bg-[#f6f6fa] tw-rounded-2xl tw-shadow tw-p-6 tw-min-w-[240px] tw-max-w-xs tw-flex tw-flex-col tw-h-[420px]"
                >
                  <div className="tw-flex tw-items-center tw-mb-2">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="tw-text-black tw-mr-1">&#9733;</span>
                    ))}
                  </div>
                  <div className="tw-font-bold tw-mb-2 tw-text-lg">{t.title}</div>
                  <div className={`tw-text-gray-700 tw-mb-2 tw-flex-1 ${clampLines}`}>
                    {t.text}
                  </div>
                  <div className="tw-mt-auto">
                    <div className="tw-text-blue-600 tw-text-sm tw-mb-1 tw-cursor-pointer hover:tw-underline">See more</div>
                    <div className="tw-font-semibold tw-text-sm">{t.name}</div>
                    <div className="tw-text-xs tw-text-gray-500">{t.role}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryTestimonials;