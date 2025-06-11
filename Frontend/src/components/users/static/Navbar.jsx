import React from "react";

const Navbar = ({ activeSection }) => {
  const sections = ["Photos", "Services", "Team", "Reviews", "About"];

  const handleSectionClick = (section) => {
    const sectionElement = document.getElementById(section.toLowerCase());
    console.log(sectionElement);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="tw-bg-white tw-shadow-md tw-py-4 tw-fixed tw-top-0 tw-w-full tw-z-50">
      <div className="tw-container tw-mx-auto tw-flex tw-justify-center tw-space-x-8">
        {sections.map((section) => (
          <button
            key={section}
            className={`tw-px-4 tw-py-2 tw-rounded-full ${
              activeSection === section
                ? "tw-bg-black tw-text-white"
                : "tw-text-gray-600 hover:tw-bg-gray-200"
            }`}
            onClick={() => handleSectionClick(section)}
          >
            {section}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
