import React from "react";

const illustration =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop";

export const FinancialSupportSection: React.FC = () => {
  return (
    <section className="w-full  px-24 py-20   flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-[#001A39] to-[#001433] rounded-3xl my-16 relative overflow-hidden ">
      {/* Decorative background shape */}
      <div className=" z-0" />
      {/* Text Content */}
      <div className="flex-1 text-white z-10">
        <span className="inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-1 rounded-full mb-4 text-sm tracking-wide shadow">
          Small Business Support
        </span>
        <div className="flex items-center gap-3 mb-4">
       
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Empowering Small Businesses Financially
          </h2>
        </div>
        <p className="text-lg mb-8 max-w-xl text-blue-100">
          At Zifypay, we believe every small business deserves a chance to grow.
          That's why we offer fast settlements, affordable payment solutions,
          and access to financial tools that help you thrive—no matter your
          size.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow transition"
        >
          Learn More About Our Support
        </a>
      </div>
      {/* Illustration */}
      <div className="flex-1 flex justify-center z-10">
        <div className="relative">
          <img
            src={illustration}
            alt="Financial support for small business"
            className="rounded-2xl shadow-2xl object-cover w-full max-w-md border-4 border-blue-100"
          />
          {/* Floating effect */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 opacity-30 rounded-full blur-2xl z-0" />
        </div>
      </div>
    </section>
  );
};

export default FinancialSupportSection;
