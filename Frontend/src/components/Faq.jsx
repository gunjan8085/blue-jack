import React, { useState  ,useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Lucide icons

const faqData = [
  {
    question:
      "What makes ZifyPay the leading platform for businesses in beauty and wellness?",
    answer:
      "We’re the world’s largest booking platform for beauty and wellness, trusted by over 120,000 businesses for their operations Businesses choose us because of our powerful, easy-to-use features, including online booking, payment processing, marketing tools, and team management. Our automation simplifies daily tasks, saves time, and enhances efficiency, so you can focus on what matters most With our global marketplace, we connect your business to millions of potential customers, providing unmatched opportunities for growth, making us the number one platform in beauty and wellness.",
  },
  {
    question: "How does ZifyPay help my business grow?",
    answer:
      "We help your business grow by providing powerful tools to attract new clients, retain existing ones, and streamline your operations. With our global marketplace, you can reach millions of potential customers searching for beauty and wellness services. Marketing tools like automated campaigns, client referrals, and promotional discounts boost bookings, while features like online booking, online payment processing, inventory management, and team scheduling simplify daily tasks. Additionally, real-time analytics enable you to track performance and optimize your business strategies. By automating time-consuming processes and connecting you with more clients, we empower your business to thrive.",
  },
  {
    question: "Are there any hidden costs?",
    answer:
      "We don’t charge any hidden costs. Powerful features are included in our core offering, and we offer optional add-ons, such as online payment processing and marketing tools, where you only pay for what you use. We’re transparent about our pricing, with all details clearly outlined on our pricing page.",
  },
  {
    question: "Is there a minimum commitment or contract?",
    answer:
      "We’re free to use for independent professionals For businesses with multiple bookable team members, we offer a flexible monthly subscription model that you can cancel at any time. Plus, businesses with teams can take advantage of a 14-day free trial—no credit card required—to explore the system and see if it’s the right fit.",
  },
  {
    question: "Does ZifyPay support businesses of all sizes?",
    answer:
      "Yes, we’re designed to support businesses of all sizes, from independent professionals to larger teams and enterprise businesses with multiple locations. Whether you’re a solo entrepreneur or managing a growing team, we offer flexible tools and features to suit your needs, including calendar management, marketing tools, and team-specific functionalities.",
  },
  {
    question: "What types of businesses can use ZifyPay?",
    answer:
      "We’re designed for a wide range of businesses in the beauty, wellness, and healthcare industries. ZifyPay is specifically designed for hair salons, spas, nail salons, barbershops, medspas, and massage therapists can all use us to manage bookings, client information, and payments. It’s also a great tool for fitness studios, physical therapy clinics, health practices, tattoo and piercing artists, and tanning studios, offering easy scheduling, streamlined operations, and marketing features tailored to each business type. We also have a growing number of partners using ZifyPay to manage their pet grooming businesses. Whether you're a solo practitioner or part of a larger team, we provide the tools you need to efficiently run your business.",
  },
  {
    question: "How can ZifyPay help reduce no-shows?",
    answer:
      "We help reduce no-shows by offering several key features designed to improve client engagement and accountability. First, we send automated booking reminders via email and text, which helps keep appointments top of mind for your clients. Additionally, we allow businesses to implement a flexible cancellation policy, including setting up deposit or prepayment options, which can encourage clients to honor their bookings. The platform also provides easy rescheduling, which can help clients manage changes without canceling altogether. Together, these features help minimize no-shows and improve client commitment to appointments.",
  },
  {
    question: "Can I migrate my data from my previous system to ZifyPay?",
    answer:
      "Yes, you can migrate data from your old system to ZifyPay. We support importing key information, such as client details and product inventory. For larger partners with more complex needs, we also offer paid packages that provide additional data migration support.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMD, setIsMD] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsMD(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const containerStyle = {
    maxWidth: "80rem",
    margin: "0 auto",
    padding: "3rem 1.5rem",
  };

  const introSection = {
    backgroundColor: "#ffffff",
    padding: "3rem 0",
    color: "#000000",
  };

  const introHeading = {
    fontSize: isMD ? "3rem" : "1.875rem",
    fontWeight: "bold",
    lineHeight: 1.3,
    marginBottom: "2.5rem",
  };

  const cardsGrid = {
    display: "grid",
    gridTemplateColumns: isMD ? "1fr 1fr" : "1fr",
    gap: "1.5rem",
  };

  const card = {
    border: "1px solid #D1D5DB", // gray-300
    borderRadius: "0.5rem",
    padding: "1.5rem",
    backgroundColor: "#ffffff",
  };

  const cardTitle = {
    fontWeight: 600,
    fontSize: "1.125rem",
    marginBottom: "0.5rem",
  };

  const cardText = {
    fontSize: "0.875rem",
    color: "#4B5563", // gray-600
    marginBottom: "1rem",
  };

  const cardLink = {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#000000",
    textDecoration: "none",
  };

  const faqTitle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    borderBottom: "1px dotted #D1D5DB",
    paddingBottom: "1rem",
  };

  const faqWrapper = {
    borderRadius: "0.375rem",
    overflow: "hidden",
    borderTop: "1px solid #D1D5DB",
    borderBottom: "1px solid #D1D5DB",
  };

  const faqItem = {
    backgroundColor: "#ffffff",
  };

  const faqButton = {
    width: "100%",
    textAlign: "left",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "none",
    background: "none",
    cursor: "pointer",
    outline: "none",
  };

  const faqQuestion = {
    fontWeight: 500,
  };

  const faqAnswer = {
    padding: "0 1rem 1rem",
    color: "#4B5563",
    fontSize: "0.875rem",
  };

  return (
    <div style={containerStyle}>
      <div style={introSection}>
        <h2 style={introHeading}>
          You are never alone,
          <br />
          <span>award winning customer support 24/7</span>
        </h2>

        <div style={cardsGrid}>
          <div style={card}>
            <h3 style={cardTitle}>Help Center</h3>
            <p style={cardText}>
              Explore and learn with our help center knowledge base.
            </p>
            <a href="#" style={cardLink}>
              Go to help center →
            </a>
          </div>

          <div style={card}>
            <h3 style={cardTitle}>Contact us</h3>
            <p style={cardText}>
              Contact us via email and phone and one of our team will be there
              to help.
            </p>
            <a href="#" style={cardLink}>
              Go to help center →
            </a>
          </div>
        </div>
      </div>

      <h2 style={faqTitle}>Frequently asked questions</h2>

      <div style={faqWrapper}>
        {faqData.map((item, index) => (
          <div key={index} style={faqItem}>
            <button
              onClick={() => toggleIndex(index)}
              style={faqButton}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#F9FAFB")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ffffff")
              }
            >
              <span style={faqQuestion}>{item.question}</span>
              {activeIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {activeIndex === index && (
              <div style={faqAnswer}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;