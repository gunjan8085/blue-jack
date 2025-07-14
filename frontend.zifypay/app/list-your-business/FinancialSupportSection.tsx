import React from "react";

const illustration =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop";

export const FinancialSupportSection: React.FC = () => {
  return (
    <section
      className="w-full px-4 md:px-24 py-10 md:py-20 flex flex-col md:flex-row items-center gap-12 bg-gradient-to-r from-[#001A39] to-[#001433] rounded-3xl my-16 relative overflow-hidden"
      style={{
        fontFamily:
          "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Decorative background shape */}
      <div className="z-0" />

      {/* Text Content */}
      <div className="flex-1 text-white z-10 text-center md:text-left">
        <span className="inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-1 rounded-full mb-4 text-sm tracking-wide shadow mx-auto md:mx-0">
          Small Business Support
        </span>

        <div className="flex flex-col items-center md:items-start gap-3 mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-center md:text-left">
            Empowering Small Businesses Financially
          </h2>
        </div>

        <p className="text-base md:text-lg mb-8 max-w-xl text-blue-100 mx-auto md:mx-0 text-center md:text-left">
          At Zifypay, we believe every small business deserves a chance to grow.
          That's why we offer fast settlements, affordable payment solutions,
          and access to financial tools that help you thrive—no matter your
          size.
        </p>

        <button className="block bg-blue-600 w-1/2 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base md:text-lg shadow transition  md:w-auto mx-auto md:mx-0">
          Learn More About Our Support
        </button>
        {/* Business Financing Solutions Table */}
        <div className="mt-12 w-full overflow-x-auto">
          <h3
            className="text-xl md:text-2xl font-bold mb-4 text-white text-center md:text-left"
            style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          >
            Business Financing Solutions by ZifyPay
          </h3>
          <table
            className="min-w-[900px] w-full border-collapse text-xs md:text-sm text-left bg-white/5 rounded-xl overflow-hidden"
            style={{ fontFamily: "'Proxima Nova', sans-serif" }}
          >
            <thead>
              <tr className="bg-blue-900/80 text-white">
                <th className="p-3 font-bold">Loan Type</th>
                <th className="p-3 font-bold">Use Case</th>
                <th className="p-3 font-bold">Qualifications</th>
                <th className="p-3 font-bold">Max Amount</th>
                <th className="p-3 font-bold">Funding Speed</th>
                <th className="p-3 font-bold">Top Industries</th>
              </tr>
            </thead>
            <tbody className="bg-white/10 text-white">
              <tr>
                <td className="p-3 font-semibold">Working Capital Loan</td>
                <td className="p-3">
                  Day-to-day operations, payroll, inventory
                </td>
                <td className="p-3">
                  4+ months in business, $10K+ monthly sales,{" "}
                  <b>No FICO minimum</b>
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">Same day</td>
                <td className="p-3">
                  Healthcare, Restaurants, Retail, Auto Repair
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Franchise Financing</td>
                <td className="p-3">
                  Purchase/run a franchise (fees, inventory, working capital)
                </td>
                <td className="p-3">
                  6+ months in business, $10K+ monthly sales,{" "}
                  <b>No FICO minimum</b>
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">In as little as 2 days</td>
                <td className="p-3">
                  Restaurants, Contracting, Professional Services
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Accounts Receivable Loan</td>
                <td className="p-3">
                  Cash from outstanding invoices (collateral or sale)
                </td>
                <td className="p-3">
                  $500K+ annual sales, <b>No FICO minimum</b>, Aging A/R,
                  Customer List
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">As little as 2 days</td>
                <td className="p-3">
                  Manufacturing, Staffing, Distribution, Logistics
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">SBA Loan</td>
                <td className="p-3">Business start/expansion (govt-backed)</td>
                <td className="p-3">
                  2+ years, $120K+ annual sales, <b>675+ FICO</b>, tax returns,
                  P&amp;L
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">24–48 hrs approval</td>
                <td className="p-3">
                  Construction, Hospitality, Retail, Healthcare
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Business Line of Credit</td>
                <td className="p-3">Revolving credit for flexible expenses</td>
                <td className="p-3">
                  6+ months, $10K+ sales, <b>600+ FICO</b>
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">Same day</td>
                <td className="p-3">
                  Retail, Healthcare, Manufacturing, Services
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Equipment Financing</td>
                <td className="p-3">
                  Buy tangible equipment (e.g., tech, furniture)
                </td>
                <td className="p-3">
                  No min. time/sales, <b>580+ credit</b>, equipment invoice
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">As little as 2 days</td>
                <td className="p-3">Healthcare, Auto Repair, Construction</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Fix &amp; Flip Loan</td>
                <td className="p-3">
                  Real estate purchase, renovation, resale
                </td>
                <td className="p-3">680+ credit, 3 flips in 36 months</td>
                <td className="p-3">Based on ARV</td>
                <td className="p-3">Fast (not specified)</td>
                <td className="p-3">
                  Single/Multi-family, Mixed Use (1–4 units)
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Commercial Real Estate</td>
                <td className="p-3">
                  Purchase/lease income-generating property
                </td>
                <td className="p-3">650+ FICO, property documentation</td>
                <td className="p-3">Not specified</td>
                <td className="p-3">Fast (not specified)</td>
                <td className="p-3">Warehouse, Office, Retail</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Small Business Loan</td>
                <td className="p-3">
                  General funding for small business needs
                </td>
                <td className="p-3">
                  4+ months, $10K+ sales, <b>660+ credit</b>
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">Same day</td>
                <td className="p-3">Retail, Healthcare, Construction</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Investment Property Loan</td>
                <td className="p-3">Buy income-generating properties</td>
                <td className="p-3">650+ FICO, $250K+ property value</td>
                <td className="p-3">Not specified</td>
                <td className="p-3">Pre-approval same day</td>
                <td className="p-3">Construction, Real Estate</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Cannabusiness Loan</td>
                <td className="p-3">Finance cannabis-related businesses</td>
                <td className="p-3">
                  6+ months, $500K+ annual sales, <b>No FICO</b>
                </td>
                <td className="p-3">Up to $5M</td>
                <td className="p-3">1–3 days</td>
                <td className="p-3">Cannabis industry (general)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Purchase Order Financing</td>
                <td className="p-3">
                  Fulfill large orders when cashflow is low
                </td>
                <td className="p-3">
                  No min. time/sales/FICO, requires PO copy
                </td>
                <td className="p-3">Not specified</td>
                <td className="p-3">Not specified</td>
                <td className="p-3">
                  Manufacturing, Wholesale, Retail, Import/Export
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Bridge Loan</td>
                <td className="p-3">
                  Immediate short-term funding for urgent needs
                </td>
                <td className="p-3">
                  6+ months, $10K+ sales, <b>No FICO</b>
                </td>
                <td className="p-3">Not specified</td>
                <td className="p-3">Same day</td>
                <td className="p-3">Construction, Retail, Healthcare</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Term Loan</td>
                <td className="p-3">
                  Fixed-term repayment for expansion/equipment
                </td>
                <td className="p-3">
                  2+ years, $10K+ sales, <b>660+ credit</b>
                </td>
                <td className="p-3">Not specified</td>
                <td className="p-3">1–3 days</td>
                <td className="p-3">Restaurants, Healthcare, Auto Repair</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex justify-center z-10 w-full mt-8 md:mt-0">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
          <img
            src={illustration}
            alt="Financial support for small business"
            className="rounded-2xl shadow-2xl object-cover w-full border-4 border-blue-100"
          />
          {/* Floating effect */}
          <div className="absolute -bottom-6 -right-6 w-16 h-16 md:w-24 md:h-24 bg-blue-500 opacity-30 rounded-full blur-2xl z-0" />
        </div>
      </div>
    </section>
  );
};

export default FinancialSupportSection;
