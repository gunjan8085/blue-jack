"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Edit, Trash2 } from 'lucide-react';
import JobModal from '@/components/admin/JobModal';

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: {
    min: number | string;
    max: number | string;
    currency: string;
  };
  openings: number;
  experience: string;
  visaRequirement: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  perks: string[];
  applyEmail?: string;
  applyLink?: string;
  isActive: boolean;
};

import { API_URL } from '@/lib/const';

const JobManagementPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  const apiRequest = async (endpoint: string, options: { headers?: Record<string, string>, method?: string } = {}) => {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/jobs');
      setJobs(data.data);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await apiRequest(`/jobs/${jobId}`, { method: 'DELETE' });
      fetchJobs();
    } catch (err) {
      setError('Failed to delete job');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
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

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Job Management</h2>
        <button
          onClick={() => {
            setSelectedJob(null);
            setShowJobModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Post New Job</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-blue-200">Loading jobs...</p>
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                  <td className="px-6 py-4 text-gray-300">{job.department}</td>
                  <td className="px-6 py-4 text-gray-300">{job.location}</td>
                  <td className="px-6 py-4 text-gray-300">{job.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      job.isActive ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowJobModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-200 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="text-red-400 hover:text-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showJobModal && (
        <JobModal
          selectedJob={selectedJob}
          setShowJobModal={setShowJobModal}
          fetchJobs={fetchJobs}
          setError={setError}
        />
      )}
    </div>
  );
};

export default JobManagementPage;