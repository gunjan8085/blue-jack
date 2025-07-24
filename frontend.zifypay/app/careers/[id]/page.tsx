"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/landingPage/Navbar';
import { JobApplicationModal } from '@/components/careers/JobApplicationModal';
import { API_URL } from '@/lib/const';

type Job = {
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

type ApplicationForm = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  coverLetter: string;
  resume: File | null;
};

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

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

    if (Object.keys(errors).length > 0 || !job) {
      setFormErrors(errors);
      if (!job) console.error("❌ No job available for submission.");
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
      form.append('jobId', job._id);
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
        setShowApplyForm(false);
      } else {
        alert("❌ Failed to submit application: " + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Network or server error. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setJob(data.data);
        } else {
          setError(data.message || 'Failed to fetch job details');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-lg text-gray-200">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-slate-800 rounded-lg shadow-lg">
          <p className="text-lg text-red-400 mb-4">{error || 'Job not found'}</p>
          <button
            onClick={() => router.push('/careers')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => router.push('/careers')}
            className="flex items-center text-blue-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to all jobs
          </button>

          <div className="bg-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-blue-800 via-slate-800 to-blue-900 p-6 md:p-8 border-b border-blue-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                  {job.department && (
                    <span className="inline-block bg-blue-700 text-white text-sm px-3 py-1 rounded-full mb-4">
                      {job.department}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    job.isActive ? 'bg-green-600 text-white' : 'bg-slate-600 text-gray-300'
                  }`}
                >
                  {job.isActive ? 'Active' : 'Closed'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                  <span>
                    {job.salaryRange.currency === 'INR' ? '$' : '$'}
                    {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 text-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                    <p className="leading-relaxed text-gray-300">{job.description}</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Qualifications</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {job.qualifications.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  {job.perks.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold mb-3">Perks & Benefits</h2>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {job.perks.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>

                <aside className="lg:col-span-1">
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600 sticky top-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">Job Overview</h3>
                    <div className="space-y-4 text-gray-300">
                      <div>
                        <p className="text-sm text-gray-400">Posted Date</p>
                        <p>{new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Job Type</p>
                        <p>{job.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p>{job.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Experience</p>
                        <p>{job.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Openings</p>
                        <p>{job.openings}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowApplyForm(true)}
                      disabled={!job.isActive}
                      className={`w-full mt-6 px-4 py-3 rounded-lg font-medium transition ${
                        job.isActive
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-500 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {job.isActive ? 'Apply for this position' : 'Position Closed'}
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        {showApplyForm && job && (
          <JobApplicationModal
            job={job}
            onClose={() => setShowApplyForm(false)}
            darkMode={true}
            show={showApplyForm}
            formData={formData}
            formErrors={formErrors}
            onInputChange={onInputChange}
            onFileChange={onFileChange}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </>
  );
}
