"use client"
import React from 'react';
import Navbar from '@/components/landingPage/Navbar';
import Footer from '@/components/Footer';

// Solution content configuration
const solutionsContent = {
  hero: {
    title: "Comprehensive Payment Solutions",
    subtitle: "Seamlessly integrate payments across your entire business operations"
  },
  solutions: [
    {
      title: "Fuel Pump Integration",
      description: "Take control of your forecourt with real-time pump management. Compatible with major brands like Gilbarco and Wayne, our system gives you complete oversight and control.",
      features: [
        "Direct pump control from POS interface",
        "Real-time transaction logging",
        "Automated tax calculation and reporting",
        "Inventory tracking integration"
      ]
    },
    {
      title: "Zero-Fee Payment Processing",
      description: "Save thousands monthly with our revolutionary 0% transaction fee payment processing. Built for high-volume fuel and retail operations.",
      features: [
        "Zero transaction fees, guaranteed",
        "Same-day settlement",
        "Multiple payment method support",
        "Built-in fraud protection"
      ]
    },
    {
      title: "Smart POS System",
      description: "A modern, dual-screen point of sale system designed specifically for fuel stations and convenience stores.",
      features: [
        "Touch-optimized interface",
        "Customer-facing display",
        "Inventory management",
        "Employee tracking"
      ]
    }
  ]
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {solutionsContent.hero.title}
          </h1>
          <p className="text-xl text-gray-600">
            {solutionsContent.hero.subtitle}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {solutionsContent.solutions.map((solution, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {solution.description}
              </p>
              <ul className="space-y-3">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg 
                      className="w-5 h-5 text-green-500 mr-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
