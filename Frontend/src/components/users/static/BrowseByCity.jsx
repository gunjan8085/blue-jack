import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

const countriesData = {
  Australia: [
    "Auckland",
    "Christchurch",
    "Hamilton",
    "Tauranga",
    "Wellington",
    "Weallington",
  ],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  France: ["Paris", "Lyon", "Nice", "Marseille", "Toulouse"],
};

const servicesData = [
  "Hair Salons",
  "Nail Salons",
  "Barbershops",
  "Beauty Salons",
  "Spas",
  "Massage",
  "Waxing Salons",
  "Eyebrows & Lashes",
];

const BrowseByCity = () => {
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const scrollRef = useRef(null);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300; // Adjust for scroll amount
    }
  };

  return (
    <div className="tw-py-10 tw-bg-gray-100 tw-text-center">
      <h2 className="text-2xl tw-font-semibold tw-mb-6">Browse by City</h2>
      <div className="tw-flex tw-justify-center tw-gap-4 tw-mb-8">
        {Object.keys(countriesData).map((index, country) => (
          <button
            key={index}
            onClick={() => setSelectedCountry(country)}
            className={`tw-px-4 tw-py-2 tw-rounded-full tw-font-medium ${
              selectedCountry === country
                ? "tw-bg-black tw-text-white"
                : "tw-bg-gray-200 tw-text-black"
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Cities and Services */}
      <div className="tw-relative tw-mx-12">
        <div
          className="tw-flex tw-overflow-x-auto tw-no-scrollbar"
          ref={scrollRef}
        >
          {countriesData[selectedCountry].map((city) => (
            <div
              key={city}
              className="tw-min-w-[250px] tw-mx-4 tw-flex-shrink-0"
            >
              <h3 className="tw-text-left tw-font-semibold tw-mb-4 text-2xl">
                {city}
              </h3>
              <ul className="tw-list-none tw-space-y-2 tw-text-left">
                {servicesData.map((service) => (
                  <li key={service} className="tw-text-gray-700 cursor-pointer">
                    {service} in {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="tw-absolute tw-top-0 tw-right-2 tw-h-full tw-flex tw-items-center tw-bg-white tw-shadow-md tw-rounded-full tw-p-2"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BrowseByCity;
