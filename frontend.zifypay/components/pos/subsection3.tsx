import Image from "next/image";

export default function CTASection() {
  return (
    <div className="bg-white py-16 mt-12 rounded-3xl px-4 mx-8 ">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Start selling
                <br />
                with Zifypay.
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Set up is fast and secure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Get started
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Contact us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://res.cloudinary.com/dhehfjptn/image/upload/v1750751934/phon1_v5ycg0.png"
                alt="Zifypay payment device being used for contactless payment"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
