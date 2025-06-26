import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Subsection2() {
  return (
    <div className="min-h-screen bg-gray-300 p-4 md:p-8">
      <div className="mx-auto w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Side Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">
                Powering Fuel Retail
                <br />
                with Cloud Precision
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                ZifyPay delivers an all-in-one platform to run your fuel station
                and convenience store — from pump control to retail billing,
                compliance, and real-time analytics.
              </p>
            </div>

            {/* Fuel Station Illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src="https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/cstore-h-e1665871653429.png"
                  alt="Fuel station integration illustration"
                  width={500}
                  height={300}
                  className="h-auto w-full max-w-md object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - ZifyPay Feature Cards */}
          <div className="space-y-4">
            {[
              {
                title: "Pump + POS Control",
                description:
                  "Start, stop, and log transactions from Gilbarco or Wayne pumps directly from your POS — fully synchronized with billing and inventory.",
              },
              {
                title: "Real-Time Cloud Dashboard",
                description:
                  "Access live sales, tank levels, compliance alerts, and more — all from one secure cloud panel with role-based access.",
              },
              {
                title: "Zero-Fee Payment Processing",
                description:
                  "Accept cards, mobile wallets, and cash with ZifyPay’s zero-fee model. Fully PCI-DSS compliant with age verification support.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="rounded-2xl bg-gray-800 p-6 text-white"
              >
                <div className="flex items-start space-x-4">
                  {/* Feature Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      src="https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17440.png"
                      alt="Feature icon"
                      width={68}
                      height={68}
                      className="h-full w-full rounded-md object-contain bg-white p-1"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
