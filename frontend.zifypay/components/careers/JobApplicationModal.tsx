"use client";
import { X } from 'lucide-react';

export type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  openings: number;
  experience: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  perks: string[];
  isActive: boolean;
  createdAt: string;
};

export type ApplicationForm = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  coverLetter: string;
  resume: File | null;
};

type JobApplicationModalProps = {
  job: Job;
  onClose: () => void;
  darkMode?: boolean;
  show?: boolean;
  onSubmit?: (e: React.FormEvent) => Promise<void>;
  formData?: ApplicationForm;
  formErrors?: Partial<ApplicationForm>;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const JobApplicationModal = ({
  job,
  onClose,
  darkMode = false,
  show = true,
  onSubmit = async (e) => { e.preventDefault(); },
  formData = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    coverLetter: '',
    resume: null,
  },
  formErrors = {},
  onInputChange = () => {},
  onFileChange = () => {},
}: JobApplicationModalProps) => {
  if (!show) return null;

  const bgClass = darkMode ? 'bg-slate-800 text-gray-100' : 'bg-white text-gray-800';
  const inputClass = darkMode 
    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-gray-800';
  const errorBorderClass = darkMode ? 'border-red-500' : 'border-red-500';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${bgClass} shadow-xl`}>
        <div className={`p-6 border-b sticky top-0 ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'} z-10`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Apply for {job.title}
            </h3>
            <button
              onClick={onClose}
              className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <div>
                <h4 className={`font-medium mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={onInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass} ${formErrors.name ? errorBorderClass : ''}`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass} ${formErrors.email ? errorBorderClass : ''}`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={onInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={onInputChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Personal Website/Portfolio
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={onInputChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                  />
                </div>
              </div>

              <div>
                <h4 className={`font-medium mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Application Materials</h4>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Resume/CV *
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="cursor-pointer">
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block transition-colors">
                        Upload File
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={onFileChange}
                        className="hidden"
                      />
                    </label>
                    {formData.resume && (
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formData.resume.name}
                      </span>
                    )}
                  </div>
                  {formErrors.resume && (
                    <p className="mt-1 text-sm text-red-500">Resume is required</p>
                  )}
                  <p className={`mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Accepted file types: PDF, DOC, DOCX (Max size: 5MB)
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  rows={5}
                  value={formData.coverLetter}
                  onChange={onInputChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                  placeholder="Tell us why you'd be a great fit for this position..."
                />
              </div>

              <div className={`pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex justify-end gap-4`}>
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};