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

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([logoRef.current, menuRef.current, ctaRef.current], {
        opacity: 0,
        y: -20,
      });

      // Animation timeline
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

  const menuItems = [
    "Solutions",
    "Industries",
    "Pricing",
    "About",
    "Resources",
  ];

  return (
    <nav ref={navRef} className="w-full px-6 py-4 lg:px-12 lg:py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/dhehfjptn/image/upload/v1750750580/footerlog_pkjggc.svg"
            alt=""
          />
        </div>

        {/* Navigation Menu */}
        <ul ref={menuRef} className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href="#"
                className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          ref={ctaRef}
          href="#"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
        >
          <span>Get Started</span>
          <span>→</span>
        </Link>
      </div>
    </nav>
  );
}
