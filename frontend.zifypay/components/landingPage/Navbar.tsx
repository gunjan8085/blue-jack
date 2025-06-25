// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import Link from "next/link";
// import type {
//   HTMLNavElement,
//   HTMLDivElement,
//   HTMLUListElement,
//   HTMLAnchorElement,
// } from "react";

// export default function Navbar() {
//   const navRef = useRef<HTMLNavElement>(null);
//   const logoRef = useRef<HTMLDivElement>(null);
//   const menuRef = useRef<HTMLUListElement>(null);
//   const ctaRef = useRef<HTMLAnchorElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Initial state
//       gsap.set([logoRef.current, menuRef.current, ctaRef.current], {
//         opacity: 0,
//         y: -20,
//       });

//       // Animation timeline
//       const tl = gsap.timeline();

//       tl.to(logoRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         ease: "power2.out",
//       })
//         .to(
//           menuRef.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: "power2.out",
//           },
//           "-=0.4"
//         )
//         .to(
//           ctaRef.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: "power2.out",
//           },
//           "-=0.4"
//         );
//     }, navRef);

//     return () => ctx.revert();
//   }, []);

//   const menuItems = [
//     "Solutions",
//     "Industries",
//     "Pricing",
//     "About",
//     "Resources",
//   ];

//   return (
//     <nav ref={navRef} className="w-full px-6 py-4 lg:px-12 lg:py-6">
//       <div className="flex items-center justify-between max-w-7xl mx-auto">
//         {/* Logo */}
//         <div ref={logoRef} className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
//             <span className="text-white font-bold text-lg">Z</span>
//           </div>
//           <span className="text-white text-xl font-semibold">ifyPay</span>
//         </div>

//         {/* Navigation Menu */}
//         <ul ref={menuRef} className="hidden md:flex items-center space-x-8">
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <Link
//                 href="#"
//                 className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
//               >
//                 {item}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* CTA Button */}
//         <Link
//           ref={ctaRef}
//           href="#"
//           className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
//         >
//           <span>Get Started</span>
//           <span>→</span>
//         </Link>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { FaStore, FaUsers, FaGasPump, FaBuilding } from "react-icons/fa";


export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, menuRef.current, ctaRef.current], {
        opacity: 0,
        y: -20,
      });

      const tl = gsap.timeline();
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          menuRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="w-full px-6 py-4 lg:px-12 lg:py-6  text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dhehfjptn/image/upload/v1750750580/footerlog_pkjggc.svg"
            alt=""
            className="h-8"
          />
        </div>

        {/* Navigation Menu */}
        <ul ref={menuRef} className="hidden md:flex items-center space-x-8">
          <li className="relative group">
            <span className="cursor-pointer font-medium hover:text-blue-400 transition-colors duration-300">
              Solutions
            </span>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-4 z-50 bg-white text-black shadow-xl rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-3 transition-all duration-300 min-w-[500px] z-50">
              <ul className="py-3 px-4 space-y-2 flex flex-col">
                <div className="flex">
                <li>
                  <Link
                    href="/for-bussiness"
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 transition w-[300px]"
                  >
                    <FaStore className="text-blue-500 mt-1" size={30} />
                    <div>
                      <p className="font-semibold">POS for Business</p>
                      <p className="text-sm text-gray-600">
                        Streamline sales and inventory management.
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customer"
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 transition w-[300px]"
                    >
                    <FaUsers className="text-blue-500 mt-1" size={30} />
                    <div>
                      <p className="font-semibold">For Customers</p>
                      <p className="text-sm text-gray-600">
                        Engage and retain your loyal customer base.
                      </p>
                    </div>
                  </Link>
                </li>
                </div>
                <div className="flex">

                <li>
                  <Link
                    href="/solutions/fuel-stations"
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 transition w-[300px]"
                    >
                    <FaGasPump className="text-blue-500 mt-1" size={30} />
                    <div>
                      <p className="font-semibold">Fuel Stations</p>
                      <p className="text-sm text-gray-600">
                        Complete solutions for gas stations and pumps.
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/c-store"
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 transition w-[300px]"
                    >
                    <FaBuilding className="text-blue-500 mt-1" size={30} />
                    <div>
                      <p className="font-semibold">C-Store</p>
                      <p className="text-sm text-gray-600">
                        Power your convenience store operations.
                      </p>
                    </div>
                  </Link>
                </li>
                    </div>
              </ul>
            </div>
          </li>

          {/* Regular Menu Items */}
          <li>
            <Link
              href="/industries"
              className="font-medium hover:text-blue-400 transition-colors duration-300"
            >
              Industries
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="font-medium hover:text-blue-400 transition-colors duration-300"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="font-medium hover:text-blue-400 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/resources"
              className="font-medium hover:text-blue-400 transition-colors duration-300"
            >
              Resources
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link
          ref={ctaRef}
          href="/get-started"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
        >
          <span>Get Started</span>
          <span>→</span>
        </Link>
      </div>
    </nav>
  );
}
