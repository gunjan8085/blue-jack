import React from "react";

const FooterSection = () => (
  <footer className="bg-[#0a1d36] text-white/80 py-8 text-center text-sm">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>© {new Date().getFullYear()} ZifyPay. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="#" className="hover:underline">
          Terms and Conditions
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="mailto:contact@zifypay.com" className="hover:underline">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
