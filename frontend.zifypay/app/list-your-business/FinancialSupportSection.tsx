import React from "react";
import Link from "next/link";

const illustration = "/loan1.png";

export const FinancialSupportSection: React.FC = () => {
  return (
    <section
      className="min-w-7xl px-4 md:px-28 py-10 md:py-20 flex flex-col md:flex-row items-center bg-gradient-to-r from-[#001A39] to-[#001433] rounded-3xl my-16 relative overflow-hidden"
      style={{
        fontFamily:
          "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Decorative background shape */}
      <div className="z-0" />

      {/* Text Content */}
      <div className="flex-1 text-white z-10 text-center md:text-left">
        <span className="inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-1 rounded-full mb-4 text-sm tracking-wide shadow mx-auto md:mx-0">
          Small Business Support
        </span>

        <div className="flex flex-col items-center md:items-start gap-3 mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left">
            Empowering Small Businesses Financially
          </h2>
        </div>

        <p className="text-base md:text-lg mb-8 max-w-xl text-blue-100 mx-auto md:mx-0 text-center md:text-left">
          At Zifypay, we believe every small business deserves a chance to grow.
          That's why we offer fast settlements, affordable payment solutions,
          and access to financial tools that help you thrive—no matter your
          size.
        </p>
        <Link href="/list-your-business/usecase/loan">
          <button className="block bg-blue-600 w-1/2 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base md:text-lg shadow transition md:w-auto mx-auto md:mx-0">
            Learn More about Funding
          </button>
        </Link>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex justify-center z-10 w-full mt-8 md:mt-0">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-full">
          <img
            src={illustration}
            alt="Financial support for small business"
            className=" object-cover w-full "
          />
          {/* Floating effect */}
          <div className="absolute -bottom-6 -right-6 w-16 h-16 md:w-24 md:h-24 bg-blue-500 opacity-30 rounded-full blur-2xl z-0" />
        </div>
      </div>
    </section>
  );
};

export default FinancialSupportSection;
