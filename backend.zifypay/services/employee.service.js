const { Employee, JobProfile, Business } = require("../models/index");
const { ENUMS } = require("../configs/constants.config");
const ApiError = require("../utils/apiError.util");
const mongoose = require("mongoose");
const { comparePassword } = require("../utils/bcrypt.util");

module.exports = {
  addEmployee: async (data) => {
    try {
      const empData = {
        name: data.name,
        email: data.email,
        profilePicUrl: data.profilePicUrl,
        dob: data.dob,
        phoneNumber: data.phoneNumber,
        additionalPhoneNumber: data.additionalPhoneNumber,
        country: data.country,
        emergencyContacts: data.emergencyContacts,
        authType: data.isOwner ? data.authType : "none",
        isOwner: data.isOwner,
      };

      if (!data.isOwner) {
        const jobProfile = await JobProfile.create({
          company: data.businessId,
          jobTitle: data.jobTitle,
          startDate: data.startDate,
          endDate: data.endDate,
          teamMemberId: data.teamMemberId,
          servicesProvided: data.servicesProvided,
          allowCalendarBooking: data.allowCalendarBooking,
          calendarColor: data.calendarColor,
          note: data.note,
          headline: data.headline,
          bio: data.bio,
          languages: data.languages,
          socialLinks: data.socialLinks,
          defaultShift: data.defaultShift ?? ENUMS.DEFAUTL_SHIFT,
        });

        empData.jobProfile = jobProfile._id;
      }

      if (data.isOwner && data.authType === "password") {
        empData.password = data.password;
      }

      const employee = await Employee.create(empData);

      const response = {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isEmailVerified: employee.isEmailVerified,
        profilePicUrl: employee.profilePicUrl,
        phoneNumber: employee.phoneNumber,
        isOwner: employee.isOwner,
        country: employee.country,
        jobTitle: data.isOwner ? "Owner" : data.jobTitle,
      };

      return response;
    } catch (error) {
      throw new Error("Error creating employee: " + error.message);
    }
  },

  loginOwnerEmployee: async (email, password) => {
    try {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return null;
      }
      const isPasswordValid = await comparePassword(
        password,
        employee.password
      );
      if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password.");
      }
      const business = await Business.findOne({ owner: employee._id });
      const response = {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isOwner: employee.isOwner,
        profilePicUrl: employee.profilePicUrl,
        businessName: business?.name ?? "N/A",
        businessId: business?._id ?? "N/A",
      };
      return response;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  updateEmployeeWithJobProfile: async (employeeId, updateData) => {
    try {
      const employee = await Employee.findById(employeeId);
      if (!employee) throw new ApiError(404, "Employee not found");

      // 1. Split data between Employee and JobProfile
      const jobProfileFields = [
        "jobTitle",
        "startDate",
        "endDate",
        "status",
        "teamMemberId",
        "servicesProvided",
        "allowCalendarBooking",
        "accessLevel",
        "calendarColor",
        "note",
        "headline",
        "bio",
        "languages",
        "socialLinks",
        "defaultShift",
      ];

      const employeeUpdate = {};
      const jobProfileUpdate = {};

      for (const key in updateData) {
        if (jobProfileFields.includes(key)) {
          jobProfileUpdate[key] = updateData[key];
        } else {
          employeeUpdate[key] = updateData[key];
        }
      }

      // 2. Update employee if needed
      if (Object.keys(employeeUpdate).length > 0) {
        await Employee.findByIdAndUpdate(
          employeeId,
          { $set: employeeUpdate },
          { new: true }
        );
      }

      // 3. Update jobProfile if needed
      let updatedJobProfile = null;
      if (Object.keys(jobProfileUpdate).length > 0 && employee.jobProfile) {
        updatedJobProfile = await JobProfile.findByIdAndUpdate(
          employee.jobProfile,
          { $set: jobProfileUpdate },
          { new: true }
        );
      }

      const response = {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isEmailVerified: employee.isEmailVerified,
        profilePicUrl: employee.profilePicUrl,
        phoneNumber: employee.phoneNumber,
        isOwner: employee.isOwner,
        country: employee.country,
        jobTitle: employee.isOwner ? "Owner" : updatedJobProfile.jobTitle,
      };

      return response;
    } catch (error) {
      throw new Error(
        "Error updating employee or job profile: " + error.message
      );
    }
  },

  archiveEmployee: async (employeeId) => {
    try {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        throw new Error("Employee not found");
      }

      if (employee.isOwner) {
        throw new ApiError(409, "Owner cannot be archived");
      }

      employee.isAvailableForNewJob = true;
      return await employee.save();
    } catch (error) {
      throw error;
    }
  },

  searchCompanyEmployeesByName: async (companyId, nameQuery) => {
    const regex = new RegExp(nameQuery, "i"); // case-insensitive search

    const employees = await Employee.aggregate([
      {
        $match: {
          name: { $regex: regex },
          jobProfile: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "jobprofiles",
          localField: "jobProfile",
          foreignField: "_id",
          as: "jobProfile",
        },
      },
      { $unwind: "$jobProfile" },
      {
        $match: {
          "jobProfile.company": new mongoose.Types.ObjectId(companyId),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          isEmailVerified: 1,
          profilePicUrl: 1,
          phoneNumber: 1,
          isOwner: 1,
          country: 1,
          jobTitle: {
            $cond: {
              if: "$isOwner",
              then: "Owner",
              else: "$jobProfile.jobTitle",
            },
          },
        },
      },
    ]);

    return employees;
  },

  getEmployeeById: async (companyId, employeeId) => {
    try {
      const employee = await Employee.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(employeeId),
          },
        },
        {
          $lookup: {
            from: "jobprofiles",
            localField: "jobProfile",
            foreignField: "_id",
            as: "jobProfile",
          },
        },
        { $unwind: "$jobProfile" },
        {
          $match: {
            "jobProfile.company": new mongoose.Types.ObjectId(companyId),
          },
        },
      ]);
      const employeeData = employee[0];

      if (!employeeData) {
        throw new ApiError(404, "Employee not found");
      }

      delete employeeData.authType;
      delete employeeData.createdAt;
      delete employeeData.updatedAt;
      delete employeeData.__v;

      if (employeeData.jobProfile) {
        delete employeeData.jobProfile.createdAt;
        delete employeeData.jobProfile.updatedAt;
        delete employeeData.jobProfile.__v;
      }

      return employeeData;
    } catch (error) {
      throw error;
    }
  },
  getEmployeesByBusinessId: async (businessId) => {
    const employees = await Employee.aggregate([
      {
        $match: {
          jobProfile: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "jobprofiles",
          localField: "jobProfile",
          foreignField: "_id",
          as: "jobProfile"
        }
      },
      { $unwind: "$jobProfile" },
      {
        $match: {
          "jobProfile.company": new mongoose.Types.ObjectId(businessId)
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          isOwner: 1,
          phoneNumber: 1,
          jobTitle: "$jobProfile.jobTitle",
          profilePicUrl: 1,
          country: 1,
        }
      }
    ]);
  
    return employees;
  }
  
};
