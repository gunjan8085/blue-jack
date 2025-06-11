
import React, { useEffect, useState } from "react";
import FadeInSection from "@components/FadeInSection";
import BusinessStats from "@components/BusinessStats";
import Bendo from "@components/Bendo";
import Faq from "@components/Faq";
import CategoriesMarquee from "@components/Marquee";
import Download from "@components/Download";
import Footer from "@components/Footer";


const Header = () => {
  const styles = {
    header: {
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      width: "100%",
    },
    container: {
      maxWidth: "1120px",
      margin: "0 auto",
      padding: "1rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      height: "2rem",
      objectFit: "contain",
    },
    buttonContainer: {
      display: "none",
    },
    button: {
      backgroundColor: "#4338ca", // Indigo-700
      color: "#ffffff",
      padding: "0.5rem 1.25rem",
      borderRadius: "9999px",
      fontSize: "0.875rem",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    hamburger: {
      display: "block",
    },
    svgIcon: {
      height: "1.5rem",
      width: "1.5rem",
      stroke: "#374151", // Gray-700
    },
    // Responsive styles
    '@media (min-width: 768px)': {
      buttonContainer: {
        display: "block",
      },
      hamburger: {
        display: "none",
      }
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <img
          src="https://res.cloudinary.com/dt07noodg/image/upload/v1748250920/Group_5_e01ync.png"
          alt="Logo"
          style={styles.logo}
        />

        <div style={styles.buttonContainer} className="md:block">
          <a href="https://lodgezify.com/business/signup">
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4338ca")}
            >
              BOOK DEMO NOW
            </button>
          </a>
        </div>

        <div style={styles.hamburger} className="md:hidden">
          <button style={{ color: "#374151" }}>
            <svg
              style={styles.svgIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};


const Hero = () => {
  const styles = {
    topSection: {
      backgroundColor: "#ffffff",
      textAlign: "center",
      padding: "3rem 1.5rem",
    },
    heading: {
      fontSize: "2.25rem", // text-4xl
      fontWeight: 800,
      color: "#000000",
      marginBottom: "1rem",
    },
    headingLarge: {
      fontSize: "3rem", // text-5xl for md screens
    },
    paragraph: {
      fontSize: "1.125rem", // text-lg
      color: "#4B5563", // text-gray-700
      marginBottom: "1.5rem",
    },
    paragraphLarge: {
      fontSize: "1.25rem", // text-xl for md screens
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },
    primaryButton: {
      backgroundColor: "#000000",
      color: "#ffffff",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      fontSize: "1.125rem",
      fontWeight: 500,
      border: "none",
      cursor: "pointer",
    },
    secondaryButton: {
      border: "1px solid #000000",
      color: "#000000",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      fontSize: "1.125rem",
      fontWeight: 500,
      backgroundColor: "transparent",
      cursor: "pointer",
    },
    bgImageSection: {
      backgroundImage:
        "url('https://res.cloudinary.com/dt07noodg/image/upload/v1747456138/Hero-bg_x4ljce.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    statsSection: {
      backgroundColor: "#ffffff",
      padding: "4rem 1.5rem",
      textAlign: "center",
    },
    reviewHeading: {
      fontSize: "1.5rem", // text-2xl
      fontWeight: 500,
      color: "#4B5563",
      marginBottom: "3rem",
    },
    reviewHeadingLarge: {
      fontSize: "1.875rem", // md:text-3xl
    },
    star: {
      color: "#9333ea", // text-purple-600
      fontWeight: 700,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "3rem",
      maxWidth: "96rem",
      margin: "0 auto",
      color: "#000000",
    },
    statsGridLarge: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    statItem: {
      textAlign: "center",
    },
    statValue: {
      fontSize: "1.875rem",
      fontWeight: "bold",
    },
    statLabel: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#4B5563",
      marginTop: "0.5rem",
    },
    statLabelLarge: {
      fontSize: "1.125rem",
    },
  };

  return (
    <div>
      {/* Top Section */}
      <div style={styles.topSection}>
        <h1 style={{ ...styles.heading }} className="md:text-5xl">
          The <span>#1 software</span> for all types of{" "}
          <span>Business</span>
        </h1>
        <p style={styles.paragraph} className="md:text-xl">
          Smart booking software with built-in payments — simple, flexible, and
          ready to grow with your business.
        </p>
        <div style={styles.buttonGroup}>
          <a href="/">
            <button style={styles.primaryButton}>Get started now</button>
          </a>
          <button style={styles.secondaryButton}>Watch an overview</button>
        </div>
      </div>

      {/* Hero Background Section */}
      <div style={styles.bgImageSection}>
        <img
          src="https://res.cloudinary.com/dt07noodg/image/upload/v1748505241/-1_buffus.png"
          alt=""
          style={{ width: "100%", height: "auto" }}
        />

        <div style={styles.statsSection}>
          <div>
            <h2 style={styles.reviewHeading} className="md:text-3xl">
              Most recommended 5/5
              <span style={styles.star}> ★★★★★</span> on Capterra
            </h2>
          </div>
          <div
            style={styles.statsGrid}
            className="md:grid-cols-4 grid-cols-2"
          >
            <div style={styles.statItem}>
              <h3 style={styles.statValue}>120,000+</h3>
              <p style={styles.statLabel} className="md:text-lg">
                Partner businesses
              </p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statValue}>450,000+</h3>
              <p style={styles.statLabel} className="md:text-lg">
                Professionals
              </p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statValue}>1 Billion+</h3>
              <p style={styles.statLabel} className="md:text-lg">
                Appointments booked
              </p>
            </div>
            <div style={styles.statItem}>
              <h3 style={styles.statValue}>120+</h3>
              <p style={styles.statLabel} className="md:text-lg">
                Countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const ImageGrid = () => {
const categories = [
    {
      title: "Salon",
      image:
        "https://imgs.search.brave.com/H6EvVB-mHIdcTuC9oOIOxQsX6JczbIIOigqkMgY4gQM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/OTQ4Mzg5NC9waG90/by9zYWxvbi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VnVz/TXh4aVBMWEY0M04t/cHY0Y3Y4aVJnZFBh/Zk1rUHJFemZDSVU5/ZENWUT0",
    },
    {
      title: "Spas",
      image:
        "https://imgs.search.brave.com/DuIcDFokcKhhwdcYW0tOQPvV2QwUE91wbx_k6C3vQ7w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c3BhZmluZGVyLmNv/bS8yMDE1LzA4L21h/c3NhZ2UuanBn",
    },
    {
      title: "Doctor",
      image:
        "https://imgs.search.brave.com/XNXC0gnmEogNddtamdkcK34JnhQ1pAZKP98KCXxIYis/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/YW1pbHktZG9jdG9y/LWRvY3Rvci1zLW9m/ZmljZV8yMy0yMTQ4/MTY4NTA0LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA",
    },
    {
      title: "Fitness",
      image:
        "https://imgs.search.brave.com/ByUkU5Ol4ClON6qBwbCZgILnBnmmyuho1eBCgxMjcoM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9tdXNj/dWxhci1zaGlydGxl/c3MtbWFuLWV4ZXJj/aXNpbmctd2l0aC13/ZWlnaHRzLWluLXJv/eWFsdHktZnJlZS1p/bWFnZS0xNzQyNDkx/MDM3LnBqcGVnP2Ny/b3A9MC42Njh4dzox/LjAweGg7MC4yMzF4/dywwJnJlc2l6ZT0z/NjA6Kg",
    },
    {
      title: "Café",
      image:
        "https://imgs.search.brave.com/0X_y4xa7uOaiFVEMZg7oAQYTCceryr0_MXR-V1-EexE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuc3BvdGFwcHMu/Y28vc3BvdHMvZWEv/YTkxMjM5MWVlNTQy/MDFhYzM2NTY2MjU1/MGY2NzM2L2Z1bGw.jpeg",
    },
    {
      title: "Restaurant",
      image:
        "https://imgs.search.brave.com/LZwHGZOgk3YeLWSVrJszwdM3NSWJVNJtCn_4X4eIXnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTE2/MzAzNzYvcGhvdG8v/YW1lcmljYW4tZGlu/ZXIuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVNMZnY4eVRR/b2prTkxsZE1mWU9N/ZHR3S3JWelpteUpV/WHI4Zm5hSEZZdWc9",
    },
    {
      title: "General Services",
      image:
        "https://imgs.search.brave.com/pwFeJEgnfKZW5pye71sPtx2wl_wyha9eiVNJh8uRu_8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9nZW5l/cmFsc2VydmljZXMu/YmFsdGltb3JlY2l0/eS5nb3Yvc2l0ZXMv/ZGVmYXVsdC9maWxl/cy9zdHlsZXMvZmxp/Z2h0X3NsaWRlc2hv/dy9wdWJsaWMvZm0l/MjB3ZWJzaXRlJTIw/Mi5qcGc_aXRvaz05/czBaLTQtOQ",
    },
    {
      title: "Professional Services",
      image:
        "https://imgs.search.brave.com/jW-2kgQsqzgtBm-UbN2adjyGl2HJRp5E8rqvqZyWw8s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/NjA4ODgwMC9waG90/by9idXNpbmVzcy1j/b2xsZWFndWVzLXdv/cmtpbmctdG9nZXRo/ZXItb24tYS1sYXB0/b3AuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXJYVE50aWtv/Y0VIUi1xMkNUVFNH/T1JESHB5OWpDc25i/VTNGSERtQXRxNHc9",
    },
    {
      title: "Delivery & Logistics",
      image:
        "https://imgs.search.brave.com/GrXhfDsnfKWJ4-HZbFDkLDHAbN6-u4YARA59O61cngs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MjU2MjU3OC9waG90/by9jb3VyaWVyLWNo/ZWNraW5nLXRoZS1w/YXJjZWwtZm9yLWRl/bGl2ZXJ5LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1jN0Ju/SVdmQ3BYbnpIbS1X/ZTZxY1otcjljZ1h2/OUJYS0VzTkJDVUwt/Q2g4PQ",
    },
    {
      title: "Event Planning & Management",
      image:
        "https://imgs.search.brave.com/KxGlc6ed8EcZWlQ9rWecnSnCxn2usMhQWMQV30jZ52k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlY2FzdGxlZ3Jw/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8wOC9zdWNj/ZXNzZnVsLWV2ZW4t/cGxhbm5pbmctMTAy/NHg2ODMuanBn",
    },
    {
      title: "Automotive Services",
      image:
        "https://imgs.search.brave.com/I3dGgeFlV4F1vtjaacmyTTKYsglmcTwYann1Mp_nU-Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODQ2/NzM5MTEyL3Bob3Rv/L2F0LWNhci1zZXJ2/aWNlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1xUDdIOXNy/N2FtOVd3YTZCY2JT/dmQ0cnZEOU4yYzBM/OWhiNFY2aDVKc0Fn/PQ",
    },
    {
      title: "Pet Services",
      image:
        "https://imgs.search.brave.com/UjC0IFo_9q-tDcF1OauqirRLsucBJU9SNqR-03fFDjA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9qY3Bw/b3J0cmFpdHMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzA0L0dhbGxlcnkt/SW1hZ2UtMl8xMDgw/eDEwODAuanBn",
    },
  ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridColumns = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 3 : 2;

  const styles = {
    heroSection: {
      backgroundColor: "#ffffff",
      padding: "2rem 1rem",
      textAlign: "center",
    },
    heading: {
      fontSize: windowWidth >= 768 ? "3rem" : "1.875rem",
      fontWeight: 800,
      color: "#000000",
      marginBottom: "1rem",
    },
    paragraph: {
      fontSize: windowWidth >= 768 ? "1.125rem" : "1rem",
      color: "#4B5563",
      maxWidth: "40rem",
      margin: "0 auto 2rem",
    },
    button: {
      backgroundColor: "#1F2937",
      color: "#ffffff",
      padding: "0.75rem 1.5rem",
      borderRadius: "9999px",
      fontSize: windowWidth >= 768 ? "1rem" : "0.875rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
      margin: "0 auto",
      border: "none",
    },
    gridWrapper: {
      padding: "4rem 1rem",
      maxWidth: "72rem",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      gap: "1.5rem",
    },
    card: {
      position: "relative",
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      transition: "transform 0.3s",
    },
    imageWrapper: {
      width: "100%",
      aspectRatio: "4 / 3",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s",
    },
    titleOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "0.5rem",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: 600,
      textAlign: "center",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem 6rem",
    },
    logoImage: {
      width: "100%",
      height: "100%",
    },
  };

  return (
    <div>
      {/* Hero */}
      <div style={styles.heroSection}>
        <h1 style={styles.heading}>One platform, Endless possibilities</h1>
        <p style={styles.paragraph}>
          ZifyPay: All-in-one tools to boost sales, manage your calendar, retain
          clients, and accept payments — so you can focus on what matters most.
        </p>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#111827")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1F2937")}
        >
          Get started now <span style={{ fontSize: "1.25rem" }}>→</span>
        </button>
      </div>

      {/* Grid */}
      <div style={styles.gridWrapper}>
        <div style={styles.grid}>
          {categories.slice(0, 12).map((category, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseOver={(e) =>
                (e.currentTarget.firstChild.firstChild.style.transform =
                  "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.firstChild.firstChild.style.transform =
                  "scale(1)")
              }
            >
              <div style={styles.imageWrapper}>
                <img
                  src={category.image}
                  alt={category.title}
                  style={styles.image}
                />
              </div>
              <div style={styles.titleOverlay}>{category.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div style={styles.logoContainer}>
        <img
          src="https://res.cloudinary.com/dt07noodg/image/upload/v1747458847/logos_zmmrne.svg"
          alt="Logo"
          style={styles.logoImage}
        />
      </div>
    </div>
  );
};




const FeatureCards = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const features = [
  {
    title: "Manage",
    description:
      "Manage everything in one place with smart booking and analytics.",
    icon: "https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/3rd_ldxj9j.svg",
    gradient: "linear-gradient(to bottom right, #3418A5, #6C28C9)",
  },
  {
    title: "Grow",
    description: "Attract and retain clients on the top marketplace.",
    icon: "https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/2nd_notfsd.svg",
    gradient: "linear-gradient(to bottom right, #3B1FBB, #7F40D6)",
  },
  {
    title: "Get paid",
    description: "Get paid fast, reduce no-shows, and simplify checkout.",
    icon: "https://res.cloudinary.com/dt07noodg/image/upload/v1747460932/1st_r4i5rf.svg",
    gradient: "linear-gradient(to bottom right, #481FA5, #B940D6)",
  },
];
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    padding: "5rem 1rem",
    textAlign: "center",
    maxWidth: "80rem",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: isMobile ? "1.875rem" : "3rem",
    fontWeight: 800,
    marginBottom: "1rem",
  };

  const paragraphStyle = {
    color: "#4B5563",
    fontSize: isMobile ? "1rem" : "1.125rem",
    marginBottom: "3rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
    gap: "2rem",
    padding: "0 2rem",
  };

  const cardStyle = (gradient) => ({
    background: gradient,
    borderRadius: "1rem",
    padding: "1.5rem",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "360px",
    boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
    textAlign: "left",
  });

  const sectionContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "5rem 2rem",
    maxWidth: "80rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "6rem",
  };

  const rowStyle = (reverse = false) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : reverse ? "row-reverse" : "row",
    gap: "2.5rem",
    alignItems: "flex-start",
  });

  const textSectionStyle = {
    flex: 1,
    textAlign: "left",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "0.75rem",
  };

  const listStyle = {
    color: "#374151",
    marginTop: "1rem",
    paddingLeft: "1.25rem",
  };

  const listItemStyle = {
    marginBottom: "0.75rem",
    listStyleType: "'✔'",
    paddingLeft: "0.5rem",
  };

  return (
    <div>
      <div style={containerStyle}>
        <h2 style={headingStyle}>
          Everything you need to run your businesses
        </h2>
        <p style={paragraphStyle}>
          ZifyPay delivers smart features for smoother, faster service—for your
          team and your clients.
        </p>

        <div style={gridStyle}>
          {features.map((feature, index) => (
            <div key={index} style={cardStyle(feature.gradient)}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.75rem" }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: "0.875rem", marginBottom: "1.5rem" }}>{feature.description}</p>
              </div>
              <img
                src={feature.icon}
                alt={`${feature.title} icon`}
                style={{ width: "13rem", height: "13rem" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={sectionContainerStyle}>
        {/* Section 1 */}
        <div style={rowStyle(false)}>
          <div style={textSectionStyle}>
            <h2 style={{ fontSize: isMobile ? "1.875rem" : "2.25rem", fontWeight: "800", marginBottom: "1rem" }}>
              All-in-one software to run your business
            </h2>
            <p style={{ color: "#374151", marginBottom: "1rem" }}>
              The most loved and top-rated booking software trusted by
              businesses of all kinds.
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                Powerful calendar with unlimited bookings, clients, locations,
                and much more
              </li>
              <li style={listItemStyle}>
                Get a 360° client view with insights on bookings, preferences,
                payments, and more.
              </li>
              <li style={listItemStyle}>
                Crafted to deliver a smooth experience that enhances your
                business and elevates your brand
              </li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747460613/right_card_fb038s.png"
              alt="Business man"
              style={imageStyle}
            />
          </div>
        </div>

        {/* Section 2 */}
        <div style={rowStyle(true)}>
          <div style={textSectionStyle}>
            <h2 style={{ fontSize: isMobile ? "1.875rem" : "2.25rem", fontWeight: "800", marginBottom: "1rem" }}>
              The most popular marketplace to grow your business
            </h2>
            <p style={{ color: "#374151", marginBottom: "1rem" }}>
              Promote your business and reach new clients on the world’s largest
              beauty and wellness marketplace
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                Boost your visibility by listing on the ZifyPay marketplace.
              </li>
              <li style={listItemStyle}>
                Connect with millions of clients ready to book their next
                appointment.
              </li>
              <li style={listItemStyle}>
                Free up time and get your clients self-booking online 24/7
              </li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <img
              src="https://res.cloudinary.com/dt07noodg/image/upload/v1747460612/leftcard_oxb7h4.png"
              alt="Book appointment"
              style={imageStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



const BusinessLandingPage = () => {

  
  return (
    <div className="ml-10">
    {/* <Navbar /> */}
    <Header />

     <Hero />
      <FadeInSection>
        <ImageGrid />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <FeatureCards />
      </FadeInSection>
      <FadeInSection delay={0.2}>
        <BusinessStats />
      </FadeInSection>
      <FadeInSection delay={0.3}>
        <Bendo />
      </FadeInSection>
      <FadeInSection delay={0.4}>
        <Faq />
      </FadeInSection>
      <FadeInSection delay={0.5}>
        <CategoriesMarquee />
      </FadeInSection>
      <FadeInSection delay={0.6}>
        <Download />
      </FadeInSection>

      <Footer />
    </div>
  );
};

export default BusinessLandingPage;




