import React from 'react';
import Head from 'next/head';

const ZifypayPage = () => {
  return (
    <>
      <Head>
        <title>Zifypay - Point of Sale Solutions</title>
        <meta name="description" content="General store point of sale solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold">Zifypay</div>
                <div className="hidden md:flex space-x-6">
                  <div className="relative group">
                    <button className="flex items-center space-x-1 hover:text-blue-400">
                      <span>Solutions</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative group">
                    <button className="flex items-center space-x-1 hover:text-blue-400">
                      <span>Products we serve</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative group">
                    <button className="flex items-center space-x-1 hover:text-blue-400">
                      <span>Customers</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <a href="#" className="hover:text-blue-400">Pricing</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                  Request a demo
                </button>
                <button className="border border-gray-600 hover:border-gray-400 px-4 py-2 rounded text-sm">
                  Build a Price
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  General store<br />
                  point of sale
                </h1>
                <p className="text-gray-600 text-lg mb-8 max-w-md">
                  Zifypay systems are perfectly suited for individuals and commercials POS for selling goods at superstores.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                    Request a demo
                  </button>
                  <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg">
                    Build a Price
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                {/* POS System Image Placeholder */}
                <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">POS System Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How IT Retail helps Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  How IT Retail helps<br />
                  your store
                </h2>
                <p className="text-gray-600 mb-6">
                  A typical general store carries 5,000+ products across multiple categories. Our POS system manages complex inventory and product catalog, department, maintain the right stock levels, and serve customers faster — all while giving you the critical insights you need to grow your business.
                </p>
              </div>
              <div className="lg:w-1/2">
                {/* Store Image Placeholder */}
                <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Store Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Take it anywhere Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Take it anywhere</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Keep track of your store wherever you go. All of your data is securely backed up to the cloud so that you can see sales, inventory, employee performance, and more from anywhere. So, you can use any device like your laptop, tablet, or phone to check in.
            </p>
            
            {/* Global Commerce Image Placeholder */}
            <div className="w-full h-64 bg-blue-500 rounded-lg flex items-center justify-center mb-8">
              <span className="text-blue-200">Global Commerce Image</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Keep checkout convenient
              </h3>
              <p className="text-center text-gray-600 mb-12">
                IT Retail supports the fastest 1D payment technology, including Apple Pay, Google Pay, IC, 
                Second EMV, EBT, and swipe. The faster your customers can check out, the happier they'll be.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600">💳</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">New payment tech</h4>
                  <p className="text-gray-600 text-sm">
                    Full support for Apple Pay, Google Pay, EMV, and more. 
                    Add to the mix QR, credit transactions even when offline internet is down.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600">🛒</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sell age-restricted items</h4>
                  <p className="text-gray-600 text-sm">
                    Sell almost cigarettes and other restricted items. Let the 
                    cashiers check by the bar by enforcing the date of birth to be 
                    confirmed by manager app and a very age-out limit.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Always fast</h4>
                  <p className="text-gray-600 text-sm">
                    We understand that checkout lines need to be fast and 
                    check out customers at lightning speed. That's what we did.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  Talk with an expert
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Inventory Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                {/* Inventory Management Image Placeholder */}
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Inventory Management Image</span>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Inventory made easy
                </h2>
                <p className="text-gray-600">
                  Keeping track of your products is essential for maximizing profits. Our general store inventory management solution makes it easy to keep track of a diverse inventory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manage Employees Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Manage employees
                </h2>
                <p className="text-gray-600">
                  We know keeping track of employees is difficult, especially when your store is always open. Our personal store planning system combines inventory management and employee performance to provide intelligent insights on every transaction.
                </p>
              </div>
              <div className="lg:w-1/2">
                {/* Employee Management Image Placeholder */}
                <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Employee Management Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* We Work Hard Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  {/* Team Image Placeholder */}
                  <div className="w-full h-80 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-blue-200">Team Working Image</span>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-8 text-center lg:text-left">
                  <h2 className="text-3xl font-bold mb-6">We work hard, just like you</h2>
                  <p className="text-blue-100 mb-8">
                    IT Retail is built and supported by the team at IT Retail. We spend 1000's of hours every month working to deliver better solutions for our customers every day. We are always available to help you with practical, that fit the scene and problems.
                  </p>
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                    Get a quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="mb-8 lg:mb-0">
                <div className="text-2xl font-bold mb-6">Zifypay</div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links:</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-blue-200 hover:text-white">Features</a></li>
                    <li><a href="#" className="text-blue-200 hover:text-white">Pricing</a></li>
                    <li><a href="#" className="text-blue-200 hover:text-white">Contact</a></li>
                    <li><a href="#" className="text-blue-200 hover:text-white">Blog</a></li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact Info:</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span className="text-blue-200">+91-91043-XXXX</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✉️</span>
                    <span className="text-blue-200">support@zifypay.com</span>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs">in</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs">ig</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs">wa</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs">tw</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs">fb</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ZifypayPage;