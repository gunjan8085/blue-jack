"use client"
import Image from 'next/image';
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

const problems = [
  {
    title: "High Payment Processing Fees",
    pain: "Gas stations lose thousands monthly to credit card fees, especially with slim fuel margins.",
    solution: "Our zero-fee payment processing eliminates transaction fees while maintaining full compliance and security.",
    icon: "/icons/payment.svg"
  },
  {
    title: "Complex Inventory Management",
    pain: "Managing fuel and C-store inventory separately leads to reconciliation headaches and stock issues.",
    solution: "Unified inventory system connects fuel tanks and store items in one dashboard with real-time updates.",
    icon: "/icons/inventory.svg"
  },
  {
    title: "Outdated Technology",
    pain: "Legacy systems are slow, prone to errors, and lack modern features needed to compete.",
    solution: "Cloud-based modern POS with intuitive interface, fast processing, and automatic updates.",
    icon: "/icons/tech.svg"
  },
  {
    title: "Staff Management",
    pain: "Tracking employee hours, shifts, and performance across fuel and retail operations is time-consuming.",
    solution: "Built-in time clock, role-based access, and performance tracking streamline staff management.",
    icon: "/icons/staff.svg"
  },
  {
    title: "Compliance & Reporting",
    pain: "Meeting regulatory requirements and generating accurate reports is complex and error-prone.",
    solution: "Automated compliance checks and one-click reporting for taxes, sales, and regulatory requirements.",
    icon: "/icons/compliance.svg"
  },
  {
    title: "Customer Experience",
    pain: "Poor integration between pumps and store leads to slow service and frustrated customers.",
    solution: "Seamless integration enables fast transactions, loyalty programs, and modern payment options.",
    icon: "/icons/customer.svg"
  }
];

export default function Problems() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Common Challenges in Fuel Retail
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Discover how ZifyPay transforms common fuel station and C-store pain points 
            into opportunities for growth and efficiency.
          </p>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 mb-6 relative">
                  <Image
                    src={problem.icon}
                    alt={problem.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {problem.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-red-600 font-medium mb-2">The Challenge:</h4>
                    <p className="text-gray-600">{problem.pain}</p>
                  </div>
                  <div>
                    <h4 className="text-green-600 font-medium mb-2">Our Solution:</h4>
                    <p className="text-gray-600">{problem.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Calculate Your Potential Savings
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              See how much you could save by switching to ZifyPay's zero-fee 
              payment processing and integrated POS system.
            </p>
            <a
              href="/calculator"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Open ROI Calculator
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 relative rounded-full overflow-hidden">
                <Image
                  src="/testimonials/owner1.jpg"
                  alt="Station Owner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <blockquote className="text-xl text-gray-700 mb-4">
                  "We were losing over $5,000 monthly in credit card fees. 
                  ZifyPay eliminated those fees completely while giving us a 
                  modern POS that's actually easier to use. The ROI was immediate."
                </blockquote>
                <cite className="block">
                  <span className="font-semibold text-gray-900">Mike Johnson</span>
                  <span className="text-gray-600 block">
                    Owner, Johnson's Fuel & Market, TX
                  </span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
