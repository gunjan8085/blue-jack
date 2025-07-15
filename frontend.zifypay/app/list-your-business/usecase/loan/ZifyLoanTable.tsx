"use client";
import React from "react";

const loanData = [
  {
    loanType: "Working Capital Loan",
    useCase: "Daily operations, payroll, inventory",
    requirements: "4+ months in business, $10K+ monthly sales, No FICO",
    maxAmount: "$5M",
    speed: "Same Day",
    industries: "Healthcare, Restaurants, Retail, Auto Repair",
  },
  {
    loanType: "Franchise Financing",
    useCase: "Purchase/run a franchise",
    requirements: "6+ months in business, $10K+ monthly sales, No FICO",
    maxAmount: "$5M",
    speed: "2 Days",
    industries: "Restaurants, Construction, Retail, Services",
  },
  {
    loanType: "Accounts Receivable Loan",
    useCase: "Cash from outstanding invoices",
    requirements: "$500K+ annual sales, No FICO, Aging A/R report",
    maxAmount: "$5M",
    speed: "2 Days",
    industries: "Manufacturing, Staffing, Logistics",
  },
  {
    loanType: "SBA Loan",
    useCase: "Business start/expansion",
    requirements: "2+ years, $120K+ annual sales, 675+ FICO",
    maxAmount: "$5M",
    speed: "24–48 Hours",
    industries: "Construction, Hospitality, Retail, Healthcare",
  },
  {
    loanType: "Business Line of Credit",
    useCase: "Revolving credit for expenses",
    requirements: "6+ months in business, $10K+ sales, 600+ FICO",
    maxAmount: "$5M",
    speed: "Same Day",
    industries: "Retail, Healthcare, Manufacturing",
  },
  {
    loanType: "Equipment Financing",
    useCase: "Buy equipment, tech, furniture",
    requirements: "580+ credit, invoice or quote",
    maxAmount: "$5M",
    speed: "2 Days",
    industries: "Healthcare, Construction, Auto Repair",
  },
  {
    loanType: "Fix & Flip Loan",
    useCase: "Buy, renovate, resell real estate",
    requirements: "680+ credit, 3 successful flips",
    maxAmount: "Based on ARV",
    speed: "Fast",
    industries: "Real Estate (1–4 unit homes)",
  },
  {
    loanType: "Commercial Real Estate",
    useCase: "Buy/lease income property",
    requirements: "650+ FICO, property documentation",
    maxAmount: "Not specified",
    speed: "Fast",
    industries: "Warehouse, Office, Retail",
  },
  {
    loanType: "Small Business Loan",
    useCase: "General business needs",
    requirements: "4+ months, $10K+ sales, 660+ credit",
    maxAmount: "$5M",
    speed: "Same Day",
    industries: "Retail, Healthcare, Construction",
  },
  {
    loanType: "Investment Property Loan",
    useCase: "Buy income-generating properties",
    requirements: "650+ FICO, $250K+ property value",
    maxAmount: "Not specified",
    speed: "Same Day Pre-Approval",
    industries: "Construction, Real Estate",
  },
  {
    loanType: "Cannabusiness Loan",
    useCase: "Finance cannabis businesses",
    requirements: "6+ months, $500K+ annual sales, No FICO",
    maxAmount: "$5M",
    speed: "1–3 Days",
    industries: "Cannabis industry",
  },
  {
    loanType: "Purchase Order Financing",
    useCase: "Fulfill large purchase orders",
    requirements: "Copy of PO, No FICO",
    maxAmount: "Not specified",
    speed: "Not specified",
    industries: "Manufacturing, Wholesale, Retail",
  },
  {
    loanType: "Bridge Loan",
    useCase: "Immediate short-term funding",
    requirements: "6+ months, $10K+ sales, No FICO",
    maxAmount: "Not specified",
    speed: "Same Day",
    industries: "Construction, Retail, Healthcare",
  },
  {
    loanType: "Term Loan",
    useCase: "Fixed-term business expansion",
    requirements: "2+ years, $10K+ sales, 660+ credit",
    maxAmount: "Not specified",
    speed: "1–3 Days",
    industries: "Restaurants, Healthcare, Construction",
  },
];

const ZifyLoanTable = () => {
  return (
    <section
      className="bg-gradient-to-r from-[#001A39] to-[#001433] py-16 px-4 md:px-12"
      style={{ fontFamily: "'Proxima Nova', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">
          ZifyPay Business Loan Options
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90">
          <table className="w-full text-sm text-left bg-white text-gray-900 rounded-2xl overflow-hidden">
            <thead className="bg-blue-900 text-white text-sm md:text-base sticky top-0 z-10">
              <tr>
                <th className="p-4 font-bold">Loan Type</th>
                <th className="p-4 font-bold">Use Case</th>
                <th className="p-4 font-bold">Requirements</th>
                <th className="p-4 font-bold">Max Amount</th>
                <th className="p-4 font-bold">Funding Speed</th>
                <th className="p-4 font-bold">Top Industries</th>
              </tr>
            </thead>
            <tbody>
              {loanData.map((loan, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                  } hover:bg-blue-100/70`}
                >
                  <td className="p-4 font-semibold text-[#001A39]">
                    {loan.loanType}
                  </td>
                  <td className="p-4">{loan.useCase}</td>
                  <td className="p-4">{loan.requirements}</td>
                  <td className="p-4 font-semibold">{loan.maxAmount}</td>
                  <td className="p-4">{loan.speed}</td>
                  <td className="p-4">{loan.industries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ZifyLoanTable;
