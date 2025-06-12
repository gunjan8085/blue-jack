'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getuserid, setAuthToken, setUserData, checkBusinessProfile } from '../../../lib/auth';
import { API_URL } from '../../../lib/const';

interface UserData {
  _id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface LoginResponse {
  data: {
    token: string;
    employee: UserData;
  };
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/employee/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData: LoginResponse = await response.json();
      console.log('API Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      // Check if the response has the expected structure
      if (!responseData.data || !responseData.data.token || !responseData.data.employee) {
        console.error('Invalid response structure:', responseData);
        throw new Error('Invalid response format');
      }

      // Store authentication data
      console.log('Storing token:', responseData.data.token);
      setAuthToken(responseData.data.token);
      
      // Store user data including ID
      const userData = responseData.data.employee;
      console.log('Storing user data:', userData);
      setUserData(userData);

      // Check if business profile exists
      const businessProfile = await checkBusinessProfile(userData._id);
      
      if (!businessProfile) {
        // Redirect to business creation page if no profile exists
        window.location.href = '/business/create';
      } else {
        // Store business profile data
        localStorage.setItem('businessProfile', JSON.stringify(businessProfile));
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your business account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 