import React, { useEffect, useState } from "react";

const ProfessionalServices = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSM = windowWidth >= 640;
  const isMD = windowWidth >= 768;

  const containerStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: `${isMD ? "3rem 8rem" : isSM ? "3rem 1.5rem" : "3rem 1rem"}`,
  };

  const headingStyle = {
    fontSize: isMD ? "3rem" : isSM ? "2.25rem" : "1.875rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem",
  };

  const subTextStyle = {
    textAlign: "center",
    fontSize: isMD ? "1.25rem" : isSM ? "1.125rem" : "1rem",
    color: "#4B5563",
    marginBottom: "2.5rem",
    maxWidth: "40rem",
    marginInline: "auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMD ? "repeat(10, 1fr)" : "1fr",
    gap: "1.5rem",
  };

  const leftColStyle = {
    gridColumn: isMD ? "span 4" : "auto",
    background: "linear-gradient(to bottom right, #4F46E5, #9333EA)",
    color: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const rightColStyle = {
    gridColumn: isMD ? "span 6" : "auto",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const rowCard = (gradient) => ({
    background: gradient,
    color: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
    display: "flex",
    flexDirection: isMD ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  });

  const textBlock = {
    maxWidth: isMD ? "60%" : "100%",
  };

  const gradientBox = (gradient) => ({
    background: gradient,
    color: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  });

  const imageStyle = {
    objectFit: "contain",
    width: "100%",
    maxWidth: "160px",
    margin: isMD ? "0" : "0 auto",
  };

  const bottomGridStyle = {
    display: "grid",
    gridTemplateColumns: isMD ? "repeat(10, 1fr)" : "1fr",
    gap: "1.5rem",
    marginTop: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Committed to your success</h2>
      <p style={subTextStyle}>
        Every business has its own needs, and we have got you covered with a
        range of professional services
      </p>

      {/* Main Grid */}
      <div style={gridStyle}>
        {/* Left Column */}
        <div style={leftColStyle}>
          <div>
            <h3 style={{ fontSize: isMD ? "1.875rem" : "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Customer success manager
            </h3>
            <p style={{ fontSize: isMD ? "1.125rem" : "1rem" }}>
              Get dedicated help to maximize your potential on Fresha from
              personalized onboarding and expert guidance to ongoing support
              tailored to your business goals.
            </p>
          </div>
          <img
            src="https://res.cloudinary.com/dt07noodg/image/upload/v1747463875/main_grid_j3cr57.png"
            alt="Customer success"
            style={{ width: "100%", maxWidth: "16rem", objectFit: "contain", marginTop: "1.5rem" }}
          />
        </div>

        {/* Right Column */}
        <div style={rightColStyle}>
          {/* Row 1 */}
          <div style={rowCard("linear-gradient(to bottom right, #A855F7, #4F46E5)")}>
            <div style={textBlock}>
              <h3 style={{ fontSize: isMD ? "1.875rem" : "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Access our network
              </h3>
              <p style={{ fontSize: isMD ? "1.125rem" : "1rem" }}>
                Use an Enterprise-certified account manager to bring your
                business to life
              </p>
            </div>
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747463920/mainleftgrid_c3kvbi.png"
              alt="Network"
              style={imageStyle}
            />
          </div>

          {/* Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: isMD ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
            {/* 24/7 Support */}
            <div style={gradientBox("linear-gradient(to bottom right, #9333EA, #2563EB)")}>
              <div>
                <h3 style={{ fontSize: isMD ? "1.875rem" : "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  24/7 priority support
                </h3>
                <p style={{ fontSize: isMD ? "1.125rem" : "1rem" }}>
                  Talk with our customer care team anytime. We're here to help.
                </p>
              </div>
              <img
                src="https://res.cloudinary.com/dt07noodg/image/upload/v1747463919/main_leftright_brztmh.png"
                alt="Support"
                style={{ width: "100%", maxWidth: "140px", objectFit: "contain", margin: "1rem auto 0" }}
              />
            </div>

            {/* Migration Support */}
            <div style={gradientBox("linear-gradient(to bottom right, #3730A3, #7E22CE)")}>
              <div>
                <h3 style={{ fontSize: isMD ? "1.875rem" : "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Migration support
                </h3>
                <p style={{ fontSize: isMD ? "1.125rem" : "1rem" }}>
                  Our team can help bring your data from other platforms
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                <img
                  src="https://res.cloudinary.com/dt07noodg/image/upload/v1747464876/booky_gakzle.png"
                  alt="Booksy"
                  style={{ height: "2.5rem" }}
                />
                <img
                  src="https://res.cloudinary.com/dt07noodg/image/upload/v1747464875/fresha_ruzfbo.png"
                  alt="Fresha"
                  style={{ height: "2.5rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={bottomGridStyle}>
        {/* Tailored Solutions */}
        <div style={{ ...rowCard("linear-gradient(to bottom right, #1D4ED8, #6B21A8)"), gridColumn: isMD ? "span 6" : "auto" }}>
          <div style={textBlock}>
            <h3 style={{ fontSize: isMD ? "1.875rem" : "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Tailored solutions
            </h3>
            <p style={{ fontSize: isMD ? "1.125rem" : "1rem" }}>
              Have something in mind? Just ask us. We will figure it out
              together.
            </p>
          </div>
          <img
            src="https://res.cloudinary.com/dt07noodg/image/upload/v1747464033/botomgrid_jk3gul.png"
            alt="Solutions"
            style={imageStyle}
          />
        </div>

        {/* Expert Consultation */}
        <div style={{ ...rowCard("linear-gradient(to bottom right, #7E22CE, #1E40AF)"), gridColumn: isMD ? "span 4" : "auto" }}>
          <div style={textBlock}>
            <h3 style={{ fontSize: isMD ? "1.875rem" : "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              Expert consultation
            </h3>
            <p style={{ fontSize: isMD ? "1.125rem" : "1rem" }}>
              Get direct access to product experts for guidance on all things
              ZifyPay
            </p>
          </div>
          <img
            src="https://res.cloudinary.com/dt07noodg/image/upload/v1747464033/bottum_grid_qlx4ji.png"
            alt="Consultation"
            style={imageStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalServices;
