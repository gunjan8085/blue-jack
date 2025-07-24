import { useEffect } from "react";

const TrustpilotWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6864370c366d801e3d9bece9"
      data-style-height="52px"
      data-style-width="100%"
    >
      <a
        href="https://www.trustpilot.com/review/lodgezify.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustpilotWidget;
