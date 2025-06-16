
// ============= FRONTEND: ProfilePage.tsx (Updated) =============
'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/customer/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/const';
export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    profilePicUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load user data on component mount
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userDataRaw = localStorage.getItem('userData');
      if (userDataRaw) {
        const userData = JSON.parse(userDataRaw);
        const userId = userData._id;
        
        // Fetch fresh data from API
        const response = await fetch(`${API_URL}/users/profile?userId=${userId}`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setFormData({
            firstName: result.data.user.firstName || '',
            lastName: result.data.user.lastName || '',
            email: result.data.user.email || '',
            phoneNumber: result.data.user.phoneNumber || '',
            country: result.data.user.country || '',
            profilePicUrl: result.data.user.profilePicUrl || '',
          });
        } else {
          // Fallback to localStorage data
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            country: userData.country || '',
            profilePicUrl: userData.profilePicUrl || '',
          });
        }
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
      // Try to load from localStorage as fallback
      const userDataRaw = localStorage.getItem('userData');
      if (userDataRaw) {
        try {
          const parsed = JSON.parse(userDataRaw);
          setFormData({
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            email: parsed.email || '',
            phoneNumber: parsed.phoneNumber || '',
            country: parsed.country || '',
            profilePicUrl: parsed.profilePicUrl || '',
          });
        } catch (parseErr) {
          console.error('Failed to parse user data:', parseErr);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const userDataRaw = localStorage.getItem('userData');
      if (!userDataRaw) {
        throw new Error('No user data found. Please login again.');
      }

      const userData = JSON.parse(userDataRaw);
      const userId = userData._id;

      const response = await fetch(`${API_URL}/users/update-profile?userId=${userId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          profilePicUrl: formData.profilePicUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Update failed');
      }

      if (result.success) {
        // Update localStorage with new data
        localStorage.setItem('userData', JSON.stringify(result.data.user));
        setSuccessMsg('Profile updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        throw new Error(result.message || 'Update failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
      // Clear error message after 5 seconds
      setTimeout(() => setErrorMsg(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left: Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={formData.profilePicUrl || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
            alt="Profile"
            className="h-48 w-48 rounded-full object-cover border shadow-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
            }}
          />
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
              <Input id="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
              <Input id="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <Input id="email" value={formData.email} readOnly className="bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
              <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
              <Input id="country" value={formData.country} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="profilePicUrl" className="block text-sm font-medium mb-1">Profile Image URL</label>
            <Input id="profilePicUrl" value={formData.profilePicUrl} onChange={handleChange} />
          </div>

          <Button type="submit" disabled={loading} className="w-full md:w-fit">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>

          {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}
        </form>
      </div>
    </Layout>
  );
}