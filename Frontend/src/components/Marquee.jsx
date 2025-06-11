// import React from "react";
import Marquee from "react-fast-marquee";

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
  import React, { useState, useEffect } from "react";
// import Marquee from "react-fast-marquee";

const CategoriesMarquee = () => {
  const firstHalf = categories.slice(0, 6);
  const secondHalf = categories.slice(6);

  const [isMD, setIsMD] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsMD(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    backgroundColor: "#ffffff",
    padding: "3rem 2rem",
    color: "#000000",
  };

  const headingStyle = {
    fontSize: isMD ? "3rem" : "1.875rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
  };

  const cardStyle = {
    position: "relative",
    width: isMD ? "14rem" : "11rem",
    height: isMD ? "13rem" : "10rem",
    borderRadius: "0.75rem",
    overflow: "hidden",
    margin: "0 1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    flexShrink: 0,
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const overlayStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#ffffff",
    fontSize: "0.875rem",
    fontWeight: 600,
    padding: "0.25rem 0.5rem",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>A platform suitable for all</h2>

      {/* First Marquee */}
      <Marquee pauseOnHover speed={50} gradient={false}>
        {firstHalf.map((category, index) => (
          <div key={index} style={cardStyle}>
            <img
              src={category.image}
              alt={category.title}
              style={imageStyle}
            />
            <div style={overlayStyle}>{category.title}</div>
          </div>
        ))}
      </Marquee>

      {/* Second Marquee */}
      <Marquee
        pauseOnHover
        speed={40}
        gradient={false}
        direction="right"
        style={{ marginTop: "2rem" }}
      >
        {secondHalf.map((category, index) => (
          <div key={index} style={cardStyle}>
            <img
              src={category.image}
              alt={category.title}
              style={imageStyle}
            />
            <div style={overlayStyle}>{category.title}</div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CategoriesMarquee;
