const {
  Service,
  Business,
  Workspace,
  JobProfile,
  Employee,
} = require("../models/index");
const { ENUMS } = require("../configs/constants.config");
const ApiError = require("../utils/apiError.util");
const { comparePassword } = require("../utils/bcrypt.util");

module.exports = {
  registerNewBusiness: async (businessData) => {
    try {
      // 1. Create a new workspace
      const workspace = await Workspace.create({
        cancellationReasons: ENUMS.CANCELLATION_REASONS,
      });

      businessData.workspace = workspace._id;
      businessData.employees = [businessData.owner];

      // 2. Create a new business
      const business = await Business.create(businessData);

      // 3. Add this business to the workspace
      workspace.allLocations = [business._id];
      await workspace.save();

      // 4. Create job profile for owner
      const jobProfile = await JobProfile.create({
        company: business._id,
        jobTitle: "Owner",
        headline: `Manages the business ${business.brandName}`,
        defaultShift: ENUMS.DEFAUTL_SHIFT,
        status: "accepted",
        employmentType: "self-employed",
        accessLevel: "high",
      });

      await Employee.findByIdAndUpdate(
        businessData.owner,
        { $set: { jobProfile: jobProfile._id } },
        { new: true }
      );

      delete business._doc.employees;
      delete business._doc.owner;
      delete business._doc.workspace;
      delete business._doc.__v;
      delete business._doc.createdAt;
      delete business._doc.updatedAt;

      return business;
    } catch (error) {
      throw new Error("Error creating business: " + error.message);
    }
  },

  getAllBusinesses: async () => {
    try {
      // Step 1: Fetch all businesses
      const businesses = await Business.find({}).lean();
  
      // Step 2: Get list of all business IDs
      const businessIds = businesses.map(b => b._id);
  
      // Step 3: Fetch services that belong to those businesses
      const services = await Service.find({ company: { $in: businessIds } }).lean();
  
      // Step 4: Group services by their company (business) ID
      const serviceMap = {};
      services.forEach(service => {
        const companyId = service.company.toString();
        if (!serviceMap[companyId]) {
          serviceMap[companyId] = [];
        }
        serviceMap[companyId].push(service);
      });
  
      // Step 5: Attach services to corresponding businesses
      const businessesWithServices = businesses.map(business => ({
        ...business,
        services: serviceMap[business._id.toString()] || []
      }));
  
      return businessesWithServices;
    } catch (error) {
      throw new ApiError(500, "Error fetching businesses: " + error.message);
    }
  },

  getBusinessByOwnerId: async (ownerId) => {
    try {
      const business = await Business.findOne({ owner: ownerId })
        .populate('owner', 'name email')
        .populate('serviceCategories', 'name')
        .lean();

      return business;
    } catch (error) {
      throw new Error(`Error finding business by owner: ${error.message}`);
    }
  },

  // loginBusiness: async (email, password) => {
  //   try {
  //     const business = await Business.findOne({ email });
  //     if (!business) {
  //       return null;
  //     }
  //     const isPasswordValid = await comparePassword(password, business.password);
  //     if (!isPasswordValid) {
  //       throw new ApiError(401, "Invalid email or password.");
  //     }
  //     return business;
  //   } catch (error) {
  //     throw new ApiError(500, error.message, error);
  //   }
  // },

  getBusinessById: async (id) => {
    try {
      const business = await Business.findById(id)
        .populate('serviceCategories', 'name description appointmentColor')
        .populate('employees', 'name email profilePicUrl jobProfile')
        .populate('workspace', 'name')
        .populate('reviews','stars', 'rating comment')
        .lean();

      if (!business) {
        throw new Error("Business not found");
      }

      return business;
    } catch (error) {
      throw error;
    }
  }
};
