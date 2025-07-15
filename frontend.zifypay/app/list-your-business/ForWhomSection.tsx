"use client";
import Image from "next/image";

const lenders = [
  {
    title: "Emerging Businesses",
    description:
      "Start strong with ZifyPay. Launch payment solutions fast, build trust, and grow your brand with smart POS and zero-fee payments.",
    image: "/desh.png", // Replace with actual path
  },
  {
    title: "Growing Enterprises",
    description:
      "Scale your business with robust payment infrastructure, analytics, and automation tools to optimize operations and boost revenue.",
    image: "/desh2.png", // Replace with actual path
  },
  {
    title: "Enterprise Leaders",
    description:
      "Power national operations with enterprise-grade compliance, custom dashboards, and seamless integrations across locations.",
    image: "/desh3.png", // Replace with actual path
  },
];

export default function ZifyGrowthSection() {
  return (
    <section className="w-full px-4 py-20  text-center min-h-[900px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-inter text-[#094183] mb-4 mt-32">
          Built to grow with you at every stage
        </h2>
        <p className="text-lg text-[#0c488e] mb-16 ">
          Whether you’re launching, scaling, or leading nationallyZifyPay adapts
          to your needs with modern tools for modern businesses.
        </p>
        <div className="grid md:grid-cols-3 gap-16 mt-16">
          {lenders.map(({ title, description, image }, idx) => (
            <div
              key={idx}
              className="bg-white h-full  rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 text-left h-1/2 ">
                <h3 className="text-2xl font-semibold text-[#094183] mb-2 p-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm">{description}</p>
              </div>
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
