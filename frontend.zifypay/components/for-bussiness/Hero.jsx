import React from "react";

function Hero() {
  return (
    <div>
      {/* Top Section from the uploaded image */}
      <div className="bg-white text-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
          The <span className="text-black">#1 software</span> for all types of{" "}
          <span className="text-black">Business</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Smart booking software with built-in payments — simple, flexible, and
          ready to grow with your business.
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://lodgezify.com">
            {" "}
            <button className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium">
              Get started now
            </button>
          </a>

          <button className="border border-black text-black px-6 py-3 rounded-md text-lg font-medium">
            Watch an overview
          </button>
        </div>
      </div>

      {/* Original Hero Section */}
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dt07noodg/image/upload/v1747456138/Hero-bg_x4ljce.png')`,
        }}
      >
        <img
          src="https://res.cloudinary.com/dt07noodg/image/upload/v1748505241/-1_buffus.png"
          alt=""
        />

        <div className="bg-white px-6 py-16 text-center">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
              Most recommended 5/5
              <span className="font-bold text-purple-600"> ★★★★★</span> on
              Capterra
            </h2>
          </div>
          <div className="grid text-3xl grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto text-black">
            <div>
              <h3 className="text-3xl font-bold">120,000+</h3>
              <p className="text-base md:text-lg font-semibold text-gray-600">
                Partner businesses
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">450,000+</h3>
              <p className="text-base md:text-lg font-semibold text-gray-600">
                Professionals
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">1 Billion+</h3>
              <p className="text-base md:text-lg font-semibold text-gray-600">
                Appointments booked
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-base md:text-lg font-semibold text-gray-600">
                Countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
