"use client"


import { posDevices } from "@/lib/constants";
import { countries } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { MonitorCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HardwareSection } from "@/components/hardware-section"

interface SquareSectionProps {
  className?: string
}

export default function SquareSection({ className = "" }: SquareSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Carousel data
  const carouselItems = [
    {
      image: "/pic1.png",
      title: "The Future of Retail Report",
    },
    {
      image: "/pic2.png",
      title: "Virtual Workshops and Shipping Solutions Transformed The Juicy Leaf Plant Shop",
    },
    {
      image: "/pic3.png",
      title: "5 Ways Retailers Can Bring More Traffic in Stores",
    },
  ]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1))
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Hardware Section - Blue Background */}
      {/* <HardwareSection /> */}
      {/* Carousel Section */}
      {/* section -3 */}
      <div
        style={{
          backgroundImage: `url(${"/Untitled/4.png"})`,
        }}
        className="bg-blue-600 min-h-screen p-4"
      >
        <div className="max-w-5xl mx-auto mt-24">
          {/* Card Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {posDevices
              .slice() // Creates a shallow copy to avoid mutating the original array
              .reverse()
              .map((device, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-lg overflow-hidden border-0 shadow-xl"
                >
                  {/* Price Badge & Image Section */}
                  <div className="relative bg-white h-40 flex items-center px-4 border-2 border-gray-50 shadow-2xl shadow-gray-100 p-4">
                    <Badge className="absolute h-full left-3 bg-blue-600 text-white text-5xl font-bold  rounded-md">
                      {device.price}
                    </Badge>
                    <div className="flex-1"></div>{" "}
                    {/* Push image to the right */}
                    <img
                      src={device.image}
                      alt={device.name}
                      className="h-32 w-32 md:h-48 md:w-40 object-contain"
                    />
                  </div>

                  {/* Device Name */}
                  <div className="text-center pt-4 pb-2">
                    <h3 className="text-lg font-bold">{device.name}</h3>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-0 px-4 pb-4">
                    {device.features.map((feature, i) => (
                      <div
                        key={i}
                        className="border-t border-r last:border-r-0 even:border-r-0 border-gray-200 p-3"
                      >
                        <div className="flex justify-center mb-1">
                          <MonitorCheck className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-center text-gray-700">
                          {feature.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {carouselItems.map((carouselItem, idx) => (
                      <div key={idx} className="text-center">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                          <Image
                            src={carouselItem.image || "/placeholder.svg"}
                            alt={carouselItem.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {carouselItem.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Try Square Section */}
      <div className="bg-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl font-bold text-gray-900">Try Zifypay</h2>
            <div className="flex gap-4">
              <a href="Book-A-Drmo">
                {" "}
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  Request a demo
                </Button>
              </a>
              <a href="pricing">
                <Button variant="outline" className="px-6 py-2">
                  Build a Price
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
            FAQ
          </h2>

          <div className="space-y-4 mb-12">
            {[
              "How do I switch from my current solution?",
              "Can I upgrade my plan?",
              "Can I downgrade my plan?",
            ].map((question, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{question}</span>
                  <Plus
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    <p>Answer content would go here...</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fine Print */}
          {/* <div className="grid w-7xl grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500 leading-relaxed">
            <div>
              <p className="mb-4">
                ¹Square, the Square logo, Square Financial Services, Square
                Capital, and others are trademarks of Block, Inc. and/or its
                subsidiaries. Square Financial Services, Inc. is a wholly owned
                subsidiary of Block, Inc.
              </p>
              <p className="mb-4">
                All loans are issued by Square Financial Services, Inc. Actual
                fee depends upon payment card processing history, loan amount
                and other eligibility factors. A minimum payment of 1/18th of
                the initial balance is required every 90 days and full loan
                repayment is required within 18 months. Loans to California
                residents made or arranged pursuant to a California Finance
                Lender License.
              </p>
              <p>
                ²Block, Inc. is a financial services platform and not an
                FDIC-insured bank. FDIC deposit insurance coverage only protects
                against the failure of an FDIC-insured deposit institution. If
                you hold funds in your Square Checking account, your funds are
                held at Sutton Bank and if certain conditions are met, are
                eligible for FDIC insurance. FDIC insurance does not cover the
                aggregation of the account holder's funds held at Sutton Bank
                and if certain conditions have been met.
              </p>
            </div>
            <div>
              <p className="mb-4">
                ACH transfer fund availability: Instant availability does not
                apply to funds added to the Square Checking account by ACH bank
                transfer. ACH credit transfers to your Square Checking account
                business days.
              </p>
              <p className="mb-4">
                ³Savings accounts are provided by Square Financial Services,
                Inc. Member FDIC. Accrue annual percentage yield (APY) of 1.00%
                per folder on folder balances over $10. APY subject to change,
                current as of 3/18/2025. No minimum deposit to open an account,
                no minimum balance to earn the stated APY. Fees could reduce
                earnings on the account. Pending balances are not subject to
                FDIC insurance.
              </p>
              <p>
                The rate of our savings account is more than 3x the national
                average of 0.45% APY, based on the national average of savings
                accounts rates published in the FDIC Weekly National Rates and
                Rate Caps as of 3/18/2025.
              </p>
              <p className="mt-4">
                © 2024 Square, Inc. and/or Square Financial Services, Inc. All
                rights reserved.
              </p>
            </div>
          </div> */}

          {/* Legal Fine Print Footer Section */}
        </div>
        <footer className="bg-white py-12 px-4 border-t border-gray-200">
          <div className="container mx-auto max-w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-xs text-gray-600 leading-relaxed">
            <div>
              <p className="mb-4">
                ¹ Square, the Square logo, Square Financial Services, Square
                Capital, and others are trademarks of Block, Inc. and/or its
                subsidiaries. Square Financial Services, Inc. is a wholly owned
                subsidiary of Block, Inc.
              </p>
              <p className="mb-4">
                All loans are issued by Square Financial Services, Inc. Actual
                fee depends upon payment card processing history, loan amount
                and other eligibility factors. A minimum payment of 1/18th of
                the initial balance is required every 90 days and full loan
                repayment is required within 18 months. Loans to California
                residents made or arranged pursuant to a California Finance
                Lender License.
              </p>
              <p>
                ² Block, Inc. is a financial services platform and not an
                FDIC-insured bank. FDIC deposit insurance coverage only protects
                against the failure of an FDIC-insured deposit institution.
              </p>
            </div>
            <div>
              <p className="mb-4">
                ACH transfer fund availability: Instant availability does not
                apply to funds added to the Square Checking account by ACH bank
                transfer. ACH credit transfers to your Square Checking account
                business days.
              </p>
              <p className="mb-4">
                ³ Savings accounts are provided by Square Financial Services,
                Inc. Member FDIC. Accrue annual percentage yield (APY) of 1.00%
                per folder on folder balances over $10. APY subject to change,
                current as of 3/18/2025.
              </p>
              <p>
                The rate of our savings account is more than 3x the national
                average of 0.45% APY, based on FDIC Weekly National Rates and
                Rate Caps as of 3/18/2025.
              </p>
              <p className="mt-4">
                © 2024 Square, Inc. and/or Square Financial Services, Inc. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
