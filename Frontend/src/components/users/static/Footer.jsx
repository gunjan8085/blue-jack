import React from "react";

const Footer = () => {
  return (
    <footer className="tw-bg-gray-800 tw-text-white tw-pt-10 tw-pb-6">
      <div className="tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-6 tw-px-6 tw-text-white">
        {/* About */}
        <div className="tw-mx-2">
          <h4 className="tw-font-semibold tw-mb-4 tw-text-white">About</h4>
          <p className="tw-text-sm">
            Blue Jack is dedicated to providing top-tier home cleaning services
            with a focus on quality, reliability, and customer satisfaction. Our
            team of experienced cleaners uses eco-friendly products and advanced
            techniques to ensure your home is spotless and safe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="tw-font-semibold tw-mb-4 tw-text-white">
            Quick Links
          </h6>
          <ul className="tw-space-y-2">
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                For Business
              </a>
            </li>
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="tw-font-semibold tw-mb-4 tw-text-white">Legal</h6>
          <ul className="tw-space-y-2">
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h6 className="tw-font-semibold tw-mb-4 tw-text-white">Follow Us</h6>
          <ul className="tw-space-y-2">
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="tw-text-gray-300 hover:tw-text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tw-text-center tw-mt-8 tw-text-sm">
        © Blue jack. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
