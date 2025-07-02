// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Users, 
//   Briefcase, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   X,
//   Download,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   User
// } from 'lucide-react';

// type Job = {
//     _id: string;
//     title: string;
//     department: string;
//     location: string;
//     type: string;
//     salaryRange: {
//         min: number | string;
//         max: number | string;
//         currency: string;
//     };
//     openings: number;
//     experience: string;
//     visaRequirement: string;
//     description: string;
//     responsibilities: string[];
//     qualifications: string[];
//     perks: string[];
//     applyEmail?: string;
//     applyLink?: string;
//     isActive: boolean;
//     };

// type Application = {
//     _id: string;
//     jobId: string;
//     applicantName: string;
//     applicantEmail: string;
//     resume: string;
//     coverLetter: string;
//     status: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
// };

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('jobs');
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [showJobModal, setShowJobModal] = useState(false);
//   const [showApplicationModal, setShowApplicationModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const API_BASE = 'http://localhost:5001/api/v1';

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem('adminToken');
//   };

//   // API request helper
//   const apiRequest = async (endpoint : string, options = {}) => {
//     const token = getAuthToken();
//     const headers = {
//       'Content-Type': 'application/json',
//       ...(token && { 'Authorization': `Bearer ${token}` }),
//       ...options.headers
//     };

//     const response = await fetch(`${API_BASE}${endpoint}`, {
//       ...options,
//       headers
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   };

//   // Job form state
//   const [jobForm, setJobForm] = useState({
//     title: '',
//     department: '',
//     location: '',
//     type: 'Full-Time',
//     salaryRange: { min: '', max: '', currency: 'INR' },
//     openings: 1,
//     experience: '0+ years',
//     visaRequirement: 'No visa needed',
//     description: '',
//     responsibilities: [''],
//     qualifications: [''],
//     perks: [''],
//     applyEmail: '',
//     applyLink: '',
//     isActive: true
//   });

//   // Fetch jobs
//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       const data = await apiRequest('/jobs');
//       setJobs(data.data);
//     } catch (err) {
//       setError('Failed to fetch jobs');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch applications
//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const data = await apiRequest('/applications');
//       setApplications(data.data);
//     } catch (err) {
//       setError('Failed to fetch applications');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create or update job
//   const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
      
//       // Clean up form data
//       const formData = {
//         ...jobForm,
//         salaryRange: {
//           ...jobForm.salaryRange,
//           min: jobForm.salaryRange.min ? Number(jobForm.salaryRange.min) : undefined,
//           max: jobForm.salaryRange.max ? Number(jobForm.salaryRange.max) : undefined
//         },
//         responsibilities: jobForm.responsibilities.filter(r => r.trim()),
//         qualifications: jobForm.qualifications.filter(q => q.trim()),
//         perks: jobForm.perks.filter(p => p.trim())
//       };

//       if (selectedJob) {
//         await apiRequest(`/jobs/${selectedJob._id}`, {
//           method: 'PUT',
//           body: JSON.stringify(formData)
//         });
//       } else {
//         await apiRequest('/jobs', {
//           method: 'POST',
//           body: JSON.stringify(formData)
//         });
//       }

//       setShowJobModal(false);
//       setSelectedJob(null);
//       resetJobForm();
//       fetchJobs();
//     } catch (err) {
//       setError('Failed to save job');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete job
//   const handleDeleteJob = async (jobId: string) => {
//     if (!confirm('Are you sure you want to delete this job?')) return;
    
//     try {
//       await apiRequest(`/jobs/${jobId}`, { method: 'DELETE' });
//       fetchJobs();
//     } catch (err) {
//       setError('Failed to delete job');
//       console.error(err);
//     }
//   };

//   // Update application status
//   const handleUpdateApplicationStatus = async (applicationId: string, status: string) => {
//     try {
//       await apiRequest(`/applications/${applicationId}/status`, {
//         method: 'PATCH',
//         body: JSON.stringify({ status })
//       });
//       fetchApplications();
//       setShowApplicationModal(false);
//     } catch (err) {
//       setError('Failed to update application status');
//       console.error(err);
//     }
//   };

//   // Reset job form
//   const resetJobForm = () => {
//     setJobForm({
//       title: '',
//       department: '',
//       location: '',
//       type: 'Full-Time',
//       salaryRange: { min: '', max: '', currency: 'INR' },
//       openings: 1,
//       experience: '0+ years',
//       visaRequirement: 'No visa needed',
//       description: '',
//       responsibilities: [''],
//       qualifications: [''],
//       perks: [''],
//       applyEmail: '',
//       applyLink: '',
//       isActive: true
//     });
//   };

//   // Handle array field changes
//   const handleArrayFieldChange = (field: keyof JobForm, index: number, value: string) => {
//     const newArray = [...jobForm[field]];
//     newArray[index] = value;
//     setJobForm({ ...jobForm, [field]: newArray });
//   };

//   const addArrayField = (field: keyof JobForm) => {
//     setJobForm({ ...jobForm, [field]: [...jobForm[field], ''] });
//   };

//   const removeArrayField = (field: keyof JobForm, index: number) => {
//     const newArray = jobForm[field].filter((_, i) => i !== index);
//     setJobForm({ ...jobForm, [field]: newArray });
//   };

//   // Edit job
//   const handleEditJob = (job) => {
//     setSelectedJob(job);
//     setJobForm({
//       ...job,
//       salaryRange: job.salaryRange || { min: '', max: '', currency: 'INR' },
//       responsibilities: job.responsibilities || [''],
//       qualifications: job.qualifications || [''],
//       perks: job.perks || ['']
//     });
//     setShowJobModal(true);
//   };

//   // View application details
//   const handleViewApplication = async (application) => {
//     try {
//       const fullApplication = await apiRequest(`/applications/${application._id}`);
//       setSelectedApplication(fullApplication);
//       setShowApplicationModal(true);
//     } catch (err) {
//       setError('Failed to fetch application details');
//       console.error(err);
//     }
//   };

//   // Status color helper
//   const getStatusColor = (status) => {
//     const colors = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       reviewed: 'bg-blue-100 text-blue-800',
//       interviewed: 'bg-purple-100 text-purple-800',
//       accepted: 'bg-green-100 text-green-800',
//       rejected: 'bg-red-100 text-red-800'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   useEffect(() => {
//     if (activeTab === 'jobs') {
//       fetchJobs();
//     } else {
//       fetchApplications();
//     }
//   }, [activeTab]);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg">
//         <div className="p-6 border-b">
//           <h1 className="text-xl font-bold text-gray-800">Job Admin</h1>
//         </div>
        
//         <nav className="mt-6">
//           <button
//             onClick={() => setActiveTab('jobs')}
//             className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
//               activeTab === 'jobs' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
//             }`}
//           >
//             <Briefcase className="w-5 h-5 mr-3" />
//             Job Management
//           </button>
          
//           <button
//             onClick={() => setActiveTab('applications')}
//             className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
//               activeTab === 'applications' ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
//             }`}
//           >
//             <Users className="w-5 h-5 mr-3" />
//             Applications
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-hidden">
//         <div className="p-6">
//           {error && (
//             <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//               <button onClick={() => setError('')} className="float-right">×</button>
//             </div>
//           )}

//           {/* Jobs Tab */}
//           {activeTab === 'jobs' && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">Job Management</h2>
//                 <button
//                   onClick={() => {
//                     resetJobForm();
//                     setSelectedJob(null);
//                     setShowJobModal(true);
//                   }}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   Post New Job
//                 </button>
//               </div>

//               {loading ? (
//                 <div className="text-center py-8">Loading...</div>
//               ) : (
//                 <div className="bg-white rounded-lg shadow overflow-hidden">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {jobs.map((job) => (
//                         <tr key={job._id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
//                           <td className="px-6 py-4 text-gray-500">{job.department}</td>
//                           <td className="px-6 py-4 text-gray-500">{job.location}</td>
//                           <td className="px-6 py-4 text-gray-500">{job.type}</td>
//                           <td className="px-6 py-4">
//                             <span className={`px-2 py-1 text-xs rounded-full ${
//                               job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                             }`}>
//                               {job.isActive ? 'Active' : 'Inactive'}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => handleEditJob(job)}
//                                 className="text-blue-600 hover:text-blue-800"
//                               >
//                                 <Edit className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteJob(job._id)}
//                                 className="text-red-600 hover:text-red-800"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Applications Tab */}
//           {activeTab === 'applications' && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
//               </div>

//               {loading ? (
//                 <div className="text-center py-8">Loading...</div>
//               ) : (
//                 <div className="bg-white rounded-lg shadow overflow-hidden">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {applications.map((application) => (
//                         <tr key={application._id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4">
//                             <div>
//                               <div className="font-medium text-gray-900">{application.applicant?.name}</div>
//                               <div className="text-sm text-gray-500">{application.applicant?.email}</div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-gray-900">{application.job?.title || 'N/A'}</td>
//                           <td className="px-6 py-4 text-gray-500">
//                             {new Date(application.createdAt).toLocaleDateString()}
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
//                               {application.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <button
//                               onClick={() => handleViewApplication(application)}
//                               className="text-blue-600 hover:text-blue-800"
//                             >
//                               <Eye className="w-4 h-4" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Job Modal */}
//       {showJobModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold">{selectedJob ? 'Edit Job' : 'Post New Job'}</h3>
//               <button onClick={() => setShowJobModal(false)}>
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <form onSubmit={handleJobSubmit} className="space-y-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Job Title*</label>
//                   <input
//                     type="text"
//                     required
//                     value={jobForm.title}
//                     onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Department</label>
//                   <input
//                     type="text"
//                     value={jobForm.department}
//                     onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Location</label>
//                   <input
//                     type="text"
//                     value={jobForm.location}
//                     onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Job Type</label>
//                   <select
//                     value={jobForm.type}
//                     onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   >
//                     <option value="Full-Time">Full-Time</option>
//                     <option value="Part-Time">Part-Time</option>
//                     <option value="Internship">Internship</option>
//                     <option value="Contract">Contract</option>
//                     <option value="Remote">Remote</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Min Salary</label>
//                   <input
//                     type="number"
//                     value={jobForm.salaryRange.min}
//                     onChange={(e) => setJobForm({ 
//                       ...jobForm, 
//                       salaryRange: { ...jobForm.salaryRange, min: e.target.value }
//                     })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Max Salary</label>
//                   <input
//                     type="number"
//                     value={jobForm.salaryRange.max}
//                     onChange={(e) => setJobForm({ 
//                       ...jobForm, 
//                       salaryRange: { ...jobForm.salaryRange, max: e.target.value }
//                     })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Openings</label>
//                   <input
//                     type="number"
//                     value={jobForm.openings}
//                     onChange={(e) => setJobForm({ ...jobForm, openings: Number(e.target.value) })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Job Description*</label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={jobForm.description}
//                   onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
//                   className="w-full border rounded-lg px-3 py-2"
//                 />
//               </div>

//               {/* Dynamic Arrays */}
//               {['responsibilities', 'qualifications', 'perks'].map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium mb-2 capitalize">{field}</label>
//                   {jobForm[field].map((item, index) => (
//                     <div key={index} className="flex mb-2">
//                       <input
//                         type="text"
//                         value={item}
//                         onChange={(e) => handleArrayFieldChange(field, index, e.target.value)}
//                         className="flex-1 border rounded-lg px-3 py-2"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeArrayField(field, index)}
//                         className="ml-2 text-red-600 hover:text-red-800"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addArrayField(field)}
//                     className="text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     + Add {field.slice(0, -1)}
//                   </button>
//                 </div>
//               ))}

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Apply Email</label>
//                   <input
//                     type="email"
//                     value={jobForm.applyEmail}
//                     onChange={(e) => setJobForm({ ...jobForm, applyEmail: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Apply Link</label>
//                   <input
//                     type="url"
//                     value={jobForm.applyLink}
//                     onChange={(e) => setJobForm({ ...jobForm, applyLink: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="isActive"
//                   checked={jobForm.isActive}
//                   onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
//                   className="mr-2"
//                 />
//                 <label htmlFor="isActive" className="text-sm font-medium">Active Job Posting</label>
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowJobModal(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {loading ? 'Saving...' : (selectedJob ? 'Update Job' : 'Post Job')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Application Modal */}
//       {showApplicationModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold">Application Details</h3>
//               <button onClick={() => setShowApplicationModal(false)}>
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold mb-3 flex items-center">
//                     <User className="w-4 h-4 mr-2" />
//                     Applicant Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <p><span className="font-medium">Name:</span> {selectedApplication.applicant?.name}</p>
//                     <p><span className="font-medium">Email:</span> {selectedApplication.applicant?.email}</p>
//                     {selectedApplication.applicant?.phone && (
//                       <p><span className="font-medium">Phone:</span> {selectedApplication.applicant.phone}</p>
//                     )}
//                     {selectedApplication.applicant?.linkedin && (
//                       <p><span className="font-medium">LinkedIn:</span> 
//                         <a href={selectedApplication.applicant.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
//                           View Profile
//                         </a>
//                       </p>
//                     )}
//                     {selectedApplication.applicant?.website && (
//                       <p><span className="font-medium">Website:</span> 
//                         <a href={selectedApplication.applicant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
//                           Visit Website
//                         </a>
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold mb-3 flex items-center">
//                     <Briefcase className="w-4 h-4 mr-2" />
//                     Job Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <p><span className="font-medium">Position:</span> {selectedApplication.job?.title}</p>
//                     <p><span className="font-medium">Department:</span> {selectedApplication.job?.department}</p>
//                     <p><span className="font-medium">Applied:</span> {new Date(selectedApplication.createdAt).toLocaleDateString()}</p>
//                     <div className="flex items-center">
//                       <span className="font-medium">Status:</span>
//                       <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedApplication.status)}`}>
//                         {selectedApplication.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {selectedApplication.resumeUrl && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold mb-3">Resume</h4>
//                   <a 
//                     href={selectedApplication.resumeUrl} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline flex items-center"
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     View Resume
//                   </a>
//                 </div>
//               )}

//               {selectedApplication.coverLetter && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold mb-3">Cover Letter</h4>
//                   <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
//                 </div>
//               )}

//               {selectedApplication.notes && (
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-semibold mb-3">Notes</h4>
//                   <p className="text-sm text-gray-700">{selectedApplication.notes}</p>
//                 </div>
//               )}

//               <div className="border-t pt-4">
//                 <h4 className="font-semibold mb-3">Update Status</h4>
//                 <div className="flex space-x-2">
//                   {['pending', 'reviewed', 'interviewed', 'accepted', 'rejected'].map((status) => (
//                     <button
//                       key={status}
//                       onClick={() => handleUpdateApplicationStatus(selectedApplication._id, status)}
//                       className={`px-3 py-1 text-sm rounded-full border ${
//                         selectedApplication.status === status
//                           ? getStatusColor(status)
//                           : 'border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
"use client";
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
    else{
      router.push('/admin/job-management');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </div>
  );
}