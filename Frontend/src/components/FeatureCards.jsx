import React from "react";

const features = [
  {
    title: "Manage",
    description:
      "Manage everything in one place with smart booking and analytics.",
    icon: "https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/3rd_ldxj9j.svg", // Replace with your actual icon image
    gradient: "from-[#3418A5] to-[#6C28C9]",
  },
  {
    title: "Grow",
    description: "Attract and retain clients on the top marketplace.",
    icon: "https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/2nd_notfsd.svg",
    gradient: "from-[#3B1FBB] to-[#7F40D6]",
  },
  {
    title: "Get paid",
    description: "Get paid fast, reduce no-shows, and simplify checkout.",
    icon: "https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/1st_r4i5rf.svg",
    gradient: "from-[#481FA5] to-[#B940D6]",
  },
];

const FeatureCards = () => {
  return (
    <div className="py-20 px-4 text-center max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
        Everything you need to run your businesses
      </h2>
      <p className="text-gray-600 text-base md:text-lg mb-12">
        ZifyPay delivers smart features for smoother, faster service—for your
        team and your clients.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 text-left text-white bg-gradient-to-br ${feature.gradient} shadow-lg min-w-3xl min-h-[360px] flex flex-col justify-between`}
          >
            <div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm mb-6">{feature.description}</p>
            </div>
            <img
              src={feature.icon}
              alt={`${feature.title} icon`}
              className="w-52 h-52 " // Increased from w-20 h-20
            />
          </div>
        ))}
      </div>

      <div className="bg-white py-20 px-8 max-w-7xl mx-auto space-y-24  ">
        {/* First Section: Text Left, Image Right */}
        <div className="flex flex-col md:flex-row items-start gap-40">
          {/* Text */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              All-in-one software to run your business
            </h2>
            <p className="text-gray-700 mb-4">
              The most loved and top-rated booking software trusted by
              businesses of all kinds.
            </p>
            <ul className="text-gray-700 space-y-2 list-inside list-[✔]">
              <li>
                Powerful calendar with unlimited bookings, clients, locations,
                and much more
              </li>
              <li>
                Get a 360° client view with insights on bookings, preferences,
                payments, and more.
              </li>
              <li>
                Crafted to deliver a smooth experience that enhances your
                business and elevates your brand
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747460613/right_card_fb038s.png"
              alt="Business man"
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Second Section: Image Left, Text Right */}
        <div className="flex flex-col items-center gap-40 md:flex-row-reverse">
          {/* Text */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              The most popular marketplace to grow your business
            </h2>
            <p className="text-gray-700 mb-4">
              Promote your business and reach new clients on the world’s largest
              beauty and wellness marketplace
            </p>
            <ul className="text-gray-700 space-y-2 list-inside list-[✔]">
              <li>
                Boost your visibility by listing on the ZifyPay marketplace.
              </li>
              <li>
                Connect with millions of clients ready to book their next
                appointment.
              </li>
              <li>
                Free up time and get your clients self-booking online 24/7
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747460612/leftcard_oxb7h4.png"
              alt="Book appointment"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
