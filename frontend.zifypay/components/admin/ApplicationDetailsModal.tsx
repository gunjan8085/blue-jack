"use client";
import React from 'react';
import { X, Download, User, Briefcase, CheckCircle, XCircle, Clock, Users, Mail, Phone, Linkedin, Globe } from 'lucide-react';

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

type ApplicationDetailsModalProps = {
  application: Application;
  onClose: () => void;
  onStatusChange: (status: string) => void;
};

const ApplicationDetailsModal = ({ application, onClose, onStatusChange }: ApplicationDetailsModalProps) => {
  const statusIcons = {
    pending: <Clock className="w-5 h-5 mr-2 text-yellow-400" />,
    reviewed: <Users className="w-5 h-5 mr-2 text-blue-400" />,
    interviewed: <Mail className="w-5 h-5 mr-2 text-purple-400" />,
    accepted: <CheckCircle className="w-5 h-5 mr-2 text-green-400" />,
    rejected: <XCircle className="w-5 h-5 mr-2 text-red-400" />
  };

  const statusOptions: Array<{ value: Application['status']; label: string }> = [
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'interviewed', label: 'Interviewed' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
  ];

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">
            Application Details
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Applicant Information */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-3 flex items-center text-white">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Applicant Information
              </h4>
              <div className="space-y-3 text-sm">
                <p className="flex items-center text-gray-300">
                  <span className="font-medium text-gray-400 mr-2">Name:</span> 
                  {application.applicant.name}
                </p>
                <p className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  {application.applicant.email}
                </p>
                {application.applicant.phone && (
                  <p className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-2 text-blue-400" />
                    {application.applicant.phone}
                  </p>
                )}
                {application.applicant.linkedin && (
                  <p className="flex items-center text-gray-300">
                    <Linkedin className="w-4 h-4 mr-2 text-blue-400" />
                    <a 
                      href={application.applicant.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                      LinkedIn Profile
                    </a>
                  </p>
                )}
                {application.applicant.website && (
                  <p className="flex items-center text-gray-300">
                    <Globe className="w-4 h-4 mr-2 text-blue-400" />
                    <a 
                      href={application.applicant.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                      Personal Website
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Job Information */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-3 flex items-center text-white">
                <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                Job Information
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p><span className="font-medium text-gray-400">Position:</span> {application.job.title}</p>
                <p><span className="font-medium text-gray-400">Department:</span> {application.job.department}</p>
                <p><span className="font-medium text-gray-400">Location:</span> {application.job.location}</p>
                <p><span className="font-medium text-gray-400">Type:</span> {application.job.type}</p>
                <p>
                  <span className="font-medium text-gray-400">Salary:</span> {application.job.salaryRange.currency}{application.job.salaryRange.min} - {application.job.salaryRange.max}
                </p>
                <p><span className="font-medium text-gray-400">Applied:</span> {new Date(application.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Resume */}
          {application.resumeUrl && (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-3 text-white">Resume</h4>
              <a 
                href={application.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center underline"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </div>
          )}

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-3 text-white">Cover Letter</h4>
              <div className="text-sm text-gray-300 whitespace-pre-wrap">
                {application.coverLetter}
              </div>
            </div>
          )}

          {/* Notes */}
          {application.notes && (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-3 text-white">Notes</h4>
              <p className="text-sm text-gray-300">{application.notes}</p>
            </div>
          )}

          {/* Status Update */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="font-semibold mb-3 text-white">Update Status</h4>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onStatusChange(option.value)}
                  className={`px-4 py-2 text-sm rounded-lg flex items-center border transition-colors ${
                    application.status === option.value
                      ? getStatusColor(option.value) + ' font-bold'
                      : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700/50'
                  }`}
                >
                  {statusIcons[option.value]}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;