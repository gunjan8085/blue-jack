"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const properties = [
  {
    id: 1,
    title: "business analytics dashboard",
    price: "hello",
    image:
      "https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17445-1.png",
  },
  {
    id: 2,
    title: "Speed up data entry and reconciliation",
    price: "hello",
    image:
      "https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17445-1.png",
  },
  {
    id: 3,
    title: "Improve merchandise forecasting",
    price: "hello",
    image:
      "https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17445-1.png",
  },
  {
    id: 4,
    title: "Improve pricing consistency and employee efficiency",
    price: "hello",
    image:
      "https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17445-1.png",
  },
  {
    id: 5,
    title: "Centralize management of item-level inventory",
    price: "hello",
    image:
      "https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17445-1.png",
  },
  {
    id: 6,
    title: "Reduce travel time to different locations",
    price: "hello",
    image:
      "https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17445-1.png",
  },
];

const paymentMethods = [
  {
    title: "Home Loan",
    description:
      "We work with reliable partner banks that provide loans at 5.5% annual interest rate for home construction.",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
  },
  {
    title: "Government Subsidy",
    description:
      "If you have received a government certificate, you can use it for home construction financing.",
    bgColor: "bg-gray-800",
    textColor: "text-white",
  },
  {
    title: "State Benefits",
    description:
      "We work with government programs to help you get preferential mortgages for construction projects.",
    bgColor: "bg-gray-100",
    textColor: "text-gray-900",
  },
  {
    title: "Cashless Payment",
    description:
      "You can sign a contract and make payments through bank transfers and cashless transactions.",
    bgColor: "bg-gray-800",
    textColor: "text-white",
  },
];

const steps = [
  {
    number: "01",
    title: "Consultation & Design",
    description:
      "We discuss your requirements and preferences for the house, determine the budget and create the project design.",
  },
  {
    number: "02",
    title: "Construction",
    description:
      "Our team of specialists performs frame house construction taking into account all technical requirements.",
  },
  {
    number: "03",
    title: "Completion & Handover",
    description:
      "We complete all types of work and deliver the finished house, conducting final inspection and handover.",
  },
];

export default function Subsection4() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(properties.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProperties = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return properties.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="bg-gray-300 py-16">
      <div className="container  mx-auto px-6 lg:px-12">
        {/* Property Catalog Section */}
        <div className="mb-20">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Benefit from optimized profits
                <br />
                operations with CStoreOffice
              </h2>
            </div>
            <div className="text-right text-sm text-gray-600"></div>
          </div>

          {/* Property Grid with Carousel */}
          <div className="relative mb-8">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {properties
                        .slice(
                          slideIndex * itemsPerSlide,
                          (slideIndex + 1) * itemsPerSlide
                        )
                        .map((property) => (
                          <div
                            key={property.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="relative h-48">
                              <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {property.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {property.price}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button className="bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
              Start Now →
            </button>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Payment Methods Section */}
      </div>
    </div>
  );
}
