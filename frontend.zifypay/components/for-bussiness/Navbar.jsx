import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        {/* <div className="text-2xl font-bold text-indigo-700">ZifyPay</div> */}
        <img
          src="https://res.cloudinary.com/dhehfjptn/image/upload/v1750750580/footerlog_pkjggc.svg"
          alt=""
          className="h-8 md:h-8 object-contain"
        />

        {/* Nav Links */}
        {/* <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-indigo-600">
            Home
          </a>
          <a href="#services" className="hover:text-indigo-600">
            Services
          </a>
          <a href="#pricing" className="hover:text-indigo-600">
            Pricing
          </a>
          <a href="#download" className="hover:text-indigo-600">
            Download
          </a>
          <a href="#contact" className="hover:text-indigo-600">
            Contact
          </a>
        </nav> */}

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="https://lodgezify.com/business/signup">
            <button className="bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">
              BOOK DEMO NOW
            </button>
          </a>
        </div>

        {/* Mobile Hamburger - placeholder */}
        <div className="md:hidden">
          <button className="text-gray-700">
            {/* You can replace with a real icon (Lucide or Heroicons) */}
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// 