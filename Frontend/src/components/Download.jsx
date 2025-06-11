import React, { useState, useEffect } from "react";

const Download = () => {
  const [isMD, setIsMD] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsMD(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    width: "100%",
  };

  const bannerImageStyle = {
    width: "100%",
    height: "24rem",
    objectFit: "cover",
  };

  const sectionStyle = {
    backgroundColor: "#ffffff",
    padding: "4rem 1.5rem",
    textAlign: "center",
    color: "#000000",
  };

  const headingStyle = {
    fontSize: isMD ? "3rem" : "2.25rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const subTextStyle = {
    fontSize: "1rem",
    color: "#4b5563", // Tailwind gray-700
    maxWidth: "40rem",
    margin: "0 auto 3rem",
  };

  const cardWrapperStyle = {
    display: "grid",
    gap: "2rem",
    maxWidth: "64rem",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "#f3f4f6", // Tailwind gray-100
    padding: "1.5rem",
    borderRadius: "0.75rem",
    display: "flex",
    flexDirection: isMD ? "row" : "column",
    alignItems: "center",
    textAlign: "left",
  };

  const textSectionStyle = {
    width: "100%",
    marginBottom: isMD ? "0" : "1.5rem",
    paddingRight: isMD ? "1.5rem" : "0",
  };

  const appTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  };

  const spanStyle = {
    display: "block",
    fontWeight: "normal",
  };

  const descriptionStyle = {
    fontSize: "0.875rem",
    color: "#4b5563",
    margin: "0.5rem 0 1rem",
  };

  const badgeWrapperStyle = {
    display: "flex",
    gap: "0.75rem",
  };

  const badgeStyle = {
    height: "2.5rem",
  };

  const imageSectionStyle = {
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {/* ✅ CTA Banner */}
      <div style={{ marginTop: "4rem", backgroundColor: "#fff" }}>
        <img
          src="https://res.cloudinary.com/dt07noodg/image/upload/v1748506663/02921022_nix7g0.png"
          alt=""
          style={bannerImageStyle}
        />
      </div>

      {/* ✅ Download App Section */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Download our mobile apps</h2>
        <p style={subTextStyle}>
          Book unforgettable beauty and wellness experiences with our mobile
          app, or run your business with our award-winning iOS and Android app
        </p>

        <div style={cardWrapperStyle}>
          {/* Customers App */}
          <div style={cardStyle}>
            <div style={textSectionStyle}>
              <h3 style={appTitleStyle}>
                ZifyPay <span style={spanStyle}>Customers</span>
              </h3>
              <p style={descriptionStyle}>
                Instantly book beauty and wellness experiences near you
              </p>
              <div style={badgeWrapperStyle}>
                <img
                  src="https://res.cloudinary.com/dt07noodg/image/upload/v1747467639/apple-logo_qlhgoe.png"
                  alt="App Store"
                  style={badgeStyle}
                />
                <img
                  src="https://res.cloudinary.com/dt07noodg/image/upload/v1747467644/playstore_bkgdrc.png"
                  alt="Google Play"
                  style={badgeStyle}
                />
              </div>
            </div>
            <div style={imageSectionStyle}>
              <img
                src="https://res.cloudinary.com/dt07noodg/image/upload/v1748507977/footer-1_uggjon.png"
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Business App */}
          <div style={cardStyle}>
            <div style={textSectionStyle}>
              <h3 style={appTitleStyle}>
                ZifyPay for <span style={spanStyle}>Business</span>
              </h3>
              <p style={descriptionStyle}>
                Instantly book beauty and wellness experiences near you
              </p>
              <div style={badgeWrapperStyle}>
                <img
                  src="https://res.cloudinary.com/dt07noodg/image/upload/v1747467639/apple-logo_qlhgoe.png"
                  alt="App Store"
                  style={badgeStyle}
                />
                <img
                  src="https://res.cloudinary.com/dt07noodg/image/upload/v1747467644/playstore_bkgdrc.png"
                  alt="Google Play"
                  style={badgeStyle}
                />
              </div>
            </div>
            <div style={imageSectionStyle}>
              <img
                src="https://res.cloudinary.com/dt07noodg/image/upload/v1748507978/footer-2_bgohgt.png"
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
