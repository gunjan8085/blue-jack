import React, { useEffect, useState } from "react";

const BusinessStats = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "4rem 1.5rem",
  };

  const headerStyle = {
    fontSize: isMobile ? "1.875rem" : "3rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
  };

  const subTextStyle = {
    textAlign: "center",
    fontSize: isMobile ? "1.125rem" : "1.25rem",
    color: "#4B5563",
    marginBottom: "3rem",
    lineHeight: 1.75,
    maxWidth: "40rem",
    marginInline: "auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
    gap: "2rem",
    alignItems: "center",
  };

  const statBlockStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    textAlign: "left",
  };

  const statStyle = {
    marginBottom: "1rem",
  };

  const statValue = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#4F46E5", // Indigo-600
    marginBottom: "0.25rem",
  };

  const statLabel = {
    fontWeight: 600,
    fontSize: "1.125rem",
    marginBottom: "0.5rem",
  };

  const statDescription = {
    fontSize: "0.875rem",
    color: "#4B5563",
    lineHeight: 1.6,
  };

  const phoneContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const phoneWrapper = {
    position: "relative",
    width: isMobile ? "280px" : window.innerWidth >= 1024 ? "400px" : "360px",
  };

  const phoneImage = {
    width: "100%",
    objectFit: "contain",
  };

  const screenImage = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "2rem",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Boss your business</h2>
      <p style={subTextStyle}>
        At Zify-Pay, we help grow your business, attract clients, and boost
        sales. See how businesses thrive with us.
      </p>

      <div style={gridStyle}>
        {/* Left Stats */}
        <div style={statBlockStyle}>
          <div style={statStyle}>
            <p style={statValue}>26%</p>
            <p style={statLabel}>More clients</p>
            <p style={statDescription}>
              Attract clients and build loyalty on the world's largest beauty
              marketplace — for a fully booked day, every day.
            </p>
          </div>
          <div style={statStyle}>
            <p style={statValue}>89%</p>
            <p style={statLabel}>Fewer no-shows</p>
            <p style={statDescription}>
              Reduce no-shows and cancellations by requiring a deposit or full
              payment upfront.
            </p>
          </div>
        </div>

        {/* Center Image */}
        <div style={phoneContainerStyle}>
          <div style={phoneWrapper}>
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747461551/iphone_fdhtr7.svg"
              alt="iPhone frame"
              style={phoneImage}
            />
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/iphone_image_niiwsn.png"
              alt="Business app screenshot"
              style={screenImage}
            />
          </div>
        </div>

        {/* Right Stats */}
        <div style={statBlockStyle}>
          <div style={statStyle}>
            <p style={statValue}>290%</p>
            <p style={statLabel}>More tips</p>
            <p style={statDescription}>
              Earn more tips when clients book through ZifyPay, your website,
              Google, or social media.
            </p>
          </div>
          <div style={statStyle}>
            <p style={statValue}>20%</p>
            <p style={statLabel}>More sales</p>
            <p style={statDescription}>
              Generate more sales by upselling services when clients book
              online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessStats;
