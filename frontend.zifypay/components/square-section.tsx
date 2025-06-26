"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <div className="bg-blue-500 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-white text-2xl font-semibold text-center mb-8">Hardware that's ready for the rush</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Station Duo */}
            <div className="bg-white rounded-lg p-6 relative">
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-lg font-bold">$0</div>
              <div className="flex justify-center mb-4 pt-8">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Station Duo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-center font-semibold text-lg mb-4">Station Duo</h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Dual Connect Set-up</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Receipt Printer, Cash Drawer</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Works with Square Terminal, Kitchen Display</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Contactless, Chip, Swipe Payments accepted</div>
                </div>
              </div>
            </div>

            {/* Mini POS */}
            <div className="bg-white rounded-lg p-6 relative">
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-lg font-bold">$0</div>
              <div className="flex justify-center mb-4 pt-8">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Mini POS"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-center font-semibold text-lg mb-4">Mini POS</h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Full-featured tools for any business</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Simple, fast, easy-to-take cash</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Access data anywhere</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>WiFi + 4G LTE Connectivity</div>
                </div>
              </div>
            </div>

            {/* Flex POS */}
            <div className="bg-white rounded-lg p-6 relative">
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-lg font-bold">$0</div>
              <div className="flex justify-center mb-4 pt-8">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Flex POS"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-center font-semibold text-lg mb-4">Flex POS</h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Full-featured tools for any business</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Get deposits fast and easy</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Access data anywhere</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>WiFi + 4G LTE Connectivity</div>
                </div>
              </div>
            </div>

            {/* Station POS */}
            <div className="bg-white rounded-lg p-6 relative">
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-lg font-bold">$0</div>
              <div className="flex justify-center mb-4 pt-8">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Station POS"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="text-center font-semibold text-lg mb-4">Station POS</h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Large 14" versatile display</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Custom Online store (PO)</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Simple, Proven Reliability</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                  <div>Fingerprint Login</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <h2 className="text-2xl font-semibold text-gray-900 text-center flex-1">
              Hardware that's ready for the rush
            </h2>

            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

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
                        <h3 className="text-sm font-medium text-gray-900">{carouselItem.title}</h3>
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
            <h2 className="text-3xl font-bold text-gray-900">Try Square</h2>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Request a demo</Button>
              <Button variant="outline" className="px-6 py-2">
                Build a Price
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">FAQ</h2>

          <div className="space-y-4 mb-12">
            {["How do I switch from my current solution?", "Can I upgrade my plan?", "Can I downgrade my plan?"].map(
              (question, index) => (
                <div key={index} className="border border-gray-300 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{question}</span>
                    <Plus
                      className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-45" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      <p>Answer content would go here...</p>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>

          {/* Fine Print */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500 leading-relaxed">
            <div>
              <p className="mb-4">
                ¹Square, the Square logo, Square Financial Services, Square Capital, and others are trademarks of Block,
                Inc. and/or its subsidiaries. Square Financial Services, Inc. is a wholly owned subsidiary of Block,
                Inc.
              </p>
              <p className="mb-4">
                All loans are issued by Square Financial Services, Inc. Actual fee depends upon payment card processing
                history, loan amount and other eligibility factors. A minimum payment of 1/18th of the initial balance
                is required every 90 days and full loan repayment is required within 18 months. Loans to California
                residents made or arranged pursuant to a California Finance Lender License.
              </p>
              <p>
                ²Block, Inc. is a financial services platform and not an FDIC-insured bank. FDIC deposit insurance
                coverage only protects against the failure of an FDIC-insured deposit institution. If you hold funds in
                your Square Checking account, your funds are held at Sutton Bank and if certain conditions are met, are
                eligible for FDIC insurance. FDIC insurance does not cover the aggregation of the account holder's funds
                held at Sutton Bank and if certain conditions have been met.
              </p>
            </div>
            <div>
              <p className="mb-4">
                ACH transfer fund availability: Instant availability does not apply to funds added to the Square
                Checking account by ACH bank transfer. ACH credit transfers to your Square Checking account business
                days.
              </p>
              <p className="mb-4">
                ³Savings accounts are provided by Square Financial Services, Inc. Member FDIC. Accrue annual percentage
                yield (APY) of 1.00% per folder on folder balances over $10. APY subject to change, current as of
                3/18/2025. No minimum deposit to open an account, no minimum balance to earn the stated APY. Fees could
                reduce earnings on the account. Pending balances are not subject to FDIC insurance.
              </p>
              <p>
                The rate of our savings account is more than 3x the national average of 0.45% APY, based on the national
                average of savings accounts rates published in the FDIC Weekly National Rates and Rate Caps as of
                3/18/2025.
              </p>
              <p className="mt-4">© 2024 Square, Inc. and/or Square Financial Services, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
