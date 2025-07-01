// === JOB CONTROLLER ===
const jobService = require("../services/job.service");

const jobController = {
  createJob: async (req, res, next) => {
    try {
      const job = await jobService.createJob(req.body);
      res.status(201).json({ data: job, success: true, message: "Job created successfully" });
    } catch (error) {
      console.error("Error creating job:", error);
      next(error);
    }
  },

  getAllJobs: async (req, res, next) => {
    try {
      const jobs = await jobService.getAllJobs();
      res.status(200).json({ data: jobs, success: true, message: "Jobs fetched successfully" });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      next(error);
    }
  },

  getJobById: async (req, res, next) => {
    try {
      const job = await jobService.getJobById(req.params.id);
      res.status(200).json({ data: job, success: true, message: "Job fetched successfully" });
    } catch (error) {
      console.error("Error fetching job by ID:", error);
      next(error);
    }
  },

  updateJob: async (req, res, next) => {
    try {
      const job = await jobService.updateJob(req.params.id, req.body);
      res.status(200).json({ data: job, success: true, message: "Job updated successfully" });
    } catch (error) {
      console.error("Error updating job:", error);
      next(error);
    }
  },

  deleteJob: async (req, res, next) => {
    try {
      const result = await jobService.deleteJob(req.params.id);
      res.status(200).json({ data: result, success: true, message: "Job deleted successfully" });
    } catch (error) {
      console.error("Error deleting job:", error);
      next(error);
    }
  },
};

module.exports = jobController;
