import Link from "next/link";

export default function SignUp() {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-br-4xl">
      {/* Left section */}
      <div className="w-full md:w-1/2 flex flex-col px-8 py-12 relative">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute ml-5 mt-5 top-4 left-4 text-white hover:underline text-sm"
        >
          ← Back
        </Link>

        {/* Logo */}
        <div className="mt-10 mb-8">
          <Link href="/">
            <img
              src="/logo.png"
              alt="ZifyPay Logo"
              className="h-10 w-auto cursor-pointer"
            />
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-white">Sign up / Log in</h1>

        {/* Option 1 - Customers */}
        <Link href="/customer/auth/login">
          <button className="w-full flex justify-between items-center bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-xl p-4 mb-4 hover:bg-white/20 hover:scale-[1.02] transition-all">
            <div>
              <p className="font-medium">ZifyPay for Customers</p>
              <p className="text-sm text-gray-300">
                Book salons and spas near you
              </p>
            </div>
            <span className="text-xl">→</span>
          </button>
        </Link>

        {/* Option 2 - Professionals */}
        <Link href="/auth/login">
          <button className="w-full flex justify-between items-center bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-xl p-4 hover:bg-white/20 hover:scale-[1.02] transition-all">
            <div>
              <p className="font-medium">ZifyPay for Business</p>
              <p className="text-sm text-gray-300">
                Manage and grow your business
              </p>
            </div>
            <span className="text-xl">→</span>
          </button>
        </Link>

        {/* Footer */}
        <div className="mt-auto text-sm text-gray-300 flex gap-4 pt-12">
          All rights reserved © 2025 ZifyPay
        </div>
      </div>

      {/* Right section */}
      <div className="hidden md:block w-full md:w-1/2">
        <img
          src="/happy.jpg"
          alt="Happy customer"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
