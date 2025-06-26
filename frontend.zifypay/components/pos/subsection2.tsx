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
                Building Homes
                <br />
                with Frame Technology
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cottages and houses built using frame technology receive wide
                distribution due to the fact that many people have been serving
                for decades.
              </p>
            </div>

            {/* House Frame Illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <Image
                  src="https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/cstore-h-e1665871653429.png"
                  alt="House frame construction illustration"
                  width={500}
                  height={300}
                  className="h-auto w-full max-w-md object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards (with image replacing icon) */}
          <div className="space-y-4">
            {[
              {
                title: "High Strength",
                description:
                  "Frame construction provides exceptional structural integrity and durability for long-term use.",
              },
              {
                title: "Thermal Insulation",
                description:
                  "Advanced insulation systems ensure optimal temperature control and energy efficiency.",
              },
              {
                title: "No Shrinkage",
                description:
                  "Frame technology eliminates structural settling and maintains dimensional stability over time.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="rounded-2xl bg-gray-800 p-6 text-white"
              >
                <div className="flex items-start space-x-4">
                  {/* Image instead of icon */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      src="https://cdn-hhhjh.nitrocdn.com/ABYHEVzZQBqbfVtPnSAxaYVboWidAoVM/assets/images/optimized/rev-aa9dff5/petrosoftinc.com/wp-content/uploads/2022/09/Group-17440.png"
                      alt="Feature image"
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
