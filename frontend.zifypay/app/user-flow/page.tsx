import Link from "next/link";

export default function SignUp() {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-br-4xl">
      {/* Left section */}
      <div className="w-full md:w-1/2 flex flex-col px-8 py-12">
        {/* Logo */}
        <div className="mt-4 mb-8">
          <img
            src="https://zifypay.com/logo.png"
            alt="ZifyPay Logo"
            className="h-10 w-auto"
          />
        </div>

        <h1 className="text-2xl font-bold mb-8 text-white">Sign up / Log in</h1>

        {/* Option 1 */}
        <Link href="/customer/auth/signup">
          <button className="w-full flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-4 mb-4 hover:shadow-md transition">
            <div>
              <p className="font-medium">Zifypay For customers</p>
              <p className="text-sm text-gray-600">
                Book salons and spas near you
              </p>
            </div>
            <span className="text-xl">→</span>
          </button>
        </Link>

        {/* Option 2 */}
        <Link href="/auth/signup">
          <button className="w-full flex justify-between items-center bg-white text-black border border-gray-300 rounded-lg p-4 hover:shadow-md transition">
            <div>
              <p className="font-medium">Fresha for professionals</p>
              <p className="text-sm text-gray-600">
                Manage and grow your business
              </p>
            </div>
            <span className="text-xl">→</span>
          </button>
        </Link>

        {/* Footer */}
        <div className="mt-auto text-sm text-gray-300 flex gap-4 pt-12">
          All rights reserved © 2024 ZifyPay
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
