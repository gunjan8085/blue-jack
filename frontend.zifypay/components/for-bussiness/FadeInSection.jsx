// components/FadeInSection.jsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: 50 },
      {
        duration: 1,
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay,
      }
    );
  }, [delay]);

  return <div ref={ref}>{children}</div>;
};

export default FadeInSection;
