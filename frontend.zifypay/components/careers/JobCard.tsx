import { MapPin, Clock, DollarSign } from 'lucide-react';

type JobCardProps = {
  job: {
    _id: string;
    title: string;
    department?: string;
    location: string;
    type: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
    description: string;
    isActive: boolean;
    createdAt: string;
  };
  onApply: () => void;
  onViewDetails: () => void;
};

export default function JobCard({ job, onApply, onViewDetails }: JobCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-700">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="text-xl font-semibold text-white mb-1 hover:text-blue-400 cursor-pointer transition-colors"
              onClick={onViewDetails}
            >
              {job.title}
            </h3>
            {job.department && (
              <span className="inline-block bg-blue-700 text-white text-xs px-2 py-1 rounded-full mb-2">
                {job.department}
              </span>
            )}
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              job.isActive
                ? 'bg-green-600 text-white'
                : 'bg-slate-600 text-gray-300'
            }`}
          >
            {job.isActive ? 'Active' : 'Closed'}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <span>
              {job.salaryRange.currency === 'INR' ? '' : '$'}
              {job.salaryRange.min?.toLocaleString()} - {job.salaryRange.max?.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="mt-4 text-gray-400 line-clamp-3">{job.description}</p>

        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onViewDetails}
              className="px-3 py-1 text-sm text-blue-400 hover:text-white transition-colors"
            >
              Details
            </button>
            <button
              onClick={onApply}
              disabled={!job.isActive}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                job.isActive
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
