"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronDown } from 'lucide-react';
import JobCard from '@/components/careers/JobCard';
import JobFilters from '@/components/careers/JobFilters';
import { JobApplicationModal } from '@/components/careers/JobApplicationModal';
import Navbar from '@/components/landingPage/Navbar';
import { API_URL } from '@/lib/const';

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

const CareersPage = () => {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    coverLetter: '',
    resume: null,
  });
  const [formErrors, setFormErrors] = useState<Partial<ApplicationForm>>({});
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    department: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<ApplicationForm> = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.resume) console.error('Resume is required');

    if (Object.keys(errors).length > 0 || !selectedJob) {
      setFormErrors(errors);
      if (!selectedJob) console.error("❌ No job selected.");
      return;
    }

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('linkedin', formData.linkedin);
      form.append('website', formData.website);
      form.append('coverLetter', formData.coverLetter);
      form.append('jobId', selectedJob._id);
      if (formData.resume) {
        form.append('resume', formData.resume);
      }

      const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        body: form,
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Application submitted successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          linkedin: '',
          website: '',
          coverLetter: '',
          resume: null,
        });
        setFormErrors({});
        setShowApplyModal(false);
      } else {
        alert("❌ Failed to submit application: " + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Network or server error. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs`);
        const data = await res.json();
        if (res.ok) {
          setJobs(data.data || []);
        } else {
          setError(data.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleViewDetails = (jobId: string) => {
    router.push(`/careers/${jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesDepartment =
      !filters.department || job.department?.toLowerCase().includes(filters.department.toLowerCase());

    return matchesSearch && matchesLocation && matchesType && matchesDepartment;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center max-w-md p-6 bg-slate-800 rounded-lg shadow-lg">
          <p className="text-lg text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="text-white py-20 rounded-br-4xl">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
              Explore exciting career opportunities and be part of our innovative team.
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="mb-8 bg-slate-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title or keywords..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors text-white"
              >
                {showFilters ? (
                  <>
                    <X size={18} />
                    Hide Filters
                  </>
                ) : (
                  <>
                    <ChevronDown size={18} />
                    Show Filters
                  </>
                )}
              </button>
            </div>

            {showFilters && (
              <JobFilters jobs={jobs} filters={filters} setFilters={setFilters} />
            )}

            <div className="flex justify-between items-center mt-4">
              <h2 className="text-2xl font-bold text-white">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
              </h2>
              {(filters.location || filters.type || filters.department) && (
                <button
                  onClick={() => setFilters({ location: '', type: '', department: '' })}
                  className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onApply={() => handleApply(job)}
                  onViewDetails={() => handleViewDetails(job._id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filters.location || filters.type || filters.department
                  ? 'Try adjusting your search or filters'
                  : 'There are currently no open positions. Please check back later.'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ location: '', type: '', department: '' });
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Application Modal */}
        {showApplyModal && selectedJob && (
          <JobApplicationModal
            job={selectedJob}
            onClose={() => setShowApplyModal(false)}
            darkMode={true}
            show={showApplyModal}
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onFileChange={onFileChange}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default CareersPage;
