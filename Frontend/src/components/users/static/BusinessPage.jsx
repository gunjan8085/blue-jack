import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";
import BusinessInfo from "./BusinessInfo";
import Services from "./Services";
import Team from "./Team";
import Reviews from "./Reviews";
import About from "./About";
import VenuesNearby from "./VenuesNearby";
import Header from "./Header";
import Photos from "./Photos";

const BusinessPage = () => {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("Photos");
  const sectionRefs = useRef({});

  // Register section refs
  const assignRef = (section) => (el) => {
    if (el) sectionRefs.current[section.toLowerCase()] = el;
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = document.getElementById("name-section").offsetHeight;
      setIsNavbarSticky(scrollY > threshold);

      // Determine which section is in view
      const sections = ["photos", "services", "team", "reviews", "about"];
      for (const section of sections) {
        const el = sectionRefs.current[section];
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (
            scrollY >= offsetTop - 100 &&
            scrollY < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(
              section.charAt(0).toUpperCase() + section.slice(1)
            );
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="tw-bg-white">
      <Header />
      <div id="name-section" className="tw-max-w-7xl tw-mx-auto">
        <Breadcrumb />
      </div>

      {isNavbarSticky && <Navbar activeSection={activeSection} />}

      <div className="tw-container tw-mx-auto tw-py-8 tw-space-y-8 tw-max-w-7xl">
        <BusinessInfo />
        <Photos ref={assignRef("photos")} />
        <Services ref={assignRef("services")} />
        <Team ref={assignRef("team")} />
        <Reviews ref={assignRef("reviews")} />
        <About ref={assignRef("about")} />
        <VenuesNearby />
      </div>
    </div>
  );
};
export default BusinessPage;
