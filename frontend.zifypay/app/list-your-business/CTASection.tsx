import React from "react";

const CARD_BLUE = {
  background: "linear-gradient(135deg, #1e3a8a 80%, #3b82f6 100%)",
  color: "white",
  borderRadius: "1.5rem",
  width: "340px",
  height: "210px",
  boxShadow: "0 8px 32px rgba(30,58,138,0.18)",
  position: "absolute" as const,
  top: "-40px",
  right: "-60px",
  transform: "rotate(20deg)",
  zIndex: 2,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end",
  padding: "2rem 2rem 1.5rem 2rem",
  fontFamily: "'Proxima Nova', sans-serif",
};
const CARD_GREEN = {
  background: "linear-gradient(135deg, #4ade80 80%, #22c55e 100%)",
  color: "white",
  borderRadius: "1.5rem",
  width: "320px",
  height: "200px",
  boxShadow: "0 8px 32px rgba(34,197,94,0.13)",
  position: "absolute" as const,
  bottom: "-30px",
  right: "30px",
  transform: "rotate(-12deg)",
  zIndex: 1,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end",
  padding: "2rem 2rem 1.5rem 2rem",
  fontFamily: "'Proxima Nova', sans-serif",
};

const HeroCardSection = () => {
  return (
    <section
      className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-16 relative overflow-hidden"
      style={{
        fontFamily: "'Proxima Nova', sans-serif",
      }}
    >
      {/* Left: Text */}
      <div className="flex-1 flex flex-col items-start justify-center z-10 max-w-xl w-full mb-12 lg:mb-0">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4"
          style={{ color: "#4caf50" }}
        >
          Join the movement.
        </h1>
        <div className="text-[#183153] text-3xl md:text-4xl font-semibold mb-8 leading-tight">
          Streamline your financials
          <br />
          in 10 mins or less.
        </div>
        <a
          href="#"
          className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-8 py-4 rounded-md shadow-md transition font-bold text-lg"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          See a demo
        </a>
      </div>
      {/* Right: Cards */}
      <div className="flex-1 flex items-center justify-center relative min-h-[320px] w-full">
        <img src="/" alt="" />
      </div>
    </section>
  );
};

export default HeroCardSection;
