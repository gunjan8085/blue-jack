import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Headphones, Layers } from "lucide-react";
import Image from "next/image";

export default function Subsection1() {
  return (
    <div className="min-h-screen bg-gray-300 p-4">
      <div className="w-full">
        {/* Main Hero Content */}
        <Card className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Side Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-orange-500"></div>
                    <div className="h-8 w-8 rounded-full bg-gray-400"></div>
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">
                  FIND THE RIGHT
                  <br />
                  FREELANCE SERVICE,
                  <br />
                  RIGHT AWAY
                </h1>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">MISSION</p>
                  <p className="text-lg text-gray-700">
                    Truelance's mission is to change how
                    <br />
                    the world works together.
                  </p>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid gap-4 sm:grid-cols-2 ">
                <Card className="rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <Layers className="h-6 w-6" />
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      1500<sup className="text-lg">+</sup>
                    </div>
                    <div className="text-sm font-medium">SERVICES</div>
                  </div>
                </Card>
                <Card className="rounded-2xl bg-gray-300 p-6 text-black shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <Headphones className="h-6 w-6" />
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm font-medium">SUPPORT</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="space-y-8">
              {/* Freelancer Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl bg-stone-300 ">
                  <Image
                    src="https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/10/cstore-inventory.png"
                    alt="Alex Kinsman, UX/UI Designer"
                    width={400}
                    height={600}
                    className="h-96 w-full object-cover object-center"
                  />
                </div>
               
              </div>

              {/* Large Statistics */}
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-black md:text-5xl">
                    100K+
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    FREELANCERS
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black md:text-5xl">
                    500K+
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    5 STAR REVIEWS
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Button className="rounded-full bg-black px-8 py-6 text-lg font-medium text-white hover:bg-gray-800">
                  Explore Truelance Talent
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
