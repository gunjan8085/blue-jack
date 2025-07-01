"use client";
import React, { useState, useEffect } from 'react';
import { Users, Eye, Search, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import ApplicationDetailsModal from '@/components/admin/ApplicationDetailsModal';

type Application = {
  _id: string;
  jobId: string;
  applicant: {
    name: string;
    email: string;
    phone?: string;
    linkedin?: string;
    website?: string;
  };
  resumeUrl: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
  createdAt: string;
  notes?: string;
  job: {
    title: string;
    department: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
    location: string;
    type: string;
    description: string;
  };
};

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  // API request helper
  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(`http://localhost:5001/api/v1${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/applications');
      setApplications(data.data);
      setFilteredApplications(data.data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update application status
  const handleUpdateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      await apiRequest(`/applications/${applicationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      fetchApplications();
      setShowApplicationModal(false);
    } catch (err) {
      setError('Failed to update application status');
      console.error(err);
    }
  };

  // View application details
  const handleViewApplication = async (application: Application) => {
    try {
      const fullApplication = await apiRequest(`/applications/${application._id}`);
      setSelectedApplication(fullApplication.data);
      setShowApplicationModal(true);
    } catch (err) {
      setError('Failed to fetch application details');
      console.error(err);
    }
  };

  // Status color helper
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      reviewed: 'bg-blue-900/50 text-blue-300 border-blue-700',
      interviewed: 'bg-purple-900/50 text-purple-300 border-purple-700',
      accepted: 'bg-green-900/50 text-green-300 border-green-700',
      rejected: 'bg-red-900/50 text-red-300 border-red-700'
    };
    return colors[status] || 'bg-gray-900/50 text-gray-300 border-gray-700';
  };

  // Search applications
  useEffect(() => {
    const results = applications.filter(app => 
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(results);
  }, [searchTerm, applications]);

  // Sort applications
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = React.useMemo(() => {
    if (!sortConfig) return filteredApplications;
    
    return [...filteredApplications].sort((a, b) => {
      // Handle nested properties
      let aValue, bValue;
      
      if (sortConfig.key.includes('.')) {
        const keys = sortConfig.key.split('.');
        aValue = keys.reduce((obj: any, key) => obj?.[key], a);
        bValue = keys.reduce((obj: any, key) => obj?.[key], b);
      } else {
        aValue = a[sortConfig.key as keyof Application];
        bValue = b[sortConfig.key as keyof Application];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredApplications, sortConfig]);

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen rounded-br-4xl">
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
          {error}
          <button onClick={() => setError('')} className="float-right text-red-400 hover:text-red-200">
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white">Applications</h2>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-blue-200">Loading applications...</p>
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('applicant.name')}
                >
                  <div className="flex items-center">
                    Applicant
                    {sortConfig?.key === 'applicant.name' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                    {sortConfig?.key !== 'applicant.name' && <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('job.title')}
                >
                  <div className="flex items-center">
                    Job
                    {sortConfig?.key === 'job.title' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                    {sortConfig?.key !== 'job.title' && <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('createdAt')}
                >
                  <div className="flex items-center">
                    Applied Date
                    {sortConfig?.key === 'createdAt' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                    {sortConfig?.key !== 'createdAt' && <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig?.key === 'status' && (
                      sortConfig.direction === 'ascending' ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                    {sortConfig?.key !== 'status' && <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{application.applicant.name}</div>
                      <div className="text-sm text-gray-300">{application.applicant.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{application.job?.title || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewApplication(application)}
                      className="text-blue-400 hover:text-blue-200 transition-colors"
                      title="View details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showApplicationModal && selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setShowApplicationModal(false)}
          onStatusChange={(status) => handleUpdateApplicationStatus(selectedApplication._id, status)}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;