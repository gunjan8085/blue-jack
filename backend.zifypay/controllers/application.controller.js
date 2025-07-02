
// === APPLICATION CONTROLLER ===
const applicationService = require("../services/application.service");

const applicationController = {
  applyToJob: async (req, res, next) => {
    try {
      const application = await applicationService.applyToJob(req.body,req.file);
      res.status(201).json({ data: application, success: true, message: "Application submitted successfully" });
    } catch (error) {
      console.error("Error submitting application:", error);
      next(error);
    }
  },

  getAllApplications: async (req, res, next) => {
    try {
      const applications = await applicationService.getAllApplications();
      res.status(200).json({ data: applications, success: true, message: "Applications fetched successfully" });
    } catch (error) {
      console.error("Error fetching applications:", error);
      next(error);
    }
  },

  getApplicationById: async (req, res, next) => {
    try {
      const application = await applicationService.getApplicationById(req.params.id);
      res.status(200).json({ data: application, success: true, message: "Application fetched successfully" });
    } catch (error) {
      console.error("Error fetching application:", error);
      next(error);
    }
  },

  updateApplicationStatus: async (req, res, next) => {
    try {
      const application = await applicationService.updateApplicationStatus(req.params.id, req.body.status);
      res.status(200).json({ data: application, success: true, message: "Application status updated successfully" });
    } catch (error) {
      console.error("Error updating application status:", error);
      next(error);
    }
  },

  deleteApplication: async (req, res, next) => {
    try {
      const result = await applicationService.deleteApplication(req.params.id);
      res.status(200).json({ data: result, success: true, message: "Application deleted successfully" });
    } catch (error) {
      console.error("Error deleting application:", error);
      next(error);
    }
  },
};

module.exports = applicationController;