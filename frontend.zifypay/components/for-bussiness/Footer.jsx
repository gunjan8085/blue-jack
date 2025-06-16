import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isMD, setIsMD] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsMD(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const footerStyle = {
    backgroundColor: "#434A66",
    color: "white",
    padding: "3rem 1.5rem",
    fontSize: "0.875rem", // text-sm
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMD ? "repeat(4, 1fr)" : "1fr",
    gap: "2.5rem",
  };

  const headingStyle = {
    fontSize: "1.125rem", // text-lg
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const paraStyle = {
    color: "#D1D5DB", // Tailwind's gray-300
    lineHeight: 1.6,
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#E5E7EB", // gray-200
  };

  const listItemStyle = {
    marginBottom: "0.5rem",
  };

  const linkStyle = {
    color: "#E5E7EB",
    textDecoration: "none",
  };

  const underlineHover = {
    textDecoration: "underline",
  };

  return (
    <footer style={footerStyle}>
      <div style={gridStyle}>
        {/* Company Description */}
        <div>
          <h4 style={headingStyle}>About Clean Sweep</h4>
          <p style={paraStyle}>
            Clean Sweep provides premium home cleaning services with a
            commitment to quality, eco-friendliness, and customer satisfaction.
            Our trained professionals ensure a spotless and safe home every
            time.
          </p>
        </div>

        {/* Support */}
        <div>
          <h4 style={headingStyle}>Support</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              Email:{" "}
              <a
                href="mailto:technology@lodgezify.com"
                style={{ ...linkStyle, textDecoration: "underline" }}
              >
                technology@lodgezify.com
              </a>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 style={headingStyle}>Solutions</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <a
                href="https://lodgezify.com/business/solutions/hotels"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Hotels
              </a>
            </li>
            <li style={listItemStyle}></li>
            <li style={listItemStyle}>
              <a
                href="https://lodgezify.com/business/solutions/experimental-stays"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Experimental Stays
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="https://lodgezify.com/business/solutions/groups"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Groups
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="https://lodgezify.com/business/solutions/vacation-rentals"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Vacation Rentals
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 style={headingStyle}>Follow Us</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <a
                href="#"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Facebook
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="#"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Twitter
              </a>
            </li>
            <li style={listItemStyle}>
              <a
                href="#"
                style={linkStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Optional Footer Bottom */}
      {/* <div style={{ marginTop: "2.5rem", textAlign: "center", fontSize: "0.75rem", color: "#9CA3AF" }}>
        © {new Date().getFullYear()} <strong>Clean Sweep</strong>. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
