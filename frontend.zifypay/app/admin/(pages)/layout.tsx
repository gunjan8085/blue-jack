"use client";
import React, { useState } from 'react';
import { Briefcase, Users, LogOut, CreditCard, Building2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('jobs');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Dark Mode Sidebar */}
      <div className="w-64 bg-gray-900 text-gray-100 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-700 flex items-center space-x-2">
          <Image
            src="https://zifypay.com/logo.png"
            alt="ZifyPay Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold">Admin</span>
        </div>

        <nav className="flex-1 mt-6 px-2 space-y-1">
          <Link href="/admin/job-management">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-800 ${activeTab === 'jobs' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
                }`}
            >
              <Briefcase className="w-5 h-5 mr-3" />
              Job Management
            </button>
          </Link>

          {/* Business Link */}
          <Link href="/admin/business">
            <button
              onClick={() => setActiveTab('business')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-800 ${activeTab === 'business' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
                }`}
            >
              <Building2 className="w-5 h-5 mr-3" />
              Business
            </button></Link>

          <Link href="/admin/applications">
            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-800 ${activeTab === 'applications' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
                }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Applications
            </button></Link>
            
          <Link href="/admin/loan-applications">
          <button
            onClick={() => setActiveTab('Loan Applications')}
            className={`w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-800 ${activeTab === 'applications' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
              }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Loan Applications
          </button></Link>

          <Link href="/admin/transactions">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-800 ${activeTab === 'transactions' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
                }`}
            >
              <CreditCard className="w-5 h-5 mr-3" />
              Transactions
            </button></Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;