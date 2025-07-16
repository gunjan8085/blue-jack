"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "../../Navbar";
import { CheckCircle, ArrowRight, Gauge } from "lucide-react";
import ZifyLoanTable from "./ZifyLoanTable";
import Footer from "@/components/Footer";
import { useState } from "react";
import { API_URL } from "@/lib/const";

const HeroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const controls = useAnimation();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    mobile: "",
    industry: "",
    timeInBusiness: "",
    annualSales: "",
    product: "",
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

   const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch(`${API_URL}/loan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        phone: "",
        mobile: "",
        industry: "",
        timeInBusiness: "",
        annualSales: "",
        product: "",
        agreedToTerms: false,
      });
    } catch (err : any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 60 });
    }
  }, [inView, controls]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section
        ref={ref}
        className="bg-gradient-to-r from-[#001A39] to-[#001433] text-white min-h-[100vh] flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-20 py-12 md:py-16 relative overflow-hidden w-full"
      >
        {/* Text Glow Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-500 opacity-30 blur-3xl rounded-full z-0" />

        {/* Text Content */}
        <motion.div
          className="w-full md:max-w-2xl z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          style={{ fontFamily: "'Proxima Nova', sans-serif", fontWeight: 600 }}
          initial={{ opacity: 0, y: 60 }}
          animate={controls}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl leading-tight mt-12">
            Finance Solutions Built for Small Business Growth
          </h1>
          {/* <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl">
            Access the capital you need to expand, innovate, and thrive—quickly
            and easily.
          </p> */}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap justify-center md:justify-start">
            <Link href="#get-started">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md">
                Get Started
              </button>
            </Link>
            <Link href="#learn-more">
              <button className="border border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md">
                Learn More
              </button>
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6 w-full md:w-96">
            ZifyPay is a financial technology company, not a bank. Banking
            services are provided by regulated financial institutions.
          </p>
        </motion.div>

        {/* Image - hidden on small screens */}
        <img
          src="/loan.png"
          alt="Hero visual"
          className="hidden md:block w-full md:w-1/2 mt-8 md:mt-0"
        />

        {/* Decorative motion element (only on md and up) */}
        <motion.div
          className="hidden md:block absolute right-10 top-1/2 transform -translate-y-1/2 w-[450px]"
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        />
      </section>

      {/* Loan Application Section */}
      <section className="bg-gradient-to-r from-[#001A39] to-[#001433] py-16 px-4 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12 w-full">
        {/* Left: Features and Trust Badges */}
        <div
          className="flex-1 max-w-lg text-white flex flex-col justify-center items-start"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          >
            Small Business Loan
          </h2>
          <h3
            className="text-xl md:text-2xl font-medium mb-6"
            style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          >
            Online Application
          </h3>
          <ul className="mb-6 space-y-3">
            <li className="flex items-center gap-2 text-lg">
              <CheckCircle className="text-green-400 w-6 h-6" />{" "}
              <span style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
                Same Day Funding
              </span>
            </li>
            <li className="flex items-center gap-2 text-lg">
              <CheckCircle className="text-green-400 w-6 h-6" />{" "}
              <span style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
                $10,000 - $5 Million
              </span>
            </li>
            <li className="flex items-center gap-2 text-lg">
              <CheckCircle className="text-green-400 w-6 h-6" />{" "}
              <span style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
                6 Months to 10 Year Terms
              </span>
            </li>
          </ul>
          <div className="flex items-center gap-3 mb-4"></div>
        </div>
        {/* Right: Application Form */}
          <form
      onSubmit={handleSubmit}
      className="flex-1 max-w-xl bg-white/10 rounded-2xl p-8 shadow-lg backdrop-blur-md border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
    >
      <input
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name *"
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black placeholder-gray-500 outline-none"
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name *"
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black placeholder-gray-500 outline-none"
      />
      <input
        name="businessName"
        value={form.businessName}
        onChange={handleChange}
        placeholder="Business Name *"
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black placeholder-gray-500 outline-none md:col-span-2"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address *"
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black placeholder-gray-500 outline-none"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="+1 Business Phone *"
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black placeholder-gray-500 outline-none"
      />
      <input
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        placeholder="+1 Mobile Phone *"
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black placeholder-gray-500 outline-none"
      />
      <select
        name="industry"
        value={form.industry}
        onChange={handleChange}
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black outline-none"
      >
        <option value="" disabled>
          Industry*
        </option>
        <option>Retail</option>
        <option>Restaurant</option>
        <option>Healthcare</option>
        <option>Other</option>
      </select>
      <select
        name="timeInBusiness"
        value={form.timeInBusiness}
        onChange={handleChange}
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black outline-none"
      >
        <option value="" disabled>
          Time in Business*
        </option>
        <option>Less than 1 year</option>
        <option>1-2 years</option>
        <option>3-5 years</option>
        <option>5+ years</option>
      </select>
      <select
        name="annualSales"
        value={form.annualSales}
        onChange={handleChange}
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black outline-none"
      >
        <option value="" disabled>
          Annual Sales*
        </option>
        <option>Under $100K</option>
        <option>$100K-$500K</option>
        <option>$500K-$1M</option>
        <option>$1M+</option>
      </select>
      <select
        name="product"
        value={form.product}
        onChange={handleChange}
        required
        className="rounded-lg px-4 py-3 bg-white/80 text-black outline-none md:col-span-2"
      >
        <option value="" disabled>
          Product*
        </option>
        <option>Term Loan</option>
        <option>Line of Credit</option>
        <option>Equipment Financing</option>
        <option>Other</option>
      </select>
      <div className="md:col-span-2 flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="terms"
          name="agreedToTerms"
          checked={form.agreedToTerms}
          onChange={handleChange}
          required
          className="accent-blue-600 w-4 h-4"
        />
        <label htmlFor="terms" className="text-xs text-white">
          By checking this checkbox I agree to the terms of use, privacy policy
          as well as receiving SMS, email and phone communication.
        </label>
      </div>

      <button
        type="submit"
        className="md:col-span-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-full shadow-lg transition-all"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Apply Now"}
      </button>

      {submitted && (
        <p className="md:col-span-2 text-green-300 text-sm mt-2">
          ✅ Application submitted successfully!
        </p>
      )}
      {error && (
        <p className="md:col-span-2 text-red-400 text-sm mt-2">
          ❌ {error}
        </p>
      )}
    </form>
      </section>

      {/* Built to grow with you Feature Section */}
      <section
        className="w-full  min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-white"
        style={{ fontFamily: "'Proxima Nova', sans-serif" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#174ea6] text-center mb-4">
          Built to grow with you at every stage
        </h2>
        <p className="text-lg md:text-xl text-[#174ea6]/80 text-center mb-12 max-w-2xl">
          Whether you’re launching, scaling, or leading nationally, ZifyPay
          adapts to your needs with modern tools for modern businesses.
        </p>
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start text-left h-full">
            <h3 className="text-2xl font-bold text-[#174ea6] mb-3">
              Simple Application
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              Our simple 15 second online application can get you matched with
              offers in Minutes.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start text-left h-full">
            <h3 className="text-2xl font-bold text-[#174ea6] mb-3">
              No Minimum FICO
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              Bad Credit? No Problem! Most of our top financing options have no
              minimum FICO.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start text-left h-full">
            <h3 className="text-2xl font-bold text-[#174ea6] mb-3">
              Larger Amounts
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              Get matched with the best financing options with the Highest Offer
              $ Funding Amount.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start text-left h-full">
            <h3 className="text-2xl font-bold text-[#174ea6] mb-3">
              Same Day Funding
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              Our Fintech Speed can get you in and out of Underwriting in just a
              few hours, and same day funding!
            </p>
          </div>
        </div>
      </section>

      {/* Qualification Section */}

      <section className="w-full h-[600px] bg-gradient-to-r from-[#001A39] to-[#001433] flex justify-center items-center px-4 ">
        <div
          className="w-full max-w-7xl bg-white rounded-2xl shadow-lg flex flex-col items-center px-6 py-10"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center mb-10">
            What do you need to Qualify?
          </h2>

          <div className="w-full flex flex-col md:flex-row justify-center items-stretch text-black text-center divide-y md:divide-y-0 md:divide-x divide-black/20">
            {/* Block 1 */}
            <div className="flex-1 px-6 py-6">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                3+ Months in Business
              </h3>
              <p className="text-base md:text-lg">
                You can qualify for our top financing options with as little as
                3+ months in business.
              </p>
            </div>

            {/* Block 2 */}
            <div className="flex-1 px-6 py-6">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                $5K+ Monthly Gross Sales
              </h3>
              <p className="text-base md:text-lg">
                The minimum revenue to qualify for financing options is $5K per
                month, or $60K in annual gross sales.
              </p>
            </div>

            {/* Block 3 */}
            <div className="flex-1 px-6 py-6">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                No Minimum FICO
              </h3>
              <p className="text-base md:text-lg">
                We have financing options for all credit profiles. There is no
                minimum FICO score required to apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ZifyLoanTable />

      <section className="w-full  bg-gradient-to-r from-[#001A39] to-[#001433] flex justify-center items-center py-10 px-4">
        <div
          className="w-full max-w-7xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4"
          style={{ fontFamily: "'Proxima Nova', sans-serif" }}
        >
          {/* Left: Fintech Speed */}
          <div className="flex items-center gap-2">
            <Gauge className="text-black w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-600 leading-tight">
                Fintech
              </span>
              <span className="text-lg font-bold text-blue-600 leading-tight">
                Speed
              </span>
            </div>
          </div>

          {/* Center: Message */}
          <div className="flex-1 text-center text-black text-base md:text-lg font-medium">
            Easy 15-second application to get options in just minutes and
            funding in hours!
            <ArrowRight className="inline-block ml-2 text-blue-500 align-middle w-6 h-6" />
          </div>

          {/* Right: Apply Now Button */}
          <a href="#loan-application" className="flex-shrink-0 ">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg md:text-xl px-8 py-3 rounded-full transition-all">
              Apply Now
            </button>
          </a>
        </div>
      </section>

      {/* Advisor Call-to-Action Section */}
      <section
        className="w-full min-h-screen bg-white flex flex-col md:flex-row items-center justify-center py-16 px-4"
        style={{ fontFamily: "'Proxima Nova', sans-serif" }}
      >
        {/* Left: Text Content */}
        <div className="flex-1 max-w-xl px-6 md:px-16 flex flex-col justify-center items-start mb-10 md:mb-0 md:mr-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#174ea6]">
            Have Questions?
          </h2>
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-[#174ea6]">
            Speak with a Business Financing Advisor today!
          </h3>
          <p className="text-base md:text-lg mb-8 text-[#174ea6]">
            Our Business Financing Advisors will help you find the best
            financing options for your business to get you more funding, great
            terms, and the lowest interest. We're available to explain every
            step of the process from applications to your re-payment schedule!
          </p>
          <button className="bg-[#001433] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-[#00254d] transition-all">
            Speak With An Advisor
          </button>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center items-center">
          {/* Use Next.js Image component with a valid src, width, and height */}
          <Image
            src="/vv.png"
            alt="Advisor Illustration"
            width={400}
            height={300}
            className="w-full max-w-md h-auto"
            priority
            unoptimized
            onError={(e) => {
              e.currentTarget.src = "/placeholder-advisor.png";
            }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HeroSection;
