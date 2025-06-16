// lib/auth.ts
import { API_URL } from './const';

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    // Store token in a cookie for Next.js middleware
    document.cookie = `auth_token=${token}; path=/; secure`;
  }
};


export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const getuserid = () => {
  const userData = getUserData();
  return userData?._id || userData?.id;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// User data management
export const setUserData = (userData: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
};

export const getUserData = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const removeUserData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userData');
  }
};

// Auth check
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Logout
export const logout = () => {
  localStorage.clear();
  removeAuthToken();
  removeUserData();
};

// Business profile check
export const checkBusinessProfile = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/business/by-owner/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });

    const data = await response.json();
    console.log('Business check response:', data);

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Business profile not found
      }
      throw new Error(data.message || 'Failed to check business profile');
    }

    return data.data;
  } catch (error) {
    console.error('Error checking business profile:', error);
    return null;
  }
}; 