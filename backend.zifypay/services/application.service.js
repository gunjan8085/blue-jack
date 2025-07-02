const ApiError = require("../utils/apiError.util");
const Application = require("../models/application.model");
const { uploadFile, deleteFile } = require("../services/s3.service");

const applicationService = {
  applyToJob: async (applicationData, resumeFile) => {
    try {
      console.log("📥 Received application data");

      let resumeUrl = '';
      if (resumeFile) {
        const uploaded = await uploadFile(resumeFile);
        if (!uploaded) throw new ApiError(500, "Failed to upload resume to S3");
        resumeUrl = uploaded.Location;
      }

      const application = await Application.create({
        job: applicationData.jobId,
        applicant: {
          name: applicationData.name,
          email: applicationData.email,
          phone: applicationData.phone,
          linkedin: applicationData.linkedin,
          website: applicationData.website,
        },
        coverLetter: applicationData.coverLetter,
        resumeUrl,
      });

      return application;
    } catch (err) {
      throw new ApiError(400, "Error submitting application: " + err.message, err);
    }
  },

  getAllApplications: async () => {
    try {
      return await Application.find().populate("job");
    } catch (err) {
      throw new ApiError(500, "Error fetching applications: " + err.message, err);
    }
  },

  getApplicationById: async (id) => {
    try {
      const application = await Application.findById(id).populate("job");
      if (!application) throw new ApiError(404, "Application not found");
      return application;
    } catch (err) {
      throw new ApiError(500, "Error fetching application: " + err.message, err);
    }
  },

  updateApplicationStatus: async (id, status) => {
    try {
      const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
      if (!application) throw new ApiError(404, "Application not found");
      return application;
    } catch (err) {
      throw new ApiError(400, "Error updating application status: " + err.message, err);
    }
  },


  deleteApplication: async (id) => {
    try {
      const application = await Application.findById(id);
      if (!application) throw new ApiError(404, "Application not found");

      // Delete resume from S3
      if (application.resumeUrl) {
        await deleteFile(application.resumeUrl);
      }

      await application.deleteOne();

      return { message: "Application and resume deleted successfully" };
    } catch (err) {
      throw new ApiError(500, "Error deleting application: " + err.message, err);
    }
  }

};

module.exports = applicationService;
