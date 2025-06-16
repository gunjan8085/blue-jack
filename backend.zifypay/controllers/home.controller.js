const homeService = require("../services/home.service");

module.exports = {
  getAllUpcomingAppointments: async (req, res, next) => {
    try {
      const { fromDate, toDate } = req.query;
      const result = await homeService.getAllUpcomingAppointments(
        fromDate,
        toDate
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

  getTopServicesOverPeriod: async (req, res, next) => {
    try {
      const { fromDate, toDate } = req.query;
      const result = await homeService.getTopServicesOverPeriod(
        fromDate,
        toDate
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
