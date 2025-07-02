"use client"


import { posDevices } from "@/lib/constants";
import { countries } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { MonitorCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
// import {FAQSection} from "@/app/FAQ/FAQSection";  
import FAQSection from "@/components/FAQ"; 
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
      <FAQSection />
      <footer className="bg-white py-12 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-xs text-gray-600 leading-relaxed">
          <div>
            <p className="mb-4">
              ¹ ZifyPay, the ZifyPay logo, ZifyPay Financial Services, ZifyPay
              Capital, ZifyPay POS, and other related marks are trademarks or
              registered trademarks of ZifyPay Inc. and/or its affiliates.
              ZifyPay Financial Services, Inc. is a wholly owned subsidiary of
              ZifyPay Inc.
            </p>
            <p className="mb-4">
              All financing products are issued by ZifyPay Financial Services,
              Inc., subject to credit approval and compliance with applicable
              law. Loan eligibility and terms are based on several factors
              including business history, payment processing volume, and risk
              assessment. Not all applicants will qualify.
            </p>
            <p className="mb-4">
              ² ZifyPay Inc. is a technology and financial services platform.
              ZifyPay is not a bank. Banking services may be provided by partner
              financial institutions that are FDIC-insured. FDIC insurance is
              only applicable to eligible accounts held directly with partner
              banks.
            </p>
            <p className="mb-4">
              Use of ZifyPay services is subject to our Terms of Service and
              Privacy Policy. Certain features may be limited or restricted
              based on location, regulatory requirements, or business
              verification status.
            </p>
          </div>
          <div>
            <p className="mb-4">
              ACH and bank transfers may take 1–3 business days to process.
              Availability of funds is subject to the receiving bank’s policies
              and the timing of submission.
            </p>
            <p className="mb-4">
              ³ ZifyPay Savings Accounts are issued by ZifyPay Financial
              Services, Inc., Member FDIC. Annual Percentage Yield (APY) of
              1.00% applies only to folder balances over $10. Rates are variable
              and subject to change at any time without notice.
            </p>
            <p className="mb-4">
              Comparisons to national average APYs are based on data provided by
              the FDIC and are accurate as of the published date. Past
              performance is not indicative of future results.
            </p>
            <p className="mb-4">
              ZifyPay POS and payment hardware are PCI-DSS compliant and
              designed to support secure, real-time transactions. Integration
              with third-party apps and APIs is subject to approval and API
              usage guidelines.
            </p>
            <p className="mt-4">
              © 2024 ZifyPay Inc. and/or ZifyPay Financial Services, Inc. All
              rights reserved. Unauthorized use is prohibited.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
