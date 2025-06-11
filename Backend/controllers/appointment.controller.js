const appointmentService = require("../services/appointment.service");

module.exports = {
  createAppointmentByUser: async (req, res, next) => {
    try {
      const { userId } = req.user;

      const result = await appointmentService.createAppointmentByUser(
        userId,
        req.body
      );
      return res.status(200).json({
        data: result,
        success: true,
        message: "Appointment created successfully",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      next(error);
    }
  },

  createAppointmentByEmployee: async (req, res, next) => {
    try {
      const { userId } = req.user;
      const result = await appointmentService.createAppointmentByBusiness(
        userId,
        req.body
      );
      return res.status(200).json({
        data: result,
        success: true,
        message: "Appointment created successfully",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      next(error);
    }
  },

  getAppointmentsByClientId: async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const { page, limit } = req.query;

      const result = await appointmentService.getAppointmentsByClientId(
        clientId,
        page,
        limit
      );
      return res.status(200).json({
        data: result,
        success: true,
        message: "Appointments retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving appointments:", error);
      next(error);
    }
  },

  getAppointmentsByBusinessId: async (req, res, next) => {
    try {
      const { businessId } = req.params;
      const { page, limit } = req.query;
      const { status, startDate, endDate, bookedWith } = req.query;

      const filters = {
        status,
        startDate,
        endDate,
        bookedWith,
      };

      const result = await appointmentService.getAppointmentsByBusinessId(
        businessId,
        page,
        limit,
        filters
      );
      return res.status(200).json({
        data: result,
        success: true,
        message: "Appointments retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving appointments:", error);
      next(error);
    }
  },

  getAllAppointmentsByClientId: async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const result =
        await appointmentService.getAllAppointmentsByClientId(clientId);
      return res.status(200).json({
        data: result,
        success: true,
        message: "All appointments retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving all appointments:", error);
      next(error);
    }
  },

  //GET /api/appointments/business/123/all?status=confirmed&startDate=2024-03-01&endDate=2024-03-31&bookedWith=456

  getAllAppointmentsByBusinessId: async (req, res, next) => {
    try {
      const { businessId } = req.params;
      const { status, startDate, endDate, bookedWith } = req.query;

      const filters = {
        status,
        startDate,
        endDate,
        bookedWith,
      };

      const result = await appointmentService.getAllAppointmentsByBusinessId(
        businessId,
        filters
      );
      return res.status(200).json({
        data: result,
        success: true,
        message: "All appointments retrieved successfully",
      });
    } catch (error) {
      console.error("Error retrieving all appointments:", error);
      next(error);
    }
  },
};
