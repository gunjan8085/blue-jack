
const Job = require("../models/job.model");
const ApiError = require("../utils/apiError.util");

const jobService = {
  createJob: async (jobData) => {
    try {
      return await Job.create(jobData);
    } catch (err) {
      throw new ApiError(400, "Error creating job: " + err.message, err);
    }
  },

  getAllJobs: async () => {
    try {
      return await Job.find().sort({ createdAt: -1 });
    } catch (err) {
      throw new ApiError(500, "Error fetching jobs: " + err.message, err);
    }
  },

  getJobById: async (id) => {
    try {
      const job = await Job.findById(id);
      if (!job) throw new ApiError(404, "Job not found");
      return job;
    } catch (err) {
      throw new ApiError(500, "Error fetching job: " + err.message, err);
    }
  },

  updateJob: async (id, updateData) => {
    try {
      const job = await Job.findByIdAndUpdate(id, updateData, { new: true });
      if (!job) throw new ApiError(404, "Job not found");
      return job;
    } catch (err) {
      throw new ApiError(400, "Error updating job: " + err.message, err);
    }
  },

  deleteJob: async (id) => {
    try {
      const result = await Job.findByIdAndDelete(id);
      if (!result) throw new ApiError(404, "Job not found");
      return { message: "Job deleted successfully" };
    } catch (err) {
      throw new ApiError(500, "Error deleting job: " + err.message, err);
    }
  },
};

module.exports = jobService;
