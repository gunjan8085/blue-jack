"use client";
import React, { useState } from 'react';
import { X, Plus as PlusIcon, Trash2 } from 'lucide-react';

type JobForm = {
  _id?: string;
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

type JobModalProps = {
  selectedJob: JobForm | null;
  setShowJobModal: (show: boolean) => void;
  fetchJobs: () => void;
  setError: (error: string) => void;
};

const JobModal = ({ selectedJob, setShowJobModal, fetchJobs, setError }: JobModalProps) => {
  const [loading, setLoading] = useState(false);
  const [jobForm, setJobForm] = useState<JobForm>({
    title: selectedJob?.title || '',
    department: selectedJob?.department || '',
    location: selectedJob?.location || '',
    type: selectedJob?.type || 'Full-Time',
    salaryRange: selectedJob?.salaryRange || { min: '', max: '', currency: 'INR' },
    openings: selectedJob?.openings || 1,
    experience: selectedJob?.experience || '0+ years',
    visaRequirement: selectedJob?.visaRequirement || 'No visa needed',
    description: selectedJob?.description || '',
    responsibilities: selectedJob?.responsibilities || [''],
    qualifications: selectedJob?.qualifications || [''],
    perks: selectedJob?.perks || [''],
    applyEmail: selectedJob?.applyEmail || '',
    applyLink: selectedJob?.applyLink || '',
    isActive: selectedJob?.isActive ?? true
  });

  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

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

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const formData = {
        ...jobForm,
        salaryRange: {
          ...jobForm.salaryRange,
          min: jobForm.salaryRange.min ? Number(jobForm.salaryRange.min) : undefined,
          max: jobForm.salaryRange.max ? Number(jobForm.salaryRange.max) : undefined
        },
        responsibilities: jobForm.responsibilities.filter(r => r.trim()),
        qualifications: jobForm.qualifications.filter(q => q.trim()),
        perks: jobForm.perks.filter(p => p.trim())
      };

      if (selectedJob && selectedJob._id) {
        await apiRequest(`/jobs/${selectedJob._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await apiRequest('/jobs', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }

      setShowJobModal(false);
      fetchJobs();
    } catch (err) {
      setError('Failed to save job');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleArrayFieldChange = (field: keyof JobForm, index: number, value: string) => {
    const newArray = [...(jobForm[field] as string[])];
    newArray[index] = value;
    setJobForm({ ...jobForm, [field]: newArray });
  };

  const addArrayField = (field: keyof JobForm) => {
    setJobForm({ ...jobForm, [field]: [...(jobForm[field] as string[]), ''] });
  };

  const removeArrayField = (field: keyof JobForm, index: number) => {
    const newArray = (jobForm[field] as string[]).filter((_, i) => i !== index);
    setJobForm({ ...jobForm, [field]: newArray });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">
            {selectedJob ? 'Edit Job' : 'Create New Job'}
          </h3>
          <button 
            onClick={() => setShowJobModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleJobSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Job Title*</label>
              <input
                type="text"
                required
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Department</label>
              <input
                type="text"
                value={jobForm.department}
                onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Location</label>
              <input
                type="text"
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Job Type</label>
              <select
                value={jobForm.type}
                onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Min Salary</label>
              <input
                type="number"
                value={jobForm.salaryRange.min}
                onChange={(e) => setJobForm({ 
                  ...jobForm, 
                  salaryRange: { ...jobForm.salaryRange, min: e.target.value }
                })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Max Salary</label>
              <input
                type="number"
                value={jobForm.salaryRange.max}
                onChange={(e) => setJobForm({ 
                  ...jobForm, 
                  salaryRange: { ...jobForm.salaryRange, max: e.target.value }
                })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Openings</label>
              <input
                type="number"
                value={jobForm.openings}
                onChange={(e) => setJobForm({ ...jobForm, openings: Number(e.target.value) })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Job Description*</label>
            <textarea
              required
              rows={4}
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {(['responsibilities', 'qualifications', 'perks'] as (keyof JobForm)[]).map((field) => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 capitalize">
                {field}
              </label>
              {(jobForm[field] as string[]).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayFieldChange(field, index, e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(field, index)}
                    className="text-red-400 hover:text-red-200 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(field)}
                className="text-blue-400 hover:text-blue-200 text-sm flex items-center gap-1 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Add {field.slice(0, -1)}
              </button>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Apply Email</label>
              <input
                type="email"
                value={jobForm.applyEmail || ''}
                onChange={(e) => setJobForm({ ...jobForm, applyEmail: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Apply Link</label>
              <input
                type="url"
                value={jobForm.applyLink || ''}
                onChange={(e) => setJobForm({ ...jobForm, applyLink: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={jobForm.isActive}
              onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
              className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-300">
              Active Job Posting
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={() => setShowJobModal(false)}
              className="px-4 py-2 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Processing...' : (selectedJob ? 'Update Job' : 'Create Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;