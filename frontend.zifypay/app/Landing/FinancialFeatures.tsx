"use client";

import Image from "next/image";

const FinancialFeatures = () => {
  return (
    <section className="bg-[#0a1d36] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold">
          All your financial workflows. One platform.
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Everything you need to control spend before it happens and empower
          teams confidently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-7xl mx-auto">
        {/* Card 1 - All-in-One Card */}
        <div className="bg-[#15294e] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">All-in-One Card</h3>
            <p className="text-sm text-white/70">
              Enjoy seamless collaboration between lenders and investors with
              premium, fee-free features.
            </p>
          </div>
          <Image
            src="/images/card-placeholder.png" // replace with real card image
            alt="ZifyPay Card"
            width={300}
            height={180}
            className="mt-8 rounded-lg"
          />
        </div>

        {/* Card 2 - Control Spend */}
        <div className="bg-[#15294e] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Control spend</h3>
          <p className="text-sm text-white/70 mb-4">
            Manage card spend with flexible limits and advance funds in real
            time, instantly.
          </p>
          <div className="space-y-3">
            <div className="bg-white flex justify-between items-center p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <Image
                  src="https://logo.clearbit.com/homedepot.com"
                  alt="Home Depot"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="text-black text-sm">Drywall</div>
              </div>
              <span className="text-red-500 font-semibold">- $6,000</span>
            </div>
            <div className="bg-white flex justify-between items-center p-3 rounded-md">
              <div className="text-black text-sm">Additional funds</div>
              <span className="text-green-600 font-semibold">+ $10,000</span>
            </div>
          </div>
        </div>

        {/* Card 3 - Real-Time Updates */}
        <div className="bg-[#15294e] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">
            Receive real time updates
          </h3>
          <p className="text-sm text-white/70 mb-4">
            Collaborate with borrowers seamlessly through regular project
            updates.
          </p>
          <div className="relative">
            <Image
              src="https://source.unsplash.com/200x120/?man,phone"
              alt="Real time update"
              width={300}
              height={120}
              className="rounded-lg"
            />
            <div className="absolute bottom-2 left-2 bg-white text-sm text-black rounded-md px-3 py-1 shadow">
              Cohen Construction – Inspection scheduled
            </div>
          </div>
        </div>

        {/* Card 4 - Banking and Treasury */}
        <div className="bg-[#15294e] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Banking and treasury</h3>
            <p className="text-sm text-white/70">
              Save, spend, and grow your cash with 4.15% yield — from day one.
            </p>
          </div>
          <div className="mt-6">
            <div className="bg-gradient-to-b from-[#74c0fc] to-[#001F4D] rounded-xl p-5 relative">
              <div className="absolute top-4 left-4 bg-white text-black px-4 py-2 text-sm rounded-md shadow-lg">
                <span className="font-semibold">$9,241</span>
                <div className="text-xs text-gray-600">interest earned</div>
              </div>
              <div className="h-24 w-full" />
            </div>
          </div>
        </div>
        <FinancialFeatures />
      </div>
    </section>
  );
};

export default FinancialFeatures;
