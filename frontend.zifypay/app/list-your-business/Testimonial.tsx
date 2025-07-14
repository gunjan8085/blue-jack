"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons (replacing react-icons for simplicity)
const ArrowLeft = ({ size = 24, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ArrowRight = ({ size = 24, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

// Type Definitions
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type CircularTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
  };
  fontSizes?: {
    name?: string;
    designation?: string;
    quote?: string;
  };
};

// Sample Data
const testimonials: Testimonial[] = [
  {
    quote:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

// Gap Calculation Utility
function calculateGap(width: number): number {
  // Mobile-first approach
  if (width <= 480) return 30; // Very small screens
  if (width <= 640) return 40; // Small screens
  if (width <= 768) return 50; // Medium screens

  // Desktop calculations
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;

  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));

  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

// Core Component
const CircularTestimonials: React.FC<CircularTestimonialsProps> = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) => {
  const colorName = colors.name ?? "#fff";
  const colorDesignation = colors.designation ?? "#cbd5e1";
  const colorTestimony = colors.testimony ?? "#e2e8f0";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current)
        clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonialsLength) % testimonialsLength
    );
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = isMobile ? gap * 0.5 : gap * 0.8;
    const scale = isMobile ? 0.75 : 0.85;
    const rotateY = isMobile ? 8 : 15;

    const isActive = index === activeIndex;
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: isMobile ? 0.7 : 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${scale}) rotateY(${rotateY}deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: isMobile ? 0.7 : 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${scale}) rotateY(-${rotateY}deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Responsive font sizes
  const responsiveFontSizes = {
    name: isMobile ? "1.25rem" : fontSizes.name ?? "1.5rem",
    designation: isMobile ? "0.875rem" : fontSizes.designation ?? "0.925rem",
    quote: isMobile ? "1rem" : fontSizes.quote ?? "1.125rem",
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* Images */}
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="testimonial-image"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="testimonial-content">
          {/* Glow background */}
          <div className="glow-background">
            <div className="glow-effect bg-blue-400" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="name"
                style={{ color: colorName, fontSize: responsiveFontSizes.name }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="designation"
                style={{
                  color: colorDesignation,
                  fontSize: responsiveFontSizes.designation,
                }}
              >
                {activeTestimonial.designation}
              </p>

              {/* Quote glow background */}
              <div className="quote-glow bg-blue-500" />

              <motion.p
                className="quote"
                style={{
                  color: colorTestimony,
                  fontSize: responsiveFontSizes.quote,
                }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="arrow-buttons">
            <button
              className="arrow-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={isMobile ? 20 : 28} color={colorArrowFg} />
            </button>
            <button
              className="arrow-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              <ArrowRight size={isMobile ? 20 : 28} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: 1rem;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-grid {
          display: grid;
          gap: 3rem;
          width: 100%;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 16rem;
          perspective: 1000px;
        }

        .testimonial-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          text-align: center;
        }

        .glow-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glow-effect {
          width: 20rem;
          height: 10rem;
          opacity: 0.3;
          filter: blur(3rem);
          border-radius: 1rem;
        }

        .quote-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 25rem;
          height: 25rem;
          opacity: 0.2;
          filter: blur(3rem);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        .name {
          font-weight: bold;
          margin-bottom: 0.5rem;
          z-index: 10;
          position: relative;
        }

        .designation {
          margin-bottom: 1.5rem;
          z-index: 10;
          position: relative;
        }

        .quote {
          line-height: 1.6;
          z-index: 10;
          position: relative;
          margin-bottom: 1.5rem;
        }

        .arrow-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          z-index: 10;
          position: relative;
        }

        .arrow-button {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          outline: none;
        }

        .arrow-button:active {
          transform: scale(0.95);
        }

        /* Mobile styles */
        @media (max-width: 480px) {
          .testimonial-container {
            padding: 0.75rem;
          }

          .testimonial-grid {
            gap: 2rem;
          }

          .image-container {
            height: 14rem;
          }

          .testimonial-image {
            border-radius: 0.75rem;
          }

          .glow-effect {
            width: 16rem;
            height: 8rem;
          }

          .quote-glow {
            width: 20rem;
            height: 20rem;
          }

          .quote {
            line-height: 1.5;
          }

          .arrow-button {
            width: 2.25rem;
            height: 2.25rem;
          }
        }

        /* Tablet and desktop styles */
        @media (min-width: 768px) {
          .testimonial-container {
            padding: 2rem;
          }

          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }

          .image-container {
            height: 24rem;
          }

          .testimonial-image {
            border-radius: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .testimonial-content {
            text-align: left;
          }

          .glow-effect {
            width: 28rem;
            height: 14rem;
          }

          .quote-glow {
            width: 37.5rem;
            height: 37.5rem;
          }

          .quote {
            line-height: 1.75;
            margin-bottom: 2rem;
          }

          .arrow-buttons {
            justify-content: flex-start;
            gap: 1.5rem;
          }

          .arrow-button {
            width: 2.7rem;
            height: 2.7rem;
          }
        }

        /* Large desktop styles */
        @media (min-width: 1024px) {
          .testimonial-container {
            padding: 2.5rem;
          }

          .designation {
            margin-bottom: 2rem;
          }

          .quote {
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

// Exported Wrapper Component
export default function Testimonial() {
  return (
    <div
      className="bg-gradient-to-r from-[#001A39] to-[#001433] min-h-screen flex flex-col items-center justify-center text-white"
      style={{
        fontFamily:
          "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div className="w-full max-w-7xl px-4 md:px-32">
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold mt-24  md:mb-10 text-white text-center md:text-center">
          What Our Customers Are Saying
        </h1>
        <CircularTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </div>
  );
}
